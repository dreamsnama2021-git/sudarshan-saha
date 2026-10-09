"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useId, useRef, useState, type KeyboardEvent } from "react";
import { ABOUT_POINTS, EXPERIENCE } from "@/lib/content";
import { EASE } from "@/lib/motion";

const TABS = [
  { key: "history", label: "Companies history" },
  { key: "expertise", label: "Expertise" },
] as const;

type TabKey = (typeof TABS)[number]["key"];

/** About section, right column: option 1 = companies history (default), option 2 = areas of expertise. */
export function ExperienceTabs() {
  const [active, setActive] = useState<TabKey>("history");
  const baseId = useId();
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);

  // Arrow keys move between tabs (WAI-ARIA tabs pattern).
  const onKeyDown = (e: KeyboardEvent<HTMLButtonElement>, i: number) => {
    if (e.key !== "ArrowRight" && e.key !== "ArrowLeft") return;
    e.preventDefault();
    const next = (i + (e.key === "ArrowRight" ? 1 : -1) + TABS.length) % TABS.length;
    setActive(TABS[next].key);
    tabRefs.current[next]?.focus();
  };

  return (
    <div>
      <div role="tablist" aria-label="About details" className="mb-4 flex gap-2">
        {TABS.map((tab, i) => {
          const selected = active === tab.key;
          return (
            <button
              key={tab.key}
              ref={(el) => {
                tabRefs.current[i] = el;
              }}
              id={`${baseId}-tab-${tab.key}`}
              role="tab"
              type="button"
              aria-selected={selected}
              aria-controls={`${baseId}-panel-${tab.key}`}
              tabIndex={selected ? 0 : -1}
              onClick={() => setActive(tab.key)}
              onKeyDown={(e) => onKeyDown(e, i)}
              className={`relative rounded-full px-4 py-2 font-mono text-[0.65rem] uppercase tracking-[0.18em] transition-colors duration-300 ${
                selected ? "text-bone" : "text-mute hover:text-bone"
              }`}
            >
              {selected && (
                <motion.span
                  layoutId={`${baseId}-pill`}
                  className="absolute inset-0 rounded-full border border-amber/50 bg-amber-soft/25"
                  transition={{ duration: 0.45, ease: EASE }}
                />
              )}
              <span className="relative">
                {String(i + 1).padStart(2, "0")} · {tab.label}
              </span>
            </button>
          );
        })}
      </div>

      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={active}
          id={`${baseId}-panel-${active}`}
          role="tabpanel"
          aria-labelledby={`${baseId}-tab-${active}`}
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.4, ease: EASE }}
        >
          {active === "history" ? (
            <ol className="border-t border-line">
              {EXPERIENCE.map((job, i) => (
                <li key={i} className="group grid grid-cols-[1fr_auto] gap-x-4 gap-y-1 border-b border-line py-4 lg:py-5">
                  <span className="font-display text-xl uppercase leading-tight tracking-tight text-bone transition-colors duration-500 group-hover:text-amber">
                    {job.role}
                  </span>
                  <span className="whitespace-nowrap pt-1 font-mono text-[0.65rem] uppercase tracking-[0.18em] text-amber">
                    {job.period}
                  </span>
                  <span className="col-span-2 text-sm font-medium text-bone/80">{job.company}</span>
                  <span className="col-span-2 text-sm leading-relaxed text-mute">{job.summary}</span>
                </li>
              ))}
            </ol>
          ) : (
            <ul className="border-t border-line">
              {ABOUT_POINTS.map((point, i) => (
                <li key={point} className="group flex items-baseline justify-between gap-4 border-b border-line py-4 lg:py-5">
                  <span className="font-display text-xl uppercase tracking-tight text-bone transition-colors duration-500 group-hover:text-amber">
                    {point}
                  </span>
                  <span className="font-display text-xs text-mute">{String(i + 1).padStart(2, "0")}</span>
                </li>
              ))}
            </ul>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
