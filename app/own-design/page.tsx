"use client";

import { Desk2DPreview } from "@/components/Desk2DPreview";
import { DesignSummary } from "@/components/desk2d/DesignSummary";
import { useConfigUrlSync } from "@/components/desk2d/useConfigUrlSync";

export default function OwnDesignPage() {
  const loaded = useConfigUrlSync();

  return (
    <main className="flex flex-1 min-h-0 flex-col bg-neutral-50 p-4 sm:p-6 md:overflow-y-auto">
      <header className="mb-4 shrink-0 text-left sm:mb-6">
        <div className="flex flex-wrap items-center gap-3">
          <h1 className="text-2xl font-bold tracking-tight text-neutral-900 sm:text-4xl">
            Create Your Own Design
          </h1>
          <span className="rounded-full bg-neutral-900 px-2.5 py-1 text-[11px] font-medium uppercase tracking-wider text-white">
            Concept
          </span>
        </div>
        <p className="mt-2 text-sm text-neutral-500">
          Preview any color combination — no plugins required.
        </p>
      </header>

      {/* Hidden until the URL is read so a shared link never flashes the default design. */}
      <div className={`transition-opacity duration-200 ${loaded ? "opacity-100" : "opacity-0"}`}>
        <div className="shrink-0 overflow-hidden rounded-2xl border border-neutral-200 bg-white shadow-lg">
          <div className="relative mx-auto flex w-full min-w-0 max-w-[1120px] bg-neutral-100 md:h-[min(52vh,460px)]">
            <Desk2DPreview />
          </div>
        </div>

        <DesignSummary />
      </div>
    </main>
  );
}
