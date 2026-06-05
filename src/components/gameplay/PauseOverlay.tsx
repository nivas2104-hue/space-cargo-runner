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
  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        background: "rgba(7,0,28,0.82)",
        backdropFilter: "blur(6px)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 50,
      }}
    >
      <div
        style={{
          fontFamily: "'Fredoka One',cursive",
          fontSize: 52,
          letterSpacing: 4,
          background:
            "linear-gradient(180deg,#fff 0%,#c8aaff 40%,#7b00e0 100%)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          backgroundClip: "text",
          filter: "drop-shadow(0 0 22px #b44fff)",
          marginBottom: 8,
        }}
      >
        PAUSED
      </div>

      <div
        style={{
          fontSize: 12,
          fontWeight: 900,
          color: "rgba(255,255,255,0.28)",
          letterSpacing: 5,
          textTransform: "uppercase",
          marginBottom: 32,
        }}
      >
        tap anywhere to resume
      </div>

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 8,
          alignItems: "center",
        }}
      >
        {[
          { label: "Score", val: score.toLocaleString(), color: "#fff" },
          { label: "Coins", val: `🪙 ${coins}`, color: "#ffd84d" },
          { label: "Cargo", val: `${cargo} crates`, color: "#ffd84d" },
        ].map((row) => (
          <div
            key={row.label}
            style={{
              display: "flex",
              gap: 20,
              alignItems: "center",
            }}
          >
            <span
              style={{
                fontSize: 12,
                fontWeight: 900,
                color: "rgba(255,255,255,0.32)",
                letterSpacing: 2,
                width: 50,
                textAlign: "right",
              }}
            >
              {row.label}
            </span>

            <span
              style={{
                fontFamily: "'Fredoka One',cursive",
                fontSize: 20,
                color: row.color,
                textShadow: `0 0 10px ${row.color}55`,
              }}
            >
              {row.val}
            </span>
          </div>
        ))}
      </div>

      <button
        onClick={onResume}
        style={{
          marginTop: 32,
          fontFamily: "'Fredoka One',cursive",
          fontSize: 22,
          letterSpacing: 3,
          color: "#fff",
          background: "linear-gradient(180deg,#c966ff,#6600cc)",
          border: "none",
          borderRadius: 999,
          padding: "14px 48px",
          cursor: "pointer",
          boxShadow: "0 5px 0 #3d007a, 0 0 22px #b44fff55",
        }}
      >
        ▶ RESUME
      </button>
    </div>
  );
}
