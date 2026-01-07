'use client';

import { useState, useEffect } from 'react';
import { useTheme, type Theme } from '../contexts/ThemeContext';

export default function ThemeSelector() {
  const { theme, setTheme, resolvedMode, toggleMode } = useTheme();
  const [isNeobrutalism, setIsNeobrutalism] = useState(false);

  useEffect(() => {
    if (typeof document !== 'undefined') {
      const checkTheme = () => {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        setIsNeobrutalism(currentTheme === 'neobrutalism');
      };
      checkTheme();
      const observer = new MutationObserver(checkTheme);
      observer.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });
      return () => observer.disconnect();
    }
  }, []);

  const themes: { value: Theme; label: string }[] = [
    { value: 'neobrutalism', label: 'Neobrutalism' },
    { value: 'dieter-rams', label: 'Deiter Herman' },
    { value: 'miami-vibes', label: 'Miami Vibes' },
    { value: 'lofi-wave', label: 'Lofi Wave' },
  ];

  return (
    <div className="flex items-center gap-4 font-mono text-xs uppercase tracking-wider">
      {/* Theme Selector */}
      <div className="flex items-center gap-2">
        <label htmlFor="theme-select" className="sr-only">
          Select Theme
        </label>
        <select
          id="theme-select"
          value={theme}
          onChange={(e) => setTheme(e.target.value as Theme)}
          className="bg-transparent border-2 border-current px-2 py-1 rounded cursor-pointer hover:bg-current hover:text-background transition-all font-bold uppercase tracking-wider shadow-[2px_2px_0px_rgba(0,0,0,0.1)] hover:shadow-[3px_3px_0px_rgba(0,0,0,0.15)] hover:-translate-x-[1px] hover:-translate-y-[1px]"
          aria-label="Select theme"
        >
          {themes.map((t) => (
            <option key={t.value} value={t.value} className="bg-background text-text">
              {t.label}
            </option>
          ))}
        </select>
      </div>

      {/* Mode Toggle Button */}
      <button
        onClick={toggleMode}
        className="px-2 py-1 border-2 border-current rounded hover:bg-current hover:text-background transition-all flex items-center justify-center font-bold shadow-[2px_2px_0px_rgba(0,0,0,0.1)] hover:shadow-[3px_3px_0px_rgba(0,0,0,0.15)] hover:-translate-x-[1px] hover:-translate-y-[1px] active:translate-x-[1px] active:translate-y-[1px] active:shadow-[2px_2px_0px_rgba(0,0,0,0.1)]"
        aria-label={`Toggle to ${resolvedMode === 'light' ? 'dark' : 'light'} mode`}
        title={`Toggle to ${resolvedMode === 'light' ? 'dark' : 'light'} mode`}
      >
        {resolvedMode === 'light' ? (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="w-4 h-4"
          >
            <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
          </svg>
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="w-4 h-4"
          >
            <circle cx="12" cy="12" r="5" />
            <line x1="12" y1="1" x2="12" y2="3" />
            <line x1="12" y1="21" x2="12" y2="23" />
            <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
            <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
            <line x1="1" y1="12" x2="3" y2="12" />
            <line x1="21" y1="12" x2="23" y2="12" />
            <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
            <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
          </svg>
        )}
      </button>
    </div>
  );
}

