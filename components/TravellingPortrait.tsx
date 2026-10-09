"use client";

import { motion, useMotionValue, useReducedMotion, useTransform, useVelocity } from "framer-motion";
import { useEffect } from "react";
import { useSite } from "./ui/HorizontalSite";
import { Portrait } from "./ui/Portrait";

const FROM = "hero-portrait-slot";
const TO = "about-portrait-slot";

/**
 * Desktop only. One portrait shared by the hero and About: it sits in the hero's slot and, as the strip
 * slides from the hero to About, glides into About's photo slot — then leaves with the strip.
 * Drawn as a fixed overlay so neither panel clips it mid-flight. Both slots are measured, so the
 * landing spot stays exact at any screen size.
 */
export function TravellingPortrait() {
  const { x, isDesktop } = useSite();
  const reduceMotion = useReducedMotion();

  // Slot geometry in strip coordinates (independent of how far the strip has scrolled).
  const fromLeft = useMotionValue(0);
  const fromTop = useMotionValue(0);
  const toLeft = useMotionValue(0);
  const toTop = useMotionValue(0);
  const width = useMotionValue(0);
  const height = useMotionValue(0);
  const ready = useMotionValue(0);

  useEffect(() => {
    if (!isDesktop) return;
    const from = document.getElementById(FROM);
    const to = document.getElementById(TO);
    if (!from || !to) return;

    const measure = () => {
      const sx = x.get();
      const a = from.getBoundingClientRect();
      const b = to.getBoundingClientRect();
      fromLeft.set(a.left - sx);
      fromTop.set(a.top);
      toLeft.set(b.left - sx);
      toTop.set(b.top);
      width.set(a.width);
      height.set(a.height);
      ready.set(1);
    };

    measure();
    // The slots sit in flex/grid layouts, so they can move without resizing (e.g. when the display font
    // loads and the name gets wider). Watch the slots *and* their containers, and re-measure on font load.
    const ro = new ResizeObserver(measure);
    const watched = new Set<Element>([from, to]);
    for (const slot of [from, to]) {
      const parent = slot.parentElement;
      if (!parent) continue;
      watched.add(parent);
      // Siblings (e.g. the hero text block) change size and push the slot around.
      for (const child of Array.from(parent.parentElement?.children ?? parent.children)) watched.add(child);
      for (const child of Array.from(parent.children)) watched.add(child);
    }
    watched.forEach((el) => ro.observe(el));
    window.addEventListener("resize", measure);
    let alive = true;
    document.fonts?.ready.then(() => alive && measure());
    const t = window.setTimeout(measure, 600);
    return () => {
      alive = false;
      ro.disconnect();
      window.removeEventListener("resize", measure);
      window.clearTimeout(t);
    };
  }, [isDesktop, x, fromLeft, fromTop, toLeft, toTop, width, height, ready]);

  // Progress through the hero → About slide (the hero is one viewport wide).
  const progress = (sx: number) => {
    const vw = typeof window === "undefined" ? 1440 : window.innerWidth;
    return Math.min(1, Math.max(0, -sx / vw));
  };

  const screenX = useTransform([x, fromLeft, toLeft], ([sx, a, b]: number[]) => {
    const p = progress(sx);
    // Before landing: interpolate between the two slots' on-screen positions; after: ride with the strip.
    return p < 1 ? a + (b - (typeof window === "undefined" ? 1440 : window.innerWidth) - a) * p : b + sx;
  });
  const screenY = useTransform([x, fromTop, toTop], ([sx, a, b]: number[]) => a + (b - a) * progress(sx));

  const velocity = useVelocity(x);
  const skew = useTransform(velocity, (v) => (reduceMotion ? 0 : Math.max(-6, Math.min(6, v / 500))));

  if (!isDesktop) return null;

  return (
    <motion.div
      style={{ x: screenX, y: screenY, width, height, skewX: skew, opacity: ready }}
      className="pointer-events-none fixed left-0 top-0 z-30 hidden lg:block"
    >
      <Portrait priority className="h-full w-full" />
    </motion.div>
  );
}
