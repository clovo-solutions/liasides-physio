import { getSiteData } from "./data";
import type { ReviewsData } from "./types";

/* ─────────────────────────────────────────────────────────
   Live Google rating + review count

   Google has no free public reviews API, so we read the
   business's Google "local knowledge panel" fragment
   (the same data shown in Search/Maps) and parse the
   overall rating and total review count out of it.

   Keyed by the business's Google CID (a stable numeric id
   for the place), stored in site.json as reviews.googleCid.

   The fetch is cached and revalidated once a day, so the
   page stays fast and we barely touch Google. If anything
   fails (markup change, network, missing CID) we fall back
   to the static values in site.json — the page never breaks.
   ───────────────────────────────────────────────────────── */

export interface GoogleRating {
  averageRating: number;
  totalReviews: number;
}

const REVALIDATE_SECONDS = 60 * 60 * 24; // once per day

const UA =
  "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) " +
  "AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0 Safari/537.36";

export async function fetchGoogleRating(
  cid: string
): Promise<GoogleRating | null> {
  if (!cid) return null;

  const url =
    "https://www.google.com/async/lcl_akp" +
    `?hl=en&gl=us&async=ludocids:${encodeURIComponent(cid)},_fmt:pc`;

  try {
    const res = await fetch(url, {
      headers: {
        "User-Agent": UA,
        "Accept-Language": "en-US,en;q=0.9",
      },
      next: { revalidate: REVALIDATE_SECONDS },
    });
    if (!res.ok) return null;

    const html = await res.text();
    return parseGoogleRating(html);
  } catch {
    return null;
  }
}

/** Extract overall rating + total review count from the knowledge-panel HTML. */
export function parseGoogleRating(html: string): GoogleRating | null {
  // Overall rating, e.g. aria-label="Rated 5.0 out of 5,"
  const ratingMatch = html.match(/Rated\s+([0-5](?:\.\d)?)\s+out of 5/i);
  // Total reviews, e.g. "142 Google reviews"
  const reviewsMatch = html.match(/([\d,]+)\s+Google reviews?/i);

  if (!ratingMatch || !reviewsMatch) return null;

  const averageRating = parseFloat(ratingMatch[1]);
  const totalReviews = parseInt(reviewsMatch[1].replace(/,/g, ""), 10);

  if (!Number.isFinite(averageRating) || !Number.isFinite(totalReviews)) {
    return null;
  }
  if (averageRating <= 0 || totalReviews <= 0) return null;

  return { averageRating, totalReviews };
}

/**
 * Reviews section data with the rating + count overridden by the
 * live Google values when available. Falls back to site.json.
 */
export async function getReviewsData(): Promise<ReviewsData> {
  const reviews = getSiteData().reviews;
  const live = await fetchGoogleRating(reviews.googleCid ?? "");

  if (!live) return reviews;

  return {
    ...reviews,
    averageRating: live.averageRating,
    totalReviews: live.totalReviews,
  };
}
