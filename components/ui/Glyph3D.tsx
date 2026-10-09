export type GlyphKind = "rings" | "cube" | "stack" | "sphere" | "orbit" | "tiles";

/**
 * Small wireframe objects built from CSS 3D transforms — no WebGL, so they can appear
 * on hover in every service row without spinning up extra canvases.
 */
const FACE = "absolute inset-0 border border-amber/70";

function Cube() {
  return (
    <>
      <span className={`${FACE} bg-amber/5 [transform:translateZ(var(--h))]`} />
      <span className={`${FACE} [transform:rotateY(180deg)_translateZ(var(--h))]`} />
      <span className={`${FACE} [transform:rotateY(90deg)_translateZ(var(--h))]`} />
      <span className={`${FACE} [transform:rotateY(-90deg)_translateZ(var(--h))]`} />
      <span className={`${FACE} [transform:rotateX(90deg)_translateZ(var(--h))]`} />
      <span className={`${FACE} [transform:rotateX(-90deg)_translateZ(var(--h))]`} />
    </>
  );
}

const RING = "absolute inset-0 rounded-full border border-amber/70";

function Rings() {
  return (
    <>
      <span className={`${RING} [transform:rotateX(70deg)]`} />
      <span className={`${RING} [transform:rotateY(60deg)_rotateX(70deg)]`} />
      <span className={`${RING} [transform:rotateY(120deg)_rotateX(70deg)]`} />
    </>
  );
}

function Sphere() {
  return (
    <>
      {["0deg", "30deg", "60deg", "90deg", "120deg", "150deg"].map((deg) => (
        <span key={deg} className="absolute inset-0 rounded-full border border-amber/50 [transform:rotateY(var(--r))]" data-r={deg} />
      ))}
      <span className={`${RING} [transform:rotateX(90deg)]`} />
    </>
  );
}

function Orbit() {
  return (
    <>
      <span className="absolute inset-[34%] rounded-full bg-gradient-to-br from-bone to-amber-deep" />
      <span className={`${RING} [transform:rotateX(75deg)]`} />
      <span className={`absolute inset-[-14%] rounded-full border border-bone/30 [transform:rotateX(75deg)_rotateY(18deg)]`} />
    </>
  );
}

function Stack() {
  return (
    <>
      {["-0.75", "-0.25", "0.25", "0.75"].map((z, i) => (
        <span
          key={z}
          className={`absolute inset-[12%] border border-amber/70 ${i === 3 ? "bg-amber/15" : ""} [transform:rotateX(90deg)_translateZ(var(--z))]`}
          data-z={z}
        />
      ))}
    </>
  );
}

function Tiles() {
  return (
    <span className="absolute inset-0 grid grid-cols-3 gap-1 [transform:rotateX(62deg)]">
      {Array.from({ length: 9 }, (_, i) => (
        <span key={i} className={`border border-amber/60 ${i === 4 ? "bg-amber/30" : ""}`} />
      ))}
    </span>
  );
}

const SHAPES: Record<GlyphKind, () => JSX.Element> = {
  cube: Cube,
  rings: Rings,
  sphere: Sphere,
  orbit: Orbit,
  stack: Stack,
  tiles: Tiles,
};

export function Glyph3D({ kind, size = "sm", className = "" }: { kind: GlyphKind; size?: "sm" | "lg"; className?: string }) {
  const Shape = SHAPES[kind];
  return (
    <div aria-hidden="true" className={`glyph perspective ${size === "lg" ? "glyph-lg h-36 w-36" : "h-16 w-16"} ${className}`}>
      <div className="preserve-3d relative h-full w-full animate-spin3d">
        <Shape />
      </div>
    </div>
  );
}
