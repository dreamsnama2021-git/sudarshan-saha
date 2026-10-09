"use client";

import { motion } from "framer-motion";
import { stagger, VIEWPORT, word } from "@/lib/motion";

type WordRevealProps = {
  text: string;
  as?: "h1" | "h2" | "h3" | "p";
  id?: string;
  className?: string;
  /** Words (exact match, punctuation included) to render in the accent colour. */
  accent?: string[];
  delay?: number;
  gap?: number;
};

/**
 * Splits a sentence into words that rise out of clipped line boxes, one after another.
 * Screen readers get the sentence once via aria-label; the animated words are hidden from them.
 */
export function WordReveal({ text, as = "h2", id, className, accent = [], delay = 0, gap = 0.07 }: WordRevealProps) {
  const Component = motion[as];
  const words = text.split(" ");
  return (
    <Component
      id={id}
      aria-label={text}
      className={className}
      variants={stagger(gap, delay)}
      initial="hidden"
      whileInView="visible"
      viewport={VIEWPORT}
    >
      {words.map((w, i) => (
        <span key={`${w}-${i}`} aria-hidden="true" className="inline-block overflow-hidden pb-[0.06em] align-top">
          <motion.span variants={word} className={`inline-block ${accent.includes(w) ? "text-amber" : ""}`}>
            {w}
            {i < words.length - 1 ? " " : ""}
          </motion.span>
        </span>
      ))}
    </Component>
  );
}
