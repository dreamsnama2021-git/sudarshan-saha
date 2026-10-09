"use client";

import {
  motion,
  useMotionValue,
  useMotionValueEvent,
  useScroll,
  type MotionValue,
} from "framer-motion";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type FocusEvent,
  type ReactNode,
} from "react";

/**
 * Landscape site engine (desktop ≥ 1024px).
 *
 * Every <Panel> is a full-height screen laid side by side in one horizontal strip. Page scroll is
 * mapped onto a list of segments, panel by panel:
 *   1. vertical   — if a panel's content is taller than the viewport, its content scrolls up first;
 *   2. horizontal — then the strip slides left by the panel's width to reveal the next one.
 * Panels that fit the screen simply have no vertical segment. Below lg everything is a normal vertical page.
 */

const DESKTOP = "(min-width: 1024px)";

type Registered = {
  id: string;
  outer: HTMLElement;
  inner: HTMLElement;
  y: MotionValue<number>;
  progress: MotionValue<number>;
  label: string;
};

type Measured = Registered & {
  width: number;
  /** Vertical scroll inside the panel before the strip moves on. */
  overflow: number;
  /** Horizontal travel after this panel (capped so the strip ends flush with the viewport). */
  travel: number;
  start: number;
};

type SiteContextValue = {
  isDesktop: boolean;
  register: (panel: Registered) => () => void;
  /** Horizontal offset of the strip in px (0 → negative). Always 0 below lg. */
  x: MotionValue<number>;
  /** id of the panel currently filling the screen (desktop). */
  currentId: string | null;
};

const SiteContext = createContext<SiteContextValue | null>(null);
const PanelContext = createContext<MotionValue<number> | null>(null);

/** Strip position + current panel, for elements that react to where the visitor is in the site. */
export function useSite() {
  const value = useContext(SiteContext);
  if (!value) throw new Error("useSite must be used inside <HorizontalSite>");
  return value;
}

/** 0 → 1 progress through the current panel's own vertical content. */
export function usePanelProgress() {
  const value = useContext(PanelContext);
  if (!value) throw new Error("usePanelProgress must be used inside <Panel>");
  return value;
}

export function HorizontalSite({ children, overlay }: { children: ReactNode; overlay?: ReactNode }) {
  const registry = useRef(new Set<Registered>());
  const measured = useRef<Measured[]>([]);
  const trackRef = useRef<HTMLDivElement>(null);
  const [isDesktop, setIsDesktop] = useState(false);
  const [current, setCurrent] = useState(0);
  const [labels, setLabels] = useState<string[]>([]);
  const [ids, setIds] = useState<string[]>([]);

  const x = useMotionValue(0);
  const height = useMotionValue("auto");
  const overall = useMotionValue(0);
  const { scrollY } = useScroll();

  /** Map a page scroll position onto strip x + per-panel y. */
  const apply = useCallback(
    (s: number) => {
      const panels = measured.current;
      if (!panels.length) return;
      let rem = Math.max(0, s);
      let offsetX = 0;
      let active = 0;
      const last = panels.length - 1;

      panels.forEach((p, i) => {
        if (rem <= 0) {
          p.y.set(0);
          p.progress.set(0);
          return;
        }
        active = i;
        const vy = Math.min(rem, p.overflow);
        p.y.set(-vy);
        p.progress.set(p.overflow ? vy / p.overflow : 1);
        rem -= p.overflow;
        if (rem <= 0) return;

        const hx = Math.min(rem, p.travel);
        offsetX += hx;
        rem -= p.travel;
        // Count the next panel as "current" once it fills most of the screen.
        if (i < last && p.travel && hx > p.travel * 0.5) active = i + 1;
      });

      x.set(-offsetX);
      const total = panels.reduce((sum, p) => sum + p.overflow + p.travel, 0);
      overall.set(total ? Math.min(1, s / total) : 0);
      // The final panel may never travel (strip ends flush), so mark it current at the very end.
      if (s >= total - 2) active = last;
      setCurrent((prev) => (prev === active ? prev : active));
    },
    [overall, x],
  );

  const measure = useCallback(() => {
    const desktop = window.matchMedia(DESKTOP).matches;
    setIsDesktop(desktop);

    // Order panels by their position in the document, not by registration order.
    const panels = Array.from(registry.current).sort((a, b) =>
      a.outer.compareDocumentPosition(b.outer) & Node.DOCUMENT_POSITION_FOLLOWING ? -1 : 1,
    );
    setLabels(panels.map((p) => p.label));
    setIds(panels.map((p) => p.id));

    if (!desktop) {
      measured.current = [];
      panels.forEach((p) => p.y.set(0));
      x.set(0);
      height.set("auto");
      return;
    }

    const vh = window.innerHeight;
    const maxX = Math.max(0, panels.reduce((sum, p) => sum + p.outer.offsetWidth, 0) - window.innerWidth);
    let start = 0;
    let x0 = 0;
    measured.current = panels.map((p) => {
      const width = p.outer.offsetWidth;
      const overflow = Math.max(0, Math.round(p.inner.offsetHeight - vh));
      const travel = Math.max(0, Math.min(width, maxX - x0));
      const m: Measured = { ...p, width, overflow, travel, start };
      x0 += travel;
      start += overflow + travel;
      return m;
    });
    height.set(`${start + vh}px`);
    apply(window.scrollY);
  }, [apply, height, x]);

  const register = useCallback(
    (panel: Registered) => {
      registry.current.add(panel);
      const ro = new ResizeObserver(() => measure());
      ro.observe(panel.inner);
      ro.observe(panel.outer);
      measure();
      return () => {
        ro.disconnect();
        registry.current.delete(panel);
        measure();
      };
    },
    [measure],
  );

  useEffect(() => {
    const mq = window.matchMedia(DESKTOP);
    measure();
    window.addEventListener("resize", measure);
    mq.addEventListener("change", measure);
    return () => {
      window.removeEventListener("resize", measure);
      mq.removeEventListener("change", measure);
    };
  }, [measure]);

  useMotionValueEvent(scrollY, "change", (s) => {
    if (measured.current.length) apply(s);
  });

  /** Page scroll position that brings `el` (inside some panel) into view. */
  const scrollTargetFor = useCallback((el: Element) => {
    const panel = measured.current.find((p) => p.outer.contains(el));
    if (!panel) return null;
    if (el === panel.outer || el === panel.inner) return panel.start;
    const within = el.getBoundingClientRect().top - panel.inner.getBoundingClientRect().top;
    return panel.start + Math.min(panel.overflow, Math.max(0, within - window.innerHeight * 0.25));
  }, []);

  // In-page anchors (#work, #about…) can't use native jumps inside a pinned strip — route them here.
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (!measured.current.length || e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey) return;
      const link = (e.target as Element).closest<HTMLAnchorElement>('a[href^="#"]');
      const id = link?.getAttribute("href")?.slice(1);
      if (!id) return;
      const target = document.getElementById(id);
      if (!target) return;
      const top = scrollTargetFor(target);
      if (top === null) return;
      e.preventDefault();
      window.scrollTo({ top, behavior: "smooth" });
    };
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, [scrollTargetFor]);

  // Keyboard users: tabbing into an off-screen element scrolls the strip to it.
  const onFocusCapture = (e: FocusEvent<HTMLDivElement>) => {
    if (!measured.current.length) return;
    const el = e.target as HTMLElement;
    if (!el.matches(":focus-visible")) return;
    const stickyEl = trackRef.current?.parentElement;
    if (stickyEl) stickyEl.scrollLeft = 0;
    const top = scrollTargetFor(el);
    if (top !== null) window.scrollTo({ top, behavior: "auto" });
  };

  const currentId = isDesktop ? (ids[current] ?? null) : null;
  const contextValue = useMemo(() => ({ isDesktop, register, x, currentId }), [isDesktop, register, x, currentId]);

  return (
    <SiteContext.Provider value={contextValue}>
      <motion.div style={{ height }} className="relative">
        <div className="relative lg:sticky lg:top-0 lg:h-[100svh] lg:overflow-hidden">
          <motion.div
            ref={trackRef}
            style={{ x }}
            onFocusCapture={onFocusCapture}
            className="flex flex-col lg:h-full lg:w-max lg:flex-row"
          >
            {children}
          </motion.div>
        </div>
      </motion.div>

      {/* Site-wide progress (desktop): hairline along the bottom edge, counter left, section name right. */}
      <div aria-hidden="true" className="pointer-events-none fixed inset-x-0 bottom-0 z-40 hidden lg:block">
        <span className="absolute inset-x-0 bottom-0 h-px bg-line">
          <motion.span className="absolute inset-0 origin-left bg-amber" style={{ scaleX: overall }} />
        </span>
        <div className="mx-[3vw] flex items-center justify-between pb-5">
          <span className="font-mono text-[0.7rem] tabular-nums text-bone">
            {String(current + 1).padStart(2, "0")}
            <span className="text-mute"> / {String(labels.length).padStart(2, "0")}</span>
          </span>
          <span className="font-mono text-[0.65rem] uppercase tracking-[0.2em] text-bone/70">{labels[current]}</span>
        </div>
      </div>
      {overlay}
    </SiteContext.Provider>
  );
}

type PanelProps = {
  id: string;
  /** Name shown in the site progress rail. */
  label: string;
  children: ReactNode;
  labelledBy?: string;
  ariaLabel?: string;
  as?: "section" | "footer";
  /** Outer classes: width (e.g. lg:w-screen) and background. */
  className?: string;
  /** Classes for the scrolling content layer. */
  innerClassName?: string;
  /** Pinned column that stays put while a vertical panel's content scrolls (desktop). */
  aside?: ReactNode;
  asideClassName?: string;
  /** Show a vertical progress line for this panel's own scroll (desktop). */
  rail?: boolean;
};

/** One screen of the landscape strip. Content taller than the viewport scrolls vertically in place. */
export function Panel({
  id,
  label,
  children,
  labelledBy,
  ariaLabel,
  as = "section",
  className = "",
  innerClassName = "",
  aside,
  asideClassName = "",
  rail = false,
}: PanelProps) {
  const site = useContext(SiteContext);
  const outerRef = useRef<HTMLElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);
  const y = useMotionValue(0);
  const progress = useMotionValue(0);
  const register = site?.register;

  useEffect(() => {
    if (!register || !outerRef.current || !innerRef.current) return;
    return register({ id, outer: outerRef.current, inner: innerRef.current, y, progress, label });
  }, [register, y, progress, label, id]);

  // Below lg the page scrolls normally, so progress comes from the panel's position in the document.
  const { scrollYProgress } = useScroll({ target: outerRef, offset: ["start 70%", "end 60%"] });
  useMotionValueEvent(scrollYProgress, "change", (p) => {
    if (!site?.isDesktop) progress.set(p);
  });

  const Tag = as === "footer" ? motion.footer : motion.section;

  return (
    <PanelContext.Provider value={progress}>
      <Tag
        id={id}
        ref={outerRef}
        aria-labelledby={labelledBy}
        aria-label={ariaLabel}
        className={`relative w-full shrink-0 lg:h-[100svh] lg:overflow-hidden ${className}`}
      >
        {rail && (
          <div aria-hidden="true" className="pointer-events-none absolute bottom-20 right-[2.5vw] top-28 z-10 hidden w-px bg-line lg:block">
            <motion.span className="absolute inset-0 origin-top bg-amber" style={{ scaleY: progress }} />
          </div>
        )}
        {aside && <div className={`relative z-10 lg:absolute lg:inset-y-0 lg:left-0 ${asideClassName}`}>{aside}</div>}
        <motion.div ref={innerRef} style={{ y }} className={`relative lg:min-h-full ${innerClassName}`}>
          {children}
        </motion.div>
      </Tag>
    </PanelContext.Provider>
  );
}
