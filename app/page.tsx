"use client";

import { DeskControls } from "@/components/DeskControls";
import { DeskPreview } from "@/components/DeskPreview";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-neutral-50">
      <div className="py-8">
        <header className="mb-8 text-center">
          <h1 className="text-3xl font-bold tracking-tight text-neutral-900 sm:text-4xl">
            Desk Customizer
          </h1>
          <p className="mt-2 text-sm text-neutral-500">
            Adjust type, size, and finish—preview updates in real time.
          </p>
        </header>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-[380px_1fr]">
          <div className="order-2 lg:order-1">
            <DeskControls />
          </div>
          <div className="order-1 lg:order-2">
            <div className="sticky top-8 overflow-hidden rounded-2xl border border-neutral-200 bg-white shadow-lg">
              <div className="aspect-[4/3] w-full max-h-[500px] bg-neutral-100">
                <DeskPreview />
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
// "use client";

// import { DeskControls } from "@/components/DeskControls";
// import { DeskPreview } from "@/components/DeskPreview";

// export default function HomePage() {
//   return (
//     <main className="mx-auto min-h-screen max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
//       <header className="mb-8 border-b border-neutral-200 pb-6">
//         <h1 className="text-2xl font-semibold tracking-tight text-neutral-900">
//           Desk Customizer
//         </h1>
//         <p className="mt-1 max-w-2xl text-sm text-neutral-500">
//           Adjust type, size, and finish—preview updates in real time.
//         </p>
//       </header>

//       <div className="grid grid-cols-1 gap-6 lg:grid-cols-[minmax(0,380px)_1fr] lg:items-start">
//         <div className="order-2 lg:order-1">
//           <DeskControls />
//         </div>
//         <section
//           className="order-1 overflow-hidden rounded-xl border border-neutral-200 bg-white shadow-sm lg:order-2 lg:sticky lg:top-8"
//           aria-label="3D preview"
//         >
//           <div className="aspect-[4/3] min-h-[320px] w-full sm:min-h-[400px] lg:min-h-[min(72vh,560px)]">
//             <DeskPreview />
//           </div>
//         </section>
//       </div>
//     </main>
//   );
// }

