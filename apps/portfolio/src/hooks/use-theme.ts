"use client";

import { useTheme as useNextTheme } from "next-themes";
import { useEffect, useState, useCallback } from "react";

export function useTheme() {
  const { theme, setTheme, resolvedTheme } = useNextTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const toggleTheme = useCallback(() => {
    const current = resolvedTheme ?? theme;
    setTheme(current === "dark" ? "light" : "dark");
  }, [resolvedTheme, theme, setTheme]);

  return {
    theme: (resolvedTheme ?? theme) as "light" | "dark" | undefined,
    setTheme,
    toggleTheme,
    mounted,
  };
}
