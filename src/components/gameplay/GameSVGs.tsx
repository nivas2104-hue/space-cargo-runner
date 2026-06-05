export const AsteroidSVG = ({ size, seed }: any) => {
  const r = (function seededRand(seed: number) {
    let s = seed;

    return () => {
      s = (s * 16807) % 2147483647;
      return (s - 1) / 2147483646;
    };
  })(seed);

  const points = Array.from({ length: 10 }, (_, i) => {
    const angle = (i / 10) * Math.PI * 2;
    const dist = (0.65 + r() * 0.35) * size * 0.5;

    return `${size / 2 + Math.cos(angle) * dist},${
      size / 2 + Math.sin(angle) * dist
    }`;
  }).join(" ");

  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} fill="none">
      <defs>
        <radialGradient id={`rock-${seed}`}>
          <stop offset="0%" stopColor="#9c6cff" />
          <stop offset="60%" stopColor="#6b3fb4" />
          <stop offset="100%" stopColor="#3a1f66" />
        </radialGradient>
      </defs>

      <polygon
        points={points}
        fill={`url(#rock-${seed})`}
        stroke="#b44fff"
        strokeWidth="2"
      />

      {/* Main crater */}
      <circle
        cx={size * 0.35}
        cy={size * 0.35}
        r={size * 0.12}
        fill="#2a0038"
        opacity="0.65"
      />

      {/* Small crater */}
      <circle
        cx={size * 0.65}
        cy={size * 0.55}
        r={size * 0.08}
        fill="#2a0038"
        opacity="0.55"
      />

      {/* Tiny crater */}
      <circle
        cx={size * 0.45}
        cy={size * 0.72}
        r={size * 0.05}
        fill="#2a0038"
        opacity="0.5"
      />

      {/* Highlight */}
      <circle
        cx={size * 0.25}
        cy={size * 0.25}
        r={size * 0.15}
        fill="#ffffff22"
      />
    </svg>
  );
};

export const CrateSVG = ({ size = 52 }: any) => (
  <svg width={size} height={size} viewBox="0 0 52 52">
    {/* Outer frame */}
    <rect
      x="4"
      y="4"
      width="44"
      height="44"
      rx="8"
      fill="#232735"
      stroke="#6f7788"
      strokeWidth="2"
    />

    {/* Energy core */}
    <rect x="12" y="12" width="28" height="28" rx="4" fill="#ffffff" />

    {/* Metal braces */}
    <rect x="20" y="4" width="12" height="44" fill="#6f7788" opacity="0.85" />

    <rect x="4" y="20" width="44" height="12" fill="#6f7788" opacity="0.85" />

    {/* Core glow */}
    <circle cx="26" cy="26" r="6" fill="#bdf4ff" />

    {/* Corner lights */}
    <circle cx="10" cy="10" r="2" fill="#ffe98a" />
    <circle cx="42" cy="10" r="2" fill="#ffe98a" />
    <circle cx="10" cy="42" r="2" fill="#ffe98a" />
    <circle cx="42" cy="42" r="2" fill="#ffe98a" />
  </svg>
);
export const FuelCanSVG = ({ size = 52 }: any) => (
  <svg width={size} height={size} viewBox="0 0 52 52">
    <rect
      x="14"
      y="4"
      width="24"
      height="44"
      rx="8"
      fill="#232735"
      stroke="#596070"
      strokeWidth="2"
    />

    <rect x="18" y="10" width="16" height="28" rx="5" fill="#4fc3ff" />

    <circle cx="26" cy="24" r="5" fill="#bdf4ff" />
  </svg>
);

export const CoinSVG = ({ size = 28 }: any) => (
  <svg width={size} height={size} viewBox="0 0 28 28" fill="none">
    <circle
      cx="14"
      cy="14"
      r="12"
      fill="#ffd84d"
      stroke="#ff9500"
      strokeWidth="1.5"
    />
  </svg>
);

export const HeartSVG = ({ filled }: any) => (
  <svg width="22" height="22" viewBox="0 0 24 24">
    <path
      d="M12 21C12 21 3 14 3 8C3 5.24 5.24 3 8 3C9.74 3 11.27 3.93 12 5.28C12.73 3.93 14.26 3 16 3C18.76 3 21 5.24 21 8C21 14 12 21 12 21Z"
      fill={filled ? "#ff4488" : "rgba(255,68,136,0.12)"}
    />
  </svg>
);

export const FuelBolt = () => (
  <svg width="12" height="14" viewBox="0 0 14 18">
    <path
      d="M8 2L2 10H7L6 16L14 8H9L8 2Z"
      fill="#ffd84d"
      stroke="#c966ff"
      strokeWidth="1.2"
    />
  </svg>
);
