interface ShipSVGProps {
  shipId?: string;
}
export default function ShipSVG({ shipId = "phantom" }: ShipSVGProps) {
  const ships: Record<string, React.ReactNode> = {
    phantom: <PhantomWedge />,
    void: <VoidCruiser />,
    specter: <Specter />,
    mantis: <Mantis />,
    wraith: <Wraith />,
    nova: <NovaStriker />,
  };
  return ships[shipId] ?? <PhantomWedge />;
}

// ─── 1. PHANTOM WEDGE — cyan, wide delta wings + twin nacelle pods ─────────
function PhantomWedge() {
  return (
    <svg
      width="160"
      height="175"
      viewBox="0 0 160 175"
      fill="none"
      style={{
        filter:
          "drop-shadow(0 0 22px rgba(0,229,255,0.6)) drop-shadow(0 0 8px rgba(0,229,255,0.3))",
        animation: "bob 3s ease-in-out infinite",
      }}
    >
      <defs>
        <linearGradient id="pw_body" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#0E3050" />
          <stop offset="100%" stopColor="#040C18" />
        </linearGradient>
        <linearGradient id="pw_wing" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#071828" />
          <stop offset="100%" stopColor="#020810" />
        </linearGradient>
        <linearGradient id="pw_fl" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#00E5FF" />
          <stop offset="100%" stopColor="transparent" />
        </linearGradient>
        <radialGradient id="pw_glow" cx="50%" cy="0%">
          <stop offset="0%" stopColor="#00E5FF" stopOpacity="0.7" />
          <stop offset="100%" stopColor="transparent" />
        </radialGradient>
      </defs>

      {/* Nacelle engine glows */}
      <ellipse
        cx="42"
        cy="158"
        rx="10"
        ry="4"
        fill="url(#pw_glow)"
        style={{ animation: "thrusterGlow 0.28s ease-in-out infinite" }}
      />
      <ellipse
        cx="118"
        cy="158"
        rx="10"
        ry="4"
        fill="url(#pw_glow)"
        style={{ animation: "thrusterGlow 0.3s 0.05s ease-in-out infinite" }}
      />

      {/* Nacelle flames */}
      <polygon
        points="36,144 42,164 48,144"
        fill="url(#pw_fl)"
        style={{
          transformOrigin: "42px 152px",
          animation: "thrusterFlame 0.15s ease-in-out infinite",
        }}
      />
      <polygon
        points="112,144 118,164 124,144"
        fill="url(#pw_fl)"
        style={{
          transformOrigin: "118px 152px",
          animation: "thrusterFlame 0.16s 0.05s ease-in-out infinite",
        }}
      />

      {/* Left wide delta wing */}
      <polygon
        points="72,72 4,120 10,132 74,90"
        fill="url(#pw_wing)"
        stroke="rgba(0,229,255,.3)"
        strokeWidth=".9"
      />
      <line
        x1="70"
        y1="76"
        x2="8"
        y2="118"
        stroke="rgba(0,229,255,.1)"
        strokeWidth=".6"
      />
      <line
        x1="66"
        y1="84"
        x2="20"
        y2="112"
        stroke="rgba(0,229,255,.07)"
        strokeWidth=".5"
      />
      <rect
        x="4"
        y="118"
        width="10"
        height="3"
        rx="1.5"
        fill="#00E5FF"
        opacity=".9"
      />

      {/* Right wide delta wing */}
      <polygon
        points="88,72 156,120 150,132 86,90"
        fill="url(#pw_wing)"
        stroke="rgba(0,229,255,.3)"
        strokeWidth=".9"
      />
      <line
        x1="90"
        y1="76"
        x2="152"
        y2="118"
        stroke="rgba(0,229,255,.1)"
        strokeWidth=".6"
      />
      <line
        x1="94"
        y1="84"
        x2="140"
        y2="112"
        stroke="rgba(0,229,255,.07)"
        strokeWidth=".5"
      />
      <rect
        x="146"
        y="118"
        width="10"
        height="3"
        rx="1.5"
        fill="#00E5FF"
        opacity=".9"
      />

      {/* Left nacelle pod */}
      <rect
        x="28"
        y="120"
        width="28"
        height="38"
        rx="5"
        fill="#040E1C"
        stroke="rgba(0,229,255,.45)"
        strokeWidth=".9"
      />
      <line
        x1="42"
        y1="130"
        x2="42"
        y2="148"
        stroke="rgba(0,229,255,.15)"
        strokeWidth=".5"
        strokeDasharray="3 3"
      />
      <rect
        x="30"
        y="122"
        width="24"
        height="5"
        rx="2"
        fill="rgba(0,229,255,.08)"
        stroke="rgba(0,229,255,.2)"
        strokeWidth=".5"
      />
      <ellipse
        cx="42"
        cy="156"
        rx="9"
        ry="4"
        fill="#020A14"
        stroke="rgba(0,229,255,.4)"
        strokeWidth=".8"
      />

      {/* Right nacelle pod */}
      <rect
        x="104"
        y="120"
        width="28"
        height="38"
        rx="5"
        fill="#040E1C"
        stroke="rgba(0,229,255,.45)"
        strokeWidth=".9"
      />
      <line
        x1="118"
        y1="130"
        x2="118"
        y2="148"
        stroke="rgba(0,229,255,.15)"
        strokeWidth=".5"
        strokeDasharray="3 3"
      />
      <rect
        x="106"
        y="122"
        width="24"
        height="5"
        rx="2"
        fill="rgba(0,229,255,.08)"
        stroke="rgba(0,229,255,.2)"
        strokeWidth=".5"
      />
      <ellipse
        cx="118"
        cy="156"
        rx="9"
        ry="4"
        fill="#020A14"
        stroke="rgba(0,229,255,.4)"
        strokeWidth=".8"
      />

      {/* Main body */}
      <polygon
        points="80,10 100,32 98,118 80,126 62,118 60,32"
        fill="url(#pw_body)"
        stroke="rgba(0,229,255,.55)"
        strokeWidth="1.2"
      />
      <line
        x1="80"
        y1="10"
        x2="80"
        y2="126"
        stroke="rgba(0,229,255,.1)"
        strokeWidth=".5"
        strokeDasharray="5 4"
      />
      <line
        x1="62"
        y1="55"
        x2="98"
        y2="55"
        stroke="rgba(0,229,255,.18)"
        strokeWidth=".9"
      />
      <line
        x1="62"
        y1="78"
        x2="98"
        y2="78"
        stroke="rgba(0,229,255,.12)"
        strokeWidth=".7"
      />
      <line
        x1="62"
        y1="100"
        x2="98"
        y2="100"
        stroke="rgba(0,229,255,.12)"
        strokeWidth=".7"
      />
      <line
        x1="62"
        y1="114"
        x2="98"
        y2="114"
        stroke="rgba(0,229,255,.15)"
        strokeWidth=".8"
      />

      {/* Porthole */}
      <circle
        cx="80"
        cy="68"
        r="6"
        fill="#050E1C"
        stroke="rgba(0,229,255,.4)"
        strokeWidth=".9"
      />
      <circle cx="78" cy="66" r="2.5" fill="rgba(180,230,255,.22)" />

      {/* Cockpit diamond */}
      <polygon
        points="80,16 93,28 91,50 80,56 69,50 67,28"
        fill="#061C30"
        stroke="rgba(160,240,255,.55)"
        strokeWidth="1"
      />
      <polygon points="73,20 80,16 86,27 76,32" fill="rgba(200,240,255,.28)" />
      <line
        x1="80"
        y1="16"
        x2="80"
        y2="56"
        stroke="rgba(0,229,255,.12)"
        strokeWidth=".5"
      />

      {/* Nose */}
      <path
        d="M80,10 Q90,6 91,22 L69,22 Q70,6 80,10Z"
        fill="#0E3050"
        stroke="rgba(0,229,255,.6)"
        strokeWidth="1"
      />
      <polygon points="80,10 84,16 76,16" fill="#00E5FF" opacity="1" />

      {/* Nozzle */}
      <polygon
        points="64,116 96,116 100,124 60,124"
        fill="#030A14"
        stroke="rgba(0,229,255,.35)"
        strokeWidth=".8"
      />
    </svg>
  );
}

// ─── 2. VOID CRUISER — amber, twin boom struts + crossbar ─────────────────
function VoidCruiser() {
  return (
    <svg
      width="190"
      height="165"
      viewBox="0 0 190 165"
      fill="none"
      style={{
        filter:
          "drop-shadow(0 0 22px rgba(255,140,0,0.55)) drop-shadow(0 0 8px rgba(255,140,0,0.3))",
        animation: "bob 2.8s ease-in-out infinite",
      }}
    >
      <defs>
        <linearGradient id="vc_core" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#2A1A08" />
          <stop offset="100%" stopColor="#0A0502" />
        </linearGradient>
        <linearGradient id="vc_boom" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#1A1006" />
          <stop offset="100%" stopColor="#080400" />
        </linearGradient>
        <linearGradient id="vc_fl" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#FF8C00" />
          <stop offset="100%" stopColor="transparent" />
        </linearGradient>
        <radialGradient id="vc_glow" cx="50%" cy="0%">
          <stop offset="0%" stopColor="#FF8C00" stopOpacity="0.7" />
          <stop offset="100%" stopColor="transparent" />
        </radialGradient>
      </defs>

      {/* Engine glows */}
      <ellipse
        cx="54"
        cy="142"
        rx="12"
        ry="5"
        fill="url(#vc_glow)"
        style={{ animation: "thrusterGlow 0.25s ease-in-out infinite" }}
      />
      <ellipse
        cx="136"
        cy="142"
        rx="12"
        ry="5"
        fill="url(#vc_glow)"
        style={{ animation: "thrusterGlow 0.27s 0.07s ease-in-out infinite" }}
      />

      {/* Boom flames */}
      <polygon
        points="48,128 54,150 60,128"
        fill="url(#vc_fl)"
        style={{
          transformOrigin: "54px 138px",
          animation: "thrusterFlame 0.14s ease-in-out infinite",
        }}
      />
      <polygon
        points="130,128 136,150 142,128"
        fill="url(#vc_fl)"
        style={{
          transformOrigin: "136px 138px",
          animation: "thrusterFlame 0.16s 0.06s ease-in-out infinite",
        }}
      />

      {/* Forward swept wings from booms */}
      <polygon
        points="62,58 8,32 12,42 62,68"
        fill="#0C1828"
        stroke="rgba(255,140,0,.28)"
        strokeWidth=".7"
      />
      <line
        x1="60"
        y1="60"
        x2="12"
        y2="35"
        stroke="rgba(255,140,0,.1)"
        strokeWidth=".5"
      />
      <polygon
        points="128,58 182,32 178,42 128,68"
        fill="#0C1828"
        stroke="rgba(255,140,0,.28)"
        strokeWidth=".7"
      />
      <line
        x1="130"
        y1="60"
        x2="178"
        y2="35"
        stroke="rgba(255,140,0,.1)"
        strokeWidth=".5"
      />
      {/* Wing tip LEDs */}
      <rect
        x="8"
        y="31"
        width="7"
        height="2"
        rx="1"
        fill="#FF8C00"
        opacity=".9"
      />
      <rect
        x="175"
        y="31"
        width="7"
        height="2"
        rx="1"
        fill="#FF8C00"
        opacity=".9"
      />

      {/* Left boom strut */}
      <polygon
        points="62,58 42,58 36,128 64,128"
        fill="url(#vc_boom)"
        stroke="rgba(255,140,0,.35)"
        strokeWidth=".8"
      />
      <line
        x1="48"
        y1="74"
        x2="48"
        y2="112"
        stroke="rgba(255,140,0,.12)"
        strokeWidth=".5"
        strokeDasharray="3 3"
      />
      <line
        x1="42"
        y1="90"
        x2="64"
        y2="88"
        stroke="rgba(255,140,0,.08)"
        strokeWidth=".5"
      />

      {/* Right boom strut */}
      <polygon
        points="128,58 148,58 154,128 126,128"
        fill="url(#vc_boom)"
        stroke="rgba(255,140,0,.35)"
        strokeWidth=".8"
      />
      <line
        x1="142"
        y1="74"
        x2="142"
        y2="112"
        stroke="rgba(255,140,0,.12)"
        strokeWidth=".5"
        strokeDasharray="3 3"
      />
      <line
        x1="148"
        y1="90"
        x2="126"
        y2="88"
        stroke="rgba(255,140,0,.08)"
        strokeWidth=".5"
      />

      {/* Crossbar */}
      <polygon
        points="62,70 128,70 128,82 62,82"
        fill="#0A1520"
        stroke="rgba(255,140,0,.25)"
        strokeWidth=".7"
      />
      <rect
        x="68"
        y="73"
        width="8"
        height="2"
        rx="1"
        fill="#FF8C00"
        opacity=".9"
      />
      <rect
        x="114"
        y="73"
        width="8"
        height="2"
        rx="1"
        fill="#FF8C00"
        opacity=".9"
      />
      <line
        x1="62"
        y1="76"
        x2="128"
        y2="76"
        stroke="rgba(255,140,0,.08)"
        strokeWidth=".5"
      />

      {/* Engine housings */}
      <rect
        x="38"
        y="120"
        width="30"
        height="12"
        rx="3"
        fill="#060E18"
        stroke="rgba(255,140,0,.4)"
        strokeWidth=".8"
      />
      <line
        x1="53"
        y1="122"
        x2="53"
        y2="130"
        stroke="rgba(255,140,0,.15)"
        strokeWidth=".5"
        strokeDasharray="2 2"
      />
      <rect
        x="122"
        y="120"
        width="30"
        height="12"
        rx="3"
        fill="#060E18"
        stroke="rgba(255,140,0,.4)"
        strokeWidth=".8"
      />
      <line
        x1="137"
        y1="122"
        x2="137"
        y2="130"
        stroke="rgba(255,140,0,.15)"
        strokeWidth=".5"
        strokeDasharray="2 2"
      />

      {/* Center body */}
      <polygon
        points="95,8 116,28 114,104 95,110 76,104 74,28"
        fill="url(#vc_core)"
        stroke="rgba(255,140,0,.55)"
        strokeWidth="1.2"
      />
      <line
        x1="95"
        y1="8"
        x2="95"
        y2="110"
        stroke="rgba(255,140,0,.1)"
        strokeWidth=".6"
        strokeDasharray="4 3"
      />
      <line
        x1="76"
        y1="50"
        x2="114"
        y2="50"
        stroke="rgba(255,140,0,.12)"
        strokeWidth=".7"
      />
      <line
        x1="76"
        y1="70"
        x2="114"
        y2="70"
        stroke="rgba(255,140,0,.1)"
        strokeWidth=".6"
      />
      <line
        x1="76"
        y1="88"
        x2="114"
        y2="88"
        stroke="rgba(255,140,0,.1)"
        strokeWidth=".6"
      />

      {/* Porthole */}
      <circle
        cx="95"
        cy="60"
        r="6"
        fill="#100800"
        stroke="rgba(255,180,80,.4)"
        strokeWidth=".9"
      />
      <circle cx="93" cy="58" r="2.5" fill="rgba(255,220,150,.2)" />

      {/* Cockpit */}
      <polygon
        points="95,16 108,26 106,48 95,54 84,48 82,26"
        fill="#1A0E04"
        stroke="rgba(255,200,100,.5)"
        strokeWidth="1"
      />
      <polygon points="88,19 95,15 101,27 90,32" fill="rgba(255,220,150,.25)" />
      <line
        x1="95"
        y1="16"
        x2="95"
        y2="54"
        stroke="rgba(255,140,0,.1)"
        strokeWidth=".5"
      />

      {/* Nose */}
      <path
        d="M95,8 Q106,4 107,20 L83,20 Q84,4 95,8Z"
        fill="#2A1A08"
        stroke="rgba(255,140,0,.6)"
        strokeWidth="1"
      />
      <polygon points="95,8 99,15 91,15" fill="#FF8C00" opacity=".95" />
    </svg>
  );
}

// ─── 3. SPECTER — teal, clean classic rocket + straight level wings ────────
function Specter() {
  return (
    <svg
      width="140"
      height="175"
      viewBox="0 0 140 175"
      fill="none"
      style={{
        filter:
          "drop-shadow(0 0 22px rgba(0,255,170,0.55)) drop-shadow(0 0 8px rgba(0,255,170,0.28))",
        animation: "bob 3.1s ease-in-out infinite",
      }}
    >
      <defs>
        <linearGradient id="sp_body" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#041E18" />
          <stop offset="100%" stopColor="#020A08" />
        </linearGradient>
        <linearGradient id="sp_fl" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#00FFAA" />
          <stop offset="100%" stopColor="transparent" />
        </linearGradient>
        <radialGradient id="sp_glow" cx="50%" cy="0%">
          <stop offset="0%" stopColor="#00FFAA" stopOpacity="0.65" />
          <stop offset="100%" stopColor="transparent" />
        </radialGradient>
      </defs>

      {/* Engine glow */}
      <ellipse
        cx="70"
        cy="156"
        rx="16"
        ry="6"
        fill="url(#sp_glow)"
        style={{ animation: "thrusterGlow 0.28s ease-in-out infinite" }}
      />

      {/* Flame */}
      <polygon
        points="62,142 70,164 78,142"
        fill="url(#sp_fl)"
        style={{
          transformOrigin: "70px 152px",
          animation: "thrusterFlame 0.15s ease-in-out infinite",
        }}
      />

      {/* Straight horizontal wings */}
      <polygon
        points="62,88 4,84 4,96 62,100"
        fill="#041410"
        stroke="rgba(0,255,170,.3)"
        strokeWidth=".9"
      />
      <line
        x1="60"
        y1="88"
        x2="6"
        y2="85"
        stroke="rgba(0,255,170,.12)"
        strokeWidth=".6"
      />
      <line
        x1="60"
        y1="94"
        x2="6"
        y2="92"
        stroke="rgba(0,255,170,.07)"
        strokeWidth=".5"
      />
      <rect
        x="4"
        y="84"
        width="3"
        height="12"
        rx="1.5"
        fill="#00FFAA"
        opacity=".9"
      />

      <polygon
        points="78,88 136,84 136,96 78,100"
        fill="#041410"
        stroke="rgba(0,255,170,.3)"
        strokeWidth=".9"
      />
      <line
        x1="80"
        y1="88"
        x2="134"
        y2="85"
        stroke="rgba(0,255,170,.12)"
        strokeWidth=".6"
      />
      <line
        x1="80"
        y1="94"
        x2="134"
        y2="92"
        stroke="rgba(0,255,170,.07)"
        strokeWidth=".5"
      />
      <rect
        x="133"
        y="84"
        width="3"
        height="12"
        rx="1.5"
        fill="#00FFAA"
        opacity=".9"
      />

      {/* Small rear stabilisers */}
      <polygon
        points="58,128 36,148 42,154 60,138"
        fill="#031008"
        stroke="rgba(0,255,170,.2)"
        strokeWidth=".7"
      />
      <polygon
        points="82,128 104,148 98,154 80,138"
        fill="#031008"
        stroke="rgba(0,255,170,.2)"
        strokeWidth=".7"
      />

      {/* Main body */}
      <polygon
        points="70,10 84,30 84,142 70,150 56,142 56,30"
        fill="url(#sp_body)"
        stroke="rgba(0,255,170,.5)"
        strokeWidth="1.2"
      />
      <line
        x1="70"
        y1="10"
        x2="70"
        y2="150"
        stroke="rgba(0,255,170,.08)"
        strokeWidth=".5"
        strokeDasharray="5 4"
      />
      <line
        x1="57"
        y1="58"
        x2="83"
        y2="58"
        stroke="rgba(0,255,170,.2)"
        strokeWidth="1"
      />
      <line
        x1="56"
        y1="88"
        x2="84"
        y2="88"
        stroke="rgba(0,255,170,.15)"
        strokeWidth=".8"
      />
      <line
        x1="56"
        y1="118"
        x2="84"
        y2="118"
        stroke="rgba(0,255,170,.15)"
        strokeWidth=".8"
      />
      <line
        x1="56"
        y1="136"
        x2="84"
        y2="136"
        stroke="rgba(0,255,170,.2)"
        strokeWidth="1"
      />

      {/* Porthole */}
      <circle
        cx="70"
        cy="70"
        r="6"
        fill="#020C08"
        stroke="rgba(0,255,170,.4)"
        strokeWidth=".9"
      />
      <circle cx="68" cy="68" r="2.5" fill="rgba(180,255,220,.2)" />

      {/* Cockpit */}
      <polygon
        points="70,16 82,28 80,50 70,56 60,50 58,28"
        fill="#031410"
        stroke="rgba(160,255,210,.5)"
        strokeWidth="1"
      />
      <polygon points="63,19 70,15 76,27 65,32" fill="rgba(180,255,220,.25)" />
      <line
        x1="70"
        y1="16"
        x2="70"
        y2="56"
        stroke="rgba(0,255,170,.1)"
        strokeWidth=".5"
      />

      {/* Nose */}
      <path
        d="M70,10 Q80,6 81,22 L59,22 Q60,6 70,10Z"
        fill="#052018"
        stroke="rgba(0,255,170,.58)"
        strokeWidth="1"
      />
      <polygon points="70,10 74,16 66,16" fill="#00FFAA" opacity="1" />

      {/* Nozzle bell */}
      <polygon
        points="58,140 82,140 86,150 54,150"
        fill="#020806"
        stroke="rgba(0,255,170,.4)"
        strokeWidth=".8"
      />
      <ellipse
        cx="70"
        cy="150"
        rx="16"
        ry="5"
        fill="#010604"
        stroke="rgba(0,255,170,.3)"
        strokeWidth=".7"
      />
    </svg>
  );
}

// ─── 4. MANTIS — green, narrow body, articulated fork arms + engine pods ──
function Mantis() {
  return (
    <svg
      width="170"
      height="170"
      viewBox="0 0 170 170"
      fill="none"
      style={{
        filter:
          "drop-shadow(0 0 22px rgba(0,255,120,0.55)) drop-shadow(0 0 8px rgba(0,255,120,0.28))",
        animation: "bob 2.7s ease-in-out infinite",
      }}
    >
      <defs>
        <linearGradient id="mt_body" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#0A2810" />
          <stop offset="100%" stopColor="#020A04" />
        </linearGradient>
        <linearGradient id="mt_arm" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#061A0A" />
          <stop offset="100%" stopColor="#020806" />
        </linearGradient>
        <linearGradient id="mt_fl" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#00FF78" />
          <stop offset="100%" stopColor="transparent" />
        </linearGradient>
        <radialGradient id="mt_glow" cx="50%" cy="0%">
          <stop offset="0%" stopColor="#00FF78" stopOpacity="0.65" />
          <stop offset="100%" stopColor="transparent" />
        </radialGradient>
      </defs>

      {/* Fork leg flames */}
      <ellipse
        cx="46"
        cy="152"
        rx="10"
        ry="4"
        fill="url(#mt_glow)"
        style={{ animation: "thrusterGlow 0.25s ease-in-out infinite" }}
      />
      <ellipse
        cx="124"
        cy="152"
        rx="10"
        ry="4"
        fill="url(#mt_glow)"
        style={{ animation: "thrusterGlow 0.27s 0.06s ease-in-out infinite" }}
      />
      <polygon
        points="40,138 46,158 52,138"
        fill="url(#mt_fl)"
        style={{
          transformOrigin: "46px 148px",
          animation: "thrusterFlame 0.15s ease-in-out infinite",
        }}
      />
      <polygon
        points="118,138 124,158 130,138"
        fill="url(#mt_fl)"
        style={{
          transformOrigin: "124px 148px",
          animation: "thrusterFlame 0.17s 0.06s ease-in-out infinite",
        }}
      />

      {/* Left articulated arm — horizontal then down */}
      <polygon
        points="72,80 72,84 30,100 28,94"
        fill="url(#mt_arm)"
        stroke="rgba(0,255,120,.32)"
        strokeWidth=".8"
      />
      <polygon
        points="30,98 16,98 16,140 32,140"
        fill="url(#mt_arm)"
        stroke="rgba(0,255,120,.35)"
        strokeWidth=".8"
      />
      <line
        x1="16"
        y1="115"
        x2="32"
        y2="115"
        stroke="rgba(0,255,120,.1)"
        strokeWidth=".5"
        strokeDasharray="3 2"
      />

      {/* Right arm */}
      <polygon
        points="98,80 98,84 140,100 142,94"
        fill="url(#mt_arm)"
        stroke="rgba(0,255,120,.32)"
        strokeWidth=".8"
      />
      <polygon
        points="140,98 154,98 154,140 138,140"
        fill="url(#mt_arm)"
        stroke="rgba(0,255,120,.35)"
        strokeWidth=".8"
      />
      <line
        x1="138"
        y1="115"
        x2="154"
        y2="115"
        stroke="rgba(0,255,120,.1)"
        strokeWidth=".5"
        strokeDasharray="3 2"
      />

      {/* Arm engine pods */}
      <rect
        x="12"
        y="132"
        width="24"
        height="12"
        rx="4"
        fill="#040E06"
        stroke="rgba(0,255,120,.45)"
        strokeWidth=".9"
      />
      <line
        x1="24"
        y1="134"
        x2="24"
        y2="142"
        stroke="rgba(0,255,120,.15)"
        strokeWidth=".5"
        strokeDasharray="2 2"
      />
      <rect
        x="134"
        y="132"
        width="24"
        height="12"
        rx="4"
        fill="#040E06"
        stroke="rgba(0,255,120,.45)"
        strokeWidth=".9"
      />
      <line
        x1="146"
        y1="134"
        x2="146"
        y2="142"
        stroke="rgba(0,255,120,.15)"
        strokeWidth=".5"
        strokeDasharray="2 2"
      />

      {/* Arm joint dots */}
      <circle
        cx="30"
        cy="98"
        r="4"
        fill="#0A2010"
        stroke="rgba(0,255,120,.5)"
        strokeWidth=".8"
      />
      <circle
        cx="140"
        cy="98"
        r="4"
        fill="#0A2010"
        stroke="rgba(0,255,120,.5)"
        strokeWidth=".8"
      />

      {/* Forward canards */}
      <polygon
        points="70,46 44,34 46,42 70,54"
        fill="#061408"
        stroke="rgba(0,255,120,.28)"
        strokeWidth=".7"
      />
      <polygon
        points="100,46 126,34 124,42 100,54"
        fill="#061408"
        stroke="rgba(0,255,120,.28)"
        strokeWidth=".7"
      />
      <rect
        x="44"
        y="33"
        width="6"
        height="2"
        rx="1"
        fill="#00FF78"
        opacity=".85"
      />
      <rect
        x="120"
        y="33"
        width="6"
        height="2"
        rx="1"
        fill="#00FF78"
        opacity=".85"
      />

      {/* Arm connector bar */}
      <line
        x1="28"
        y1="98"
        x2="142"
        y2="98"
        stroke="rgba(0,255,120,.18)"
        strokeWidth="1"
      />

      {/* Narrow body */}
      <polygon
        points="85,10 100,28 98,112 85,118 72,112 70,28"
        fill="url(#mt_body)"
        stroke="rgba(0,255,120,.55)"
        strokeWidth="1.2"
      />
      <line
        x1="85"
        y1="10"
        x2="85"
        y2="118"
        stroke="rgba(0,255,120,.1)"
        strokeWidth=".5"
        strokeDasharray="4 3"
      />
      <line
        x1="71"
        y1="55"
        x2="99"
        y2="55"
        stroke="rgba(0,255,120,.18)"
        strokeWidth=".8"
      />
      <line
        x1="71"
        y1="78"
        x2="99"
        y2="78"
        stroke="rgba(0,255,120,.12)"
        strokeWidth=".7"
      />
      <line
        x1="71"
        y1="98"
        x2="99"
        y2="98"
        stroke="rgba(0,255,120,.12)"
        strokeWidth=".7"
      />

      {/* Porthole */}
      <circle
        cx="85"
        cy="66"
        r="5"
        fill="#030C04"
        stroke="rgba(0,255,120,.4)"
        strokeWidth=".8"
      />
      <circle cx="83" cy="64" r="2" fill="rgba(180,255,200,.2)" />

      {/* Cockpit */}
      <polygon
        points="85,16 97,27 95,48 85,54 75,48 73,27"
        fill="#041208"
        stroke="rgba(160,255,190,.5)"
        strokeWidth="1"
      />
      <polygon points="78,19 85,15 91,26 80,31" fill="rgba(180,255,200,.25)" />
      <line
        x1="85"
        y1="16"
        x2="85"
        y2="54"
        stroke="rgba(0,255,120,.1)"
        strokeWidth=".5"
      />

      {/* Nose */}
      <path
        d="M85,10 Q95,6 96,22 L74,22 Q75,6 85,10Z"
        fill="#0A2810"
        stroke="rgba(0,255,120,.6)"
        strokeWidth="1"
      />
      <polygon points="85,10 89,16 81,16" fill="#00FF78" opacity="1" />

      {/* Nozzle */}
      <polygon
        points="72,110 98,110 102,118 68,118"
        fill="#020804"
        stroke="rgba(0,255,120,.35)"
        strokeWidth=".7"
      />
    </svg>
  );
}

// ─── 5. WRAITH — purple, razor thin body + massive flat wings ────────────
function Wraith() {
  return (
    <svg
      width="180"
      height="155"
      viewBox="0 0 180 155"
      fill="none"
      style={{
        filter:
          "drop-shadow(0 0 22px rgba(200,100,255,0.6)) drop-shadow(0 0 8px rgba(200,100,255,0.3))",
        animation: "bob 3.3s ease-in-out infinite",
      }}
    >
      <defs>
        <linearGradient id="wr_body" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#180030" />
          <stop offset="100%" stopColor="#060010" />
        </linearGradient>
        <linearGradient id="wr_wing" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#14002A" />
          <stop offset="100%" stopColor="#080012" />
        </linearGradient>
        <linearGradient id="wr_fl" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#CC64FF" />
          <stop offset="100%" stopColor="transparent" />
        </linearGradient>
        <radialGradient id="wr_glow" cx="50%" cy="0%">
          <stop offset="0%" stopColor="#CC64FF" stopOpacity="0.65" />
          <stop offset="100%" stopColor="transparent" />
        </radialGradient>
      </defs>

      {/* Engine glow */}
      <ellipse
        cx="90"
        cy="138"
        rx="14"
        ry="5"
        fill="url(#wr_glow)"
        style={{ animation: "thrusterGlow 0.26s ease-in-out infinite" }}
      />

      {/* Flame */}
      <polygon
        points="83,124 90,146 97,124"
        fill="url(#wr_fl)"
        style={{
          transformOrigin: "90px 134px",
          animation: "thrusterFlame 0.15s ease-in-out infinite",
        }}
      />

      {/* Massive flat wings */}
      <polygon
        points="82,66 4,60 4,72 83,76"
        fill="url(#wr_wing)"
        stroke="rgba(200,100,255,.35)"
        strokeWidth=".9"
      />
      <line
        x1="4"
        y1="60"
        x2="82"
        y2="66"
        stroke="rgba(200,100,255,.25)"
        strokeWidth="1"
      />
      <line
        x1="4"
        y1="68"
        x2="82"
        y2="71"
        stroke="rgba(200,100,255,.1)"
        strokeWidth=".5"
      />
      <rect
        x="4"
        y="60"
        width="3"
        height="12"
        rx="1.5"
        fill="#CC64FF"
        opacity=".9"
      />

      <polygon
        points="98,66 176,60 176,72 97,76"
        fill="url(#wr_wing)"
        stroke="rgba(200,100,255,.35)"
        strokeWidth=".9"
      />
      <line
        x1="98"
        y1="66"
        x2="176"
        y2="60"
        stroke="rgba(200,100,255,.25)"
        strokeWidth="1"
      />
      <line
        x1="98"
        y1="71"
        x2="176"
        y2="68"
        stroke="rgba(200,100,255,.1)"
        strokeWidth=".5"
      />
      <rect
        x="173"
        y="60"
        width="3"
        height="12"
        rx="1.5"
        fill="#CC64FF"
        opacity=".9"
      />

      {/* Small rear stabilisers */}
      <polygon
        points="80,104 50,124 55,130 82,114"
        fill="#100022"
        stroke="rgba(200,100,255,.2)"
        strokeWidth=".7"
      />
      <polygon
        points="100,104 130,124 125,130 98,114"
        fill="#100022"
        stroke="rgba(200,100,255,.2)"
        strokeWidth=".7"
      />

      {/* Ultra thin needle body */}
      <polygon
        points="90,8 100,26 100,128 90,134 80,128 80,26"
        fill="url(#wr_body)"
        stroke="rgba(200,100,255,.6)"
        strokeWidth="1.2"
      />
      <line
        x1="90"
        y1="8"
        x2="90"
        y2="134"
        stroke="rgba(200,100,255,.1)"
        strokeWidth=".5"
        strokeDasharray="4 4"
      />
      <line
        x1="80"
        y1="52"
        x2="100"
        y2="52"
        stroke="rgba(200,100,255,.18)"
        strokeWidth=".8"
      />
      <line
        x1="80"
        y1="80"
        x2="100"
        y2="80"
        stroke="rgba(200,100,255,.12)"
        strokeWidth=".7"
      />
      <line
        x1="80"
        y1="108"
        x2="100"
        y2="108"
        stroke="rgba(200,100,255,.12)"
        strokeWidth=".7"
      />

      {/* Porthole */}
      <circle
        cx="90"
        cy="66"
        r="5"
        fill="#0C0018"
        stroke="rgba(200,100,255,.4)"
        strokeWidth=".8"
      />
      <circle cx="88" cy="64" r="2" fill="rgba(220,180,255,.2)" />

      {/* Cockpit */}
      <polygon
        points="90,14 101,25 99,46 90,52 81,46 79,25"
        fill="#100020"
        stroke="rgba(230,180,255,.5)"
        strokeWidth="1"
      />
      <polygon points="83,17 90,13 96,25 84,30" fill="rgba(240,200,255,.25)" />
      <line
        x1="90"
        y1="14"
        x2="90"
        y2="52"
        stroke="rgba(200,100,255,.1)"
        strokeWidth=".5"
      />

      {/* Nose */}
      <path
        d="M90,8 Q100,4 101,20 L79,20 Q80,4 90,8Z"
        fill="#180030"
        stroke="rgba(200,100,255,.6)"
        strokeWidth="1"
      />
      <polygon points="90,8 94,14 86,14" fill="#CC64FF" opacity="1" />

      {/* Nozzle */}
      <polygon
        points="81,126 99,126 102,134 78,134"
        fill="#060010"
        stroke="rgba(200,100,255,.45)"
        strokeWidth=".8"
      />
    </svg>
  );
}

// ─── 6. NOVA STRIKER — pink, twin boosters + shoulder plates ─────────────
function NovaStriker() {
  return (
    <svg
      width="130"
      height="245"
      viewBox="0 0 130 245"
      fill="none"
      style={{
        filter:
          "drop-shadow(0 0 22px rgba(255,68,204,0.6)) drop-shadow(0 0 8px rgba(255,68,204,0.3))",
        animation: "bob 2.9s ease-in-out infinite",
      }}
    >
      <defs>
        <linearGradient id="ns_body" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#1C0828" />
          <stop offset="50%" stopColor="#2C1040" />
          <stop offset="100%" stopColor="#1C0828" />
        </linearGradient>
        <linearGradient id="ns_booster" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#120618" />
          <stop offset="100%" stopColor="#0A0412" />
        </linearGradient>
        <linearGradient id="ns_fl" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#FF44CC" />
          <stop offset="100%" stopColor="transparent" />
        </linearGradient>
        <linearGradient id="ns_fl2" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#CC2299" />
          <stop offset="100%" stopColor="transparent" />
        </linearGradient>
        <linearGradient id="ns_nose" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#2E0A3C" />
          <stop offset="100%" stopColor="#1A0628" />
        </linearGradient>
      </defs>

      {/* Triple flames */}
      <ellipse
        cx="65"
        cy="224"
        rx="15"
        ry="6"
        fill="#FF44CC"
        opacity=".22"
        style={{ animation: "thrusterGlow 0.26s ease-in-out infinite" }}
      />
      <ellipse
        cx="34"
        cy="220"
        rx="9"
        ry="4"
        fill="#CC2299"
        opacity=".2"
        style={{ animation: "thrusterGlow 0.28s 0.05s ease-in-out infinite" }}
      />
      <ellipse
        cx="96"
        cy="220"
        rx="9"
        ry="4"
        fill="#CC2299"
        opacity=".2"
        style={{ animation: "thrusterGlow 0.28s 0.1s ease-in-out infinite" }}
      />
      <polygon
        points="57,208 65,230 73,208"
        fill="url(#ns_fl)"
        style={{
          transformOrigin: "65px 218px",
          animation: "thrusterFlame 0.14s ease-in-out infinite",
        }}
      />
      <polygon
        points="28,206 34,224 40,206"
        fill="url(#ns_fl2)"
        style={{
          transformOrigin: "34px 214px",
          animation: "thrusterFlame 0.16s 0.05s ease-in-out infinite",
        }}
      />
      <polygon
        points="90,206 96,224 102,206"
        fill="url(#ns_fl2)"
        style={{
          transformOrigin: "96px 214px",
          animation: "thrusterFlame 0.15s 0.1s ease-in-out infinite",
        }}
      />

      {/* Left side booster */}
      <rect
        x="14"
        y="120"
        width="26"
        height="88"
        rx="6"
        fill="url(#ns_booster)"
        stroke="rgba(255,68,204,.38)"
        strokeWidth=".9"
      />
      <line
        x1="27"
        y1="135"
        x2="27"
        y2="188"
        stroke="rgba(255,68,204,.1)"
        strokeWidth=".5"
        strokeDasharray="3 3"
      />
      <polygon
        points="27,120 33,108 21,108"
        fill="#200830"
        stroke="rgba(255,68,204,.45)"
        strokeWidth=".8"
      />
      <ellipse
        cx="27"
        cy="208"
        rx="9"
        ry="4"
        fill="#0A0412"
        stroke="rgba(255,68,204,.4)"
        strokeWidth=".8"
      />

      {/* Right side booster */}
      <rect
        x="90"
        y="120"
        width="26"
        height="88"
        rx="6"
        fill="url(#ns_booster)"
        stroke="rgba(255,68,204,.38)"
        strokeWidth=".9"
      />
      <line
        x1="103"
        y1="135"
        x2="103"
        y2="188"
        stroke="rgba(255,68,204,.1)"
        strokeWidth=".5"
        strokeDasharray="3 3"
      />
      <polygon
        points="103,120 109,108 97,108"
        fill="#200830"
        stroke="rgba(255,68,204,.45)"
        strokeWidth=".8"
      />
      <ellipse
        cx="103"
        cy="208"
        rx="9"
        ry="4"
        fill="#0A0412"
        stroke="rgba(255,68,204,.4)"
        strokeWidth=".8"
      />

      {/* Shoulder armour plates */}
      <polygon
        points="42,98 14,88 12,100 42,112"
        fill="#180626"
        stroke="rgba(255,68,204,.3)"
        strokeWidth=".8"
      />
      <polygon
        points="88,98 116,88 118,100 88,112"
        fill="#180626"
        stroke="rgba(255,68,204,.3)"
        strokeWidth=".8"
      />
      <rect
        x="12"
        y="88"
        width="12"
        height="3"
        rx="1.5"
        fill="#FF44CC"
        opacity=".9"
      />
      <rect
        x="106"
        y="88"
        width="12"
        height="3"
        rx="1.5"
        fill="#FF44CC"
        opacity=".9"
      />

      {/* Swept base fins */}
      <polygon
        points="40,178 10,210 18,216 42,190"
        fill="#120618"
        stroke="rgba(255,68,204,.28)"
        strokeWidth=".7"
      />
      <polygon
        points="90,178 120,210 112,216 88,190"
        fill="#120618"
        stroke="rgba(255,68,204,.28)"
        strokeWidth=".7"
      />

      {/* Main body */}
      <polygon
        points="65,10 82,30 82,208 65,216 48,208 48,30"
        fill="url(#ns_body)"
        stroke="rgba(255,68,204,.55)"
        strokeWidth="1.3"
      />
      <line
        x1="65"
        y1="10"
        x2="65"
        y2="216"
        stroke="rgba(255,68,204,.08)"
        strokeWidth=".5"
        strokeDasharray="6 5"
      />
      <rect
        x="48"
        y="62"
        width="34"
        height="5"
        rx="1.5"
        fill="#1A0828"
        stroke="rgba(255,68,204,.22)"
        strokeWidth=".7"
      />
      <rect
        x="48"
        y="98"
        width="34"
        height="5"
        rx="1.5"
        fill="#1A0828"
        stroke="rgba(255,68,204,.22)"
        strokeWidth=".7"
      />
      <rect
        x="48"
        y="138"
        width="34"
        height="5"
        rx="1.5"
        fill="#1A0828"
        stroke="rgba(255,68,204,.22)"
        strokeWidth=".7"
      />
      <rect
        x="48"
        y="178"
        width="34"
        height="5"
        rx="1.5"
        fill="#1A0828"
        stroke="rgba(255,68,204,.25)"
        strokeWidth=".8"
      />
      <line
        x1="65"
        y1="40"
        x2="65"
        y2="180"
        stroke="rgba(255,68,204,.12)"
        strokeWidth="1.5"
      />

      {/* Porthole */}
      <circle
        cx="65"
        cy="112"
        r="6"
        fill="#100018"
        stroke="rgba(255,68,204,.4)"
        strokeWidth=".9"
      />
      <circle cx="63" cy="110" r="2.5" fill="rgba(255,180,240,.2)" />

      {/* Cockpit */}
      <polygon
        points="65,16 78,28 76,52 65,58 54,52 52,28"
        fill="#1A0628"
        stroke="rgba(255,180,240,.55)"
        strokeWidth="1"
      />
      <polygon points="58,20 65,16 71,28 60,33" fill="rgba(255,210,245,.25)" />
      <line
        x1="65"
        y1="16"
        x2="65"
        y2="58"
        stroke="rgba(255,68,204,.1)"
        strokeWidth=".5"
      />

      {/* Nose */}
      <path
        d="M65,10 Q74,6 75,22 L55,22 Q56,6 65,10Z"
        fill="url(#ns_nose)"
        stroke="rgba(255,68,204,.6)"
        strokeWidth="1"
      />
      <polygon points="65,10 68,5 62,5" fill="#FF44CC" opacity="1" />

      {/* Triple nozzle row */}
      <polygon
        points="40,206 56,206 58,214 38,214"
        fill="#0A0412"
        stroke="rgba(255,68,204,.4)"
        strokeWidth=".8"
      />
      <polygon
        points="58,208 72,208 74,216 56,216"
        fill="#0A0412"
        stroke="rgba(255,68,204,.45)"
        strokeWidth=".8"
      />
      <polygon
        points="72,206 88,206 90,214 70,214"
        fill="#0A0412"
        stroke="rgba(255,68,204,.4)"
        strokeWidth=".8"
      />
    </svg>
  );
}
