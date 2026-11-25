"use client";

import { useRef } from "react";
import { Home, Code2, Mail, Folder, BookOpen } from "lucide-react";
import { useTranslations } from "next-intl";
import { Link, usePathname } from "@/i18n/routing";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { cn } from "@/lib/utils";

interface NavItem {
  href: "/" | "/skills" | "/contact" | "/projects" | "/blog";
  key: "home" | "skills" | "contact" | "projects" | "blog";
  icon: typeof Home;
  barColor: string;
  activeBg: string;
  hoverColor: string;
}

const navItems: NavItem[] = [
  {
    href: "/",
    key: "home",
    icon: Home,
    barColor: "#0066FF",
    activeBg: "#0066FF",
    hoverColor: "#0066FF",
  },
  {
    href: "/skills",
    key: "skills",
    icon: Code2,
    barColor: "#0066FF",
    activeBg: "#0066FF",
    hoverColor: "#0066FF",
  },
  {
    href: "/contact",
    key: "contact",
    icon: Mail,
    barColor: "#FFC107",
    activeBg: "#FFAE00",
    hoverColor: "#FFAE00",
  },
  {
    href: "/projects",
    key: "projects",
    icon: Folder,
    barColor: "#00E5FF",
    activeBg: "#00B4D8",
    hoverColor: "#00B4D8",
  },
  {
    href: "/blog",
    key: "blog",
    icon: BookOpen,
    barColor: "#FFC107",
    activeBg: "#FFAE00",
    hoverColor: "#FFAE00",
  },
];

export function NavLinks({ className }: { className?: string }) {
  const t = useTranslations("nav");
  const pathname = usePathname();
  const navRef = useRef<HTMLElement>(null);

  // Stagger-animate each nav item on mount
  useGSAP(
    () => {
      if (!navRef.current) return;
      const items = navRef.current.querySelectorAll<HTMLElement>(".nav-item");

      gsap.fromTo(
        items,
        { opacity: 0, x: -32 },
        {
          opacity: 1,
          x: 0,
          duration: 0.5,
          ease: "power3.out",
          stagger: 0.1,
        }
      );
    },
    { scope: navRef }
  );

  const handleMouseEnter = (el: HTMLElement, item: NavItem, isActive: boolean) => {
    if (isActive) return;
    gsap.to(el, {
      backgroundColor: item.hoverColor,
      paddingLeft: 16,
      duration: 0.2,
      ease: "power2.out",
    });
    const bar = el.querySelector<HTMLElement>(".nav-bar");
    if (bar) gsap.to(bar, { scaleY: 1.4, duration: 0.2 });
  };

  const handleMouseLeave = (el: HTMLElement, isActive: boolean) => {
    if (isActive) return;
    gsap.to(el, {
      backgroundColor: "transparent",
      paddingLeft: 0,
      duration: 0.2,
      ease: "power2.in",
    });
    const bar = el.querySelector<HTMLElement>(".nav-bar");
    if (bar) gsap.to(bar, { scaleY: 1, duration: 0.2 });
  };

  return (
    <nav
      ref={navRef}
      className={cn("flex flex-col gap-2.5 w-full max-w-lg mt-8", className)}
      aria-label="Navigation Pages"
    >
      {navItems.map((item) => {
        const Icon = item.icon;
        const isActive =
          item.href === "/"
            ? pathname === "/" || pathname === ""
            : pathname.startsWith(item.href);

        return (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              "nav-item flex items-center gap-3.5 py-2 cursor-pointer text-white font-bold tracking-wider text-xs md:text-sm uppercase rounded-none w-full",
              isActive && "px-4"
            )}
            style={isActive ? { backgroundColor: item.activeBg } : {}}
            onMouseEnter={(e) =>
              handleMouseEnter(e.currentTarget as HTMLElement, item, isActive)
            }
            onMouseLeave={(e) =>
              handleMouseLeave(e.currentTarget as HTMLElement, isActive)
            }
          >
            <span
              className="nav-bar w-1 h-5 shrink-0 origin-center"
              style={{
                backgroundColor: item.barColor,
                opacity: isActive ? 0 : 1,
              }}
            />
            <Icon size={16} className="text-white shrink-0" />
            <span className="text-white font-bold tracking-wider">
              {t(item.key).toUpperCase()}
            </span>
          </Link>
        );
      })}
    </nav>
  );
}
