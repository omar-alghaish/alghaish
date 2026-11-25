"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "@/hooks/use-theme";
import { cn } from "@/lib/utils";

export function ThemeToggle({ className }: { className?: string }) {
  const { toggleTheme, mounted, theme } = useTheme();
  const isDark = mounted && theme === "dark";

  return (
    <button
      type="button"
      aria-label="Toggle theme"
      onClick={toggleTheme}
      className={cn(
        "flex h-12 w-12 items-center justify-center rounded-lg bg-amber-500 text-white shadow-lg transition-all hover:bg-amber-600 hover:scale-105 active:scale-95",
        className
      )}
    >
      {isDark ? <Sun size={22} /> : <Moon size={22} />}
    </button>
  );
}
