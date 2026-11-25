"use client";

import { useEffect, useState } from "react";
import { Home, Code2, Mail, Folder } from "lucide-react";
import { useTranslations } from "next-intl";
import { cn } from "@/lib/utils";

const items = [
  { id: "home", key: "home", icon: Home, barColor: "bg-[#0066FF]" },
  { id: "skills", key: "skills", icon: Code2, barColor: "bg-[#0066FF]" },
  { id: "contact", key: "contact", icon: Mail, barColor: "bg-[#FFC107]" },
  { id: "projects", key: "projects", icon: Folder, barColor: "bg-[#00E5FF]" },
] as const;

export function Sidebar() {
  const t = useTranslations("nav");
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setVisible(window.scrollY > 400);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleClick = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <nav
      className={cn(
        "fixed top-1/2 z-40 -translate-y-1/2 ltr:left-6 rtl:right-6 hidden md:flex flex-col gap-2 transition-all duration-300",
        visible ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
      )}
      aria-label="Floating Navigation"
    >
      {items.map((item) => {
        const Icon = item.icon;
        return (
          <button
            key={item.id}
            onClick={() => handleClick(item.id)}
            className="group flex items-center gap-3 rounded-none px-3 py-2 text-left rtl:text-right transition-all hover:bg-white/10"
          >
            <span className={cn("h-5 w-1", item.barColor)} />
            <Icon
              size={18}
              className="text-white/80 transition-colors group-hover:text-white"
            />
            <span className="text-xs font-bold tracking-wider text-white/80 uppercase transition-colors group-hover:text-white">
              {t(item.key)}
            </span>
          </button>
        );
      })}
    </nav>
  );
}
