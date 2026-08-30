import type { Metadata } from "next";
import type { ReactNode } from "react";
import "./globals.css";
import { Sidebar } from "@/components/layout/Sidebar";
import { AppProviders } from "@/components/AppProviders";

export const metadata: Metadata = {
  title: "FocusOS — Your local-first productivity operating system",
  description:
    "Tasks, daily planning, pomodoro, habits, and focus sessions — all stored locally.",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className="dark">
      <body>
        <AppProviders>
          <div className="flex min-h-screen">
            <Sidebar />
            <main className="flex-1 min-w-0">{children}</main>
          </div>
        </AppProviders>
      </body>
    </html>
  );
}
