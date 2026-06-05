import { useState, useEffect, useRef, useCallback } from "react";
import ShipSVG from "../components/ShipSVG";
import PauseOverlay from "./gameplay/PauseOverlay";
import GameplayHUD from "./gameplay/GameplayHUD";
import BackgroundEffects from "./gameplay/BackgroundEffects";
import { CrateSVG, HeartSVG, FuelBolt } from "./gameplay/GameSVGs";
import GameObjects from "./gameplay/GameObjects";
// ─── Types ────────────────────────────────────────────────────────────────────
interface GameplayScreenProps {
  initialLives?: number;
  initialCoins?: number;
  initialFuel?: number;
  level?: number;
  onPause?: () => void;
  onGameOver?: (score: number, coins: number, cargo: number) => void;
}

interface Star {
  id: number;
  x: number;
  size: number;
  opacity: number;
  duration: number;
  delay: number;
  color: string;
}

interface CargoCrate {
  id: number;
  x: number;
  y: number;
  speed: number;
  coinValue: number;
}

interface FloatingCoin {
  id: number;
  x: number;
  y: number;
  speed: number;
}
interface FuelCan {
  id: number;
  x: number;
  y: number;
  speed: number;
}
interface Asteroid {
  id: number;
  x: number;
  y: number;
  size: number;
  speed: number;
  rotateSpeed: number;
  isMeteor?: boolean;
}
interface LaserWall {
  id: number;
  gapX: number;
  y: number;
  speed: number;
}
interface Drone {
  id: number;
  x: number;
  y: number;
  speed: number;
  direction: 1 | -1;
}
// ─── CSS Injection ────────────────────────────────────────────────────────────
const injectStyles = () => {
  if (document.getElementById("scr-gameplay-styles")) return;
  const el = document.createElement("style");
  el.id = "scr-gameplay-styles";
  el.textContent = `
    @import url('https://fonts.googleapis.com/css2?family=Fredoka+One&family=Nunito:wght@700;800;900&display=swap');

    @keyframes scrollStar {
      from { transform: translateY(-10px); }
      to   { transform: translateY(105vh); }
    }
    @keyframes scrollStarFast {
      from { transform: translateY(-10px); }
      to   { transform: translateY(105vh); }
    }
    @keyframes fallObj {
      0%   { transform: translateY(-120px) translateX(0); opacity: 1; }
      95%  { opacity: 1; }
      100% { transform: translateY(110vh) translateX(0); opacity: 0; }
    }
    @keyframes fallObjWobble {
      0%   { transform: translateY(-120px) translateX(0px) rotate(0deg); opacity: 1; }
      25%  { transform: translateY(25vh)   translateX(8px)  rotate(90deg); }
      50%  { transform: translateY(50vh)   translateX(-6px) rotate(180deg); }
      75%  { transform: translateY(75vh)   translateX(10px) rotate(270deg); }
      100% { transform: translateY(110vh)  translateX(0px)  rotate(360deg); opacity: 0; }
    }
    @keyframes twinkle {
      from { opacity: 0.1; }
      to   { opacity: 0.9; }
    }
    @keyframes thrusterFlame {
      0%,100% { transform: scaleX(1) scaleY(1); opacity: 0.9; }
      33%     { transform: scaleX(0.85) scaleY(1.15); opacity: 1; }
      66%     { transform: scaleX(1.1) scaleY(0.9); opacity: 0.75; }
    }
    @keyframes thrusterGlow {
      0%,100% { opacity: 0.6; transform: scaleX(1); }
      50%     { opacity: 1; transform: scaleX(1.15); }
    }
    @keyframes shipFloat {
      0%,100% { transform: translateY(0px); }
      50%     { transform: translateY(-6px); }
    }
    @keyframes shipMove {
      0%,100% { left: calc(50% - 50px); }
    }
    @keyframes shimmer {
      0%       { left: -100%; }
      60%,100% { left: 160%; }
    }
    @keyframes fuelPulse {
      0%,100% { opacity: 1; }
      50%     { opacity: 0.45; }
    }
    @keyframes pausePulse {
      0%,100% { box-shadow: 0 0 14px #b44fff55; }
      50%     { box-shadow: 0 0 28px #b44fff99; }
    }
    @keyframes coinSpin {
      from { transform: rotateY(0deg); }
      to   { transform: rotateY(360deg); }
    }
    @keyframes scoreFlash {
      0%  { transform: scale(1.2); color: #ffd84d; }
      100%{ transform: scale(1);   color: #fff; }
    }
    @keyframes nebulaDrift {
      0%,100% { transform: translate(0,0) scale(1); }
      33%     { transform: translate(12px,-8px) scale(1.04); }
      66%     { transform: translate(-8px,10px) scale(0.97); }
    }
    @keyframes cargoGlow {
      0%,100% { box-shadow: 0 0 12px #ffd84d44; }
      50%     { box-shadow: 0 0 22px #ffd84d99; }
    }
    @keyframes asteroidSpin {
      from { transform: rotate(0deg); }
      to   { transform: rotate(360deg); }
    }
    @keyframes heartBeat {
      0%,100% { transform: scale(1); }
      50%     { transform: scale(1.2); }
    }
    @keyframes warpLine {
      from { transform: translateY(-100%); opacity: 0.6; }
      to   { transform: translateY(110vh); opacity: 0; }
    }
    @keyframes crateFloat {
      0%,100% { transform: translateY(-120px) rotate(-3deg); }
      50%     { transform: translateY(-120px) translateX(4px) rotate(3deg); }
    }
    @keyframes collected {
      0%   { transform: scale(1); opacity: 1; }
      100% { transform: scale(2.5); opacity: 0; }
    }
    @keyframes scorePopup {
      0%   { transform: translateY(0); opacity: 1; }
      100% { transform: translateY(-60px); opacity: 0; }
    }
    .scr-hud-glass {
      background: rgba(7,0,28,0.78);
      border: 1.5px solid rgba(180,79,255,0.45);
      backdrop-filter: blur(8px);
      box-shadow: 0 0 18px rgba(180,79,255,0.25), inset 0 0 14px rgba(180,79,255,0.06);
    }
    .scr-btn-press:active {
      transform: scale(0.93) !important;
    }
  `;
  document.head.appendChild(el);
};

// ─── Deterministic seeded random ──────────────────────────────────────────────
const seededRand = (seed: number) => {
  let s = seed;
  return () => {
    s = (s * 16807 + 0) % 2147483647;
    return (s - 1) / 2147483646;
  };
};

// ─── Generate game objects ────────────────────────────────────────────────────
const generateStars = (): Star[] => {
  const r = seededRand(42);
  return Array.from({ length: 80 }, (_, i) => ({
    id: i,
    x: r() * 100,
    size: i % 6 === 0 ? 2.5 : i % 3 === 0 ? 1.5 : 1,
    opacity: 0.15 + r() * 0.7,
    duration: 4 + r() * 12,
    delay: -(r() * 16),
    color: i % 9 === 0 ? "#b44fff" : i % 13 === 0 ? "#4fc3ff" : "#fff",
  }));
};

const generateWarpLines = () => {
  const r = seededRand(77);

  return Array.from({ length: 18 }, (_, i) => ({
    id: i,

    x: r() * 100,

    width: 1 + r() * 1,

    height: 40 + r() * 80,

    duration: 0.4 + r() * 0.5,

    delay: -(r() * 1.5),

    opacity: 0.08 + r() * 0.12,
  }));
};

let asteroidCounter = 100;
const spawnAsteroid = (r: () => number): Asteroid => {
  const lanes = [12, 25, 38, 52, 65, 78, 88];

  return {
    id: asteroidCounter++,
    x: lanes[Math.floor(r() * lanes.length)] + (r() * 6 - 3),
    y: -10,
    size: 28 + Math.floor(r() * 36),
    speed: 0.008 + r() * 0.004,
    rotateSpeed: (1 + r() * 3) * (r() > 0.5 ? 1 : -1),
  };
};

let crateCounter = 200;
const spawnCrate = (r: () => number): CargoCrate => ({
  id: crateCounter++,
  x: 8 + r() * 84,
  y: -10,
  speed: 0.006 + r() * 0.003,
  coinValue: r() > 0.7 ? 20 : 10,
});

let coinCounter = 300;
const spawnCoin = (r: () => number): FloatingCoin => ({
  id: coinCounter++,
  x: 8 + r() * 84,
  y: -10,
  speed: 0.007 + r() * 0.003,
});

let laserCounter = 1000;
const spawnLaserWall = (r: () => number): LaserWall => ({
  id: laserCounter++,
  gapX: 20 + r() * 60,
  y: -10,
  speed: 0.007,
});

let fuelCounter = 500;
const spawnFuelCan = (r: () => number): FuelCan => ({
  id: fuelCounter++,
  x: 8 + r() * 84,
  y: -10,
  speed: 0.006 + r() * 0.002,
});

let droneCounter = 2000;
const spawnDrone = (r: () => number): Drone => {
  const fromLeft = r() > 0.5;

  return {
    id: droneCounter++,
    x: fromLeft ? -10 : 110,
    y: 45 + r() * 30,
    speed: 0.018 + r() * 0.008,
    direction: fromLeft ? 1 : -1,
  };
};
// ─── Main Component ────────────────────────────────────────────────────────────
export default function GameplayScreen({
  initialLives = 3,
  initialCoins = 0,
  initialFuel = 100,
  level = 1,
  onPause,
  onGameOver,
}: GameplayScreenProps) {
  const [lives, setLives] = useState(initialLives);
  const [coins, setCoins] = useState(initialCoins);

  const savedUpgrades = JSON.parse(localStorage.getItem("upgrades") || "[]");

  const engineLevel =
    savedUpgrades.find((u: any) => u.id === "engine")?.cur || 0;

  const shieldLevel =
    savedUpgrades.find((u: any) => u.id === "shield")?.cur || 0;

  const fuelLevel = savedUpgrades.find((u: any) => u.id === "fuel")?.cur || 0;
  const maxFuel = 100 + fuelLevel * 25;
  const magnetLevel =
    savedUpgrades.find((u: any) => u.id === "magnet")?.cur || 0;

  const [fuel, setFuel] = useState(initialFuel + fuelLevel * 25);
  const [score, setScore] = useState(0);
  const [currentLevel, setCurrentLevel] = useState(1);
  const [cargo, setCargo] = useState(0);
  const [showDeliveryPortal, setShowDeliveryPortal] = useState(false);
  const [portalTimer, setPortalTimer] = useState(10);
  const [isPaused, setIsPaused] = useState(false);
  const [shipX, setShipX] = useState(50); // percent
  const [asteroids, setAsteroids] = useState<Asteroid[]>([]);
  const [crates, setCrates] = useState<CargoCrate[]>([]);
  const scoreRef = useRef(0);
  const coinsRef = useRef(0);
  const cargoRef = useRef(0);

  useEffect(() => {
    scoreRef.current = score;
  }, [score]);

  useEffect(() => {
    coinsRef.current = coins;
  }, [coins]);
  useEffect(() => {
    if (!showDeliveryPortal) return;

    const timer = setInterval(() => {
      setPortalTimer((prev) => {
        if (prev <= 1) {
          setShowDeliveryPortal(false);
          setCargo(0);

          return 0;
        }

        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [showDeliveryPortal]);
  useEffect(() => {
    cargoRef.current = cargo;
  }, [cargo]);
  const [floatingCoins, setFloatingCoins] = useState<FloatingCoin[]>([]);

  const [fuelCans, setFuelCans] = useState<FuelCan[]>([]);
  const [laserWalls, setLaserWalls] = useState<LaserWall[]>([]);
  const [drones, setDrones] = useState<Drone[]>([]);
  const [scorePopups, setScorePopups] = useState<
    { id: number; x: number; y: number; val: string }[]
  >([]);
  const selectedShip = localStorage.getItem("selectedShip") || "viper";
  const shipTheme =
    selectedShip === "falcon"
      ? "#4fc3ff"
      : selectedShip === "storm"
        ? "#ff6688"
        : selectedShip === "nebula"
          ? "#ffd84d"
          : selectedShip === "phantom"
            ? "#00ffaa"
            : "#b44fff";

  const savedShips = JSON.parse(localStorage.getItem("ships") || "[]");
  const [deliveries, setDeliveries] = useState(0);
  const currentShip = savedShips.find((s: any) => s.id === selectedShip);

  const shipSpeed = currentShip?.spd || 50;
  const shipShield = currentShip?.shd || 50;
  const shipCargo = currentShip?.cap || 50;
  const cargoCapacity = Math.floor(shipCargo / 5);

  const stars = useRef<Star[]>(generateStars());
  const warpLines = useRef(generateWarpLines());
  const randRef = useRef(seededRand(Date.now()));
  const frameRef = useRef<number>(0);
  const lastSpawnAsteroid = useRef(0);
  const lastMeteorShower = useRef(0);
  const lastSpawnCrate = useRef(0);
  const lastSpawnCoin = useRef(0);
  const lastSpawnFuel = useRef(0);
  const lastSpawnLaser = useRef(0);
  const lastSpawnDrone = useRef(0);
  const lastFuelTick = useRef(0);
  const shipXRef = useRef(50);
  const levelRef = useRef(1);
  const lastScoreTick = useRef(0);
  const gameTimeRef = useRef(0);
  const popupCounter = useRef(0);
  const lastTimeRef = useRef(performance.now());
  const [isGameOver, setIsGameOver] = useState(false);
  const [hitFlash, setHitFlash] = useState(false);
  const triggerGameOver = () => {
    console.log(
      "TRIGGER GAME OVER",
      scoreRef.current,
      coinsRef.current,
      cargoRef.current,
    );
    localStorage.setItem(
      "runStats",
      JSON.stringify({
        score: scoreRef.current,
        cargo: cargoRef.current,
        deliveries,
      }),
    );
    setIsGameOver(true);

    setTimeout(() => {
      onGameOver?.(scoreRef.current, coinsRef.current, cargoRef.current);
    }, 0);
  };
  useEffect(() => {
    injectStyles();
  }, []);
  const [highScore, setHighScore] = useState(
    Number(localStorage.getItem("highScore") || 0),
  );
  useEffect(() => {
    if (isGameOver && score > highScore) {
      localStorage.setItem("highScore", String(score));
      setHighScore(score);
    }
  }, [isGameOver]);
  const handlePause = useCallback(() => {
    setIsPaused((p) => !p);
    onPause?.();
  }, [onPause]);

  const handleShipMove = useCallback(
    (e: React.PointerEvent<HTMLDivElement>) => {
      const rect = e.currentTarget.getBoundingClientRect();
      const pct = ((e.clientX - rect.left) / rect.width) * 100;

      const newX = Math.max(8, Math.min(92, pct));

      setShipX((prev) => {
        const moveSpeed = Math.min(shipSpeed / 100, 0.95);
        const next = prev + (newX - prev) * moveSpeed;
        shipXRef.current = next;

        return next;
      });
    },
    [],
  );
  const checkCollision = (
    shipX: number,
    objX: number,
    objY: number,
    thresholdX = 8,
    thresholdY = 8,
  ) => {
    const SHIP_Y = 80;

    const dx = Math.abs(shipX - objX);
    const dy = Math.abs(SHIP_Y - objY);

    return dx <= thresholdX && dy <= thresholdY;
  };
  const addScorePopup = (x: number, y: number, val: string) => {
    const id = popupCounter.current++;
    setScorePopups((prev) => [...(prev ?? []).slice(-5), { id, x, y, val }]);
    setTimeout(
      () => setScorePopups((prev) => (prev ?? []).filter((p) => p.id !== id)),
      900,
    );
  };

  const tick = (now: number) => {
    const dt = now - lastTimeRef.current;
    lastTimeRef.current = now;
    gameTimeRef.current += dt;
    const t = gameTimeRef.current;

    // Spawn asteroids
    const asteroidInterval = Math.max(350, 1800 - levelRef.current * 120);
    if (t - lastSpawnAsteroid.current > asteroidInterval) {
      lastSpawnAsteroid.current = t;

      setAsteroids((prev) => [
        ...prev.slice(-30),
        spawnAsteroid(randRef.current),
      ]);
    }
    if (levelRef.current >= 10 && t - lastMeteorShower.current > 7000) {
      lastMeteorShower.current = t;

      setAsteroids((prev) => [
        ...prev,

        {
          ...spawnAsteroid(randRef.current),
          isMeteor: true,
          size: 45 + Math.random() * 40,
        },

        {
          ...spawnAsteroid(randRef.current),
          isMeteor: true,
          size: 45 + Math.random() * 40,
        },

        {
          ...spawnAsteroid(randRef.current),
          isMeteor: true,
          size: 45 + Math.random() * 40,
        },

        {
          ...spawnAsteroid(randRef.current),
          isMeteor: true,
          size: 45 + Math.random() * 40,
        },

        {
          ...spawnAsteroid(randRef.current),
          isMeteor: true,
          size: 45 + Math.random() * 40,
        },
      ]);
    }

    // Spawn crates
    const crateInterval = Math.max(800, 2800 - levelRef.current * 100);
    if (t - lastSpawnCrate.current > crateInterval) {
      lastSpawnCrate.current = t;
      setCrates((prev) => [...prev.slice(-8), spawnCrate(randRef.current)]);
    }

    // Spawn coins
    if (t - lastSpawnCoin.current > 1600) {
      lastSpawnCoin.current = t;
      setFloatingCoins((prev) => [
        ...prev.slice(-10),
        spawnCoin(randRef.current),
      ]);
    }

    //Spawn fuel cans
    if (t - lastSpawnFuel.current > 10000) {
      lastSpawnFuel.current = t;
      console.log("FUEL SPAWNED");
      setFuelCans((prev) => [...prev.slice(-3), spawnFuelCan(randRef.current)]);
    }
    // Fuel drain scales with level
    if (t - lastFuelTick.current > 400) {
      lastFuelTick.current = t;

      const fuelDrain = 0.8 + levelRef.current * 0.18;

      setFuel((f) => Math.max(0, f - fuelDrain));
    }
    if (levelRef.current >= 6 && t - lastSpawnLaser.current > 12000) {
      lastSpawnLaser.current = t;

      setLaserWalls((prev) => [
        ...prev.slice(-2),
        spawnLaserWall(randRef.current),
      ]);
    }
    // Score tick
    if (t - lastScoreTick.current > 100) {
      lastScoreTick.current = t;
      setScore((s) => {
        const newScore = s + 5;
        const newLevel = Math.floor(newScore / 1000) + 1;

        levelRef.current = newLevel;
        setCurrentLevel(newLevel);

        return newScore;
      });
    }
    if (levelRef.current >= 10 && t - lastSpawnDrone.current > 6000) {
      lastSpawnDrone.current = t;

      setDrones((prev) => [...prev.slice(-4), spawnDrone(randRef.current)]);
    }
    // Move asteroids
    setAsteroids((prev) =>
      prev
        .map((a) => ({
          ...a,
          y:
            a.y +
            a.speed *
              dt *
              (1 + levelRef.current * 0.25) *
              (1 + engineLevel * 0.1),
        }))
        .filter((a) => a.y < 140),
    );
    setAsteroids((prev) => {
      const remaining: Asteroid[] = [];

      prev.forEach((a) => {
        if (checkCollision(shipXRef.current, a.x, a.y, 8, 8)) {
          setHitFlash(true);

          setTimeout(() => {
            setHitFlash(false);
          }, 150);
          setLives((l) => {
            const damageMultiplier = 1 - shipShield / 120;

            const next = l - damageMultiplier;

            if (next <= 0.5) {
              triggerGameOver();
              return 0;
            }

            return next;
          });
        } else {
          remaining.push(a);
        }
      });

      return remaining;
    });

    // Move crates + collision
    setCrates((prev) => {
      const remaining: CargoCrate[] = [];

      prev.forEach((c) => {
        const nextY =
          c.y + c.speed * dt * levelRef.current * (1 + engineLevel * 0.1);
        if (
          checkCollision(
            shipXRef.current,
            c.x,
            nextY,
            7 + magnetLevel * 3 + Math.floor(shipCargo / 20),
            5,
          )
        ) {
          setCargo((v) => {
            const nextCargo = Math.min(cargoCapacity, v + 1);

            if (
              nextCargo >= cargoCapacity &&
              !showDeliveryPortal &&
              v < cargoCapacity
            ) {
              setPortalTimer(10);
              setShowDeliveryPortal(true);
            }

            return nextCargo;
          });

          const cargoBonus = Math.floor(shipCargo / 5);

          setCoins((v) => v + 25 + cargoBonus);
          setFuel((v) => Math.min(maxFuel, v + 3));
          setScore((v) => v + 100);

          addScorePopup(c.x, nextY, "+100");
        } else if (nextY < 140) {
          remaining.push({
            ...c,
            y: nextY,
          });
        }
      });

      return remaining;
    });

    // Move coins + collision
    setFloatingCoins((prev) => {
      const remaining: FloatingCoin[] = [];

      prev.forEach((c) => {
        const nextY =
          c.y + c.speed * dt * levelRef.current * (1 + engineLevel * 0.1);

        if (
          checkCollision(shipXRef.current, c.x, nextY, 6 + magnetLevel * 3, 5)
        ) {
          setCoins((v) => v + 10);
          setScore((v) => v + 25);

          addScorePopup(c.x, nextY, "+25");
        } else if (nextY < 140) {
          remaining.push({
            ...c,
            y: nextY,
          });
        }
      });

      return remaining;
    });
    // Move fuel cans + collision

    setFuelCans((prev) => {
      const remaining: FuelCan[] = [];

      prev.forEach((f) => {
        const nextY = f.y + f.speed * dt * levelRef.current;

        if (checkCollision(shipXRef.current, f.x, nextY, 7, 5)) {
          setFuel((v) => Math.min(maxFuel, v + 20));

          addScorePopup(f.x, nextY, "+FUEL");
        } else if (nextY < 140) {
          remaining.push({
            ...f,

            y: nextY,
          });
        }
      });

      return remaining;
    });
    setLaserWalls((prev) => {
      const remaining: LaserWall[] = [];

      prev.forEach((wall) => {
        const nextY = wall.y + wall.speed * dt * levelRef.current;

        const inGap =
          shipXRef.current > wall.gapX - 12 &&
          shipXRef.current < wall.gapX + 12;

        const touchingWall = Math.abs(nextY - 80) < 5;

        if (touchingWall && !inGap) {
          triggerGameOver();
          return;
        }

        if (nextY < 140) {
          remaining.push({
            ...wall,
            y: nextY,
          });
        }
      });

      return remaining;
    });

    setDrones((prev) => {
      const remaining: Drone[] = [];

      prev.forEach((d) => {
        const nextX =
          d.x + d.speed * dt * d.direction * (1 + levelRef.current * 0.05);

        if (checkCollision(shipXRef.current, nextX, d.y, 8, 5)) {
          triggerGameOver();
          return;
        }

        if (nextX > -20 && nextX < 120) {
          remaining.push({
            ...d,
            x: nextX,
            y: d.y + Math.sin(t / 300) * 0.08,
          });
        }
      });

      return remaining;
    });
    frameRef.current = requestAnimationFrame(tick);
  };

  // ── Game loop ────────────────────────────────────────────────────────────────
  useEffect(() => {
    if (isPaused || isGameOver) return;

    frameRef.current = requestAnimationFrame(tick);

    return () => cancelAnimationFrame(frameRef.current);
  }, [isPaused, isGameOver, level]);
  // Cleanup stale objects

  const handleCollectCrate = (id: number, x: number) => {
    setCargo((c) => Math.min(cargoCapacity, c + 1));
    setCoins((c) => c + 25);

    setScore((s) => s + 100);

    setCrates((prev) => prev.filter((c) => c.id !== id));

    addScorePopup(x, 60, "+100");
  };

  const handleCollectCoin = (id: number, x: number) => {
    setCoins((c) => c + 10);

    setScore((s) => s + 25);

    setFloatingCoins((prev) => prev.filter((coin) => coin.id !== id));

    addScorePopup(x, 50, "+25");
  };

  const handleHitAsteroid = (id: number) => {
    setLives((l) => {
      const damage = shieldLevel >= 3 ? 0 : shieldLevel >= 2 ? 0.5 : 1;

      const newLives = l - damage;

      if (newLives <= 0) {
        triggerGameOver();
        return 0;
      }

      return newLives;
    });

    setAsteroids((prev) => prev.filter((a) => a.id !== id));
  };
  useEffect(() => {
    if (fuel <= 0 && lives > 0) {
      triggerGameOver();
    }
  }, [fuel, lives]);

  useEffect(() => {
    if (isGameOver) {
      cancelAnimationFrame(frameRef.current);
    }
  }, [isGameOver]);
  const fuelPct = Math.round(
    Math.max(0, Math.min(100, (fuel / maxFuel) * 100)),
  );
  const isLowFuel = fuelPct < 25;
  const isMidFuel = fuelPct < 50;
  const fuelColor = "linear-gradient(90deg,#5b00ff,#8c3fff,#c966ff)";
  return (
    <div
      style={{
        position: "relative",
        width: "100vw",
        height: "100vh",
        margin: 0,
        background:
          "radial-gradient(ellipse at 50% 20%, #1a0044 0%, #07001c 60%, #030010 100%)",
        fontFamily: "'Nunito', sans-serif",
        overflow: "hidden",
        userSelect: "none",
        touchAction: "none",
      }}
      onPointerMove={handleShipMove}
      onPointerDown={handleShipMove}
    >
      <BackgroundEffects
        stars={stars.current}
        warpLines={warpLines.current}
        level={currentLevel}
      />
      <GameObjects
        asteroids={asteroids}
        crates={crates}
        floatingCoins={floatingCoins}
        scorePopups={scorePopups}
        fuelCans={fuelCans}
        drones={drones}
        laserWalls={laserWalls}
        handleHitAsteroid={handleHitAsteroid}
        handleCollectCrate={handleCollectCrate}
        handleCollectCoin={handleCollectCoin}
      />
      {showDeliveryPortal && (
        <div
          onClick={() => {
            const deliveryCoins = cargo * 100;
            const deliveryScore = cargo * 250;

            setCoins((v) => v + deliveryCoins);
            setScore((v) => v + deliveryScore);

            setDeliveries((d) => d + 1);

            setCargo(0);
            setShowDeliveryPortal(false);
            setPortalTimer(10);

            addScorePopup(50, 40, "DELIVERED!");
          }}
          style={{
            position: "absolute",
            top: "20%",
            left: "50%",
            transform: "translateX(-50%)",
            width: 120,
            height: 120,
            borderRadius: "50%",
            cursor: "pointer",
            zIndex: 20,

            background: `
        radial-gradient(
          circle,
          rgba(79,195,255,0.25),
          rgba(180,79,255,0.45),
          transparent 70%
        )
      `,

            boxShadow: `
        0 0 30px #4fc3ff,
        0 0 60px #b44fff,
        inset 0 0 20px #ffffff44
      `,

            animation: "thrusterGlow 1s ease-in-out infinite",
          }}
        >
          {/* Timer */}
          <div
            style={{
              position: "absolute",
              top: -35,
              left: "50%",
              transform: "translateX(-50%)",
              color: "#fff",
              fontWeight: 900,
              fontSize: 22,
              textShadow: "0 0 10px #ff4444",
            }}
          >
            {portalTimer}s
          </div>

          {/* Outer Ring */}
          <div
            style={{
              position: "absolute",
              inset: 15,
              borderRadius: "50%",
              border: "4px solid #4fc3ff",
            }}
          />

          {/* Inner Ring */}
          <div
            style={{
              position: "absolute",
              inset: 30,
              borderRadius: "50%",
              border: "3px solid #b44fff",
            }}
          />
        </div>
      )}
      {/* ── Ship + thruster ── */}
      <div
        style={{
          position: "absolute",
          bottom: 80,
          left: `${shipX}%`,
          transform: "translateX(-50%)",
          zIndex: 15,
          filter: `
drop-shadow(0 0 60px ${shipTheme})
drop-shadow(0 0 40px ${shipTheme})
drop-shadow(0 0 20px ${shipTheme})
`,
          animation: "shipFloat 2.2s ease-in-out infinite",
          pointerEvents: "none",
        }}
      >
        {/* Ground glow */}
        <div
          style={{
            position: "absolute",
            bottom: -18,
            left: "50%",
            transform: "translateX(-50%)",
            scale: "2",
            width: 90,
            height: 18,
            background:
              "radial-gradient(ellipse,rgba(180,79,255,0.55),transparent 70%)",
            filter: "blur(6px)",
            animation: "thrusterGlow 0.18s ease-in-out infinite",
          }}
        />
        <div
          style={{
            color: shipTheme,
          }}
        >
          {selectedShip === "phantom" ? (
            <ShipSVG color="#00ffaa" />
          ) : selectedShip === "nebula" ? (
            <ShipSVG color="#ffd84d" />
          ) : selectedShip === "storm" ? (
            <ShipSVG color="#ff6688" />
          ) : selectedShip === "falcon" ? (
            <ShipSVG color="#4fc3ff" />
          ) : (
            <ShipSVG color="#b44fff" />
          )}{" "}
        </div>{" "}
      </div>
      {/* ── Ground line ───────────────────────────────────────────────────────── */}
      <div
        style={{
          position: "absolute",
          bottom: 100,
          left: 0,
          right: 0,
          height: 1,
          background:
            "linear-gradient(90deg,transparent,rgba(180,79,255,0.3),rgba(79,195,255,0.3),transparent)",
          pointerEvents: "none",
        }}
      />
      <GameplayHUD
        coins={coins}
        lives={lives}
        fuelPct={fuelPct}
        isLowFuel={isLowFuel}
        fuelColor={fuelColor}
        score={score}
        currentLevel={currentLevel}
        cargo={`${cargo}/${cargoCapacity}`}
        isPaused={isPaused}
        onPause={handlePause}
        FuelBolt={FuelBolt}
        HeartSVG={HeartSVG}
        CrateSVG={CrateSVG}
      />
      {/* ── Pause overlay ─────────────────────────────────────────────────────── */}
      {isPaused && (
        <PauseOverlay
          score={score}
          coins={coins}
          cargo={cargo}
          onResume={handlePause}
        />
      )}
      {hitFlash && (
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: "rgba(255,0,0,0.25)",
            pointerEvents: "none",
            zIndex: 999,
          }}
        />
      )}
    </div>
  );
}
