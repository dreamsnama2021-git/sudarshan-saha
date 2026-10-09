"use client";

import { motion, type Variants } from "framer-motion";
import type { ReactNode } from "react";
import { fadeUp, stagger, VIEWPORT } from "@/lib/motion";

type Tag = "div" | "section" | "article" | "header" | "p" | "span" | "li" | "ul" | "ol" | "figure" | "blockquote";

type RevealProps = {
  children: ReactNode;
  className?: string;
  as?: Tag;
  variants?: Variants;
  delay?: number;
};

/** Scroll-triggered opacity + y reveal. Plays once. */
export function Reveal({ children, className, as = "div", variants = fadeUp, delay }: RevealProps) {
  const Component = motion[as];
  return (
    <Component
      className={className}
      variants={variants}
      initial="hidden"
      whileInView="visible"
      viewport={VIEWPORT}
      transition={delay ? { delay } : undefined}
    >
      {children}
    </Component>
  );
}

/** Parent that staggers its <Item> children into view. */
export function Stagger({
  children,
  className,
  as = "div",
  gap = 0.1,
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  as?: Tag;
  gap?: number;
  delay?: number;
}) {
  const Component = motion[as];
  return (
    <Component className={className} variants={stagger(gap, delay)} initial="hidden" whileInView="visible" viewport={VIEWPORT}>
      {children}
    </Component>
  );
}

export function Item({
  children,
  className,
  as = "div",
  variants = fadeUp,
}: {
  children: ReactNode;
  className?: string;
  as?: Tag;
  variants?: Variants;
}) {
  const Component = motion[as];
  return (
    <Component className={className} variants={variants}>
      {children}
    </Component>
  );
}
