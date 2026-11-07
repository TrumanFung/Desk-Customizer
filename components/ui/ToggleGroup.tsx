type ToggleOption<T extends string> = {
  id: T;
  label: string;
  hint?: string;
};

export function ToggleGroup<T extends string>({
  ariaLabel,
  options,
  value,
  onChange,
  columns = 1
}: {
  ariaLabel: string;
  options: ToggleOption<T>[];
  value: T;
  onChange: (id: T) => void;
  columns?: 1 | 2 | 3;
}) {
  const gridColsClass =
    columns === 3
      ? "grid-cols-1 sm:grid-cols-3"
      : columns === 2
        ? "grid-cols-2"
        : "grid-cols-1";

  return (
    <div role="group" aria-label={ariaLabel} className={`grid gap-2 ${gridColsClass}`}>
      {options.map((option) => {
        const active = value === option.id;
        return (
          <button
            key={option.id}
            type="button"
            aria-pressed={active}
            onClick={() => onChange(option.id)}
            className={`rounded-lg border px-3 py-2.5 text-left text-sm transition ${
              active
                ? "border-neutral-900 bg-neutral-900 text-white"
                : "border-neutral-200 bg-neutral-50 text-neutral-800 hover:border-neutral-300 hover:bg-white"
            }`}
          >
            <span className="font-medium">{option.label}</span>
            {option.hint ? (
              <span
                className={`mt-0.5 block text-xs leading-snug ${
                  active ? "text-neutral-300" : "text-neutral-500"
                }`}
              >
                {option.hint}
              </span>
            ) : null}
          </button>
        );
      })}
    </div>
  );
}
