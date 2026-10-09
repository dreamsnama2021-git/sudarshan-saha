import { Code2, Megaphone, Palette, Search, Share2, Sparkles, Target, TrendingUp, type LucideIcon } from "lucide-react";

export type ExpertiseArea = {
  index: string;
  title: string;
  /** Specific skills within the area, shown as tags on the tile. */
  skills: string[];
  icon: LucideIcon;
  /** Highlighted tile (accent border). */
  featured?: boolean;
};

/** Areas of expertise grid. Edit titles and skills to match exactly what you do. */
export const EXPERTISE: ExpertiseArea[] = [
  { index: "01", title: "SEO", skills: ["Technical SEO", "Keyword strategy", "On-page content"], icon: Search },
  { index: "02", title: "Social Media", skills: ["Platform strategy", "Content systems", "Community growth"], icon: Share2 },
  { index: "03", title: "Performance Marketing", skills: ["Meta & Google Ads", "Funnels", "ROAS optimisation"], icon: TrendingUp },
  { index: "04", title: "Web Development", skills: ["Modern websites", "E-commerce", "Conversion UX"], icon: Code2 },
  { index: "05", title: "Creative Direction", skills: ["Campaign concepts", "Product shoots", "Reels"], icon: Palette },
  { index: "06", title: "Brand Strategy", skills: ["Positioning", "Identity", "Messaging"], icon: Target },
  { index: "07", title: "Lead Generation", skills: ["Landing pages", "Lead funnels", "CRM workflows"], icon: Megaphone },
  { index: "08", title: "Business Consulting", skills: ["Growth roadmaps", "Digital transformation"], icon: Sparkles },
];

/** Tags floating around the hero portrait. */
export const PORTRAIT_TAGS = ["Strategy", "Creative", "Growth", "Digital"] as const;
