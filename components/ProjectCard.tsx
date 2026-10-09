"use client";

import Image from "next/image";
import { motion, useMotionValue, useReducedMotion, useSpring } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { useRef, useState, type PointerEvent } from "react";
import { EASE, fadeUp } from "@/lib/motion";
import type { Project } from "@/lib/projects";

type ProjectCardProps = {
  project: Project;
  index: number;
  /** Size classes for the visual, e.g. "aspect-[4/5] lg:aspect-auto lg:h-[56vh]". */
  visualClassName: string;
  className?: string;
  sizes?: string;
};

/** Styled stand-in until a real image is added in lib/projects.ts. */
function Placeholder({ project }: { project: Project }) {
  const initials = project.name
    .split(" ")
    .map((w) => w[0])
    .join("")
    .slice(0, 2);
  return (
    <div className="absolute inset-0 bg-ink-800">
      <div aria-hidden="true" className="bg-grid absolute inset-0" />
      <div aria-hidden="true" className="absolute -right-[10%] -top-[20%] h-[80%] w-[70%] rounded-full bg-amber/10 blur-[90px]" />
      <div aria-hidden="true" className="absolute inset-0 flex items-center justify-center">
        <span className="text-stroke select-none font-display text-[clamp(6rem,18vw,16rem)] font-medium leading-none tracking-tightest">
          {initials}
        </span>
      </div>
      <p className="absolute bottom-4 left-4 font-mono text-[0.65rem] text-mute/70">/public/work/{project.slug}.jpg</p>
    </div>
  );
}

export function ProjectCard({ project, index, visualClassName, className = "", sizes = "(min-width: 1024px) 60vw, 100vw" }: ProjectCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();
  const [hovered, setHovered] = useState(false);

  // "View case" cursor that follows the pointer inside the visual.
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 300, damping: 30, mass: 0.5 });
  const sy = useSpring(y, { stiffness: 300, damping: 30, mass: 0.5 });

  const onMove = (e: PointerEvent<HTMLDivElement>) => {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    x.set(e.clientX - rect.left);
    y.set(e.clientY - rect.top);
  };

  const href = project.href ?? "#footer";

  return (
    <motion.article
      id={`case-${project.slug}`}
      variants={fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      className={`group relative ${className}`}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
    >
      <div
        ref={ref}
        onPointerMove={onMove}
        onPointerEnter={onMove}
        className={`relative overflow-hidden rounded-3xl border transition-colors duration-700 ease-out ${visualClassName} ${
          hovered ? "border-amber/50" : "border-line"
        }`}
      >
        <motion.div
          className="absolute inset-0"
          animate={{ scale: hovered && !reduceMotion ? 1.04 : 1 }}
          transition={{ duration: 1.2, ease: EASE }}
        >
          {project.image ? (
            <Image src={project.image} alt={project.imageAlt ?? `${project.name} — ${project.category}`} fill sizes={sizes} className="object-cover" />
          ) : (
            <Placeholder project={project} />
          )}
        </motion.div>

        {/* Depth: the frame darkens toward the edges on hover, pulling the visual forward. */}
        <div
          aria-hidden="true"
          className={`pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_40%,rgba(28,27,25,0.18)_100%)] transition-opacity duration-700 ${
            hovered ? "opacity-100" : "opacity-40"
          }`}
        />

        <span className="absolute left-4 top-4 rounded-full border border-line bg-ink/60 px-3 py-1 font-display text-xs text-bone backdrop-blur-md">
          {String(index + 1).padStart(2, "0")}
        </span>

        {!reduceMotion && (
          <motion.span
            aria-hidden="true"
            className="pointer-events-none absolute left-0 top-0 z-10 -ml-12 -mt-12 hidden h-24 w-24 items-center justify-center rounded-full bg-amber-soft text-[0.7rem] font-medium uppercase tracking-label text-bone md:flex"
            style={{ x: sx, y: sy }}
            initial={false}
            animate={{ scale: hovered ? 1 : 0, opacity: hovered ? 1 : 0 }}
            transition={{ duration: 0.45, ease: EASE }}
          >
            View
          </motion.span>
        )}
      </div>

      <motion.div
        className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-[1fr_auto]"
        animate={{ y: hovered && !reduceMotion ? -4 : 0 }}
        transition={{ duration: 0.8, ease: EASE }}
      >
        <div>
          <h3 className="font-display text-[clamp(1.4rem,2vw,2rem)] font-medium uppercase leading-none tracking-tightest">
            <a href={href} className="after:absolute after:inset-0 after:content-['']">
              {project.name}
            </a>
          </h3>
          <p className={`mt-2 text-sm transition-colors duration-500 ${hovered ? "text-amber" : "text-mute"}`}>{project.category}</p>
        </div>
        <div className="flex items-start gap-4 sm:flex-col sm:items-end">
          <span className="label">{project.year}</span>
          <ArrowUpRight
            aria-hidden="true"
            strokeWidth={1.25}
            className={`h-6 w-6 transition-all duration-700 ease-out ${hovered ? "translate-x-1 -translate-y-1 text-amber" : "text-mute"}`}
          />
        </div>
        <p className="max-w-2xl text-[0.95rem] leading-relaxed text-bone/80 sm:col-span-2">{project.summary}</p>

        {/* Case study: challenge → approach → results */}
        <dl className="grid grid-cols-1 gap-5 sm:col-span-2 sm:grid-cols-2 sm:gap-8">
          <div>
            <dt className="font-mono text-[0.62rem] uppercase tracking-[0.2em] text-amber">The challenge</dt>
            <dd className="mt-2 text-sm leading-relaxed text-mute">{project.challenge}</dd>
          </div>
          <div>
            <dt className="font-mono text-[0.62rem] uppercase tracking-[0.2em] text-amber">The approach</dt>
            <dd className="mt-2 text-sm leading-relaxed text-mute">{project.approach}</dd>
          </div>
        </dl>

        <div className="sm:col-span-2">
          <p className="font-mono text-[0.62rem] uppercase tracking-[0.2em] text-amber">The results</p>
          <ul className="mt-3 grid grid-cols-3 border-y border-line" aria-label={`${project.name} results`}>
            {project.results.map((r, i) => (
              <li key={i} className={`py-4 ${i > 0 ? "border-l border-line pl-4" : ""}`}>
                <span className="block font-display text-[clamp(1.25rem,1.8vw,1.75rem)] font-medium leading-none tracking-tightest text-bone">
                  {r.value}
                </span>
                <span className="mt-2 block text-xs text-mute">{r.label}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-4 sm:col-span-2">
          <ul className="flex flex-wrap gap-2" aria-label="Scope">
            {project.services.map((s) => (
              <li key={s} className="rounded-full border border-line px-3 py-1 text-xs text-bone/70">
                {s}
              </li>
            ))}
          </ul>
          {/* The whole card is the link (stretched title link); this is its visible label. */}
          <span
            aria-hidden="true"
            className={`font-mono text-[0.65rem] uppercase tracking-[0.2em] transition-colors duration-500 ${
              hovered ? "text-amber" : "text-bone/70"
            }`}
          >
            Read case study →
          </span>
        </div>
      </motion.div>
    </motion.article>
  );
}
