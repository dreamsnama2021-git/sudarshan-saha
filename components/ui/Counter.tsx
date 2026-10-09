"use client";

import { animate, useInView, useReducedMotion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

/** Counts from 0 to `value` once it scrolls into view. Renders the final value for SSR and reduced motion. */
export function Counter({ value, suffix = "", className }: { value: number; suffix?: string; className?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -15% 0px" });
  const reduceMotion = useReducedMotion();
  const [display, setDisplay] = useState(value);

  useEffect(() => {
    if (!inView || reduceMotion) return;
    const controls = animate(0, value, {
      duration: 1.8,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (v) => setDisplay(Math.round(v)),
    });
    return () => controls.stop();
  }, [inView, reduceMotion, value]);

  // Before the counter enters view, hold at 0 so the count-up is visible (client only).
  useEffect(() => {
    if (!reduceMotion) setDisplay(0);
  }, [reduceMotion]);

  return (
    <span ref={ref} className={className}>
      <span className="tabular-nums">{display}</span>
      <span className="text-amber">{suffix}</span>
    </span>
  );
}
