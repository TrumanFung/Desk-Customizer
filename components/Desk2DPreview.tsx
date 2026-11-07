"use client";

import { Desk2DIllustration } from "@/components/desk2d/Desk2DIllustration";

export function Desk2DPreview() {
  return (
    <div className="flex h-full w-full items-center justify-center p-3 sm:p-6">
      <Desk2DIllustration className="h-auto max-h-full w-full max-w-[760px]" />
    </div>
  );
}
