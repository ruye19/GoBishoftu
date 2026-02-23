"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard,
  Mountain,
  Hotel,
  FileText,
  Users,
  BarChart3,
  Settings,
  LogOut,
} from "lucide-react";

const sidebarLinks = [
  { name: "Overview", path: "/dashboard", icon: LayoutDashboard },
  { name: "Attractions", path: "/dashboard/attractions", icon: Mountain },
  { name: "Accommodations", path: "/dashboard/accommodations", icon: Hotel },
  { name: "Investments", path: "/dashboard/investment", icon: FileText },
  { name: "Users", path: "/dashboard/users", icon: Users },
  { name: "Analytics", path: "/dashboard/analytics", icon: BarChart3 },
  { name: "Settings", path: "/dashboard/settings", icon: Settings },
];

export default function AdminSidebar({
  sidebarOpen,
  setSidebarOpen,
  pathname,
}) {
  const [preferredLang, setPreferredLang] = useState("en"); // Default to prevent hydration mismatch

  useEffect(() => {
    // Get preferred language from localStorage only on client side
    if (typeof window !== 'undefined') {
      const savedLang = localStorage.getItem('lang') || 'en';
      setPreferredLang(savedLang);
    }
  }, []);

  return (
    <aside
      className={cn(
        "fixed md:static left-0 top-20 bottom-0 z-40 bg-card border-r border-border flex flex-col transition-transform duration-300",
        sidebarOpen
          ? "w-64 translate-x-0"
          : "-translate-x-full md:translate-x-0 md:w-20",
      )}
    >
      {/* Sidebar Header */}
      <div className="p-4 border-b border-border flex items-center justify-between">
        {sidebarOpen && (
          <span className="font-display font-semibold text-lg">Admin</span>
        )}
      </div>

      {/* Navigation Links */}
      <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
        {sidebarLinks.map((link) => {
          const isActive = pathname === link.path; // exact match
          return (
            <Link
              key={link.path}
              href={link.path}
              onClick={() => sidebarOpen && setSidebarOpen(false)} // close on mobile
              className={cn(
                "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-colors",
                isActive
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:bg-muted hover:text-foreground",
              )}
            >
              <link.icon className="w-5 h-5 flex-shrink-0" />
              {sidebarOpen && <span>{link.name}</span>}
            </Link>
          );
        })}
      </nav>

      {/* Sidebar Footer */}
      <div className="p-4 border-t border-border">
        <Link
          href={`/${preferredLang}`}
          className={cn(
            "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-muted-foreground hover:bg-muted hover:text-foreground transition-colors",
            !sidebarOpen && "justify-center",
          )}
        >
          <LogOut className="w-5 h-5" />
          {sidebarOpen && <span>Back to Site</span>}
        </Link>
      </div>
    </aside>
  );
}
