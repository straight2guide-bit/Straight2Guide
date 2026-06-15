"use client";

import { ThemeProvider } from "next-themes";
import { NuqsAdapter } from "nuqs/adapters/next/app";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <NuqsAdapter>
      {/* The UI is light-only for now; force light so devices set to dark
          mode don't flip backgrounds to black over the hard-coded light
          section colors. Remove forcedTheme when a real dark theme exists. */}
      <ThemeProvider
        attribute="class"
        defaultTheme="light"
        enableSystem={false}
        forcedTheme="light"
      >
        {children}
      </ThemeProvider>
    </NuqsAdapter>
  );
}
