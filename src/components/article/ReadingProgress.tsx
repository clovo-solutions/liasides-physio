"use client";

import { motion, useScroll, useSpring } from "framer-motion";

/* Thin scroll-progress bar pinned under the article top bar.
   Compositor-only (scaleX) so it stays smooth. */
export function ReadingProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <motion.div
      style={{ scaleX }}
      className="fixed top-0 left-0 right-0 z-[60] h-0.5 origin-left bg-accent-500"
      aria-hidden="true"
    />
  );
}
