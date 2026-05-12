import type { Metadata } from "next";
import {
  Bricolage_Grotesque,
  Instrument_Serif,
  Space_Grotesk,
  JetBrains_Mono,
} from "next/font/google";
import "./globals.css";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { SmoothScroll } from "@/components/providers/smooth-scroll";
import { CursorFollower } from "@/components/motion/cursor-follower";
import { JoinSheet } from "@/components/join/join-sheet";

const display = Bricolage_Grotesque({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--nw-font-display",
  display: "swap",
});

const serif = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  variable: "--nw-font-serif",
  display: "swap",
});

const sans = Space_Grotesk({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--nw-font-sans",
  display: "swap",
});

const mono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--nw-font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Novawerk — Not profitable, but meaningful.",
  description:
    "An open, non-profit community hub focused on creating real positive change in society through collaboration, creativity, and action.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`antialiased ${display.variable} ${serif.variable} ${sans.variable} ${mono.variable}`}
    >
      <body className="min-h-dvh flex flex-col bg-background text-foreground font-sans">
        <CursorFollower />
        <SmoothScroll>
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
        </SmoothScroll>
        <JoinSheet />
      </body>
    </html>
  );
}
