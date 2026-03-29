"use client";

import { Variants } from "framer-motion";

/* ── Reusable animation variants ─────────────────────────
   All variants use translate3d(0,0,0) via z:0 to force
   GPU compositing in Safari/Firefox, preventing flicker.  */

export const fadeUp: Variants = {
  hidden: {
    opacity: 0,
    y: 32,
    z: 0,
  },
  visible: {
    opacity: 1,
    y: 0,
    z: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  },
};

export const fadeIn: Variants = {
  hidden: { opacity: 0, z: 0 },
  visible: {
    opacity: 1,
    z: 0,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.95, z: 0 },
  visible: {
    opacity: 1,
    scale: 1,
    z: 0,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
  },
};

/* staggerContainer should NOT animate opacity —
   only orchestrate child timing. Animating opacity
   on parent + children causes double-composite flicker
   in Safari/Firefox.                                      */
export const staggerContainer: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.15,
    },
  },
};

export const slideInLeft: Variants = {
  hidden: { opacity: 0, x: -40, z: 0 },
  visible: {
    opacity: 1,
    x: 0,
    z: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  },
};

export const slideInRight: Variants = {
  hidden: { opacity: 0, x: 40, z: 0 },
  visible: {
    opacity: 1,
    x: 0,
    z: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  },
};

/* ── Default viewport settings for scroll-triggered anims
   amount: 0.2 = trigger when 20% visible (more stable
   than margin-based, avoids threshold flickering)         */
export const viewportConfig = {
  once: true,
  amount: 0.2 as const,
};
