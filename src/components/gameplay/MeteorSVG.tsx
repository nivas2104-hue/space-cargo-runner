export default function MeteorSVG({ size = 70 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 70 70">
      <defs>
        <radialGradient id="meteorCore">
          <stop offset="0%" stopColor="#ffb199" />
          <stop offset="25%" stopColor="#ff7043" />
          <stop offset="60%" stopColor="#c62828" />
          <stop offset="100%" stopColor="#4e342e" />
        </radialGradient>
      </defs>

      {/* Glow */}
      <circle cx="35" cy="35" r="30" fill="#d84315" opacity="0.25" />

      {/* Main body */}
      <circle
        cx="35"
        cy="35"
        r="22"
        fill="url(#meteorCore)"
        stroke="#bf360c"
        strokeWidth="2"
      />

      {/* Craters */}
      <circle cx="28" cy="28" r="4" fill="#2d1b16" opacity="0.6" />

      <circle cx="44" cy="38" r="3" fill="#2d1b16" opacity="0.5" />

      <circle cx="34" cy="47" r="2.5" fill="#2d1b16" opacity="0.4" />
    </svg>
  );
}
