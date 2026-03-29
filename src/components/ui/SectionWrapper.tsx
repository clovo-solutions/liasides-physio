"use client";

import { motion } from "framer-motion";
import { fadeUp, viewportConfig } from "@/lib/animations";
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
      <motion.div
        className="container-narrow"
        initial="hidden"
        whileInView="visible"
        viewport={viewportConfig}
        variants={fadeUp}
      >
        {label && (
          <span className="inline-block text-xs font-semibold tracking-[0.2em] uppercase text-brand-600 mb-4">
            {label}
          </span>
        )}
        {children}
      </motion.div>
    </section>
  );
}
