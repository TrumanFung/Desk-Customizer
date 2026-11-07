import type { Hardware, HardwareTone } from "@/lib/desk2d/catalog";
import { PX_PER_INCH } from "./shared";

const TONES: Record<HardwareTone, { fill: string; edge: string; shine: string }> = {
  chrome: { fill: "#d5d9de", edge: "#7d838c", shine: "#ffffff" },
  silver: { fill: "#bfc3ca", edge: "#6f757e", shine: "#f1f3f5" },
  black: { fill: "#1a1a1d", edge: "#000000", shine: "#5a5a60" }
};

/** Natural drawn width of each pull, in drawing px. */
export function hardwareWidth(hardware: Hardware): number {
  switch (hardware.kind) {
    case "bar":
      return (hardware.lengthIn ?? 6) * PX_PER_INCH;
    case "crystal":
      return 36;
    case "cascade":
      return 44;
    case "spring":
      return 38;
    case "sleek":
      return 40;
    case "bow":
      return 34;
    case "knob":
      return 9;
  }
}

/** Draws a pull centered on (0,0). `width` lets callers shrink long pulls to fit a drawer. */
export function HardwareGlyph({ hardware, width }: { hardware: Hardware; width?: number }) {
  const tone = TONES[hardware.tone];
  const w = width ?? hardwareWidth(hardware);
  const h = w / 2;
  const stroke = { stroke: tone.edge, strokeWidth: 0.6 };

  switch (hardware.kind) {
    case "bar":
      return (
        <g>
          <rect x={-h} y={-2} width={w} height={4} rx={2} fill={tone.fill} {...stroke} />
          <line x1={-h + 2} y1={-0.8} x2={h - 2} y2={-0.8} stroke={tone.shine} strokeWidth={0.9} strokeLinecap="round" />
        </g>
      );
    case "crystal":
      return <path d={`M ${-h} 2.5 Q 0 -6 ${h} 2.5 Q 0 -1.5 ${-h} 2.5 Z`} fill={tone.fill} {...stroke} />;
    case "cascade":
      return <path d={`M ${-h} -3.5 Q 0 7 ${h} -3.5 Q 0 2 ${-h} -3.5 Z`} fill={tone.fill} {...stroke} />;
    case "spring":
      return (
        <path
          d={`M ${-h} 2 Q 0 -5 ${h} 2`}
          fill="none"
          stroke={tone.fill}
          strokeWidth={2.4}
          strokeLinecap="round"
        />
      );
    case "sleek":
      return <path d={`M ${-h} 0.5 Q 0 -3 ${h} 0.5 L ${h} 3.5 Q 0 0 ${-h} 3.5 Z`} fill={tone.fill} {...stroke} />;
    case "bow":
      return <path d={`M ${-h} 3.5 Q 0 -7 ${h} 3.5 L ${h} 5.5 Q 0 -3.5 ${-h} 5.5 Z`} fill={tone.fill} {...stroke} />;
    case "knob":
      return (
        <g>
          <circle r={4.6} fill={tone.fill} {...stroke} />
          <circle cx={-1.4} cy={-1.4} r={1.2} fill={tone.shine} />
        </g>
      );
  }
}

/** Standalone icon for picker tiles. */
export function HardwareIcon({ hardware, className }: { hardware: Hardware; className?: string }) {
  // Bar pulls are scaled to a common icon width so "2in" and "30in" both stay legible.
  const natural = hardwareWidth(hardware);
  const width = hardware.kind === "bar" ? Math.min(Math.max(natural, 14), 44) : natural;
  const scale = hardware.kind === "knob" ? 2.2 : 1.25;

  return (
    <svg viewBox="-30 -12 60 24" className={className} aria-hidden>
      <g transform={`scale(${scale})`}>
        <HardwareGlyph hardware={hardware} width={width} />
      </g>
    </svg>
  );
}
