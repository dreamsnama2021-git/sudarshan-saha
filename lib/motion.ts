import type { Transition, Variants } from "framer-motion";

/** Expo-out: decisive start, long soft landing. No springs, no bounce. */
export const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

export const BASE: Transition = { duration: 1, ease: EASE };

export const VIEWPORT = { once: true, margin: "0px 0px -10% 0px" } as const;

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: BASE },
};

export const stagger = (staggerChildren = 0.1, delayChildren = 0): Variants => ({
  hidden: {},
  visible: { transition: { staggerChildren, delayChildren } },
});

export const word: Variants = {
  hidden: { y: "110%", opacity: 0 },
  visible: { y: "0%", opacity: 1, transition: { duration: 1.1, ease: EASE } },
};

export const imageReveal: Variants = {
  hidden: { opacity: 0, scale: 1.08 },
  visible: { opacity: 1, scale: 1, transition: { duration: 1.4, ease: EASE } },
};

export const press = {
  whileHover: { scale: 1.03 },
  whileTap: { scale: 0.97 },
  transition: { duration: 0.4, ease: EASE },
} as const;

