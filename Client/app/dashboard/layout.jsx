"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import {
  Menu,
  LogOut,
  LayoutDashboard,
  Mountain,
  Hotel,
  FileText,
  Users,
  BarChart3,
  Settings,
} from "lucide-react";
import { cn } from "@/lib/utils";

const sidebarLinks = [
  { name: "Overview", path: "/dashboard", icon: LayoutDashboard },
  { name: "Attractions", path: "/dashboard/attractions", icon: Mountain },
  { name: "Accommodations", path: "/dashboard/accommodations", icon: Hotel },
  { name: "Investments", path: "/dashboard/investment", icon: FileText },
  { name: "Users", path: "/dashboard/users", icon: Users },
  { name: "Analytics", path: "/dashboard/analytics", icon: BarChart3 },
  { name: "Settings", path: "/dashboard/settings", icon: Settings },
];

export default function DashboardLayout({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const pathname = usePathname();

  return (
    <div className="min-h-screen bg-muted/30 flex pt-20">
      {/* Sidebar */}
      <aside
        className={cn(
          "fixed md:static left-0 top-20 bottom-0 z-40 bg-card border-r border-border transition-all duration-300",
          sidebarOpen
            ? "w-64 translate-x-0"
            : "w-64 -translate-x-full md:translate-x-0 md:w-20",
        )}
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="p-4 border-b border-border flex items-center justify-between">
            {sidebarOpen && (
              <span className="font-display font-semibold text-lg">
                Admin Panel
              </span>
            )}

            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="p-2 rounded-lg hover:bg-muted transition-colors"
            >
              <Menu className="w-5 h-5" />
            </button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 p-4 space-y-1">
            {sidebarLinks.map((link) => (
              <Link
                key={link.path}
                href={link.path}
                className={cn(
                  "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-colors",
                  pathname.startsWith(link.path)
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:bg-muted hover:text-foreground",
                  !sidebarOpen && "md:justify-center",
                )}
              >
                <link.icon className="w-5 h-5 flex-shrink-0" />
                {sidebarOpen && <span>{link.name}</span>}
              </Link>
            ))}
          </nav>

          {/* Footer */}
          <div className="p-4 border-t border-border">
            <Link
              href="/"
              className={cn(
                "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-muted-foreground hover:bg-muted hover:text-foreground transition-colors",
                !sidebarOpen && "justify-center",
              )}
            >
              <LogOut className="w-5 h-5" />
              {sidebarOpen && <span>Back to Site</span>}
            </Link>
          </div>
        </div>
      </aside>

      {/* Mobile Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-30 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Main Content */}
      <main
        className={cn(
          "flex-1 transition-all duration-300",
          "ml-0 md:ml-64",
          !sidebarOpen && "md:ml-20",
        )}
      >
        <div className="p-6 lg:p-8">{children}</div>
      </main>
    </div>
  );
}
