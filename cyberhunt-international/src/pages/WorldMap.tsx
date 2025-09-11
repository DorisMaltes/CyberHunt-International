import React, { useEffect, useMemo, useRef, useState } from "react";

/**
 * Top‑down 2D world that uses YOUR OWN MAP IMAGE as the world.
 * Tech: React + TypeScript + Tailwind (no external libs)
 *
 * How to use your map:
 *  1) Put your PNG/JPG in /public/maps/my-world.png (or import it).
 *  2) Set MAP_URL and MAP_SIZE below to your image path and pixel size.
 *  3) Optionally list blocking rectangles in BLOCKS for simple collisions.
 *
 * Controls: WASD / Arrow Keys
 */

type Vec2 = { x: number; y: number };

type Rect = { x: number; y: number; w: number; h: number };

// === 1) Configure your map here ============================================
const MAP_URL = "./mapa.png";
const MAP_SIZE: Vec2 = { x: 3000, y: 2000 }; // pixel dimensions of your image

// Optional: simple rectangular colliders (world coordinates)
const BLOCKS: Rect[] = [
  // Example obstacles:
  //example of rectangles
  { x: 1200, y: 700, w: 180, h: 120 },
  { x: 1600, y: 1100, w: 260, h: 160 },
  { x: 1000, y: 1000, w: 200, h: 200 },
];

// Viewport (the window to the world)
const VIEWPORT: Vec2 = { x: 960, y: 540 };

const clamp = (v: number, min: number, max: number) => Math.max(min, Math.min(max, v));

// AABB collision
function rectsOverlap(a: Rect, b: Rect) {
  return a.x < b.x + b.w && a.x + a.w > b.x && a.y < b.y + b.h && a.y + a.h > b.y;
}

export default function ImageWorld() {
  // Player state in WORLD coordinates
  const [player, setPlayer] = useState<Vec2>({ x: 400, y: 300 });
  const speed = 240; // px/sec
  const half = 10; // player half-size for collisions

  // Keyboard
  const keys = useRef<Set<string>>(new Set());
  useEffect(() => {
    const down = (e: KeyboardEvent) => keys.current.add(e.key);
    const up = (e: KeyboardEvent) => keys.current.delete(e.key);
    window.addEventListener("keydown", down);
    window.addEventListener("keyup", up);
    return () => { window.removeEventListener("keydown", down); window.removeEventListener("keyup", up); };
  }, []);

  // Game loop
  const raf = useRef<number | null>(null);
  const last = useRef<number | null>(null);

  useEffect(() => {
    const step = (t: number) => {
      if (last.current == null) last.current = t;
      const dt = Math.min(0.033, (t - last.current) / 1000);
      last.current = t;

      let dx = 0, dy = 0;
      const has = (k: string) => keys.current.has(k);
      if (has("ArrowLeft") || has("a") || has("A")) dx -= 1;
      if (has("ArrowRight")|| has("d") || has("D")) dx += 1;
      if (has("ArrowUp")   || has("w") || has("W")) dy -= 1;
      if (has("ArrowDown") || has("s") || has("S")) dy += 1;
      if (dx && dy) { const inv = 1/Math.sqrt(2); dx *= inv; dy *= inv; }

      if (dx || dy) {
        setPlayer((p) => {
          // Attempted new position
          let nx = clamp(p.x + dx * speed * dt, half, MAP_SIZE.x - half);
          let ny = clamp(p.y + dy * speed * dt, half, MAP_SIZE.y - half);

          // Simple collision: push back if overlaps any block
          const me: Rect = { x: nx - half, y: ny - half, w: half * 2, h: half * 2 };
          for (const b of BLOCKS) {
            if (rectsOverlap(me, b)) {
              // Resolve separately on each axis for a simple response
              // Try X only
              const tryX: Rect = { x: nx - half, y: p.y - half, w: half * 2, h: half * 2 };
              if (!rectsOverlap(tryX, b)) { ny = p.y; break; }
              // Try Y only
              const tryY: Rect = { x: p.x - half, y: ny - half, w: half * 2, h: half * 2 };
              if (!rectsOverlap(tryY, b)) { nx = p.x; break; }
              // Neither works: stay put
              nx = p.x; ny = p.y; break;
            }
          }
          return { x: nx, y: ny };
        });
      }

      raf.current = requestAnimationFrame(step);
    };

    raf.current = requestAnimationFrame(step);
    return () => { if (raf.current) cancelAnimationFrame(raf.current); };
  }, []);

  // Camera follow (clamped to world)
  const camera = useMemo<Vec2>(() => ({
    x: clamp(player.x - VIEWPORT.x / 2, 0, MAP_SIZE.x - VIEWPORT.x),
    y: clamp(player.y - VIEWPORT.y / 2, 0, MAP_SIZE.y - VIEWPORT.y),
  }), [player]);

  return (
    <div className="w-full h-screen flex items-center justify-center bg-slate-900">
      <div className="relative overflow-hidden rounded-2xl shadow-2xl border border-slate-800" style={{ width: VIEWPORT.x, height: VIEWPORT.y }}>
        {/* WORLD: your map image as the background layer */}
        <div
          className="absolute top-0 left-0 will-change-transform"
          style={{
            width: MAP_SIZE.x,
            height: MAP_SIZE.y,
            transform: `translate3d(${-camera.x}px, ${-camera.y}px, 0)`,
            backgroundImage: `url(${MAP_URL})`,
            backgroundSize: `${MAP_SIZE.x}px ${MAP_SIZE.y}px`,
            backgroundRepeat: "no-repeat",
          }}
        >
          {/* Optional: visualize blocking rects while tuning */}
          {BLOCKS.map((b, i) => (
            <div key={i} className="absolute bg-red-500/30 border border-red-500/60"
                style={{ left: b.x, top: b.y, width: b.w, height: b.h }} />
          ))}

          {/* Player */}
          <div className="absolute -translate-x-1/2 -translate-y-1/2 pointer-events-none" style={{ left: player.x, top: player.y }}>
            <div className="relative">
              <div className="absolute -inset-2 blur-xl opacity-40 bg-emerald-300 rounded-full" />
              <div className="relative w-8 h-8 rounded-full bg-white border border-slate-300 flex items-center justify-center text-xs font-semibold text-slate-800">
                YOU
              </div>
            </div>
          </div>
        </div>

        {/* HUD */}
        <div className="absolute left-3 top-3 text-xs text-white/90 bg-slate-900/60 backdrop-blur px-3 py-2 rounded-md border border-white/10">
          <div className="font-semibold">Image Map • Camera Follow</div>
          <div>WASD / Arrows</div>
          <div>
            Pos: <span className="tabular-nums">{Math.round(player.x)}</span>,{" "}
            <span className="tabular-nums">{Math.round(player.y)}</span>
          </div>
        </div>
      </div>
    </div>
  );
}