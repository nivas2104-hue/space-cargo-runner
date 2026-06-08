// ═══════════════════════════════════════════════════════════════════════════════
// SPACE CARGO RUNNER — DESIGN SYSTEM v1.0
// Drop this file in src/components/ (or src/). Import from everywhere.
// Never hardcode colors, fonts, or radii outside this file.
// ═══════════════════════════════════════════════════════════════════════════════

import React from "react";

// ─── Color Palette ────────────────────────────────────────────────────────────

export const COLOR = {
  bgDeep:   "#0A0F1E",
  bgMid:    "#111827",
  bgPanel:  "#1B2540",

  cyan:     "#00E5FF",
  cyanSoft: "#4FD1FF",
  cyanDim:  "rgba(0,229,255,0.18)",

  amber:    "#FFB547",
  amberGlow:"rgba(255,181,71,0.55)",

  red:      "#FF5A5A",
  redDim:   "rgba(255,90,90,0.22)",

  green:    "#00E5A0",
  greenDim: "rgba(0,229,160,0.18)",

  textPrimary:   "#FFFFFF",
  textSecondary: "rgba(255,255,255,0.5)",
  textMuted:     "rgba(255,255,255,0.25)",
  textAccent:    "#00E5FF",

  borderSubtle:  "rgba(255,255,255,0.07)",
  borderPanel:   "rgba(0,229,255,0.18)",
  borderActive:  "rgba(0,229,255,0.6)",
  borderAmber:   "rgba(255,181,71,0.4)",
  borderRed:     "rgba(255,90,90,0.4)",

  // Only for ship engine glow — do not use elsewhere
  thrusterPurple: "#b44fff",
} as const;

// ─── Typography ───────────────────────────────────────────────────────────────

export const FONT = {
  heading: "'Orbitron', sans-serif",
  ui:      "'Rajdhani', sans-serif",
  mono:    "'Orbitron', sans-serif",
} as const;

export const FONT_IMPORT =
  "https://fonts.googleapis.com/css2?family=Orbitron:wght@400;600;700;900&family=Rajdhani:wght@400;500;600;700&display=swap";

// ─── Shape ────────────────────────────────────────────────────────────────────

export const RADIUS = { none: 0, sm: 2, md: 4, lg: 8, xl: 12 } as const;

// ─── Glows ────────────────────────────────────────────────────────────────────

export const GLOW = {
  cyan:    "0 0 14px rgba(0,229,255,0.7), 0 0 30px rgba(0,229,255,0.3)",
  cyanSm:  "0 0 8px rgba(0,229,255,0.5)",
  amber:   "0 0 14px rgba(255,181,71,0.7), 0 0 30px rgba(255,181,71,0.3)",
  amberSm: "0 0 8px rgba(255,181,71,0.5)",
  red:     "0 0 14px rgba(255,90,90,0.7), 0 0 30px rgba(255,90,90,0.3)",
  panel:   "0 4px 24px rgba(0,0,0,0.6), inset 0 1px 0 rgba(255,255,255,0.04)",
} as const;

// ─── Panel styles ─────────────────────────────────────────────────────────────

export const PANEL_BASE: React.CSSProperties = {
  background:          "rgba(17,24,39,0.82)",
  backdropFilter:      "blur(12px) saturate(1.4)",
  WebkitBackdropFilter:"blur(12px) saturate(1.4)",
  border:              `1px solid ${COLOR.borderPanel}`,
  boxShadow:           GLOW.panel,
};

export const PANEL_ACTIVE: React.CSSProperties = {
  ...PANEL_BASE,
  border:    `1px solid ${COLOR.borderActive}`,
  boxShadow: `${GLOW.panel}, ${GLOW.cyanSm}`,
};

// ─── Button styles ────────────────────────────────────────────────────────────

export const BTN_PRIMARY: React.CSSProperties = {
  fontFamily:    FONT.heading,
  fontWeight:    700,
  letterSpacing: "0.12em",
  textTransform: "uppercase" as const,
  color:         COLOR.bgDeep,
  background:    `linear-gradient(180deg, ${COLOR.cyanSoft} 0%, ${COLOR.cyan} 40%, #009DB8 100%)`,
  border:        "none",
  borderRadius:  RADIUS.md,
  boxShadow:     "inset 0 1px 0 rgba(255,255,255,0.35), 0 4px 0 #006A80, 0 6px 16px rgba(0,229,255,0.25)",
  cursor:        "pointer",
  position:      "relative" as const,
  overflow:      "hidden" as const,
  transition:    "transform 0.06s ease, box-shadow 0.06s ease",
  userSelect:    "none" as const,
};

export const BTN_PRIMARY_PRESSED: React.CSSProperties = {
  transform:  "translateY(3px)",
  boxShadow:  "inset 0 1px 0 rgba(255,255,255,0.2), 0 1px 0 #006A80, 0 2px 8px rgba(0,229,255,0.15)",
};

export const BTN_SECONDARY: React.CSSProperties = {
  fontFamily:    FONT.heading,
  fontWeight:    600,
  letterSpacing: "0.1em",
  textTransform: "uppercase" as const,
  color:         COLOR.cyan,
  background:    "rgba(0,229,255,0.06)",
  border:        `1px solid ${COLOR.borderPanel}`,
  borderRadius:  RADIUS.md,
  boxShadow:     "inset 0 1px 0 rgba(0,229,255,0.08), 0 2px 0 rgba(0,0,0,0.5)",
  cursor:        "pointer",
  transition:    "background 0.15s ease, border-color 0.15s ease, box-shadow 0.15s ease",
  userSelect:    "none" as const,
};

export const BTN_SECONDARY_HOVER: React.CSSProperties = {
  background:  "rgba(0,229,255,0.12)",
  borderColor: COLOR.borderActive,
  boxShadow:   `inset 0 1px 0 rgba(0,229,255,0.12), 0 2px 0 rgba(0,0,0,0.5), ${GLOW.cyanSm}`,
};

export const BTN_AMBER: React.CSSProperties = {
  fontFamily:    FONT.heading,
  fontWeight:    700,
  letterSpacing: "0.12em",
  textTransform: "uppercase" as const,
  color:         "#1A0A00",
  background:    `linear-gradient(180deg, #FFD080 0%, ${COLOR.amber} 40%, #A06820 100%)`,
  border:        "none",
  borderRadius:  RADIUS.md,
  boxShadow:     "inset 0 1px 0 rgba(255,255,255,0.3), 0 4px 0 #8A5A00, 0 6px 16px rgba(255,181,71,0.25)",
  cursor:        "pointer",
  position:      "relative" as const,
  overflow:      "hidden" as const,
  transition:    "transform 0.06s ease, box-shadow 0.06s ease",
  userSelect:    "none" as const,
};

export const BTN_AMBER_PRESSED: React.CSSProperties = {
  transform:  "translateY(3px)",
  boxShadow:  "inset 0 1px 0 rgba(255,255,255,0.15), 0 1px 0 #8A5A00, 0 2px 8px rgba(255,181,71,0.15)",
};

// ─── CSS class names ──────────────────────────────────────────────────────────

export const CLS = {
  hudPanel:   "scr-hud-panel",
  scanlines:  "scr-scanlines",
  bracket:    "scr-bracket",
  numReadout: "scr-num-readout",
  fuelLow:    "scr-fuel-low",
} as const;

// ─── Global style injector ────────────────────────────────────────────────────
// Call once at app root. Idempotent.

export function injectGlobalStyles(): void {
  if (document.getElementById("scr-design-system")) return;
  const el = document.createElement("style");
  el.id = "scr-design-system";
  el.textContent = `
@import url('${FONT_IMPORT}');
*,*::before,*::after{box-sizing:border-box}

/* ── Keyframes ── */
@keyframes scrollStar  { from{transform:translateY(-10px)} to{transform:translateY(105vh)} }
@keyframes twinkle     { from{opacity:0.1} to{opacity:0.85} }
@keyframes nebulaDrift { 0%,100%{transform:translate(0,0) scale(1)} 33%{transform:translate(14px,-10px) scale(1.04)} 66%{transform:translate(-10px,12px) scale(0.97)} }
@keyframes warpLine    { from{transform:translateY(-100%);opacity:0.6} to{transform:translateY(110vh);opacity:0} }
@keyframes bob         { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-14px)} }
@keyframes shipFloat   { 0%,100%{transform:translateY(0px)} 50%{transform:translateY(-6px)} }
@keyframes thrusterGlow{ 0%,100%{opacity:0.6;transform:scaleX(1)} 50%{opacity:1;transform:scaleX(1.15)} }
@keyframes thrusterFlame{ 0%,100%{transform:scaleX(1) scaleY(1);opacity:0.9} 33%{transform:scaleX(0.85) scaleY(1.15);opacity:1} 66%{transform:scaleX(1.1) scaleY(0.9);opacity:0.75} }
@keyframes fadeUp      { from{opacity:0;transform:translateY(20px)} to{opacity:1;transform:translateY(0)} }
@keyframes fadeIn      { from{opacity:0} to{opacity:1} }
@keyframes slideIn     { from{opacity:0;transform:translateX(24px)} to{opacity:1;transform:translateX(0)} }
@keyframes logoGlow    { 0%,100%{filter:drop-shadow(0 0 16px rgba(0,229,255,0.7)) drop-shadow(0 0 40px rgba(0,229,255,0.3))} 50%{filter:drop-shadow(0 0 28px rgba(0,229,255,0.9)) drop-shadow(0 0 60px rgba(0,229,255,0.5))} }
@keyframes shimmer     { 0%{left:-100%} 60%,100%{left:160%} }
@keyframes pulseBtn    { 0%,100%{box-shadow:inset 0 1px 0 rgba(255,255,255,0.35),0 4px 0 #006A80,0 0 20px rgba(0,229,255,0.3)} 50%{box-shadow:inset 0 1px 0 rgba(255,255,255,0.35),0 4px 0 #006A80,0 0 40px rgba(0,229,255,0.6)} }
@keyframes pulseBtnAmber{ 0%,100%{box-shadow:inset 0 1px 0 rgba(255,255,255,0.25),0 4px 0 #8A5A00,0 0 20px rgba(255,181,71,0.3)} 50%{box-shadow:inset 0 1px 0 rgba(255,255,255,0.25),0 4px 0 #8A5A00,0 0 40px rgba(255,181,71,0.6)} }
@keyframes fuelLowPulse{ 0%,100%{opacity:1} 50%{opacity:0.3} }
@keyframes scorePopup  { 0%{transform:translateY(0);opacity:1} 100%{transform:translateY(-60px);opacity:0} }
@keyframes asteroidSpin{ from{transform:rotate(0deg)} to{transform:rotate(360deg)} }
@keyframes cargoGlow   { 0%,100%{filter:drop-shadow(0 0 6px rgba(0,229,255,0.5))} 50%{filter:drop-shadow(0 0 18px rgba(0,229,255,0.9))} }
@keyframes coinSpin    { from{transform:rotateY(0deg)} to{transform:rotateY(360deg)} }
@keyframes fuelPulse   { 0%,100%{filter:drop-shadow(0 0 6px rgba(0,229,255,0.5))} 50%{filter:drop-shadow(0 0 16px rgba(0,229,255,0.9))} }
@keyframes stageGlow   { 0%,100%{opacity:0.5} 50%{opacity:0.9} }
@keyframes heartBeat   { 0%,100%{transform:scale(1)} 50%{transform:scale(1.2)} }
@keyframes planetRingOrbit{ from{transform:translate(-50%,-50%) rotateX(72deg) rotateZ(0deg)} to{transform:translate(-50%,-50%) rotateX(72deg) rotateZ(360deg)} }

/* ── Utility classes ── */
.${CLS.hudPanel} {
  background:rgba(17,24,39,0.85);
  backdrop-filter:blur(12px) saturate(1.3);
  -webkit-backdrop-filter:blur(12px) saturate(1.3);
  border:1px solid rgba(0,229,255,0.18);
  box-shadow:0 4px 20px rgba(0,0,0,0.55),inset 0 1px 0 rgba(255,255,255,0.04),inset 0 0 12px rgba(0,229,255,0.03);
  border-radius:4px;
  position:relative;
}

.${CLS.scanlines}::after {
  content:'';position:absolute;inset:0;
  background:repeating-linear-gradient(0deg,transparent,transparent 3px,rgba(0,0,0,0.06) 3px,rgba(0,0,0,0.06) 4px);
  pointer-events:none;border-radius:inherit;z-index:1;
}

.${CLS.fuelLow} { animation:fuelLowPulse 0.65s ease-in-out infinite !important; }

.${CLS.numReadout} {
  font-family:'Orbitron',sans-serif;
  font-variant-numeric:tabular-nums;
  font-feature-settings:"tnum";
  letter-spacing:0.04em;
}

/* Corner brackets */
.${CLS.bracket} { position:relative; }
.scr-corner { position:absolute;width:10px;height:10px;pointer-events:none;z-index:2; }
.scr-corner-tl { top:-1px;left:-1px;border-top:2px solid rgba(0,229,255,0.75);border-left:2px solid rgba(0,229,255,0.75); }
.scr-corner-tr { top:-1px;right:-1px;border-top:2px solid rgba(0,229,255,0.75);border-right:2px solid rgba(0,229,255,0.75); }
.scr-corner-bl { bottom:-1px;left:-1px;border-bottom:2px solid rgba(0,229,255,0.75);border-left:2px solid rgba(0,229,255,0.75); }
.scr-corner-br { bottom:-1px;right:-1px;border-bottom:2px solid rgba(0,229,255,0.75);border-right:2px solid rgba(0,229,255,0.75); }
.scr-corner-amber.scr-corner-tl,.scr-corner-amber.scr-corner-tr,.scr-corner-amber.scr-corner-bl,.scr-corner-amber.scr-corner-br { border-color:rgba(255,181,71,0.75); }
.scr-corner-red.scr-corner-tl,.scr-corner-red.scr-corner-tr,.scr-corner-red.scr-corner-bl,.scr-corner-red.scr-corner-br { border-color:rgba(255,90,90,0.75); }

/* Legacy compatibility — keep old class working */
.scr-hud-glass {
  background:rgba(17,24,39,0.85);
  backdrop-filter:blur(12px);
  -webkit-backdrop-filter:blur(12px);
  border:1px solid rgba(0,229,255,0.18);
  border-radius:4px;
}
`;
  document.head.appendChild(el);
}

// ─── BracketFrame ─────────────────────────────────────────────────────────────

interface BracketFrameProps {
  children: React.ReactNode;
  style?: React.CSSProperties;
  className?: string;
  accent?: "cyan" | "amber" | "red";
}

export function BracketFrame({ children, style, className = "", accent = "cyan" }: BracketFrameProps) {
  const acls = accent === "amber" ? "scr-corner-amber" : accent === "red" ? "scr-corner-red" : "";
  return (
    <div className={`${CLS.bracket} ${className}`} style={style}>
      <span className={`scr-corner scr-corner-tl ${acls}`} />
      <span className={`scr-corner scr-corner-tr ${acls}`} />
      <span className={`scr-corner scr-corner-bl ${acls}`} />
      <span className={`scr-corner scr-corner-br ${acls}`} />
      {children}
    </div>
  );
}

// ─── SegmentedFuelBar ─────────────────────────────────────────────────────────

export function SegmentedFuelBar({ pct, segments = 12, height = 10 }: { pct: number; segments?: number; height?: number }) {
  const isLow = pct < 25;
  const isMid = pct < 50;
  const filled = Math.round((pct / 100) * segments);
  const fillColor = isLow ? COLOR.red : isMid ? COLOR.amber : COLOR.cyan;
  return (
    <div style={{ display: "flex", gap: 2, alignItems: "center", width: "100%" }}>
      {Array.from({ length: segments }, (_, i) => {
        const active = i < filled;
        return (
          <div
            key={i}
            className={isLow && active ? CLS.fuelLow : ""}
            style={{
              flex: 1, height, borderRadius: 2,
              background: active ? fillColor : "rgba(255,255,255,0.07)",
              boxShadow: active ? `0 0 6px ${fillColor}88` : "none",
              transition: "background 0.2s ease",
            }}
          />
        );
      })}
    </div>
  );
}

// ─── NumericReadout ───────────────────────────────────────────────────────────

export function NumericReadout({ value, label, size = 20, color = COLOR.textPrimary, labelColor = COLOR.textMuted, style }: {
  value: string; label?: string; size?: number; color?: string; labelColor?: string; style?: React.CSSProperties;
}) {
  return (
    <div style={{ textAlign: "center", ...style }}>
      {label && (
        <div style={{ fontFamily: FONT.ui, fontWeight: 600, fontSize: 10, letterSpacing: "0.15em", textTransform: "uppercase", color: labelColor, marginBottom: 3 }}>
          {label}
        </div>
      )}
      <div className={CLS.numReadout} style={{ fontFamily: FONT.mono, fontSize: size, fontWeight: 700, color, lineHeight: 1 }}>
        {value}
      </div>
    </div>
  );
}

// ─── PrimaryButton ────────────────────────────────────────────────────────────

export function PrimaryButton({ children, onClick, pulse = false, amber = false, style, disabled = false }: {
  children: React.ReactNode; onClick?: () => void; pulse?: boolean; amber?: boolean; style?: React.CSSProperties; disabled?: boolean;
}) {
  const [pressed, setPressed] = React.useState(false);
  const base = amber ? BTN_AMBER : BTN_PRIMARY;
  const pressedStyle = amber ? BTN_AMBER_PRESSED : BTN_PRIMARY_PRESSED;
  const pulseAnim = amber ? "pulseBtnAmber 2s ease-in-out infinite" : "pulseBtn 2s ease-in-out infinite";
  return (
    <button
      onClick={disabled ? undefined : onClick}
      onPointerDown={() => setPressed(true)}
      onPointerUp={() => setPressed(false)}
      onPointerLeave={() => setPressed(false)}
      disabled={disabled}
      style={{
        ...base,
        ...(pressed ? pressedStyle : {}),
        ...(pulse ? { animation: pulseAnim } : {}),
        opacity: disabled ? 0.4 : 1,
        cursor: disabled ? "not-allowed" : "pointer",
        ...style,
      }}
    >
      <span style={{ position: "absolute", top: 0, left: "-100%", width: "50%", height: "100%", background: "linear-gradient(90deg,transparent,rgba(255,255,255,0.18),transparent)", animation: "shimmer 3s ease-in-out infinite", pointerEvents: "none" }} />
      {children}
    </button>
  );
}

// ─── SecondaryButton ──────────────────────────────────────────────────────────

export function SecondaryButton({ children, onClick, style, active = false, disabled = false }: {
  children: React.ReactNode; onClick?: () => void; style?: React.CSSProperties; active?: boolean; disabled?: boolean;
}) {
  const [hovered, setHovered] = React.useState(false);
  return (
    <button
      onClick={disabled ? undefined : onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      disabled={disabled}
      style={{
        ...BTN_SECONDARY,
        ...(hovered || active ? BTN_SECONDARY_HOVER : {}),
        ...(active ? { color: COLOR.cyan, borderColor: COLOR.borderActive } : {}),
        opacity: disabled ? 0.4 : 1,
        cursor: disabled ? "not-allowed" : "pointer",
        ...style,
      }}
    >
      {children}
    </button>
  );
}

// ─── CoinDisplay ─────────────────────────────────────────────────────────────

export function CoinDisplay({ value, size = "md", style }: { value: number; size?: "sm" | "md" | "lg"; style?: React.CSSProperties }) {
  const sz = size === "sm" ? 14 : size === "lg" ? 22 : 17;
  const icon = size === "sm" ? 14 : size === "lg" ? 22 : 18;
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 6, ...style }}>
      <svg width={icon} height={icon} viewBox="0 0 18 18" fill="none">
        <polygon points="9,1 16,4.5 16,13.5 9,17 2,13.5 2,4.5" fill={COLOR.amber} stroke="#A06820" strokeWidth="1" />
        <polygon points="9,4 13,6.5 13,11.5 9,14 5,11.5 5,6.5" fill="#FFD080" opacity="0.7" />
        <text x="9" y="10.5" textAnchor="middle" fontSize="5" fontFamily="Orbitron" fontWeight="700" fill="#7A4A00">SC</text>
      </svg>
      <span className={CLS.numReadout} style={{ fontFamily: FONT.mono, fontWeight: 700, fontSize: sz, color: COLOR.amber, textShadow: `0 0 10px ${COLOR.amberGlow}` }}>
        {value.toLocaleString()}
      </span>
    </div>
  );
}

// ─── BackButton ───────────────────────────────────────────────────────────────

export function BackButton({ onClick }: { onClick: () => void }) {
  const [hovered, setHovered] = React.useState(false);
  return (
    <button onClick={onClick} onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}
      style={{ ...BTN_SECONDARY, ...(hovered ? BTN_SECONDARY_HOVER : {}), fontFamily: FONT.ui, fontWeight: 600, fontSize: 13, letterSpacing: "0.1em", padding: "7px 18px" }}>
      ← BACK
    </button>
  );
}