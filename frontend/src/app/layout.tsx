import type { Metadata } from "next";
import { DM_Mono, DM_Sans, Playfair_Display } from "next/font/google";
import "./globals.css";
import { Providers } from "@/components/samarth/providers";

const display = Playfair_Display({
  variable: "--font-display-source",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const sans = DM_Sans({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});
const mono = DM_Mono({ variable: "--font-mono-source", subsets: ["latin"], weight: ["400", "500"] });

export const metadata: Metadata = {
  title: "Samarth — Turn community needs into measurable impact",
  description:
    "Samarth transforms real-world societal problems into structured challenges, intelligently matches them with capable institutions, and tracks every step from identification to measurable impact.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${sans.variable} ${display.variable} ${mono.variable} h-full antialiased`} suppressHydrationWarning>
      <body className="min-h-full flex flex-col">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
