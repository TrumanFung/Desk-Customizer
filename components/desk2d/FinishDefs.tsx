import type { Finish } from "@/lib/desk2d/catalog";
import { luminance } from "@/lib/color";

type GrainTexture = Exclude<Finish["texture"], "solid">;
type GrainTint = "dark" | "light";

// Each texture is turbulence noise turned into semi-transparent streaks/specks,
// clipped to the face it is applied to. Dark finishes get light streaks so the
// grain stays visible.
const TEXTURES: Record<
  GrainTexture,
  { frequency: string; octaves: number; slope: number; offset: number; opacity: number }
> = {
  wood: { frequency: "0.008 0.17", octaves: 3, slope: 2.4, offset: -1.05, opacity: 0.38 },
  linear: { frequency: "0.004 0.6", octaves: 2, slope: 2.2, offset: -0.9, opacity: 0.3 },
  speckle: { frequency: "0.75", octaves: 1, slope: 6, offset: -3.1, opacity: 0.42 }
};

const TINTS: Record<GrainTint, string> = {
  dark: "0.1 0.05 0.02",
  light: "1 0.94 0.86"
};

export function grainFilterId(texture: GrainTexture, tint: GrainTint) {
  return `grain-${texture}-${tint}`;
}

export function grainFor(finish: Finish) {
  if (finish.texture === "solid") return null;
  const tint: GrainTint = luminance(finish.hex) < 0.22 ? "light" : "dark";
  return {
    filter: `url(#${grainFilterId(finish.texture, tint)})`,
    opacity: TEXTURES[finish.texture].opacity
  };
}

export function FinishDefs() {
  return (
    <defs>
      {(Object.keys(TEXTURES) as GrainTexture[]).flatMap((texture) =>
        (Object.keys(TINTS) as GrainTint[]).map((tint) => {
          const t = TEXTURES[texture];
          return (
            <filter
              key={`${texture}-${tint}`}
              id={grainFilterId(texture, tint)}
              x="0"
              y="0"
              width="100%"
              height="100%"
              colorInterpolationFilters="sRGB"
            >
              <feTurbulence type="fractalNoise" baseFrequency={t.frequency} numOctaves={t.octaves} seed={7} />
              <feColorMatrix
                type="matrix"
                values={`0 0 0 0 ${TINTS[tint].split(" ")[0]}  0 0 0 0 ${TINTS[tint].split(" ")[1]}  0 0 0 0 ${TINTS[tint].split(" ")[2]}  ${t.slope} 0 0 0 ${t.offset}`}
              />
              <feComposite in2="SourceGraphic" operator="in" />
            </filter>
          );
        })
      )}
      <filter id="floor-shadow" x="-20%" y="-40%" width="140%" height="180%">
        <feGaussianBlur stdDeviation="7" />
      </filter>
    </defs>
  );
}
