interface CaptureCrewLogoProps {
  primaryColor?: string;   // camera frame + arc + text
  accentColor?: string;    // aperture blades
  width?: number | string;
  height?: number | string;
  className?: string;
}

export default function CaptureCrewLogo({
  primaryColor = "#C8A96B",
  accentColor = "#C8A96B",
  width = "100%",
  height = "auto",
  className,
}: CaptureCrewLogoProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 520 320"
      width={width}
      height={height}
      className={className}
      aria-label="Capture Crew"
      role="img"
    >
      {/* ── Top shutter bump ── */}
      <rect x="210" y="68" width="100" height="14" rx="3" fill={primaryColor} />

      {/* ── Camera frame brackets ── */}
      {/* Left bracket */}
      <rect x="70"  y="90"  width="18" height="160" fill={primaryColor} />
      <rect x="70"  y="90"  width="70" height="18"  fill={primaryColor} />
      <rect x="70"  y="232" width="70" height="18"  fill={primaryColor} />

      {/* Right bracket */}
      <rect x="432" y="90"  width="18" height="160" fill={primaryColor} />
      <rect x="380" y="90"  width="70" height="18"  fill={primaryColor} />
      <rect x="380" y="232" width="70" height="18"  fill={primaryColor} />

      {/* ── Lens arc (outer ring, half-circle) ── */}
      {/*
        Centre: (260, 250)  Outer radius: 130  Inner radius: 108
        We draw a thick semicircle as a path:
        outer arc top-right → outer arc top-left → inner arc top-left → inner arc top-right
      */}
      <path
        d="
          M 130 250
          A 130 130 0 0 1 390 250
          L 368 250
          A 108 108 0 0 0 152 250
          Z
        "
        fill={primaryColor}
      />

      {/* ── Aperture blades (red) ── */}
      {/*
        Six roughly-triangular blades radiating from centre (260,250).
        They collectively fill the upper semicircle inside the arc.
        Constructed so white gaps appear between blades.
      */}

      {/* Clip to the inner semicircle so blades don't overflow */}
      <defs>
        <clipPath id="lens-clip">
          <path d="M 152 250 A 108 108 0 0 1 368 250 Z" />
        </clipPath>
      </defs>

      <g clipPath="url(#lens-clip)">
        {/* Blade 1 – far left */}
        <polygon points="152,250 180,145 230,175" fill={accentColor} />
        {/* Blade 2 – left-centre */}
        <polygon points="180,145 260,120 240,200" fill={accentColor} />
        {/* Blade 3 – centre-left */}
        <polygon points="240,200 260,120 290,200" fill={accentColor} />
        {/* Blade 4 – centre-right */}
        <polygon points="260,120 340,145 280,200" fill={accentColor} />
        {/* Blade 5 – right-centre */}
        <polygon points="340,145 368,250 310,195" fill={accentColor} />
        {/* Blade 6 – far right */}
        <polygon points="310,195 368,250 350,250" fill={accentColor} />

        {/* White gap lines (simulate aperture gaps) */}
        <line x1="260" y1="250" x2="180" y2="145" stroke="white" strokeWidth="4" />
        <line x1="260" y1="250" x2="260" y2="118" stroke="white" strokeWidth="4" />
        <line x1="260" y1="250" x2="340" y2="145" stroke="white" strokeWidth="4" />
        <line x1="260" y1="250" x2="210" y2="175" stroke="white" strokeWidth="3" />
        <line x1="260" y1="250" x2="310" y2="175" stroke="white" strokeWidth="3" />
      </g>

      {/* ── "CAPTURE CREW" text ── */}
      <text
        x="260"
        y="295"
        textAnchor="middle"
        fontFamily="'Arial', 'Helvetica', sans-serif"
        fontWeight="700"
        fontSize="36"
        letterSpacing="12"
        fill={primaryColor}
      >
        CAPTURE CREW
      </text>
    </svg>
  );
}
