type Props = {
  username: string;
  xp: number;
  bestScore: number;
  totalCoins: number;
  onBack: () => void;
};

export default function Profile({
  username,
  xp,
  bestScore,
  totalCoins,
  onBack,
}: Props) {
  const level = Math.floor(xp / 200) + 1;
  const xpProgress = xp % 200;

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#07001c",
        color: "white",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "20px",
      }}
    >
      <div
        style={{
          width: "400px",
          border: "2px solid #8a2be2",
          borderRadius: "20px",
          padding: "30px",
          background: "#120028",
          boxShadow: "0 0 25px #8a2be2",
        }}
      >
        <h1
          style={{
            textAlign: "center",
            color: "#d38cff",
            marginBottom: "20px",
          }}
        >
          PLAYER PROFILE
        </h1>

        <h2
          style={{
            textAlign: "center",
            color: "#ffffff",
          }}
        >
          {username}
        </h2>

        <p>⭐ Level: {level}</p>

        <p>✨ XP: {xp}</p>

        <div
          style={{
            height: "12px",
            background: "#2d174d",
            borderRadius: "10px",
            overflow: "hidden",
            marginBottom: "20px",
          }}
        >
          <div
            style={{
              width: `${(xpProgress / 200) * 100}%`,
              height: "100%",
              background: "#ffd700",
            }}
          />
        </div>

        <p>🏆 Best Score: {bestScore}</p>

        <p>🪙 Total Coins: {totalCoins}</p>

        <button
          onClick={onBack}
          style={{
            width: "100%",
            marginTop: "20px",
            padding: "12px",
            borderRadius: "10px",
            border: "none",
            background: "#ffd700",
            fontWeight: "bold",
            cursor: "pointer",
          }}
        >
          BACK
        </button>
      </div>
    </div>
  );
}
