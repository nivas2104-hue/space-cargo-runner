import { useEffect, useState } from "react";
import type { CSSProperties } from "react";
import WalletConnect from "./WalletConnect";
import {
  COLOR,
  RADIUS,
  PrimaryButton,
  injectGlobalStyles,
} from "./design-system";

// ─── Props ────────────────────────────────────────────────────────────────────
interface MainMenuProps {
  onStart: () => void;
  onHangar: () => void;
  onProfile: () => void;
}

// ─── Ship SVG — industrial cargo runner ──────────────────────────────────────
const ShipSVG = () => (
  <svg
    width="160"
    height="200"
    viewBox="0 0 130 160"
    fill="none"
    style={{
      filter:
        "drop-shadow(0 0 24px rgba(0,229,255,0.6)) drop-shadow(0 0 8px rgba(0,229,255,0.3))",
      animation: "bob 2.8s ease-in-out infinite",
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
      style={{ animation: "thrusterGlow 0.18s ease-in-out infinite" }}
    />
    {/* Main flame */}
    <path
      d="M51 118 Q65 158 79 118"
      fill="url(#flameMenu)"
      style={{
        transformOrigin: "65px 130px",
        animation: "thrusterFlame 0.14s ease-in-out infinite",
      }}
    />
    {/* Side flames */}
    <path
      d="M42 106 Q37 122 44 118"
      fill="url(#sflameMenu)"
      style={{ animation: "thrusterFlame 0.18s 0.05s ease-in-out infinite" }}
    />
    <path
      d="M88 106 Q93 122 86 118"
      fill="url(#sflameMenu)"
      style={{ animation: "thrusterFlame 0.18s 0.1s ease-in-out infinite" }}
    />
    {/* Wings */}
    <path
      d="M62 100 L16 120 L21 132 L60 112 Z"
      fill="url(#wingMenuL)"
      stroke={COLOR.cyanSoft}
      strokeWidth="1.2"
    />
    <path
      d="M68 100 L114 120 L109 132 L70 112 Z"
      fill="url(#wingMenuR)"
      stroke={COLOR.cyanSoft}
      strokeWidth="1.2"
    />
    {/* Wing accent lights */}
    <rect
      x="18"
      y="118"
      width="16"
      height="5"
      rx="2.5"
      fill={COLOR.cyan}
      opacity="0.9"
    />
    <rect
      x="96"
      y="118"
      width="16"
      height="5"
      rx="2.5"
      fill={COLOR.cyan}
      opacity="0.9"
    />
    {/* Wing panel lines */}
    <line
      x1="54"
      y1="108"
      x2="24"
      y2="122"
      stroke={COLOR.cyanSoft}
      strokeWidth="1"
      opacity="0.4"
    />
    <line
      x1="76"
      y1="108"
      x2="106"
      y2="122"
      stroke={COLOR.cyanSoft}
      strokeWidth="1"
      opacity="0.4"
    />
    {/* Body */}
    <path
      d="M65 8 C90 20 92 82 81 116 L49 116 C38 82 40 20 65 8Z"
      fill="url(#bodyMenu)"
      stroke="rgba(0,229,255,0.45)"
      strokeWidth="1.8"
    />
    {/* Body panel lines */}
    <path d="M60 40 L70 40 L69 80 L61 80Z" fill="rgba(0,229,255,0.08)" />
    <line
      x1="55"
      y1="60"
      x2="75"
      y2="60"
      stroke="rgba(0,229,255,0.15)"
      strokeWidth="0.8"
    />
    {/* Center stripe */}
    <path d="M60 68 L70 68 L68 102 L62 102Z" fill="rgba(0,229,255,0.18)" />
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
    <ellipse cx="65" cy="12" rx="5" ry="4" fill={COLOR.cyan} opacity="0.9" />
    <defs>
      <radialGradient id="egMenu" cx="50%" cy="50%">
        <stop offset="0%" stopColor={COLOR.cyan} stopOpacity="0.9" />
        <stop offset="100%" stopColor={COLOR.cyan} stopOpacity="0" />
      </radialGradient>
      <linearGradient id="flameMenu" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor={COLOR.cyanSoft} />
        <stop offset="50%" stopColor={COLOR.cyan} stopOpacity="0.85" />
        <stop offset="100%" stopColor="transparent" />
      </linearGradient>
      <linearGradient id="sflameMenu" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor={COLOR.cyan} stopOpacity="0.75" />
        <stop offset="100%" stopColor="transparent" />
      </linearGradient>
      <linearGradient id="bodyMenu" x1="0" y1="0" x2="1" y2="0">
        <stop offset="0%" stopColor="#0D1E3A" stopOpacity="0.95" />
        <stop offset="40%" stopColor="#1B3060" />
        <stop offset="100%" stopColor="#0D1E3A" stopOpacity="0.75" />
      </linearGradient>
      <linearGradient id="wingMenuL" x1="0" y1="0" x2="1" y2="0">
        <stop offset="0%" stopColor="#081020" stopOpacity="0.5" />
        <stop offset="100%" stopColor="#142840" />
      </linearGradient>
      <linearGradient id="wingMenuR" x1="1" y1="0" x2="0" y2="0">
        <stop offset="0%" stopColor="#081020" stopOpacity="0.5" />
        <stop offset="100%" stopColor="#142840" />
      </linearGradient>
      <radialGradient id="cockpitMenu" cx="35%" cy="35%">
        <stop offset="0%" stopColor="rgba(220,245,255,0.96)" />
        <stop offset="50%" stopColor={COLOR.cyanSoft} stopOpacity="0.7" />
        <stop offset="100%" stopColor="rgba(10,20,50,0.65)" />
      </radialGradient>
    </defs>
  </svg>
);

// ─── Starfield ────────────────────────────────────────────────────────────────
const Starfield = () => {
  const stars: CSSProperties[] = Array.from({ length: 60 }, (_, i) => ({
    position: "absolute" as const,
    width: i % 5 === 0 ? "2px" : "1px",
    height: i % 5 === 0 ? "2px" : "1px",
    left: `${(Math.sin(i * 137.508) * 0.5 + 0.5) * 100}%`,
    top: `${(Math.cos(i * 97.3) * 0.5 + 0.5) * 100}%`,
    borderRadius: "50%",
    background:
      i % 7 === 0 ? COLOR.cyanSoft : i % 11 === 0 ? COLOR.cyan : "#ffffff",
    opacity: 0.15 + (i % 6) * 0.1,
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

// ─── Decorative asteroid blob ─────────────────────────────────────────────────
const AsteroidDeco = ({
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
      background: "linear-gradient(135deg, #2A3A5A, #141E30)",
      border: "1px solid rgba(0,229,255,0.12)",
      pointerEvents: "none",
    }}
  />
);

// ─── Main Component ────────────────────────────────────────────────────────────
export default function MainMenu({
  onStart,
  onHangar,
  onProfile,
}: MainMenuProps) {
  const [hangarHover, setHangarHover] = useState(false);
  const [profileHover, setProfileHover] = useState(false);

  useEffect(() => {
    injectGlobalStyles();
  }, []);

  return (
    <div
      style={{
        position: "relative",
        width: "100%",
        minHeight: "100vh",
        overflow: "hidden",
        background: `radial-gradient(ellipse at 50% 25%, #0D1830 0%, ${COLOR.bgDeep} 65%)`,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Starfield />

      {/* Nebula blobs */}
      <div
        style={{
          position: "absolute",
          width: 320,
          height: 320,
          top: -80,
          left: -120,
          borderRadius: "50%",
          background: "rgba(0,100,180,0.08)",
          filter: "blur(80px)",
          pointerEvents: "none",
          animation: "nebulaDrift 20s ease-in-out infinite",
        }}
      />
      <div
        style={{
          position: "absolute",
          width: 240,
          height: 240,
          top: "35%",
          right: -80,
          borderRadius: "50%",
          background: "rgba(0,200,255,0.06)",
          filter: "blur(70px)",
          pointerEvents: "none",
          animation: "nebulaDrift 26s 6s ease-in-out infinite",
        }}
      />

      {/* Ringed planet top-left */}
      <div
        style={{
          position: "absolute",
          top: 60,
          left: 22,
          width: 80,
          height: 80,
          borderRadius: "50%",
          background: "radial-gradient(circle at 35% 30%, #1A2A50, #080F20)",
          border: "1px solid rgba(0,229,255,0.12)",
          boxShadow: "0 0 18px rgba(0,80,200,0.2)",
          pointerEvents: "none",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            width: 128,
            height: 128,
            borderRadius: "50%",
            border: "2px solid rgba(0,229,255,0.18)",
            transform: "translate(-50%,-50%) rotateX(72deg)",
            animation: "planetRingOrbit 22s linear infinite",
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
          background: "radial-gradient(circle at 35% 30%, #1a3060, #0a0f20)",
          border: "1.5px solid rgba(0,229,255,0.15)",
          boxShadow: "0 0 20px rgba(0,80,200,0.2)",
          pointerEvents: "none",
        }}
      />

      {/* Decorative asteroids */}
      <AsteroidDeco
        size={40}
        top="28%"
        right="38px"
        rotate={15}
        opacity={0.5}
      />
      <AsteroidDeco
        size={24}
        top="45%"
        left="28px"
        rotate={-20}
        opacity={0.4}
      />
      <AsteroidDeco
        size={16}
        top="60%"
        right="80px"
        rotate={35}
        opacity={0.35}
      />
      <AsteroidDeco size={30} top="72%" left="18px" rotate={-8} opacity={0.3} />

      {/* ── LOGO ── */}
      <div
        style={{
          position: "relative",
          zIndex: 5,
          marginTop: 100,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          animation: "fadeUp 0.6s ease both",
        }}
      >
        {/* Cyan accent line above logo */}
        <div
          style={{
            width: 40,
            height: 2,
            background: COLOR.cyan,
            marginBottom: 12,
            boxShadow: GLOW_LINE,
          }}
        />
        <div
          style={{
            fontFamily: "'Orbitron', sans-serif",
            fontWeight: 900,
            fontSize: 54,
            letterSpacing: "0.18em",
            lineHeight: 1,
            color: "#fff",
            textShadow: "0 0 30px rgba(0,229,255,0.4)",
            animation: "logoGlow 3s ease-in-out infinite",
          }}
        >
          SPACE
        </div>
        <div
          style={{
            fontFamily: "'Orbitron', sans-serif",
            fontWeight: 700,
            fontSize: 32,
            letterSpacing: "0.25em",
            marginTop: -4,
            color: COLOR.cyan,
            textShadow: "0 0 20px rgba(0,229,255,0.8)",
          }}
        >
          CARGO
        </div>
        <div
          style={{
            fontFamily: "'Rajdhani', sans-serif",
            fontWeight: 600,
            fontSize: 22,
            letterSpacing: "0.45em",
            marginTop: 2,
            color: COLOR.amber,
            textShadow: "0 0 12px rgba(255,181,71,0.6)",
          }}
        >
          RUNNER
        </div>
        <div
          style={{
            width: 40,
            height: 2,
            background: COLOR.amber,
            marginTop: 12,
            boxShadow: GLOW_LINE_AMBER,
          }}
        />
      </div>

      {/* ── SHIP ── */}
      <div style={{ position: "relative", zIndex: 5, marginTop: 20 }}>
        <ShipSVG />
      </div>

      {/* ── BOTTOM BUTTONS ── */}
      <div
        style={{
          position: "absolute",
          bottom: 40,
          left: 0,
          right: 0,
          padding: "0 32px",
          zIndex: 10,
          display: "flex",
          flexDirection: "column",
          gap: 10,
          animation: "fadeUp 0.7s 0.2s ease both",
          opacity: 0,
          animationFillMode: "forwards",
        }}
      >
        {/* Tagline */}
        <div
          style={{
            fontFamily: "'Rajdhani', sans-serif",
            fontSize: 12,
            fontWeight: 600,
            color: COLOR.textMuted,
            textAlign: "center",
            letterSpacing: "0.3em",
            textTransform: "uppercase",
            marginBottom: 4,
          }}
        >
          COLLECT · DODGE · SURVIVE
        </div>

        {/* START — cyan primary */}
        <PrimaryButton
          onClick={onStart}
          pulse
          style={{ padding: "16px 0", width: "100%", fontSize: 20 }}
        >
          ▶ &nbsp;START MISSION
        </PrimaryButton>

        {/* HANGAR */}
        <button
          onClick={onHangar}
          onMouseEnter={() => setHangarHover(true)}
          onMouseLeave={() => setHangarHover(false)}
          style={{
            fontFamily: "'Orbitron', sans-serif",
            fontWeight: 600,
            fontSize: 14,
            letterSpacing: "0.12em",
            textTransform: "uppercase",
            color: hangarHover ? COLOR.cyan : "rgba(255,255,255,0.8)",
            background: hangarHover
              ? "rgba(0,229,255,0.1)"
              : "rgba(17,24,39,0.6)",
            border: `1px solid ${hangarHover ? COLOR.borderActive : COLOR.borderPanel}`,
            borderRadius: RADIUS.md,
            padding: "13px 0",
            width: "100%",
            cursor: "pointer",
            backdropFilter: "blur(8px)",
            boxShadow: hangarHover
              ? `inset 0 1px 0 rgba(0,229,255,0.1), 0 2px 0 rgba(0,0,0,0.4), 0 0 12px rgba(0,229,255,0.2)`
              : "inset 0 1px 0 rgba(255,255,255,0.04), 0 2px 0 rgba(0,0,0,0.4)",
            transition: "all 0.15s ease",
          }}
        >
          ⬡ &nbsp;HANGAR
        </button>

        {/* PROFILE */}
        <button
          onClick={onProfile}
          onMouseEnter={() => setProfileHover(true)}
          onMouseLeave={() => setProfileHover(false)}
          style={{
            fontFamily: "'Orbitron', sans-serif",
            fontWeight: 600,
            fontSize: 14,
            letterSpacing: "0.12em",
            textTransform: "uppercase",
            color: profileHover ? COLOR.cyan : "rgba(255,255,255,0.6)",
            background: profileHover
              ? "rgba(0,229,255,0.08)"
              : "rgba(17,24,39,0.5)",
            border: `1px solid ${profileHover ? COLOR.borderPanel : COLOR.borderSubtle}`,
            borderRadius: RADIUS.md,
            padding: "11px 0",
            width: "100%",
            cursor: "pointer",
            backdropFilter: "blur(8px)",
            transition: "all 0.15s ease",
          }}
        >
          ◈ &nbsp;PROFILE
        </button>

        {/* TELEGRAM LOGIN */}
        <button
          onClick={() => {
            const username = prompt("Enter Telegram Username");
            if (username) {
              localStorage.setItem("username", username);
              localStorage.setItem("loginType", "telegram");
              window.location.reload();
            }
          }}
          style={{
            fontFamily: "'Rajdhani', sans-serif",
            fontWeight: 600,
            fontSize: 13,
            letterSpacing: "0.1em",
            textTransform: "uppercase",
            color: "rgba(255,255,255,0.5)",
            background: "rgba(34,158,217,0.12)",
            border: "1px solid rgba(34,158,217,0.25)",
            borderRadius: RADIUS.md,
            padding: "10px 0",
            width: "100%",
            cursor: "pointer",
            transition: "all 0.15s ease",
          }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLButtonElement).style.background =
              "rgba(34,158,217,0.22)";
            (e.currentTarget as HTMLButtonElement).style.color = "#fff";
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLButtonElement).style.background =
              "rgba(34,158,217,0.12)";
            (e.currentTarget as HTMLButtonElement).style.color =
              "rgba(255,255,255,0.5)";
          }}
        >
          📱 TELEGRAM LOGIN
        </button>

        <WalletConnect />
      </div>
    </div>
  );
}

const GLOW_LINE = "0 0 8px rgba(0,229,255,0.8)";
const GLOW_LINE_AMBER = "0 0 8px rgba(255,181,71,0.8)";
