// "use client";

// import type { PropsWithChildren, ButtonHTMLAttributes, ReactNode } from "react";
// import { useEffect, useMemo } from "react";
// import { useDeskStore } from "@/store/useDeskStore";
// import type { DeskKind, ReturnSide } from "@/lib/types";

// const DESK_KINDS: { id: DeskKind; label: string; hint: string }[] = [
//   { id: "writing", label: "Writing", hint: "Four legs, optional drawer stacks" },
//   { id: "executive", label: "Executive", hint: "Pedestal bases, wide top" },
//   { id: "l-shaped", label: "L-Shaped", hint: "Main desk with a left or right return" }
// ];

// function Section({
//   title,
//   description,
//   children
// }: {
//   title: string;
//   description?: string;
//   children: ReactNode;
// }) {
//   return (
//     <section className="border-b border-neutral-200 pb-6 last:border-b-0 last:pb-0">
//       <h2 className="text-xs font-semibold uppercase tracking-wider text-neutral-400">
//         {title}
//       </h2>
//       {description ? (
//         <p className="mt-1 text-xs text-neutral-500">{description}</p>
//       ) : null}
//       <div className="mt-4 space-y-4">{children}</div>
//     </section>
//   );
// }

// function Field({
//   label,
//   children
// }: {
//   label: string;
//   children: ReactNode;
// }) {
//   return (
//     <label className="block">
//       <span className="mb-1.5 block text-sm font-medium text-neutral-700">
//         {label}
//       </span>
//       {children}
//     </label>
//   );
// }

// type BtnProps = PropsWithChildren<ButtonHTMLAttributes<HTMLButtonElement>>;

// function BtnPrimary({ children, className = "", ...props }: BtnProps) {
//   return (
//     <button
//       type="button"
//       className={`rounded-lg bg-neutral-900 px-3.5 py-2 text-sm font-medium text-white transition hover:bg-neutral-800 disabled:cursor-not-allowed disabled:opacity-45 ${className}`}
//       {...props}
//     >
//       {children}
//     </button>
//   );
// }

// function BtnSecondary({ children, className = "", ...props }: BtnProps) {
//   return (
//     <button
//       type="button"
//       className={`rounded-lg border border-neutral-300 bg-white px-3.5 py-2 text-sm font-medium text-neutral-800 transition hover:bg-neutral-50 disabled:cursor-not-allowed disabled:opacity-45 ${className}`}
//       {...props}
//     >
//       {children}
//     </button>
//   );
// }

// function BtnDanger({ children, className = "", ...props }: BtnProps) {
//   return (
//     <button
//       type="button"
//       className={`rounded-lg border border-red-200 bg-white px-3.5 py-2 text-sm font-medium text-red-700 transition hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-45 ${className}`}
//       {...props}
//     >
//       {children}
//     </button>
//   );
// }

// const inputBase =
//   "w-full rounded-lg border border-neutral-300 bg-white px-3 py-2 text-sm text-neutral-900 shadow-sm outline-none transition focus:border-neutral-400 focus:ring-2 focus:ring-neutral-200";

// export function DeskControls() {
//   const {
//     width,
//     depth,
//     height,
//     color,
//     deskKind,
//     returnSide,
//     drawersLeft,
//     drawersRight,
//     name,
//     selectedDesignId,
//     designs,
//     isBusy,
//     error,
//     setWidth,
//     setDepth,
//     setHeight,
//     setColor,
//     setDeskKind,
//     setReturnSide,
//     setName,
//     toggleDrawerLeft,
//     toggleDrawerRight,
//     listDesigns,
//     loadDesign,
//     saveDesign,
//     deleteDesign
//   } = useDeskStore();

//   useEffect(() => {
//     void listDesigns();
//   }, [listDesigns]);

//   const selected = useMemo(() => {
//     if (!selectedDesignId) return null;
//     return designs.find((d) => d.id === selectedDesignId) ?? null;
//   }, [designs, selectedDesignId]);

//   const drawerNote =
//     deskKind === "executive"
//       ? "Adds drawer fronts on the pedestals."
//       : deskKind === "l-shaped"
//         ? "Drawer units stay on the main desk while the return extends left or right."
//         : "Toggle drawer units on each side.";

//   return (
//     <div className="space-y-8 rounded-xl border border-neutral-200 bg-white p-5 shadow-sm sm:p-6">
//       <Section
//         title="Desk type"
//         description="Switch style; dimensions and finish apply to all types."
//       >
//         <div className="grid grid-cols-1 gap-2 sm:grid-cols-3">
//           {DESK_KINDS.map((k) => {
//             const active = deskKind === k.id;
//             return (
//               <button
//                 key={k.id}
//                 type="button"
//                 onClick={() => setDeskKind(k.id)}
//                 className={`rounded-lg border px-3 py-2.5 text-left text-sm transition ${
//                   active
//                     ? "border-neutral-900 bg-neutral-900 text-white"
//                     : "border-neutral-200 bg-neutral-50 text-neutral-800 hover:border-neutral-300 hover:bg-white"
//                 }`}
//               >
//                 <span className="font-medium">{k.label}</span>
//                 <span
//                   className={`mt-0.5 block text-xs leading-snug ${
//                     active ? "text-neutral-300" : "text-neutral-500"
//                   }`}
//                 >
//                   {k.hint}
//                 </span>
//               </button>
//             );
//           })}
//         </div>
//       </Section>

//       <Section title="Dimensions" description="All measurements in centimeters.">
//         <Field label={`Width — ${width} cm`}>
//           <input
//             className={inputBase}
//             type="range"
//             min={80}
//             max={240}
//             value={width}
//             onChange={(e) => setWidth(Number(e.target.value))}
//           />
//         </Field>
//         <Field label={`Depth — ${depth} cm`}>
//           <input
//             className={inputBase}
//             type="range"
//             min={40}
//             max={120}
//             value={depth}
//             onChange={(e) => setDepth(Number(e.target.value))}
//           />
//         </Field>
//         <Field label={`Height — ${height} cm`}>
//           <input
//             className={inputBase}
//             type="range"
//             min={60}
//             max={130}
//             value={height}
//             onChange={(e) => setHeight(Number(e.target.value))}
//           />
//         </Field>
//       </Section>

//       <Section title="Finish">
//         <Field label="Desktop color">
//           <div className="flex items-center gap-3">
//             <input
//               className="h-11 w-16 cursor-pointer overflow-hidden rounded-lg border border-neutral-300 bg-white p-0.5 shadow-sm"
//               type="color"
//               value={color}
//               onChange={(e) => setColor(e.target.value)}
//             />
//             <code className="text-xs text-neutral-500">{color}</code>
//           </div>
//         </Field>
//       </Section>

//       <Section title="Options" description={drawerNote}>
//         {deskKind === "l-shaped" ? (
//           <Field label="Return side">
//             <div className="grid grid-cols-2 gap-2">
//               {([
//                 { id: "left", label: "Left return" },
//                 { id: "right", label: "Right return" }
//               ] as { id: ReturnSide; label: string }[]).map((option) => {
//                 const active = returnSide === option.id;
//                 return (
//                   <button
//                     key={option.id}
//                     type="button"
//                     onClick={() => setReturnSide(option.id)}
//                     className={`rounded-lg border px-3 py-2.5 text-left text-sm transition ${
//                       active
//                         ? "border-neutral-900 bg-neutral-900 text-white"
//                         : "border-neutral-200 bg-neutral-50 text-neutral-800 hover:border-neutral-300 hover:bg-white"
//                     }`}
//                   >
//                     {option.label}
//                   </button>
//                 );
//               })}
//             </div>
//           </Field>
//         ) : null}

//         <div className="flex flex-col gap-3 sm:flex-row sm:gap-6">
//           <label className="flex cursor-pointer items-center gap-2.5 text-sm text-neutral-700">
//             <input
//               type="checkbox"
//               className="size-4 rounded border-neutral-300 text-neutral-900 focus:ring-neutral-400"
//               checked={drawersLeft}
//               onChange={toggleDrawerLeft}
//             />
//             Left drawers
//           </label>
//           <label className="flex cursor-pointer items-center gap-2.5 text-sm text-neutral-700">
//             <input
//               type="checkbox"
//               className="size-4 rounded border-neutral-300 text-neutral-900 focus:ring-neutral-400"
//               checked={drawersRight}
//               onChange={toggleDrawerRight}
//             />
//             Right drawers
//           </label>
//         </div>
//       </Section>

//       <Section
//         title="Library"
//         description="Saved on this machine via the local API (JSON file)."
//       >
//         <Field label="Design name">
//           <input
//             className={inputBase}
//             value={name}
//             onChange={(e) => setName(e.target.value)}
//             placeholder="e.g. Oak office desk"
//           />
//         </Field>

//         <div className="flex flex-wrap gap-2">
//           <BtnPrimary onClick={() => void saveDesign()} disabled={isBusy}>
//             {selectedDesignId ? "Save changes" : "Save as new"}
//           </BtnPrimary>
//           <BtnSecondary onClick={() => void listDesigns()} disabled={isBusy}>
//             Refresh list
//           </BtnSecondary>
//           {selectedDesignId ? (
//             <BtnDanger
//               onClick={() => void deleteDesign(selectedDesignId)}
//               disabled={isBusy}
//               title="Delete the selected design"
//             >
//               Delete
//             </BtnDanger>
//           ) : null}
//         </div>

//         <Field label="Saved designs">
//           <select
//             className={inputBase}
//             value={selectedDesignId ?? ""}
//             onChange={(e) => {
//               const id = e.target.value;
//               if (id) void loadDesign(id);
//             }}
//             disabled={isBusy}
//           >
//             <option value="">Select a design…</option>
//             {designs.map((d) => (
//               <option key={d.id} value={d.id}>
//                 {d.name ?? d.id} — {new Date(d.updatedAt).toLocaleString()}
//               </option>
//             ))}
//           </select>
//         </Field>

//         <p className="text-xs text-neutral-500">
//           Active file:{" "}
//           {selected ? (
//             <span className="font-mono text-neutral-700">{selected.id}</span>
//           ) : (
//             <span>none</span>
//           )}
//         </p>

//         {error ? (
//           <div
//             className="rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-800"
//             role="alert"
//           >
//             {error}
//           </div>
//         ) : null}
//       </Section>
//     </div>
//   );
// }

"use client";

import type { PropsWithChildren, ButtonHTMLAttributes, ReactNode } from "react";
import { useEffect, useMemo } from "react";
import { useDeskStore } from "@/store/useDeskStore";
import type { DeskKind, ReturnSide } from "@/lib/types";

const DESK_KINDS: { id: DeskKind; label: string; hint: string }[] = [
  { id: "writing", label: "Writing", hint: "Four legs, optional drawer stacks" },
  { id: "executive", label: "Executive", hint: "Pedestal bases, wide top" },
  { id: "l-shaped", label: "L-Shaped", hint: "Main desk with a left or right return" }
];

function Section({
  title,
  description,
  children
}: {
  title: string;
  description?: string;
  children: ReactNode;
}) {
  return (
    <div className="rounded-2xl border border-neutral-2000 bg-white p-6 shadow-sm transition-all hover:shadow-md">
      <h2 className="text-xs font-semibold uppercase tracking-wider text-neutral-4000">
        {title}
      </h2>
      {description ? (
        <p className="mt-1 text-xs text-neutral-500">{description}</p>
      ) : null}
      <div className="mt-5 space-y-5">{children}</div>
    </div>
  );
}

function Field({
  label,
  children
}: {
  label: string;
  children: ReactNode;
}) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-sm font-medium text-neutral-700">
        {label}
      </span>
      {children}
    </label>
  );
}

type BtnProps = PropsWithChildren<ButtonHTMLAttributes<HTMLButtonElement>>;

function BtnPrimary({ children, className = "", ...props }: BtnProps) {
  return (
    <button
      type="button"
      className={`rounded-lg bg-neutral-900 px-3.5 py-2 text-sm font-medium text-white transition hover:bg-neutral-800 disabled:cursor-not-allowed disabled:opacity-45 ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}

function BtnSecondary({ children, className = "", ...props }: BtnProps) {
  return (
    <button
      type="button"
      className={`rounded-lg border border-neutral-300 bg-white px-3.5 py-2 text-sm font-medium text-neutral-800 transition hover:bg-neutral-50 disabled:cursor-not-allowed disabled:opacity-45 ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}

function BtnDanger({ children, className = "", ...props }: BtnProps) {
  return (
    <button
      type="button"
      className={`rounded-lg border border-red-200 bg-white px-3.5 py-2 text-sm font-medium text-red-700 transition hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-45 ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}

const inputBase =
  "w-full rounded-lg border border-neutral-300 bg-white px-3 py-2 text-sm text-neutral-900 shadow-sm outline-none transition focus:border-neutral-400 focus:ring-2 focus:ring-neutral-200";

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
        <div className="grid grid-cols-1 gap-2 sm:grid-cols-3">
          {DESK_KINDS.map((k) => {
            const active = deskKind === k.id;
            return (
              <button
                key={k.id}
                type="button"
                onClick={() => setDeskKind(k.id)}
                className={`rounded-lg border px-3 py-2.5 text-left text-sm transition ${
                  active
                    ? "border-neutral-900 bg-neutral-900 text-white"
                    : "border-neutral-200 bg-neutral-50 text-neutral-800 hover:border-neutral-300 hover:bg-white"
                }`}
              >
                <span className="font-medium">{k.label}</span>
                <span
                  className={`mt-0.5 block text-xs leading-snug ${
                    active ? "text-neutral-300" : "text-neutral-500"
                  }`}
                >
                  {k.hint}
                </span>
              </button>
            );
          })}
        </div>
      </Section>

      <Section title="Dimensions" description="All measurements in centimeters.">
        <Field label={`Width — ${width} cm`}>
          <input
            className={inputBase}
            type="range"
            min={80}
            max={240}
            value={width}
            onChange={(e) => setWidth(Number(e.target.value))}
          />
        </Field>
        <Field label={`Depth — ${depth} cm`}>
          <input
            className={inputBase}
            type="range"
            min={40}
            max={120}
            value={depth}
            onChange={(e) => setDepth(Number(e.target.value))}
          />
        </Field>
        <Field label={`Height — ${height} cm`}>
          <input
            className={inputBase}
            type="range"
            min={60}
            max={130}
            value={height}
            onChange={(e) => setHeight(Number(e.target.value))}
          />
        </Field>
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
            <div className="grid grid-cols-2 gap-2">
              {([
                { id: "left", label: "Left return" },
                { id: "right", label: "Right return" }
              ] as { id: ReturnSide; label: string }[]).map((option) => {
                const active = returnSide === option.id;
                return (
                  <button
                    key={option.id}
                    type="button"
                    onClick={() => setReturnSide(option.id)}
                    className={`rounded-lg border px-3 py-2.5 text-left text-sm transition ${
                      active
                        ? "border-neutral-900 bg-neutral-900 text-white"
                        : "border-neutral-200 bg-neutral-50 text-neutral-800 hover:border-neutral-300 hover:bg-white"
                    }`}
                  >
                    {option.label}
                  </button>
                );
              })}
            </div>
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
            className={inputBase}
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="e.g. Oak office desk"
          />
        </Field>

        <div className="flex flex-wrap gap-2">
          <BtnPrimary onClick={() => void saveDesign()} disabled={isBusy}>
            {selectedDesignId ? "Save changes" : "Save as new"}
          </BtnPrimary>
          <BtnSecondary onClick={() => void listDesigns()} disabled={isBusy}>
            Refresh list
          </BtnSecondary>
          {selectedDesignId ? (
            <BtnDanger
              onClick={() => void deleteDesign(selectedDesignId)}
              disabled={isBusy}
              title="Delete the selected design"
            >
              Delete
            </BtnDanger>
          ) : null}
        </div>

        <Field label="Saved designs">
          <select
            className={inputBase}
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
            className="rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-800"
            role="alert"
          >
            {error}
          </div>
        ) : null}
      </Section>
    </div>
  );
}