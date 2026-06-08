import { useEffect, useState } from "react";
import {
  COLOR,
  FONT,
  RADIUS,
  CLS,
  BracketFrame,
  PrimaryButton,
  SecondaryButton,
  injectGlobalStyles,
} from "./design-system";

interface GameOverProps {
  score: number;
  coins: number;
  cargo: number;
  onRetry: () => void;
}

// ─── Wrecked ship SVG ─────────────────────────────────────────────────────────
const WreckedShip = () => (
  <svg
    width="100"
    height="124"
    viewBox="0 0 130 160"
    fill="none"
    style={{
      filter: "drop-shadow(0 0 20px rgba(255,90,90,0.5))",
      animation: "shipFloat 2.2s ease-in-out infinite",
    }}
  >
    {/* Smoke trails */}
    {[0, 1, 2, 3].map((i) => (
      <div
        key={i}
        style={{
          position: "absolute",
          top: 20 + i * 12,
          left: -20 - i * 8,
          width: 24 + i * 6,
          height: 24 + i * 6,
          borderRadius: "50%",
          background: "rgba(255,255,255,0.06)",
          filter: "blur(12px)",
          animation: `nebulaDrift ${4 + i}s ease-in-out infinite`,
        }}
      />
    ))}
    <path
      d="M62 100 L16 120 L21 132 L60 112 Z"
      fill="#142030"
      stroke="rgba(255,90,90,0.3)"
      strokeWidth="1.2"
    />
    <path
      d="M68 100 L114 120 L109 132 L70 112 Z"
      fill="#142030"
      stroke="rgba(255,90,90,0.3)"
      strokeWidth="1.2"
    />
    <rect
      x="18"
      y="118"
      width="16"
      height="5"
      rx="2.5"
      fill="rgba(255,90,90,0.4)"
    />
    <rect
      x="96"
      y="118"
      width="16"
      height="5"
      rx="2.5"
      fill="rgba(255,90,90,0.4)"
    />
    <path
      d="M65 8 C90 20 92 82 81 116 L49 116 C38 82 40 20 65 8Z"
      fill="url(#wreckedBody)"
      stroke="rgba(255,90,90,0.4)"
      strokeWidth="1.8"
    />
    <path d="M60 68 L70 68 L68 102 L62 102Z" fill="rgba(255,90,90,0.1)" />
    {/* Cracked cockpit */}
    <ellipse
      cx="65"
      cy="50"
      rx="14"
      ry="21"
      fill="rgba(255,90,90,0.15)"
      stroke="rgba(255,90,90,0.35)"
      strokeWidth="1.5"
    />
    <line
      x1="60"
      y1="38"
      x2="70"
      y2="58"
      stroke="rgba(255,90,90,0.5)"
      strokeWidth="1"
    />
    <line
      x1="68"
      y1="35"
      x2="63"
      y2="55"
      stroke="rgba(255,90,90,0.3)"
      strokeWidth="0.8"
    />
    <defs>
      <linearGradient id="wreckedBody" x1="0" y1="0" x2="1" y2="0">
        <stop offset="0%" stopColor="#1A0808" stopOpacity="0.95" />
        <stop offset="40%" stopColor="#2D1010" />
        <stop offset="100%" stopColor="#1A0808" stopOpacity="0.75" />
      </linearGradient>
    </defs>
  </svg>
);

// ─── Stat row ─────────────────────────────────────────────────────────────────
function StatRow({
  label,
  value,
  color,
  last = false,
}: {
  label: string;
  value: string;
  color: string;
  last?: boolean;
}) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        paddingBottom: last ? 0 : 12,
        marginBottom: last ? 0 : 12,
        borderBottom: last ? "none" : "1px solid rgba(255,255,255,0.06)",
      }}
    >
      <span
        style={{
          fontFamily: FONT.ui,
          fontWeight: 600,
          fontSize: 13,
          letterSpacing: "0.15em",
          color: COLOR.textSecondary,
          textTransform: "uppercase",
        }}
      >
        {label}
      </span>
      <span
        className={CLS.numReadout}
        style={{
          fontFamily: FONT.mono,
          fontSize: 18,
          fontWeight: 700,
          color,
          textShadow: `0 0 10px ${color}55`,
        }}
      >
        {value}
      </span>
    </div>
  );
}

// ─── Leaderboard entry ────────────────────────────────────────────────────────
function LeaderRow({
  rank,
  name,
  score,
  isCurrentUser,
}: {
  rank: number;
  name: string;
  score: number;
  isCurrentUser?: boolean;
}) {
  const rankColors: Record<number, string> = {
    1: COLOR.amber,
    2: "rgba(200,210,220,0.8)",
    3: "rgba(205,140,70,0.8)",
  };
  const rankColor = rankColors[rank] ?? COLOR.textMuted;
  const rankLabel = rank <= 3 ? ["#1", "#2", "#3"][rank - 1] : `#${rank}`;

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: 10,
        padding: "6px 0",
        borderBottom: "1px solid rgba(255,255,255,0.05)",
        background: isCurrentUser ? "rgba(0,229,255,0.04)" : "transparent",
      }}
    >
      <span
        style={{
          fontFamily: FONT.mono,
          fontWeight: 700,
          fontSize: 11,
          color: rankColor,
          minWidth: 24,
        }}
      >
        {rankLabel}
      </span>
      <span
        style={{
          fontFamily: FONT.ui,
          fontWeight: 600,
          fontSize: 14,
          color: isCurrentUser ? COLOR.cyan : "rgba(255,255,255,0.7)",
          flex: 1,
          overflow: "hidden",
          textOverflow: "ellipsis",
          whiteSpace: "nowrap",
        }}
      >
        {name}
      </span>
      <span
        className={CLS.numReadout}
        style={{
          fontFamily: FONT.mono,
          fontWeight: 700,
          fontSize: 14,
          color: rank === 1 ? COLOR.amber : "#fff",
        }}
      >
        {Number(score).toLocaleString()}
      </span>
    </div>
  );
}

// ─── Main component ───────────────────────────────────────────────────────────
export default function GameOver({
  score,
  coins,
  cargo,
  onRetry,
}: GameOverProps) {
  const [leaderboard, setLeaderboard] = useState<any[]>([]);

  useEffect(() => {
    injectGlobalStyles();
    fetch("https://space-cargo-runner.onrender.com/leaderboard")
      .then((res) => res.json())
      .then((data) => setLeaderboard(data.slice(0, 10)))
      .catch(console.error);
  }, []);

  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        zIndex: 1000,
        background: "rgba(5,8,20,0.94)",
        backdropFilter: "blur(14px)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: "28px 20px 32px",
        overflowY: "auto",
      }}
    >
      {/* ── HEADER ── */}
      <div
        style={{
          textAlign: "center",
          marginBottom: 20,
          animation: "fadeUp 0.5s ease both",
        }}
      >
        {/* Red accent line */}
        <div
          style={{
            width: 48,
            height: 2,
            background: COLOR.red,
            margin: "0 auto 14px",
            boxShadow: "0 0 8px rgba(255,90,90,0.8)",
          }}
        />
        <h1
          style={{
            margin: 0,
            fontFamily: "'Orbitron', sans-serif",
            fontWeight: 900,
            fontSize: 48,
            letterSpacing: "0.14em",
            color: COLOR.red,
            textShadow:
              "0 0 20px rgba(255,90,90,0.6), 0 0 50px rgba(255,90,90,0.3)",
            lineHeight: 1,
          }}
        >
          GAME OVER
        </h1>
        <div
          style={{
            fontFamily: FONT.ui,
            fontSize: 12,
            letterSpacing: "0.25em",
            color: COLOR.textMuted,
            marginTop: 6,
          }}
        >
          MISSION FAILED
        </div>
      </div>

      {/* ── SHIP ── */}
      <div
        style={{
          position: "relative",
          marginBottom: 24,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <div
          style={{
            position: "absolute",
            width: 160,
            height: 160,
            borderRadius: "50%",
            background:
              "radial-gradient(circle, rgba(255,90,90,0.2) 0%, transparent 70%)",
            filter: "blur(20px)",
          }}
        />
        <div style={{ transform: "scale(1.6) rotate(18deg)", zIndex: 2 }}>
          <WreckedShip />
        </div>
      </div>

      {/* ── STATS PANEL ── */}
      <BracketFrame
        accent="red"
        style={{
          ...panelBase,
          width: "100%",
          maxWidth: 380,
          marginBottom: 14,
          animation: "fadeUp 0.5s 0.1s ease both",
          opacity: 0,
          animationFillMode: "forwards",
        }}
      >
        <StatRow
          label="Score"
          value={Number(score ?? 0).toLocaleString()}
          color="#fff"
        />
        <StatRow label="Coins" value={String(coins ?? 0)} color={COLOR.amber} />
        <StatRow label="Cargo" value={String(cargo ?? 0)} color={COLOR.cyan} />
        <StatRow
          label="Distance"
          value={`${(score / 100).toFixed(1)} km`}
          color={COLOR.textSecondary}
          last
        />
      </BracketFrame>

      {/* ── LEADERBOARD ── */}
      <BracketFrame
        style={{
          ...panelBase,
          width: "100%",
          maxWidth: 380,
          marginBottom: 20,
          animation: "fadeUp 0.5s 0.2s ease both",
          opacity: 0,
          animationFillMode: "forwards",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 8,
            marginBottom: 12,
          }}
        >
          <div
            style={{ flex: 1, height: 1, background: "rgba(255,181,71,0.2)" }}
          />
          <span
            style={{
              fontFamily: FONT.mono,
              fontSize: 10,
              letterSpacing: "0.2em",
              color: COLOR.amber,
            }}
          >
            ◈ LEADERBOARD
          </span>
          <div
            style={{ flex: 1, height: 1, background: "rgba(255,181,71,0.2)" }}
          />
        </div>

        {leaderboard.length === 0 ? (
          <div
            style={{
              fontFamily: FONT.ui,
              color: COLOR.textMuted,
              textAlign: "center",
              padding: "12px 0",
            }}
          >
            Loading...
          </div>
        ) : (
          leaderboard.map((entry: any, index: number) => (
            <LeaderRow
              key={index}
              rank={index + 1}
              name={entry.user_id}
              score={entry.score}
            />
          ))
        )}
      </BracketFrame>

      {/* ── BUTTONS ── */}
      <div
        style={{
          width: "100%",
          maxWidth: 380,
          display: "flex",
          flexDirection: "column",
          gap: 10,
          animation: "fadeUp 0.5s 0.3s ease both",
          opacity: 0,
          animationFillMode: "forwards",
        }}
      >
        <PrimaryButton
          onClick={onRetry}
          amber
          pulse
          style={{ padding: "15px 0", width: "100%", fontSize: 16 }}
        >
          ▶ &nbsp;PLAY AGAIN
        </PrimaryButton>

        <SecondaryButton
          style={{ padding: "12px 0", width: "100%", fontSize: 12 }}
        >
          ⬡ &nbsp;HANGAR
        </SecondaryButton>
      </div>

      {/* Tagline */}
      <div
        style={{
          marginTop: 20,
          fontFamily: FONT.ui,
          fontSize: 11,
          letterSpacing: "0.3em",
          color: COLOR.textMuted,
          textTransform: "uppercase",
        }}
      >
        COLLECT · DODGE · SURVIVE
      </div>
    </div>
  );
}

const panelBase: React.CSSProperties = {
  background: "rgba(17,24,39,0.88)",
  backdropFilter: "blur(14px) saturate(1.3)",
  WebkitBackdropFilter: "blur(14px) saturate(1.3)",
  border: "1px solid rgba(255,90,90,0.2)",
  borderRadius: RADIUS.md,
  boxShadow: "0 8px 40px rgba(0,0,0,0.7), inset 0 1px 0 rgba(255,255,255,0.04)",
  padding: "20px",
};
