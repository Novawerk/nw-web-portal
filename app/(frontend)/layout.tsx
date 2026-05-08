import type { Metadata } from "next";
import "./globals.css";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { SmoothScroll } from "@/components/providers/smooth-scroll";
import { CursorFollower } from "@/components/motion/cursor-follower";

export const metadata: Metadata = {
  title: "NovaWerk — Not profitable, but meaningful.",
  description:
    "An open, non-profit community hub focused on creating real positive change in society through collaboration, creativity, and action.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className="antialiased">
      <body className="min-h-dvh flex flex-col bg-background text-foreground font-sans">
        <CursorFollower />
        <SmoothScroll>
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
        </SmoothScroll>
      </body>
    </html>
  );
}
