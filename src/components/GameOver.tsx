import { useEffect, useState } from "react";
import {
  COLOR,
  FONT,
  RADIUS,
  GLOW,
  BracketFrame,
  PrimaryButton,
  SecondaryButton,
  CLS,
  injectGlobalStyles,
} from "./design-system";

interface GameOverProps {
  score: number;
  coins: number;
  cargo: number;
  onRetry: () => void;
}

// ─── Wrecked Ship — angular, matches design system aesthetic ──────────────────
// ─── Wrecked Ship ─────────────────────────────────────────────────────────────
const WreckedShip = () => (
  <svg
    width="180"
    height="180"
    viewBox="0 0 190 160"
    fill="none"
    style={{
      filter:
        "drop-shadow(0 0 28px rgba(255,90,90,0.65)) drop-shadow(0 0 8px rgba(255,90,90,0.3))",
      animation: "shipFloat 2.2s ease-in-out infinite",
    }}
  >
    <defs>
      <linearGradient id="wCore" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#2A0808" />
        <stop offset="100%" stopColor="#0A0202" />
      </linearGradient>
      <radialGradient id="wDeadL" cx="50%" cy="0%">
        <stop offset="0%" stopColor="#FF5A5A" stopOpacity="0.25" />
        <stop offset="100%" stopColor="#FF5A5A" stopOpacity="0" />
      </radialGradient>
      <radialGradient id="wDeadR" cx="50%" cy="0%">
        <stop offset="0%" stopColor="#FF5A5A" stopOpacity="0.25" />
        <stop offset="100%" stopColor="#FF5A5A" stopOpacity="0" />
      </radialGradient>
    </defs>

    {/* Dead engine — faint red flicker, no real flame */}
    <ellipse
      cx="54"
      cy="128"
      rx="10"
      ry="4"
      fill="url(#wDeadL)"
      opacity="0.6"
      style={{ animation: "thrusterGlow 0.6s ease-in-out infinite" }}
    />
    <ellipse
      cx="136"
      cy="128"
      rx="10"
      ry="4"
      fill="url(#wDeadR)"
      opacity="0.4"
    />

    {/* Smoke wisps — thin faded polygons instead of flames */}
    <polygon points="50,118 54,132 58,118" fill="rgba(255,90,90,0.12)" />
    <polygon points="132,118 136,130 140,118" fill="rgba(255,90,90,0.08)" />

    {/* Left boom strut — bent/damaged */}
    <polygon
      points="62,60 42,60 36,120 64,120"
      fill="#1A0808"
      stroke="rgba(255,90,90,0.28)"
      strokeWidth="0.8"
    />
    {/* Damage slash on left boom */}
    <line
      x1="44"
      y1="72"
      x2="58"
      y2="88"
      stroke="rgba(255,90,90,0.55)"
      strokeWidth="1.2"
    />
    <line
      x1="44"
      y1="95"
      x2="54"
      y2="105"
      stroke="rgba(255,90,90,0.3)"
      strokeWidth="0.7"
    />

    {/* Right boom strut */}
    <polygon
      points="128,60 148,60 154,120 126,120"
      fill="#1A0808"
      stroke="rgba(255,90,90,0.28)"
      strokeWidth="0.8"
    />
    {/* Damage slash on right boom */}
    <line
      x1="146"
      y1="72"
      x2="132"
      y2="90"
      stroke="rgba(255,90,90,0.45)"
      strokeWidth="1"
    />

    {/* Cross wing bar — cracked center */}
    <polygon
      points="62,72 128,72 128,84 62,84"
      fill="#180808"
      stroke="rgba(255,90,90,0.2)"
      strokeWidth="0.7"
    />
    {/* Wing LEDs — dead/dim */}
    <rect
      x="68"
      y="75"
      width="8"
      height="2"
      rx="1"
      fill="#FF5A5A"
      opacity="0.25"
    />
    <rect
      x="114"
      y="75"
      width="8"
      height="2"
      rx="1"
      fill="#FF5A5A"
      opacity="0.15"
    />
    {/* Wing crack */}
    <line
      x1="90"
      y1="72"
      x2="95"
      y2="84"
      stroke="rgba(255,90,90,0.4)"
      strokeWidth="0.8"
    />

    {/* Center core body — battle damaged */}
    <polygon
      points="95,8 116,30 114,96 95,102 76,96 74,30"
      fill="url(#wCore)"
      stroke="rgba(255,90,90,0.45)"
      strokeWidth="1.2"
    />
    <line
      x1="95"
      y1="8"
      x2="95"
      y2="102"
      stroke="rgba(255,90,90,0.1)"
      strokeWidth="0.7"
      strokeDasharray="4 3"
    />
    <line
      x1="76"
      y1="52"
      x2="114"
      y2="52"
      stroke="rgba(255,90,90,0.08)"
      strokeWidth="0.7"
    />
    <line
      x1="76"
      y1="72"
      x2="114"
      y2="72"
      stroke="rgba(255,90,90,0.06)"
      strokeWidth="0.6"
    />

    {/* Hull cracks */}
    <line
      x1="88"
      y1="30"
      x2="100"
      y2="52"
      stroke="rgba(255,90,90,0.7)"
      strokeWidth="1.1"
    />
    <line
      x1="100"
      y1="28"
      x2="90"
      y2="48"
      stroke="rgba(255,90,90,0.4)"
      strokeWidth="0.7"
    />
    <line
      x1="82"
      y1="65"
      x2="92"
      y2="78"
      stroke="rgba(255,90,90,0.35)"
      strokeWidth="0.6"
    />
    <line
      x1="104"
      y1="70"
      x2="96"
      y2="82"
      stroke="rgba(255,90,90,0.3)"
      strokeWidth="0.6"
    />

    {/* Cockpit — cracked, dark */}
    <polygon
      points="95,16 108,28 106,48 95,54 84,48 82,28"
      fill="#0E0404"
      stroke="rgba(255,90,90,0.38)"
      strokeWidth="1"
    />
    {/* Cockpit cracks */}
    <line
      x1="90"
      y1="20"
      x2="102"
      y2="42"
      stroke="rgba(255,90,90,0.65)"
      strokeWidth="1"
    />
    <line
      x1="102"
      y1="22"
      x2="92"
      y2="40"
      stroke="rgba(255,90,90,0.3)"
      strokeWidth="0.6"
    />
    {/* Broken highlight shard */}
    <polygon points="88,20 95,16 98,26 90,30" fill="rgba(255,150,150,0.1)" />

    {/* Nose — snapped */}
    <polygon points="95,8 99,15 91,15" fill="#FF5A5A" opacity="0.4" />

    {/* Left engine housing — dead */}
    <rect
      x="40"
      y="112"
      width="28"
      height="10"
      rx="3"
      fill="#100404"
      stroke="rgba(255,90,90,0.3)"
      strokeWidth="0.8"
    />
    {/* Right engine housing */}
    <rect
      x="122"
      y="112"
      width="28"
      height="10"
      rx="3"
      fill="#100404"
      stroke="rgba(255,90,90,0.3)"
      strokeWidth="0.8"
    />

    {/* Debris bits floating off */}
    <polygon points="24,50 30,46 28,54" fill="rgba(255,90,90,0.3)" />
    <polygon points="158,62 164,58 163,66" fill="rgba(255,90,90,0.2)" />
    <rect
      x="108"
      y="36"
      width="5"
      height="5"
      rx="1"
      fill="rgba(255,90,90,0.2)"
      transform="rotate(25 110 38)"
    />
    <rect
      x="72"
      y="88"
      width="4"
      height="4"
      rx="1"
      fill="rgba(255,90,90,0.15)"
      transform="rotate(-15 74 90)"
    />
  </svg>
);

// ─── Compact stat row ─────────────────────────────────────────────────────────
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
        paddingBottom: last ? 0 : 9,
        marginBottom: last ? 0 : 9,
        borderBottom: last ? "none" : "1px solid rgba(255,255,255,0.06)",
      }}
    >
      <span
        style={{
          fontFamily: FONT.ui,
          fontWeight: 600,
          fontSize: 11,
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
          fontSize: 15,
          fontWeight: 700,
          color,
          textShadow: `0 0 8px ${color}55`,
        }}
      >
        {value}
      </span>
    </div>
  );
}

// ─── Compact leaderboard row ──────────────────────────────────────────────────
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
    2: "rgba(200,210,220,0.85)",
    3: "rgba(205,140,70,0.85)",
  };
  const rankColor = rankColors[rank] ?? COLOR.textMuted;
  const rankLabel = rank <= 3 ? ["#1", "#2", "#3"][rank - 1] : `#${rank}`;

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: 8,
        padding: "4px 0",
        borderBottom: "1px solid rgba(255,255,255,0.04)",
        background: isCurrentUser ? "rgba(0,229,255,0.04)" : "transparent",
      }}
    >
      <span
        style={{
          fontFamily: FONT.mono,
          fontWeight: 700,
          fontSize: 10,
          color: rankColor,
          minWidth: 20,
        }}
      >
        {rankLabel}
      </span>
      <span
        style={{
          fontFamily: FONT.ui,
          fontWeight: 600,
          fontSize: 13,
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
          fontSize: 12,
          color: rank === 1 ? COLOR.amber : "rgba(255,255,255,0.85)",
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
        background: "rgba(5,8,20,0.95)",
        backdropFilter: "blur(14px)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: "20px 20px 24px",
        overflowY: "auto",
      }}
    >
      {/* ── HEADER ── */}
      <div
        style={{
          textAlign: "center",
          marginBottom: 12,
          animation: "fadeUp 0.5s ease both",
        }}
      >
        <div
          style={{
            width: 42,
            height: 2,
            background: COLOR.red,
            margin: "0 auto 10px",
            boxShadow: "0 0 8px rgba(255,90,90,0.8)",
          }}
        />
        <h1
          style={{
            margin: 0,
            fontFamily: FONT.heading,
            fontWeight: 900,
            fontSize: 44,
            letterSpacing: "0.14em",
            color: COLOR.red,
            textShadow:
              "0 0 18px rgba(255,90,90,0.6), 0 0 44px rgba(255,90,90,0.3)",
            lineHeight: 1,
          }}
        >
          GAME OVER
        </h1>
        <div
          style={{
            fontFamily: FONT.ui,
            fontSize: 11,
            letterSpacing: "0.25em",
            color: COLOR.textMuted,
            marginTop: 5,
          }}
        >
          MISSION FAILED
        </div>
      </div>

      {/* ── SHIP ── */}
      <div
        style={{
          position: "relative",
          marginBottom: 14,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <div
          style={{
            position: "absolute",
            width: 140,
            height: 140,
            borderRadius: "50%",
            background:
              "radial-gradient(circle, rgba(255,90,90,0.18) 0%, transparent 70%)",
            filter: "blur(18px)",
          }}
        />
        <div style={{ transform: "scale(1.4) rotate(16deg)", zIndex: 2 }}>
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
          marginBottom: 10,
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
          marginBottom: 14,
          animation: "fadeUp 0.5s 0.2s ease both",
          opacity: 0,
          animationFillMode: "forwards",
        }}
      >
        {/* Section header */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 8,
            marginBottom: 8,
          }}
        >
          <div
            style={{ flex: 1, height: 1, background: "rgba(255,181,71,0.18)" }}
          />
          <span
            style={{
              fontFamily: FONT.mono,
              fontSize: 9,
              letterSpacing: "0.2em",
              color: COLOR.amber,
            }}
          >
            ◈ LEADERBOARD
          </span>
          <div
            style={{ flex: 1, height: 1, background: "rgba(255,181,71,0.18)" }}
          />
        </div>

        {leaderboard.length === 0 ? (
          <div
            style={{
              fontFamily: FONT.ui,
              color: COLOR.textMuted,
              textAlign: "center",
              padding: "8px 0",
              fontSize: 12,
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

      {/* ── BUTTONS — side by side ── */}
      <div
        style={{
          width: "100%",
          maxWidth: 380,
          display: "flex",
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
          style={{ padding: "13px 0", flex: 2, fontSize: 14 }}
        >
          ▶ &nbsp;PLAY AGAIN
        </PrimaryButton>
        <SecondaryButton style={{ padding: "13px 0", flex: 1, fontSize: 12 }}>
          ⬡ &nbsp;HANGAR
        </SecondaryButton>
      </div>

      {/* Tagline */}
      <div
        style={{
          marginTop: 14,
          fontFamily: FONT.ui,
          fontSize: 10,
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
  border: "1px solid rgba(255,90,90,0.18)",
  borderRadius: RADIUS.md,
  boxShadow:
    "0 6px 30px rgba(0,0,0,0.65), inset 0 1px 0 rgba(255,255,255,0.04)",
  padding: "14px 16px",
};
