import { Award, BadgeCheck } from "lucide-react";
import { Counter } from "./ui/Counter";
import { Glyph3D } from "./ui/Glyph3D";
import { Panel } from "./ui/HorizontalSite";
import { Item, Stagger } from "./ui/Reveal";
import { WordReveal } from "./ui/WordReveal";
import { AWARDS, CERTIFICATIONS, STATS } from "@/lib/content";

const TILE =
  "relative overflow-hidden rounded-3xl border border-line bg-ink-900/70 p-6 transition-colors duration-700 hover:border-bone/25 sm:p-8";

/**
 * Achievements bento: headline statement, key figures, awards & recognition and certifications
 * composed as one grid of tiles.
 */
export function Intro() {
  const [years, brands, services] = STATS;

  return (
    <Panel
      id="intro"
      label="Achievements"
      labelledBy="intro-title"
      className="lg:w-[118vw]"
      innerClassName="px-5 py-24 sm:px-8 sm:py-32 lg:flex lg:h-full lg:items-center lg:px-[4vw] lg:pb-20 lg:pt-24"
    >
      <div className="w-full">
        <Stagger className="grid auto-rows-auto grid-cols-1 gap-3 sm:grid-cols-2 lg:h-[calc(100svh-11rem)] lg:grid-cols-12 lg:grid-rows-[1fr_1fr_auto] lg:gap-4" gap={0.08}>
          {/* Statement */}
          <Item className={`${TILE} flex flex-col justify-between gap-16 sm:col-span-2 lg:col-span-8 lg:row-span-2 lg:p-12`}>
            <p className="label">
              <span className="text-amber">(06)</span>&nbsp;&nbsp;Achievements
            </p>
            <div>
              <WordReveal
                id="intro-title"
                text="ACHIEVEMENTS & MILESTONES."
                accent={["MILESTONES."]}
                className="font-display text-[clamp(2rem,3.4vw,3.75rem)] font-medium uppercase leading-[0.9] tracking-tightest"
              />
              <p className="mt-8 max-w-2xl text-[clamp(1.05rem,1.4vw,1.25rem)] leading-[1.6] text-mute">
                A snapshot of what the work has added up to — the numbers, the recognition and the milestones collected
                along the way.
              </p>
            </div>
          </Item>

          {/* Key figures */}
          {[years, brands].map((stat) => (
            <Item key={stat.label} className={`${TILE} flex flex-col justify-between gap-10 lg:col-span-4`}>
              <p className="label">{stat.label}</p>
              <Counter
                value={stat.value}
                suffix={stat.suffix}
                className="block font-display text-[clamp(2.5rem,4vw,4rem)] font-medium leading-none tracking-tightest"
              />
            </Item>
          ))}

          {/* Awards & recognition */}
          <Item className={`${TILE} flex flex-col gap-5 sm:col-span-2 lg:col-span-5`}>
            <p className="label flex items-center gap-2">
              <Award aria-hidden="true" strokeWidth={1.5} className="h-4 w-4 text-amber" />
              Awards &amp; recognition
            </p>
            <ul className="border-t border-line">
              {AWARDS.map((a, i) => (
                <li key={i} className="flex items-baseline justify-between gap-4 border-b border-line py-2.5">
                  <span className="text-sm font-medium text-bone">{a.title}</span>
                  <span className="shrink-0 font-mono text-[0.62rem] uppercase tracking-[0.16em] text-amber">{a.meta}</span>
                </li>
              ))}
            </ul>
          </Item>

          {/* Services figure + glyph */}
          <Item className={`${TILE} flex items-end justify-between gap-6 lg:col-span-4`}>
            <div>
              <Counter
                value={services.value}
                suffix={services.suffix}
                className="block font-display text-[clamp(2.25rem,3.4vw,3.5rem)] font-medium leading-none tracking-tightest"
              />
              <p className="label mt-4">{services.label}</p>
            </div>
            <Glyph3D kind="tiles" className="mb-2 shrink-0" />
          </Item>

          {/* Certifications */}
          <Item className={`${TILE} flex flex-col gap-5 bg-amber/[0.06] lg:col-span-3`}>
            <p className="label flex items-center gap-2">
              <BadgeCheck aria-hidden="true" strokeWidth={1.5} className="h-4 w-4 text-amber" />
              Certifications
            </p>
            <ul className="flex flex-col gap-3">
              {CERTIFICATIONS.map((c, i) => (
                <li key={i}>
                  <span className="block text-sm font-medium text-bone">{c.title}</span>
                  <span className="mt-0.5 block font-mono text-[0.62rem] uppercase tracking-[0.16em] text-mute">{c.meta}</span>
                </li>
              ))}
            </ul>
          </Item>
        </Stagger>
      </div>
    </Panel>
  );
}
