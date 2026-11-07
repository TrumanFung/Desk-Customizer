import {
  DEFAULT_CONFIG,
  DESIGNER_UPCHARGE_PERCENT,
  FINISHES,
  HARDWARE,
  type DeskConfig,
  type Finish,
  type Hardware,
  type PedestalSide
} from "./catalog";

export function getFinish(id: string): Finish {
  return (
    FINISHES.find((f) => f.id === id) ??
    FINISHES.find((f) => f.id === DEFAULT_CONFIG.topId)!
  );
}

export function getHardware(id: string): Hardware {
  return (
    HARDWARE.find((h) => h.id === id) ??
    HARDWARE.find((h) => h.id === DEFAULT_CONFIG.hardwareId)!
  );
}

export function usesDesignerFinish(config: DeskConfig): boolean {
  return (
    getFinish(config.topId).tier === "designer" ||
    getFinish(config.baseId).tier === "designer"
  );
}

export function encodeConfig(config: DeskConfig): string {
  const params = new URLSearchParams({
    top: config.topId,
    base: config.baseId,
    hw: config.hardwareId,
    ped: config.pedestalSide
  });
  return params.toString();
}

/** Returns null when the params contain no design at all; unknown ids fall back to defaults. */
export function decodeConfig(params: URLSearchParams): DeskConfig | null {
  if (!["top", "base", "hw", "ped"].some((key) => params.has(key))) return null;

  const finishId = (value: string | null, fallback: string) =>
    FINISHES.some((f) => f.id === value) ? (value as string) : fallback;
  const hardwareId = params.get("hw");
  const side: PedestalSide = params.get("ped") === "left" ? "left" : "right";

  return {
    topId: finishId(params.get("top"), DEFAULT_CONFIG.topId),
    baseId: finishId(params.get("base"), DEFAULT_CONFIG.baseId),
    hardwareId: HARDWARE.some((h) => h.id === hardwareId)
      ? (hardwareId as string)
      : DEFAULT_CONFIG.hardwareId,
    pedestalSide: side
  };
}

function finishLine(label: string, finish: Finish): string {
  const tier = finish.tier === "designer" ? " [Designer finish]" : "";
  return `${label}: ${finish.name} (${finish.maker} #${finish.code})${tier}`;
}

export function buildSpecText(config: DeskConfig): string {
  const lines = [
    "United Desk — Create Your Own Design",
    finishLine("Top finish", getFinish(config.topId)),
    finishLine("Base / pedestal finish", getFinish(config.baseId)),
    `Hardware: ${getHardware(config.hardwareId).name}`,
    `Pedestal side: ${config.pedestalSide === "left" ? "Left" : "Right"}`
  ];
  if (usesDesignerFinish(config)) {
    lines.push(`Note: designer finishes add ${DESIGNER_UPCHARGE_PERCENT}% per the price book.`);
  }
  return lines.join("\n");
}
