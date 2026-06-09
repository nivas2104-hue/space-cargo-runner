// MeteorSVG — redesigned as a dense iron-rock meteor
// Palette: warm dark brown core, orange-red rim, rocky surface detail
// Consistent with AsteroidSVG material language (brown-grey, not purple)

export default function MeteorSVG({ size = 70 }: { size?: number }) {
  const cx = size / 2;
  const cy = size / 2;
  const r = size * 0.42;

  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} fill="none">
      <defs>
        <radialGradient id="meteorCore" cx="35%" cy="30%">
          <stop offset="0%" stopColor="#C8855A" />
          <stop offset="30%" stopColor="#8B4A28" />
          <stop offset="65%" stopColor="#5C2E10" />
          <stop offset="100%" stopColor="#2A1006" />
        </radialGradient>
        <radialGradient id="meteorGlow" cx="50%" cy="50%">
          <stop offset="0%" stopColor="#FF6030" stopOpacity="0.35" />
          <stop offset="100%" stopColor="#FF6030" stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* Outer heat glow */}
      <circle cx={cx} cy={cy} r={r * 1.28} fill="url(#meteorGlow)" />

      {/* Main rocky body */}
      <circle
        cx={cx}
        cy={cy}
        r={r}
        fill="url(#meteorCore)"
        stroke="#FF7A40"
        strokeWidth="1.2"
        strokeOpacity="0.6"
      />

      {/* Surface detail — darker patches */}
      <circle
        cx={cx * 0.72}
        cy={cy * 0.75}
        r={r * 0.22}
        fill="#2A1006"
        opacity="0.6"
      />
      <circle
        cx={cx * 1.28}
        cy={cy * 1.18}
        r={r * 0.16}
        fill="#2A1006"
        opacity="0.5"
      />
      <circle
        cx={cx * 0.95}
        cy={cy * 1.38}
        r={r * 0.12}
        fill="#2A1006"
        opacity="0.45"
      />
      <circle
        cx={cx * 1.22}
        cy={cy * 0.72}
        r={r * 0.1}
        fill="#2A1006"
        opacity="0.4"
      />

      {/* Surface cracks */}
      <line
        x1={cx * 0.75}
        y1={cy * 0.85}
        x2={cx * 1.05}
        y2={cy * 1.15}
        stroke="rgba(0,0,0,0.45)"
        strokeWidth="1"
      />
      <line
        x1={cx * 1.15}
        y1={cy * 0.8}
        x2={cx * 0.95}
        y2={cy * 1.2}
        stroke="rgba(0,0,0,0.3)"
        strokeWidth="0.7"
      />

      {/* Rim highlight — top-left catch light */}
      <circle
        cx={cx * 0.72}
        cy={cy * 0.68}
        r={r * 0.2}
        fill="rgba(255,200,150,0.16)"
      />

      {/* Hot edge arc — bottom-right rim heat */}
      <path
        d={`M ${cx + r * 0.55} ${cy + r * 0.65} A ${r} ${r} 0 0 1 ${cx + r * 0.1} ${cy + r * 0.96}`}
        stroke="#FF9050"
        strokeWidth="1.4"
        strokeOpacity="0.5"
        fill="none"
        strokeLinecap="round"
      />
    </svg>
  );
}
