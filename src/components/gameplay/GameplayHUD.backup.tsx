interface GameplayHUDProps {
  coins: number;
  lives: number;
  fuelPct: number;
  isLowFuel: boolean;
  fuelColor: string;
  score: number;
  currentLevel: number;
  cargo: string;
  isPaused: boolean;
  onPause: () => void;
  FuelBolt: React.ComponentType;
  HeartSVG: React.ComponentType<{ filled: boolean }>;
  CrateSVG: React.ComponentType<{ size?: number }>;
}

export default function GameplayHUD({
  coins,
  lives,
  fuelPct,
  isLowFuel,
  fuelColor,
  score,
  currentLevel,
  cargo,
  isPaused,
  onPause,
  FuelBolt,
  HeartSVG,
  CrateSVG,
}: GameplayHUDProps) {
  return (
    <>
      {/* TOP ROW */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          padding: "18px 14px 0",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 10,
          zIndex: 20,
        }}
      >
        <div
          className="scr-hud-glass"
          style={{
            display: "flex",
            alignItems: "center",
            gap: 6,
            borderRadius: 999,
            padding: "6px 14px 6px 7px",
            flexShrink: 0,
          }}
        >
          <div
            style={{
              width: 22,
              height: 22,
              borderRadius: "50%",
              background: "radial-gradient(circle at 35% 30%,#ffe57a,#ff9500)",
              border: "2px solid #ffd84d",
              boxShadow: "0 0 10px #ffd84d88",
            }}
          />
          <span
            style={{
              fontFamily: "'Fredoka One',cursive",
              fontSize: 17,
              color: "#ffd84d",
              textShadow: "0 0 12px #ffd84d88",
            }}
          >
            {coins.toLocaleString()}
          </span>
        </div>

        <div
          style={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            gap: 3,
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              gap: 4,
            }}
          >
            <FuelBolt />

            <span
              style={{
                fontFamily: "'Fredoka One',cursive",
                fontSize: 11,
                color: "rgba(180,79,255,0.85)",
                letterSpacing: 2,
              }}
            >
              FUEL
            </span>

            <span
              style={{
                fontFamily: "'Fredoka One',cursive",
                fontSize: 11,
                color: isLowFuel ? "#ff4444" : "rgba(255,255,255,0.38)",
              }}
            >
              {fuelPct}%
            </span>
          </div>

          <div
            style={{
              width: "100%",
              height: 11,
              background: "rgba(255,255,255,0.06)",
              borderRadius: 999,
              overflow: "hidden",
            }}
          >
            <div
              style={{
                width: `${fuelPct}%`,
                height: "100%",
                background: fuelColor,
                transition: "width .4s ease",
              }}
            />
          </div>
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 2,
          }}
        >
          {Array.from({ length: 3 }, (_, i) => (
            <HeartSVG key={i} filled={i < lives} />
          ))}
        </div>
      </div>

      {/* SECOND ROW */}
      <div
        style={{
          position: "absolute",
          top: 88,
          left: 0,
          right: 0,
          padding: "0 14px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          zIndex: 20,
        }}
      >
        <div
          className="scr-hud-glass"
          style={{
            borderRadius: 14,
            padding: "7px 14px",
            textAlign: "center",
          }}
        >
          <div
            style={{
              fontSize: 10,
              fontWeight: 900,
              color: "rgba(255,255,255,0.32)",
            }}
          >
            SCORE
          </div>

          <div
            style={{
              fontFamily: "'Fredoka One',cursive",
              color: "#fff",
              fontSize: 21,
            }}
          >
            {score.toLocaleString()}
          </div>
        </div>

        <div
          className="scr-hud-glass"
          style={{
            borderRadius: 999,
            padding: "6px 16px",
          }}
        >
          <span
            style={{
              color: "#4fc3ff",
              fontFamily: "'Fredoka One',cursive",
            }}
          >
            LVL {String(currentLevel).padStart(2, "0")}
          </span>
        </div>

        <button
          onClick={onPause}
          style={{
            width: 44,
            height: 44,
            borderRadius: "50%",
            border: "2px solid #c966ff",
            background: "rgba(30,0,60,0.85)",
            color: "#ffffff",
            boxShadow: `
    0 0 12px #c966ff,
    inset 0 0 8px rgba(255,255,255,0.15)
  `,
            cursor: "pointer",
            fontSize: 18,
            fontWeight: 700,
          }}
        >
          {isPaused ? "▶" : "❚❚"}
        </button>
      </div>

      {/* BOTTOM ROW */}
      <div
        style={{
          position: "absolute",
          bottom: 18,
          left: 0,
          right: 0,
          padding: "0 14px",
          display: "flex",
          justifyContent: "space-between",
          zIndex: 20,
        }}
      >
        <div
          className="scr-hud-glass"
          style={{
            display: "flex",
            gap: 8,
            alignItems: "center",
            borderRadius: 14,
            padding: "8px 14px",
          }}
        >
          <CrateSVG size={28} />

          <div>
            <div
              style={{
                fontSize: 10,
                color: "rgba(255,216,77,0.55)",
                fontWeight: 900,
              }}
            >
              CARGO
            </div>

            <div
              style={{
                color: "#ffd84d",
                fontFamily: "'Fredoka One',cursive",
                fontSize: 24,
              }}
            >
              {cargo}
            </div>
          </div>
        </div>

        <div
          className="scr-hud-glass"
          style={{
            borderRadius: 14,
            padding: "8px 16px",
            textAlign: "center",
          }}
        >
          <div
            style={{
              fontSize: 10,
              color: "rgba(255,255,255,0.3)",
            }}
          >
            DIST
          </div>

          <div
            style={{
              color: "#4fc3ff",
              fontFamily: "'Fredoka One',cursive",
              fontSize: 18,
            }}
          >
            {(score / 100).toFixed(1)}km
          </div>
        </div>
      </div>
    </>
  );
}
