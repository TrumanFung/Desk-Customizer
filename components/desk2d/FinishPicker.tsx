import {
  DESIGNER_UPCHARGE_PERCENT,
  FINISHES,
  type Finish,
  type FinishTier
} from "@/lib/desk2d/catalog";
import { getFinish } from "@/lib/desk2d/config";
import { luminance } from "@/lib/color";

// A hint of grain on each tile so wood and speckled laminates read differently from solids.
function tileBackground(finish: Finish): React.CSSProperties {
  const light = luminance(finish.hex) < 0.22;
  const line = light ? "rgba(255,255,255,0.10)" : "rgba(0,0,0,0.10)";
  const grain =
    finish.texture === "wood"
      ? `repeating-linear-gradient(0deg, ${line} 0 1px, transparent 1px 4px)`
      : finish.texture === "linear"
        ? `repeating-linear-gradient(0deg, ${line} 0 1px, transparent 1px 2px)`
        : finish.texture === "speckle"
          ? `radial-gradient(${line} 1px, transparent 1.5px) 0 0 / 4px 4px`
          : undefined;
  return { backgroundColor: finish.hex, backgroundImage: grain };
}

const GROUPS: { tier: FinishTier; label: string }[] = [
  { tier: "standard", label: "Standard" },
  { tier: "designer", label: `Designer · +${DESIGNER_UPCHARGE_PERCENT}%` }
];

export function FinishPicker({
  ariaLabel,
  value,
  onChange
}: {
  ariaLabel: string;
  value: string;
  onChange: (id: string) => void;
}) {
  const selected = getFinish(value);

  return (
    <div role="group" aria-label={ariaLabel} className="space-y-3">
      {GROUPS.map((group) => (
        <div key={group.tier}>
          <p className="mb-1.5 text-[11px] font-medium uppercase tracking-wider text-neutral-400">
            {group.label}
          </p>
          <div className="grid grid-cols-5 gap-2">
            {FINISHES.filter((f) => f.tier === group.tier).map((finish) => {
              const active = finish.id === value;
              return (
                <button
                  key={finish.id}
                  type="button"
                  aria-pressed={active}
                  aria-label={`${finish.name} (${finish.maker} #${finish.code})`}
                  title={`${finish.name} — ${finish.maker} #${finish.code}`}
                  onClick={() => onChange(finish.id)}
                  className={`aspect-square w-full rounded-lg border-2 transition ${
                    active
                      ? "border-neutral-900 ring-2 ring-neutral-300 ring-offset-2"
                      : "border-white ring-1 ring-neutral-200 hover:ring-neutral-400"
                  }`}
                  style={tileBackground(finish)}
                />
              );
            })}
          </div>
        </div>
      ))}
      <p className="flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-neutral-600">
        <span>
          <span className="font-medium text-neutral-900">{selected.name}</span>
          <span className="text-neutral-500">
            {" "}
            · {selected.maker} #{selected.code}
          </span>
        </span>
        {selected.tier === "designer" ? (
          <span className="whitespace-nowrap rounded-full bg-amber-100 px-2 py-0.5 text-[10px] font-medium text-amber-800">
            Designer +{DESIGNER_UPCHARGE_PERCENT}%
          </span>
        ) : null}
      </p>
    </div>
  );
}
