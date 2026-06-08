import React from "react";
import {
  COLOR,
  FONT,
  RADIUS,
  CLS,
  BracketFrame,
  SegmentedFuelBar,
  CoinDisplay,
} from "../design-system";

interface GameplayHUDProps {
  coins: number;
  lives: number;
  fuelPct: number;
  isLowFuel: boolean;
  fuelColor: string; // kept in props for backwards compat — SegmentedFuelBar derives its own color
  score: number;
  currentLevel: number;
  cargo: string;
  isPaused: boolean;
  onPause: () => void;
  FuelBolt: React.ComponentType;
  HeartSVG: React.ComponentType<{ filled: boolean }>;
  CrateSVG: React.ComponentType<{ size?: number }>;
}

// ─── Heart — redesigned as instrument indicator ───────────────────────────────
function HeartIndicator({ filled }: { filled: boolean }) {
  return (
    <svg width="20" height="18" viewBox="0 0 24 24">
      <path
        d="M12 21C12 21 3 14 3 8C3 5.24 5.24 3 8 3C9.74 3 11.27 3.93 12 5.28C12.73 3.93 14.26 3 16 3C18.76 3 21 5.24 21 8C21 14 12 21 12 21Z"
        fill={filled ? COLOR.red : "rgba(255,90,90,0.12)"}
        stroke={filled ? "#C03030" : "rgba(255,90,90,0.2)"}
        strokeWidth="1"
      />
    </svg>
  );
}

// ─── Cargo crate icon for HUD ─────────────────────────────────────────────────
function CrateIcon({ size = 22 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none">
      <rect
        x="4"
        y="8"
        width="40"
        height="32"
        rx="2"
        fill="#1B2540"
        stroke={COLOR.cyan}
        strokeWidth="1.2"
      />
      <rect x="4" y="8" width="40" height="7" rx="2" fill="#253450" />
      <rect x="4" y="33" width="40" height="7" rx="2" fill="#253450" />
      <line
        x1="24"
        y1="8"
        x2="24"
        y2="40"
        stroke="rgba(0,229,255,0.25)"
        strokeWidth="1"
      />
      <circle cx="8" cy="14" r="2" fill={COLOR.cyan} opacity="0.8" />
      <circle cx="40" cy="14" r="2" fill={COLOR.cyan} opacity="0.8" />
      <circle cx="8" cy="36" r="2" fill={COLOR.cyan} opacity="0.8" />
      <circle cx="40" cy="36" r="2" fill={COLOR.cyan} opacity="0.8" />
    </svg>
  );
}

// ─── Pause icon ───────────────────────────────────────────────────────────────
function PauseIcon({ isPaused }: { isPaused: boolean }) {
  if (isPaused) {
    return (
      <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
        <polygon points="3,1 13,7 3,13" fill="rgba(255,255,255,0.8)" />
      </svg>
    );
  }
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
      <rect
        x="2"
        y="1"
        width="3.5"
        height="12"
        rx="1"
        fill="rgba(255,255,255,0.8)"
      />
      <rect
        x="8.5"
        y="1"
        width="3.5"
        height="12"
        rx="1"
        fill="rgba(255,255,255,0.8)"
      />
    </svg>
  );
}

// ─── Main HUD ─────────────────────────────────────────────────────────────────
export default function GameplayHUD({
  coins,
  lives,
  fuelPct,
  score,
  currentLevel,
  cargo,
  isPaused,
  onPause,
}: GameplayHUDProps) {
  const scoreStr = String(score)
    .padStart(6, "0")
    .replace(/\B(?=(\d{3})+(?!\d))/g, ",");

  return (
    <>
      {/* ── TOP ROW: coins | fuel | lives ── */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          padding: "10px 12px 0",
          display: "flex",
          alignItems: "center",
          gap: 8,
          zIndex: 20,
        }}
      >
        {/* Coins */}
        <BracketFrame style={{ ...panelSm, flexShrink: 0 }}>
          <CoinDisplay value={coins} size="sm" />
        </BracketFrame>

        {/* Fuel bar */}
        <BracketFrame style={{ ...panelSm, flex: 1 }}>
          <div
            style={{
              fontFamily: FONT.ui,
              fontWeight: 600,
              fontSize: 9,
              letterSpacing: "0.18em",
              color: COLOR.textMuted,
              marginBottom: 4,
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <span>⚡ FUEL</span>
            <span
              style={{
                color:
                  fuelPct < 25
                    ? COLOR.red
                    : fuelPct < 50
                      ? COLOR.amber
                      : COLOR.textMuted,
              }}
            >
              {fuelPct}%
            </span>
          </div>
          <SegmentedFuelBar pct={fuelPct} segments={12} height={8} />
        </BracketFrame>

        {/* Lives */}
        <BracketFrame
          style={{
            ...panelSm,
            flexShrink: 0,
            display: "flex",
            gap: 4,
            alignItems: "center",
          }}
        >
          {Array.from({ length: 3 }, (_, i) => (
            <HeartIndicator key={i} filled={i < lives} />
          ))}
        </BracketFrame>
      </div>

      {/* ── SECOND ROW: score | level | pause ── */}
      <div
        style={{
          position: "absolute",
          top: 72,
          left: 0,
          right: 0,
          padding: "0 12px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          zIndex: 20,
        }}
      >
        {/* Score */}
        <BracketFrame style={panelSm}>
          <div
            style={{
              fontFamily: FONT.ui,
              fontWeight: 600,
              fontSize: 9,
              letterSpacing: "0.18em",
              color: COLOR.textMuted,
              textTransform: "uppercase",
              marginBottom: 3,
            }}
          >
            SCORE
          </div>
          <div
            className={CLS.numReadout}
            style={{
              fontFamily: FONT.mono,
              fontSize: 20,
              fontWeight: 700,
              color: "#fff",
              lineHeight: 1,
            }}
          >
            {scoreStr}
          </div>
        </BracketFrame>

        {/* Level — instrument dial style */}
        <div
          style={{
            padding: "6px 18px",
            border: `1px solid rgba(0,229,255,0.3)`,
            borderRadius: RADIUS.md,
            background: "rgba(0,229,255,0.06)",
            textAlign: "center",
            backdropFilter: "blur(8px)",
          }}
        >
          <div
            style={{
              fontFamily: FONT.ui,
              fontWeight: 600,
              fontSize: 9,
              letterSpacing: "0.18em",
              color: COLOR.textMuted,
              textTransform: "uppercase",
              marginBottom: 2,
            }}
          >
            LEVEL
          </div>
          <div
            className={CLS.numReadout}
            style={{
              fontFamily: FONT.mono,
              fontSize: 18,
              fontWeight: 700,
              color: COLOR.cyan,
              lineHeight: 1,
            }}
          >
            {String(currentLevel).padStart(2, "0")}
          </div>
        </div>

        {/* Pause button */}
        <button
          onClick={onPause}
          style={{
            width: 38,
            height: 38,
            borderRadius: RADIUS.md,
            border: `1px solid rgba(0,229,255,0.3)`,
            background: "rgba(17,24,39,0.85)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
            boxShadow:
              "inset 0 1px 0 rgba(255,255,255,0.06), 0 2px 0 rgba(0,0,0,0.4)",
            backdropFilter: "blur(8px)",
            transition: "border-color 0.15s, background 0.15s",
          }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLButtonElement).style.borderColor =
              COLOR.borderActive;
            (e.currentTarget as HTMLButtonElement).style.background =
              "rgba(0,229,255,0.1)";
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLButtonElement).style.borderColor =
              "rgba(0,229,255,0.3)";
            (e.currentTarget as HTMLButtonElement).style.background =
              "rgba(17,24,39,0.85)";
          }}
        >
          <PauseIcon isPaused={isPaused} />
        </button>
      </div>

      {/* ── BOTTOM ROW: cargo | distance ── */}
      <div
        style={{
          position: "absolute",
          bottom: 14,
          left: 0,
          right: 0,
          padding: "0 12px",
          display: "flex",
          justifyContent: "space-between",
          zIndex: 20,
        }}
      >
        {/* Cargo */}
        <BracketFrame
          style={{ ...panelSm, display: "flex", gap: 8, alignItems: "center" }}
        >
          <CrateIcon size={22} />
          <div>
            <div
              style={{
                fontFamily: FONT.ui,
                fontWeight: 600,
                fontSize: 9,
                letterSpacing: "0.18em",
                color: COLOR.textMuted,
                textTransform: "uppercase",
              }}
            >
              CARGO
            </div>
            <div
              className={CLS.numReadout}
              style={{
                fontFamily: FONT.mono,
                fontSize: 20,
                fontWeight: 700,
                color: "#fff",
                lineHeight: 1,
              }}
            >
              {cargo}
            </div>
          </div>
        </BracketFrame>

        {/* Distance */}
        <BracketFrame style={{ ...panelSm, textAlign: "right" }}>
          <div
            style={{
              fontFamily: FONT.ui,
              fontWeight: 600,
              fontSize: 9,
              letterSpacing: "0.18em",
              color: COLOR.textMuted,
              textTransform: "uppercase",
              marginBottom: 3,
            }}
          >
            DIST
          </div>
          <div
            className={CLS.numReadout}
            style={{
              fontFamily: FONT.mono,
              fontSize: 18,
              fontWeight: 700,
              color: "#fff",
              lineHeight: 1,
            }}
          >
            {(score / 100).toFixed(1)}
            <span
              style={{
                fontSize: 12,
                color: COLOR.textSecondary,
                marginLeft: 2,
              }}
            >
              km
            </span>
          </div>
        </BracketFrame>
      </div>
    </>
  );
}

// ─── Shared panel style for HUD modules ───────────────────────────────────────
const panelSm: React.CSSProperties = {
  background: "rgba(17,24,39,0.85)",
  backdropFilter: "blur(12px) saturate(1.3)",
  WebkitBackdropFilter: "blur(12px) saturate(1.3)",
  border: "1px solid rgba(0,229,255,0.18)",
  borderRadius: RADIUS.md,
  boxShadow: "0 4px 16px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.04)",
  padding: "8px 12px",
};
