"use client";

import { motion } from "framer-motion";
import { Panel } from "./ui/HorizontalSite";
import { Item, Stagger } from "./ui/Reveal";
import { useGlitchShadow } from "./ui/useGlitch";
import { EXPERTISE, type ExpertiseArea } from "@/lib/expertise";
import { EASE } from "@/lib/motion";

function Tile({ area }: { area: ExpertiseArea }) {
  const Icon = area.icon;
  return (
    <Item as="li">
      <motion.article
        whileHover={{ y: -6 }}
        transition={{ duration: 0.5, ease: EASE }}
        className={`group relative flex h-full min-h-[11rem] flex-col justify-between gap-6 overflow-hidden rounded-2xl border p-4 transition-colors duration-500 sm:p-5 lg:min-h-[13rem] ${
          area.featured
            ? "border-amber/70 bg-amber/[0.07] shadow-[0_0_40px_-12px_rgba(232,163,94,0.55)]"
            : "border-line bg-ink-900/80 hover:border-amber/50"
        }`}
      >
        <span
          aria-hidden="true"
          className="absolute -right-1/3 -top-1/3 h-2/3 w-2/3 rounded-full bg-amber/15 opacity-0 blur-2xl transition-opacity duration-700 group-hover:opacity-100"
        />
        <div className="relative flex items-start justify-between">
          <span
            className={`flex h-9 w-9 items-center justify-center rounded-lg border transition-colors duration-500 ${
              area.featured ? "border-amber/60 text-amber" : "border-line text-bone/80 group-hover:text-amber"
            }`}
          >
            <Icon aria-hidden="true" strokeWidth={1.5} className="h-4 w-4" />
          </span>
          <span className="font-mono text-[0.6rem] tracking-[0.2em] text-mute">{area.index}</span>
        </div>

        <div className="relative">
          <h3 className="font-display text-[clamp(1rem,1.3vw,1.25rem)] font-semibold leading-tight text-bone">{area.title}</h3>
          <ul className="mt-3 flex flex-wrap gap-1.5" aria-label={`${area.title} skills`}>
            {area.skills.map((skill) => (
              <li key={skill} className="rounded-full border border-line bg-ink/70 px-2.5 py-1 text-[0.7rem] text-mute">
                {skill}
              </li>
            ))}
          </ul>
        </div>
      </motion.article>
    </Item>
  );
}

/** Areas of expertise: what each discipline actually covers. */
export function Expertise() {
  const textShadow = useGlitchShadow(0.8);

  return (
    <Panel
      id="expertise"
      label="Expertise"
      labelledBy="expertise-title"
      className="lg:w-screen"
      innerClassName="px-5 py-24 sm:px-8 sm:py-32 lg:flex lg:h-full lg:items-center lg:pb-24 lg:px-[6vw] lg:pt-24"
    >
      <div className="w-full">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="flex items-center gap-3 font-mono text-[0.68rem] uppercase tracking-[0.24em] text-amber">
              <span aria-hidden="true" className="h-px w-8 bg-amber" />
              02 / Expertise
            </p>
            <motion.h2
              id="expertise-title"
              style={{ textShadow }}
              className="mt-5 font-display text-[clamp(2rem,4.2vw,4.25rem)] font-bold uppercase leading-[0.95] tracking-tightest"
            >
              Core{" "}
              <span className="text-stroke [-webkit-text-stroke:1.5px_rgba(28,27,25,0.85)]">Expertise</span>
            </motion.h2>
          </div>
          <p className="max-w-sm leading-relaxed text-mute lg:pb-2 lg:text-right">
            Eight disciplines, practised hands-on — the skills behind every strategy, campaign and build.
          </p>
        </div>

        <Stagger as="ul" className="mt-10 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:mt-12 lg:grid-cols-4 lg:gap-4" gap={0.06}>
          {EXPERTISE.map((area) => (
            <Tile key={area.index} area={area} />
          ))}
        </Stagger>
      </div>
    </Panel>
  );
}
