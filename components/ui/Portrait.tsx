import Image from "next/image";
import { User } from "lucide-react";
import { PORTRAIT_TAGS } from "@/lib/expertise";
import { SITE } from "@/lib/site";

const CORNER = "absolute h-5 w-5 border-amber";

/**
 * HUD-framed black & white portrait with corner brackets and floating tags.
 * Uses SITE.portrait when set; otherwise a framed placeholder.
 */
export function Portrait({ className = "", priority = false }: { className?: string; priority?: boolean }) {
  const [strategy, creative, growth, digital] = PORTRAIT_TAGS;
  return (
    <figure className={`relative ${className}`}>
      <div className="relative h-full w-full overflow-hidden rounded-xl border border-line bg-ink-800">
        {SITE.portrait ? (
          <Image
            src={SITE.portrait}
            alt={`Portrait of ${SITE.name}`}
            fill
            priority={priority}
            sizes="(min-width: 1024px) 34vw, 70vw"
            className="object-cover grayscale contrast-[1.05]"
          />
        ) : (
          <>
            <div aria-hidden="true" className="bg-grid absolute inset-0 opacity-60" />
            <div
              aria-hidden="true"
              className="absolute bottom-0 left-1/2 h-3/4 w-3/4 -translate-x-1/2 rounded-t-full bg-gradient-to-t from-ink-700 to-ink-800"
            />
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 text-mute">
              <User aria-hidden="true" strokeWidth={1} className="h-14 w-14" />
              <span className="font-mono text-[0.65rem] uppercase tracking-[0.2em]">Your photo</span>
            </div>
          </>
        )}
        {/* Scanline sheen */}
        <div aria-hidden="true" className="scanlines pointer-events-none absolute inset-0 opacity-40" />
        <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-ink/80 to-transparent" />
      </div>

      {/* Corner brackets */}
      <span aria-hidden="true" className={`${CORNER} -left-2 -top-2 border-l border-t`} />
      <span aria-hidden="true" className={`${CORNER} -right-2 -top-2 border-r border-t`} />
      <span aria-hidden="true" className={`${CORNER} -bottom-2 -left-2 border-b border-l`} />
      <span aria-hidden="true" className={`${CORNER} -bottom-2 -right-2 border-b border-r`} />

      {/* Floating HUD tags */}
      <span aria-hidden="true" className="hud-tag absolute -right-4 top-[12%] inline-flex translate-x-1/2">+ {strategy}</span>
      <span aria-hidden="true" className="hud-tag absolute -left-4 top-[46%] inline-flex -translate-x-1/2">+ {digital}</span>
      <span aria-hidden="true" className="hud-tag absolute -right-4 top-[58%] inline-flex translate-x-1/2">+ {growth}</span>
      <span aria-hidden="true" className="hud-tag absolute -left-4 top-[8%] -translate-x-1/2 hidden sm:inline-flex">+ {creative}</span>

      <figcaption className="absolute -bottom-9 left-0 hidden w-full justify-between whitespace-nowrap lg:flex font-mono text-[0.6rem] uppercase tracking-[0.2em] text-mute">
        <span>{SITE.handle} / Portfolio 2026</span>
        <span>Digital Command Centre</span>
      </figcaption>
    </figure>
  );
}
