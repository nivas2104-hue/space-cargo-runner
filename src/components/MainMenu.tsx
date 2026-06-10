import {
  COLOR,
  FONT,
  RADIUS,
  PrimaryButton,
  SecondaryButton,
  injectGlobalStyles,
} from "./design-system";
import { useEffect, useState } from "react";
import type { CSSProperties } from "react";

// ─── Props ────────────────────────────────────────────────────────────────────
interface MainMenuProps {
  onStart: () => void;
  onHangar: () => void;
  onProfile: () => void;
}

// ─── Ship SVG — angular hard-sci-fi cargo runner ──────────────────────────────
// Sharp geometry, panel lines, no organic curves — matches the design system aesthetic
// Drop-in replacement for ShipSVG in MainMenu.tsx
const ShipSVG = () => (
  <svg
    width="280"
    height="280"
    viewBox="0 0 190 160"
    fill="none"
    style={{
      filter:
        "drop-shadow(0 0 28px rgba(0,229,255,0.65)) drop-shadow(0 0 8px rgba(0,229,255,0.3))",
      animation: "bob 2.8s ease-in-out infinite",
    }}
  >
    <defs>
      <linearGradient id="bCore" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#0C2A3A" />
        <stop offset="100%" stopColor="#040C14" />
      </linearGradient>
      <linearGradient id="bFlameL" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#00E5FF" stopOpacity="1" />
        <stop offset="100%" stopColor="#00E5FF" stopOpacity="0" />
      </linearGradient>
      <linearGradient id="bFlameR" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#00E5FF" stopOpacity="1" />
        <stop offset="100%" stopColor="#00E5FF" stopOpacity="0" />
      </linearGradient>
      <radialGradient id="bGlowL" cx="50%" cy="0%">
        <stop offset="0%" stopColor="#00E5FF" stopOpacity="0.7" />
        <stop offset="100%" stopColor="#00E5FF" stopOpacity="0" />
      </radialGradient>
      <radialGradient id="bGlowR" cx="50%" cy="0%">
        <stop offset="0%" stopColor="#00E5FF" stopOpacity="0.7" />
        <stop offset="100%" stopColor="#00E5FF" stopOpacity="0" />
      </radialGradient>
    </defs>

    {/* Engine glows */}
    <ellipse
      cx="54"
      cy="132"
      rx="12"
      ry="5"
      fill="url(#bGlowL)"
      style={{ animation: "thrusterGlow 0.25s ease-in-out infinite" }}
    />
    <ellipse
      cx="136"
      cy="132"
      rx="12"
      ry="5"
      fill="url(#bGlowR)"
      style={{ animation: "thrusterGlow 0.28s 0.07s ease-in-out infinite" }}
    />

    {/* Left boom flame */}
    <polygon
      points="48,118 54,145 60,118"
      fill="url(#bFlameL)"
      style={{
        transformOrigin: "54px 128px",
        animation: "thrusterFlame 0.14s ease-in-out infinite",
      }}
    />
    {/* Right boom flame */}
    <polygon
      points="130,118 136,145 142,118"
      fill="url(#bFlameR)"
      style={{
        transformOrigin: "136px 128px",
        animation: "thrusterFlame 0.16s 0.06s ease-in-out infinite",
      }}
    />

    {/* Left boom strut */}
    <polygon
      points="62,60 42,60 34,120 64,120"
      fill="#081828"
      stroke="rgba(0,229,255,0.35)"
      strokeWidth="0.8"
    />
    <line
      x1="48"
      y1="75"
      x2="48"
      y2="108"
      stroke="rgba(0,229,255,0.12)"
      strokeWidth="0.5"
      strokeDasharray="3 3"
    />

    {/* Right boom strut */}
    <polygon
      points="128,60 148,60 156,120 126,120"
      fill="#081828"
      stroke="rgba(0,229,255,0.35)"
      strokeWidth="0.8"
    />
    <line
      x1="142"
      y1="75"
      x2="142"
      y2="108"
      stroke="rgba(0,229,255,0.12)"
      strokeWidth="0.5"
      strokeDasharray="3 3"
    />

    {/* Cross wing bar */}
    <polygon
      points="62,72 128,72 128,84 62,84"
      fill="#0A1828"
      stroke="rgba(0,229,255,0.25)"
      strokeWidth="0.7"
    />
    <rect
      x="68"
      y="75"
      width="8"
      height="2"
      rx="1"
      fill="#00E5FF"
      opacity="0.9"
    />
    <rect
      x="114"
      y="75"
      width="8"
      height="2"
      rx="1"
      fill="#00E5FF"
      opacity="0.9"
    />

    {/* Center core body */}
    <polygon
      points="95,8 116,30 114,96 95,102 76,96 74,30"
      fill="url(#bCore)"
      stroke="rgba(0,229,255,0.55)"
      strokeWidth="1.2"
    />
    <line
      x1="95"
      y1="8"
      x2="95"
      y2="102"
      stroke="rgba(0,229,255,0.12)"
      strokeWidth="0.7"
      strokeDasharray="4 3"
    />
    <line
      x1="76"
      y1="52"
      x2="114"
      y2="52"
      stroke="rgba(0,229,255,0.1)"
      strokeWidth="0.7"
    />
    <line
      x1="76"
      y1="72"
      x2="114"
      y2="72"
      stroke="rgba(0,229,255,0.08)"
      strokeWidth="0.6"
    />

    {/* Cockpit */}
    <polygon
      points="95,16 108,28 106,48 95,54 84,48 82,28"
      fill="#061420"
      stroke="rgba(160,240,255,0.5)"
      strokeWidth="1"
    />
    <polygon points="88,20 95,16 100,28 90,34" fill="rgba(200,240,255,0.28)" />

    {/* Nose */}
    <polygon points="95,8 99,15 91,15" fill="#00E5FF" opacity="0.95" />

    {/* Left engine housing */}
    <rect
      x="40"
      y="112"
      width="28"
      height="10"
      rx="3"
      fill="#040C18"
      stroke="rgba(0,229,255,0.4)"
      strokeWidth="0.8"
    />
    {/* Right engine housing */}
    <rect
      x="122"
      y="112"
      width="28"
      height="10"
      rx="3"
      fill="#040C18"
      stroke="rgba(0,229,255,0.4)"
      strokeWidth="0.8"
    />
  </svg>
);

// ─── Starfield ────────────────────────────────────────────────────────────────
const Starfield = () => {
  const stars: CSSProperties[] = Array.from({ length: 55 }, (_, i) => ({
    position: "absolute" as const,
    width: i % 5 === 0 ? "2px" : "1px",
    height: i % 5 === 0 ? "2px" : "1px",
    left: `${(Math.sin(i * 137.508) * 0.5 + 0.5) * 100}%`,
    top: `${(Math.cos(i * 97.3) * 0.5 + 0.5) * 100}%`,
    borderRadius: "50%",
    background:
      i % 7 === 0 ? COLOR.cyanSoft : i % 11 === 0 ? COLOR.cyan : "#ffffff",
    opacity: 0.12 + (i % 6) * 0.08,
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
      background: "linear-gradient(135deg, #1E2E48, #0C1420)",
      border: "1px solid rgba(0,229,255,0.1)",
      pointerEvents: "none",
    }}
  />
);

// ─── Auth button (Telegram / Wallet) — shared ghost style ────────────────────
function GhostButton({
  onClick,
  onMouseEnter,
  onMouseLeave,
  children,
  accent = "telegram",
}: {
  onClick?: () => void;
  onMouseEnter?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  onMouseLeave?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  children: React.ReactNode;
  accent?: "telegram" | "wallet";
}) {
  const [hovered, setHovered] = useState(false);
  const isTelegram = accent === "telegram";
  const borderBase = isTelegram ? "rgba(34,158,217,0.22)" : COLOR.borderPanel;
  const borderHover = isTelegram ? "rgba(34,158,217,0.55)" : COLOR.borderActive;
  const bgHover = isTelegram ? "rgba(34,158,217,0.14)" : "rgba(0,229,255,0.08)";
  const colorHover = isTelegram ? "#4FD1FF" : COLOR.cyan;

  return (
    <button
      onClick={onClick}
      onMouseEnter={(e) => {
        setHovered(true);
        onMouseEnter?.(e);
      }}
      onMouseLeave={(e) => {
        setHovered(false);
        onMouseLeave?.(e);
      }}
      style={{
        fontFamily: FONT.ui,
        fontWeight: 600,
        fontSize: 12,
        letterSpacing: "0.12em",
        textTransform: "uppercase",
        color: hovered ? colorHover : "rgba(255,255,255,0.45)",
        background: hovered ? bgHover : "rgba(17,24,39,0.5)",
        border: `1px solid ${hovered ? borderHover : borderBase}`,
        borderRadius: RADIUS.md,
        padding: "9px 0",
        width: "100%",
        cursor: "pointer",
        backdropFilter: "blur(8px)",
        transition: "all 0.15s ease",
        boxShadow: hovered
          ? `0 0 10px ${isTelegram ? "rgba(34,158,217,0.2)" : "rgba(0,229,255,0.15)"}`
          : "none",
      }}
    >
      {children}
    </button>
  );
}

// ─── Main Component ────────────────────────────────────────────────────────────
export default function MainMenu({
  onStart,
  onHangar,
  onProfile,
}: MainMenuProps) {
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
        background: `radial-gradient(ellipse at 50% 20%, #0D1830 0%, ${COLOR.bgDeep} 65%)`,
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
          width: 300,
          height: 300,
          top: -80,
          left: -120,
          borderRadius: "50%",
          background: "rgba(0,100,180,0.07)",
          filter: "blur(80px)",
          pointerEvents: "none",
          animation: "nebulaDrift 20s ease-in-out infinite",
        }}
      />
      <div
        style={{
          position: "absolute",
          width: 220,
          height: 220,
          top: "35%",
          right: -80,
          borderRadius: "50%",
          background: "rgba(0,200,255,0.05)",
          filter: "blur(70px)",
          pointerEvents: "none",
          animation: "nebulaDrift 26s 6s ease-in-out infinite",
        }}
      />

      {/* Ringed planet top-left */}
      <div
        style={{
          position: "absolute",
          top: 52,
          left: 20,
          width: 72,
          height: 72,
          borderRadius: "50%",
          background: "radial-gradient(circle at 35% 30%, #1A2A50, #080F20)",
          border: "1px solid rgba(0,229,255,0.1)",
          boxShadow: "0 0 16px rgba(0,80,200,0.18)",
          pointerEvents: "none",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            width: 116,
            height: 116,
            borderRadius: "50%",
            border: "1.5px solid rgba(0,229,255,0.15)",
            transform: "translate(-50%,-50%) rotateX(72deg)",
            animation: "planetRingOrbit 22s linear infinite",
          }}
        />
      </div>

      {/* Small planet bottom-right */}
      <div
        style={{
          position: "absolute",
          width: 52,
          height: 52,
          bottom: 220,
          right: 20,
          borderRadius: "50%",
          background: "radial-gradient(circle at 35% 30%, #1a3060, #0a0f20)",
          border: "1.5px solid rgba(0,229,255,0.12)",
          boxShadow: "0 0 16px rgba(0,80,200,0.18)",
          pointerEvents: "none",
        }}
      />

      {/* Decorative asteroids */}
      <AsteroidDeco
        size={36}
        top="28%"
        right="36px"
        rotate={15}
        opacity={0.45}
      />
      <AsteroidDeco
        size={22}
        top="45%"
        left="26px"
        rotate={-20}
        opacity={0.35}
      />
      <AsteroidDeco
        size={14}
        top="60%"
        right="72px"
        rotate={35}
        opacity={0.3}
      />

      {/* ── LOGO ── */}
      <div
        style={{
          position: "relative",
          zIndex: 5,
          marginTop: 88,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          animation: "fadeUp 0.6s ease both",
        }}
      >
        <div
          style={{
            width: 36,
            height: 2,
            background: COLOR.cyan,
            marginBottom: 10,
            boxShadow: GLOW_LINE,
          }}
        />
        <div
          style={{
            fontFamily: FONT.heading,
            fontWeight: 900,
            fontSize: 50,
            letterSpacing: "0.18em",
            lineHeight: 1,
            color: "#fff",
            textShadow: "0 0 28px rgba(0,229,255,0.4)",
            animation: "logoGlow 3s ease-in-out infinite",
          }}
        >
          SPACE
        </div>
        <div
          style={{
            fontFamily: FONT.heading,
            fontWeight: 700,
            fontSize: 29,
            letterSpacing: "0.26em",
            marginTop: -3,
            color: COLOR.cyan,
            textShadow: "0 0 18px rgba(0,229,255,0.8)",
          }}
        >
          CARGO
        </div>
        <div
          style={{
            fontFamily: FONT.ui,
            fontWeight: 600,
            fontSize: 20,
            letterSpacing: "0.45em",
            marginTop: 2,
            color: COLOR.amber,
            textShadow: "0 0 10px rgba(255,181,71,0.55)",
          }}
        >
          RUNNER
        </div>
        <div
          style={{
            width: 36,
            height: 2,
            background: COLOR.amber,
            marginTop: 10,
            boxShadow: GLOW_LINE_AMBER,
          }}
        />
      </div>

      {/* ── SHIP ── */}
      <div style={{ position: "relative", zIndex: 5, marginTop: 16 }}>
        <ShipSVG />
      </div>

      {/* ── BOTTOM PANEL ── */}
      {/* ── BOTTOM PANEL ── */}
      <div
        style={{
          position: "absolute",
          bottom: 32,
          left: 0,
          right: 0,
          padding: "0 28px",
          zIndex: 10,
          display: "flex",
          flexDirection: "column",
          gap: 8,
          animation: "fadeUp 0.7s 0.2s ease both",
          opacity: 0,
          animationFillMode: "forwards",
        }}
      >
        <div
          style={{
            fontFamily: FONT.ui,
            fontSize: 11,
            fontWeight: 600,
            color: COLOR.textMuted,
            textAlign: "center",
            letterSpacing: "0.3em",
            textTransform: "uppercase",
            marginBottom: 2,
          }}
        >
          COLLECT · DODGE · SURVIVE
        </div>

        {/* START */}
        <PrimaryButton
          onClick={onStart}
          pulse
          style={{ padding: "14px 0", width: "100%", fontSize: 18 }}
        >
          ▶ &nbsp;START MISSION
        </PrimaryButton>

        {/* HANGAR */}
        <SecondaryButton
          onClick={onHangar}
          style={{ padding: "12px 0", width: "100%", fontSize: 13 }}
        >
          ⬡ &nbsp;HANGAR
        </SecondaryButton>

        {/* PROFILE */}
        <SecondaryButton
          onClick={onProfile}
          style={{ padding: "12px 0", width: "100%", fontSize: 13 }}
        >
          ◈ &nbsp;PLAYER PROFILE
        </SecondaryButton>

        {/* Telegram + Wallet — side by side ghost row */}
        <div style={{ display: "flex", gap: 8, marginTop: 2 }}>
          <div style={{ flex: 1 }}>
            <GhostButton
              accent="telegram"
              onClick={() => {
                const username = prompt("Enter Telegram Username");
                if (username) {
                  localStorage.setItem("username", username);
                  localStorage.setItem("loginType", "telegram");
                  window.location.reload();
                }
              }}
            >
              📱 &nbsp;TELEGRAM
            </GhostButton>
          </div>
          <div style={{ flex: 1 }}>
            <GhostButton
              accent="wallet"
              onClick={async () => {
                try {
                  if (!(window as any).ethereum) {
                    alert("Install MetaMask");
                    return;
                  }

                  const accounts = await (window as any).ethereum.request({
                    method: "eth_requestAccounts",
                  });

                  localStorage.setItem("walletAddress", accounts[0]);

                  localStorage.setItem("loginType", "wallet");

                  localStorage.setItem(
                    "username",
                    accounts[0].slice(0, 6) + "..." + accounts[0].slice(-4),
                  );

                  alert("Wallet Connected");

                  window.location.reload();
                } catch (err) {
                  console.error(err);
                }
              }}
            >
              ◎ &nbsp;CONNECT WALLET
            </GhostButton>
          </div>
        </div>
      </div>
    </div>
  );
}

const GLOW_LINE = "0 0 8px rgba(0,229,255,0.8)";
const GLOW_LINE_AMBER = "0 0 8px rgba(255,181,71,0.8)";
