import ShipSVG from "../components/ShipSVG";
import { useEffect, useState } from "react";
interface GameOverProps {
  score: number;
  coins: number;
  cargo: number;
  onRetry: () => void;
}

export default function GameOver({
  score,
  coins,
  cargo,
  onRetry,
}: GameOverProps) {
  const [leaderboard, setLeaderboard] = useState<any[]>([]);
  useEffect(() => {
    fetch("https://space-cargo-runner.onrender.com/leaderboard")
      .then((res) => res.json())
      .then((data) => {
        setLeaderboard(data.slice(0, 10));
      })
      .catch(console.error);
  }, []);
  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        background: "rgba(5,0,20,0.92)",
        backdropFilter: "blur(12px)",
        zIndex: 1000,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "24px",
      }}
    >
      <h1
        style={{
          margin: 0,
          marginBottom: 24,
          fontFamily: "'Fredoka One', cursive",
          fontSize: 72,
          color: "#d7b3ff",
          letterSpacing: 6,
          textShadow: `
            0 0 15px #b44fff,
            0 0 35px #b44fff,
            0 0 70px #7b00e0
          `,
        }}
      >
        GAME OVER
      </h1>

      <div
        style={{
          position: "relative",
          marginBottom: 40,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {/* Glow behind ship */}
        <div
          style={{
            position: "absolute",
            width: 220,
            height: 220,
            borderRadius: "50%",
            background:
              "radial-gradient(circle, rgba(180,79,255,0.35) 0%, transparent 70%)",
            filter: "blur(18px)",
          }}
        />

        {/* Ship */}
        <div
          style={{
            transform: "scale(2.8) rotate(18deg)",
            filter: `
        drop-shadow(0 0 20px #b44fff)
        drop-shadow(0 0 40px #b44fff88)
      `,
            animation: "shipFloat 2.2s ease-in-out infinite",
            zIndex: 2,
          }}
        >
          {/* Smoke */}
          {[0, 1, 2, 3].map((i) => (
            <div
              key={i}
              style={{
                position: "absolute",
                top: 20 + i * 12,
                left: -20 - i * 8,
                width: 24 + i * 6,
                height: 24 + i * 6,
                borderRadius: "50%",
                background: "rgba(255,255,255,0.06)",
                filter: "blur(12px)",
                animation: `nebulaDrift ${4 + i}s ease-in-out infinite`,
              }}
            />
          ))}
          <div
            style={{
              opacity: 0.9,
              filter: "grayscale(0.15)",
            }}
          >
            <ShipSVG color="#b44fff" />
          </div>{" "}
        </div>
      </div>
      <div
        style={{
          width: 420,
          maxWidth: "92%",
          background: "rgba(20,0,60,0.78)",
          backdropFilter: "blur(14px)",
          border: "2px solid rgba(180,79,255,0.35)",
          borderRadius: 34,
          padding: "28px",
          marginBottom: 28,
          boxShadow: `
            inset 0 0 40px rgba(180,79,255,0.08),
            0 0 40px rgba(180,79,255,0.18)
          `,
        }}
      >
        <Row
          label="Score"
          value={Number(score ?? 0).toLocaleString()}
          color="#ffffff"
        />{" "}
        <Row label="Coins" value={String(coins ?? 0)} color="#ffd84d" />
        <Row label="Cargo" value={String(cargo ?? 0)} color="#4fc3ff" />
        <Row
          label="Distance"
          value={`${(score / 100).toFixed(1)} km`}
          color="#c966ff"
          last
        />
      </div>
      <div
        style={{
          width: 420,
          maxWidth: "92%",
          background: "rgba(20,0,60,0.78)",
          border: "2px solid rgba(180,79,255,0.35)",
          borderRadius: 24,
          padding: 20,
          marginBottom: 24,
        }}
      >
        <div
          style={{
            color: "#ffd84d",
            textShadow: "0 0 12px #ffd84d",
            fontSize: 22,
            fontWeight: 900,
            marginBottom: 16,
            textAlign: "center",
          }}
        >
          🏆 LEADERBOARD
        </div>

        {leaderboard.length === 0 ? (
          <div
            style={{
              color: "#aaa",
              textAlign: "center",
            }}
          >
            No Scores Yet
          </div>
        ) : (
          leaderboard.map((entry: any, index: number) => {
            const isTop = index === 0;

            return (
              <div
                key={index}
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  marginBottom: 8,
                  color: isTop ? "#ffd84d" : "#fff",
                  fontSize: 14,
                  fontWeight: isTop ? 900 : 500,
                  textShadow: isTop ? "0 0 10px #ffd84d" : "none",
                }}
              >
                <span>
                  {index === 0
                    ? "🥇"
                    : index === 1
                      ? "🥈"
                      : index === 2
                        ? "🥉"
                        : `#${index + 1}`}
                </span>
                <span>{entry.user_id}</span>

                <span
                  style={{
                    color: "#ffd84d",
                    fontWeight: 800,
                  }}
                >
                  {entry.score}
                </span>
              </div>
            );
          })
        )}
      </div>
      <button
        onClick={onRetry}
        style={{
          width: 400,
          maxWidth: "92%",
          height: 72,
          border: "none",
          borderRadius: 999,
          cursor: "pointer",
          marginBottom: 12,
          fontFamily: "'Fredoka One',cursive",
          fontSize: 28,
          letterSpacing: 2,
          color: "#fff",
          background: "linear-gradient(180deg,#ffd84d 0%,#ffb21f 100%)",
          boxShadow: `
            0 8px 0 #cc7a00,
            0 0 40px rgba(255,216,77,0.45)
          `,
        }}
      >
        PLAY AGAIN
      </button>
      <button
        style={{
          width: 360,
          maxWidth: "92%",
          height: 64,
          borderRadius: 999,
          border: "2px solid rgba(180,79,255,0.4)",
          background: "rgba(20,0,60,0.8)",
          color: "#c966ff",
          fontFamily: "'Fredoka One',cursive",
          fontSize: 22,
          cursor: "pointer",
          boxShadow: "0 0 20px rgba(180,79,255,0.25)",
        }}
      >
        HANGAR
      </button>

      <div
        style={{
          marginTop: 20,
          color: "rgba(255,255,255,0.22)",
          letterSpacing: 5,
          fontSize: 12,
          fontWeight: 800,
        }}
      >
        COLLECT • DODGE • SURVIVE
      </div>
    </div>
  );
}

function Row({
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
  const icon =
    label === "Score"
      ? "✦"
      : label === "Coins"
        ? "◉"
        : label === "Cargo"
          ? "▣"
          : "⌖";

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        marginBottom: last ? 0 : 18,
        paddingBottom: last ? 0 : 18,
        borderBottom: last ? "none" : "1px solid rgba(255,255,255,0.08)",
      }}
    >
      <span
        style={{
          color,
          fontSize: 22,
          width: 26,
          textAlign: "center",
          marginRight: 10,
          textShadow: `0 0 10px ${color}`,
        }}
      >
        {icon}
      </span>

      <span
        style={{
          color,
          fontSize: 22,
          fontWeight: 800,
          minWidth: 90,
        }}
      >
        {label}
      </span>

      <div
        style={{
          flex: 1,
          margin: "0 12px",
          borderBottom: `2px dotted ${color}55`,
        }}
      />

      <span
        style={{
          color,
          fontSize: 26,
          fontWeight: 900,
          textShadow: `0 0 12px ${color}55`,
        }}
      >
        {value}
      </span>
    </div>
  );
}
