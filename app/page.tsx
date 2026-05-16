"use client";

import { DeskPreview } from "@/components/DeskPreview";

export default function HomePage() {
  return (
    <main className="flex flex-1 min-h-0 flex-col overflow-y-auto bg-neutral-50 p-6">
      <header className="mb-6 shrink-0 text-left">
        <h1 className="text-3xl font-bold tracking-tight text-neutral-900 sm:text-4xl">
          Desk Customizer
        </h1>
        <p className="mt-2 text-sm text-neutral-500">
          Adjust type, size, and finish—preview updates in real time.
        </p>
      </header>

      <div className="flex min-h-0 flex-1 flex-col">
        <div className="flex min-h-0 flex-1 flex-col overflow-hidden rounded-2xl border border-neutral-200 bg-white shadow-lg">
          <div className="relative mx-auto flex min-h-[min(70vh,560px)] w-full min-w-0 max-h-[600px] max-w-[1120px] flex-1 bg-neutral-100">
            <DeskPreview />
          </div>
        </div>
      </div>
    </main>
  );
}
