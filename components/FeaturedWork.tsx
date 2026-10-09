import { ArrowRight } from "lucide-react";
import { ProjectCard } from "./ProjectCard";
import { Panel } from "./ui/HorizontalSite";
import { Reveal } from "./ui/Reveal";
import { WordReveal } from "./ui/WordReveal";
import { PROJECTS, type ProjectLayout } from "@/lib/projects";

/**
 * Vertical case-study column. Each layout sets the card's width/alignment and visual proportion,
 * so the stack reads as an asymmetric editorial sequence rather than a uniform list.
 */
const LAYOUTS: Record<ProjectLayout, { card: string; visual: string; sizes: string }> = {
  feature: { card: "w-full", visual: "aspect-[4/5] sm:aspect-[16/9]", sizes: "(min-width: 1024px) 58vw, 100vw" },
  offset: { card: "w-full sm:ml-auto sm:w-[72%]", visual: "aspect-[4/5] sm:aspect-[4/3]", sizes: "(min-width: 1024px) 42vw, 72vw" },
  wide: { card: "w-full", visual: "aspect-[4/5] sm:aspect-[21/9]", sizes: "(min-width: 1024px) 58vw, 100vw" },
  tall: { card: "w-full sm:w-[58%]", visual: "aspect-[3/4]", sizes: "(min-width: 1024px) 34vw, 58vw" },
  standard: { card: "w-full sm:ml-auto sm:w-[78%]", visual: "aspect-[16/10]", sizes: "(min-width: 1024px) 45vw, 78vw" },
};

export function FeaturedWork() {
  return (
    <Panel
      id="work"
      label="Case studies"
      labelledBy="work-title"
      rail
      className="lg:w-screen"
      asideClassName="px-5 pt-24 sm:px-8 sm:pt-32 lg:flex lg:w-[36vw] lg:flex-col lg:justify-center lg:px-[4vw] lg:pt-0"
      aside={
        <>
          <Reveal as="p" className="label">
            <span className="text-amber">(05)</span>&nbsp;&nbsp;Selected work
          </Reveal>
          <WordReveal id="work-title" text="CASE STUDIES" className="display-xl mt-6" />
          <Reveal className="mt-8 max-w-sm">
            <p className="leading-relaxed text-mute">
              A closer look at the brands I have worked with — the challenge each one faced, the approach we took, and
              the results it delivered.
            </p>
          </Reveal>
        </>
      }
      innerClassName="px-5 pb-24 pt-12 sm:px-8 sm:pb-32 lg:ml-[36vw] lg:pb-28 lg:pl-0 lg:pr-[6vw] lg:pt-28"
    >
      <div className="flex flex-col gap-20 lg:gap-28">
        {PROJECTS.map((project, i) => {
          const layout = LAYOUTS[project.layout];
          return (
            <ProjectCard
              key={project.slug}
              project={project}
              index={i}
              visualClassName={layout.visual}
              sizes={layout.sizes}
              className={layout.card}
            />
          );
        })}

        <div className="flex flex-col items-start gap-6 border-t border-line pt-12 sm:flex-row sm:items-center sm:justify-between">
          <p className="font-display text-[clamp(1.5rem,2.4vw,2.25rem)] font-medium uppercase leading-[0.95] tracking-tightest">
            Your brand <span className="text-amber">next?</span>
          </p>
          <a
            href="#footer"
            className="group inline-flex items-center gap-3 rounded-full border border-line px-6 py-3 text-sm text-bone transition-colors duration-500 hover:border-amber-soft hover:bg-amber-soft hover:text-bone"
          >
            Start a project
            <ArrowRight aria-hidden="true" strokeWidth={1.5} className="h-4 w-4 transition-transform duration-500 group-hover:translate-x-1" />
          </a>
        </div>
      </div>
    </Panel>
  );
}
