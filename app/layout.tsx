import type { Metadata } from "next";
import { Space_Grotesk, IBM_Plex_Mono, DM_Sans, JetBrains_Mono } from "next/font/google";
import "./globals.css";
// Validate environment variables on server startup
import "@/lib/env";
import Navigation from "./components/Navigation";
import Footer from "./components/Footer";
import { ThemeProvider } from "./contexts/ThemeContext";
import SkipToContent from "./components/SkipToContent";
import { AgentQueryInterface, EasterEggManager } from "./components/LazyLoadedComponents";
import { ErrorBoundary } from "./components/ErrorBoundary";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
  preload: true,
});

const ibmPlexMono = IBM_Plex_Mono({
  variable: "--font-ibm-plex-mono",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
  preload: true,
});

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
  preload: true,
});

const jetBrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
  preload: true,
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://your-domain.com'),
  title: {
    default: "Creative Context Studio",
    template: "%s | Creative Context Studio",
  },
  description: "Creative Context portfolio presented as a mid-century American Cold War industrial/aerospace technical documentation system. Professional portfolio showcasing software development and creative technology projects.",
  keywords: [
    "portfolio",
    "developer",
    "software engineer",
    "creative technologist",
    "web development",
    "React",
    "Next.js",
    "Cold War",
    "aerospace",
    "technical documentation",
  ],
  authors: [{ name: "Creative Context Studio" }],
  creator: "Creative Context Studio",
  publisher: "Creative Context Studio",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: process.env.NEXT_PUBLIC_SITE_URL || 'https://your-domain.com',
    siteName: "Creative Context",
    title: "Creative Context | Cold War Aerospace Technical Documentation",
    description: "Creative Context portfolio presented as a mid-century American Cold War industrial/aerospace technical documentation system.",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Creative Context Portfolio - Cold War Aerospace Technical Documentation",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Creative Context | Cold War Aerospace Technical Documentation",
    description: "Creative Context portfolio presented as a mid-century American Cold War industrial/aerospace technical documentation system.",
    images: ["/og-image.jpg"],
    creator: "@creativecontext",
  },
  alternates: {
    canonical: process.env.NEXT_PUBLIC_SITE_URL || 'https://your-domain.com',
  },
  verification: {
    // Add verification codes when available
    // google: 'your-google-verification-code',
    // yandex: 'your-yandex-verification-code',
    // yahoo: 'your-yahoo-verification-code',
  },
  category: "Portfolio",
  classification: "Portfolio Website",
  icons: {
    icon: '/favicon.png',
    apple: '/favicon.png',
  },
  other: {
    "application-name": "Creative Context Portfolio",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${spaceGrotesk.variable} ${ibmPlexMono.variable} ${dmSans.variable} ${jetBrainsMono.variable} antialiased`}
      >
        <ErrorBoundary>
          <ThemeProvider>
            <SkipToContent />
            <Navigation />
            <main id="main-content" tabIndex={-1}>
              {children}
            </main>
            <Footer />
            <AgentQueryInterface />
            <EasterEggManager />
          </ThemeProvider>
        </ErrorBoundary>
      </body>
    </html>
  );
}
