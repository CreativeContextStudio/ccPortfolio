'use client';

import React, { createContext, useContext, useEffect, useState, useCallback } from 'react';

export type Theme = 'hiya' | 'dieter-rams' | 'miami-vibes' | 'lofi-wave';
export type Mode = 'light' | 'dark' | 'system';

interface ThemeContextType {
  theme: Theme;
  mode: Mode;
  resolvedMode: 'light' | 'dark';
  setTheme: (theme: Theme) => void;
  setMode: (mode: Mode) => void;
  toggleMode: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}

interface ThemeProviderProps {
  children: React.ReactNode;
  defaultTheme?: Theme;
  defaultMode?: Mode;
}

export function ThemeProvider({
  children,
  defaultTheme = 'hiya',
  defaultMode = 'system'
}: ThemeProviderProps) {
  const [theme, setThemeState] = useState<Theme>(defaultTheme);
  const [mode, setModeState] = useState<Mode>(defaultMode);
  const [resolvedMode, setResolvedMode] = useState<'light' | 'dark'>('light');
  const [mounted, setMounted] = useState(false);

  const getSystemPreference = useCallback((): 'light' | 'dark' => {
    if (typeof window === 'undefined') return 'light';
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }, []);

  const resolveMode = useCallback((currentMode: Mode): 'light' | 'dark' => {
    if (currentMode === 'system') return getSystemPreference();
    return currentMode;
  }, [getSystemPreference]);

  const applyTheme = useCallback((newTheme: Theme, newMode: Mode) => {
    if (typeof document === 'undefined') return;
    const resolved = resolveMode(newMode);
    document.documentElement.setAttribute('data-theme', newTheme);
    document.documentElement.setAttribute('data-mode', resolved);
    setResolvedMode(resolved);
  }, [resolveMode]);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const storedTheme = localStorage.getItem('theme');
    const storedMode = localStorage.getItem('mode') as Mode | null;

    if (storedTheme === 'neobrutalism') {
      localStorage.setItem('theme', 'hiya');
      setThemeState('hiya');
    } else if (
      storedTheme &&
      ['hiya', 'dieter-rams', 'miami-vibes', 'lofi-wave'].includes(storedTheme)
    ) {
      setThemeState(storedTheme as Theme);
    }

    if (storedMode && ['light', 'dark', 'system'].includes(storedMode)) {
      setModeState(storedMode);
    }

    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    applyTheme(theme, mode);
  }, [theme, mode, mounted, applyTheme]);

  useEffect(() => {
    if (mode !== 'system' || typeof window === 'undefined') return;
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleChange = () => applyTheme(theme, 'system');
    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, [mode, theme, applyTheme]);

  const setTheme = useCallback((newTheme: Theme) => {
    setThemeState(newTheme);
    localStorage.setItem('theme', newTheme);
  }, []);

  const setMode = useCallback((newMode: Mode) => {
    setModeState(newMode);
    localStorage.setItem('mode', newMode);
  }, []);

  const toggleMode = useCallback(() => {
    const currentResolved = resolveMode(mode);
    const newMode = currentResolved === 'light' ? 'dark' : 'light';
    setMode(newMode);
  }, [mode, resolveMode, setMode]);

  return (
    <ThemeContext.Provider value={{ theme, mode, resolvedMode, setTheme, setMode, toggleMode }}>
      {children}
    </ThemeContext.Provider>
  );
}
