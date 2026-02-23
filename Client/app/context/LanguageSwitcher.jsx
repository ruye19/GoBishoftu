"use client";

import { useState, useRef, useEffect } from "react";
import { useLanguage } from "@/app/context/LanguageContext";
import { useRouter, usePathname } from "next/navigation";
import { ChevronDown } from "lucide-react";

export default function LanguageSwitcher({ className = "" }) {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef(null);
  const { lang, setLang } = useLanguage();
  const router = useRouter();
  const pathname = usePathname();

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
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Update URL when language changes
  const handleLanguageChange = (newLang) => {
    setLang(newLang);

    // Get current path without language prefix
    const pathParts = pathname.split("/").slice(2); // skip empty + current lang
    const newPath = `/${newLang}/${pathParts.join("/")}`;

    // Use router.replace to stay in same position
    router.replace(newPath);
  };

  return (
    <div className={`relative ${className}`} ref={dropdownRef}>
      {/* Desktop Buttons */}
      <div className="hidden lg:flex gap-2">
        {languages.map((l) => (
          <button
            key={l.code}
            onClick={() => handleLanguageChange(l.code)}
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
                  handleLanguageChange(l.code);
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
