"use client";

import { motion } from "framer-motion";
import { ArrowDown, ArrowRight } from "lucide-react";
import { HeroBackdrop } from "./HeroBackdrop";
import { ButtonLink } from "./ui/Button";
import { Panel } from "./ui/HorizontalSite";
import { useGlitchShadow } from "./ui/useGlitch";
import { EASE, fadeUp, stagger } from "@/lib/motion";
import { SITE } from "@/lib/site";

const line = {
  hidden: { y: "105%" },
  visible: { y: "0%", transition: { duration: 1.1, ease: EASE } },
};

function ScrollCue({ className = "" }: { className?: string }) {
  return (
    <a
      href="#about"
      className={`label pointer-events-auto items-center gap-3 transition-colors hover:text-bone ${className}`}
      aria-label="Scroll to explore"
    >
      <span className="relative block h-8 w-px overflow-hidden bg-line" aria-hidden="true">
        <span className="absolute inset-0 block bg-amber animate-cue" />
      </span>
      Scroll to explore
      <ArrowDown aria-hidden="true" strokeWidth={1.5} className="h-3.5 w-3.5 lg:hidden" />
      <ArrowRight aria-hidden="true" strokeWidth={1.5} className="hidden h-3.5 w-3.5 lg:block" />
    </a>
  );
}

export function Hero() {
  const textShadow = useGlitchShadow();

  return (
    <Panel id="top" label="Home" labelledBy="hero-title" className="isolate overflow-hidden lg:w-screen">
      <div className="absolute inset-0 -z-10">
        <HeroBackdrop />
      </div>

      {/* Desktop: text starts on the frame's left line (same as the scroll cue), portrait follows after a fixed gap. */}
      <div className="frame flex min-h-[100svh] flex-col justify-center gap-14 pb-24 pt-28 lg:flex-row lg:items-center lg:justify-start lg:gap-[18vw] lg:pb-24">

        <motion.div
          variants={stagger(0.12, 0.15)}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="lg:max-w-[44rem] lg:shrink"
        >
          <motion.p variants={fadeUp} className="flex items-center gap-3 font-mono text-[0.68rem] uppercase tracking-[0.24em] text-amber">
            <span aria-hidden="true" className="h-px w-8 bg-amber" />
            Digital CEO // Command Center
          </motion.p>

          <motion.h1
            id="hero-title"
            aria-label={SITE.name}
            style={{ textShadow }}
            className="mt-6 font-display text-[clamp(2.75rem,6.6vw,6.75rem)] font-bold uppercase leading-[0.9] tracking-tightest"
          >
            <span aria-hidden="true" className="block overflow-hidden pb-[0.04em]">
              <motion.span variants={line} className="block text-bone">
                {SITE.firstName}
              </motion.span>
            </span>
            <span aria-hidden="true" className="block overflow-hidden pb-[0.04em]">
              <motion.span variants={line} className="block">
                <span className="glitch text-stroke inline-block [-webkit-text-stroke:1.5px_rgba(28,27,25,0.85)]">
                  {SITE.lastName}
                </span>
              </motion.span>
            </span>
          </motion.h1>

          <motion.p variants={fadeUp} className="mt-8 max-w-xl text-base font-medium text-bone/90 sm:text-lg">
            {SITE.title}
          </motion.p>
          <motion.p variants={fadeUp} className="mt-2 max-w-xl leading-relaxed text-mute">
            {SITE.intro}
          </motion.p>

          <motion.div variants={fadeUp} className="mt-10 flex flex-col gap-3 sm:flex-row">
            <ButtonLink href="#expertise" variant="accent" className="w-full sm:w-auto">
              Explore Expertise
            </ButtonLink>
            <ButtonLink href="#footer" variant="ghost" icon="up-right" className="w-full sm:w-auto">
              Connect
            </ButtonLink>
          </motion.div>
        </motion.div>

        {/* Where the travelling portrait starts (drawn as an overlay above this slot). */}
        <div
          id="hero-portrait-slot"
          aria-hidden="true"
          className="order-first mx-auto aspect-[4/5] w-[64%] max-w-xs shrink-0 lg:order-none lg:ml-auto lg:mr-[3vw] lg:h-[60vh] lg:w-auto lg:max-w-none"
        />
      </div>

      <div className="frame pointer-events-none absolute inset-x-0 bottom-0 flex pb-6 lg:pb-16">
        <ScrollCue className="flex" />
      </div>
    </Panel>
  );
}
