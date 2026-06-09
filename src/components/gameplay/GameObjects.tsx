// GameObjects.tsx — redesigned visual layer
// All gameplay logic, collision handlers, and prop signatures are UNCHANGED
// Only visual styles updated to match design system

import MeteorSVG from "./MeteorSVG";
import { AsteroidSVG, CrateSVG, CoinSVG, FuelCanSVG } from "./GameSVGs";
import { COLOR, FONT } from "../design-system";

interface Props {
  asteroids: any[];
  crates: any[];
  floatingCoins: any[];
  scorePopups: any[];
  fuelCans: any[];
  laserWalls: any[];
  drones: any[];
  handleHitAsteroid: (id: number) => void;
  handleCollectCrate: (id: number, x: number) => void;
  handleCollectCoin: (id: number, x: number) => void;
}

export default function GameObjects({
  asteroids,
  crates,
  floatingCoins,
  scorePopups,
  handleHitAsteroid,
  handleCollectCrate,
  handleCollectCoin,
  fuelCans,
  laserWalls,
  drones,
}: Props) {
  return (
    <>
      {/* ── ASTEROIDS ── */}
      {asteroids.map((a) => (
        <div
          key={a.id}
          onClick={() => handleHitAsteroid(a.id)}
          style={{
            position: "absolute",
            left: `${a.x}%`,
            top: `${a.y}%`,
            transform: "translate(-50%, -50%)",
            cursor: "pointer",
            zIndex: 8,
          }}
        >
          <div
            style={{
              animation: a.isMeteor
                ? "none"
                : `asteroidSpin ${Math.abs(1 / a.rotateSpeed) * 3}s linear infinite`,
              transformOrigin: "center",
              position: "relative",
            }}
          >
            {/* Meteor trail */}
            {a.isMeteor && (
              <>
                {/* Core streak */}
                <div
                  style={{
                    position: "absolute",
                    left: "50%",
                    top: -130,
                    transform: "translateX(-50%)",
                    width: 14,
                    height: 140,
                    background:
                      "linear-gradient(180deg, transparent, #3D1A08, #7A3010, #C05020, #FF7040)",
                    filter: "blur(10px)",
                    opacity: 0.9,
                  }}
                />
                {/* Wide heat bloom */}
                <div
                  style={{
                    position: "absolute",
                    left: "50%",
                    top: -90,
                    transform: "translateX(-50%)",
                    width: 36,
                    height: 100,
                    background:
                      "linear-gradient(180deg, transparent, #FF5020, #FF8040, #FFA060)",
                    filter: "blur(18px)",
                    opacity: 0.55,
                  }}
                />
                {/* Debris sparks */}
                <div
                  style={{
                    position: "absolute",
                    left: "50%",
                    top: -60,
                    width: 3,
                    height: 3,
                    borderRadius: "50%",
                    background: "#FFC080",
                    boxShadow:
                      "-18px 18px 0 #FFB060, 14px 28px 0 #FF8040, -8px 42px 0 #FFC080, 22px 52px 0 #FF9040",
                  }}
                />
              </>
            )}

            <div
              style={{
                filter: a.isMeteor
                  ? "drop-shadow(0 0 12px rgba(255,100,30,0.8))"
                  : "drop-shadow(0 0 6px rgba(255,120,60,0.4))",
              }}
            >
              {a.isMeteor ? (
                <MeteorSVG size={a.size} />
              ) : (
                <AsteroidSVG size={a.size} seed={a.id} />
              )}
            </div>
          </div>
        </div>
      ))}

      {/* ── CARGO CRATES ── */}
      {crates.map((c) => (
        <div
          key={c.id}
          onClick={() => handleCollectCrate(c.id, c.x)}
          style={{
            position: "absolute",
            left: `${c.x}%`,
            top: `${c.y}%`,
            transform: "translate(-50%, -50%)",
            cursor: "pointer",
            zIndex: 9,
            animation: "cargoGlow 1.4s ease-in-out infinite",
          }}
        >
          {/* Tractor beam — thin cyan line above crate */}
          <div
            style={{
              position: "absolute",
              left: "50%",
              top: -36,
              transform: "translateX(-50%)",
              width: 8,
              height: 36,
              background: `linear-gradient(180deg, transparent, rgba(0,229,255,0.6))`,
              filter: "blur(4px)",
              opacity: 0.65,
            }}
          />
          <CrateSVG size={48} />
        </div>
      ))}

      {/* ── FLOATING COINS ── */}
      {floatingCoins.map((c) => (
        <div
          key={c.id}
          onClick={() => handleCollectCoin(c.id, c.x)}
          style={{
            position: "absolute",
            left: `${c.x}%`,
            top: `${c.y}%`,
            transform: "translate(-50%, -50%)",
            cursor: "pointer",
            zIndex: 9,
          }}
        >
          <div
            style={{
              animation: "coinSpin 1.2s linear infinite",
              filter: `drop-shadow(0 0 6px ${COLOR.amberGlow}) drop-shadow(0 0 14px rgba(255,181,71,0.3))`,
            }}
          >
            <CoinSVG size={28} />
          </div>
        </div>
      ))}

      {/* ── FUEL CANS ── */}
      {fuelCans.map((f) => (
        <div
          key={f.id}
          style={{
            position: "absolute",
            left: `${f.x}%`,
            top: `${f.y}%`,
            transform: "translate(-50%, -50%)",
            zIndex: 9,
            filter: `drop-shadow(0 0 10px rgba(0,229,255,0.7)) drop-shadow(0 0 20px rgba(0,229,255,0.35))`,
            animation: "fuelPulse 1.8s ease-in-out infinite",
          }}
        >
          <FuelCanSVG size={38} />
        </div>
      ))}

      {/* ── LASER WALLS ── */}
      {laserWalls.map((wall) => (
        <div key={wall.id}>
          {/* Left segment */}
          <div
            style={{
              position: "absolute",
              left: 0,
              top: `${wall.y}%`,
              width: `${wall.gapX - 12}%`,
              height: 8,
              background: `linear-gradient(90deg, ${COLOR.red}AA, ${COLOR.red}, ${COLOR.red}AA)`,
              boxShadow: `0 0 8px ${COLOR.red}, 0 0 18px ${COLOR.red}88, 0 0 30px ${COLOR.redDim}`,
              zIndex: 12,
            }}
          />
          {/* Gap emitters */}
          <div
            style={{
              position: "absolute",
              left: `${wall.gapX - 13}%`,
              top: `${wall.y - 0.8}%`,
              width: 8,
              height: 12,
              borderRadius: 2,
              background: "#fff",
              boxShadow: `0 0 8px ${COLOR.red}, 0 0 16px ${COLOR.red}`,
              zIndex: 13,
            }}
          />
          <div
            style={{
              position: "absolute",
              left: `${wall.gapX + 11.2}%`,
              top: `${wall.y - 0.8}%`,
              width: 8,
              height: 12,
              borderRadius: 2,
              background: "#fff",
              boxShadow: `0 0 8px ${COLOR.red}, 0 0 16px ${COLOR.red}`,
              zIndex: 13,
            }}
          />
          {/* Right segment */}
          <div
            style={{
              position: "absolute",
              left: `${wall.gapX + 12}%`,
              top: `${wall.y}%`,
              width: `${100 - (wall.gapX + 12)}%`,
              height: 8,
              background: `linear-gradient(90deg, ${COLOR.red}AA, ${COLOR.red}, ${COLOR.red}AA)`,
              boxShadow: `0 0 8px ${COLOR.red}, 0 0 18px ${COLOR.red}88`,
              zIndex: 12,
            }}
          />
        </div>
      ))}

      {/* ── ENEMY DRONES ── */}
      {drones.map((d) => (
        <div
          key={d.id}
          style={{
            position: "absolute",
            left: `${d.x}%`,
            top: `${d.y}%`,
            transform: "translate(-50%, -50%)",
            zIndex: 11,
            pointerEvents: "none",
          }}
        >
          <DroneShip />
        </div>
      ))}

      {/* ── SCORE POPUPS ── */}
      {(scorePopups ?? []).map((p) => (
        <div
          key={p.id}
          style={{
            position: "absolute",
            left: `${p.x}%`,
            top: `${p.y}%`,
            fontFamily: FONT.mono,
            fontWeight: 700,
            fontSize: 16,
            letterSpacing: "0.08em",
            color: COLOR.cyan,
            textShadow: `0 0 10px rgba(0,229,255,0.7)`,
            pointerEvents: "none",
            zIndex: 30,
            animation: "scorePopup 0.9s ease-out forwards",
          }}
        >
          {p.val}
        </div>
      ))}
    </>
  );
}

// ─── DroneShip — angular sensor drone ────────────────────────────────────────
// Replaces the flat red pill — now reads as a threatening mechanical enemy
function DroneShip() {
  return (
    <svg width="52" height="26" viewBox="0 0 52 26" fill="none">
      <defs>
        <linearGradient id="droneBody" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#2A0808" />
          <stop offset="100%" stopColor="#160404" />
        </linearGradient>
      </defs>

      {/* Wing struts */}
      <polygon
        points="0,14 10,10 10,16 0,18"
        fill="#1A0606"
        stroke="rgba(255,90,90,0.3)"
        strokeWidth="0.6"
      />
      <polygon
        points="52,14 42,10 42,16 52,18"
        fill="#1A0606"
        stroke="rgba(255,90,90,0.3)"
        strokeWidth="0.6"
      />

      {/* Main hull */}
      <polygon
        points="8,7 44,7 48,13 44,19 8,19 4,13"
        fill="url(#droneBody)"
        stroke={COLOR.red}
        strokeWidth="1"
      />

      {/* Hull panel line */}
      <line
        x1="8"
        y1="13"
        x2="44"
        y2="13"
        stroke="rgba(255,90,90,0.2)"
        strokeWidth="0.6"
      />

      {/* Sensor eye — pulsing */}
      <circle
        cx="26"
        cy="13"
        r="5"
        fill="#0A0202"
        stroke={COLOR.red}
        strokeWidth="0.8"
      />
      <circle
        cx="26"
        cy="13"
        r="3"
        fill={COLOR.red}
        opacity="0.9"
        style={{ animation: "fuelLowPulse 0.8s ease-in-out infinite" }}
      />
      <circle cx="24.5" cy="11.5" r="1" fill="rgba(255,200,200,0.5)" />

      {/* Wing-tip warning lights */}
      <circle
        cx="3"
        cy="14"
        r="2"
        fill={COLOR.red}
        opacity="0.8"
        style={{ animation: "fuelLowPulse 1.1s ease-in-out infinite" }}
      />
      <circle
        cx="49"
        cy="14"
        r="2"
        fill={COLOR.red}
        opacity="0.8"
        style={{ animation: "fuelLowPulse 1.1s 0.55s ease-in-out infinite" }}
      />

      {/* Engine nozzles */}
      <rect
        x="10"
        y="17"
        width="6"
        height="3"
        rx="1"
        fill="#220606"
        stroke="rgba(255,90,90,0.4)"
        strokeWidth="0.5"
      />
      <rect
        x="36"
        y="17"
        width="6"
        height="3"
        rx="1"
        fill="#220606"
        stroke="rgba(255,90,90,0.4)"
        strokeWidth="0.5"
      />

      {/* Engine exhaust — dim red glow */}
      <ellipse cx="13" cy="20" rx="3" ry="1.5" fill="rgba(255,90,90,0.3)" />
      <ellipse cx="39" cy="20" rx="3" ry="1.5" fill="rgba(255,90,90,0.3)" />
    </svg>
  );
}
