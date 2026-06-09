// BackgroundEffects — updated to use design system palette
// Navy/cyan nebulas replace the old purple blobs
// Warp lines use cyan → soft cyan gradient (consistent with UI accent)
// All logic and props unchanged — pure visual layer update

interface Star {
  id: number;
  x: number;
  size: number;
  opacity: number;
  duration: number;
  delay: number;
  color: string;
}
interface WarpLine {
  id: number;
  x: number;
  width: number;
  height: number;
  duration: number;
  delay: number;
  opacity: number;
}
interface BackgroundEffectsProps {
  stars: Star[];
  warpLines: WarpLine[];
  level: number;
}

export default function BackgroundEffects({
  stars,
  warpLines,
  level,
}: BackgroundEffectsProps) {
  return (
    <>
      {/* Nebula blob — top-left, deep navy */}
      <div
        style={{
          position: "absolute",
          width: 340,
          height: 340,
          top: -100,
          left: -120,
          borderRadius: "50%",
          background: "rgba(0,80,160,0.1)",
          filter: "blur(80px)",
          pointerEvents: "none",
          animation: "nebulaDrift 18s ease-in-out infinite",
        }}
      />

      {/* Nebula blob — mid-right, cyan hint */}
      <div
        style={{
          position: "absolute",
          width: 260,
          height: 260,
          top: "30%",
          right: -100,
          borderRadius: "50%",
          background: "rgba(0,150,200,0.07)",
          filter: "blur(70px)",
          pointerEvents: "none",
          animation: "nebulaDrift 22s 4s ease-in-out infinite",
        }}
      />

      {/* Nebula blob — bottom-left, darker */}
      <div
        style={{
          position: "absolute",
          width: 200,
          height: 200,
          bottom: "20%",
          left: -60,
          borderRadius: "50%",
          background: "rgba(0,60,120,0.08)",
          filter: "blur(60px)",
          pointerEvents: "none",
          animation: "nebulaDrift 26s 8s ease-in-out infinite",
        }}
      />

      {/* Warp lines — cyan consistent with UI */}
      {warpLines.map((l) => {
        const warpOpacity =
          level < 5
            ? l.opacity * 0.15
            : level < 10
              ? l.opacity * 0.35
              : level < 15
                ? l.opacity * 0.6
                : l.opacity;

        return (
          <div
            key={l.id}
            style={{
              position: "absolute",
              left: `${l.x}%`,
              top: 0,
              width: 2 + level * 0.3,
              height: 60 + level * 4,
              transform: "rotate(-12deg)",
              background: `linear-gradient(
              180deg,
              transparent,
              rgba(0,229,255,${warpOpacity * 0.7}),
              rgba(79,209,255,${warpOpacity}),
              transparent
            )`,
              boxShadow: `0 0 6px rgba(0,229,255,${warpOpacity * 0.5})`,
              filter: `blur(${Math.min(1 + level * 0.05, 2.5)}px)`,
              animation: `warpLine ${Math.max(l.duration - level * 0.03, 1.5)}s ${l.delay}s linear infinite`,
              pointerEvents: "none",
            }}
          />
        );
      })}

      {/* Stars */}
      {stars.map((s) => (
        <div
          key={s.id}
          style={{
            position: "absolute",
            left: `${s.x}%`,
            top: 0,
            width: s.size,
            height: s.size,
            borderRadius: "50%",
            background: s.color,
            boxShadow: s.size > 1.5 ? `0 0 ${s.size * 2}px ${s.color}` : "none",
            animation: `scrollStar ${s.duration}s ${s.delay}s linear infinite, twinkle ${2 + (s.id % 4)}s ease-in-out ${(s.id % 8) * 0.3}s infinite alternate`,
            pointerEvents: "none",
          }}
        />
      ))}
    </>
  );
}
