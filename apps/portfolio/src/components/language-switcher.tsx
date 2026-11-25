"use client";

import { useLocale } from "next-intl";
import { useRouter, usePathname } from "@/i18n/routing";
import { Languages } from "lucide-react";
import { cn } from "@/lib/utils";

export function LanguageSwitcher({ className }: { className?: string }) {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const next = locale === "en" ? "ar" : "en";

  return (
    <button
      type="button"
      aria-label="Switch language"
      onClick={() => router.replace(pathname, { locale: next })}
      className={cn(
        "flex h-12 w-12 items-center justify-center rounded-lg bg-violet-600 text-white shadow-lg transition-all hover:bg-violet-700 hover:scale-105 active:scale-95",
        className
      )}
    >
      <Languages size={22} />
    </button>
  );
}
