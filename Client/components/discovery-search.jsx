"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export function DiscoverySearch({ className, data = {} }) {
  const { hotels = [], attractions = [], agencies = [] } = data;
  const [query, setQuery] = useState("");
  const [filteredHotels, setFilteredHotels] = useState(hotels);
  const [filteredAttractions, setFilteredAttractions] = useState(attractions);
  const [filteredAgencies, setFilteredAgencies] = useState(agencies);

  const router = useRouter();

  useEffect(() => {
    if (!query) {
      setFilteredHotels(hotels);
      setFilteredAttractions(attractions);
      setFilteredAgencies(agencies);
      return;
    }

    const lower = query.toLowerCase();

    setFilteredHotels(
      hotels.filter(
        (h) =>
          h.name.toLowerCase().includes(lower) ||
          h.type.toLowerCase().includes(lower),
      ),
    );

    setFilteredAttractions(
      attractions.filter(
        (a) =>
          a.name.toLowerCase().includes(lower) ||
          a.category.toLowerCase().includes(lower) ||
          a.location.toLowerCase().includes(lower),
      ),
    );

    setFilteredAgencies(
      agencies.filter(
        (ag) =>
          ag.name.toLowerCase().includes(lower) ||
          ag.category.toLowerCase().includes(lower),
      ),
    );
  }, [query, hotels, attractions, agencies]);

  const handleSubmit = (e) => {
    e.preventDefault();
    router.push(`/search?query=${encodeURIComponent(query)}`);
  };

  const renderCard = (item, type = "hotel") => (
    <div
      key={item.id}
      className="flex-shrink-0 min-w-[260px] sm:min-w-[280px] bg-card rounded-xl shadow-card overflow-hidden hover:shadow-lg transition"
    >
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

  const renderSection = (title, items, type) => {
    if (!items.length) return null;
    return (
      <div className="mb-6">
        <h4 className="font-semibold mb-2">{title}</h4>

        {/* Mobile horizontal scroll */}
        {/* Mobile horizontal scroll with partial peek */}
        <div className="md:hidden overflow-x-auto flex gap-4 snap-x snap-mandatory pb-4 px-2 -ml-2">
          {items.map((item) => (
            <div
              key={item.id}
              className="flex-shrink-0 min-w-[260px] sm:min-w-[280px] snap-start"
            >
              {renderCard(item, type)}
            </div>
          ))}
        </div>

        {/* Desktop grid */}
        <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-4 gap-4">
          {items.map((item) => renderCard(item, type))}
        </div>
      </div>
    );
  };

  return (
    <div className={`w-full ${className || ""}`}>
      <form onSubmit={handleSubmit} className="flex w-full gap-2">
        <input
          type="text"
          placeholder="Search hotels, attractions, agencies..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="flex-1 px-4 py-2 rounded-full border border-muted-foreground/30 focus:outline-none focus:ring-2 focus:ring-primary"
        />
        <button
          type="submit"
          className="px-4 py-2 bg-primary text-primary-foreground rounded-full font-semibold hover:bg-primary/90 transition"
        >
          Search
        </button>
      </form>

      {query && (
        <div className="mt-4 space-y-6 max-h-[60vh] overflow-y-auto px-2 sm:px-0">
          {renderSection("Hotels & Resorts", filteredHotels, "hotel")}
          {renderSection("Attractions", filteredAttractions, "attraction")}
          {renderSection("Agencies", filteredAgencies, "agency")}

          {!filteredHotels.length &&
            !filteredAttractions.length &&
            !filteredAgencies.length && (
              <div className="text-center text-muted-foreground py-4">
                No results found
              </div>
            )}
        </div>
      )}
    </div>
  );
}
