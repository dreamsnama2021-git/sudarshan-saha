import { Reveal } from "./ui/Reveal";
import { Panel } from "./ui/HorizontalSite";
import { WordReveal } from "./ui/WordReveal";
import { TESTIMONIAL } from "@/lib/content";

export function Testimonial() {
  return (
    <Panel id="testimonial" label="Testimonial" labelledBy="testimonial-label" className="lg:w-screen" innerClassName="px-5 py-24 sm:px-8 sm:py-32 lg:flex lg:h-full lg:items-center lg:px-[5vw] lg:pb-20 lg:pt-24">
      <div className="w-full">
        <Reveal as="p" className="label" >
          <span id="testimonial-label">
            <span className="text-amber">(07)</span>&nbsp;&nbsp;In their words
          </span>
        </Reveal>
        <figure className="mt-10 lg:mt-14">
          <blockquote className="relative">
            <span aria-hidden="true" className="absolute -top-[0.4em] left-0 font-display text-[clamp(4rem,9vw,8rem)] leading-none text-amber/25">
              “
            </span>
            <WordReveal
              as="p"
              text={TESTIMONIAL.quote}
              accent={["signal."]}
              gap={0.04}
              className="relative font-display text-[clamp(1.75rem,3.4vw,3.5rem)] font-medium leading-[1] tracking-tightest"
            />
          </blockquote>
          <Reveal as="div" className="mt-12 flex items-center gap-5 border-t border-line pt-6 lg:mt-16">
            <figcaption className="flex flex-col gap-1 sm:flex-row sm:items-center sm:gap-6">
              <span className="font-display text-lg uppercase tracking-tight text-bone">{TESTIMONIAL.name}</span>
              <span className="text-sm text-mute">{TESTIMONIAL.role}</span>
            </figcaption>
          </Reveal>
        </figure>
      </div>
    </Panel>
  );
}
