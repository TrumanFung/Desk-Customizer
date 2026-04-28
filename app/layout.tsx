import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Desk Customizer",
  description: "Configure dimensions, finish, and desk style with a live 3D preview"
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="bg-neutral-200 text-neutral-900 antialiased">
        <div className="mx-auto w-full max-w-[1280px] px-4 sm:px-6 lg:px-8">
          {children}
        </div>
      </body>
    </html>
  );
}
// import "./globals.css";
// import type { Metadata } from "next";

// export const metadata: Metadata = {
//   title: "Desk Customizer",
//   description: "Configure dimensions, finish, and desk style with a live 3D preview"
// };

// export default function RootLayout({
//   children
// }: Readonly<{
//   children: React.ReactNode;
// }>) {
//   return (
//     <html lang="en">
//       <body className="min-h-screen bg-neutral-50 text-neutral-900 antialiased">
//         {children}
//       </body>
//     </html>
//   );
// }

