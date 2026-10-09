import type { Metadata, Viewport } from "next";
import { DM_Sans, Space_Grotesk } from "next/font/google";
import { SITE } from "@/lib/site";
import "./globals.css";

const display = Space_Grotesk({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-display",
  display: "swap",
});

const body = DM_Sans({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

const title = `${SITE.name} — Digital Strategy, Creative & Technology`;

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title,
  description: SITE.description,
  keywords: ["digital marketing", "website development", "branding", "SEO", "performance marketing", "content production", "3D", "AR", "VR", "creative direction"],
  openGraph: { type: "website", title, description: SITE.description, url: "/" },
  twitter: { card: "summary_large_image", title, description: SITE.description },
};

export const viewport: Viewport = {
  themeColor: "#fdfae6",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${display.variable} ${body.variable}`}>
      <body>
        <a
          href="#main"
          className="sr-only z-[90] rounded-full bg-bone px-5 py-3 text-sm text-ink focus:not-sr-only focus:fixed focus:left-4 focus:top-4"
        >
          Skip to content
        </a>
        {children}
        <div aria-hidden="true" className="grain" />
      </body>
    </html>
  );
}
