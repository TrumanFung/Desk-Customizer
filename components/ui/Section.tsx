import type { ReactNode } from "react";

export function Section({
  title,
  description,
  children
}: {
  title: string;
  description?: string;
  children: ReactNode;
}) {
  return (
    <div className="rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm transition-all hover:shadow-md">
      <h2 className="text-xs font-semibold uppercase tracking-wider text-neutral-400">
        {title}
      </h2>
      {description ? (
        <p className="mt-1 text-xs text-neutral-500">{description}</p>
      ) : null}
      <div className="mt-5 space-y-5">{children}</div>
    </div>
  );
}
