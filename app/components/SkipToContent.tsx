'use client';

export default function SkipToContent() {
  return (
    <a
      href="#main-content"
      className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[9999] focus:px-4 focus:py-2 focus:bg-primary focus:text-background focus:font-mono focus:text-sm focus:uppercase focus:tracking-wider focus:border-2 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
    >
      Skip to main content
    </a>
  );
}

