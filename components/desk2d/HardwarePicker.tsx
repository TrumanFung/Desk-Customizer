import { HARDWARE } from "@/lib/desk2d/catalog";
import { HardwareIcon } from "./Hardware";

export function HardwarePicker({
  value,
  onChange
}: {
  value: string;
  onChange: (id: string) => void;
}) {
  return (
    <div role="group" aria-label="Hardware" className="grid grid-cols-3 gap-2">
      {HARDWARE.map((hardware) => {
        const active = hardware.id === value;
        return (
          <button
            key={hardware.id}
            type="button"
            aria-pressed={active}
            onClick={() => onChange(hardware.id)}
            className={`flex flex-col items-center gap-1 rounded-lg border px-1 py-2 text-center transition ${
              active
                ? "border-neutral-900 bg-neutral-900 text-white"
                : "border-neutral-200 bg-neutral-50 text-neutral-800 hover:border-neutral-300 hover:bg-white"
            }`}
          >
            {/* Tiles sit on a light chip so black pulls stay visible on the dark active state. */}
            <span className="flex h-7 w-full items-center justify-center rounded bg-neutral-100">
              <HardwareIcon hardware={hardware} className="h-6 w-14" />
            </span>
            <span className="text-[11px] font-medium leading-tight">{hardware.name}</span>
          </button>
        );
      })}
    </div>
  );
}
