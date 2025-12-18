"use client";

import { useTheme } from "./theme-provider";
import { Moon, Sun } from "lucide-react";

export default function FloatingThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="fixed bottom-6 right-6 z-[100] p-3 rounded-full bg-white/80 dark:bg-neutral-800/80 backdrop-blur-md border border-neutral-200 dark:border-neutral-700 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110"
      aria-label="Toggle Theme"
    >
      {theme === 'dark' ? (
        <Sun className="w-5 h-5 text-yellow-500" />
      ) : (
        <Moon className="w-5 h-5 text-neutral-700 dark:text-neutral-300" />
      )}
    </button>
  );
}