import { useState, useEffect } from "react";
import {
  COLOR,
  FONT,
  RADIUS,
  PrimaryButton,
  SecondaryButton,
  injectGlobalStyles,
} from "./design-system";
import ShipSVG from "./ShipSVG";

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

// ─── Data (unchanged) ────────────────────────────────────────────────────────
const SHIPS: Ship[] = [
  {
    id: "phantom",
    name: "PHANTOM WEDGE",
    stars: 1,
    spd: 55,
    shd: 45,
    cap: 50,
    price: 0,
    owned: true,
    color: "#0D2040",
    accent: "#00E5FF",
    thruster: "#00E5FF",
  },
  {
    id: "void",
    name: "VOID CRUISER",
    stars: 2,
    spd: 70,
    shd: 60,
    cap: 65,
    price: 3800,
    owned: false,
    color: "#201000",
    accent: "#FF8C00",
    thruster: "#FF8C00",
  },
  {
    id: "specter",
    name: "SPECTER",
    stars: 2,
    spd: 80,
    shd: 55,
    cap: 55,
    price: 7200,
    owned: false,
    color: "#001A10",
    accent: "#00FFAA",
    thruster: "#00FFAA",
  },
  {
    id: "mantis",
    name: "MANTIS",
    stars: 3,
    spd: 88,
    shd: 75,
    cap: 80,
    price: 10500,
    owned: false,
    color: "#001808",
    accent: "#00FF78",
    thruster: "#00FF78",
  },
  {
    id: "wraith",
    name: "WRAITH",
    stars: 3,
    spd: 96,
    shd: 70,
    cap: 85,
    price: 16000,
    owned: false,
    color: "#180030",
    accent: "#CC64FF",
    thruster: "#CC64FF",
  },
  {
    id: "nova",
    name: "NOVA STRIKER",
    stars: 4,
    spd: 100,
    shd: 90,
    cap: 100,
    price: 25500,
    owned: false,
    color: "#220020",
    accent: "#FF44CC",
    thruster: "#FF44CC",
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

// ─── Inject styles ────────────────────────────────────────────────────────────
const injectHangarStyles = () => {
  if (document.getElementById("hangar-styles")) return;
  const el = document.createElement("style");
  el.id = "hangar-styles";
  el.textContent = `
    @keyframes stageGlow   { 0%,100%{opacity:.5} 50%{opacity:1} }
    @keyframes scanline    { 0%{transform:translateY(-100%)} 100%{transform:translateY(400%)} }
    @keyframes shimmer     { 0%{left:-100%} 100%{left:160%} }
    @keyframes cardPulse   { 0%,100%{box-shadow:0 0 0 0 transparent} 50%{box-shadow:0 0 12px 1px rgba(0,229,255,0.12)} }
  `;
  document.head.appendChild(el);
};

// ─── Stat bar ─────────────────────────────────────────────────────────────────
const StatBar = ({
  label,
  value,
  color,
  accent,
}: {
  label: string;
  value: number;
  color: string;
  accent: string;
}) => (
  <div
    style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 8 }}
  >
    <div
      style={{
        fontFamily: FONT.ui,
        fontWeight: 700,
        fontSize: 9,
        letterSpacing: "0.18em",
        color: "rgba(255,255,255,0.35)",
        width: 48,
        textTransform: "uppercase" as const,
      }}
    >
      {label}
    </div>
    <div
      style={{
        flex: 1,
        height: 5,
        background: "rgba(255,255,255,0.06)",
        borderRadius: 3,
        overflow: "hidden",
        position: "relative",
      }}
    >
      {/* track grid lines */}
      {[25, 50, 75].map((p) => (
        <div
          key={p}
          style={{
            position: "absolute",
            left: `${p}%`,
            top: 0,
            width: 1,
            height: "100%",
            background: "rgba(255,255,255,0.06)",
          }}
        />
      ))}
      <div
        style={{
          width: `${value}%`,
          height: "100%",
          background: `linear-gradient(90deg, ${color}88, ${color})`,
          borderRadius: 3,
          boxShadow: `0 0 8px ${color}66`,
          transition: "width 0.5s cubic-bezier(0.4,0,0.2,1)",
          position: "relative",
        }}
      >
        {/* leading edge glow dot */}
        <div
          style={{
            position: "absolute",
            right: 0,
            top: "50%",
            transform: "translateY(-50%)",
            width: 5,
            height: 5,
            borderRadius: "50%",
            background: color,
            boxShadow: `0 0 6px ${color}`,
          }}
        />
      </div>
    </div>
    <div
      style={{
        fontFamily: FONT.mono,
        fontSize: 10,
        fontWeight: 700,
        color: accent,
        minWidth: 26,
        textAlign: "right" as const,
        textShadow: `0 0 8px ${accent}66`,
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
      background: "rgba(5,12,28,0.96)",
      border: `1px solid rgba(0,229,255,0.35)`,
      borderRadius: RADIUS.md,
      padding: "9px 22px",
      fontFamily: FONT.ui,
      fontSize: 12,
      fontWeight: 700,
      letterSpacing: "0.1em",
      color: "#fff",
      whiteSpace: "nowrap" as const,
      zIndex: 99,
      boxShadow: "0 0 24px rgba(0,229,255,0.18), 0 8px 32px rgba(0,0,0,0.6)",
      animation: "slideIn 0.25s ease",
    }}
  >
    {message}
  </div>
);

// ─── Main Component ───────────────────────────────────────────────────────────
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

  const UPGRADES: Upgrade[] = [
    {
      id: "speed",
      name: "Engine Boost",
      desc: "+5 Speed",
      emoji: "⚡",
      levels: [0, 250, 500, 1000, 2000],
      cur: 0,
      iconBg: "linear-gradient(135deg,#001A30,rgba(0,229,255,0.1))",
      iconBorder: "rgba(0,229,255,0.35)",
    },
    {
      id: "shield",
      name: "Shield Matrix",
      desc: "+5 Shield",
      emoji: "🛡",
      levels: [0, 250, 500, 1000, 2000],
      cur: 0,
      iconBg: "linear-gradient(135deg,#001A10,rgba(0,255,120,0.1))",
      iconBorder: "rgba(0,255,120,0.35)",
    },
    {
      id: "cargo",
      name: "Cargo Hold",
      desc: "+5 Cargo",
      emoji: "📦",
      levels: [0, 250, 500, 1000, 2000],
      cur: 0,
      iconBg: "linear-gradient(135deg,#1A1000,rgba(255,181,71,0.1))",
      iconBorder: "rgba(255,181,71,0.35)",
    },
  ];

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
    injectHangarStyles();
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
  const acc = selectedShip.accent;

  return (
    <div
      style={{
        position: "relative",
        width: "100%",
        height: "100%",
        background: `radial-gradient(ellipse at 50% 20%, #0D1830 0%, ${COLOR.bgDeep} 70%)`,
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
        {Array.from({ length: 50 }, (_, i) => (
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
              opacity: 0.08 + (i % 6) * 0.07,
              animation: `twinkle ${2 + (i % 4)}s ease-in-out ${(i % 10) * 0.3}s infinite alternate`,
            }}
          />
        ))}
      </div>

      {/* Nebula blobs */}
      <div
        style={{
          position: "absolute",
          width: 280,
          height: 280,
          top: -80,
          left: -100,
          borderRadius: "50%",
          background: "rgba(0,80,160,0.07)",
          filter: "blur(70px)",
          pointerEvents: "none",
        }}
      />
      <div
        style={{
          position: "absolute",
          width: 200,
          height: 200,
          top: "40%",
          right: -80,
          borderRadius: "50%",
          background: `${acc}09`,
          filter: "blur(60px)",
          pointerEvents: "none",
        }}
      />

      {/* ── TOP BAR ── */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "52px 18px 14px",
          position: "relative",
          zIndex: 10,
          borderBottom: "1px solid rgba(0,229,255,0.08)",
        }}
      >
        {/* Coin pill */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 7,
            background: "rgba(5,12,28,0.8)",
            border: "1px solid rgba(0,229,255,0.25)",
            borderRadius: 999,
            padding: "6px 14px 6px 8px",
            boxShadow: "0 0 14px rgba(0,229,255,0.1)",
          }}
        >
          <div
            style={{
              width: 20,
              height: 20,
              borderRadius: "50%",
              background:
                "radial-gradient(circle at 35% 30%, #FFE57A, #FF9500)",
              border: "1.5px solid #FFD84D",
              flexShrink: 0,
            }}
          />
          <span
            style={{
              fontFamily: FONT.mono,
              fontSize: 14,
              fontWeight: 700,
              color: "#fff",
            }}
          >
            {coins.toLocaleString()}
          </span>
        </div>

        {/* Title */}
        <div
          style={{
            fontFamily: FONT.heading,
            fontWeight: 900,
            fontSize: 15,
            letterSpacing: "0.28em",
            color: "#fff",
            textShadow: "0 0 20px rgba(0,229,255,0.35)",
          }}
        >
          HANGAR
        </div>

        {/* Back button */}
        <button
          onClick={onBack}
          style={{
            fontFamily: FONT.ui,
            fontSize: 11,
            fontWeight: 600,
            letterSpacing: "0.1em",
            color: "rgba(255,255,255,0.45)",
            background: "rgba(17,24,39,0.5)",
            border: "1px solid rgba(0,229,255,0.2)",
            borderRadius: RADIUS.md,
            padding: "7px 14px",
            cursor: "pointer",
            transition: "all 0.15s",
          }}
        >
          ← BACK
        </button>
      </div>

      {/* ── TABS ── */}
      <div
        style={{
          display: "flex",
          position: "relative",
          zIndex: 10,
          background: "rgba(5,12,28,0.4)",
          borderBottom: "1px solid rgba(0,229,255,0.08)",
        }}
      >
        {(["ships", "store"] as const).map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            style={{
              flex: 1,
              padding: "12px 0",
              fontFamily: FONT.heading,
              fontSize: 10,
              fontWeight: 700,
              letterSpacing: "0.18em",
              textTransform: "uppercase" as const,
              color: tab === t ? COLOR.cyan : "rgba(255,255,255,0.3)",
              background: tab === t ? "rgba(0,229,255,0.05)" : "transparent",
              border: "none",
              borderBottom:
                tab === t ? `2px solid ${COLOR.cyan}` : "2px solid transparent",
              cursor: "pointer",
              transition: "all 0.2s",
            }}
          >
            {t === "ships" ? "◈  SHIPS" : "⬡  UPGRADES"}
          </button>
        ))}
      </div>

      {/* ══════════════ SHIPS TAB ══════════════ */}
      {tab === "ships" && (
        <div
          style={{
            flex: 1,
            overflow: "hidden",
            display: "flex",
            flexDirection: "column",
          }}
        >
          {/* Ship stage */}
          <div
            style={{
              height: 240,
              position: "relative",
              flexShrink: 0,
              background: `radial-gradient(ellipse at 50% 70%, ${acc}14 0%, transparent 65%)`,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              overflow: "hidden",
            }}
          >
            {/* Scanning line effect */}
            <div
              style={{
                position: "absolute",
                inset: 0,
                pointerEvents: "none",
                background: `linear-gradient(180deg, transparent 0%, ${acc}06 50%, transparent 100%)`,
                animation: "scanline 4s linear infinite",
              }}
            />

            {/* Stage floor ellipse */}
            <div
              style={{
                position: "absolute",
                bottom: 14,
                left: "50%",
                transform: "translateX(-50%)",
                width: 180,
                height: 18,
                background: `radial-gradient(ellipse, ${acc}40, transparent 70%)`,
                filter: "blur(8px)",
                animation: "stageGlow 2s ease-in-out infinite",
              }}
            />

            {/* Corner brackets — pure CSS, no BracketFrame component */}
            {[
              {
                top: 10,
                left: 10,
                borderTop: `2px solid ${acc}60`,
                borderLeft: `2px solid ${acc}60`,
              },
              {
                top: 10,
                right: 10,
                borderTop: `2px solid ${acc}60`,
                borderRight: `2px solid ${acc}60`,
              },
              {
                bottom: 10,
                left: 10,
                borderBottom: `2px solid ${acc}60`,
                borderLeft: `2px solid ${acc}60`,
              },
              {
                bottom: 10,
                right: 10,
                borderBottom: `2px solid ${acc}60`,
                borderRight: `2px solid ${acc}60`,
              },
            ].map((s, i) => (
              <div
                key={i}
                style={{ position: "absolute", width: 20, height: 20, ...s }}
              />
            ))}

            {/* Nav buttons */}
            {[-1, 1].map((dir) => (
              <button
                key={dir}
                onClick={() => navigate(dir as 1 | -1)}
                style={{
                  position: "absolute",
                  [dir === -1 ? "left" : "right"]: 12,
                  top: "50%",
                  transform: "translateY(-50%)",
                  width: 32,
                  height: 32,
                  borderRadius: 4,
                  background: "rgba(5,12,28,0.85)",
                  border: `1px solid rgba(0,229,255,0.2)`,
                  color: COLOR.cyan,
                  fontSize: 22,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  cursor: "pointer",
                  zIndex: 5,
                  boxShadow: "0 2px 8px rgba(0,0,0,0.4)",
                  transition: "border-color 0.15s, background 0.15s",
                }}
              >
                {dir === -1 ? "‹" : "›"}
              </button>
            ))}

            {/* Ship */}
            <ShipSVG shipId={selectedShip.id} />
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
                  width: i === selectedIdx ? 20 : 6,
                  height: 6,
                  borderRadius: i === selectedIdx ? 3 : "50%",
                  background:
                    i === selectedIdx ? acc : "rgba(255,255,255,0.12)",
                  boxShadow: i === selectedIdx ? `0 0 8px ${acc}` : "none",
                  cursor: "pointer",
                  transition: "all 0.25s ease",
                }}
              />
            ))}
          </div>

          {/* Ship info panel */}
          <div
            style={{
              margin: "10px 16px 0",
              background: "rgba(5,12,28,0.7)",
              border: `1px solid ${acc}22`,
              borderRadius: RADIUS.md,
              padding: "14px 16px 12px",
              backdropFilter: "blur(12px)",
              boxShadow: `0 0 20px ${acc}0A, inset 0 1px 0 rgba(255,255,255,0.04)`,
            }}
          >
            {/* Name row */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                marginBottom: 10,
              }}
            >
              <div>
                <div
                  style={{
                    fontFamily: FONT.heading,
                    fontWeight: 900,
                    fontSize: 18,
                    letterSpacing: "0.12em",
                    color: "#fff",
                    textShadow: `0 0 16px ${acc}55`,
                  }}
                >
                  {selectedShip.name}
                </div>
                {/* Stars */}
                <div style={{ display: "flex", gap: 3, marginTop: 3 }}>
                  {[1, 2, 3, 4].map((i) => (
                    <span
                      key={i}
                      style={{
                        fontSize: 11,
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
              {/* Price / owned badge */}
              <div
                style={{
                  fontFamily: FONT.mono,
                  fontWeight: 700,
                  fontSize: selectedShip.owned ? 10 : 13,
                  color: selectedShip.owned ? COLOR.green : COLOR.amber,
                  textShadow: selectedShip.owned
                    ? `0 0 8px ${COLOR.green}`
                    : `0 0 8px ${COLOR.amber}`,
                  letterSpacing: "0.08em",
                }}
              >
                {selectedShip.owned
                  ? "OWNED"
                  : `⬡ ${selectedShip.price.toLocaleString()}`}
              </div>
            </div>

            {/* Stat bars */}
            <StatBar
              label="SPEED"
              value={selectedShip.spd}
              color={COLOR.cyan}
              accent={acc}
            />
            <StatBar
              label="SHIELD"
              value={selectedShip.shd}
              color={COLOR.green}
              accent={acc}
            />
            <StatBar
              label="CARGO"
              value={selectedShip.cap}
              color={COLOR.amber}
              accent={acc}
            />
          </div>

          {/* Action buttons */}
          <div style={{ display: "flex", gap: 8, padding: "10px 16px 16px" }}>
            {selectedShip.owned ? (
              <PrimaryButton
                onClick={handleSelect}
                amber={isActive}
                style={{ flex: 1, padding: "13px 0", fontSize: 13 }}
              >
                {isActive ? "✓  ACTIVE SHIP" : "✓  SELECT SHIP"}
              </PrimaryButton>
            ) : (
              <>
                <SecondaryButton
                  disabled
                  style={{ flex: 0.6, padding: "13px 0", fontSize: 11 }}
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
                    ? `⬡  ${selectedShip.price.toLocaleString()}`
                    : `🔒  ${selectedShip.price.toLocaleString()}`}
                </PrimaryButton>
              </>
            )}
          </div>
        </div>
      )}

      {/* ══════════════ STORE TAB ══════════════ */}
      {tab === "store" && (
        <div
          style={{
            flex: 1,
            overflowY: "auto",
            padding: "16px 16px 40px",
            scrollbarWidth: "none",
          }}
        >
          {/* ── UPGRADES SECTION ── */}
          <SectionHeader label="SHIP UPGRADES" icon="⚙" />

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: 10,
              marginBottom: 24,
            }}
          >
            {upgrades.map((u) => {
              const maxLv = u.levels.length - 1;
              const isMax = u.cur >= maxLv;
              const nextCost = isMax ? 0 : u.levels[u.cur + 1];
              return (
                <UpgradeRow
                  key={u.id}
                  onClick={() => handleUpgrade(u)}
                  isMax={isMax}
                  iconBg={u.iconBg}
                  iconBorder={u.iconBorder}
                  emoji={u.emoji}
                  name={u.name}
                  desc={u.desc}
                  cur={u.cur}
                  maxLv={maxLv}
                  nextCost={nextCost}
                />
              );
            })}
          </div>

          {/* ── POWER-UPS SECTION ── */}
          <SectionHeader label="POWER-UPS" icon="✦" />

          <div
            style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}
          >
            {powerups.map((p) => (
              <PowerupCard
                key={p.id}
                onClick={() => handleBuyPowerup(p)}
                p={p}
              />
            ))}
          </div>
        </div>
      )}

      {toast && <Toast message={toast} />}
    </div>
  );
}

// ─── Section header ───────────────────────────────────────────────────────────
function SectionHeader({ label, icon }: { label: string; icon: string }) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: 10,
        marginBottom: 12,
      }}
    >
      <span
        style={{
          fontFamily: FONT.mono,
          fontSize: 11,
          color: COLOR.cyan,
          opacity: 0.7,
        }}
      >
        {icon}
      </span>
      <div style={{ flex: 1, height: 1, background: "rgba(0,229,255,0.1)" }} />
      <span
        style={{
          fontFamily: FONT.heading,
          fontSize: 9,
          fontWeight: 700,
          letterSpacing: "0.22em",
          color: "rgba(0,229,255,0.5)",
        }}
      >
        {label}
      </span>
      <div style={{ flex: 1, height: 1, background: "rgba(0,229,255,0.1)" }} />
    </div>
  );
}

// ─── Upgrade row (horizontal, not card grid) ──────────────────────────────────
function UpgradeRow({
  onClick,
  isMax,
  iconBg,
  iconBorder,
  emoji,
  name,
  desc,
  cur,
  maxLv,
  nextCost,
}: {
  onClick: () => void;
  isMax: boolean;
  iconBg: string;
  iconBorder: string;
  emoji: string;
  name: string;
  desc: string;
  cur: number;
  maxLv: number;
  nextCost: number;
}) {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: "flex",
        alignItems: "center",
        gap: 14,
        background: hovered ? "rgba(0,229,255,0.05)" : "rgba(5,12,28,0.6)",
        border: `1px solid ${isMax ? "rgba(0,255,120,0.25)" : hovered ? "rgba(0,229,255,0.3)" : "rgba(0,229,255,0.1)"}`,
        borderRadius: RADIUS.md,
        padding: "14px 16px",
        cursor: "pointer",
        transition: "all 0.18s",
        boxShadow: isMax ? "inset 0 0 16px rgba(0,255,120,0.06)" : "none",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* shimmer on hover */}
      {hovered && (
        <div
          style={{
            position: "absolute",
            top: 0,
            width: "40%",
            height: "100%",
            background:
              "linear-gradient(90deg,transparent,rgba(0,229,255,0.04),transparent)",
            animation: "shimmer 0.6s ease forwards",
          }}
        />
      )}

      {/* Icon */}
      <div
        style={{
          width: 46,
          height: 46,
          flexShrink: 0,
          borderRadius: 10,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: 22,
          background: iconBg,
          border: `1px solid ${iconBorder}`,
          boxShadow: `inset 0 1px 0 rgba(255,255,255,0.07)`,
        }}
      >
        {emoji}
      </div>

      {/* Info */}
      <div style={{ flex: 1, minWidth: 0 }}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            marginBottom: 4,
          }}
        >
          <span
            style={{
              fontFamily: FONT.ui,
              fontWeight: 700,
              fontSize: 13,
              color: "#fff",
              letterSpacing: "0.05em",
            }}
          >
            {name}
          </span>
          {isMax ? (
            <span
              style={{
                fontFamily: FONT.mono,
                fontSize: 10,
                fontWeight: 700,
                color: COLOR.green,
                letterSpacing: "0.1em",
                textShadow: `0 0 8px ${COLOR.green}`,
              }}
            >
              MAX ✓
            </span>
          ) : (
            <div style={{ display: "flex", alignItems: "center", gap: 5 }}>
              <div
                style={{
                  width: 14,
                  height: 14,
                  borderRadius: "50%",
                  background:
                    "radial-gradient(circle at 35% 30%, #FFE57A, #FF9500)",
                  border: "1px solid #FFD84D",
                  flexShrink: 0,
                }}
              />
              <span
                style={{
                  fontFamily: FONT.mono,
                  fontSize: 12,
                  fontWeight: 700,
                  color: COLOR.amber,
                  textShadow: `0 0 6px ${COLOR.amber}66`,
                }}
              >
                {nextCost.toLocaleString()}
              </span>
            </div>
          )}
        </div>
        <div
          style={{
            fontFamily: FONT.ui,
            fontSize: 10,
            color: "rgba(255,255,255,0.35)",
            marginBottom: 7,
            letterSpacing: "0.04em",
          }}
        >
          {desc}
        </div>

        {/* Level pips bar */}
        <div style={{ display: "flex", gap: 4, alignItems: "center" }}>
          {Array.from({ length: maxLv }, (_, i) => (
            <div
              key={i}
              style={{
                height: 4,
                flex: 1,
                borderRadius: 2,
                background:
                  i < cur
                    ? `linear-gradient(90deg, ${COLOR.amber}88, ${COLOR.amber})`
                    : "rgba(255,255,255,0.07)",
                boxShadow: i < cur ? `0 0 6px ${COLOR.amber}66` : "none",
                transition: "background 0.3s",
              }}
            />
          ))}
          <span
            style={{
              fontFamily: FONT.mono,
              fontSize: 9,
              color: "rgba(255,255,255,0.35)",
              marginLeft: 4,
              whiteSpace: "nowrap" as const,
            }}
          >
            {cur}/{maxLv}
          </span>
        </div>
      </div>
    </div>
  );
}

// ─── Powerup card ─────────────────────────────────────────────────────────────
function PowerupCard({ onClick, p }: { onClick: () => void; p: Powerup }) {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: hovered ? "rgba(0,229,255,0.05)" : "rgba(5,12,28,0.6)",
        border: `1px solid ${hovered ? "rgba(0,229,255,0.3)" : "rgba(0,229,255,0.1)"}`,
        borderRadius: RADIUS.md,
        padding: "14px 12px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 5,
        cursor: "pointer",
        position: "relative",
        overflow: "hidden",
        transition: "all 0.18s",
      }}
    >
      {p.isNew && (
        <div
          style={{
            position: "absolute",
            top: -1,
            right: -1,
            background: "linear-gradient(135deg, #FF4477, #CC1144)",
            color: "#fff",
            fontFamily: FONT.ui,
            fontWeight: 700,
            fontSize: 8,
            letterSpacing: "0.1em",
            borderRadius: "0 6px 0 6px",
            padding: "3px 8px",
          }}
        >
          NEW
        </div>
      )}

      {/* Icon */}
      <div
        style={{
          width: 50,
          height: 50,
          borderRadius: 12,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: p.emoji === "×2" ? 18 : 24,
          fontFamily: p.emoji === "×2" ? FONT.heading : "inherit",
          fontWeight: p.emoji === "×2" ? 900 : undefined,
          color: p.emoji === "×2" ? COLOR.amber : "inherit",
          background: p.iconBg,
          border: "1px solid rgba(0,229,255,0.2)",
          boxShadow: "inset 0 1px 0 rgba(255,255,255,0.07)",
        }}
      >
        {p.emoji}
      </div>

      <div
        style={{
          fontFamily: FONT.ui,
          fontWeight: 700,
          fontSize: 12,
          color: "#fff",
          textAlign: "center",
          letterSpacing: "0.04em",
        }}
      >
        {p.name}
      </div>

      <div
        style={{
          fontFamily: FONT.ui,
          fontSize: 9,
          color: "rgba(255,255,255,0.38)",
          textAlign: "center",
          letterSpacing: "0.04em",
        }}
      >
        {p.desc}
      </div>

      {p.qty > 0 && (
        <div
          style={{
            fontFamily: FONT.mono,
            fontSize: 10,
            fontWeight: 700,
            color: COLOR.green,
            textShadow: `0 0 8px ${COLOR.green}66`,
            letterSpacing: "0.08em",
          }}
        >
          OWNED: {p.qty}
        </div>
      )}

      {/* Price */}
      <div
        style={{ display: "flex", alignItems: "center", gap: 5, marginTop: 2 }}
      >
        <div
          style={{
            width: 13,
            height: 13,
            borderRadius: "50%",
            background: "radial-gradient(circle at 35% 30%, #FFE57A, #FF9500)",
            border: "1px solid #FFD84D",
            flexShrink: 0,
          }}
        />
        <span
          style={{
            fontFamily: FONT.mono,
            fontSize: 12,
            fontWeight: 700,
            color: COLOR.amber,
            textShadow: `0 0 6px ${COLOR.amber}66`,
          }}
        >
          {p.price}
        </span>
      </div>
    </div>
  );
}
