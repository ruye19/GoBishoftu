"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import AdminSidebar from "./AdminSidebar";
import { Menu } from "lucide-react";

export default function DashboardLayout({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const pathname = usePathname();

  return (
    <div className="min-h-screen flex bg-muted/30 pt-20 relative">
      {/* Sidebar */}
      <AdminSidebar
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
        pathname={pathname}
      />

      {/* Mobile Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-30 md:hidden transition-opacity duration-300"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Main Content */}
      <main
        className={`flex-1 transition-all duration-300
          md:ml-20
          ${sidebarOpen ? "md:ml-64" : ""} 
        `}
      >
        {/* Mobile Menu Button: hidden when sidebar is open */}
        {!sidebarOpen && (
          <div className="md:hidden px-2 py-1">
            {" "}
            {/* reduced vertical spacing */}
            <button
              onClick={() => setSidebarOpen(true)}
              className="p-2 rounded-lg bg-card shadow hover:bg-muted transition-colors"
            >
              <Menu className="w-5 h-5" />
            </button>
          </div>
        )}

        {/* Page Content */}
        <div className="p-6 lg:p-8">{children}</div>
      </main>
    </div>
  );
}
