"use client";

import React, { createContext, useContext, useEffect, useState } from 'react';

type Theme = 'light' | 'dark';

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
  setTheme: (theme: Theme) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}

interface ThemeProviderProps {
  children: React.ReactNode;
}

export function ThemeProvider({ children }: ThemeProviderProps) {
  const [theme, setThemeState] = useState<Theme>('light');
  const [mounted, setMounted] = useState(false);
  const [transitionStage, setTransitionStage] = useState<'idle' | 'covering' | 'revealing'>('idle');

  // Initialize theme on mount
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') as Theme;
    const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    const initialTheme = savedTheme || systemTheme;

    setThemeState(initialTheme);
    document.documentElement.classList.toggle('dark', initialTheme === 'dark');
    setMounted(true);
  }, []);

  const setTheme = (newTheme: Theme) => {
    if (transitionStage !== 'idle') return;

    // Start transition: Wipe down to cover
    setTransitionStage('covering');

    setTimeout(() => {
      // Mid-transition: Change theme
      setThemeState(newTheme);
      document.documentElement.classList.toggle('dark', newTheme === 'dark');
      localStorage.setItem('theme', newTheme);

      // Continue transition: Wipe down to reveal
      setTransitionStage('revealing');

      setTimeout(() => {
        // End transition: Reset
        setTransitionStage('idle');
      }, 500);
    }, 500);
  };

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, setTheme }}>
      {/* Theme Transition Curtain */}
      <div
        className="fixed inset-0 z-[9999] pointer-events-none bg-neutral-950 transition-transform duration-500 ease-in-out"
        style={{
          transform:
            transitionStage === 'idle' ? 'translateY(-100%)' :
              transitionStage === 'covering' ? 'translateY(0%)' :
                'translateY(100%)'
        }}
      />

      {children}
    </ThemeContext.Provider>
  );
}