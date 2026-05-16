import "./globals.css";
import type { Metadata } from "next";
import { Sidebar } from "@/components/Sidebar";

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
      <body className="flex h-screen w-screen overflow-hidden bg-neutral-50 text-neutral-900 antialiased">
        <div className="mx-auto flex h-full w-full min-h-0 max-w-[1280px] px-4 sm:px-6 lg:px-8">
          <Sidebar />
          <div className="flex min-h-0 flex-1 flex-col overflow-hidden">{children}</div>
        </div>
      </body>
    </html>
  );
}
