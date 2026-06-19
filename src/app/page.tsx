import { getSiteData } from "@/lib/data";
import { getReviewsData } from "@/lib/googleReviews";
import { Navbar } from "@/components/layout/Navbar";
import { Hero } from "@/components/sections/Hero";
import { About } from "@/components/sections/About";
import { Services } from "@/components/sections/Services";
import { Reviews } from "@/components/sections/Reviews";
import { Location } from "@/components/sections/Location";
import { Therapist } from "@/components/sections/Therapist";
import { BookingSection } from "@/components/sections/BookingSection";
import { Contact } from "@/components/sections/Contact";
import { Footer } from "@/components/sections/Footer";

/* ─────────────────────────────────────────────────────────
   Home Page

   All content is loaded from /data/site.json via getSiteData().
   When migrating to Sanity CMS, make this an async component
   and await the data fetch.

   Example:
   export default async function Home() {
     const data = await getSiteData(); // now a Sanity GROQ query
     ...
   }
   ───────────────────────────────────────────────────────── */

export default async function Home() {
  const data = getSiteData();
  // Rating + review count pulled live from Google (daily revalidate),
  // falling back to site.json when unavailable.
  const reviews = await getReviewsData();

  return (
    <>
      <Navbar business={data.business} />
      <main>
        <Hero data={data.hero} />
        <About data={data.about} />
        <Therapist data={data.therapist} />
        <Services data={data.services} />
        <Reviews data={reviews} />
        <BookingSection data={data.booking} />
        <Location data={data.location} />
        <Contact data={data.contact} social={data.social} />
      </main>
      <Footer
        data={data.footer}
        business={data.business}
        social={data.social}
      />
    </>
  );
}
