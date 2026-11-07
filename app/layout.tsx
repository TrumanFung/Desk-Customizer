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
      <body className="min-h-screen w-full bg-neutral-50 text-neutral-900 antialiased md:flex md:h-screen md:w-screen md:overflow-hidden">
        <div className="mx-auto flex w-full min-h-0 max-w-[1280px] flex-col md:h-full md:flex-row md:px-6 lg:px-8">
          <Sidebar />
          <div className="order-1 flex min-h-0 flex-1 flex-col md:order-2 md:overflow-hidden">{children}</div>
        </div>
      </body>
    </html>
  );
}
