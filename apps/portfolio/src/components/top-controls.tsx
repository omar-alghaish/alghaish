"use client";

import { useLocale } from "next-intl";
import { useRouter, usePathname, Link } from "@/i18n/routing";
import { useTheme } from "@/hooks/use-theme";
import { Moon, Sun, ChevronLeft, ChevronRight } from "lucide-react";

export function TopControls() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const { toggleTheme, mounted, theme } = useTheme();
  const isDark = mounted && theme === "dark";

  const nextLocale = locale === "en" ? "ar" : "en";
  const isHome = pathname === "/" || pathname === "";
  const isRtl = locale === "ar";

  return (
    <div className="fixed top-0 z-50 flex items-stretch ltr:right-0 rtl:left-0">
      {/* Back button — shown on all pages except home */}
      {!isHome && (
        <Link
          href="/"
          aria-label="Go back to home"
          className="flex h-10 w-10 items-center justify-center bg-zinc-800/10 dark:bg-white/10 text-foreground dark:text-white transition-colors hover:bg-zinc-800/20 dark:hover:bg-white/20 active:bg-zinc-800/30 dark:active:bg-white/30 backdrop-blur-sm"
        >
          {isRtl ? (
            <ChevronRight size={19} className="text-current" />
          ) : (
            <ChevronLeft size={19} className="text-current" />
          )}
        </Link>
      )}

      {/* Theme toggle + language switcher */}
      <div className="flex items-stretch bg-amber-500 text-white shadow-md">
        <button
          type="button"
          aria-label="Toggle theme"
          onClick={toggleTheme}
          className="flex h-10 w-10 items-center justify-center transition-colors hover:bg-amber-600 active:bg-amber-700"
        >
          {isDark ? (
            <Moon size={19} className="fill-white text-white" />
          ) : (
            <Sun size={19} className="text-white" />
          )}
        </button>
        <button
          type="button"
          aria-label={`Switch to ${nextLocale === "ar" ? "Arabic" : "English"}`}
          onClick={() => router.replace(pathname, { locale: nextLocale })}
          title={nextLocale === "ar" ? "العربية" : "English"}
          className="flex h-10 w-10 items-center justify-center font-bold text-sm tracking-wide transition-colors hover:bg-amber-600 active:bg-amber-700 border-l border-amber-400/50"
        >
          {nextLocale.toUpperCase()}
        </button>
      </div>
    </div>
  );
}
