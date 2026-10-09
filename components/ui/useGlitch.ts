"use client";

import { useReducedMotion, useTransform, useVelocity } from "framer-motion";
import { useSite } from "./HorizontalSite";

/**
 * RGB-split text-shadow driven by how fast the landscape strip is moving:
 * still → clean type, fast slide → amber/blue channel offset, like a signal glitch.
 */
export function useGlitchShadow(strength = 1) {
  const { x } = useSite();
  const reduceMotion = useReducedMotion();
  const velocity = useVelocity(x);
  return useTransform(velocity, (v) => {
    if (reduceMotion) return "none";
    const o = Math.max(-9, Math.min(9, v / 350)) * strength;
    if (Math.abs(o) < 0.3) return "none";
    return `${o.toFixed(1)}px 0 rgba(232,163,94,0.6), ${(-o).toFixed(1)}px 0 rgba(110,155,255,0.5)`;
  });
}
