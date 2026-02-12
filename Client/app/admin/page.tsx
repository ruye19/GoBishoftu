"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Mountain,
  Hotel,
  FileText,
  Users,
  BarChart3,
  Settings,
  LogOut,
  Menu,
  MapPin,
  Plus,
  Eye,
  Edit,
  Trash2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useState } from "react";

const sidebarLinks = [
  { name: "Overview", path: "/dashboard", icon: LayoutDashboard },
  { name: "Attractions", path: "/dashboard/attractions", icon: Mountain },
  { name: "Accommodations", path: "/dashboard/accommodations", icon: Hotel },
  { name: "Investments", path: "/dashboard/investment", icon: FileText },
  { name: "Users", path: "/dashboard/users", icon: Users },
  { name: "Analytics", path: "/dashboard/analytics", icon: BarChart3 },
  { name: "Settings", path: "/dashboard/settings", icon: Settings },
];

const recentAttractions = [
  {
    id: 1,
    name: "Lake Hora",
    category: "Lake",
    status: "Published",
    views: 1234,
  },
  {
    id: 2,
    name: "Lake Bishoftu",
    category: "Lake",
    status: "Published",
    views: 987,
  },
  {
    id: 3,
    name: "Kidane Mihret Church",
    category: "Church",
    status: "Draft",
    views: 456,
  },
  {
    id: 4,
    name: "Coffee Experience",
    category: "Culture",
    status: "Published",
    views: 789,
  },
];

const stats = [
  {
    label: "Total Attractions",
    value: "24",
    change: "+3",
    icon: Mountain,
    path: "/dashboard/attractions",
  },
  {
    label: "Accommodations",
    value: "12",
    change: "+2",
    icon: Hotel,
    path: "/dashboard/accommodations",
  },
  {
    label: "Blog Posts",
    value: "45",
    change: "+8",
    icon: FileText,
    path: "/dashboard/blog",
  },
];

export default function AdminPage() {
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
          {/* Sidebar Header */}
          <div className="p-4 border-b border-border flex items-center justify-between">
            {sidebarOpen && (
              <span className="font-display font-semibold text-lg">Admin</span>
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
                  pathname === link.path
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:bg-muted hover:text-foreground",
                )}
              >
                <link.icon className="w-5 h-5 flex-shrink-0" />
                {sidebarOpen && <span>{link.name}</span>}
              </Link>
            ))}
          </nav>

          {/* Sidebar Footer */}
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
        <div className="p-6 lg:p-8">
          {/* Page Header */}
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-3">
              {/* Mobile Menu Button */}
              <button
                onClick={() => setSidebarOpen(true)}
                className="md:hidden p-2 rounded-lg hover:bg-muted transition-colors"
              >
                <Menu className="w-5 h-5" />
              </button>

              <div>
                <h1 className="font-display text-3xl font-bold">Dashboard</h1>
                <p className="text-muted-foreground">
                  Welcome back! Here's an overview of your site.
                </p>
              </div>
            </div>

            <Button className="gap-2">
              <Plus className="w-4 h-4" />
              Add New
            </Button>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {stats.map((stat) => (
              <Link
                key={stat.label}
                href={stat.path}
                className="bg-card rounded-xl p-6 shadow-card hover:shadow-xl transition-all duration-300 cursor-pointer block"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                    <stat.icon className="w-5 h-5 text-primary" />
                  </div>
                  <span className="text-sm font-medium text-primary bg-primary/10 px-2 py-0.5 rounded-full">
                    {stat.change}
                  </span>
                </div>
                <div className="font-display text-2xl font-bold">
                  {stat.value}
                </div>
                <p className="text-sm text-muted-foreground">{stat.label}</p>
              </Link>
            ))}
          </div>

          {/* Recent Content */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Recent Attractions */}
            <div className="bg-card rounded-xl shadow-card">
              <div className="p-6 border-b border-border flex items-center justify-between">
                <h2 className="font-display text-lg font-semibold">
                  Recent Attractions
                </h2>
                <Link href="/dashboard/attractions">
                  <Button variant="outline" size="sm">
                    View All
                  </Button>
                </Link>
              </div>
              <div className="p-6 overflow-x-auto">
                <table className="w-full min-w-[600px]">
                  <thead>
                    <tr className="text-left text-sm text-muted-foreground">
                      <th className="pb-3 font-medium">Name</th>
                      <th className="pb-3 font-medium">Category</th>
                      <th className="pb-3 font-medium">Status</th>
                      <th className="pb-3 font-medium text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border">
                    {recentAttractions.map((item) => (
                      <tr key={item.id}>
                        <td className="py-3 font-medium">{item.name}</td>
                        <td className="py-3 text-sm text-muted-foreground">
                          {item.category}
                        </td>
                        <td className="py-3">
                          <span
                            className={cn(
                              "text-xs px-2 py-1 rounded-full",
                              item.status === "Published"
                                ? "bg-primary/10 text-primary"
                                : "bg-secondary/50 text-secondary-foreground",
                            )}
                          >
                            {item.status}
                          </span>
                        </td>
                        <td className="py-3">
                          <div className="flex justify-end gap-1">
                            <Link href={`/dashboard/attractions/${item.id}`}>
                              <button className="p-1.5 rounded hover:bg-muted">
                                <Eye className="w-4 h-4 text-muted-foreground" />
                              </button>
                            </Link>

                            <Link
                              href={`/dashboard/attractions/edit/${item.id}`}
                            >
                              <button className="p-1.5 rounded hover:bg-muted">
                                <Edit className="w-4 h-4 text-muted-foreground" />
                              </button>
                            </Link>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="space-y-6">
              <div className="bg-card rounded-xl shadow-card p-6">
                <h2 className="font-display text-lg font-semibold mb-4">
                  Quick Actions
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Link href="/dashboard/attractions/new">
                    <Button
                      variant="outline"
                      className="h-auto py-4 flex flex-col gap-2 w-full"
                    >
                      <Mountain className="w-6 h-6" />
                      <span>Add Attraction</span>
                    </Button>
                  </Link>

                  <Link href="/dashboard/accommodations/new">
                    <Button
                      variant="outline"
                      className="h-auto py-4 flex flex-col gap-2 w-full"
                    >
                      <Hotel className="w-6 h-6" />
                      <span>Add Accommodation</span>
                    </Button>
                  </Link>

                  <Link href="/dashboard/blog/new">
                    <Button
                      variant="outline"
                      className="h-auto py-4 flex flex-col gap-2 w-full"
                    >
                      <FileText className="w-6 h-6" />
                      <span>Write Blog Post</span>
                    </Button>
                  </Link>

                  <Link href="/dashboard/analytics">
                    <Button
                      variant="outline"
                      className="h-auto py-4 flex flex-col gap-2 w-full"
                    >
                      <BarChart3 className="w-6 h-6" />
                      <span>View Analytics</span>
                    </Button>
                  </Link>
                </div>
              </div>

              {/* Activity Feed */}
              <div className="bg-card rounded-xl shadow-card p-6">
                <h2 className="font-display text-lg font-semibold mb-4">
                  Recent Activity
                </h2>
                <div className="space-y-4">
                  {[
                    { action: "New blog post published", time: "2 hours ago" },
                    { action: "Lake Hora page updated", time: "5 hours ago" },
                    { action: "New user registered", time: "1 day ago" },
                    {
                      action: "Investment inquiry received",
                      time: "2 days ago",
                    },
                  ].map((activity, index) => (
                    <div key={index} className="flex items-center gap-3">
                      <div className="w-2 h-2 rounded-full bg-primary" />
                      <div className="flex-1">
                        <p className="text-sm">{activity.action}</p>
                        <p className="text-xs text-muted-foreground">
                          {activity.time}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
