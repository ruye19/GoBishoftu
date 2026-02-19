"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { GoLogo } from "./go-logo";
import {
  Home,
  MapPin,
  Building2,
  CircleDollarSign,
  Info,
  ChevronDown,
} from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { useLanguage } from "@/app/context/LanguageContext";

const navItems = [
  { href: "/", label: "Home", icon: Home },
  { href: "/accommodations", label: "Accommodations", icon: Building2 },
  { href: "/explore", label: "Explore", icon: MapPin },
  { href: "/investment", label: "Investment", icon: CircleDollarSign },
  { href: "/about", label: "About", icon: Info },
];

// Language Switcher Component
function LanguageSwitcher({ className = "" }) {
  const { lang, setLang } = useLanguage();
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef(null);

  const languages = [
    { code: "en", label: "EN" },
    { code: "am", label: "AM" },
    { code: "or", label: "OR" },
  ];

  // Close dropdown if clicked outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className={`relative ${className}`} ref={dropdownRef}>
      {/* Desktop Buttons */}
      <div className="hidden lg:flex gap-2">
        {languages.map((l) => (
          <button
            key={l.code}
            onClick={() => setLang(l.code)}
            className={`px-3 py-1 rounded-md font-semibold text-sm transition ${
              lang === l.code
                ? "bg-primary text-primary-foreground"
                : "bg-muted hover:bg-muted/70"
            }`}
          >
            {l.label}
          </button>
        ))}
      </div>

      {/* Mobile Dropdown */}
      <div className="lg:hidden relative">
        <button
          onClick={() => setOpen(!open)}
          className="flex items-center gap-1 px-3 py-1 rounded-md bg-muted font-semibold text-sm hover:bg-muted/70 transition"
        >
          {lang.toUpperCase()}
          <ChevronDown
            className={`w-4 h-4 transition-transform ${open ? "rotate-180" : ""}`}
          />
        </button>

        {open && (
          <div className="absolute right-0 mt-1 w-24 bg-card border border-border rounded-md shadow-lg z-50">
            {languages.map((l) => (
              <button
                key={l.code}
                onClick={() => {
                  setLang(l.code);
                  setOpen(false);
                }}
                className={`block w-full text-left px-3 py-1 text-sm rounded-md font-semibold transition ${
                  lang === l.code
                    ? "bg-primary text-primary-foreground"
                    : "hover:bg-muted/50"
                }`}
              >
                {l.label}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

// Main Navigation Component
export function Navigation() {
  const pathname = usePathname();

  const isActive = (path) => {
    if (path === "/") return pathname === "/";
    return pathname.startsWith(path);
  };

  return (
    <>
      {/* Desktop Navbar */}
      <nav
        className="hidden lg:block bg-background border-b border-border sticky top-0 z-50"
        aria-label="Main navigation"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative flex justify-between items-center h-16">
            <Link href="/" className="flex items-center gap-2 group">
              <GoLogo />
              <span className="font-display text-xl font-bold text-foreground">
                Bishoftu
              </span>
            </Link>

            <div className="flex items-center gap-8">
              {navItems.map(({ href, label }) => (
                <Link
                  key={href}
                  href={href}
                  className={`text-sm font-medium transition-colors ${
                    isActive(href)
                      ? "text-accent font-semibold"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {label}
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
            <Link href="/" className="flex items-center gap-2 group">
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
          {navItems.map(({ href, label, icon: Icon }) => {
            const active = isActive(href);
            return (
              <Link
                key={href}
                href={href}
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
                  {label}
                </span>
              </Link>
            );
          })}
        </div>
      </nav>
    </>
  );
}
