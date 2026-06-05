import React, { useState, useEffect } from "react";
import type { CSSProperties } from "react";
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

// ─── Data ─────────────────────────────────────────────────────────────────────
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
    color: "#7b00e0",
    accent: "#b44fff",
    thruster: "#b44fff",
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
    color: "#0055cc",
    accent: "#4fc3ff",
    thruster: "#4fc3ff",
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
    color: "#cc1144",
    accent: "#ff6688",
    thruster: "#ff4466",
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
    color: "#aa6600",
    accent: "#ffd84d",
    thruster: "#ffcc00",
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
    color: "#006644",
    accent: "#00ffaa",
    thruster: "#00ffcc",
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
    iconBg: "linear-gradient(135deg,#1133aa44,#4488ff22)",
    iconBorder: "#4488ff55",
  },
  {
    id: "shield",
    name: "Shield",
    desc: "Reduce crash damage",
    emoji: "🛡️",
    levels: [0, 250, 500, 1000],
    cur: 3,
    iconBg: "linear-gradient(135deg,#004433,#00ffaa22)",
    iconBorder: "#44ffaa55",
  },
  {
    id: "fuel",
    name: "Fuel Tank",
    desc: "Larger fuel capacity",
    emoji: "⚡",
    levels: [0, 180, 360, 720],
    cur: 0,
    iconBg: "linear-gradient(135deg,#443300,#ffcc0022)",
    iconBorder: "#ffcc0055",
  },
  {
    id: "magnet",
    name: "Magnet",
    desc: "Auto-collect cargo",
    emoji: "🧲",
    levels: [0, 300, 600],
    cur: 2,
    iconBg: "linear-gradient(135deg,#440033,#ff88cc22)",
    iconBorder: "#ff88cc55",
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
    iconBg: "linear-gradient(135deg,#002244,#4fc3ff22)",
  },
  {
    id: "fuel_pu",
    name: "Fuel Boost",
    desc: "Full refuel mid-run",
    emoji: "⛽",
    price: 100,
    qty: 0,
    isNew: false,
    iconBg: "linear-gradient(135deg,#003322,#00ffaa22)",
  },
  {
    id: "magnet_pu",
    name: "Magnet",
    desc: "60s auto-collect",
    emoji: "🧲",
    price: 200,
    qty: 1,
    isNew: true,
    iconBg: "linear-gradient(135deg,#220044,#b44fff22)",
  },
  {
    id: "x2coins",
    name: "2× Coins",
    desc: "Double coins for run",
    emoji: "×2",
    price: 300,
    qty: 0,
    isNew: false,
    iconBg: "linear-gradient(135deg,#443300,#ffd84d22)",
  },
];

// ─── CSS injection ─────────────────────────────────────────────────────────────
const injectStyles = () => {
  if (document.getElementById("scr-hangar-styles")) return;
  const el = document.createElement("style");
  el.id = "scr-hangar-styles";
  el.textContent = `
    @import url('https://fonts.googleapis.com/css2?family=Fredoka+One&family=Nunito:wght@700;800;900&display=swap');
    @keyframes bob        { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-12px)} }
    @keyframes twinkle    { from{opacity:0.15} to{opacity:0.85} }
    @keyframes shimmer    { 0%{left:-100%} 60%,100%{left:160%} }
    @keyframes stageGlow  { 0%,100%{opacity:0.55} 50%{opacity:0.9} }
    @keyframes slideIn    { from{opacity:0;transform:translateX(30px)} to{opacity:1;transform:translateX(0)} }
  `;
  document.head.appendChild(el);
};

// ─── Ship SVG (color-parametric) ──────────────────────────────────────────────
const ShipDisplay = ({ ship, size = 100 }: { ship: Ship; size?: number }) => {
  const uid = ship.id;
  return (
    <svg
      width={size}
      height={size * 1.25}
      viewBox="0 0 130 160"
      fill="none"
      style={{
        filter: `drop-shadow(0 0 22px ${ship.accent}99) drop-shadow(0 0 6px ${ship.thruster}66)`,
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
      <path
        d="M65 8 C90 20 92 82 81 116 L49 116 C38 82 40 20 65 8Z"
        fill={`url(#bd${uid})`}
        stroke={ship.accent}
        strokeWidth="1.8"
      />
      <path d="M60 68 L70 68 L68 102 L62 102Z" fill={`${ship.accent}33`} />
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
      <ellipse cx="65" cy="12" rx="5" ry="4" fill="#ffd84d" opacity="0.9" />
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
          <stop offset="40%" stopColor={ship.accent} />
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
          <stop offset="100%" stopColor="rgba(10,0,50,0.65)" />
        </radialGradient>
      </defs>
    </svg>
  );
};

// ─── Stat bar ─────────────────────────────────────────────────────────────────
const StatBar = ({
  label,
  value,
  gradient,
}: {
  label: string;
  value: number;
  gradient: string;
}) => (
  <div
    style={{ display: "flex", alignItems: "center", gap: 10, margin: "5px 0" }}
  >
    <div
      style={{
        fontSize: 11,
        fontWeight: 900,
        color: "rgba(255,255,255,0.42)",
        width: 54,
        letterSpacing: "0.8px",
      }}
    >
      {label}
    </div>
    <div
      style={{
        flex: 1,
        height: 10,
        background: "rgba(255,255,255,0.07)",
        borderRadius: 6,
        overflow: "hidden",
      }}
    >
      <div
        style={{
          width: `${value}%`,
          height: "100%",
          borderRadius: 6,
          background: gradient,
          transition: "width 0.4s ease",
        }}
      />
    </div>
  </div>
);

// ─── Neon pill (top bar) ───────────────────────────────────────────────────────
const Pill = ({
  children,
  blue,
}: {
  children: React.ReactNode;
  blue?: boolean;
}) => (
  <div
    style={{
      display: "flex",
      alignItems: "center",
      gap: 6,
      background: "rgba(7,0,28,0.75)",
      border: blue
        ? "1.5px solid rgba(79,195,255,0.55)"
        : "1.5px solid rgba(180,79,255,0.55)",
      borderRadius: 999,
      padding: "5px 14px 5px 7px",
      fontSize: 15,
      fontWeight: 900,
      color: "#fff",
      boxShadow: blue
        ? "0 0 18px #4fc3ff55, 0 0 40px #0077cc44"
        : "0 0 18px #b44fff55, 0 0 40px #7b00e044",
      backdropFilter: "blur(6px)",
    }}
  >
    {children}
  </div>
);

// ─── Toast ────────────────────────────────────────────────────────────────────
const Toast = ({ message }: { message: string }) => (
  <div
    style={{
      position: "fixed",
      bottom: 90,
      left: "50%",
      transform: "translateX(-50%)",
      background: "rgba(20,0,44,0.95)",
      border: "1.5px solid rgba(180,79,255,0.5)",
      borderRadius: 20,
      padding: "8px 22px",
      fontSize: 13,
      fontWeight: 800,
      color: "#fff",
      whiteSpace: "nowrap",
      zIndex: 99,
      boxShadow: "0 0 20px #b44fff55",
      animation: "slideIn 0.25s ease",
    }}
  >
    {message}
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
    const saved = localStorage.getItem("ships");

    return saved ? JSON.parse(saved) : SHIPS;
  });
  const [upgrades, setUpgrades] = useState<Upgrade[]>(() => {
    const saved = localStorage.getItem("upgrades");

    return saved ? JSON.parse(saved) : UPGRADES;
  });
  const [powerups, setPowerups] = useState<Powerup[]>(POWERUPS);
  const [selectedIdx, setSelectedIdx] = useState(0);
  const [activeIdx, setActiveIdx] = useState(() => {
    return Number(localStorage.getItem("activeShipIdx") || 0);
  });
  const [coins, setCoins] = useState(() => {
    return Number(localStorage.getItem("totalCoins") || initialCoins);
  });
  const [toast, setToast] = useState("");

  useEffect(() => {
    injectStyles();
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

  const navigate = (dir: 1 | -1) => {
    setSelectedIdx((i) => (i + dir + ships.length) % ships.length);
  };
  const handleBuy = () => {
    const s = ships[selectedIdx];

    if (s.owned || coins < s.price) return;

    const updatedShips = ships.map((sh, i) =>
      i === selectedIdx ? { ...sh, owned: true } : sh,
    );

    setCoins((c) => c - s.price);

    setShips(updatedShips);

    localStorage.setItem("ships", JSON.stringify(updatedShips));

    showToast(`${s.name} unlocked! ✨`);
  };

  const handleSelect = () => {
    if (!ships[selectedIdx].owned) return;

    setActiveIdx(selectedIdx);

    localStorage.setItem("activeShipIdx", selectedIdx.toString());

    localStorage.setItem("selectedShip", ships[selectedIdx].id);

    onShipSelect(ships[selectedIdx].id);

    showToast("Ship selected! 🚀");
  };

  const handleUpgrade = (u: Upgrade) => {
    const maxLv = u.levels.length - 1;

    if (u.cur >= maxLv) {
      showToast("Already maxed! ✓");
      return;
    }

    const cost = u.levels[u.cur + 1];

    if (coins < cost) {
      showToast("Not enough coins! 🪙");
      return;
    }

    const updatedUpgrades = upgrades.map((x) =>
      x.id === u.id ? { ...x, cur: x.cur + 1 } : x,
    );

    setCoins((c) => c - cost);

    setUpgrades(updatedUpgrades);

    localStorage.setItem("upgrades", JSON.stringify(updatedUpgrades));

    showToast(`${u.name} → Lv${u.cur + 1}! ⬆️`);
  };
  const handleBuyPowerup = (p: Powerup) => {
    if (coins < p.price) {
      showToast("Not enough coins! 🪙");
      return;
    }
    setCoins((c) => c - p.price);
    setPowerups((prev) =>
      prev.map((x) => (x.id === p.id ? { ...x, qty: x.qty + 1 } : x)),
    );
    showToast(`${p.name} ×1 added! ✨`);
  };

  const selectedShip = ships[selectedIdx];
  const isActive = selectedIdx === activeIdx;

  const cardStyle: CSSProperties = {
    background: "rgba(255,255,255,0.03)",
    border: "1.5px solid rgba(180,79,255,0.2)",
    borderRadius: 18,
    padding: "16px 12px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: 5,
    cursor: "pointer",
    position: "relative",
    transition: "border-color 0.2s, background 0.2s",
  };

  return (
    <div
      style={{
        position: "relative",
        width: "100%",
        height: "100%",
        background:
          "radial-gradient(ellipse at 50% 30%, #1a0044 0%, #07001c 65%)",
        fontFamily: "'Nunito', sans-serif",
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* Stars bg */}
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
                i % 7 === 0 ? "#b44fff" : i % 11 === 0 ? "#4fc3ff" : "#fff",
              opacity: 0.15 + (i % 6) * 0.1,
              animation: `twinkle ${2 + (i % 4)}s ease-in-out ${(i % 10) * 0.3}s infinite alternate`,
            }}
          />
        ))}
      </div>

      {/* Top bar */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "52px 20px 12px",
          position: "relative",
          zIndex: 10,
        }}
      >
        <Pill blue>
          <div
            style={{
              width: 22,
              height: 22,
              borderRadius: "50%",
              background: "radial-gradient(circle at 35% 30%,#ffe57a,#ff9500)",
              border: "2px solid #ffd84d",
              flexShrink: 0,
            }}
          />
          <span>{coins.toLocaleString()}</span>
        </Pill>
        <div
          style={{
            fontFamily: "'Fredoka One',cursive",
            fontSize: 20,
            color: "#b44fff",
            letterSpacing: 3,
            textShadow: "0 0 18px #b44fff, 0 0 40px #7b00e055",
          }}
        >
          HANGAR
        </div>
        <button
          onClick={onBack}
          style={{
            fontFamily: "'Fredoka One',cursive",
            fontSize: 14,
            color: "rgba(255,255,255,0.5)",
            background: "rgba(7,0,28,0.7)",
            border: "1.5px solid rgba(180,79,255,0.3)",
            borderRadius: 999,
            padding: "6px 16px",
            cursor: "pointer",
            boxShadow: "0 0 12px #b44fff33",
          }}
        >
          ← Back
        </button>
      </div>

      {/* Tabs */}
      <div
        style={{
          display: "flex",
          borderBottom: "2px solid rgba(180,79,255,0.2)",
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
              padding: "13px 0",
              fontFamily: "'Fredoka One',cursive",
              fontSize: 16,
              color: tab === t ? "#b44fff" : "rgba(255,255,255,0.32)",
              background: tab === t ? "rgba(180,79,255,0.08)" : "transparent",
              border: "none",
              borderBottom:
                tab === t ? "3px solid #b44fff" : "3px solid transparent",
              cursor: "pointer",
              transition: "all 0.2s",
            }}
          >
            {t === "ships" ? "🚀 Ships" : "🛒 Upgrades"}
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
              height: 250,
              position: "relative",
              background:
                "radial-gradient(ellipse at 50% 60%, rgba(100,40,180,0.22), transparent 70%)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              overflow: "hidden",
            }}
          >
            {/* Stage glow */}
            <div
              style={{
                position: "absolute",
                bottom: 20,
                left: "50%",
                transform: "translateX(-50%)",
                width: 180,
                height: 28,
                background: `radial-gradient(ellipse, ${selectedShip.accent}66, transparent 70%)`,
                filter: "blur(8px)",
                animation: "stageGlow 2s ease-in-out infinite",
              }}
            />
            {/* Nav buttons */}
            <button
              onClick={() => navigate(-1)}
              style={{
                position: "absolute",
                left: 14,
                top: "50%",
                transform: "translateY(-50%)",
                width: 38,
                height: 38,
                borderRadius: "50%",
                background: "rgba(7,0,28,0.72)",
                border: "1.5px solid rgba(180,79,255,0.5)",
                color: "#b44fff",
                fontSize: 20,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
                zIndex: 5,
                fontFamily: "'Fredoka One',cursive",
                boxShadow: "0 0 14px #b44fff44",
              }}
            >
              ‹
            </button>
            <button
              onClick={() => navigate(1)}
              style={{
                position: "absolute",
                right: 14,
                top: "50%",
                transform: "translateY(-50%)",
                width: 38,
                height: 38,
                borderRadius: "50%",
                background: "rgba(7,0,28,0.72)",
                border: "1.5px solid rgba(180,79,255,0.5)",
                color: "#b44fff",
                fontSize: 20,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
                zIndex: 5,
                fontFamily: "'Fredoka One',cursive",
                boxShadow: "0 0 14px #b44fff44",
              }}
            >
              ›
            </button>
            {/* Ship */}
            <ShipDisplay ship={selectedShip} size={110} />
          </div>

          {/* Dots */}
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              gap: 7,
              margin: "4px 0 0",
            }}
          >
            {ships.map((_, i) => (
              <div
                key={i}
                onClick={() => setSelectedIdx(i)}
                style={{
                  width: 8,
                  height: 8,
                  borderRadius: "50%",
                  cursor: "pointer",
                  background:
                    i === selectedIdx ? "#b44fff" : "rgba(255,255,255,0.15)",
                  boxShadow: i === selectedIdx ? "0 0 8px #b44fff" : "none",
                  transition: "all 0.2s",
                }}
              />
            ))}
          </div>

          {/* Ship info */}
          <div style={{ padding: "6px 24px 0" }}>
            <div
              style={{
                fontFamily: "'Fredoka One',cursive",
                fontSize: 28,
                color: "#fff",
                textAlign: "center",
                marginBottom: 2,
                textShadow: `0 2px 12px ${selectedShip.accent}88`,
              }}
            >
              {selectedShip.name}
            </div>
            <div style={{ textAlign: "center", marginBottom: 10 }}>
              {[1, 2, 3].map((i) => (
                <span
                  key={i}
                  style={{
                    fontSize: 18,
                    color:
                      i <= selectedShip.stars
                        ? "#ffd84d"
                        : "rgba(255,255,255,0.13)",
                    textShadow:
                      i <= selectedShip.stars ? "0 0 8px #ffd84d" : "none",
                  }}
                >
                  ★
                </span>
              ))}
            </div>
            <StatBar
              label="SPEED"
              value={selectedShip.spd}
              gradient="linear-gradient(90deg,#4488ff,#88ccff)"
            />
            <StatBar
              label="SHIELD"
              value={selectedShip.shd}
              gradient="linear-gradient(90deg,#44ffaa,#88ffcc)"
            />
            <StatBar
              label="CARGO"
              value={selectedShip.cap}
              gradient="linear-gradient(90deg,#ffaa00,#ffdd44)"
            />
          </div>

          {/* Buttons */}
          <div style={{ display: "flex", gap: 10, padding: "14px 20px 0" }}>
            {selectedShip.owned ? (
              <button
                onClick={handleSelect}
                style={{
                  flex: 1,
                  fontFamily: "'Fredoka One',cursive",
                  fontSize: 19,
                  color: "#fff",
                  border: "none",
                  borderRadius: 999,
                  padding: "13px 0",
                  cursor: "pointer",
                  background: isActive
                    ? "linear-gradient(180deg,#44cc88,#228855)"
                    : "linear-gradient(180deg,#c966ff,#6600cc)",
                  boxShadow: isActive
                    ? "0 5px 0 #115533"
                    : "0 5px 0 #3d007a, 0 0 18px #b44fff55",
                  transition: "all 0.1s",
                }}
              >
                {isActive ? "✓ ACTIVE" : "✓ SELECT"}
              </button>
            ) : (
              <>
                <button
                  style={{
                    flex: 0.55,
                    fontFamily: "'Fredoka One',cursive",
                    fontSize: 16,
                    color: "rgba(255,255,255,0.5)",
                    border: "1.5px solid rgba(180,79,255,0.3)",
                    borderRadius: 999,
                    padding: "13px 0",
                    cursor: "default",
                    background: "rgba(7,0,28,0.6)",
                  }}
                >
                  PREVIEW
                </button>
                <button
                  onClick={handleBuy}
                  style={{
                    flex: 1,
                    fontFamily: "'Fredoka One',cursive",
                    fontSize: 18,
                    color:
                      coins >= selectedShip.price
                        ? "#3a1a00"
                        : "rgba(255,255,255,0.35)",
                    border: "none",
                    borderRadius: 999,
                    padding: "13px 0",
                    cursor: coins >= selectedShip.price ? "pointer" : "default",
                    background:
                      coins >= selectedShip.price
                        ? "linear-gradient(180deg,#ffd84d,#ff8c00)"
                        : "linear-gradient(180deg,#555,#333)",
                    boxShadow:
                      coins >= selectedShip.price
                        ? "0 5px 0 #a84f00, 0 0 14px #ffd84d55"
                        : "0 5px 0 #222",
                  }}
                >
                  {coins >= selectedShip.price
                    ? `🪙 ${selectedShip.price.toLocaleString()}`
                    : `🔒 ${selectedShip.price.toLocaleString()}`}
                </button>
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
            padding: "14px 18px 30px",
            scrollbarWidth: "none",
          }}
        >
          {/* Upgrades */}
          <div
            style={{
              fontFamily: "'Fredoka One',cursive",
              fontSize: 16,
              color: "#b44fff",
              letterSpacing: 1.5,
              marginBottom: 10,
              paddingLeft: 2,
              textShadow: "0 0 14px #b44fff",
            }}
          >
            ⚙️ SHIP UPGRADES
          </div>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: 10,
              marginBottom: 22,
            }}
          >
            {upgrades.map((u) => {
              const maxLv = u.levels.length - 1;
              const isMax = u.cur >= maxLv;
              const nextCost = isMax ? 0 : u.levels[u.cur + 1];
              return (
                <div
                  key={u.id}
                  onClick={() => handleUpgrade(u)}
                  style={{
                    ...cardStyle,
                    borderColor: isMax
                      ? "rgba(0,255,170,0.35)"
                      : "rgba(180,79,255,0.2)",
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLDivElement).style.borderColor =
                      isMax ? "rgba(0,255,170,0.6)" : "rgba(180,79,255,0.5)";
                    (e.currentTarget as HTMLDivElement).style.background =
                      "rgba(180,79,255,0.06)";
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLDivElement).style.borderColor =
                      isMax ? "rgba(0,255,170,0.35)" : "rgba(180,79,255,0.2)";
                    (e.currentTarget as HTMLDivElement).style.background =
                      "rgba(255,255,255,0.03)";
                  }}
                >
                  <div
                    style={{
                      width: 54,
                      height: 54,
                      borderRadius: 14,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: 26,
                      background: u.iconBg,
                      border: `1.5px solid ${u.iconBorder}`,
                      marginBottom: 2,
                    }}
                  >
                    {u.emoji}
                  </div>
                  <div
                    style={{
                      fontSize: 13,
                      fontWeight: 900,
                      color: "#fff",
                      textAlign: "center",
                      lineHeight: 1.2,
                    }}
                  >
                    {u.name}
                  </div>
                  <div
                    style={{
                      fontSize: 10,
                      fontWeight: 800,
                      color: "rgba(255,255,255,0.38)",
                      textAlign: "center",
                    }}
                  >
                    {u.desc}
                  </div>
                  <div style={{ display: "flex", gap: 3, margin: "2px 0" }}>
                    {Array.from({ length: maxLv }, (_, i) => (
                      <div
                        key={i}
                        style={{
                          width: 10,
                          height: 10,
                          borderRadius: "50%",
                          background:
                            i < u.cur ? "#ffd84d" : "rgba(255,255,255,0.08)",
                          boxShadow: i < u.cur ? "0 0 6px #ffd84d" : "none",
                        }}
                      />
                    ))}
                  </div>
                  {isMax ? (
                    <div
                      style={{
                        fontFamily: "'Fredoka One',cursive",
                        fontSize: 12,
                        color: "#00ffaa",
                        letterSpacing: 1,
                      }}
                    >
                      MAX ✓
                    </div>
                  ) : (
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: 4,
                        fontSize: 13,
                        fontWeight: 900,
                        color: "#ffd84d",
                      }}
                    >
                      <div
                        style={{
                          width: 14,
                          height: 14,
                          borderRadius: "50%",
                          background:
                            "radial-gradient(circle at 35% 30%,#ffe57a,#ff9500)",
                          border: "1.5px solid #ffd84d",
                          flexShrink: 0,
                        }}
                      />
                      {nextCost}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Power-ups */}
          <div
            style={{
              fontFamily: "'Fredoka One',cursive",
              fontSize: 16,
              color: "#b44fff",
              letterSpacing: 1.5,
              marginBottom: 10,
              paddingLeft: 2,
              textShadow: "0 0 14px #b44fff",
            }}
          >
            ✨ POWER-UPS
          </div>
          <div
            style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}
          >
            {powerups.map((p) => (
              <div
                key={p.id}
                onClick={() => handleBuyPowerup(p)}
                style={cardStyle}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLDivElement).style.borderColor =
                    "rgba(180,79,255,0.5)";
                  (e.currentTarget as HTMLDivElement).style.background =
                    "rgba(180,79,255,0.06)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLDivElement).style.borderColor =
                    "rgba(180,79,255,0.2)";
                  (e.currentTarget as HTMLDivElement).style.background =
                    "rgba(255,255,255,0.03)";
                }}
              >
                {p.isNew && (
                  <div
                    style={{
                      position: "absolute",
                      top: -7,
                      right: -7,
                      background: "linear-gradient(135deg,#ff4477,#cc1144)",
                      color: "#fff",
                      fontSize: 10,
                      fontWeight: 900,
                      borderRadius: 10,
                      padding: "2px 7px",
                      letterSpacing: "0.5px",
                    }}
                  >
                    NEW
                  </div>
                )}
                <div
                  style={{
                    width: 54,
                    height: 54,
                    borderRadius: 14,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: p.emoji === "×2" ? 20 : 26,
                    fontFamily: "'Fredoka One',cursive",
                    color: "#ffd84d",
                    background: p.iconBg,
                    border: "1.5px solid rgba(79,195,255,0.35)",
                    marginBottom: 2,
                  }}
                >
                  {p.emoji}
                </div>
                <div
                  style={{
                    fontSize: 13,
                    fontWeight: 900,
                    color: "#fff",
                    textAlign: "center",
                    lineHeight: 1.2,
                  }}
                >
                  {p.name}
                </div>
                <div
                  style={{
                    fontSize: 10,
                    fontWeight: 800,
                    color: "rgba(255,255,255,0.38)",
                    textAlign: "center",
                  }}
                >
                  {p.desc}
                </div>
                {p.qty > 0 && (
                  <div
                    style={{ fontSize: 11, fontWeight: 900, color: "#00ffaa" }}
                  >
                    Owned: {p.qty}
                  </div>
                )}
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 4,
                    fontSize: 13,
                    fontWeight: 900,
                    color: "#ffd84d",
                  }}
                >
                  <div
                    style={{
                      width: 14,
                      height: 14,
                      borderRadius: "50%",
                      background:
                        "radial-gradient(circle at 35% 30%,#ffe57a,#ff9500)",
                      border: "1.5px solid #ffd84d",
                      flexShrink: 0,
                    }}
                  />
                  {p.price}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Toast */}
      {toast && <Toast message={toast} />}
    </div>
  );
}
