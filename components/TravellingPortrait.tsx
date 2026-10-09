"use client";

import { motion, useMotionValue, useMotionValueEvent, useReducedMotion, useScroll, useTransform, useVelocity } from "framer-motion";
import { useCallback, useEffect } from "react";
import { useSite } from "./ui/HorizontalSite";
import { Portrait } from "./ui/Portrait";

const FROM = "hero-portrait-slot";
const TO = "about-portrait-slot";

const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

/**
 * One portrait shared by the hero and About. It sits on the hero's slot and, on desktop, glides into About's
 * photo slot as the strip slides from the hero to About — then rides along with it. On phones About has
 * no photo slot, so the portrait simply stays with the hero (shown once).
 *
 * Both slots are read live on every scroll frame, so it stays locked to them even while a panel scrolls
 * vertically (as the hero and About do on phones). Drawn as a fixed overlay so no panel clips it mid-flight.
 */
export function TravellingPortrait() {
  const { x } = useSite();
  const { scrollY } = useScroll();
  const reduceMotion = useReducedMotion();

  const left = useMotionValue(0);
  const top = useMotionValue(0);
  const width = useMotionValue(0);
  const height = useMotionValue(0);
  const opacity = useMotionValue(0);

  const update = useCallback(() => {
    const from = document.getElementById(FROM);
    const to = document.getElementById(TO);
    if (!from) return;
    const a = from.getBoundingClientRect();
    if (!a.width) return;
    // The About slot only exists on desktop. Without it, the portrait simply stays with the hero.
    const toRect = to?.getBoundingClientRect();
    const b = toRect && toRect.width ? toRect : a;

    // Progress through the hero → About slide: 0 while the hero (or its vertical scroll) is on screen,
    // 1 once About has fully arrived. The hero panel is one viewport wide.
    const heroPanel = from.closest("section");
    const travel = heroPanel?.getBoundingClientRect().width || window.innerWidth;
    const t = Math.min(1, Math.max(0, -x.get() / travel));

    left.set(lerp(a.left, b.left, t));
    top.set(lerp(a.top, b.top, t));
    width.set(lerp(a.width, b.width, t));
    height.set(lerp(a.height, b.height, t));
    opacity.set(1);
  }, [x, left, top, width, height, opacity]);

  useMotionValueEvent(x, "change", update);
  useMotionValueEvent(scrollY, "change", () => requestAnimationFrame(update));

  useEffect(() => {
    update();
    const from = document.getElementById(FROM);
    const to = document.getElementById(TO);
    const ro = new ResizeObserver(update);
    if (from) ro.observe(from);
    if (to) ro.observe(to);
    window.addEventListener("resize", update);
    let alive = true;
    document.fonts?.ready.then(() => alive && update());
    const t = window.setTimeout(update, 600);
    return () => {
      alive = false;
      ro.disconnect();
      window.removeEventListener("resize", update);
      window.clearTimeout(t);
    };
  }, [update]);

  const velocity = useVelocity(x);
  const skew = useTransform(velocity, (v) => (reduceMotion ? 0 : Math.max(-6, Math.min(6, v / 500))));

  return (
    <motion.div
      style={{ x: left, y: top, width, height, skewX: skew, opacity }}
      className="pointer-events-none fixed left-0 top-0 z-30"
    >
      <Portrait priority className="h-full w-full" />
    </motion.div>
  );
}
