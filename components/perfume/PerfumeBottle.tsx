import { useId } from "react";

type BodyGeometry =
  | { kind: "rect"; x: number; y: number; width: number; height: number; rx: number }
  | { kind: "circle"; cx: number; cy: number; r: number };

type BlockGeometry = { x: number; y: number; width: number; height: number; rx?: number };

type Shape = {
  body: BodyGeometry;
  liquidTop: number;
  cap: BlockGeometry;
  neck: BlockGeometry | null;
  highlight: BlockGeometry;
};

// As três silhuetas (desenhadas num quadro de 100 x 140)
const SHAPES: Record<0 | 1 | 2, Shape> = {
  // Frasco retangular
  0: {
    body: { kind: "rect", x: 16, y: 26, width: 68, height: 110, rx: 16 },
    liquidTop: 62,
    cap: { x: 38, y: 4, width: 24, height: 14, rx: 3 },
    neck: { x: 44, y: 18, width: 12, height: 10 },
    highlight: { x: 24, y: 42, width: 6, height: 70, rx: 3 },
  },
  // Frasco redondo
  1: {
    body: { kind: "circle", cx: 50, cy: 88, r: 48 },
    liquidTop: 72,
    cap: { x: 40, y: 4, width: 20, height: 12, rx: 3 },
    neck: { x: 45, y: 16, width: 10, height: 26 },
    highlight: { x: 22, y: 66, width: 6, height: 40, rx: 3 },
  },
  // Frasco alto e fino
  2: {
    body: { kind: "rect", x: 30, y: 22, width: 40, height: 116, rx: 8 },
    liquidTop: 54,
    cap: { x: 38, y: 2, width: 24, height: 20, rx: 2 },
    neck: null,
    highlight: { x: 36, y: 36, width: 5, height: 84, rx: 2.5 },
  },
};

type BodyProps = {
  fill?: string;
  stroke?: string;
  strokeWidth?: number;
};

function renderBody(geometry: BodyGeometry, props: BodyProps) {
  return geometry.kind === "rect" ? (
    <rect
      x={geometry.x}
      y={geometry.y}
      width={geometry.width}
      height={geometry.height}
      rx={geometry.rx}
      {...props}
    />
  ) : (
    <circle cx={geometry.cx} cy={geometry.cy} r={geometry.r} {...props} />
  );
}

type PerfumeBottleProps = {
  color: string;
  variant?: 0 | 1 | 2;
  className?: string;
};

export default function PerfumeBottle({
  color,
  variant = 0,
  className = "",
}: PerfumeBottleProps) {
  const uid = useId().replace(/:/g, "");
  const clipId = `bottle-clip-${uid}`;
  const depthId = `bottle-depth-${uid}`;
  const shape = SHAPES[variant];

  return (
    <svg viewBox="0 0 100 140" className={className} aria-hidden="true">
      <defs>
        <clipPath id={clipId}>{renderBody(shape.body, {})}</clipPath>
        <linearGradient id={depthId} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#000000" stopOpacity="0" />
          <stop offset="1" stopColor="#000000" stopOpacity="0.22" />
        </linearGradient>
      </defs>

      {/* Vidro */}
      {renderBody(shape.body, { fill: "rgba(255,255,255,0.3)" })}

      {/* Líquido */}
      <g clipPath={`url(#${clipId})`}>
        <rect
          x="0"
          y={shape.liquidTop}
          width="100"
          height={140 - shape.liquidTop}
          fill={color}
        />
        <rect
          x="0"
          y={shape.liquidTop}
          width="100"
          height={140 - shape.liquidTop}
          fill={`url(#${depthId})`}
        />
        <rect
          x="0"
          y={shape.liquidTop}
          width="100"
          height="2.5"
          fill="rgba(255,255,255,0.5)"
        />
      </g>

      {/* Contorno do vidro */}
      {renderBody(shape.body, {
        fill: "none",
        stroke: "rgba(255,255,255,0.75)",
        strokeWidth: 1.6,
      })}

      {/* Pescoço, tampa e reflexo */}
      {shape.neck && (
        <rect {...shape.neck} fill="rgba(255,255,255,0.5)" />
      )}
      <rect {...shape.cap} fill="#16181d" />
      <rect {...shape.highlight} fill="rgba(255,255,255,0.55)" />
    </svg>
  );
}