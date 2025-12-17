"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { GoLogo } from "./go-logo";

export function Navigation() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const isActive = (path) => {
    return pathname === path;
  };

  // lock background scroll when mobile menu is open
  useEffect(() => {
    if (typeof document === "undefined") return;
    if (open) {
      document.documentElement.classList.add("overflow-hidden");
      document.body.classList.add("overflow-hidden");
    } else {
      document.documentElement.classList.remove("overflow-hidden");
      document.body.classList.remove("overflow-hidden");
    }
    return () => {
      document.documentElement.classList.remove("overflow-hidden");
      document.body.classList.remove("overflow-hidden");
    };
  }, [open]);

  return (
    <nav className="bg-background border-b border-border sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <GoLogo />
            <span className="text-xl font-bold text-foreground">Bishoftu</span>
          </Link>

          {/* Desktop Navigation Links */}
          <div className="hidden md:flex items-center gap-8">
            <Link
              href="/"
              className={`text-sm font-medium transition-colors ${
                isActive("/")
                  ? "text-primary font-semibold"
                  : "text-foreground/70 hover:text-foreground"
              }`}
            >
              Home
            </Link>
            <Link
              href="/accommodations"
              className={`text-sm font-medium transition-colors ${
                isActive("/accommodations")
                  ? "text-primary font-semibold"
                  : "text-foreground/70 hover:text-foreground"
              }`}
            >
              Accommodations
            </Link>
            <Link
              href="/explore"
              className={`text-sm font-medium transition-colors ${
                isActive("/explore")
                  ? "text-primary font-semibold"
                  : "text-foreground/70 hover:text-foreground"
              }`}
            >
              Explore
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              aria-label="Toggle menu"
              onClick={() => setOpen((v) => !v)}
              className="p-2 rounded-md text-foreground/80 hover:bg-muted"
            >
              {/* simple hamburger icon */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {open ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile backdrop + slide-in panel (hidden on md+) */}
      <div
        className={`md:hidden fixed inset-0 z-40 transition-opacity ${
          open ? "pointer-events-auto" : "pointer-events-none"
        }`}
        aria-hidden={!open}
      >
        {/* Backdrop */}
        <div
          className={`absolute inset-0 bg-black/40 transition-opacity ${
            open ? "opacity-100" : "opacity-0"
          }`}
          onClick={() => setOpen(false)}
        />

        {/* Slide-in panel */}
        <div
          className={`absolute top-0 right-0 h-full w-64 bg-background border-l border-border transform transition-transform duration-300 ${
            open ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <div className="px-4 py-4">
            <div className="flex items-center justify-between mb-4">
              <Link href="/" className="flex items-center gap-2 group">
                <GoLogo />
                <span className="text-lg font-bold text-foreground">
                  Bishoftu
                </span>
              </Link>
              <button
                aria-label="Close menu"
                onClick={() => setOpen(false)}
                className="p-2 rounded-md text-foreground/80 hover:bg-muted"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>

            <nav className="flex flex-col gap-2">
              <Link
                href="/"
                className={`text-sm font-medium py-2 ${
                  isActive("/")
                    ? "text-primary font-semibold"
                    : "text-foreground/80"
                }`}
                onClick={() => setOpen(false)}
              >
                Home
              </Link>
              <Link
                href="/accommodations"
                className={`text-sm font-medium py-2 ${
                  isActive("/accommodations")
                    ? "text-primary font-semibold"
                    : "text-foreground/80"
                }`}
                onClick={() => setOpen(false)}
              >
                Accommodations
              </Link>
              <Link
                href="/explore"
                className={`text-sm font-medium py-2 ${
                  isActive("/explore")
                    ? "text-primary font-semibold"
                    : "text-foreground/80"
                }`}
                onClick={() => setOpen(false)}
              >
                Explore
              </Link>
            </nav>
          </div>
        </div>
      </div>
    </nav>
  );
}
