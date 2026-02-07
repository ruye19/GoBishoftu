"use client";

import { useState, useMemo, useEffect } from "react";
import { useSearchParams } from "next/navigation";

const accommodations = [
  {
    id: 1,
    name: "Bishoftu Luxury Resort",
    type: "Resort",
    rating: 4.8,
    pricePerNight: 250,
    image: "/lake bishoftu.jpg",
    description:
      "Premium resort with world-class amenities and stunning views of the Rift Valley.",
    amenities: ["Pool", "Spa", "WiFi", "Restaurant", "Gym"],
    bookingUrl: "https://www.booking.com",
  },
  {
    id: 2,
    name: "Kuriftu Resort & Spa",
    type: "Resort",
    rating: 4.6,
    pricePerNight: 180,
    image: "/kuriftu resort.jpg",
    description:
      "Eco-friendly lodge perfect for explorers seeking authentic experiences.",
    amenities: ["WiFi", "Restaurant", "Tour Desk", "Garden", "Parking"],
    bookingUrl: "https://www.booking.com",
  },
  {
    id: 3,
    name: "IVY hotel Ethiopia",
    type: "hotel",
    rating: 4.4,
    pricePerNight: 80,
    image: "/ivy.jpg",
    description: "Welcoming guest house with local charm and warm hospitality.",
    amenities: ["WiFi", "Breakfast", "Parking", "Garden"],
    bookingUrl: "https://www.booking.com",
  },
  {
    id: 4,
    name: "Gold mark Hotel",
    type: "Hotel",
    rating: 4.5,
    pricePerNight: 150,
    image: "/hotels one.jpg",
    description: "Modern hotel with convenient location and excellent service.",
    amenities: ["WiFi", "Restaurant", "Bar", "Parking", "Room Service"],
    bookingUrl: "https://www.booking.com",
  },
  {
    id: 5,
    name: "Pyramid Hotels & Resorts",
    type: "Resort",
    rating: 4.7,
    pricePerNight: 220,
    image: "/pyramid.jpg",
    description: "Serene resort overlooking the scenic lakes of Bishoftu.",
    amenities: ["Pool", "Lake Access", "Spa", "Restaurant", "WiFi"],
    bookingUrl: "https://www.booking.com",
  },
  {
    id: 6,
    name: "Budget Stay Inn",
    type: "Guest House",
    rating: 4.2,
    pricePerNight: 60,
    image: "/budget-friendly-accommodation.jpg",
    description: "Affordable and clean accommodation for budget travelers.",
    amenities: ["WiFi", "Breakfast", "Parking"],
    bookingUrl: "https://www.booking.com",
  },
  {
    id: 7,
    name: "Heritage Hotel",
    type: "Hotel",
    rating: 4.6,
    pricePerNight: 170,
    image: "/heritage-hotel-traditional.jpg",
    description:
      "Hotel blending modern comfort with traditional Ethiopian style.",
    amenities: ["Restaurant", "WiFi", "Parking", "Business Center"],
    bookingUrl: "https://www.booking.com",
  },
  {
    id: 8,
    name: "Mountain View Lodge",
    type: "Lodge",
    rating: 4.5,
    pricePerNight: 140,
    image: "/placeholder.svg?height=250&width=350",
    description:
      "Cozy lodge with breathtaking mountain views and hiking access.",
    amenities: ["Restaurant", "Tour Desk", "Parking", "WiFi"],
    bookingUrl: "https://www.booking.com",
  },
];

export default function AccommodationsClient() {
  const [selectedType, setSelectedType] = useState("All");
  const [priceRange, setPriceRange] = useState([0, 300]);
  const [minRating, setMinRating] = useState(0);
  const [showFilters, setShowFilters] = useState(false);

  const types = ["All", "Hotel", "Guest House", "Resort", "Lodge"];

  const searchParams = useSearchParams();

  useEffect(() => {
    const q = searchParams?.get("type");
    if (!q) return;
    const normalized = q.toLowerCase();
    if (normalized.includes("hotel")) setSelectedType("Hotel");
    else if (normalized.includes("lodge")) setSelectedType("Lodge");
    else if (normalized.includes("guest")) setSelectedType("Guest House");
    else if (normalized.includes("resort")) setSelectedType("Resort");
  }, [searchParams]);

  const filteredAccommodations = useMemo(() => {
    return accommodations.filter((acc) => {
      const typeMatch = selectedType === "All" || acc.type === selectedType;
      const priceMatch =
        acc.pricePerNight >= priceRange[0] &&
        acc.pricePerNight <= priceRange[1];
      const ratingMatch = acc.rating >= minRating;
      return typeMatch && priceMatch && ratingMatch;
    });
  }, [selectedType, priceRange, minRating]);

  const Filters = () => (
    <div className="space-y-6">
      {/* Type */}
      <div>
        <h4 className="font-semibold mb-2">Type</h4>
        {types.map((type) => (
          <button
            key={type}
            onClick={() => setSelectedType(type)}
            className={`block w-full text-left px-3 py-2 rounded-lg ${
              selectedType === type
                ? "bg-primary text-primary-foreground font-semibold"
                : "bg-muted hover:bg-muted/70"
            }`}
          >
            {type}
          </button>
        ))}
      </div>

      {/* Price */}
      <div>
        <h4 className="font-semibold mb-2">Price per Night</h4>
        <label className="text-sm">Min: ${priceRange[0]}</label>
        <input
          type="range"
          min="0"
          max="300"
          value={priceRange[0]}
          onChange={(e) => setPriceRange([+e.target.value, priceRange[1]])}
          className="w-full mb-2"
        />
        <label className="text-sm">Max: ${priceRange[1]}</label>
        <input
          type="range"
          min="0"
          max="300"
          value={priceRange[1]}
          onChange={(e) => setPriceRange([priceRange[0], +e.target.value])}
          className="w-full"
        />
      </div>

      {/* Rating */}
      <div>
        <h4 className="font-semibold mb-2">Minimum Rating</h4>
        {[0, 3.5, 4, 4.5].map((r) => (
          <button
            key={r}
            onClick={() => setMinRating(r)}
            className={`block w-full text-left px-3 py-2 rounded-lg mb-1 ${
              minRating === r
                ? "bg-primary text-primary-foreground font-semibold"
                : "bg-muted hover:bg-muted/70"
            }`}
          >
            {r === 0 ? "All Ratings" : `${r}+ Stars`}
          </button>
        ))}
      </div>
    </div>
  );

  return (
    <>
      <main>
        {/* Header */}
        <section className="bg-gradient-to-br from-primary/10 to-accent/5 py-12 md:py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Accommodations
            </h1>
            <p className="text-lg text-foreground/70">
              Find your perfect stay in Bishoftu with our curated selection.
            </p>
          </div>
        </section>

        {/* Mobile Filter Button */}
        <div className="md:hidden sticky top-0 z-20 bg-background border-b shadow-sm">
          <button
            onClick={() => setShowFilters(true)}
            className="w-full py-3 font-semibold text-primary hover:bg-primary/10 transition"
          >
            Filter Accommodations
          </button>
        </div>

        {/* Mobile Slide-Up Filters */}
        {showFilters && (
          <div className="fixed inset-0 z-30 bg-black/30 backdrop-blur-sm flex justify-end items-end">
            <div className="w-full sm:max-w-md bg-card rounded-t-2xl p-6 max-h-[85vh] overflow-y-auto animate-slideUp">
              <div className="flex justify-between items-center mb-6 sticky top-0 bg-card pt-4 pb-2 z-10">
                <h3 className="text-xl font-bold">Filters</h3>
                <button
                  onClick={() => setShowFilters(false)}
                  className="w-8 h-8 flex items-center justify-center rounded-full bg-muted hover:bg-muted/80 transition"
                >
                  ✕
                </button>
              </div>

              <Filters />

              <div className="mt-6 flex justify-end">
                <button
                  onClick={() => setShowFilters(false)}
                  className="px-6 py-2 bg-primary text-white rounded-full font-semibold hover:opacity-90 transition"
                >
                  Apply Filters
                </button>
              </div>
            </div>
          </div>
        )}

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Desktop Filters Sidebar */}
            <div className="hidden lg:block lg:col-span-1">
              <div className="bg-card rounded-xl p-6 shadow-md sticky top-24">
                <h3 className="text-xl font-bold mb-6">Filters</h3>
                <Filters />
              </div>
            </div>

            {/* Accommodations Grid */}
            <div className="lg:col-span-3">
              <div className="mb-6 flex justify-between items-center">
                <p className="text-foreground/70">
                  Showing {filteredAccommodations.length} accommodations
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {filteredAccommodations.map((acc) => (
                  <div
                    key={acc.id}
                    className="bg-card rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300"
                  >
                    <img
                      src={acc.image || "/placeholder.svg"}
                      alt={acc.name}
                      className="w-full h-48 object-cover"
                    />
                    <div className="p-6">
                      <div className="flex justify-between items-start mb-3">
                        <div>
                          <div className="text-sm font-semibold text-accent mb-1">
                            {acc.type}
                          </div>
                          <h3 className="text-lg font-bold">{acc.name}</h3>
                        </div>
                        <div className="flex items-center gap-1 bg-yellow-50 px-2 py-1 rounded">
                          <span className="text-yellow-500">★</span>
                          <span className="text-sm font-semibold">
                            {acc.rating}
                          </span>
                        </div>
                      </div>

                      <p className="text-sm text-foreground/70 mb-4">
                        {acc.description}
                      </p>

                      <div className="flex flex-wrap gap-2 mb-4">
                        {acc.amenities.map((a, i) => (
                          <span
                            key={i}
                            className="text-xs bg-accent/15 text-accent px-2 py-1 rounded-full"
                          >
                            {a}
                          </span>
                        ))}
                      </div>

                      <div className="flex justify-between items-center">
                        <div>
                          <span className="text-2xl font-bold text-primary">
                            ${acc.pricePerNight}
                          </span>
                          <span className="text-sm text-foreground/70">
                            /night
                          </span>
                        </div>
                        <a
                          href={acc.bookingUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="px-4 py-2 bg-[oklch(0.62_0.2_50)] text-white rounded-lg font-semibold hover:opacity-90 transition-all text-sm"
                        >
                          Book Now
                        </a>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {filteredAccommodations.length === 0 && (
                <div className="text-center py-12">
                  <p className="text-lg text-foreground/70">
                    No accommodations match your filters. Try adjusting your
                    criteria.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>

      {/* Slide-up animation */}
      <style jsx global>{`
        @keyframes slideUp {
          0% {
            transform: translateY(100%);
          }
          100% {
            transform: translateY(0);
          }
        }
        .animate-slideUp {
          animation: slideUp 0.3s ease-out forwards;
        }
      `}</style>
    </>
  );
}
