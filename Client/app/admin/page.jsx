"use client";

import Link from "next/link";
import {
  Building2,
  MapPin,
  Home,
  Settings,
  Shield,
  ArrowRight,
} from "lucide-react";

const adminSections = [
  {
    title: "Accommodations",
    description: "Review and manage listed hotels, lodges, and guest houses.",
    href: "/accommodations",
    icon: Building2,
  },
  {
    title: "Attractions & Experiences",
    description: "Check how explore experiences appear to visitors.",
    href: "/explore",
    icon: MapPin,
  },
  {
    title: "Investment",
    description: "Preview public information about investment opportunities.",
    href: "/investment",
    icon: Home,
  },
  {
    title: "Site Settings",
    description: "Coming soon – configure content and admin preferences.",
    href: "#",
    icon: Settings,
  },
];

export default function AdminDashboardPage() {
  return (
    <section className="min-h-[calc(100vh-4rem)] bg-muted/40 py-10 px-4 md:px-8">
      <div className="max-w-6xl mx-auto">
        <header className="mb-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
              <Shield className="h-4 w-4" />
              Admin Dashboard
            </p>
            <h1 className="mt-2 text-2xl md:text-3xl font-bold text-foreground">
              Control center for go Bishoftu
            </h1>
            <p className="mt-2 text-sm md:text-base text-muted-foreground max-w-2xl">
              Quickly jump to key areas of the public site to review content and
              prepare for future management features.
            </p>
          </div>

          <Link
            href="/"
            className="inline-flex items-center justify-center gap-2 rounded-full border bg-background px-4 py-2 text-sm font-medium text-foreground hover:bg-accent hover:text-accent-foreground transition-colors"
          >
            <Home className="h-4 w-4" />
            Back to main site
          </Link>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {adminSections.map(({ title, description, href, icon: Icon }) => (
            <Link
              key={title}
              href={href}
              className="group relative flex flex-col rounded-2xl border bg-card/80 p-6 shadow-sm hover:shadow-lg transition-all hover:-translate-y-0.5"
            >
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary">
                    <Icon className="h-5 w-5" />
                  </div>
                  <h2 className="text-lg font-semibold text-foreground">
                    {title}
                  </h2>
                </div>
                <ArrowRight className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />
              </div>
              <p className="text-sm text-muted-foreground">{description}</p>
              {href === "#" && (
                <span className="mt-3 inline-flex w-fit rounded-full bg-muted px-3 py-1 text-xs font-medium text-muted-foreground">
                  Coming soon
                </span>
              )}
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

