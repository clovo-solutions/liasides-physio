"use client";

import { useInView } from "@/lib/useInView";
import { clsx } from "clsx";

interface SectionWrapperProps {
  id?: string;
  className?: string;
  children: React.ReactNode;
  label?: string;
  background?: "default" | "warm" | "muted";
}

export function SectionWrapper({
  id,
  className,
  children,
  label,
  background = "default",
}: SectionWrapperProps) {
  const { ref, isInView } = useInView({ threshold: 0.1 });

  const bgStyles = {
    default: "bg-surface",
    warm: "bg-surface-warm",
    muted: "bg-surface-muted",
  };

  return (
    <section
      id={id}
      className={clsx("section-padding", bgStyles[background], className)}
    >
      <div
        ref={ref}
        className={clsx("container-narrow anim-fade-in", isInView && "in-view")}
      >
        {label && <span className="eyebrow mb-4">{label}</span>}
        {children}
      </div>
    </section>
  );
}
