"use client";

import { useEffect, useMemo } from "react";
import { useDeskStore } from "@/store/useDeskStore";
import {
  DEPTH_MAX_CM,
  DEPTH_MIN_CM,
  HEIGHT_MAX_CM,
  HEIGHT_MIN_CM,
  WIDTH_MAX_CM,
  WIDTH_MIN_CM
} from "@/lib/deskLimits";
import type { DeskKind, ReturnSide } from "@/lib/types";
import { Button } from "@/components/ui/Button";
import { Field } from "@/components/ui/Field";
import { Section } from "@/components/ui/Section";
import { SliderField } from "@/components/ui/SliderField";
import { ToggleGroup } from "@/components/ui/ToggleGroup";
import { inputBase } from "@/components/ui/inputStyles";

const DESK_KINDS: { id: DeskKind; label: string; hint: string }[] = [
  { id: "writing", label: "Writing", hint: "Four legs, optional drawer stacks" },
  { id: "executive", label: "Executive", hint: "Pedestal bases, wide top" },
  { id: "l-shaped", label: "L-Shaped", hint: "Main desk with a left or right return" }
];

const RETURN_SIDES: { id: ReturnSide; label: string }[] = [
  { id: "left", label: "Left return" },
  { id: "right", label: "Right return" }
];

export function DeskControls() {
  const {
    width,
    depth,
    height,
    color,
    deskKind,
    returnSide,
    drawersLeft,
    drawersRight,
    name,
    selectedDesignId,
    designs,
    isBusy,
    error,
    dismissError,
    setWidth,
    setDepth,
    setHeight,
    setColor,
    setDeskKind,
    setReturnSide,
    setName,
    toggleDrawerLeft,
    toggleDrawerRight,
    listDesigns,
    loadDesign,
    saveDesign,
    deleteDesign
  } = useDeskStore();

  useEffect(() => {
    void listDesigns();
  }, [listDesigns]);

  const selected = useMemo(() => {
    if (!selectedDesignId) return null;
    return designs.find((d) => d.id === selectedDesignId) ?? null;
  }, [designs, selectedDesignId]);

  const drawerNote =
    deskKind === "executive"
      ? "Adds drawer fronts on the pedestals."
      : deskKind === "l-shaped"
        ? "Drawer units stay on the main desk while the return extends left or right."
        : "Toggle drawer units on each side.";

  return (
    <div className="space-y-5">
      <Section
        title="Desk type"
        description="Switch style; dimensions and finish apply to all types."
      >
        <ToggleGroup
          ariaLabel="Desk type"
          options={DESK_KINDS}
          value={deskKind}
          onChange={setDeskKind}
          columns={3}
        />
      </Section>

      <Section title="Dimensions" description="All measurements in centimeters.">
        <SliderField
          label="Width"
          unit="cm"
          min={WIDTH_MIN_CM}
          max={WIDTH_MAX_CM}
          value={width}
          onChange={setWidth}
        />
        <SliderField
          label="Depth"
          unit="cm"
          min={DEPTH_MIN_CM}
          max={DEPTH_MAX_CM}
          value={depth}
          onChange={setDepth}
        />
        <SliderField
          label="Height"
          unit="cm"
          min={HEIGHT_MIN_CM}
          max={HEIGHT_MAX_CM}
          value={height}
          onChange={setHeight}
        />
      </Section>

      <Section title="Finish">
        <Field label="Desktop color">
          <div className="flex items-center gap-3">
            <input
              className="h-11 w-16 cursor-pointer overflow-hidden rounded-lg border border-neutral-300 bg-white p-0.5 shadow-sm"
              type="color"
              value={color}
              onChange={(e) => setColor(e.target.value)}
            />
            <code className="text-xs text-neutral-500">{color}</code>
          </div>
        </Field>
      </Section>

      <Section title="Options" description={drawerNote}>
        {deskKind === "l-shaped" ? (
          <Field label="Return side">
            <ToggleGroup
              ariaLabel="Return side"
              options={RETURN_SIDES}
              value={returnSide}
              onChange={setReturnSide}
              columns={2}
            />
          </Field>
        ) : null}

        <div className="flex flex-col gap-3 sm:flex-row sm:gap-6">
          <label className="flex cursor-pointer items-center gap-2.5 text-sm text-neutral-700">
            <input
              type="checkbox"
              className="size-4 rounded border-neutral-300 text-neutral-900 focus:ring-neutral-400"
              checked={drawersLeft}
              onChange={toggleDrawerLeft}
            />
            Left drawers
          </label>
          <label className="flex cursor-pointer items-center gap-2.5 text-sm text-neutral-700">
            <input
              type="checkbox"
              className="size-4 rounded border-neutral-300 text-neutral-900 focus:ring-neutral-400"
              checked={drawersRight}
              onChange={toggleDrawerRight}
            />
            Right drawers
          </label>
        </div>
      </Section>

      <Section
        title="Library"
        description="Saved on this machine via the local API (JSON file)."
      >
        <Field label="Design name">
          <input
            className={`w-full ${inputBase}`}
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="e.g. Oak office desk"
          />
        </Field>

        <div className="flex flex-wrap gap-2">
          <Button variant="primary" onClick={() => void saveDesign()} disabled={isBusy}>
            {isBusy ? "Saving…" : selectedDesignId ? "Save changes" : "Save as new"}
          </Button>
          <Button onClick={() => void listDesigns()} disabled={isBusy}>
            {isBusy ? "Refreshing…" : "Refresh list"}
          </Button>
          {selectedDesignId ? (
            <Button
              variant="danger"
              onClick={() => void deleteDesign(selectedDesignId)}
              disabled={isBusy}
              title="Delete the selected design"
            >
              Delete
            </Button>
          ) : null}
        </div>

        <Field label="Saved designs">
          <select
            className={`w-full ${inputBase}`}
            value={selectedDesignId ?? ""}
            onChange={(e) => {
              const id = e.target.value;
              if (id) void loadDesign(id);
            }}
            disabled={isBusy}
          >
            <option value="">Select a design…</option>
            {designs.map((d) => (
              <option key={d.id} value={d.id}>
                {d.name ?? d.id} — {new Date(d.updatedAt).toLocaleString()}
              </option>
            ))}
          </select>
        </Field>

        <p className="text-xs text-neutral-500">
          Active file:{" "}
          {selected ? (
            <span className="font-mono text-neutral-700">{selected.id}</span>
          ) : (
            <span>none</span>
          )}
        </p>

        {error ? (
          <div
            className="flex items-start justify-between gap-3 rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-800"
            role="alert"
          >
            <span>{error}</span>
            <button
              type="button"
              onClick={dismissError}
              aria-label="Dismiss error"
              className="shrink-0 text-red-500 hover:text-red-700"
            >
              ×
            </button>
          </div>
        ) : null}
      </Section>
    </div>
  );
}
