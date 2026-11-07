import { inputBase } from "./inputStyles";

export function SliderField({
  label,
  unit,
  min,
  max,
  value,
  onChange
}: {
  label: string;
  unit: string;
  min: number;
  max: number;
  value: number;
  onChange: (n: number) => void;
}) {
  const inputId = `slider-field-${label.toLowerCase().replace(/\s+/g, "-")}`;

  return (
    <div>
      <label htmlFor={inputId} className="mb-1.5 block text-sm font-medium text-neutral-700">
        {label} — {value} {unit}
      </label>
      <div className="flex items-center gap-3">
        <input
          id={inputId}
          className={`w-full min-w-0 flex-1 ${inputBase}`}
          type="range"
          min={min}
          max={max}
          value={value}
          onChange={(e) => onChange(Number(e.target.value))}
        />
        <input
          type="number"
          min={min}
          max={max}
          value={value}
          onChange={(e) => onChange(Number(e.target.value))}
          aria-label={`${label} in ${unit}, exact value`}
          className={`w-20 shrink-0 ${inputBase}`}
        />
      </div>
    </div>
  );
}
