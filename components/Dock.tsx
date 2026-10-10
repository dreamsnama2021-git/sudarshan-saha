"use client";

import { motion } from "framer-motion";
import { House, LayoutGrid, Send, User, type LucideIcon } from "lucide-react";
import { useSite } from "./ui/HorizontalSite";
import { EASE } from "@/lib/motion";

type DockItem = { label: string; href: string; icon: LucideIcon; panels: string[] };

/** Which panels light up which dock item. */
const ITEMS: DockItem[] = [
  { label: "Home", href: "#top", icon: House, panels: ["top"] },
  { label: "About", href: "#about", icon: User, panels: ["about", "intro", "testimonial"] },
  { label: "Services", href: "#expertise", icon: LayoutGrid, panels: ["expertise", "brand-wall", "work", "process"] },
  { label: "Connect", href: "#footer", icon: Send, panels: ["footer"] },
];

/** Floating bottom navigation (icons only on phones). The pill glides to the active section. */
export function Dock() {
  const { currentId } = useSite();

  return (
    <nav
      aria-label="Sections"
      className="fixed bottom-5 left-1/2 z-50 -translate-x-1/2 rounded-full border border-line bg-ink/70 p-1.5 shadow-[0_20px_50px_-20px_rgba(28,27,25,0.3)] backdrop-blur-xl"
    >
      <ul className="flex items-center gap-1">
        {ITEMS.map((item) => {
          const Icon = item.icon;
          const active = currentId !== null && item.panels.includes(currentId);
          return (
            <li key={item.href} className="relative">
              {active && (
                <motion.span
                  layoutId="dock-active"
                  className="absolute inset-0 rounded-full border border-amber/60 bg-amber/10"
                  transition={{ duration: 0.5, ease: EASE }}
                />
              )}
              <a
                href={item.href}
                aria-current={active ? "true" : undefined}
                aria-label={item.label}
                className={`relative flex items-center gap-2 rounded-full px-3 py-2 sm:px-4 font-mono text-[0.65rem] uppercase tracking-[0.2em] transition-colors duration-300 ${
                  active ? "text-amber" : "text-mute hover:text-bone"
                }`}
              >
                <Icon aria-hidden="true" strokeWidth={1.5} className="h-3.5 w-3.5" />
                <span className="hidden sm:inline">{item.label}</span>
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
