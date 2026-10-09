/**
 * Case studies.
 * - Visuals: drop an image into /public/work and set `image` (e.g. "/work/ornomart.jpg").
 *   Without one, a styled placeholder panel is rendered.
 * - `summary` lines are starting points. `year`, `challenge`, `approach` and `results` are
 *   [PLACEHOLDERS] — replace them with the real story and numbers for each client.
 */
export type ProjectLayout = "feature" | "offset" | "wide" | "tall" | "standard";

export type CaseResult = { value: string; label: string };

export type Project = {
  slug: string;
  name: string;
  category: string;
  /** One-line overview of the engagement. */
  summary: string;
  year: string;
  services: string[];
  /** What the brand needed to solve. */
  challenge: string;
  /** What you did: strategy and execution. */
  approach: string;
  /** Up to three headline outcomes, e.g. { value: "+120%", label: "Qualified leads" }. */
  results: CaseResult[];
  layout: ProjectLayout;
  image?: string;
  imageAlt?: string;
  /** Brand logo for the "Brands I've worked with" list, e.g. "/brands/ornomart.svg". Initials are shown until set. */
  logo?: string;
  /** Link to a full case study page or PDF, when you have one. */
  href?: string;
};

const TODO_CASE = {
  year: "[YEAR]",
  challenge: "[The challenge — what the brand needed to solve]",
  approach: "[The approach — the strategy and execution you delivered]",
  results: [
    { value: "[00%]", label: "[Result metric]" },
    { value: "[00+]", label: "[Result metric]" },
    { value: "[0x]", label: "[Result metric]" },
  ],
};

export const PROJECTS: Project[] = [
  {
    ...TODO_CASE,
    slug: "greens-media",
    name: "Greens Media",
    category: "Digital Marketing & Web Development",
    summary: "A digital presence and marketing engine built to turn attention into enquiries.",
    services: ["Strategy", "Website", "Social"],
    layout: "feature",
  },
  {
    ...TODO_CASE,
    slug: "ornomart",
    name: "Ornomart",
    category: "Jewellery Brand & Digital Experience",
    summary: "A jewellery brand experience where product craft leads every digital touchpoint.",
    services: ["Branding", "E-commerce", "Content"],
    layout: "offset",
  },
  {
    ...TODO_CASE,
    slug: "raviraj-realty",
    name: "Raviraj Realty",
    category: "Real Estate Marketing",
    summary: "Launch campaigns and lead generation for residential developments.",
    services: ["Campaigns", "Performance", "Creative"],
    layout: "wide",
  },
  {
    ...TODO_CASE,
    slug: "tiranga-autotech",
    name: "Tiranga Autotech",
    category: "EV Brand & Digital Campaigns",
    summary: "Positioning and campaign creative for an electric-mobility brand.",
    services: ["Brand", "Campaigns", "Social"],
    layout: "tall",
  },
  {
    ...TODO_CASE,
    slug: "param-corporation",
    name: "Param Corporation",
    category: "Pharma Marketing & Promotional Solutions",
    summary: "Promotional systems and communication material for pharmaceutical marketing.",
    services: ["Communication", "Print", "Digital"],
    layout: "standard",
  },
  {
    ...TODO_CASE,
    slug: "soko",
    name: "SOKO",
    category: "Beauty & Skincare Brand",
    summary: "Brand storytelling and content for a beauty and skincare label.",
    services: ["Identity", "Content", "Social"],
    layout: "offset",
  },
];
