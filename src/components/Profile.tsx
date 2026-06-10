import { useEffect } from "react";
import {
  COLOR,
  FONT,
  RADIUS,
  CLS,
  BracketFrame,
  PrimaryButton,
  CoinDisplay,
  injectGlobalStyles,
} from "./design-system";

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
  useEffect(() => {
    injectGlobalStyles();
  }, []);
  function calculateLevel(totalXP: number) {
    let level = 1;
    let xpNeeded = 200;
    let remainingXP = totalXP;

    while (remainingXP >= xpNeeded) {
      remainingXP -= xpNeeded;
      level++;
      xpNeeded += 300;
    }

    return {
      level,
      currentXP: remainingXP,
      xpToNext: xpNeeded,
    };
  }

  const player = calculateLevel(xp);

  const level = player.level;
  const xpProgress = player.currentXP;
  const xpNeeded = player.xpToNext;

  const xpPct = (xpProgress / xpNeeded) * 100;
  const loginTypeRaw = localStorage.getItem("loginType");

  const loginType =
    loginTypeRaw === "telegram"
      ? "TELEGRAM"
      : loginTypeRaw === "wallet"
        ? "WALLET"
        : "GUEST";
  const stats = [
    { label: "LEVEL", value: String(level), color: COLOR.cyan },
    {
      label: "BEST SCORE",
      value: Number(bestScore).toLocaleString(),
      color: "#fff",
    },
    {
      label: "TOTAL XP",
      value: Number(xp).toLocaleString(),
      color: COLOR.amber,
    },
    {
      label: "LOGIN TYPE",
      value: loginType,
      color: COLOR.textSecondary,
      isText: true,
    },
  ];
  const isTelegram = !!(window as any).Telegram?.WebApp?.initDataUnsafe?.user;

  const hasWallet = !!localStorage.getItem("walletAddress");
  return (
    <div
      style={{
        minHeight: "100vh",
        background: `radial-gradient(ellipse at 50% 25%, #0D1830 0%, ${COLOR.bgDeep} 65%)`,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "20px",
      }}
    >
      <BracketFrame
        style={{
          width: "100%",
          maxWidth: 380,
          background: "rgba(17,24,39,0.9)",
          backdropFilter: "blur(16px)",
          border: `1px solid ${COLOR.borderPanel}`,
          borderRadius: RADIUS.md,
          padding: "28px 24px",
          boxShadow:
            "0 12px 50px rgba(0,0,0,0.7), inset 0 1px 0 rgba(255,255,255,0.04)",
          animation: "fadeUp 0.4s ease both",
        }}
      >
        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: 22 }}>
          <div
            style={{
              width: 32,
              height: 2,
              background: COLOR.cyan,
              margin: "0 auto 14px",
              boxShadow: "0 0 8px rgba(0,229,255,0.8)",
            }}
          />
          <div
            style={{
              fontFamily: FONT.heading,
              fontWeight: 900,
              fontSize: 18,
              letterSpacing: "0.2em",
              color: "#fff",
              marginBottom: 8,
            }}
          >
            PLAYER PROFILE
          </div>

          {/* Username badge */}
          <div
            style={{
              display: "inline-block",
              background: "rgba(0,229,255,0.06)",
              border: `1px solid ${COLOR.borderPanel}`,
              borderRadius: RADIUS.md,
              padding: "6px 18px",
            }}
          >
            <span
              style={{
                fontFamily: FONT.ui,
                fontWeight: 600,
                fontSize: 16,
                letterSpacing: "0.08em",
                color: COLOR.cyan,
              }}
            >
              {username}
            </span>
          </div>
        </div>

        {/* XP progress bar */}
        <div style={{ marginBottom: 20 }}>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: 6,
            }}
          >
            <span
              style={{
                fontFamily: FONT.ui,
                fontWeight: 600,
                fontSize: 10,
                letterSpacing: "0.15em",
                color: COLOR.textMuted,
                textTransform: "uppercase",
              }}
            >
              XP PROGRESS
            </span>
            <span
              className={CLS.numReadout}
              style={{
                fontFamily: FONT.mono,
                fontSize: 11,
                color: COLOR.amber,
              }}
            >
              {xpProgress} / {xpNeeded}{" "}
            </span>
          </div>
          <div
            style={{
              height: 8,
              background: "rgba(255,255,255,0.07)",
              borderRadius: 2,
              overflow: "hidden",
            }}
          >
            <div
              style={{
                width: `${xpPct}%`,
                height: "100%",
                borderRadius: 2,
                background: `linear-gradient(90deg, ${COLOR.amber}, #FFD080)`,
                boxShadow: `0 0 8px ${COLOR.amberGlow}`,
                transition: "width 0.6s ease",
              }}
            />
          </div>
          <div
            style={{
              fontFamily: FONT.ui,
              fontSize: 10,
              color: COLOR.textMuted,
              marginTop: 4,
              textAlign: "right",
            }}
          >
            LVL {level} → LVL {level + 1}
          </div>
        </div>

        {/* Stats */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 0,
            marginBottom: 20,
          }}
        >
          {stats.map((s, i) => (
            <div
              key={s.label}
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                padding: "10px 0",
                borderBottom:
                  i < stats.length - 1
                    ? "1px solid rgba(255,255,255,0.06)"
                    : "none",
              }}
            >
              <span
                style={{
                  fontFamily: FONT.ui,
                  fontWeight: 600,
                  fontSize: 11,
                  letterSpacing: "0.15em",
                  color: COLOR.textMuted,
                  textTransform: "uppercase",
                }}
              >
                {s.label}
              </span>
              {s.isText ? (
                <span
                  style={{
                    fontFamily: FONT.ui,
                    fontWeight: 700,
                    fontSize: 13,
                    color: s.color,
                    letterSpacing: "0.1em",
                  }}
                >
                  {s.value}
                </span>
              ) : (
                <span
                  className={CLS.numReadout}
                  style={{
                    fontFamily: FONT.mono,
                    fontSize: 16,
                    fontWeight: 700,
                    color: s.color,
                  }}
                >
                  {s.value}
                </span>
              )}
            </div>
          ))}
        </div>

        {/* Coins readout */}
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            padding: "12px",
            background: "rgba(255,181,71,0.06)",
            border: "1px solid rgba(255,181,71,0.2)",
            borderRadius: RADIUS.md,
            marginBottom: 20,
          }}
        >
          <CoinDisplay value={totalCoins} size="lg" />
        </div>
        <PrimaryButton
          onClick={() => {
            const isTelegram = (window as any).Telegram?.WebApp?.initDataUnsafe
              ?.user;

            if (!isTelegram) {
              localStorage.removeItem("username");
              localStorage.removeItem("loginType");
            }

            localStorage.removeItem("walletAddress");

            window.location.reload();
          }}
          style={{
            width: "100%",
            marginBottom: 10,
            background: "#ff5757",
          }}
        >
          {hasWallet
            ? "DISCONNECT WALLET"
            : isTelegram
              ? "TELEGRAM ACCOUNT"
              : "SWITCH ACCOUNT"}
        </PrimaryButton>
        <PrimaryButton
          onClick={onBack}
          style={{ width: "100%", padding: "13px 0", fontSize: 14 }}
        >
          ← BACK
        </PrimaryButton>
      </BracketFrame>
    </div>
  );
}
