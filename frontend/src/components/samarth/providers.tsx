"use client";
import { ThemeProvider } from "next-themes";
import { DemoStore } from "./demo-store";
import { Toaster } from "sonner";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false}>
      <DemoStore>{children}</DemoStore>
      <Toaster richColors position="top-right" />
    </ThemeProvider>
  );
}
