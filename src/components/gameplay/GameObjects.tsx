import MeteorSVG from "./MeteorSVG";
import { AsteroidSVG, CrateSVG, CoinSVG, FuelCanSVG } from "./GameSVGs";
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
      {/* Asteroids */}
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
                : `asteroidSpin ${
                    Math.abs(1 / a.rotateSpeed) * 3
                  }s linear infinite`,
              transformOrigin: "center",
              position: "relative",
            }}
          >
            {a.isMeteor && (
              <>
                <div
                  style={{
                    position: "absolute",
                    left: "50%",
                    top: -140,
                    transform: "translateX(-50%)",
                    width: 18,
                    height: 160,
                    background:
                      "linear-gradient(180deg, transparent, #3e2723,#6d4c41,#bf360c,#d84315,#ff7043)",
                    filter: "blur(12px)",
                    opacity: 0.95,
                  }}
                />

                <div
                  style={{
                    position: "absolute",
                    left: "50%",
                    top: -110,
                    transform: "translateX(-50%)",
                    width: 40,
                    height: 120,
                    background:
                      "linear-gradient(180deg, transparent, #ff5722, #ff9800, #ffeb3b)",
                    filter: "blur(20px)",
                    opacity: 0.7,
                  }}
                />
              </>
            )}
            {a.isMeteor && (
              <div
                style={{
                  position: "absolute",
                  left: "50%",
                  top: -70,
                  width: 4,
                  height: 4,
                  borderRadius: "50%",
                  background: "#fff176",
                  boxShadow: `
        -20px 20px 0 #ffeb3b,
        15px 30px 0 #ff9800,
        -10px 45px 0 #fff176,
        25px 55px 0 #ff9800
      `,
                }}
              />
            )}
            <div
              style={{
                filter: a.isMeteor
                  ? "drop-shadow(0 0 15px #ff6600)"
                  : undefined,
              }}
            >
              {a.isMeteor ? (
                <MeteorSVG size={a.size} />
              ) : (
                <AsteroidSVG size={a.size} seed={a.id} />
              )}{" "}
            </div>{" "}
          </div>
        </div>
      ))}

      {/* Crates */}
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
            filter: `
drop-shadow(0 0 12px #ffffff)
drop-shadow(0 0 24px #4fc3ff88)
`,
          }}
        >
          <div
            style={{
              animation: "cargoGlow 1.4s ease-in-out infinite",
            }}
          >
            <div
              style={{
                position: "absolute",
                left: "50%",
                top: -40,
                transform: "translateX(-50%)",
                width: 10,
                height: 40,
                background: "linear-gradient(180deg,transparent,#ffd84d)",
                filter: "blur(6px)",
                opacity: 0.7,
              }}
            />
            <CrateSVG size={52} />
          </div>
        </div>
      ))}

      {/* Coins */}
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
              filter: "drop-shadow(0 0 6px #ffd84d99)",
            }}
          >
            <CoinSVG size={28} />
          </div>
        </div>
      ))}
      {/* Fuel Cans */}
      {fuelCans.map((f) => (
        <div
          key={f.id}
          style={{
            position: "absolute",
            left: `${f.x}%`,
            top: `${f.y}%`,
            transform: "translate(-50%, -50%)",
            zIndex: 9,
            filter:
              "drop-shadow(0 0 12px #4fc3ff) drop-shadow(0 0 24px #4fc3ff88)",
          }}
        >
          <FuelCanSVG size={40} />
        </div>
      ))}
      {/* Laser Walls */}
      {laserWalls.map((wall) => (
        <div key={wall.id}>
          {/* Left laser */}
          <div
            style={{
              position: "absolute",
              left: 0,
              top: `${wall.y}%`,
              width: `${wall.gapX - 12}%`,
              height: 10,
              background: "linear-gradient(90deg,#ff2222,#ff8888,#ff2222)",
              boxShadow: `
0 0 8px #ff2222,
0 0 16px #ff2222,
0 0 24px #ff5555
`,
              zIndex: 12,
            }}
          />

          {/* Right laser */}
          <div
            style={{
              position: "absolute",
              left: `${wall.gapX + 12}%`,
              top: `${wall.y}%`,
              width: `${100 - (wall.gapX + 12)}%`,
              height: 10,
              background: "#ff3355",
              boxShadow: "0 0 12px #ff3355",
              zIndex: 12,
            }}
          />
        </div>
      ))}
      {/* Enemy Drones */}
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
          <div
            style={{
              width: 42,
              height: 22,
              borderRadius: 12,
              background: "linear-gradient(90deg,#ff4444,#ff8888,#ff4444)",
              boxShadow: `
          0 0 8px #ff4444,
          0 0 16px #ff4444
        `,
              position: "relative",
            }}
          >
            <div
              style={{
                position: "absolute",
                left: -8,
                top: 8,
                width: 58,
                height: 4,
                background: "#aaa",
              }}
            />

            <div
              style={{
                position: "absolute",
                left: 14,
                top: 5,
                width: 12,
                height: 12,
                borderRadius: "50%",
                background: "#4fc3ff",
              }}
            />
          </div>
        </div>
      ))}
      {/* Score Popups */}
      {(scorePopups ?? []).map((p) => (
        <div
          key={p.id}
          style={{
            position: "absolute",
            left: `${p.x}%`,
            top: `${p.y}%`,
            fontFamily: "'Fredoka One',cursive",
            fontSize: 20,
            color: "#ffd84d",
            textShadow: "0 0 12px #ffd84d",
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
