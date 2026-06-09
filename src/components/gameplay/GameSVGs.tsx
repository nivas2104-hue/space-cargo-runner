// ═══════════════════════════════════════════════════════════════════════════════
// GAME SVGs — Redesigned gameplay objects
// Material language: dark steel bases, cyan energy, amber currency, red danger
// Every object readable within 0.5s at small sizes
// ═══════════════════════════════════════════════════════════════════════════════

import { COLOR } from "../design-system";

// ─── AsteroidSVG — rocky danger object ───────────────────────────────────────
// Warm brown-grey palette — distinct from cyan UI, instant DANGER read
export const AsteroidSVG = ({ size, seed }: { size: number; seed: number }) => {
  const r = (() => {
    let s = seed;
    return () => {
      s = (s * 16807) % 2147483647;
      return (s - 1) / 2147483646;
    };
  })();

  const points = Array.from({ length: 10 }, (_, i) => {
    const angle = (i / 10) * Math.PI * 2;
    const dist = (0.62 + r() * 0.38) * size * 0.5;
    return `${size / 2 + Math.cos(angle) * dist},${size / 2 + Math.sin(angle) * dist}`;
  }).join(" ");

  const cx = size / 2;
  const cy = size / 2;

  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} fill="none">
      <defs>
        <radialGradient id={`rock-${seed}`} cx="35%" cy="35%">
          <stop offset="0%" stopColor="#8B7355" />
          <stop offset="55%" stopColor="#5C4A35" />
          <stop offset="100%" stopColor="#2E1F0F" />
        </radialGradient>
      </defs>

      {/* Body */}
      <polygon
        points={points}
        fill={`url(#rock-${seed})`}
        stroke="#FF7A40"
        strokeWidth="1.2"
        strokeOpacity="0.55"
      />

      {/* Surface cracks */}
      <line
        x1={cx * 0.6}
        y1={cy * 0.7}
        x2={cx * 0.9}
        y2={cy * 1.1}
        stroke="rgba(0,0,0,0.5)"
        strokeWidth="1"
      />
      <line
        x1={cx * 1.3}
        y1={cy * 0.8}
        x2={cx * 1.1}
        y2={cy * 1.3}
        stroke="rgba(0,0,0,0.4)"
        strokeWidth="0.8"
      />

      {/* Craters */}
      <circle
        cx={cx * 0.7}
        cy={cy * 0.7}
        r={size * 0.1}
        fill="#1E1008"
        opacity="0.7"
      />
      <circle
        cx={cx * 1.3}
        cy={cy * 1.1}
        r={size * 0.07}
        fill="#1E1008"
        opacity="0.55"
      />
      <circle
        cx={cx * 0.9}
        cy={cy * 1.4}
        r={size * 0.05}
        fill="#1E1008"
        opacity="0.5"
      />

      {/* Top highlight */}
      <circle
        cx={cx * 0.65}
        cy={cy * 0.55}
        r={size * 0.12}
        fill="rgba(255,255,255,0.12)"
      />
    </svg>
  );
};

// ─── CrateSVG — interstellar freight container ───────────────────────────────
// Dark metal, cyan corner lights, warning stripe — instant COLLECT read
export const CrateSVG = ({ size = 52 }: { size?: number }) => {
  const s = size;
  const pad = s * 0.08;
  return (
    <svg width={s} height={s} viewBox={`0 0 ${s} ${s}`} fill="none">
      <defs>
        <linearGradient id="crateBody" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#1B2540" />
          <stop offset="100%" stopColor="#0D1525" />
        </linearGradient>
      </defs>

      {/* Main body */}
      <rect
        x={pad}
        y={pad * 2}
        width={s - pad * 2}
        height={s - pad * 3}
        rx="2"
        fill="url(#crateBody)"
        stroke={COLOR.cyan}
        strokeWidth="1"
      />

      {/* Top cap */}
      <rect
        x={pad}
        y={pad * 2}
        width={s - pad * 2}
        height={s * 0.16}
        rx="2"
        fill="#253450"
        stroke="rgba(0,229,255,0.3)"
        strokeWidth="0.5"
      />

      {/* Bottom cap */}
      <rect
        x={pad}
        y={s - pad * 2 - s * 0.12}
        width={s - pad * 2}
        height={s * 0.14}
        rx="2"
        fill="#253450"
        stroke="rgba(0,229,255,0.3)"
        strokeWidth="0.5"
      />

      {/* Center divider */}
      <line
        x1={s / 2}
        y1={pad * 2}
        x2={s / 2}
        y2={s - pad * 2}
        stroke="rgba(0,229,255,0.2)"
        strokeWidth="0.8"
      />

      {/* Horizontal mid-line */}
      <line
        x1={pad}
        y1={s / 2}
        x2={s - pad}
        y2={s / 2}
        stroke="rgba(0,229,255,0.12)"
        strokeWidth="0.6"
      />

      {/* Warning amber stripe */}
      <rect
        x={pad * 2}
        y={s * 0.38}
        width={s - pad * 4}
        height={s * 0.24}
        rx="1"
        fill="none"
        stroke="rgba(255,181,71,0.25)"
        strokeWidth="0.6"
        strokeDasharray="3 2"
      />

      {/* CARGO label */}
      <text
        x={s / 2}
        y={s * 0.55}
        textAnchor="middle"
        fontSize={s * 0.14}
        fontFamily="Orbitron"
        fontWeight="700"
        fill="rgba(0,229,255,0.5)"
      >
        CARGO
      </text>

      {/* Corner emissive lights */}
      <circle
        cx={pad * 1.8}
        cy={pad * 2.8}
        r={s * 0.04}
        fill={COLOR.cyan}
        opacity="0.9"
      />
      <circle
        cx={s - pad * 1.8}
        cy={pad * 2.8}
        r={s * 0.04}
        fill={COLOR.cyan}
        opacity="0.9"
      />
      <circle
        cx={pad * 1.8}
        cy={s - pad * 2.2}
        r={s * 0.04}
        fill={COLOR.cyan}
        opacity="0.9"
      />
      <circle
        cx={s - pad * 1.8}
        cy={s - pad * 2.2}
        r={s * 0.04}
        fill={COLOR.cyan}
        opacity="0.9"
      />
    </svg>
  );
};

// ─── FuelCanSVG — plasma energy canister ─────────────────────────────────────
// Cylindrical, measurement ticks, cyan energy window — instant REFUEL read
export const FuelCanSVG = ({ size = 52 }: { size?: number }) => {
  const w = size * 0.5;
  const h = size * 0.82;
  const ox = (size - w) / 2;
  const oy = (size - h) / 2 + size * 0.04;

  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} fill="none">
      <defs>
        <linearGradient id="fuelBody" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#1A2535" />
          <stop offset="100%" stopColor="#0D1520" />
        </linearGradient>
        <linearGradient id="fuelEnergy" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={COLOR.cyan} stopOpacity="0.9" />
          <stop offset="100%" stopColor={COLOR.cyanSoft} stopOpacity="0.6" />
        </linearGradient>
      </defs>

      {/* Main body */}
      <rect
        x={ox}
        y={oy + h * 0.08}
        width={w}
        height={h * 0.82}
        rx="4"
        fill="url(#fuelBody)"
        stroke="rgba(0,229,255,0.4)"
        strokeWidth="0.8"
      />

      {/* Top cap */}
      <rect
        x={ox + w * 0.1}
        y={oy}
        width={w * 0.8}
        height={h * 0.1}
        rx="2"
        fill="#253450"
        stroke="rgba(0,229,255,0.3)"
        strokeWidth="0.6"
      />

      {/* Nozzle */}
      <rect
        x={ox + w * 0.3}
        y={oy - h * 0.06}
        width={w * 0.4}
        height={h * 0.08}
        rx="2"
        fill="#1B2540"
        stroke="rgba(0,229,255,0.5)"
        strokeWidth="0.8"
      />

      {/* Energy window */}
      <rect
        x={ox + w * 0.15}
        y={oy + h * 0.22}
        width={w * 0.7}
        height={h * 0.42}
        rx="2"
        fill="rgba(0,229,255,0.12)"
        stroke="rgba(0,229,255,0.45)"
        strokeWidth="0.7"
      />
      <rect
        x={ox + w * 0.22}
        y={oy + h * 0.26}
        width={w * 0.56}
        height={h * 0.34}
        rx="1"
        fill="url(#fuelEnergy)"
        opacity="0.55"
      />

      {/* Measurement ticks */}
      {[0.28, 0.36, 0.44, 0.52].map((t, i) => (
        <line
          key={i}
          x1={ox}
          y1={oy + h * t}
          x2={ox + w * 0.12}
          y2={oy + h * t}
          stroke="rgba(0,229,255,0.45)"
          strokeWidth="0.8"
        />
      ))}

      {/* Bottom stand */}
      <rect
        x={ox - w * 0.1}
        y={oy + h * 0.88}
        width={w * 1.2}
        height={h * 0.1}
        rx="3"
        fill="#1B2540"
        stroke="rgba(0,229,255,0.2)"
        strokeWidth="0.6"
      />

      {/* Inner glow */}
      <ellipse
        cx={size / 2}
        cy={oy + h * 0.42}
        rx={w * 0.2}
        ry={h * 0.14}
        fill="rgba(0,229,255,0.15)"
        style={{ animation: "fuelPulse 1.8s ease-in-out infinite" }}
      />
    </svg>
  );
};

// ─── CoinSVG — space credit hexagonal chip ───────────────────────────────────
// Hexagonal, amber, circuit detail — instant CURRENCY read (not a generic coin)
export const CoinSVG = ({ size = 28 }: { size?: number }) => {
  const cx = size / 2;
  const cy = size / 2;
  const r = size * 0.44;
  // Hexagon points
  const hex = Array.from({ length: 6 }, (_, i) => {
    const a = ((i * 60 - 30) * Math.PI) / 180;
    return `${cx + r * Math.cos(a)},${cy + r * Math.sin(a)}`;
  }).join(" ");
  const innerR = r * 0.7;
  const hexInner = Array.from({ length: 6 }, (_, i) => {
    const a = ((i * 60 - 30) * Math.PI) / 180;
    return `${cx + innerR * Math.cos(a)},${cy + innerR * Math.sin(a)}`;
  }).join(" ");

  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} fill="none">
      <defs>
        <radialGradient id="coinFill" cx="40%" cy="35%">
          <stop offset="0%" stopColor="#FFD080" />
          <stop offset="60%" stopColor={COLOR.amber} />
          <stop offset="100%" stopColor="#A06820" />
        </radialGradient>
      </defs>

      {/* Outer hex */}
      <polygon
        points={hex}
        fill="url(#coinFill)"
        stroke="#A06820"
        strokeWidth="1"
      />

      {/* Inner hex facet */}
      <polygon points={hexInner} fill="#FFD080" opacity="0.35" />

      {/* Circuit spokes */}
      {Array.from({ length: 6 }, (_, i) => {
        const a = ((i * 60 - 30) * Math.PI) / 180;
        return (
          <line
            key={i}
            x1={cx + innerR * Math.cos(a)}
            y1={cy + innerR * Math.sin(a)}
            x2={cx + r * Math.cos(a)}
            y2={cy + r * Math.sin(a)}
            stroke="#A06820"
            strokeWidth="0.8"
          />
        );
      })}

      {/* SC text */}
      <text
        x={cx}
        y={cy + size * 0.075}
        textAnchor="middle"
        fontSize={size * 0.22}
        fontFamily="Orbitron"
        fontWeight="700"
        fill="#7A4A00"
      >
        SC
      </text>
    </svg>
  );
};

// ─── HeartSVG — life indicator ────────────────────────────────────────────────
export const HeartSVG = ({ filled }: { filled: boolean }) => (
  <svg width="20" height="18" viewBox="0 0 24 24">
    <path
      d="M12 21C12 21 3 14 3 8C3 5.24 5.24 3 8 3C9.74 3 11.27 3.93 12 5.28C12.73 3.93 14.26 3 16 3C18.76 3 21 5.24 21 8C21 14 12 21 12 21Z"
      fill={filled ? COLOR.red : "rgba(255,90,90,0.1)"}
      stroke={filled ? "#C03030" : "rgba(255,90,90,0.2)"}
      strokeWidth="0.8"
    />
  </svg>
);

// ─── FuelBolt — HUD icon ──────────────────────────────────────────────────────
export const FuelBolt = () => (
  <svg width="11" height="14" viewBox="0 0 14 18">
    <path
      d="M8 2L2 10H7L6 16L14 8H9L8 2Z"
      fill={COLOR.amber}
      stroke="rgba(0,229,255,0.4)"
      strokeWidth="0.8"
    />
  </svg>
);
