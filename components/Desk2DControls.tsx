"use client";

import { FinishPicker } from "@/components/desk2d/FinishPicker";
import { HardwarePicker } from "@/components/desk2d/HardwarePicker";
import { Button } from "@/components/ui/Button";
import { Section } from "@/components/ui/Section";
import { ToggleGroup } from "@/components/ui/ToggleGroup";
import { FEATURED_COMBOS, type PedestalSide } from "@/lib/desk2d/catalog";
import { getFinish } from "@/lib/desk2d/config";
import { useDesk2DStore } from "@/store/useDesk2DStore";

const PEDESTAL_SIDES: { id: PedestalSide; label: string }[] = [
  { id: "left", label: "Left pedestal" },
  { id: "right", label: "Right pedestal" }
];

export function Desk2DControls() {
  const config = useDesk2DStore((s) => s.config);
  const setConfig = useDesk2DStore((s) => s.setConfig);
  const setTopFinish = useDesk2DStore((s) => s.setTopFinish);
  const setBaseFinish = useDesk2DStore((s) => s.setBaseFinish);
  const matchBaseToTop = useDesk2DStore((s) => s.matchBaseToTop);
  const setHardware = useDesk2DStore((s) => s.setHardware);
  const setPedestalSide = useDesk2DStore((s) => s.setPedestalSide);

  return (
    <div className="space-y-5">
      <Section title="Quick start" description="Popular pairings — then tweak any part.">
        <div className="flex flex-wrap gap-2">
          {FEATURED_COMBOS.map((combo) => (
            <button
              key={combo.id}
              type="button"
              onClick={() => setConfig(combo.config)}
              className="flex items-center gap-2 rounded-full border border-neutral-200 bg-white px-3 py-1.5 text-xs font-medium text-neutral-800 transition hover:border-neutral-400"
            >
              <span className="flex -space-x-1">
                <span
                  className="size-3.5 rounded-full ring-1 ring-white"
                  style={{ backgroundColor: getFinish(combo.config.topId).hex }}
                />
                <span
                  className="size-3.5 rounded-full ring-1 ring-white"
                  style={{ backgroundColor: getFinish(combo.config.baseId).hex }}
                />
              </span>
              {combo.label}
            </button>
          ))}
        </div>
      </Section>

      <Section title="Top finish" description="Desktop surface.">
        <FinishPicker ariaLabel="Top finish" value={config.topId} onChange={setTopFinish} />
      </Section>

      <Section title="Base finish" description="End panel and pedestal.">
        <FinishPicker ariaLabel="Base finish" value={config.baseId} onChange={setBaseFinish} />
        <Button onClick={matchBaseToTop} disabled={config.baseId === config.topId}>
          Match top finish
        </Button>
      </Section>

      <Section title="Hardware" description="Drawer pulls.">
        <HardwarePicker value={config.hardwareId} onChange={setHardware} />
      </Section>

      <Section title="Layout">
        <ToggleGroup
          ariaLabel="Pedestal side"
          options={PEDESTAL_SIDES}
          value={config.pedestalSide}
          onChange={setPedestalSide}
          columns={2}
        />
      </Section>

      <p className="px-1 text-[11px] leading-relaxed text-neutral-400">
        Finishes are printed reproductions and may differ from the actual product. Please
        refer to actual samples before specifying.
      </p>
    </div>
  );
}
