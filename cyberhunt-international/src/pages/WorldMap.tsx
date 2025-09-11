import { useEffect, useMemo, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

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

// Booth obstacles that act as quiz stations
const BOOTHS: (Rect & { id: string; name: string })[] = [
  { x: 1200, y: 700, w: 180, h: 120, id: "booth1", name: "Security Booth" },
  { x: 1600, y: 1100, w: 260, h: 160, id: "booth2", name: "Network Booth" },
  { x: 800, y: 400, w: 200, h: 200, id: "booth3", name: "Crypto Booth" },
  { x: 1000, y: 1000, w: 200, h: 200, id: "booth4", name: "Prueba Booth" },
];

// Interaction distance - how close player needs to be to trigger booth
const INTERACTION_DISTANCE = 50; // Reduced since we're using collision detection

// Viewport (the window to the world)
const VIEWPORT: Vec2 = { x: 960, y: 540 };

const clamp = (v: number, min: number, max: number) => Math.max(min, Math.min(max, v));

// AABB collision
function rectsOverlap(a: Rect, b: Rect) {
  return a.x < b.x + b.w && a.x + a.w > b.x && a.y < b.y + b.h && a.y + a.h > b.y;
}

// Check if player is colliding with a booth
function isCollidingWithBooth(playerPos: Vec2, booth: Rect): boolean {
  const playerSize = 20; // Player collision box size
  const playerRect: Rect = {
    x: playerPos.x - playerSize / 2,
    y: playerPos.y - playerSize / 2,
    w: playerSize,
    h: playerSize
  };
  
  const isColliding = rectsOverlap(playerRect, booth);
  
  // Debug log
  if (isColliding) {
    console.log(`🎯 COLLISION with ${booth.id} (${booth.name})`);
    console.log(`  Player: (${playerPos.x}, ${playerPos.y})`);
    console.log(`  Booth: (${booth.x}, ${booth.y}, ${booth.w}x${booth.h})`);
  }
  
  return isColliding;
}

export default function ImageWorld() {
  const navigate = useNavigate();
  
  // Player state in WORLD coordinates
  const [player, setPlayer] = useState<Vec2>({ x: 400, y: 300 });
  const [nearBooth, setNearBooth] = useState<string | null>(null);
  const speed = 240; // px/sec
  const half = 10; // player half-size for collisions

  // Keyboard
  const keys = useRef<Set<string>>(new Set());
  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      // Handle booth interaction first
      if (e.key === " ") {
        console.log(`Space pressed, nearBooth: ${nearBooth}`);
        if (nearBooth) {
          e.preventDefault();
          const booth = BOOTHS.find(b => b.id === nearBooth);
          if (booth) {
            console.log(`Navigating to quiz for booth: ${booth.id}`);
            navigate(`/quiz?boothId=${booth.id}`);
            return; // Don't add space to movement keys
          }
        }
      }
      
      // Add movement keys
      keys.current.add(e.key);
    };
    
    const up = (e: KeyboardEvent) => keys.current.delete(e.key);
    
    window.addEventListener("keydown", down);
    window.addEventListener("keyup", up);
    return () => { 
      window.removeEventListener("keydown", down); 
      window.removeEventListener("keyup", up); 
    };
  }, [nearBooth, navigate]);

  // Check for booth collision
  useEffect(() => {
    const currentBooth = BOOTHS.find(booth => isCollidingWithBooth(player, booth));
    if (currentBooth) {
      console.log(`🎯 COLLIDING with booth: ${currentBooth.id} (${currentBooth.name})`);
      setNearBooth(currentBooth.id);
    } else {
      if (nearBooth) {
        console.log("No longer colliding with any booth");
      }
      setNearBooth(null);
    }
  }, [player, nearBooth]);

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

          // Allow collision with booths - don't block movement, just detect collision
          // The collision detection will be handled by the useEffect above
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
          {/* Booth visualization */}
          {BOOTHS.map((booth, i) => (
            <div key={i} className={`absolute border-2 transition-all duration-200 ${
              nearBooth === booth.id 
                ? "bg-yellow-500/40 border-yellow-400 shadow-lg shadow-yellow-400/50" 
                : booth.id === "booth3" 
                  ? "bg-green-500/30 border-green-400" // Special color for booth3
                  : "bg-blue-500/30 border-blue-400"
            }`}
                style={{ left: booth.x, top: booth.y, width: booth.w, height: booth.h }}>
              <div className={`absolute -top-8 left-1/2 transform -translate-x-1/2 text-white font-game text-sm px-2 py-1 rounded ${
                booth.id === "booth3" ? "bg-green-600/70" : "bg-black/50"
              }`}>
                {booth.name} {booth.id === "booth3" && "🟢"}
              </div>
            </div>
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
          <div className="font-semibold">CyberHunt World Map</div>
          <div>WASD / Arrows to move</div>
          <div>Space to enter booth when colliding</div>
          <div>
            Pos: <span className="tabular-nums">{Math.round(player.x)}</span>,{" "}
            <span className="tabular-nums">{Math.round(player.y)}</span>
          </div>
          <div>
            Colliding with: <span className="tabular-nums">{nearBooth || "None"}</span>
          </div>
          <div className="text-yellow-400">
            Walk into booths to interact
          </div>
        </div>

        {/* Interaction prompt */}
        {nearBooth && (
          <div className="absolute bottom-3 left-1/2 transform -translate-x-1/2 text-white font-game text-lg bg-green-600/80 backdrop-blur px-4 py-2 rounded-lg border border-green-400 shadow-lg">
            🎯 COLLISION DETECTED! Press SPACE to enter {BOOTHS.find(b => b.id === nearBooth)?.name}
          </div>
        )}
      </div>
    </div>
  );
}