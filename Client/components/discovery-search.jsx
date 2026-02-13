"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export function DiscoverySearch({ className = "", data = {} }) {
  const { hotels = [], attractions = [], agencies = [] } = data;

  const [query, setQuery] = useState("");
  const [filtered, setFiltered] = useState({
    hotels,
    attractions,
    agencies,
  });

  const router = useRouter();

  useEffect(() => {
    if (!query.trim()) {
      setFiltered({ hotels, attractions, agencies });
      return;
    }

    const lower = query.toLowerCase();

    const safeIncludes = (value) => value?.toLowerCase().includes(lower);

    setFiltered({
      hotels: hotels.filter(
        (h) => safeIncludes(h.name) || safeIncludes(h.type),
      ),
      attractions: attractions.filter(
        (a) =>
          safeIncludes(a.name) ||
          safeIncludes(a.category) ||
          safeIncludes(a.location),
      ),
      agencies: agencies.filter(
        (ag) => safeIncludes(ag.name) || safeIncludes(ag.category),
      ),
    });
  }, [query, hotels, attractions, agencies]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!query.trim()) return;
    router.push(`/search?query=${encodeURIComponent(query)}`);
  };

  const Card = ({ item, type }) => (
    <div className="bg-card rounded-xl shadow-card overflow-hidden hover:shadow-lg transition min-w-[260px] sm:min-w-[280px]">
      {item.image && (
        <img
          src={item.image}
          alt={item.name}
          className="w-full h-40 object-cover"
        />
      )}

      <div className="p-4">
        {type !== "agency" && (
          <div className="text-sm text-primary font-semibold mb-1">
            {item.type || item.category}
          </div>
        )}
        <div className="font-bold text-lg">{item.name}</div>
      </div>
    </div>
  );

  const Section = ({ title, items, type }) => {
    if (!items.length) return null;

    return (
      <div className="mb-6">
        <h4 className="font-semibold mb-2">{title}</h4>

        {/* Mobile Horizontal Scroll */}
        <div className="md:hidden flex gap-4 overflow-x-auto snap-x snap-mandatory pb-4 px-2 -ml-2">
          {items.map((item) => (
            <div
              key={`${type}-${item.id}`}
              className="flex-shrink-0 snap-start"
            >
              <Card item={item} type={type} />
            </div>
          ))}
        </div>

        {/* Desktop Grid */}
        <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-4 gap-4">
          {items.map((item) => (
            <Card key={`${type}-${item.id}`} item={item} type={type} />
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className={`w-full ${className}`}>
      {/* Search Form */}
      <form onSubmit={handleSubmit} className="flex w-full gap-2">
        <input
          type="text"
          placeholder="Search hotels, attractions, agencies..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="
            flex-1
            px-5
            py-3
            rounded-full
            border
            border-muted-foreground/30
            bg-white
            dark:bg-gray-800
            dark:text-white
            shadow-sm
            placeholder:text-muted-foreground/70
            focus:outline-none
            focus:ring-2
            focus:ring-primary
            focus:border-primary
            transition
          "
        />

        <button
          type="submit"
          className="
            px-5
            py-3
            rounded-full
            bg-primary
            text-primary-foreground
            font-semibold
            shadow-sm
            hover:bg-primary/90
            transition
          "
        >
          Search
        </button>
      </form>

      {/* Results */}
      {query && (
        <div className="mt-4 space-y-6 max-h-[60vh] overflow-y-auto px-2 sm:px-0">
          <Section
            title="Hotels & Resorts"
            items={filtered.hotels}
            type="hotel"
          />
          <Section
            title="Attractions"
            items={filtered.attractions}
            type="attraction"
          />
          <Section title="Agencies" items={filtered.agencies} type="agency" />

          {!filtered.hotels.length &&
            !filtered.attractions.length &&
            !filtered.agencies.length && (
              <div className="text-center text-muted-foreground py-4">
                No results found
              </div>
            )}
        </div>
      )}
    </div>
  );
}
