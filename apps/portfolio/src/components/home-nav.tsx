"use client";

import { Home, Code2, Mail, Folder } from "lucide-react";
import { useTranslations } from "next-intl";
import { cn } from "@/lib/utils";

interface NavItem {
  id: string;
  key: string;
  icon: typeof Home;
  barColor: string;
  hoverBg: string;
}

const navItems: NavItem[] = [
  {
    id: "home",
    key: "home",
    icon: Home,
    barColor: "bg-[#0066FF]",
    hoverBg: "hover:bg-[#0066FF]",
  },
  {
    id: "skills",
    key: "skills",
    icon: Code2,
    barColor: "bg-[#0066FF]",
    hoverBg: "hover:bg-[#0066FF]",
  },
  {
    id: "contact",
    key: "contact",
    icon: Mail,
    barColor: "bg-[#FFC107]",
    hoverBg: "hover:bg-[#FFAE00]",
  },
  {
    id: "projects",
    key: "projects",
    icon: Folder,
    barColor: "bg-[#00E5FF]",
    hoverBg: "hover:bg-[#00B4D8]",
  },
];

export function HomeNav() {
  const t = useTranslations("nav");

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <nav className="flex flex-col gap-2.5 w-full max-w-lg mt-8" aria-label="Main Navigation">
      {navItems.map((item) => {
        const Icon = item.icon;
        return (
          <a
            key={item.id}
            href={`#${item.id}`}
            onClick={(e) => handleClick(e, item.id)}
            className={cn(
              "group flex items-center gap-3.5 px-0 py-2 transition-all duration-150 cursor-pointer text-white font-bold tracking-wider text-xs md:text-sm uppercase rounded-none",
              item.hoverBg,
              "hover:px-4"
            )}
          >
            <span
              className={cn(
                "w-1 h-5 shrink-0 transition-transform",
                item.barColor
              )}
            />
            <Icon size={16} className="text-white shrink-0" />
            <span className="text-white font-bold tracking-wider">
              {t(item.key).toUpperCase()}
            </span>
          </a>
        );
      })}
    </nav>
  );
}
