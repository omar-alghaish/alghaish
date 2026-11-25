"use client";

import { useRef } from "react";
import { Code2, Mail, Folder, BookOpen, Home } from "lucide-react";
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
}

const navItems: NavItem[] = [
  {
    href: "/skills",
    key: "skills",
    icon: Code2,
    barColor: "#0066FF",
  },
  {
    href: "/contact",
    key: "contact",
    icon: Mail,
    barColor: "#FF0066",
  },
  {
    href: "/projects",
    key: "projects",
    icon: Folder,
    barColor: "#69f234",
  },
  {
    href: "/blog",
    key: "blog",
    icon: BookOpen,
    barColor: "#FFC107",
  },
];

export function NavLinks({ className }: { className?: string }) {
  const t = useTranslations("nav");
  const pathname = usePathname();
  const navRef = useRef<HTMLElement>(null);

  // Stagger entrance on mount
  useGSAP(
    () => {
      if (!navRef.current) return;
      const items = navRef.current.querySelectorAll<HTMLElement>(".nav-item");

      gsap.fromTo(
        items,
        { opacity: 0, x: -28 },
        {
          opacity: 1,
          x: 0,
          duration: 0.45,
          ease: "power3.out",
          stagger: 0.08,
        }
      );
    },
    { scope: navRef }
  );

  const handleMouseEnter = (el: HTMLElement, isActive: boolean) => {
    if (isActive) return;
    const bar = el.querySelector<HTMLElement>(".nav-bar");
    if (bar) {
      gsap.killTweensOf(bar);
      gsap.to(bar, {
        width: "100%",
        duration: 0.28,
        ease: "power2.out",
      });
    }
  };

  const handleMouseLeave = (el: HTMLElement, isActive: boolean) => {
    if (isActive) return;
    const bar = el.querySelector<HTMLElement>(".nav-bar");
    if (bar) {
      gsap.killTweensOf(bar);
      gsap.to(bar, {
        width: "4px",
        duration: 0.24,
        ease: "power2.inOut",
      });
    }
  };

  return (
    <nav
      ref={navRef}
      className={cn("flex flex-col gap-2.5 w-full mt-8", className)}
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
            className="nav-item relative flex items-center w-full py-2.5 px-3 overflow-hidden group cursor-pointer text-white font-bold tracking-wider text-xs md:text-sm uppercase rounded-none transition-transform active:scale-[0.99]"
            onMouseEnter={(e) =>
              handleMouseEnter(e.currentTarget as HTMLElement, isActive)
            }
            onMouseLeave={(e) =>
              handleMouseLeave(e.currentTarget as HTMLElement, isActive)
            }
          >
            {/* Expanding colored bar: resting at 4px, animates to 100% on hover */}
            <span
              className="nav-bar absolute inset-y-0 ltr:left-0 rtl:right-0 pointer-events-none"
              style={{
                backgroundColor: item.barColor,
                width: isActive ? "100%" : "4px",
              }}
            />

            {/* Content layered above the expanding bar */}
            <div className="relative z-10 flex items-center gap-3.5 ltr:pl-1 rtl:pr-1">
              <Icon size={16} className="text-white shrink-0" />
              <span className="text-white font-bold tracking-wider">
                {t(item.key).toUpperCase()}
              </span>
            </div>
          </Link>
        );
      })}
    </nav>
  );
}
