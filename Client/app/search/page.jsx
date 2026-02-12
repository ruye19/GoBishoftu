"use client";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { MapPin, ArrowRight } from "lucide-react";

// Hardcoded data (reuse from Home.jsx)
const hotels = [
  {
    id: 1,
    name: "Kuriftu Resort & Spa",
    type: "Resort",
    description: "Luxury resort with spa, swimming pools, and lakeside views.",
    image: "/kuriftu-resort.jpg",
    link: "/accommodations",
  },
  {
    id: 2,
    name: "Bishoftu Luxury Hotel",
    type: "Hotel",
    description: "Comfortable rooms with modern amenities in central Bishoftu.",
    image: "/luxury-hotel.jpg",
    link: "/accommodations",
  },
  {
    id: 3,
    name: "Lake Resort",
    type: "Resort",
    description: "Relaxing lakeside resort perfect for families and couples.",
    image: "/lake-resort.jpg",
    link: "/accommodations",
  },
  {
    id: 4,
    name: "Comfort Guest House",
    type: "Guest House",
    description: "Affordable and cozy stay with friendly staff and services.",
    image: "/comfort-guest-house.jpg",
    link: "/accommodations",
  },
];

const attractions = [
  {
    id: 1,
    name: "Lake Hora",
    category: "Lake",
    description: "Famous crater lake known for Irreecha and scenic views.",
    image: "/lakkk.jpg",
    location: "Bishoftu",
    rating: 4.8,
    link: "/explore",
  },
  {
    id: 2,
    name: "Lake Babogaya",
    category: "Lake",
    description: "Popular for resorts, boating, and relaxation.",
    image: "/lake babogaya.jpg",
    location: "Bishoftu",
    rating: 4.7,
    link: "/explore",
  },
  {
    id: 3,
    name: "Debre Zeit St. Gabriel Church",
    category: "Church",
    description: "Historic church overlooking Bishoftu lakes.",
    image: "/adadi-maryam-rock-church-ethiopia.jpg",
    location: "Bishoftu",
    rating: 4.6,
    link: "/explore",
  },
  {
    id: 4,
    name: "Local Market Cultural Tour",
    category: "Cultural Site",
    description: "Authentic Ethiopian market experience with local goods.",
    image: "/local-market-cultural-tour.jpg",
    location: "Bishoftu",
    rating: 4.5,
    link: "/explore",
  },
];

const featuredAgencies = [
  {
    id: 1,
    name: "Bishoftu Adventures",
    category: "Tour Operator",
    rating: 4.9,
    image: "/bishoftu-adventures.jpg",
    link: "/explore",
  },
  {
    id: 2,
    name: "Rift Valley Tours",
    category: "Travel Agency",
    rating: 4.7,
    image: "/rift-valley-tours.jpg",
    link: "/explore",
  },
  {
    id: 3,
    name: "Ethiopia Travel Experts",
    category: "Tour Operator",
    rating: 4.8,
    image: "/ethiopia-travel-experts.jpg",
    link: "/explore",
  },
];

export default function SearchPage() {
  const searchParams = useSearchParams();
  const query = searchParams.get("query")?.toLowerCase() || "";

  // Filter function
  const filterItems = (items, keys) =>
    items.filter((item) =>
      keys.some((key) => item[key]?.toLowerCase().includes(query)),
    );

  const filteredHotels = filterItems(hotels, ["name", "type", "description"]);
  const filteredAttractions = filterItems(attractions, [
    "name",
    "category",
    "description",
    "location",
  ]);
  const filteredAgencies = filterItems(featuredAgencies, ["name", "category"]);

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="font-display text-4xl font-bold mb-8">
        Search Results for "{query}"
      </h1>

      {/* Hotels */}
      {filteredHotels.length > 0 && (
        <section className="mb-12">
          <h2 className="font-display text-2xl font-semibold mb-4">
            Accommodations
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredHotels.map((hotel) => (
              <div
                key={hotel.id}
                className="bg-card rounded-xl overflow-hidden shadow-card hover-lift"
              >
                <img
                  src={hotel.image}
                  alt={hotel.name}
                  className="h-40 w-full object-cover"
                />
                <div className="p-4">
                  <div className="text-sm font-semibold text-primary mb-1">
                    {hotel.type}
                  </div>
                  <h3 className="text-lg font-bold mb-1">{hotel.name}</h3>
                  <p className="text-sm text-foreground/70">
                    {hotel.description}
                  </p>
                  <Link
                    href={hotel.link}
                    className="inline-flex items-center gap-1 mt-2 text-primary font-semibold hover:underline"
                  >
                    View <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Attractions */}
      {filteredAttractions.length > 0 && (
        <section className="mb-12">
          <h2 className="font-display text-2xl font-semibold mb-4">
            Attractions
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredAttractions.map((item) => (
              <div
                key={item.id}
                className="bg-card rounded-xl overflow-hidden shadow-card hover-lift"
              >
                <img
                  src={item.image}
                  alt={item.name}
                  className="h-48 w-full object-cover"
                />
                <div className="p-4">
                  <div className="flex justify-between text-sm text-muted-foreground mb-1">
                    <span className="flex items-center gap-1">
                      <MapPin className="w-4 h-4" /> {item.location}
                    </span>
                    <span className="text-accent">★ {item.rating}</span>
                  </div>
                  <h3 className="text-lg font-bold mb-1">{item.name}</h3>
                  <p className="text-sm text-foreground/70 mb-2">
                    {item.description}
                  </p>
                  <Link
                    href={item.link}
                    className="inline-flex items-center gap-1 text-primary font-semibold hover:underline"
                  >
                    Explore <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Agencies */}
      {filteredAgencies.length > 0 && (
        <section className="mb-12">
          <h2 className="font-display text-2xl font-semibold mb-4">
            Tour & Travel Agencies
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {filteredAgencies.map((agency) => (
              <div
                key={agency.id}
                className="bg-card rounded-xl overflow-hidden shadow-card hover-lift"
              >
                <img
                  src={agency.image}
                  alt={agency.name}
                  className="h-48 w-full object-cover"
                />
                <div className="p-4">
                  <div className="text-sm font-semibold text-accent mb-1">
                    {agency.category}
                  </div>
                  <h3 className="text-lg font-bold mb-1">{agency.name}</h3>
                  <Link
                    href={agency.link}
                    className="inline-block px-4 py-2 bg-primary/10 text-primary rounded-lg font-semibold hover:bg-primary hover:text-primary-foreground transition-all"
                  >
                    Visit Agency
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* No results */}
      {filteredHotels.length === 0 &&
        filteredAttractions.length === 0 &&
        filteredAgencies.length === 0 && (
          <p className="text-center text-lg text-muted-foreground mt-12">
            No results found for "{query}"
          </p>
        )}
    </main>
  );
}
