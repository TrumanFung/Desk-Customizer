"use client";

import { DeskControls } from "@/components/DeskControls";
import { useDeskStore } from "@/store/useDeskStore";

function MenuIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      aria-hidden
    >
      <path d="M4 7h16M4 12h16M4 17h16" />
    </svg>
  );
}

export function Sidebar() {
  const isSidebarOpen = useDeskStore((s) => s.isSidebarOpen);
  const toggleSidebar = useDeskStore((s) => s.toggleSidebar);

  return (
    <aside
      className={`flex h-full shrink-0 flex-col overflow-hidden border-r border-neutral-200 bg-white transition-all duration-300 ease-in-out ${
        isSidebarOpen ? "w-[380px]" : "w-16"
      }`}
      aria-label="Desk controls sidebar"
    >
      <div className="flex h-14 shrink-0 items-center border-b border-neutral-100 px-2">
        <button
          type="button"
          onClick={toggleSidebar}
          aria-expanded={isSidebarOpen}
          aria-controls="desk-controls-panel"
          aria-label={isSidebarOpen ? "Collapse sidebar" : "Expand sidebar"}
          className="flex size-10 items-center justify-center rounded-full text-neutral-700 transition-colors hover:bg-neutral-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-neutral-900"
        >
          <MenuIcon className="size-5" />
        </button>
      </div>
      <div
        id="desk-controls-panel"
        className={`flex-1 min-h-0 overflow-y-auto px-3 py-4 sm:px-4 ${
          isSidebarOpen
            ? ""
            : "pointer-events-none invisible select-none opacity-0"
        }`}
      >
        <DeskControls />
      </div>
    </aside>
  );
}
