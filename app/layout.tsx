import '@/lib/env';
import type { Metadata } from "next";
import { DM_Sans, Plus_Jakarta_Sans, JetBrains_Mono } from "next/font/google";
import { ThemeProvider } from "./contexts/ThemeContext";
import { FilmGrain } from "@/components/film-grain";
import { ScrollProgress } from "@/components/scroll-progress";
import { ConsoleSignature } from "@/components/console-signature";
import "./globals.css";

const dmSans = DM_Sans({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

const plusJakarta = Plus_Jakarta_Sans({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://creativecontext.studio"),
  title: "Creative Producer. Technologist.",
  description:
    "Creative producer with 20 years across brand campaigns, documentary, narrative film, AI-native workflows, and production at scale. Four pillars: Creative Producing, Storytelling & Narrative, Agentic Creative & AI, Line Producing & Production.",
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "48x48" },
      { url: "/icon.png", sizes: "192x192", type: "image/png" },
    ],
    apple: [{ url: "/apple-icon.png", sizes: "180x180", type: "image/png" }],
  },
  manifest: "/site.webmanifest",
  openGraph: {
    title: "Creative Producer. Technologist.",
    description: "Creative producer. Two decades. Brand, documentary, film, AI workflows, production at scale.",
    type: "website",
    images: [{ url: "/reel/thumb-v2.jpg", width: 1280, height: 720 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Creative Producer. Technologist.",
    description: "Creative producer. Two decades. Brand, documentary, film, AI workflows, production at scale.",
    images: ["/reel/thumb-v2.jpg"],
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${dmSans.variable} ${plusJakarta.variable} ${jetbrainsMono.variable} antialiased`}>
        <ThemeProvider>
          <a
            href="#main-content"
            className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[200] focus:bg-white focus:text-ltx-black focus:px-4 focus:py-2 focus:rounded-lg focus:shadow-lg focus:text-sm focus:font-medium"
          >
            Skip to content
          </a>
          <FilmGrain />
          <ScrollProgress />
          {children}
          <ConsoleSignature />
        </ThemeProvider>
      </body>
    </html>
  );
}
