/**
 * Personal details. Replace every [PLACEHOLDER] with your own information.
 * Nothing here has been filled in on your behalf.
 */
export const SITE = {
  name: "Sudarshan Saha",
  firstName: "Sudarshan",
  lastName: "Saha",
  /** Short mark used in the HUD labels. */
  handle: "S.Saha",
  title: "CEO · Digital Marketing Entrepreneur · Growth Strategist",
  intro: "Architecting intelligent digital ecosystems where brands are built, scaled and led.",
  /**
   * Hero portrait. Put your photo in /public (e.g. /public/portrait.jpg) and set the path here.
   * Left empty, the hero shows a framed placeholder. A dark, evenly lit photo works best (it is shown in black & white).
   */
  portrait: "",
  role: "Digital Strategy • Creative • Technology",
  email: "[YOUR EMAIL]",
  phone: "[YOUR PHONE]",
  location: "[YOUR LOCATION]",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://example.com",
  description:
    "Portfolio of Sudarshan Saha, a digital creative working across strategy, branding, marketing, design and technology to build digital experiences that make brands matter.",
} as const;

export const SOCIALS = [
  { label: "Instagram", href: "[INSTAGRAM URL]" },
  { label: "LinkedIn", href: "[LINKEDIN URL]" },
  { label: "Behance", href: "[BEHANCE URL]" },
  { label: "Dribbble", href: "[DRIBBBLE URL]" },
] as const;

export const NAV = [
  { label: "Work", href: "#work" },
  { label: "Services", href: "#expertise" },
  { label: "About", href: "#about" },
  { label: "Process", href: "#process" },
  { label: "Contact", href: "#footer" },
] as const;

/** True while a value is still an unreplaced [PLACEHOLDER]. */
export const isPlaceholder = (value: string) => /^\[.+\]$/.test(value);

/** Placeholder URLs resolve to "#" so links never point at a broken path. */
export const safeHref = (value: string) => (isPlaceholder(value) ? "#" : value);

/** mailto: link once the email is set; until then, it scrolls to the footer (the contact point). */
export const mailto = (subject?: string) =>
  isPlaceholder(SITE.email)
    ? "#footer"
    : `mailto:${SITE.email}${subject ? `?subject=${encodeURIComponent(subject)}` : ""}`;
