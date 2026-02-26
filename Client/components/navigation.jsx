"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { GoLogo } from "./go-logo";
import { Home, MapPin, Building2, CircleDollarSign, Info } from "lucide-react";
import LanguageSwitcher from "@/app/context/LanguageSwitcher";
import { useLanguage } from "@/app/context/LanguageContext";

export function Navigation() {
  const pathname = usePathname();
  const { lang } = useLanguage();

  // Translation map for nav labels
  const navLabels = {
    home: { en: "Home", am: "መነሻ", or: "Mana" },
    accommodations: {
      en: "Accommodations",
      am: "ማረፊያዎች",
      or: "Iddoowwan Bultii",
    },
    explore: {
      en: "Explore",
      am: "ይጎብኙ",
      or: "Daawwadhaa",
    },
    investment: {
      en: "Investment",
      am: "ኢንቨስትመንት",
      or: "Invaastimantii",
    },
    about: {
      en: "About",
      am: "ስለ እኛ",
      or: "Waa'ee Keenya",
    },
  };

  const navItems = [
    { href: "/", key: "home", icon: Home },
    { href: "/accommodations", key: "accommodations", icon: Building2 },
    { href: "/explore", key: "explore", icon: MapPin },
    { href: "/investment", key: "investment", icon: CircleDollarSign },
    { href: "/about", key: "about", icon: Info },
  ];

  const isActive = (path) => {
    const fullPath = `/${lang}${path === "/" ? "" : path}`;

    // Special case for Home
    if (path === "/") {
      return pathname === `/${lang}`;
    }

    return pathname === fullPath || pathname.startsWith(fullPath + "/");
  };

  const getHref = (path) => `/${lang}${path === "/" ? "" : path}`;

  return (
    <>
      {/* Desktop Navbar */}
      <nav
        className="hidden lg:block bg-background border-b border-border sticky top-0 z-50"
        aria-label="Main navigation"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative flex justify-between items-center h-16">
            <Link href={`/${lang}`} className="flex items-center gap-2 group">
              <GoLogo />
              <span className="font-display text-xl font-bold text-foreground">
                Bishoftu
              </span>
            </Link>

            <div className="flex items-center gap-8">
              {navItems.map(({ href, key }) => (
                <Link
                  key={key}
                  href={getHref(href)}
                  className={`text-sm font-medium transition-colors ${
                    isActive(href)
                      ? "text-accent font-semibold"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {navLabels[key][lang]}
                </Link>
              ))}

              {/* Desktop Language Switcher */}
              <LanguageSwitcher />
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile/Tablet Header */}
      <header className="lg:hidden bg-background border-b border-border sticky top-0 z-40 shrink-0">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-14 min-h-14">
            <Link href={`/${lang}`} className="flex items-center gap-2 group">
              <GoLogo />
              <span className="font-display text-xl font-bold text-foreground">
                Bishoftu
              </span>
            </Link>

            {/* Mobile Language Switcher */}
            <LanguageSwitcher />
          </div>
        </div>
      </header>

      {/* Mobile Bottom Navigation */}
      <nav
        className="lg:hidden fixed bottom-0 left-0 right-0 z-50 w-full max-w-[100vw] bg-background border-t border-border pb-[env(safe-area-inset-bottom)]"
        aria-label="Bottom navigation"
      >
        <div className="flex items-stretch justify-around min-h-0 h-16 max-w-[100%] overflow-hidden">
          {navItems.map(({ href, key, icon: Icon }) => {
            const active = isActive(href);
            return (
              <Link
                key={key}
                href={getHref(href)}
                className={`flex flex-1 min-w-0 flex-col items-center justify-center gap-0.5 py-2 px-1 shrink-0 transition-colors ${
                  active
                    ? "text-accent font-semibold"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                <Icon
                  className="w-5 h-5 shrink-0"
                  strokeWidth={active ? 2.5 : 2}
                  aria-hidden
                />
                <span className="text-[10px] sm:text-xs truncate w-full text-center max-w-[80px]">
                  {navLabels[key][lang]}
                </span>
              </Link>
            );
          })}
        </div>
      </nav>
    </>
  );
}
