"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Panel } from "./ui/HorizontalSite";
import { Item, Reveal, Stagger } from "./ui/Reveal";
import { WordReveal } from "./ui/WordReveal";
import { EASE } from "@/lib/motion";
import { PROJECTS, type Project } from "@/lib/projects";

const initials = (name: string) =>
  name
    .split(" ")
    .map((w) => w[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

/** A logo-wall tile (not a link): the mark at rest; industry and summary slide up on hover/focus. */
function BrandTile({ brand, index }: { brand: Project; index: number }) {
  return (
    <Item as="li" className="h-full">
      <motion.div
        tabIndex={0}
        role="group"
        whileHover={{ y: -6 }}
        transition={{ duration: 0.5, ease: EASE }}
        className="group relative flex h-full min-h-[11rem] flex-col justify-between overflow-hidden rounded-2xl border border-line bg-ink-900 p-4 outline-none transition-colors duration-500 hover:border-amber/50 focus-visible:border-amber/50 sm:min-h-[14rem] sm:rounded-3xl sm:p-6 lg:min-h-0"
        aria-label={`${brand.name} — ${brand.category}`}
      >
        <div aria-hidden="true" className="bg-grid absolute inset-0 opacity-30" />
        <span className="relative font-mono text-[0.6rem] tracking-[0.2em] text-mute">{String(index + 1).padStart(2, "0")}</span>

        {/* Mark: logo when provided, else monogram */}
        <span className="relative flex max-h-40 flex-1 items-center justify-center overflow-hidden py-4 sm:py-6 transition-all duration-700 ease-out group-hover:max-h-0 group-hover:py-0 group-hover:opacity-0 group-focus-visible:max-h-0 group-focus-visible:py-0 group-focus-visible:opacity-0">
          {brand.logo ? (
            <span className="relative h-16 w-40">
              <Image src={brand.logo} alt="" fill sizes="160px" className="object-contain" />
            </span>
          ) : (
            <span aria-hidden="true" className="font-display text-[clamp(2.5rem,5vw,4.5rem)] font-bold leading-none tracking-tightest text-bone/85">
              {initials(brand.name)}
            </span>
          )}
        </span>

        <span className="relative mt-auto">
          <span className="block font-display text-sm font-semibold sm:text-lg uppercase tracking-tight text-bone">{brand.name}</span>
          {/* Revealed on hover / keyboard focus */}
          <span className="grid grid-rows-[0fr] opacity-0 transition-all duration-500 ease-out group-hover:grid-rows-[1fr] group-hover:opacity-100 group-focus-visible:grid-rows-[1fr] group-focus-visible:opacity-100">
            <span className="overflow-hidden">
              <span className="mt-1 block font-mono text-[0.6rem] uppercase tracking-[0.18em] text-amber">{brand.category}</span>
              <span className="mt-2 line-clamp-2 text-sm leading-relaxed text-mute">{brand.summary}</span>
            </span>
          </span>
        </span>
      </motion.div>
    </Item>
  );
}

/** "Brands I've worked with": a one-screen logo wall. */
export function BrandWall() {
  return (
    <Panel
      id="brand-wall"
      label="Brands"
      labelledBy="brand-wall-title"
      className="lg:w-screen"
      innerClassName="px-5 py-24 sm:px-8 sm:py-32 lg:flex lg:h-full lg:flex-col lg:justify-center lg:px-[6vw] lg:pb-24 lg:pt-24"
    >
      <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <Reveal as="p" className="label">
            <span className="text-amber">(04)</span>&nbsp;&nbsp;Brands
          </Reveal>
          <WordReveal
            id="brand-wall-title"
            text="BRANDS I'VE WORKED WITH"
            accent={["WITH"]}
            className="display-lg mt-5"
          />
        </div>
        <Reveal as="p" className="max-w-sm leading-relaxed text-mute lg:pb-1 lg:text-right">
          {PROJECTS.length} brands across real estate, pharma, beauty, jewellery, electric mobility and media. Hover a
          brand to see what I did.
        </Reveal>
      </div>

      <Stagger as="ul" className="mt-10 grid grid-cols-2 gap-3 lg:mt-12 lg:h-[56vh] lg:grid-cols-3 lg:grid-rows-2 lg:gap-4" gap={0.07}>
        {PROJECTS.map((brand, i) => (
          <BrandTile key={brand.slug} brand={brand} index={i} />
        ))}
      </Stagger>
    </Panel>
  );
}
