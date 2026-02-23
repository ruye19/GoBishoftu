"use client";

import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import Link from "next/link";

export function Footer() {
  const pathname = usePathname();
  const [currentLang, setCurrentLang] = useState("en");

  // Get current language from URL or localStorage
  useEffect(() => {
    if (typeof window !== 'undefined') {
      // Try to get language from URL first
      const pathLang = pathname?.split('/')[1];
      if (pathLang && ['en', 'am', 'or'].includes(pathLang)) {
        setCurrentLang(pathLang);
      } else {
        // Fallback to localStorage
        const savedLang = localStorage.getItem('lang') || 'en';
        setCurrentLang(savedLang);
      }
    }
  }, [pathname]);

  // Hide footer on admin-related routes
  if (pathname?.startsWith("/admin") || pathname === "/admin-login" || pathname?.startsWith("/dashboard")) {
    return null;
  }

  return (
    <footer className="bg-secondary border-t border-secondary-foreground/20 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded bg-secondary-foreground/20 flex items-center justify-center text-secondary-foreground font-bold text-sm">
                🌿
              </div>
              <span className="font-display font-bold text-secondary-foreground">goBishoftu</span>
            </div>
            <p className="font-body text-sm text-secondary-foreground/80">
              Discover the beauty and culture of Bishoftu through luxury
              experiences and authentic exploration.
            </p>
          </div>
          <div>
            <h4 className="font-display font-semibold text-secondary-foreground mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm text-secondary-foreground/80">
              <li>
                <Link href={`/${currentLang}`} className="hover:text-accent transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href={`/${currentLang}/accommodations`}
                  className="hover:text-accent transition-colors"
                >
                  Accommodations
                </Link>
              </li>
              <li>
                <Link
                  href={`/${currentLang}/explore`}
                  className="hover:text-accent transition-colors"
                >
                  Explore
                </Link>
              </li>
              <li>
                <Link
                  href={`/${currentLang}/investment`}
                  className="hover:text-accent transition-colors"
                >
                  Investment
                </Link>
              </li>
              <li>
                <Link
                  href={`/${currentLang}/about`}
                  className="hover:text-accent transition-colors"
                >
                  About
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-secondary-foreground mb-4">Contact</h4>
            <ul className="space-y-2 text-sm text-secondary-foreground/80">
              <li>Email: info@gobishoftu.com</li>
              <li>Phone: +251 (0) 114 300 100</li>
              <li>Bishoftu, Ethiopia</li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-secondary-foreground mb-4">Follow Us</h4>
            <ul className="space-y-2 text-sm text-secondary-foreground/80">
              <li>
                <a href="https://facebook.com/gobishoftu" target="_blank" rel="noopener noreferrer" className="hover:text-accent transition-colors">
                  Facebook
                </a>
              </li>
              <li>
                <a href="https://instagram.com/gobishoftu" target="_blank" rel="noopener noreferrer" className="hover:text-accent transition-colors">
                  Instagram
                </a>
              </li>
              <li>
                <a href="https://twitter.com/gobishoftu" target="_blank" rel="noopener noreferrer" className="hover:text-accent transition-colors">
                  Twitter
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="border-t border-secondary-foreground/20 pt-8">
          <p className="text-center text-sm text-secondary-foreground/70">
            © {new Date().getFullYear()} goBishoftu. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
