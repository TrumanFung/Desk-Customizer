// Does not include a width utility — callers opt into `w-full` or a fixed
// width themselves, since combining `inputBase` with e.g. `w-20` on the same
// element lets `w-full` win the cascade regardless of class order.
export const inputBase =
  "rounded-lg border border-neutral-300 bg-white px-3 py-2 text-sm text-neutral-900 shadow-sm outline-none transition focus:border-neutral-400 focus:ring-2 focus:ring-neutral-200";
