import {
  COLOR,
  FONT,
  RADIUS,
  CLS,
  BracketFrame,
  PrimaryButton,
  injectGlobalStyles,
} from "../design-system";
import { useEffect } from "react";

interface PauseOverlayProps {
  score: number;
  coins: number;
  cargo: number;
  onResume: () => void;
}

export default function PauseOverlay({
  score,
  coins,
  cargo,
  onResume,
}: PauseOverlayProps) {
  useEffect(() => {
    injectGlobalStyles();
  }, []);

  const rows = [
    { label: "SCORE", value: score.toLocaleString(), color: "#fff" },
    { label: "COINS", value: coins.toLocaleString(), color: COLOR.amber },
    { label: "CARGO", value: `${cargo} crates`, color: COLOR.cyan },
  ];

  return (
    <div
      onClick={onResume}
      style={{
        position: "absolute",
        inset: 0,
        zIndex: 50,
        background: "rgba(7,12,28,0.88)",
        backdropFilter: "blur(10px)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        animation: "fadeIn 0.18s ease both",
      }}
    >
      {/* Prevent click-through from inner card closing immediately */}
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 0,
        }}
      >
        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: 22 }}>
          <div
            style={{
              width: 32,
              height: 2,
              background: COLOR.cyan,
              margin: "0 auto 12px",
              boxShadow: "0 0 8px rgba(0,229,255,0.8)",
            }}
          />
          <div
            style={{
              fontFamily: FONT.heading,
              fontWeight: 900,
              fontSize: 42,
              letterSpacing: "0.18em",
              color: "#fff",
              textShadow: "0 0 24px rgba(0,229,255,0.5)",
              lineHeight: 1,
            }}
          >
            PAUSED
          </div>
          <div
            style={{
              fontFamily: FONT.ui,
              fontWeight: 600,
              fontSize: 11,
              letterSpacing: "0.28em",
              color: COLOR.textMuted,
              textTransform: "uppercase",
              marginTop: 6,
            }}
          >
            TAP ANYWHERE TO RESUME
          </div>
        </div>

        {/* Stats */}
        <BracketFrame
          style={{
            background: "rgba(17,24,39,0.85)",
            backdropFilter: "blur(12px)",
            border: `1px solid ${COLOR.borderPanel}`,
            borderRadius: RADIUS.md,
            padding: "16px 28px",
            marginBottom: 20,
            minWidth: 220,
            boxShadow:
              "0 6px 30px rgba(0,0,0,0.6), inset 0 1px 0 rgba(255,255,255,0.04)",
          }}
        >
          {rows.map((row, i) => (
            <div
              key={row.label}
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                paddingBottom: i < rows.length - 1 ? 9 : 0,
                marginBottom: i < rows.length - 1 ? 9 : 0,
                borderBottom:
                  i < rows.length - 1
                    ? "1px solid rgba(255,255,255,0.06)"
                    : "none",
              }}
            >
              <span
                style={{
                  fontFamily: FONT.ui,
                  fontWeight: 600,
                  fontSize: 11,
                  letterSpacing: "0.15em",
                  color: COLOR.textMuted,
                  textTransform: "uppercase",
                }}
              >
                {row.label}
              </span>
              <span
                className={CLS.numReadout}
                style={{
                  fontFamily: FONT.mono,
                  fontSize: 16,
                  fontWeight: 700,
                  color: row.color,
                  marginLeft: 24,
                }}
              >
                {row.value}
              </span>
            </div>
          ))}
        </BracketFrame>

        {/* Resume button */}
        <PrimaryButton
          onClick={onResume}
          pulse
          style={{ padding: "13px 48px", fontSize: 15 }}
        >
          ▶ &nbsp;RESUME
        </PrimaryButton>
      </div>
    </div>
  );
}
