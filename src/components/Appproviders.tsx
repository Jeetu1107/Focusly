"use client";

import type { ReactNode } from "react";
import { ToastHost } from "@/components/ui/Toast";
import { FocusOverlay } from "@/components/focus/FocusOverlay";
import { KeyboardShortcutsHandler } from "@/components/KeyboardShortcutsHandler";

export function AppProviders({ children }: { children: ReactNode }) {
  return (
    <>
      {children}
      <FocusOverlay />
      <ToastHost />
      <KeyboardShortcutsHandler />
    </>
  );
}
