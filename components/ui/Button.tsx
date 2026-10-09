"use client";

import { motion } from "framer-motion";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import type { ReactNode } from "react";
import { press } from "@/lib/motion";

type Variant = "primary" | "accent" | "ghost" | "link";

const STYLES: Record<Variant, string> = {
  primary: "bg-bone text-ink hover:bg-amber-soft hover:text-bone px-7 py-4",
  accent: "bg-amber-soft text-bone hover:bg-bone hover:text-ink px-7 py-4",
  ghost: "border border-line text-bone hover:border-amber/60 hover:text-amber px-7 py-4",
  link: "text-bone hover:text-amber py-2",
};

type ButtonLinkProps = {
  href: string;
  children: ReactNode;
  variant?: Variant;
  icon?: "right" | "up-right" | "none";
  className?: string;
  external?: boolean;
  ariaLabel?: string;
};

export function ButtonLink({
  href,
  children,
  variant = "primary",
  icon = "right",
  className = "",
  external,
  ariaLabel,
}: ButtonLinkProps) {
  const Icon = icon === "up-right" ? ArrowUpRight : ArrowRight;
  return (
    <motion.a
      href={href}
      aria-label={ariaLabel}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      className={`group inline-flex items-center justify-center gap-3 rounded-full font-sans text-sm font-medium tracking-wide transition-colors duration-500 ease-out ${STYLES[variant]} ${className}`}
      {...press}
    >
      <span>{children}</span>
      {icon !== "none" && (
        <Icon
          aria-hidden="true"
          strokeWidth={1.5}
          className="h-4 w-4 transition-transform duration-500 ease-out group-hover:translate-x-1 group-hover:-rotate-0"
        />
      )}
    </motion.a>
  );
}
