"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { DeskControls } from "@/components/DeskControls";
import { Desk2DControls } from "@/components/Desk2DControls";
import { useDeskStore } from "@/store/useDeskStore";

const NAV_LINKS = [
  { href: "/", label: "3D Preview" },
  { href: "/own-design", label: "Create Your Own" }
];

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
  const pathname = usePathname();
  const is2D = pathname === "/own-design";

  return (
    <aside
      className={`order-2 flex shrink-0 flex-col overflow-hidden border-t border-neutral-200 bg-white transition-all duration-300 ease-in-out md:order-1 md:h-full md:border-r md:border-t-0 ${
        isSidebarOpen ? "w-full md:w-[380px]" : "w-full md:w-16"
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
        className={`px-3 py-4 sm:px-4 md:min-h-0 md:flex-1 md:overflow-y-auto ${
          isSidebarOpen
            ? ""
            : "hidden pointer-events-none invisible select-none opacity-0 md:block"
        }`}
      >
        <nav
          aria-label="Customizer mode"
          className="mb-5 grid grid-cols-2 gap-1 rounded-lg bg-neutral-100 p-1"
        >
          {NAV_LINKS.map((link) => {
            const active =
              link.href === "/" ? pathname === "/" : pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                aria-current={active ? "page" : undefined}
                className={`rounded-md px-2 py-1.5 text-center text-xs font-medium transition ${
                  active
                    ? "bg-white text-neutral-900 shadow-sm"
                    : "text-neutral-500 hover:text-neutral-800"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>
        {is2D ? <Desk2DControls /> : <DeskControls />}
      </div>
    </aside>
  );
}
