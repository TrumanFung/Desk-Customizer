/** Mixes a hex color toward black (negative percent) or white (positive percent). */
export function shadeHex(hex: string, percent: number): string {
  const normalized = hex.replace("#", "");
  const bytes =
    normalized.length === 3
      ? normalized.split("").map((c) => c + c)
      : [normalized.slice(0, 2), normalized.slice(2, 4), normalized.slice(4, 6)];

  const [r, g, b] = bytes.map((byte) => parseInt(byte, 16));
  const mixTarget = percent < 0 ? 0 : 255;
  const amount = Math.min(1, Math.abs(percent) / 100);

  const mix = (channel: number) => Math.round(channel + (mixTarget - channel) * amount);

  const toHex = (channel: number) => channel.toString(16).padStart(2, "0");

  return `#${toHex(mix(r))}${toHex(mix(g))}${toHex(mix(b))}`;
}

/** Approximate perceived brightness from 0 (black) to 1 (white). */
export function luminance(hex: string): number {
  const normalized = hex.replace("#", "");
  const [r, g, b] = [0, 2, 4].map((i) => parseInt(normalized.slice(i, i + 2), 16));
  return (0.2126 * r + 0.7152 * g + 0.0722 * b) / 255;
}
