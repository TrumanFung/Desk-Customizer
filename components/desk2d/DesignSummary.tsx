"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { DESIGNER_UPCHARGE_PERCENT } from "@/lib/desk2d/catalog";
import {
  buildSpecText,
  getFinish,
  getHardware,
  usesDesignerFinish
} from "@/lib/desk2d/config";
import { useDesk2DStore } from "@/store/useDesk2DStore";
import { HardwareIcon } from "./Hardware";

type CopyTarget = "link" | "spec";

export function DesignSummary() {
  const config = useDesk2DStore((s) => s.config);
  const [copied, setCopied] = useState<CopyTarget | null>(null);

  const top = getFinish(config.topId);
  const base = getFinish(config.baseId);
  const hardware = getHardware(config.hardwareId);
  const designer = usesDesignerFinish(config);

  async function copy(target: CopyTarget) {
    const text = target === "link" ? window.location.href : buildSpecText(config);
    try {
      await navigator.clipboard.writeText(text);
      setCopied(target);
      window.setTimeout(() => setCopied(null), 2000);
    } catch {
      window.prompt("Copy this:", text);
    }
  }

  function mailto() {
    const subject = encodeURIComponent("Desk design — quote request");
    const body = encodeURIComponent(`${buildSpecText(config)}\n\nView this design: ${window.location.href}`);
    window.location.href = `mailto:?subject=${subject}&body=${body}`;
  }

  const rows = [
    { label: "Top", value: top.name, detail: `${top.maker} #${top.code}`, hex: top.hex },
    { label: "Base", value: base.name, detail: `${base.maker} #${base.code}`, hex: base.hex },
    { label: "Hardware", value: hardware.name, detail: undefined, hex: undefined }
  ];

  return (
    <section
      aria-label="Your design"
      className="mt-6 shrink-0 rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm"
    >
      <h2 className="text-xs font-semibold uppercase tracking-wider text-neutral-400">
        Your design
      </h2>
      <dl className="mt-4 grid gap-3 sm:grid-cols-3">
        {rows.map((row) => (
          <div key={row.label} className="flex items-center gap-3">
            {row.hex ? (
              <span
                className="size-9 shrink-0 rounded-lg ring-1 ring-neutral-200"
                style={{ backgroundColor: row.hex }}
              />
            ) : (
              <span className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-neutral-100 ring-1 ring-neutral-200">
                <HardwareIcon hardware={hardware} className="h-6 w-8" />
              </span>
            )}
            <div className="min-w-0">
              <dt className="text-xs text-neutral-400">{row.label}</dt>
              <dd className="truncate text-sm font-medium text-neutral-900">{row.value}</dd>
              {row.detail ? <dd className="truncate text-xs text-neutral-500">{row.detail}</dd> : null}
            </div>
          </div>
        ))}
      </dl>

      {designer ? (
        <p className="mt-4 rounded-lg bg-amber-50 px-3 py-2 text-xs text-amber-900">
          This design uses a designer finish, which adds {DESIGNER_UPCHARGE_PERCENT}% per the price
          book.
        </p>
      ) : null}

      <div className="mt-5 flex flex-wrap gap-2">
        <Button variant="primary" onClick={() => void copy("link")}>
          {copied === "link" ? "Link copied" : "Copy share link"}
        </Button>
        <Button onClick={() => void copy("spec")}>
          {copied === "spec" ? "Spec copied" : "Copy spec sheet"}
        </Button>
        <Button onClick={mailto}>Email this design</Button>
      </div>
    </section>
  );
}
