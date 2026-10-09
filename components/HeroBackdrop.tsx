/**
 * Quiet "command centre" backdrop for the hero: dark base, a faint grid that fades out toward the edges,
 * a soft amber glow behind the portrait and a slow scan line. Pure CSS — no WebGL.
 */
export function HeroBackdrop() {
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
      {/* Grid */}
      <div className="bg-grid mask-radial-fade absolute inset-0 opacity-70" />

      {/* Glow behind the portrait (right on desktop, top on mobile) */}
      <div className="absolute left-1/2 top-[18%] h-[60vw] w-[60vw] -translate-x-1/2 rounded-full bg-amber/[0.07] blur-[110px] lg:left-auto lg:right-[4%] lg:top-1/2 lg:h-[42vw] lg:w-[42vw] lg:translate-x-0 lg:-translate-y-1/2" />
      {/* Cool counter-light on the left, very low */}
      <div className="absolute -left-[10%] bottom-[-20%] h-[50vw] w-[50vw] rounded-full bg-[#6f9bff]/[0.04] blur-[120px]" />

      {/* Slow scan line */}
      <div className="hero-scan absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-transparent via-amber/[0.06] to-transparent" />

      {/* Corner ticks */}
      <span className="absolute left-5 top-24 h-4 w-4 border-l border-t border-bone/20 sm:left-8 lg:left-12" />
      <span className="absolute right-5 top-24 h-4 w-4 border-r border-t border-bone/20 sm:right-8 lg:right-12" />
      <span className="absolute bottom-24 left-5 h-4 w-4 border-b border-l border-bone/20 sm:left-8 lg:left-12" />
      <span className="absolute bottom-24 right-5 h-4 w-4 border-b border-r border-bone/20 sm:right-8 lg:right-12" />
    </div>
  );
}
