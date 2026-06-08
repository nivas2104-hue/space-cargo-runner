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

  return (
    <div>
      <h1>PLAYER PROFILE</h1>

      <h2>{username}</h2>

      <p>Level: {level}</p>
      <p>XP: {xp}</p>
      <p>Best Score: {bestScore}</p>
      <p>Total Coins: {totalCoins}</p>

      <button onClick={onBack}>Back</button>
    </div>
  );
}
