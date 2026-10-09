"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { Panel } from "./ui/HorizontalSite";
import { Reveal } from "./ui/Reveal";
import { WordReveal } from "./ui/WordReveal";
import { fadeUp } from "@/lib/motion";
import { PROJECTS, type Project } from "@/lib/projects";

const initials = (name: string) =>
  name
    .split(" ")
    .map((w) => w[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

/** Brand logo when provided, otherwise a monogram tile. */
function BrandMark({ brand }: { brand: Project }) {
  return (
    <span className="relative flex h-16 w-16 shrink-0 items-center justify-center overflow-hidden rounded-2xl border border-line bg-ink transition-colors duration-500 group-hover:border-amber/60">
      {brand.logo ? (
        <Image src={brand.logo} alt={`${brand.name} logo`} fill sizes="64px" className="object-contain p-2" />
      ) : (
        <span aria-hidden="true" className="font-display text-lg font-semibold tracking-tight text-bone/80 group-hover:text-amber">
          {initials(brand.name)}
        </span>
      )}
    </span>
  );
}

/** One brand row: mark, name, industry, what was done, scope — links to its case study. */
function BrandRow({ brand, index }: { brand: Project; index: number }) {
  return (
    <motion.article
      variants={fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      className="group relative grid grid-cols-1 items-center gap-6 overflow-hidden rounded-3xl border border-line bg-ink-900 p-6 transition-colors duration-700 hover:border-amber/50 sm:grid-cols-[auto_1fr_auto] sm:gap-8 sm:p-8 lg:p-10"
    >
      <div aria-hidden="true" className="bg-grid absolute inset-0 opacity-30" />
      <div
        aria-hidden="true"
        className="absolute -left-1/4 top-0 h-full w-2/3 rounded-full bg-amber/10 opacity-0 blur-3xl transition-opacity duration-700 group-hover:opacity-100"
      />

      <div className="relative flex items-center gap-6 sm:flex-col sm:items-start">
        <span className="font-display text-sm text-amber">{String(index + 1).padStart(2, "0")}</span>
        <BrandMark brand={brand} />
      </div>

      <div className="relative">
        <h3 className="font-display text-[clamp(1.4rem,2.1vw,2.1rem)] font-medium uppercase leading-[0.95] tracking-tightest transition-transform duration-700 ease-out group-hover:translate-x-2">
          {brand.name}
        </h3>
        <p className="mt-2 font-mono text-[0.65rem] uppercase tracking-[0.18em] text-amber">{brand.category}</p>
        <p className="mt-4 max-w-xl leading-relaxed text-mute transition-colors duration-500 group-hover:text-bone/85">
          {brand.summary}
        </p>
        <ul className="mt-5 flex flex-wrap gap-2" aria-label={`Work for ${brand.name}`}>
          {brand.services.map((tag) => (
            <li key={tag} className="rounded-full border border-line bg-ink/60 px-3 py-1 text-xs text-mute">
              {tag}
            </li>
          ))}
        </ul>
      </div>

      <a
        href={`#case-${brand.slug}`}
        aria-label={`Read the ${brand.name} case study`}
        className="relative inline-flex h-12 w-12 items-center justify-center rounded-full border border-line text-bone transition-colors duration-500 after:absolute after:inset-0 after:content-[''] group-hover:border-amber-soft group-hover:bg-amber-soft group-hover:text-bone"
      >
        <ArrowUpRight aria-hidden="true" strokeWidth={1.5} className="h-4 w-4" />
      </a>
    </motion.article>
  );
}

export function Brands() {
  const industries = new Set(PROJECTS.map((p) => p.category)).size;

  return (
    <Panel
      id="brands"
      label="Brands"
      labelledBy="brands-title"
      rail
      className="bg-ink lg:w-screen"
      asideClassName="px-5 pt-24 sm:px-8 sm:pt-32 lg:flex lg:w-[36vw] lg:flex-col lg:justify-center lg:px-[4vw] lg:pt-0"
      aside={
        <>
          <Reveal as="p" className="label">
            <span className="text-amber">(04)</span>&nbsp;&nbsp;Brands
          </Reveal>
          <WordReveal id="brands-title" text="BRANDS I'VE WORKED WITH" accent={["WITH"]} className="display-lg mt-6" />
          <Reveal as="p" className="mt-6 font-mono text-[0.7rem] uppercase tracking-[0.2em] text-bone/80">
            {PROJECTS.length} brands · {industries} industries
          </Reveal>
          <Reveal as="p" className="mt-6 max-w-sm leading-relaxed text-mute">
            From real estate and pharma to beauty, jewellery and electric mobility — brands I&apos;ve helped grow across
            marketing, digital and creative.
          </Reveal>
        </>
      }
      innerClassName="px-5 pb-24 pt-12 sm:px-8 sm:pb-32 lg:ml-[36vw] lg:pb-28 lg:pl-0 lg:pr-[6vw] lg:pt-28"
    >
      <div className="flex flex-col gap-4 lg:gap-5">
        {PROJECTS.map((brand, i) => (
          <BrandRow key={brand.slug} brand={brand} index={i} />
        ))}
      </div>
    </Panel>
  );
}
