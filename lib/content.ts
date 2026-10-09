/** Achievement figures (example numbers from the brief) — confirm or adjust them to your real numbers. */
export const STATS = [
  { value: 7, suffix: "+", label: "Years experience" },
  { value: 50, suffix: "+", label: "Brands & projects" },
  { value: 10, suffix: "+", label: "Digital services" },
] as const;

/** Awards, recognition and notable milestones. Replace the [PLACEHOLDERS]; add or remove rows freely. */
export const AWARDS = [
  { title: "[Award or recognition]", meta: "[Year] · [Awarded by]" },
  { title: "[Award or recognition]", meta: "[Year] · [Awarded by]" },
  { title: "[Milestone, e.g. a major launch or feature]", meta: "[Year] · [Where / with whom]" },
] as const;

/** Certifications and credentials. */
export const CERTIFICATIONS = [
  { title: "[Certification name]", meta: "[Issuer] · [Year]" },
  { title: "[Certification name]", meta: "[Issuer] · [Year]" },
] as const;

export const ABOUT_POINTS = [
  "Strategy",
  "Creative Direction",
  "Digital Marketing",
  "Technology",
  "Brand Communication",
  "Business Growth",
] as const;

/**
 * Companies history, newest first. Replace every [PLACEHOLDER] with your real roles, companies and dates.
 * Add or remove entries freely — the About section lists whatever is here.
 */
export const EXPERIENCE = [
  { period: "[YEAR] — Present", role: "[YOUR ROLE]", company: "[COMPANY NAME]", summary: "[One line on what you lead or built there]" },
  { period: "[YEAR] — [YEAR]", role: "[YOUR ROLE]", company: "[COMPANY NAME]", summary: "[One line on what you lead or built there]" },
  { period: "[YEAR] — [YEAR]", role: "[YOUR ROLE]", company: "[COMPANY NAME]", summary: "[One line on what you lead or built there]" },
  { period: "[YEAR] — [YEAR]", role: "[YOUR ROLE]", company: "[COMPANY NAME]", summary: "[One line on what you lead or built there]" },
] as const;

/** Execution: how work gets delivered, stage by stage, with what each stage produces. */
export const EXECUTION = [
  {
    index: "01",
    title: "Plan",
    body: "Scope, timelines, owners and KPIs agreed up front, so everyone knows what “done” looks like.",
    deliverables: ["Project brief", "Timeline", "KPI framework"],
  },
  {
    index: "02",
    title: "Build",
    body: "Campaigns, websites, content and creative produced in focused sprints, reviewed as they take shape.",
    deliverables: ["Creatives", "Website", "Content calendar"],
  },
  {
    index: "03",
    title: "Launch",
    body: "Go live with tracking in place and every channel checked — no loose ends on day one.",
    deliverables: ["QA checklist", "Tracking setup", "Go-live"],
  },
  {
    index: "04",
    title: "Measure",
    body: "Clear dashboards and regular reports on the numbers that actually move the business.",
    deliverables: ["Dashboards", "Monthly reports", "Insights"],
  },
  {
    index: "05",
    title: "Optimize",
    body: "Test, learn and scale what works — budgets, creatives and pages improved week after week.",
    deliverables: ["A/B tests", "Budget shifts", "Iterations"],
  },
] as const;

export const TESTIMONIAL = {
  quote: "Great digital work is not about making more noise. It’s about creating the right signal.",
  name: "[CLIENT NAME]",
  role: "[ROLE], [BRAND NAME]",
} as const;

