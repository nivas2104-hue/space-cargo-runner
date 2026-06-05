import { useEffect, useRef } from "react";
import type { CSSProperties } from "react";
import WalletConnect from "./WalletConnect";
// ─── Types ────────────────────────────────────────────────────────────────────
interface MainMenuProps {
  onStart: () => void;
  onHangar: () => void;
}

// ─── SVG Ship (uses ship.png via <image> tag so real asset is respected) ──────
const ShipSVG = () => (
  <svg
    width="160"
    height="200"
    viewBox="0 0 130 160"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    style={{
      filter: "drop-shadow(0 0 28px #b44fff) drop-shadow(0 0 10px #4fc3ff)",
    }}
  >
    {/* Engine glow */}
    <ellipse
      cx="65"
      cy="132"
      rx="40"
      ry="20"
      fill="url(#egMenu)"
      opacity="0.75"
    />
    {/* Main flame */}
    <path d="M51 118 Q65 158 79 118" fill="url(#flameMenu)" />
    {/* Side flames */}
    <path d="M42 106 Q37 122 44 118" fill="url(#sflameMenu)" />
    <path d="M88 106 Q93 122 86 118" fill="url(#sflameMenu)" />
    {/* Wings */}
    <path
      d="M62 100 L16 120 L21 132 L60 112 Z"
      fill="url(#wingMenuL)"
      stroke="#b44fff"
      strokeWidth="1.2"
    />
    <path
      d="M68 100 L114 120 L109 132 L70 112 Z"
      fill="url(#wingMenuR)"
      stroke="#b44fff"
      strokeWidth="1.2"
    />
    {/* Wing accent lights */}
    <rect
      x="18"
      y="118"
      width="16"
      height="5"
      rx="2.5"
      fill="#4fc3ff"
      opacity="0.9"
    />
    <rect
      x="96"
      y="118"
      width="16"
      height="5"
      rx="2.5"
      fill="#4fc3ff"
      opacity="0.9"
    />
    {/* Wing stripe */}
    <line
      x1="54"
      y1="108"
      x2="24"
      y2="122"
      stroke="#b44fff"
      strokeWidth="1"
      opacity="0.45"
    />
    <line
      x1="76"
      y1="108"
      x2="106"
      y2="122"
      stroke="#b44fff"
      strokeWidth="1"
      opacity="0.45"
    />
    {/* Body */}
    <path
      d="M65 8 C90 20 92 82 81 116 L49 116 C38 82 40 20 65 8Z"
      fill="url(#bodyMenu)"
      stroke="#c966ff"
      strokeWidth="1.8"
    />
    {/* Body center stripe */}
    <path d="M60 68 L70 68 L68 102 L62 102Z" fill="rgba(180,79,255,0.28)" />
    {/* Cockpit */}
    <ellipse
      cx="65"
      cy="50"
      rx="14"
      ry="21"
      fill="url(#cockpitMenu)"
      stroke="rgba(255,255,255,0.5)"
      strokeWidth="1.5"
    />
    {/* Cockpit shine */}
    <ellipse
      cx="59"
      cy="43"
      rx="5"
      ry="7.5"
      fill="rgba(255,255,255,0.42)"
      transform="rotate(-10 59 43)"
    />
    {/* Nose tip */}
    <ellipse cx="65" cy="12" rx="5" ry="4" fill="#ffd84d" opacity="0.9" />
    <defs>
      <radialGradient id="egMenu" cx="50%" cy="50%">
        <stop offset="0%" stopColor="#b44fff" stopOpacity="0.9" />
        <stop offset="100%" stopColor="#b44fff" stopOpacity="0" />
      </radialGradient>
      <linearGradient id="flameMenu" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#b44fff" />
        <stop offset="50%" stopColor="#ff7700" stopOpacity="0.85" />
        <stop offset="100%" stopColor="transparent" />
      </linearGradient>
      <linearGradient id="sflameMenu" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#4fc3ff" stopOpacity="0.75" />
        <stop offset="100%" stopColor="transparent" />
      </linearGradient>
      <linearGradient id="bodyMenu" x1="0" y1="0" x2="1" y2="0">
        <stop offset="0%" stopColor="#4a0099" stopOpacity="0.95" />
        <stop offset="40%" stopColor="#b44fff" />
        <stop offset="100%" stopColor="#4a0099" stopOpacity="0.75" />
      </linearGradient>
      <linearGradient id="wingMenuL" x1="0" y1="0" x2="1" y2="0">
        <stop offset="0%" stopColor="#4a0099" stopOpacity="0.5" />
        <stop offset="100%" stopColor="#7b00e0" />
      </linearGradient>
      <linearGradient id="wingMenuR" x1="1" y1="0" x2="0" y2="0">
        <stop offset="0%" stopColor="#4a0099" stopOpacity="0.5" />
        <stop offset="100%" stopColor="#7b00e0" />
      </linearGradient>
      <radialGradient id="cockpitMenu" cx="35%" cy="35%">
        <stop offset="0%" stopColor="rgba(220,245,255,0.96)" />
        <stop offset="50%" stopColor="#b44fff" stopOpacity="0.7" />
        <stop offset="100%" stopColor="rgba(10,0,50,0.65)" />
      </radialGradient>
    </defs>
  </svg>
);

// ─── Starfield particle component ─────────────────────────────────────────────
const Starfield = () => {
  const stars: CSSProperties[] = Array.from({ length: 60 }, (_, i) => ({
    position: "absolute" as const,
    width: i % 5 === 0 ? "2px" : "1px",
    height: i % 5 === 0 ? "2px" : "1px",
    left: `${(Math.sin(i * 137.508) * 0.5 + 0.5) * 100}%`,
    top: `${(Math.cos(i * 97.3) * 0.5 + 0.5) * 100}%`,
    borderRadius: "50%",
    background: i % 7 === 0 ? "#b44fff" : i % 11 === 0 ? "#4fc3ff" : "#ffffff",
    opacity: 0.2 + (i % 6) * 0.12,
    animation: `twinkle ${2 + (i % 4)}s ease-in-out ${(i % 10) * 0.3}s infinite alternate`,
  }));

  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        overflow: "hidden",
        pointerEvents: "none",
      }}
    >
      {stars.map((s, i) => (
        <div key={i} style={s} />
      ))}
    </div>
  );
};

// ─── Floating asteroid decoration ─────────────────────────────────────────────
const Asteroid = ({
  size,
  top,
  left,
  right,
  rotate,
  opacity,
}: {
  size: number;
  top: string;
  left?: string;
  right?: string;
  rotate: number;
  opacity: number;
}) => (
  <div
    style={{
      position: "absolute",
      width: size,
      height: size * 0.75,
      top,
      left,
      right,
      opacity,
      transform: `rotate(${rotate}deg)`,
      borderRadius: "40% 60% 55% 45% / 50% 40% 60% 50%",
      background: "linear-gradient(135deg,#5544aa,#332255)",
      border: "1px solid rgba(180,79,255,0.25)",
      pointerEvents: "none",
    }}
  />
);

// ─── CSS injector (keyframes) ──────────────────────────────────────────────────
const injectStyles = () => {
  if (document.getElementById("scr-menu-styles")) return;
  const el = document.createElement("style");
  el.id = "scr-menu-styles";
  el.textContent = `
    @import url('https://fonts.googleapis.com/css2?family=Fredoka+One&family=Nunito:wght@700;800;900&display=swap');
    @keyframes twinkle { from { opacity: 0.2 } to { opacity: 0.9 } }
    @keyframes bob { 0%,100% { transform: translateY(0) } 50% { transform: translateY(-14px) } }
    @keyframes pulseBtn {
      0%,100% { box-shadow: 0 6px 0 #a84f00, 0 0 18px #ffd84d, 0 0 40px rgba(255,149,0,0.5) }
      50%      { box-shadow: 0 6px 0 #a84f00, 0 0 36px #ffd84d, 0 0 70px rgba(255,149,0,0.7) }
    }
    @keyframes shimmer {
      0%   { left: -100% }
      60%, 100% { left: 160% }
    }
    @keyframes fadeUp {
      from { opacity: 0; transform: translateY(20px) }
      to   { opacity: 1; transform: translateY(0) }
    }
    @keyframes logoGlow {
      0%,100% { filter: drop-shadow(0 0 18px #b44fff) drop-shadow(0 0 40px #7b00e080) }
      50%     { filter: drop-shadow(0 0 30px #b44fff) drop-shadow(0 0 60px #7b00e0aa) }
    }
    @keyframes planetSpin {
      from { transform: translate(-50%, -50%) rotateX(75deg) rotateZ(0deg) }
      to   { transform: translate(-50%, -50%) rotateX(75deg) rotateZ(360deg) }
    }
  `;
  document.head.appendChild(el);
};

// ─── Main Component ────────────────────────────────────────────────────────────
export default function MainMenu({ onStart, onHangar }: MainMenuProps) {
  const btnRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    injectStyles();
  }, []);

  const handleBtnDown = () => {
    if (btnRef.current) {
      btnRef.current.style.transform = "translateY(4px)";
      btnRef.current.style.boxShadow = "0 2px 0 #a84f00, 0 0 18px #ffd84d";
    }
  };
  const handleBtnUp = () => {
    if (btnRef.current) {
      btnRef.current.style.transform = "";
      btnRef.current.style.boxShadow = "";
    }
  };

  return (
    <div
      style={{
        position: "relative",
        width: "100vw",
        height: "100vh",
        minHeight: "100vh",
        background:
          "radial-gradient(ellipse at 50% 28%, #1a0044 0%, #07001c 65%)",
        fontFamily: "'Nunito', sans-serif",
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      {/* Starfield */}
      <Starfield />

      {/* Nebula blobs */}
      <div
        style={{
          position: "absolute",
          width: 320,
          height: 320,
          top: -80,
          left: -100,
          borderRadius: "50%",
          background: "rgba(100,0,200,0.18)",
          filter: "blur(70px)",
          pointerEvents: "none",
        }}
      />
      <div
        style={{
          position: "absolute",
          width: 200,
          height: 200,
          bottom: 120,
          right: -60,
          borderRadius: "50%",
          background: "rgba(0,80,200,0.14)",
          filter: "blur(60px)",
          pointerEvents: "none",
        }}
      />

      {/* Planet top-left */}
      <div
        style={{
          position: "absolute",
          width: 150,
          height: 150,
          top: 55,
          left: -55,
          borderRadius: "50%",
          background:
            "radial-gradient(circle at 35% 30%, #4a2080, #1a0044 60%, #0d0030)",
          border: "2px solid rgba(180,79,255,0.3)",
          boxShadow: "0 0 50px rgba(100,0,200,0.3)",
          pointerEvents: "none",
        }}
      >
        {/* Ring */}
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            width: 210,
            height: 44,
            transform: "translate(-50%,-50%) rotateX(75deg)",
            borderRadius: "50%",
            border: "3px solid rgba(180,79,255,0.28)",
            boxShadow: "0 0 18px rgba(180,79,255,0.2)",
            animation: "planetSpin 20s linear infinite",
          }}
        />
      </div>

      {/* Small planet bottom-right */}
      <div
        style={{
          position: "absolute",
          width: 64,
          height: 64,
          bottom: 200,
          right: 22,
          borderRadius: "50%",
          background: "radial-gradient(circle at 35% 30%, #1a4080, #0d0030)",
          border: "1.5px solid rgba(79,195,255,0.3)",
          boxShadow: "0 0 22px rgba(0,80,200,0.3)",
          pointerEvents: "none",
        }}
      />

      {/* Floating asteroids */}
      <Asteroid
        size={40}
        top="28%"
        right="38px"
        left="auto"
        rotate={15}
        opacity={0.6}
      />
      <Asteroid size={24} top="45%" left="28px" rotate={-20} opacity={0.5} />
      <Asteroid
        size={16}
        top="60%"
        right="80px"
        left="auto"
        rotate={35}
        opacity={0.4}
      />
      <Asteroid size={30} top="72%" left="18px" rotate={-8} opacity={0.35} />

      {/* Logo */}
      <div
        style={{
          position: "relative",
          zIndex: 5,
          marginTop: 110,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          animation: "fadeUp 0.6s ease both",
        }}
      >
        <div
          style={{
            fontFamily: "'Fredoka One', cursive",
            fontSize: 66,
            lineHeight: 1,
            letterSpacing: 3,
            background:
              "linear-gradient(180deg, #fff 0%, #c8aaff 40%, #7b00e0 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
            animation: "logoGlow 3s ease-in-out infinite",
          }}
        >
          SPACE
        </div>
        <div
          style={{
            fontFamily: "'Fredoka One', cursive",
            fontSize: 38,
            letterSpacing: 7,
            marginTop: -6,
            background: "linear-gradient(180deg, #4fc3ff 0%, #0077cc 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
            filter: "drop-shadow(0 0 14px #4fc3ff)",
          }}
        >
          CARGO
        </div>
        <div
          style={{
            fontFamily: "'Fredoka One', cursive",
            fontSize: 30,
            letterSpacing: 9,
            background: "linear-gradient(180deg, #ffd84d 0%, #ff8c00 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
            filter: "drop-shadow(0 0 12px #ffd84d)",
          }}
        >
          RUNNER
        </div>
      </div>

      {/* Bobbing ship */}
      <div
        style={{
          position: "relative",
          zIndex: 5,
          marginTop: 24,
          animation: "bob 2.8s ease-in-out infinite",
        }}
      >
        <ShipSVG />
      </div>

      {/* Bottom buttons */}
      <div
        style={{
          position: "absolute",
          bottom: 50,
          left: 0,
          right: 0,
          padding: "0 36px",
          zIndex: 10,
          display: "flex",
          flexDirection: "column",
          gap: 12,
          animation: "fadeUp 0.7s 0.2s ease both",
          opacity: 0,
          animationFillMode: "forwards",
        }}
      >
        <div
          style={{
            fontSize: 12,
            fontWeight: 900,
            color: "rgba(255,255,255,0.32)",
            textAlign: "center",
            letterSpacing: 4,
            textTransform: "uppercase",
            marginBottom: 4,
          }}
        >
          Collect · Dodge · Survive
        </div>
        {/* START */}
        <button
          ref={btnRef}
          onPointerDown={handleBtnDown}
          onPointerUp={handleBtnUp}
          onPointerLeave={handleBtnUp}
          onClick={onStart}
          style={{
            fontFamily: "'Fredoka One', cursive",
            fontSize: 26,
            letterSpacing: 3,
            color: "#fff",
            background: "linear-gradient(180deg, #ffd84d 0%, #ff8c00 100%)",
            border: "none",
            borderRadius: 999,
            padding: "16px 0",
            width: "100%",
            cursor: "pointer",
            animation: "pulseBtn 1.8s ease-in-out infinite",
            textShadow: "0 2px 8px rgba(0,0,0,0.4)",
            position: "relative",
            overflow: "hidden",
            transition: "transform 0.08s",
          }}
        >
          🚀 START
          {/* Shimmer */}
          <span
            style={{
              position: "absolute",
              top: 0,
              left: "-100%",
              width: "55%",
              height: "100%",
              background:
                "linear-gradient(90deg, transparent, rgba(255,255,255,0.22), transparent)",
              animation: "shimmer 2.5s ease-in-out infinite",
              pointerEvents: "none",
            }}
          />
        </button>
        {/* HANGAR */}
        <button
          onClick={onHangar}
          style={{
            fontFamily: "'Fredoka One', cursive",
            fontSize: 18,
            letterSpacing: 2,
            color: "#fff",
            background: "rgba(7,0,28,0.7)",
            border: "1.5px solid rgba(180,79,255,0.5)",
            borderRadius: 999,
            padding: "12px 0",
            width: "100%",
            cursor: "pointer",
            boxShadow: "0 0 18px #b44fff55",
            backdropFilter: "blur(6px)",
            transition: "background 0.2s, box-shadow 0.2s",
          }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLButtonElement).style.background =
              "rgba(123,0,224,0.25)";
            (e.currentTarget as HTMLButtonElement).style.boxShadow =
              "0 0 28px #b44fff88";
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLButtonElement).style.background =
              "rgba(7,0,28,0.7)";
            (e.currentTarget as HTMLButtonElement).style.boxShadow =
              "0 0 18px #b44fff55";
          }}
        >
          🛸 HANGAR
        </button>

        <WalletConnect />
      </div>
    </div>
  );
}
