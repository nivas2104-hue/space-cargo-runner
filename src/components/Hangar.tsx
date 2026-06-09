import React, { useState, useEffect } from "react";
import {
  COLOR,
  FONT,
  RADIUS,
  BracketFrame,
  PrimaryButton,
  SecondaryButton,
  CoinDisplay,
  injectGlobalStyles,
} from "./design-system";

// ─── Types ────────────────────────────────────────────────────────────────────
interface HangarProps {
  coins: number;
  onBack: () => void;
  onShipSelect: (shipId: string) => void;
}
interface Ship {
  id: string;
  name: string;
  stars: number;
  spd: number;
  shd: number;
  cap: number;
  price: number;
  owned: boolean;
  color: string;
  accent: string;
  thruster: string;
}
interface Upgrade {
  id: string;
  name: string;
  desc: string;
  emoji: string;
  levels: number[];
  cur: number;
  iconBg: string;
  iconBorder: string;
}
interface Powerup {
  id: string;
  name: string;
  desc: string;
  emoji: string;
  price: number;
  qty: number;
  isNew: boolean;
  iconBg: string;
}

// ─── Data (unchanged) ─────────────────────────────────────────────────────────
const SHIPS: Ship[] = [
  {
    id: "viper",
    name: "VIPER MK-I",
    stars: 1,
    spd: 55,
    shd: 30,
    cap: 45,
    price: 0,
    owned: true,
    color: "#0D2040",
    accent: COLOR.cyan,
    thruster: COLOR.cyan,
  },
  {
    id: "falcon",
    name: "FALCON X",
    stars: 2,
    spd: 72,
    shd: 55,
    cap: 60,
    price: 800,
    owned: false,
    color: "#0D2040",
    accent: COLOR.cyanSoft,
    thruster: COLOR.cyanSoft,
  },
  {
    id: "storm",
    name: "STORM RAY",
    stars: 2,
    spd: 60,
    shd: 80,
    cap: 50,
    price: 1200,
    owned: false,
    color: "#201020",
    accent: "#FF6688",
    thruster: "#FF4466",
  },
  {
    id: "nebula",
    name: "NEBULA ACE",
    stars: 3,
    spd: 88,
    shd: 70,
    cap: 85,
    price: 2500,
    owned: false,
    color: "#1A1000",
    accent: COLOR.amber,
    thruster: "#FFD040",
  },
  {
    id: "phantom",
    name: "PHANTOM-9",
    stars: 3,
    spd: 95,
    shd: 90,
    cap: 90,
    price: 4000,
    owned: false,
    color: "#001A10",
    accent: COLOR.green,
    thruster: "#00FFCC",
  },
];

const UPGRADES: Upgrade[] = [
  {
    id: "engine",
    name: "Engine",
    desc: "Boost max speed",
    emoji: "🚀",
    levels: [0, 200, 400, 800],
    cur: 1,
    iconBg: "linear-gradient(135deg,#0A1A3A,#0D2A5A)",
    iconBorder: "rgba(0,229,255,0.3)",
  },
  {
    id: "shield",
    name: "Shield",
    desc: "Reduce crash damage",
    emoji: "🛡️",
    levels: [0, 250, 500, 1000],
    cur: 3,
    iconBg: "linear-gradient(135deg,#001A12,#003320)",
    iconBorder: "rgba(0,229,160,0.3)",
  },
  {
    id: "fuel",
    name: "Fuel Tank",
    desc: "Larger fuel capacity",
    emoji: "⚡",
    levels: [0, 180, 360, 720],
    cur: 0,
    iconBg: "linear-gradient(135deg,#1A1000,#2A1800)",
    iconBorder: "rgba(255,181,71,0.3)",
  },
  {
    id: "magnet",
    name: "Magnet",
    desc: "Auto-collect cargo",
    emoji: "🧲",
    levels: [0, 300, 600],
    cur: 2,
    iconBg: "linear-gradient(135deg,#1A0020,#2A0040)",
    iconBorder: "rgba(0,229,255,0.2)",
  },
];

const POWERUPS: Powerup[] = [
  {
    id: "shield_pu",
    name: "Shield Pack",
    desc: "3 shields per run",
    emoji: "🛡",
    price: 150,
    qty: 2,
    isNew: true,
    iconBg: "linear-gradient(135deg,#001A30,rgba(0,229,255,0.1))",
  },
  {
    id: "fuel_pu",
    name: "Fuel Boost",
    desc: "Full refuel mid-run",
    emoji: "⛽",
    price: 100,
    qty: 0,
    isNew: false,
    iconBg: "linear-gradient(135deg,#001A10,rgba(0,229,160,0.1))",
  },
  {
    id: "magnet_pu",
    name: "Magnet",
    desc: "60s auto-collect",
    emoji: "🧲",
    price: 200,
    qty: 1,
    isNew: true,
    iconBg: "linear-gradient(135deg,#100020,rgba(0,229,255,0.08))",
  },
  {
    id: "x2coins",
    name: "2× Coins",
    desc: "Double coins for run",
    emoji: "×2",
    price: 300,
    qty: 0,
    isNew: false,
    iconBg: "linear-gradient(135deg,#1A1000,rgba(255,181,71,0.1))",
  },
];

// ─── ShipDisplay SVG ──────────────────────────────────────────────────────────
const ShipDisplay = ({ ship, size = 100 }: { ship: Ship; size?: number }) => {
  const uid = ship.id;
  return (
    <svg
      width={size}
      height={size * 1.25}
      viewBox="0 0 130 160"
      fill="none"
      style={{
        filter: `drop-shadow(0 0 18px ${ship.accent}88) drop-shadow(0 0 6px ${ship.thruster}44)`,
        animation: "bob 2.6s ease-in-out infinite",
      }}
    >
      <ellipse
        cx="65"
        cy="132"
        rx="40"
        ry="20"
        fill={`url(#eg${uid})`}
        opacity="0.75"
      />
      <path d="M51 118 Q65 158 79 118" fill={`url(#fl${uid})`} />
      <path d="M42 106 Q37 122 44 118" fill={`url(#sf${uid})`} />
      <path d="M88 106 Q93 122 86 118" fill={`url(#sf${uid})`} />
      <path
        d="M62 100 L16 120 L21 132 L60 112 Z"
        fill={`url(#wl${uid})`}
        stroke={ship.accent}
        strokeWidth="1.3"
      />
      <path
        d="M68 100 L114 120 L109 132 L70 112 Z"
        fill={`url(#wr${uid})`}
        stroke={ship.accent}
        strokeWidth="1.3"
      />
      <rect
        x="18"
        y="118"
        width="16"
        height="5"
        rx="2.5"
        fill={ship.thruster}
        opacity="0.9"
      />
      <rect
        x="96"
        y="118"
        width="16"
        height="5"
        rx="2.5"
        fill={ship.thruster}
        opacity="0.9"
      />
      <line
        x1="54"
        y1="108"
        x2="24"
        y2="122"
        stroke={ship.accent}
        strokeWidth="1"
        opacity="0.4"
      />
      <line
        x1="76"
        y1="108"
        x2="106"
        y2="122"
        stroke={ship.accent}
        strokeWidth="1"
        opacity="0.4"
      />
      <path
        d="M65 8 C90 20 92 82 81 116 L49 116 C38 82 40 20 65 8Z"
        fill={`url(#bd${uid})`}
        stroke={ship.accent}
        strokeWidth="1.8"
      />
      {/* Panel lines */}
      <line
        x1="55"
        y1="55"
        x2="75"
        y2="55"
        stroke={`${ship.accent}22`}
        strokeWidth="0.8"
      />
      <path d="M60 68 L70 68 L68 102 L62 102Z" fill={`${ship.accent}22`} />
      <ellipse
        cx="65"
        cy="50"
        rx="14"
        ry="21"
        fill={`url(#cp${uid})`}
        stroke="rgba(255,255,255,0.5)"
        strokeWidth="1.5"
      />
      <ellipse
        cx="59"
        cy="43"
        rx="5"
        ry="7.5"
        fill="rgba(255,255,255,0.42)"
        transform="rotate(-10 59 43)"
      />
      <ellipse cx="65" cy="12" rx="5" ry="4" fill={COLOR.amber} opacity="0.9" />
      <defs>
        <radialGradient id={`eg${uid}`} cx="50%" cy="50%">
          <stop offset="0%" stopColor={ship.thruster} stopOpacity="0.9" />
          <stop offset="100%" stopColor={ship.thruster} stopOpacity="0" />
        </radialGradient>
        <linearGradient id={`fl${uid}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={ship.thruster} />
          <stop offset="55%" stopColor="#ff7700" stopOpacity="0.8" />
          <stop offset="100%" stopColor="transparent" />
        </linearGradient>
        <linearGradient id={`sf${uid}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={ship.thruster} stopOpacity="0.7" />
          <stop offset="100%" stopColor="transparent" />
        </linearGradient>
        <linearGradient id={`bd${uid}`} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor={ship.color} stopOpacity="0.95" />
          <stop offset="40%" stopColor={ship.accent} stopOpacity="0.6" />
          <stop offset="100%" stopColor={ship.color} stopOpacity="0.75" />
        </linearGradient>
        <linearGradient id={`wl${uid}`} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor={ship.color} stopOpacity="0.5" />
          <stop offset="100%" stopColor={ship.color} />
        </linearGradient>
        <linearGradient id={`wr${uid}`} x1="1" y1="0" x2="0" y2="0">
          <stop offset="0%" stopColor={ship.color} stopOpacity="0.5" />
          <stop offset="100%" stopColor={ship.color} />
        </linearGradient>
        <radialGradient id={`cp${uid}`} cx="35%" cy="35%">
          <stop offset="0%" stopColor="rgba(220,245,255,0.96)" />
          <stop offset="50%" stopColor={ship.accent} stopOpacity="0.7" />
          <stop offset="100%" stopColor="rgba(10,20,50,0.65)" />
        </radialGradient>
      </defs>
    </svg>
  );
};

// ─── Stat bar ─────────────────────────────────────────────────────────────────
const StatBar = ({
  label,
  value,
  color,
}: {
  label: string;
  value: number;
  color: string;
}) => (
  <div
    style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 7 }}
  >
    <div
      style={{
        fontFamily: FONT.ui,
        fontWeight: 600,
        fontSize: 10,
        letterSpacing: "0.15em",
        color: COLOR.textMuted,
        width: 52,
        textTransform: "uppercase" as const,
      }}
    >
      {label}
    </div>
    <div
      style={{
        flex: 1,
        height: 6,
        background: "rgba(255,255,255,0.07)",
        borderRadius: 2,
        overflow: "hidden",
      }}
    >
      <div
        style={{
          width: `${value}%`,
          height: "100%",
          background: color,
          borderRadius: 2,
          boxShadow: `0 0 6px ${color}88`,
          transition: "width 0.4s ease",
        }}
      />
    </div>
    <div
      style={{
        fontFamily: FONT.mono,
        fontSize: 10,
        color: COLOR.textSecondary,
        minWidth: 24,
        textAlign: "right" as const,
      }}
    >
      {value}
    </div>
  </div>
);

// ─── Toast ────────────────────────────────────────────────────────────────────
const Toast = ({ message }: { message: string }) => (
  <div
    style={{
      position: "fixed",
      bottom: 80,
      left: "50%",
      transform: "translateX(-50%)",
      background: "rgba(17,24,39,0.96)",
      border: `1px solid ${COLOR.borderActive}`,
      borderRadius: RADIUS.md,
      padding: "9px 22px",
      fontFamily: FONT.ui,
      fontSize: 13,
      fontWeight: 700,
      letterSpacing: "0.08em",
      color: "#fff",
      whiteSpace: "nowrap",
      zIndex: 99,
      boxShadow: `0 0 20px rgba(0,229,255,0.2)`,
      animation: "slideIn 0.25s ease",
    }}
  >
    {message}
  </div>
);

// ─── Upgrade / Powerup icon ───────────────────────────────────────────────────
const CardIcon = ({
  emoji,
  bg,
  border,
  isText = false,
}: {
  emoji: string;
  bg: string;
  border: string;
  isText?: boolean;
}) => (
  <div
    style={{
      width: 48,
      height: 48,
      borderRadius: RADIUS.md,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontSize: isText ? 16 : 22,
      fontFamily: isText ? FONT.heading : "inherit",
      fontWeight: isText ? 700 : undefined,
      color: isText ? COLOR.amber : "inherit",
      background: bg,
      border: `1px solid ${border}`,
      marginBottom: 4,
      boxShadow: `inset 0 1px 0 rgba(255,255,255,0.06)`,
    }}
  >
    {emoji}
  </div>
);

// ─── Main Component ────────────────────────────────────────────────────────────
export default function Hangar({
  coins: initialCoins,
  onBack,
  onShipSelect,
}: HangarProps) {
  const [tab, setTab] = useState<"ships" | "store">("ships");
  const [ships, setShips] = useState<Ship[]>(() => {
    const s = localStorage.getItem("ships");
    return s ? JSON.parse(s) : SHIPS;
  });
  const [upgrades, setUpgrades] = useState<Upgrade[]>(() => {
    const s = localStorage.getItem("upgrades");
    return s ? JSON.parse(s) : UPGRADES;
  });
  const [powerups, setPowerups] = useState<Powerup[]>(POWERUPS);
  const [selectedIdx, setSelectedIdx] = useState(0);
  const [activeIdx, setActiveIdx] = useState(() =>
    Number(localStorage.getItem("activeShipIdx") || 0),
  );
  const [coins, setCoins] = useState(() =>
    Number(localStorage.getItem("totalCoins") || initialCoins),
  );
  const [toast, setToast] = useState("");

  useEffect(() => {
    injectGlobalStyles();
  }, []);
  useEffect(() => {
    localStorage.setItem("ships", JSON.stringify(ships));
  }, [ships]);
  useEffect(() => {
    localStorage.setItem("upgrades", JSON.stringify(upgrades));
  }, [upgrades]);
  useEffect(() => {
    localStorage.setItem("activeShipIdx", activeIdx.toString());
  }, [activeIdx]);
  useEffect(() => {
    localStorage.setItem("totalCoins", coins.toString());
  }, [coins]);

  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(""), 2200);
  };
  const navigate = (dir: 1 | -1) =>
    setSelectedIdx((i) => (i + dir + ships.length) % ships.length);

  const handleBuy = () => {
    const s = ships[selectedIdx];
    if (s.owned || coins < s.price) return;
    const updated = ships.map((sh, i) =>
      i === selectedIdx ? { ...sh, owned: true } : sh,
    );
    setCoins((c) => c - s.price);
    setShips(updated);
    localStorage.setItem("ships", JSON.stringify(updated));
    showToast(`${s.name} unlocked!`);
  };

  const handleSelect = () => {
    if (!ships[selectedIdx].owned) return;
    setActiveIdx(selectedIdx);
    localStorage.setItem("activeShipIdx", selectedIdx.toString());
    localStorage.setItem("selectedShip", ships[selectedIdx].id);
    onShipSelect(ships[selectedIdx].id);
    showToast("Ship selected!");
  };

  const handleUpgrade = (u: Upgrade) => {
    const maxLv = u.levels.length - 1;
    if (u.cur >= maxLv) {
      showToast("Already maxed!");
      return;
    }
    const cost = u.levels[u.cur + 1];
    if (coins < cost) {
      showToast("Not enough credits!");
      return;
    }
    const updated = upgrades.map((x) =>
      x.id === u.id ? { ...x, cur: x.cur + 1 } : x,
    );
    setCoins((c) => c - cost);
    setUpgrades(updated);
    localStorage.setItem("upgrades", JSON.stringify(updated));
    showToast(`${u.name} → Lv${u.cur + 1}`);
  };

  const handleBuyPowerup = (p: Powerup) => {
    if (coins < p.price) {
      showToast("Not enough credits!");
      return;
    }
    setCoins((c) => c - p.price);
    setPowerups((prev) =>
      prev.map((x) => (x.id === p.id ? { ...x, qty: x.qty + 1 } : x)),
    );
    showToast(`${p.name} ×1 added`);
  };

  const selectedShip = ships[selectedIdx];
  const isActive = selectedIdx === activeIdx;

  return (
    <div
      style={{
        position: "relative",
        width: "100%",
        height: "100%",
        background: `radial-gradient(ellipse at 50% 25%, #0D1830 0%, ${COLOR.bgDeep} 65%)`,
        display: "flex",
        flexDirection: "column",
        overflow: "hidden",
      }}
    >
      {/* Starfield */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          pointerEvents: "none",
          overflow: "hidden",
        }}
      >
        {Array.from({ length: 45 }, (_, i) => (
          <div
            key={i}
            style={{
              position: "absolute",
              width: i % 5 === 0 ? 2 : 1,
              height: i % 5 === 0 ? 2 : 1,
              left: `${(Math.sin(i * 137.5) * 0.5 + 0.5) * 100}%`,
              top: `${(Math.cos(i * 97.3) * 0.5 + 0.5) * 100}%`,
              borderRadius: "50%",
              background:
                i % 7 === 0
                  ? COLOR.cyanSoft
                  : i % 11 === 0
                    ? COLOR.cyan
                    : "#fff",
              opacity: 0.1 + (i % 6) * 0.08,
              animation: `twinkle ${2 + (i % 4)}s ease-in-out ${(i % 10) * 0.3}s infinite alternate`,
            }}
          />
        ))}
      </div>

      {/* ── TOP BAR ── */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "52px 18px 12px",
          position: "relative",
          zIndex: 10,
          borderBottom: `1px solid ${COLOR.borderSubtle}`,
        }}
      >
        <BracketFrame
          style={{
            padding: "5px 12px 5px 8px",
            background: "rgba(17,24,39,0.8)",
            border: `1px solid ${COLOR.borderPanel}`,
            borderRadius: RADIUS.md,
          }}
        >
          <CoinDisplay value={coins} size="sm" />
        </BracketFrame>

        <div
          style={{
            fontFamily: FONT.heading,
            fontWeight: 700,
            fontSize: 16,
            letterSpacing: "0.2em",
            color: "#fff",
          }}
        >
          HANGAR
        </div>

        <SecondaryButton
          onClick={onBack}
          style={{ fontSize: 11, padding: "6px 14px" }}
        >
          ← BACK
        </SecondaryButton>
      </div>

      {/* ── TABS ── */}
      <div
        style={{
          display: "flex",
          borderBottom: `1px solid ${COLOR.borderSubtle}`,
          position: "relative",
          zIndex: 10,
        }}
      >
        {(["ships", "store"] as const).map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            style={{
              flex: 1,
              padding: "11px 0",
              fontFamily: FONT.heading,
              fontSize: 11,
              fontWeight: 700,
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              color: tab === t ? COLOR.cyan : COLOR.textMuted,
              background: tab === t ? "rgba(0,229,255,0.04)" : "transparent",
              border: "none",
              borderBottom:
                tab === t ? `2px solid ${COLOR.cyan}` : "2px solid transparent",
              cursor: "pointer",
              transition: "all 0.2s",
            }}
          >
            {t === "ships" ? "◈ SHIPS" : "⬡ UPGRADES"}
          </button>
        ))}
      </div>

      {/* ── SHIPS TAB ── */}
      {tab === "ships" && (
        <div
          style={{
            flex: 1,
            overflow: "hidden",
            display: "flex",
            flexDirection: "column",
          }}
        >
          {/* Stage */}
          <div
            style={{
              height: 230,
              position: "relative",
              background: `radial-gradient(ellipse at 50% 65%, ${selectedShip.accent}18, transparent 65%)`,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              overflow: "hidden",
            }}
          >
            {/* Stage floor glow */}
            <div
              style={{
                position: "absolute",
                bottom: 16,
                left: "50%",
                transform: "translateX(-50%)",
                width: 160,
                height: 20,
                background: `radial-gradient(ellipse, ${selectedShip.accent}44, transparent 70%)`,
                filter: "blur(8px)",
                animation: "stageGlow 2s ease-in-out infinite",
              }}
            />

            {/* Nav left */}
            <button
              onClick={() => navigate(-1)}
              style={{
                position: "absolute",
                left: 12,
                top: "50%",
                transform: "translateY(-50%)",
                width: 34,
                height: 34,
                borderRadius: RADIUS.md,
                background: "rgba(17,24,39,0.8)",
                border: `1px solid ${COLOR.borderPanel}`,
                color: COLOR.cyan,
                fontSize: 20,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
                zIndex: 5,
                boxShadow:
                  "inset 0 1px 0 rgba(255,255,255,0.05), 0 2px 0 rgba(0,0,0,0.4)",
              }}
            >
              ‹
            </button>

            {/* Nav right */}
            <button
              onClick={() => navigate(1)}
              style={{
                position: "absolute",
                right: 12,
                top: "50%",
                transform: "translateY(-50%)",
                width: 34,
                height: 34,
                borderRadius: RADIUS.md,
                background: "rgba(17,24,39,0.8)",
                border: `1px solid ${COLOR.borderPanel}`,
                color: COLOR.cyan,
                fontSize: 20,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
                zIndex: 5,
                boxShadow:
                  "inset 0 1px 0 rgba(255,255,255,0.05), 0 2px 0 rgba(0,0,0,0.4)",
              }}
            >
              ›
            </button>

            {/* Corner bracket stage frame */}
            <BracketFrame
              style={{
                padding: "14px 20px",
                background: "rgba(17,24,39,0.35)",
                border: `1px solid rgba(0,229,255,0.1)`,
                borderRadius: RADIUS.md,
              }}
            >
              <ShipDisplay ship={selectedShip} size={100} />
            </BracketFrame>
          </div>

          {/* Dot indicators */}
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              gap: 6,
              marginTop: 8,
            }}
          >
            {ships.map((_, i) => (
              <div
                key={i}
                onClick={() => setSelectedIdx(i)}
                style={{
                  width: i === selectedIdx ? 18 : 6,
                  height: 6,
                  borderRadius: i === selectedIdx ? 3 : "50%",
                  background:
                    i === selectedIdx ? COLOR.cyan : "rgba(255,255,255,0.15)",
                  boxShadow:
                    i === selectedIdx ? `0 0 6px ${COLOR.cyan}` : "none",
                  cursor: "pointer",
                  transition: "all 0.25s ease",
                }}
              />
            ))}
          </div>

          {/* Ship info */}
          <div style={{ padding: "10px 22px 0" }}>
            {/* Name + stars */}
            <div style={{ textAlign: "center", marginBottom: 10 }}>
              <div
                style={{
                  fontFamily: FONT.heading,
                  fontWeight: 700,
                  fontSize: 22,
                  letterSpacing: "0.14em",
                  color: "#fff",
                  textShadow: `0 0 16px ${selectedShip.accent}66`,
                  marginBottom: 4,
                }}
              >
                {selectedShip.name}
              </div>
              <div
                style={{ display: "flex", justifyContent: "center", gap: 4 }}
              >
                {[1, 2, 3].map((i) => (
                  <span
                    key={i}
                    style={{
                      fontSize: 14,
                      color:
                        i <= selectedShip.stars
                          ? COLOR.amber
                          : "rgba(255,255,255,0.1)",
                      textShadow:
                        i <= selectedShip.stars
                          ? `0 0 6px ${COLOR.amber}`
                          : "none",
                    }}
                  >
                    ★
                  </span>
                ))}
              </div>
            </div>

            <StatBar
              label="SPEED"
              value={selectedShip.spd}
              color={COLOR.cyanSoft}
            />
            <StatBar
              label="SHIELD"
              value={selectedShip.shd}
              color={COLOR.green}
            />
            <StatBar
              label="CARGO"
              value={selectedShip.cap}
              color={COLOR.amber}
            />
          </div>

          {/* Action buttons */}
          <div style={{ display: "flex", gap: 8, padding: "12px 18px 16px" }}>
            {selectedShip.owned ? (
              <PrimaryButton
                onClick={handleSelect}
                amber={isActive}
                style={{ flex: 1, padding: "13px 0", fontSize: 14 }}
              >
                {isActive ? "✓ ACTIVE SHIP" : "✓ SELECT SHIP"}
              </PrimaryButton>
            ) : (
              <>
                <SecondaryButton
                  disabled
                  style={{ flex: 0.6, padding: "13px 0", fontSize: 12 }}
                >
                  PREVIEW
                </SecondaryButton>
                <PrimaryButton
                  onClick={handleBuy}
                  amber={coins >= selectedShip.price}
                  disabled={coins < selectedShip.price}
                  style={{ flex: 1, padding: "13px 0", fontSize: 13 }}
                >
                  {coins >= selectedShip.price
                    ? `⬡ ${selectedShip.price.toLocaleString()}`
                    : `🔒 ${selectedShip.price.toLocaleString()}`}
                </PrimaryButton>
              </>
            )}
          </div>
        </div>
      )}

      {/* ── STORE TAB ── */}
      {tab === "store" && (
        <div
          style={{
            flex: 1,
            overflowY: "auto",
            padding: "16px 16px 32px",
            scrollbarWidth: "none",
          }}
        >
          {/* Upgrades */}
          <SectionHeader label="SHIP UPGRADES" />
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: 8,
              marginBottom: 20,
            }}
          >
            {upgrades.map((u) => {
              const maxLv = u.levels.length - 1;
              const isMax = u.cur >= maxLv;
              const nextCost = isMax ? 0 : u.levels[u.cur + 1];
              return (
                <UpgradeCard
                  key={u.id}
                  onClick={() => handleUpgrade(u)}
                  isMax={isMax}
                >
                  <CardIcon
                    emoji={u.emoji}
                    bg={u.iconBg}
                    border={u.iconBorder}
                  />
                  <div
                    style={{
                      fontFamily: FONT.ui,
                      fontWeight: 700,
                      fontSize: 13,
                      color: "#fff",
                      textAlign: "center",
                    }}
                  >
                    {u.name}
                  </div>
                  <div
                    style={{
                      fontFamily: FONT.ui,
                      fontSize: 10,
                      color: COLOR.textMuted,
                      textAlign: "center",
                    }}
                  >
                    {u.desc}
                  </div>
                  {/* Level pips */}
                  <div style={{ display: "flex", gap: 3, margin: "3px 0" }}>
                    {Array.from({ length: maxLv }, (_, i) => (
                      <div
                        key={i}
                        style={{
                          width: 9,
                          height: 9,
                          borderRadius: 2,
                          background:
                            i < u.cur ? COLOR.amber : "rgba(255,255,255,0.08)",
                          boxShadow:
                            i < u.cur ? `0 0 5px ${COLOR.amber}88` : "none",
                        }}
                      />
                    ))}
                  </div>
                  {isMax ? (
                    <div
                      style={{
                        fontFamily: FONT.mono,
                        fontSize: 11,
                        color: COLOR.green,
                        letterSpacing: "0.1em",
                      }}
                    >
                      MAX ✓
                    </div>
                  ) : (
                    <CoinDisplay value={nextCost} size="sm" />
                  )}
                </UpgradeCard>
              );
            })}
          </div>

          {/* Power-ups */}
          <SectionHeader label="POWER-UPS" />
          <div
            style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}
          >
            {powerups.map((p) => (
              <UpgradeCard
                key={p.id}
                onClick={() => handleBuyPowerup(p)}
                badge={p.isNew ? "NEW" : undefined}
              >
                <CardIcon
                  emoji={p.emoji}
                  bg={p.iconBg}
                  border="rgba(0,229,255,0.2)"
                  isText={p.emoji === "×2"}
                />
                <div
                  style={{
                    fontFamily: FONT.ui,
                    fontWeight: 700,
                    fontSize: 13,
                    color: "#fff",
                    textAlign: "center",
                  }}
                >
                  {p.name}
                </div>
                <div
                  style={{
                    fontFamily: FONT.ui,
                    fontSize: 10,
                    color: COLOR.textMuted,
                    textAlign: "center",
                  }}
                >
                  {p.desc}
                </div>
                {p.qty > 0 && (
                  <div
                    style={{
                      fontFamily: FONT.mono,
                      fontSize: 10,
                      color: COLOR.green,
                    }}
                  >
                    OWNED: {p.qty}
                  </div>
                )}
                <CoinDisplay value={p.price} size="sm" />
              </UpgradeCard>
            ))}
          </div>
        </div>
      )}

      {toast && <Toast message={toast} />}
    </div>
  );
}

// ─── Section header ───────────────────────────────────────────────────────────
function SectionHeader({ label }: { label: string }) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: 10,
        marginBottom: 10,
      }}
    >
      <div style={{ flex: 1, height: 1, background: "rgba(0,229,255,0.12)" }} />
      <span
        style={{
          fontFamily: FONT.heading,
          fontSize: 9,
          fontWeight: 700,
          letterSpacing: "0.2em",
          color: COLOR.textMuted,
        }}
      >
        {label}
      </span>
      <div style={{ flex: 1, height: 1, background: "rgba(0,229,255,0.12)" }} />
    </div>
  );
}

// ─── Upgrade/Powerup card ─────────────────────────────────────────────────────
function UpgradeCard({
  children,
  onClick,
  isMax,
  badge,
}: {
  children: React.ReactNode;
  onClick: () => void;
  isMax?: boolean;
  badge?: string;
}) {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: hovered ? "rgba(0,229,255,0.05)" : "rgba(255,255,255,0.02)",
        border: `1px solid ${hovered ? COLOR.borderPanel : COLOR.borderSubtle}`,
        borderRadius: RADIUS.md,
        padding: "14px 10px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 4,
        cursor: "pointer",
        position: "relative",
        transition: "border-color 0.2s, background 0.2s",
        boxShadow: isMax ? `inset 0 0 12px ${COLOR.greenDim}` : "none",
      }}
    >
      {badge && (
        <div
          style={{
            position: "absolute",
            top: -6,
            right: -6,
            background: COLOR.red,
            color: "#fff",
            fontFamily: FONT.ui,
            fontWeight: 700,
            fontSize: 9,
            letterSpacing: "0.1em",
            borderRadius: RADIUS.sm,
            padding: "2px 6px",
          }}
        >
          {badge}
        </div>
      )}
      {children}
    </div>
  );
}
