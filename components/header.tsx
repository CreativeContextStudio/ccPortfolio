"use client";

import { useState, useRef, useCallback, useEffect, useMemo } from "react";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion, useScroll, useTransform, useMotionValue, useSpring } from "motion/react";
import dynamic from "next/dynamic";

const ThemeSelector = dynamic(() => import("@/components/theme-selector"), { ssr: false });

const NAV_ITEMS = [
  { label: "Creative Producing", href: "#creative-producing" },
  { label: "Agentic & AI", href: "#agentic-creative" },
  { label: "Line Producing", href: "#line-producing" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "#contact" },
];

function useActiveSection() {
  const [active, setActive] = useState("");
  const pathname = usePathname();

  useEffect(() => {
    // On dedicated pages (e.g. /about), mark that page as active
    if (pathname !== "/") {
      setActive(pathname);
      return;
    }

    const ids = NAV_ITEMS.filter((n) => n.href.startsWith("#")).map((n) => n.href.slice(1));
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting);
        if (visible.length > 0) {
          const top = visible.reduce((a, b) => (a.boundingClientRect.top < b.boundingClientRect.top ? a : b));
          setActive(top.target.id);
        }
      },
      { rootMargin: "-20% 0px -60% 0px", threshold: 0 }
    );
    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, [pathname]);

  return active;
}

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const activeSection = useActiveSection();
  const pathname = usePathname();
  const { scrollY } = useScroll();
  const bgOpacity = useTransform(scrollY, [0, 100], [0, 0.85]);
  const borderOpacity = useTransform(scrollY, [0, 100], [0, 1]);

  // Resolve hrefs: hash links need "/" prefix when not on the home page
  const resolvedItems = useMemo(
    () =>
      NAV_ITEMS.map((item) => {
        if (item.href.startsWith("#") && pathname !== "/") {
          return { ...item, resolvedHref: `/${item.href}` };
        }
        return { ...item, resolvedHref: item.href };
      }),
    [pathname]
  );

  function isActive(item: (typeof NAV_ITEMS)[number]) {
    if (item.href.startsWith("/")) return activeSection === item.href;
    return activeSection === item.href.slice(1);
  }

  function handleNavClick() { setMobileOpen(false); }

  return (
    <motion.header className="fixed top-0 left-0 right-0 z-50">
      <motion.div style={{ opacity: bgOpacity }} className="absolute inset-0 bg-background/85 backdrop-blur-xl" />
      <motion.div style={{ opacity: borderOpacity }} className="absolute bottom-0 left-0 right-0 h-px bg-ltx-rule" />

      <nav className="relative mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <div className="flex items-center gap-3">
          <a href="/" className="font-[family-name:var(--font-display)] text-lg font-bold tracking-tight text-ltx-black">
            CREATIVE CONTEXT STUDIO
          </a>
          <ThemeSelector />
        </div>

        <div className="hidden lg:flex items-center gap-6">
          {resolvedItems.map((item) => (
            <MagneticLink key={item.href} href={item.resolvedHref} label={item.label} isActive={isActive(item)} />
          ))}
        </div>

        <button
          className="lg:hidden relative z-10 flex flex-col justify-center items-center w-10 h-10 -mr-2"
          onClick={() => setMobileOpen((prev) => !prev)}
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
          aria-expanded={mobileOpen}
        >
          <motion.span className="block w-5 h-[2px] bg-ltx-black rounded-full" animate={mobileOpen ? { rotate: 45, y: 0 } : { rotate: 0, y: -4 }} transition={{ duration: 0.25 }} style={{ position: "absolute" }} />
          <motion.span className="block w-5 h-[2px] bg-ltx-black rounded-full" animate={mobileOpen ? { opacity: 0, scaleX: 0 } : { opacity: 1, scaleX: 1 }} transition={{ duration: 0.15 }} style={{ position: "absolute" }} />
          <motion.span className="block w-5 h-[2px] bg-ltx-black rounded-full" animate={mobileOpen ? { rotate: -45, y: 0 } : { rotate: 0, y: 4 }} transition={{ duration: 0.25 }} style={{ position: "absolute" }} />
        </button>
      </nav>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            className="lg:hidden absolute top-full left-0 right-0 bg-background/95 backdrop-blur-2xl border-b border-ltx-rule shadow-lg"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
            style={{ overflow: "hidden" }}
          >
            <div className="px-6 pt-2 pb-6 flex flex-col gap-1">
              {resolvedItems.map((item, i) => (
                <motion.a
                  key={item.href}
                  href={item.resolvedHref}
                  onClick={handleNavClick}
                  className="block py-3 text-lg font-[family-name:var(--font-display)] font-medium text-ltx-black border-b border-ltx-rule/50 last:border-0 hover:text-ltx-studio transition-colors"
                  initial={{ opacity: 0, x: -16 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -16 }}
                  transition={{ duration: 0.25, delay: 0.05 * i }}
                >
                  {item.label}
                </motion.a>
              ))}
              <motion.div className="pt-3 flex items-center gap-3" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}>
                <ThemeSelector />
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}

function MagneticLink({ href, label, isActive = false }: { href: string; label: string; isActive?: boolean }) {
  const ref = useRef<HTMLAnchorElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 200, damping: 20 });
  const springY = useSpring(y, { stiffness: 200, damping: 20 });
  const scale = useSpring(1, { stiffness: 200, damping: 20 });

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const dx = e.clientX - cx;
    const dy = e.clientY - cy;
    const dist = Math.sqrt(dx * dx + dy * dy);
    if (dist < 40) {
      x.set(dx * 0.15);
      y.set(dy * 0.15);
      scale.set(1.02);
    }
  }, [x, y, scale]);

  const handleMouseLeave = useCallback(() => {
    x.set(0);
    y.set(0);
    scale.set(1);
  }, [x, y, scale]);

  return (
    <motion.a
      ref={ref}
      href={href}
      className={`text-sm font-medium transition-colors duration-200 ${isActive ? "text-ltx-studio" : "text-ltx-muted hover:text-ltx-black"}`}
      style={{ x: springX, y: springY, scale }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {label}
    </motion.a>
  );
}
