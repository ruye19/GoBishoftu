"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Search, MapPin, Hotel, Route } from "lucide-react";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const SUGGESTIONS = [
  { label: "Lakes in Bishoftu", route: "/explore?category=lake" },
  { label: "Luxury resorts & spas", route: "/accommodations?type=resort" },
  {
    label: "Guest houses with lake views",
    route: "/accommodations?type=guest-house",
  },
  {
    label: "Cultural experiences & markets",
    route: "/explore?category=culture",
  },
  { label: "Hot springs & wellness", route: "/explore?category=wellness" },
];

const QUICK_CHIPS = [
  { icon: MapPin, label: "Lakes", route: "/explore?category=lake" },
  { icon: Hotel, label: "Hotels & Resorts", route: "/accommodations" },
  { icon: Route, label: "Experiences", route: "/explore" },
];

export function DiscoverySearch({ className }) {
  const router = useRouter();
  const [query, setQuery] = useState("");

  const filteredSuggestions =
    query.trim().length < 2
      ? []
      : SUGGESTIONS.filter((item) =>
          item.label.toLowerCase().includes(query.toLowerCase()),
        ).slice(0, 4);

  function handleSubmit(event) {
    event.preventDefault();
    const trimmed = query.trim();

    if (!trimmed) {
      router.push("/explore");
      return;
    }

    // Simple routing heuristic – exploration first.
    const lower = trimmed.toLowerCase();
    if (
      lower.includes("hotel") ||
      lower.includes("resort") ||
      lower.includes("stay")
    ) {
      router.push(`/accommodations?q=${encodeURIComponent(trimmed)}`);
    } else {
      router.push(`/explore?q=${encodeURIComponent(trimmed)}`);
    }
  }

  function handleSuggestionClick(item) {
    router.push(item.route);
  }

  function handleChipClick(chip) {
    router.push(chip.route);
  }

  return (
    <div className={cn("w-full max-w-2xl mx-auto py-5", className)}>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-3 rounded-full bg-card/95 p-1.5 shadow-card backdrop-blur-sm sm:flex-row sm:items-center"
      >
        <div className="flex items-center gap-2 rounded-full bg-background px-3 py-1.5 flex-1">
          <Search className="h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search places, hotels, transport, attractions…"
            className="border-none bg-transparent px-0 shadow-none focus-visible:ring-0"
          />
        </div>
        <Button
          type="submit"
          size="lg"
          className="w-full rounded-full sm:w-auto"
        >
          Explore Bishoftu
        </Button>
      </form>

      {filteredSuggestions.length > 0 && (
        <div className="mt-2 rounded-2xl bg-card/95 p-2 shadow-card backdrop-blur-sm">
          <p className="px-2 pb-1 text-xs font-medium uppercase tracking-wide text-muted-foreground">
            Suggestions
          </p>
          <ul className="space-y-1">
            {filteredSuggestions.map((item) => (
              <li key={item.label}>
                <button
                  type="button"
                  onClick={() => handleSuggestionClick(item)}
                  className="w-full rounded-xl px-3 py-2 text-left text-sm hover:bg-muted/80"
                >
                  {item.label}
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* <div className="mt-3 flex flex-wrap justify-center gap-2">
        {QUICK_CHIPS.map(({ icon: Icon, label, route }) => (
          <button
            key={label}
            type="button"
            onClick={() => handleChipClick({ route })}
            className="inline-flex items-center gap-1.5 rounded-full border border-border bg-background/80 px-3 py-1 text-xs font-medium text-muted-foreground hover:bg-accent hover:text-accent-foreground"
          >
            <Icon className="h-3.5 w-3.5" />
            <span>{label}</span>
          </button>
        ))}
      </div> */}
    </div>
  );
}
