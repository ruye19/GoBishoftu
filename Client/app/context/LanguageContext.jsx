"use client";

import { createContext, useState, useContext, useEffect } from "react";

const LanguageContext = createContext();

export function LanguageProvider({ children }) {
  const [lang, setLang] = useState("en"); // default English

  // Load saved language
  useEffect(() => {
    const savedLang = localStorage.getItem("lang");
    if (savedLang) {
      setLang(savedLang);
    }
  }, []);

  // Sync language with URL
  useEffect(() => {
    // Get language from URL path
    if (typeof window !== 'undefined') {
      const pathLang = window.location.pathname.split('/')[1];
      if (pathLang && pathLang !== lang) {
        setLang(pathLang);
        localStorage.setItem("lang", pathLang);
      }
    }
  }, []);

  // save language
  useEffect(() => {
    localStorage.setItem("lang", lang);
  }, [lang]);

  return (
    <LanguageContext.Provider value={{ lang, setLang }}>
      {children}
    </LanguageContext.Provider>
  );
}

export const useLanguage = () => useContext(LanguageContext);
