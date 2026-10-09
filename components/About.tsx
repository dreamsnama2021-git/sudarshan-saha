import { Panel } from "./ui/HorizontalSite";
import { ExperienceTabs } from "./ExperienceTabs";
import { Reveal } from "./ui/Reveal";
import { WordReveal } from "./ui/WordReveal";

export function About() {
  return (
    <Panel
      id="about"
      label="About"
      labelledBy="about-title"
      className="overflow-hidden lg:w-screen"
      innerClassName="px-5 py-24 sm:px-8 sm:py-32 lg:flex lg:h-full lg:items-center lg:px-[5vw] lg:pb-20 lg:pt-24"
    >
      <div className="grid w-full grid-cols-1 gap-16 sm:grid-cols-2 lg:grid-cols-[auto_1fr_1.15fr] lg:items-center lg:gap-x-[4vw]">
        {/* Desktop only: empty slot the hero portrait glides into (drawn by TravellingPortrait). Phones show the photo once, in the hero. */}
        <div className="sm:col-span-1 lg:col-span-1">
          <div
            id="about-portrait-slot"
            aria-hidden="true"
            className="hidden aspect-[4/5] h-[60vh] lg:block"
          />
        </div>

        <div className="sm:col-span-1 lg:col-span-1">
          <Reveal as="p" className="label">
            <span className="text-amber">(01)</span>&nbsp;&nbsp;About
          </Reveal>
          <WordReveal
            id="about-title"
            text="EXPERIENCE."
            accent={["EXPERIENCE."]}
            className="mt-6 font-display text-[clamp(2rem,3.4vw,3.75rem)] font-medium uppercase leading-[0.9] tracking-tightest"
          />
          <Reveal className="mt-8">
            <p className="text-[clamp(1.05rem,1.3vw,1.25rem)] leading-[1.6] text-bone/90">
              I work at the intersection of creativity, technology and business. My approach is simple: understand the
              problem, build the right strategy, and execute it with precision.
            </p>
          </Reveal>
        </div>

        {/* Option 1: companies history (default) · Option 2: expertise */}
        <Reveal className="sm:col-span-2 lg:col-span-1">
          <ExperienceTabs />
        </Reveal>
      </div>
    </Panel>
  );
}
