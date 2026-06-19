import { clsx } from "clsx";

/* ─────────────────────────────────────────────────────────
   SectionHeading

   One reusable heading block (eyebrow + title + subtitle)
   so every section shares the same rhythm, type scale, and
   accent treatment. Keeps the design system cohesive and
   the heading hierarchy semantic (single H1 in the hero,
   H2 for every section title).
   ───────────────────────────────────────────────────────── */

interface SectionHeadingProps {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  align?: "left" | "center";
  as?: "h1" | "h2" | "h3";
  className?: string;
  id?: string;
}

export function SectionHeading({
  eyebrow,
  title,
  subtitle,
  align = "center",
  as: Tag = "h2",
  className,
  id,
}: SectionHeadingProps) {
  const centered = align === "center";

  return (
    <div
      className={clsx(
        centered ? "text-center mx-auto max-w-2xl" : "text-left max-w-2xl",
        className
      )}
    >
      {eyebrow && (
        <span
          className={clsx("eyebrow mb-4", centered && "justify-center")}
        >
          {eyebrow}
        </span>
      )}
      <Tag
        id={id}
        className="font-display text-display-lg font-semibold text-brand-900 text-balance"
      >
        {title}
      </Tag>
      {subtitle && (
        <p
          className={clsx(
            "text-ink-secondary text-lg leading-relaxed mt-4 text-pretty",
            centered && "mx-auto"
          )}
        >
          {subtitle}
        </p>
      )}
    </div>
  );
}
