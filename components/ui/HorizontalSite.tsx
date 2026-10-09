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
  const stickyRef = useRef<HTMLDivElement>(null);
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

    // The pinned viewport is 100svh tall. Measuring it (not window.innerHeight) keeps the layout stable
    // when a phone's address bar shows/hides and changes the window height.
    const vh = stickyRef.current?.clientHeight || window.innerHeight;
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
    const vh = stickyRef.current?.clientHeight || window.innerHeight;
    return panel.start + Math.min(panel.overflow, Math.max(0, within - vh * 0.25));
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

  const currentId = ids[current] ?? null;
  const contextValue = useMemo(() => ({ isDesktop, register, x, currentId }), [isDesktop, register, x, currentId]);

  return (
    <SiteContext.Provider value={contextValue}>
      <motion.div style={{ height }} className="relative">
        <div ref={stickyRef} className="sticky top-0 h-[100svh] overflow-hidden">
          <motion.div
            ref={trackRef}
            style={{ x }}
            onFocusCapture={onFocusCapture}
            className="flex h-full w-max flex-row"
          >
            {children}
          </motion.div>
        </div>
      </motion.div>

      {/* Site-wide progress: hairline along the bottom edge, counter left, section name right. */}
      <div aria-hidden="true" className="pointer-events-none fixed inset-x-0 bottom-0 z-40">
        <span className="absolute inset-x-0 bottom-0 h-px bg-line">
          <motion.span className="absolute inset-0 origin-left bg-amber" style={{ scaleX: overall }} />
        </span>
        <div className="mx-4 flex items-center justify-between pb-5 sm:mx-[3vw]">
          <span className="font-mono text-[0.7rem] tabular-nums text-bone">
            {String(current + 1).padStart(2, "0")}
            <span className="text-mute"> / {String(labels.length).padStart(2, "0")}</span>
          </span>
          <span className="hidden font-mono text-[0.65rem] uppercase tracking-[0.2em] text-bone/70 sm:inline">{labels[current]}</span>
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
  /** Pinned column that stays put while a vertical panel's content scrolls (desktop; scrolls with the content on phones). */
  aside?: ReactNode;
  asideClassName?: string;
  /** Show a vertical progress line for this panel's own scroll. */
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

  // Desktop pins the aside in its own column; on narrower screens it scrolls with the panel's content instead.
  const pinAside = Boolean(site?.isDesktop);

  const Tag = as === "footer" ? motion.footer : motion.section;

  return (
    <PanelContext.Provider value={progress}>
      <Tag
        id={id}
        ref={outerRef}
        aria-labelledby={labelledBy}
        aria-label={ariaLabel}
        className={`relative h-[100svh] w-screen shrink-0 overflow-hidden ${className}`}
      >
        {rail && (
          <div aria-hidden="true" className="pointer-events-none absolute bottom-20 right-2 top-24 z-10 w-px bg-line lg:right-[2.5vw] lg:top-28">
            <motion.span className="absolute inset-0 origin-top bg-amber" style={{ scaleY: progress }} />
          </div>
        )}
        {aside && pinAside && <div className={`absolute inset-y-0 left-0 z-10 ${asideClassName}`}>{aside}</div>}
        <motion.div ref={innerRef} style={{ y }} className={`relative min-h-full ${innerClassName}`}>
          {aside && !pinAside && <div className={asideClassName}>{aside}</div>}
          {children}
        </motion.div>
      </Tag>
    </PanelContext.Provider>
  );
}
