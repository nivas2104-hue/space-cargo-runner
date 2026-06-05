interface ShipSVGProps {
  color?: string;
}

export default function ShipSVG({ color = "#b44fff" }: ShipSVGProps) {
  return (
    <svg
      width="100"
      height="130"
      viewBox="0 0 130 160"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <ellipse
        cx="65"
        cy="132"
        rx="42"
        ry="22"
        fill="url(#gsEG)"
        opacity="0.8"
        style={{ animation: "thrusterGlow 0.18s ease-in-out infinite" }}
      />

      <path
        d="M50 118 Q65 168 80 118"
        fill="url(#gsFl)"
        style={{
          transformOrigin: "65px 130px",
          animation: "thrusterFlame 0.14s ease-in-out infinite",
        }}
      />

      <path
        d="M42 108 Q36 128 45 120"
        fill="url(#gsSF)"
        style={{
          animation: "thrusterFlame 0.18s 0.05s ease-in-out infinite",
        }}
      />

      <path
        d="M88 108 Q94 128 85 120"
        fill="url(#gsSF)"
        style={{
          animation: "thrusterFlame 0.18s 0.1s ease-in-out infinite",
        }}
      />

      <path
        d="M62 100 L14 122 L20 134 L60 113 Z"
        fill="url(#gsWL)"
        stroke={color}
        strokeWidth="1.3"
      />

      <path
        d="M68 100 L116 122 L110 134 L70 113 Z"
        fill="url(#gsWR)"
        stroke={color}
        strokeWidth="1.3"
      />

      <rect
        x="16"
        y="120"
        width="18"
        height="5"
        rx="2.5"
        fill="#4fc3ff"
        opacity="0.95"
      />

      <rect
        x="96"
        y="120"
        width="18"
        height="5"
        rx="2.5"
        fill="#4fc3ff"
        opacity="0.95"
      />

      <line
        x1="54"
        y1="109"
        x2="22"
        y2="124"
        stroke={color}
        strokeWidth="1"
        opacity="0.4"
      />

      <line
        x1="76"
        y1="109"
        x2="108"
        y2="124"
        stroke={color}
        strokeWidth="1"
        opacity="0.4"
      />

      <path
        d="M65 8 C90 20 93 82 82 116 L48 116 C37 82 40 20 65 8Z"
        fill="url(#gsBD)"
        stroke="#c966ff"
        strokeWidth="1.8"
      />

      <path d="M60 68 L70 68 L68 102 L62 102Z" fill="rgba(180,79,255,0.3)" />

      <ellipse
        cx="65"
        cy="50"
        rx="14"
        ry="22"
        fill="url(#gsCP)"
        stroke="rgba(255,255,255,0.5)"
        strokeWidth="1.5"
      />

      <ellipse
        cx="59"
        cy="43"
        rx="5"
        ry="8"
        fill="rgba(255,255,255,0.44)"
        transform="rotate(-10 59 43)"
      />

      <ellipse cx="65" cy="11" rx="5" ry="4" fill={color} opacity="0.95" />

      <defs>
        <radialGradient id="gsEG" cx="50%" cy="50%">
          <stop offset="0%" stopColor={color} stopOpacity="0.95" />
          <stop offset="100%" stopColor={color} stopOpacity="0" />
        </radialGradient>

        <linearGradient id="gsFl" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={color} />
          <stop offset="45%" stopColor="#ff7700" stopOpacity="0.9" />
          <stop offset="100%" stopColor="transparent" />
        </linearGradient>

        <linearGradient id="gsSF" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#4fc3ff" stopOpacity="0.8" />
          <stop offset="100%" stopColor="transparent" />
        </linearGradient>

        <linearGradient id="gsBD" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor={color} stopOpacity="0.95" />
          <stop offset="40%" stopColor={color} />
          <stop offset="100%" stopColor={color} stopOpacity="0.75" />
        </linearGradient>

        <linearGradient id="gsWL" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#3a007a" stopOpacity="0.5" />
          <stop offset="100%" stopColor={color} />
        </linearGradient>

        <linearGradient id="gsWR" x1="1" y1="0" x2="0" y2="0">
          <stop offset="0%" stopColor="#3a007a" stopOpacity="0.5" />
          <stop offset="100%" stopColor={color} />
        </linearGradient>

        <radialGradient id="gsCP" cx="35%" cy="35%">
          <stop offset="0%" stopColor="rgba(220,245,255,0.97)" />
          <stop offset="50%" stopColor={color} stopOpacity="0.7" />
          <stop offset="100%" stopColor="rgba(10,0,50,0.65)" />
        </radialGradient>
      </defs>
    </svg>
  );
}
