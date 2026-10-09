import { ArrowUpRight } from "lucide-react";
import { Panel } from "./ui/HorizontalSite";
import { SITE, SOCIALS, mailto, safeHref } from "@/lib/site";

const LINKS = [
  { label: "About", href: "#about" },
  { label: "Expertise", href: "#expertise" },
  { label: "Work", href: "#work" },
];

/**
 * Closing panel of the strip on desktop; a regular footer on smaller screens.
 * Also the site's contact point: every "Let's talk / Connect" button lands here.
 */
export function Footer() {
  return (
    <Panel
      as="footer"
      id="footer"
      label="Get in touch"
      className="border-t border-line lg:w-[42vw] lg:border-l lg:border-t-0"
      innerClassName="flex flex-col gap-10 px-5 py-12 sm:px-8 lg:h-full lg:justify-between lg:px-[3vw] lg:pb-24 lg:pt-28"
    >
      <div>
        <p className="font-display text-2xl font-medium tracking-tight text-bone">{SITE.name}</p>
        <p className="mt-2 text-sm text-mute">{SITE.role}</p>
      </div>

      {/* Get in touch */}
      <div>
        <p className="font-mono text-[0.65rem] uppercase tracking-[0.2em] text-amber">Get in touch</p>
        <a
          href={mailto("New project enquiry")}
          className="group mt-3 inline-flex items-center gap-2 font-display text-[clamp(1.25rem,1.8vw,1.75rem)] font-medium tracking-tight text-bone transition-colors hover:text-amber"
        >
          {SITE.email}
          <ArrowUpRight aria-hidden="true" strokeWidth={1.5} className="h-5 w-5 transition-transform duration-500 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
        </a>
        <ul className="mt-5 flex flex-wrap gap-x-5 gap-y-2" aria-label="Social profiles">
          {SOCIALS.map((s) => (
            <li key={s.label}>
              <a
                href={safeHref(s.href)}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-mute transition-colors hover:text-amber"
              >
                {s.label} ↗
              </a>
            </li>
          ))}
        </ul>
      </div>

      <nav aria-label="Footer">
        <ul className="flex flex-wrap gap-x-8 gap-y-3 lg:flex-col lg:gap-y-2">
          {LINKS.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                className="text-sm text-mute transition-colors hover:text-bone lg:font-display lg:text-[clamp(1.25rem,1.7vw,1.75rem)] lg:font-medium lg:uppercase lg:leading-none lg:tracking-tightest lg:text-bone/80 lg:hover:text-amber"
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>

      <div className="flex flex-col gap-2 border-t border-line pt-6 text-xs text-mute sm:flex-row sm:justify-between">
        <p>© 2026 {SITE.name}. All rights reserved.</p>
        <a href="#top" className="transition-colors hover:text-bone">
          Back to start ↑
        </a>
      </div>
    </Panel>
  );
}
