import { clsx } from "clsx";
import type { ArticleBlock } from "@/lib/types";

interface ArticleBodyProps {
  blocks: ArticleBlock[];
}

/* Renders the portable-text-style block model with intentional,
   highly readable typography (~68ch measure, generous rhythm). */
export function ArticleBody({ blocks }: ArticleBodyProps) {
  return (
    <div className="space-y-6">
      {blocks.map((block, i) => {
        switch (block.type) {
          case "heading":
            return (
              <h2
                key={i}
                className="font-display text-2xl sm:text-3xl font-semibold text-brand-900 !mt-12 scroll-mt-24 text-balance"
              >
                {block.text}
              </h2>
            );

          case "paragraph":
            return (
              <p
                key={i}
                className="text-ink-secondary text-lg leading-relaxed text-pretty"
              >
                {block.text}
              </p>
            );

          case "list": {
            const ListTag = block.ordered ? "ol" : "ul";
            return (
              <ListTag
                key={i}
                className={clsx(
                  "space-y-2.5 pl-1",
                  block.ordered && "list-decimal pl-5 marker:text-accent-600 marker:font-semibold"
                )}
              >
                {block.items.map((item, j) => (
                  <li
                    key={j}
                    className={clsx(
                      "text-ink-secondary text-lg leading-relaxed",
                      !block.ordered && "flex gap-3"
                    )}
                  >
                    {!block.ordered && (
                      <span
                        aria-hidden="true"
                        className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent-500"
                      />
                    )}
                    <span>{item}</span>
                  </li>
                ))}
              </ListTag>
            );
          }

          case "callout":
            return (
              <aside
                key={i}
                className={clsx(
                  "rounded-2xl border p-5 sm:p-6",
                  block.variant === "warning"
                    ? "border-accent-200 bg-accent-50"
                    : "border-brand-100 bg-brand-50"
                )}
              >
                {block.title && (
                  <p
                    className={clsx(
                      "font-semibold mb-1.5",
                      block.variant === "warning"
                        ? "text-accent-800"
                        : "text-brand-800"
                    )}
                  >
                    {block.title}
                  </p>
                )}
                <p className="text-ink-secondary leading-relaxed">
                  {block.text}
                </p>
              </aside>
            );

          case "quote":
            return (
              <blockquote
                key={i}
                className="border-l-4 border-accent-400 pl-5 py-1 my-8"
              >
                <p className="font-display text-xl sm:text-2xl text-brand-800 leading-snug italic text-balance">
                  {block.text}
                </p>
              </blockquote>
            );

          default:
            return null;
        }
      })}
    </div>
  );
}
