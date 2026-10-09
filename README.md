# Portfolio — Sudarshan Saha

Next.js 14 (App Router) · TypeScript · Tailwind CSS · Framer Motion · Lucide.

```bash
npm install
npm run dev      # http://localhost:3000
npm run build && npm start
```

## Make it yours

| What | Where |
| --- | --- |
| Name, email, phone, location, site URL | `lib/site.ts` → `SITE` |
| Instagram / LinkedIn / Behance / Dribbble | `lib/site.ts` → `SOCIALS` |
| Projects (name, category, description, year, image) | `lib/projects.ts` |
| Experience, stats, awards, execution steps, testimonial | `lib/content.ts` |
| Hero portrait | put a photo in `public/` and set `SITE.portrait` in `lib/site.ts` |
| Expertise tiles | `lib/expertise.ts` |

Any value still in `[BRACKETS]` is an unfilled placeholder. Placeholder URLs render as `#`, and email buttons
scroll to the contact section until `SITE.email` is set.

**Project images:** put files in `public/work/` and set `image: "/work/<slug>.jpg"` on the project.
Until then each card renders a styled placeholder showing the expected path.

## Opening sequence

- `components/Hero.tsx` — name, title and CTAs over `HeroBackdrop` (CSS grid, glow and scan line; no WebGL).
- `components/TravellingPortrait.tsx` — desktop overlay: the portrait glides from the hero into the About photo slot as the strip moves.
- `components/Expertise.tsx` — "Core Expertise" tile grid.
- `components/Dock.tsx` — floating bottom navigation that follows the current section.
- `components/ui/useGlitch.ts` — RGB-split text shadow driven by the strip's speed.

## Landscape site (desktop)

`components/ui/HorizontalSite.tsx` turns the whole page into one horizontal strip on screens ≥1024px.
Every section is a `<Panel>`; scrolling down slides the strip left, panel by panel.

- A panel whose content is taller than the screen (Services, Selected Work, Process) **scrolls vertically first**,
  with its heading pinned via the `aside` prop and a progress line on the right (`rail`), then the strip moves on.
- Panels that fit the screen (Hero, About, Expertise, Achievements, Testimonial, Footer) move straight through.
- In-page links (#work, #contact…) and keyboard focus are routed to the right scroll position.
- A site-wide rail at the bottom shows progress and the current section name.
- Below 1024px the same markup renders as a normal vertical page.

To add a section: wrap it in `<Panel id="…" label="…" className="lg:w-screen">`. Give it `aside` + `rail` if it should scroll vertically.

## Deploy (Cloudflare)

The site is a static export: `npm run build` writes plain files to `out/`, and `wrangler.jsonc` tells Cloudflare
to serve that folder as static assets.

- Build command: `npm run build`
- Deploy command: `npx wrangler deploy`

Locally, `npm start` serves the built `out/` folder; use `npm run dev` while editing.
