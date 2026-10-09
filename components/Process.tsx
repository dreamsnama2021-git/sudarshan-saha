"use client";

import { motion } from "framer-motion";
import { Panel, usePanelProgress } from "./ui/HorizontalSite";
import { Reveal } from "./ui/Reveal";
import { WordReveal } from "./ui/WordReveal";
import { EXECUTION } from "@/lib/content";
import { EASE } from "@/lib/motion";

/** Timeline rule that fills as the stages scroll past. */
function Rail() {
  const progress = usePanelProgress();
  return (
    <>
      <span aria-hidden="true" className="absolute bottom-0 left-[0.6875rem] top-0 w-px bg-line" />
      <motion.span
        aria-hidden="true"
        className="absolute bottom-0 left-[0.6875rem] top-0 w-px origin-top bg-amber"
        style={{ scaleY: progress }}
      />
    </>
  );
}

export function Process() {
  return (
    <Panel
      id="process"
      label="Execution"
      labelledBy="process-title"
      className="bg-ink lg:w-screen"
      asideClassName="px-5 pt-24 sm:px-8 sm:pt-32 lg:flex lg:w-[38vw] lg:flex-col lg:justify-center lg:px-[4vw] lg:pt-0"
      aside={
        <>
          <Reveal as="p" className="label">
            <span className="text-amber">(03)</span>&nbsp;&nbsp;Execution
          </Reveal>
          <WordReveal id="process-title" text="EXECUTION." accent={["EXECUTION."]} className="display-xl mt-6" />
          <Reveal as="p" className="mt-8 max-w-sm leading-relaxed text-mute">
            Strategy only matters once it ships. A clear system for getting work live — planned tightly, built fast,
            measured honestly and improved continuously.
          </Reveal>
        </>
      }
      innerClassName="px-5 pb-24 pt-12 sm:px-8 sm:pb-32 lg:ml-[38vw] lg:pb-[30vh] lg:pl-0 lg:pr-[6vw] lg:pt-[30vh]"
    >
      <ol className="relative">
        <Rail />
        {EXECUTION.map((step) => (
          <motion.li
            key={step.index}
            className="relative grid grid-cols-[1.5rem_1fr] gap-x-6 pb-16 last:pb-0 sm:gap-x-10 lg:pb-[18vh]"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "0px 0px -35% 0px" }}
          >
            {/* Oversized outlined numeral behind each stage */}
            <span
              aria-hidden="true"
              className="text-stroke pointer-events-none absolute -top-[0.2em] right-0 hidden select-none font-display text-[clamp(5rem,8vw,8.5rem)] font-medium leading-none tracking-tightest opacity-50 sm:block"
            >
              {step.index}
            </span>

            <motion.span
              aria-hidden="true"
              className="relative z-10 mt-3 h-6 w-6 rounded-full border bg-ink"
              variants={{
                hidden: { borderColor: "rgba(28,27,25,0.15)", scale: 0.7 },
                visible: { borderColor: "#C8661C", scale: 1, transition: { duration: 0.6, ease: EASE } },
              }}
            >
              <motion.span
                className="absolute inset-[5px] rounded-full bg-amber"
                variants={{ hidden: { scale: 0 }, visible: { scale: 1, transition: { duration: 0.6, delay: 0.15, ease: EASE } } }}
              />
            </motion.span>

            <motion.div
              className="relative"
              variants={{ hidden: { opacity: 0.15, y: 30 }, visible: { opacity: 1, y: 0, transition: { duration: 1, ease: EASE } } }}
            >
              <p className="font-display text-sm text-amber">{step.index}</p>
              <h3 className="mt-2 font-display text-[clamp(1.875rem,3.2vw,3.25rem)] font-medium uppercase leading-[0.9] tracking-tightest">
                {step.title}
              </h3>
              <p className="mt-5 max-w-md text-lg leading-relaxed text-mute">{step.body}</p>
              <ul className="mt-5 flex flex-wrap gap-2" aria-label={`${step.title} deliverables`}>
                {step.deliverables.map((d) => (
                  <li key={d} className="rounded-full border border-line px-3 py-1 text-xs text-mute">
                    {d}
                  </li>
                ))}
              </ul>
            </motion.div>
          </motion.li>
        ))}
      </ol>
    </Panel>
  );
}
