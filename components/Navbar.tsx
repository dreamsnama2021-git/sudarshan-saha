"use client";

import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { EASE, press } from "@/lib/motion";
import { NAV, SITE, SOCIALS, safeHref } from "@/lib/site";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (y) => setScrolled(y > 24));

  useEffect(() => {
    document.documentElement.classList.toggle("overflow-hidden", open);
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== "Escape") return;
      setOpen(false);
      toggleRef.current?.focus();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-50 px-3 pt-3 sm:px-5 lg:pt-4">
        <nav
          aria-label="Primary"
          className={`mx-auto flex h-14 max-w-frame items-center justify-between gap-6 rounded-full border pl-5 pr-2 transition-[background-color,border-color,backdrop-filter,box-shadow] duration-700 ease-out lg:h-16 lg:pl-7 ${
            scrolled || open
              ? "border-line bg-ink/70 shadow-[0_10px_40px_-20px_rgba(28,27,25,0.25)] backdrop-blur-xl"
              : "border-transparent bg-transparent"
          }`}
        >
          <a href="#top" aria-label={`${SITE.name}, back to start`} className="flex items-center gap-2 font-mono text-[0.68rem] uppercase tracking-[0.22em] text-bone">
            <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-amber" />
            {SITE.handle}
            <span className="hidden text-mute sm:inline">/ Digital Command Centre</span>
          </a>

          <ul className="hidden items-center gap-1 md:flex lg:hidden">
            {NAV.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  className="rounded-full px-4 py-2 text-[0.8125rem] text-mute transition-colors duration-300 hover:bg-bone/5 hover:text-bone"
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-2">
            <motion.a
              href="#footer"
              className="group hidden items-center gap-2 rounded-full border border-line bg-bone px-5 py-2.5 text-[0.8125rem] font-medium text-ink transition-colors duration-500 hover:bg-amber-soft hover:text-bone md:inline-flex"
              {...press}
            >
              Let&apos;s Talk
              <ArrowRight aria-hidden="true" strokeWidth={1.5} className="h-3.5 w-3.5 transition-transform duration-500 group-hover:translate-x-0.5" />
            </motion.a>

            <button
              ref={toggleRef}
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-expanded={open}
              aria-controls="mobile-nav"
              aria-label={open ? "Close menu" : "Open menu"}
              className="relative inline-flex h-11 w-11 items-center justify-center md:hidden"
            >
              <span className="relative block h-3 w-6">
                <span
                  className={`absolute left-0 block h-px w-6 bg-bone transition-all duration-500 ease-out ${
                    open ? "top-1.5 rotate-45" : "top-0"
                  }`}
                />
                <span
                  className={`absolute left-0 block h-px bg-bone transition-all duration-500 ease-out ${
                    open ? "top-1.5 w-6 -rotate-45" : "top-3 w-4"
                  }`}
                />
              </span>
            </button>
          </div>
        </nav>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-nav"
            className="fixed inset-0 z-40 flex flex-col bg-ink px-5 pb-8 pt-24 sm:px-8 md:hidden"
            initial={{ clipPath: "inset(0 0 100% 0)" }}
            animate={{ clipPath: "inset(0 0 0% 0)" }}
            exit={{ clipPath: "inset(0 0 100% 0)" }}
            transition={{ duration: 0.7, ease: EASE }}
          >
            <motion.ul
              className="flex flex-col"
              initial="hidden"
              animate="visible"
              variants={{ visible: { transition: { staggerChildren: 0.07, delayChildren: 0.2 } } }}
            >
              {NAV.map((item, i) => (
                <motion.li
                  key={item.href}
                  className="overflow-hidden border-b border-line"
                  variants={{ hidden: { opacity: 0, y: 40 }, visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: EASE } } }}
                >
                  <a
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className="flex items-baseline justify-between py-5 font-display text-[clamp(2rem,8.5vw,3rem)] font-medium uppercase leading-none tracking-tightest text-bone"
                  >
                    {item.label}
                    <span className="font-sans text-xs tracking-label text-mute">0{i + 1}</span>
                  </a>
                </motion.li>
              ))}
            </motion.ul>

            <motion.div
              className="mt-auto flex flex-col gap-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1, transition: { delay: 0.5, duration: 0.6 } }}
            >
              <a
                href="#footer"
                onClick={() => setOpen(false)}
                className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-bone px-6 py-4 text-sm font-medium text-ink"
              >
                Let&apos;s Talk <ArrowRight aria-hidden="true" strokeWidth={1.5} className="h-4 w-4" />
              </a>
              <ul className="flex flex-wrap gap-x-6 gap-y-2">
                {SOCIALS.map((s) => (
                  <li key={s.label}>
                    <a href={safeHref(s.href)} className="label hover:text-bone">
                      {s.label}
                    </a>
                  </li>
                ))}
              </ul>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
