import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./lib/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        /**
         * Light theme. Names are kept from the original palette:
         * ink = surfaces (page, cards), bone = primary text, mute = secondary text.
         */
        ink: {
          DEFAULT: "#fdfae6", // page — warm cream
          900: "#ffffff", // alternate sections, cards
          800: "#e9e8e3", // placeholders, insets
          700: "#e8e5df", // deeper insets
        },
        bone: "#1c1b19",
        mute: "#6b6760",
        line: "rgba(28,27,25,0.12)",
        /** The single accent: warm amber with a champagne-metal lean. */
        amber: {
          DEFAULT: "#C8661C", // text, lines, icons — readable on cream
          soft: "#E8A35E", // fills: buttons, highlights (with dark text)
          deep: "#A9551A",
        },
      },
      fontFamily: {
        display: ["var(--font-display)", "system-ui", "sans-serif"],
        sans: ["var(--font-body)", "system-ui", "sans-serif"],
      },
      letterSpacing: {
        label: "0.22em",
        tightest: "-0.045em",
      },
      transitionTimingFunction: {
        out: "cubic-bezier(0.16, 1, 0.3, 1)",
      },
      transitionDuration: {
        900: "900ms",
        1200: "1200ms",
      },
      maxWidth: {
        frame: "100rem",
      },
      keyframes: {
        spin3d: {
          from: { transform: "rotateX(-24deg) rotateY(0deg)" },
          to: { transform: "rotateX(-24deg) rotateY(360deg)" },
        },
        cue: {
          "0%": { transform: "translateY(-100%)" },
          "100%": { transform: "translateY(100%)" },
        },
      },
      animation: {
        spin3d: "spin3d 9s linear infinite",
        "spin3d-slow": "spin3d 18s linear infinite",
        cue: "cue 2.2s cubic-bezier(0.65, 0, 0.35, 1) infinite",
      },
    },
  },
  plugins: [],
};

export default config;
