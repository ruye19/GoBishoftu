"use client";
import { useState, useMemo } from "react";
import Link from "next/link";
import landscapeimage from "../public/image.png";
import { DiscoverySearch } from "@/components/discovery-search";
import {
  MapPin,
  Star,
  ArrowRight,
  Building2,
  Home as HomeIcon,
  Hotel,
  TentTree,
  Building,
  Shield,
  Heart,
  DollarSign,
  Award,
  CheckCircle,
} from "lucide-react";

export default function Home() {
  const hotels = [
    {
      id: 1,
      name: "Kuriftu Resort & Spa",
      type: "Resort",
      description:
        "Luxury resort with spa, swimming pools, and lakeside views.",
      image: "/kuriftu-resort.jpg",
      link: "/accommodations",
    },
    {
      id: 2,
      name: "Bishoftu Luxury Hotel",
      type: "Hotel",
      description:
        "Comfortable rooms with modern amenities in central Bishoftu.",
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

  const attractions = [
    {
      id: 1,
      name: "Lake Hora",
      category: "Lake",
      description: "Famous crater lake known for Irreecha and scenic views.",
      image: "lakkk.jpg",
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
      image: "adadi-maryam-rock-church-ethiopia.jpg",
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

  // accommodation type data
  const accommodationTypes = [
    {
      name: "Hotels",
      value: "hotel",
      icon: Hotel,
      description: "Full-service hotels with modern amenities",
      count: 15,
      color: "bg-primary/10 text-primary",
    },
    {
      name: "Lodges",
      value: "lodge",
      icon: Building2,
      description: "Nature lodges with scenic lake views",
      count: 12,
      color: "bg-secondary/10 text-secondary",
    },
    {
      name: "Guest House",
      value: "guest-house",
      icon: HomeIcon,
      description: "Cozy stays with local hospitality",
      count: 28,
      color: "bg-accent/10 text-accent-foreground",
    },
    {
      name: "Resort",
      value: "Resort",
      icon: TentTree,
      description: "Luxury resorts with spa and recreational facilities",
      count: 18,
      color: "bg-primary/10 text-primary",
    },
  ];
  const [searchQuery, setSearchQuery] = useState("");
  const normalizedQuery = searchQuery.toLowerCase();

  const filteredHotels = hotels.filter(
    (hotel) =>
      hotel.name.toLowerCase().includes(normalizedQuery) ||
      hotel.type.toLowerCase().includes(normalizedQuery) ||
      hotel.description.toLowerCase().includes(normalizedQuery),
  );

  const filteredAttractions = attractions.filter(
    (item) =>
      item.name.toLowerCase().includes(normalizedQuery) ||
      item.category.toLowerCase().includes(normalizedQuery) ||
      item.description.toLowerCase().includes(normalizedQuery),
  );

  const filteredAgencies = featuredAgencies.filter(
    (agency) =>
      agency.name.toLowerCase().includes(normalizedQuery) ||
      agency.category.toLowerCase().includes(normalizedQuery),
  );

  return (
    <>
      <main>
        {/* Hero Section — discovery-focused, like About hero */}
        <section className="relative min-h-[65vh] flex items-center justify-center pt-20">
          <div className="absolute inset-0">
            <img
              src={landscapeimage.src}
              alt="Bishoftu landscape"
              className="h-full w-full object-cover"
            />
            <div className="absolute inset-0 overlay-hero" />
          </div>
          <div className="relative z-10 px-4">
            <div className="mx-auto flex max-w-3xl flex-col items-center text-center gap-6">
              <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-primary-foreground leading-tight">
                Discover the Soul of Ethiopia/Bishoftu
              </h1>
              {/* <p className="text-base md:text-lg text-primary-foreground/90 max-w-2xl">
                Experience the breathtaking beauty of volcanic crater lakes,
                rich Oromo heritage, and warm Ethiopian hospitality—just 47km
                from Addis Ababa.
              </p> */}

              {/* Discovery Search – lightweight exploration search */}
              <DiscoverySearch
                className="mt-2"
                value={searchQuery}
                onChange={(value) => setSearchQuery(value)}
              />
            </div>
          </div>
        </section>

        {/* No Results Message */}
        {searchQuery &&
          filteredHotels.length === 0 &&
          filteredAttractions.length === 0 &&
          filteredAgencies.length === 0 && (
            <div className="text-center py-16 text-muted-foreground">
              No results found for "{searchQuery}"
            </div>
          )}

        {/* Featured Places */}
        <section className="py-12 md:py-24 bg-background">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
                Hotels & Resorts
              </h2>
              <p className="font-body text-lg text-foreground/70">
                Top places to stay for a comfortable Bishoftu experience
              </p>
            </div>

            {/* Accommodation Type Nav (single-line, navbar-style) */}
            <section className="section-padding bg-background">
              <div className="container-custom px-4 py-4">
                <div className="overflow-x-auto">
                  <nav className="flex items-center gap-3 md:gap-6 whitespace-nowrap">
                    {accommodationTypes.map((type) => (
                      <Link
                        key={type.name}
                        href={`/accommodations?type=${type.value}`}
                        className="flex-shrink-0"
                      >
                        <div
                          className="
                                    w-full
                                    px-5 py-3
                                    rounded-full
                                    text-center
                                    bg-card
                                    hover:bg-primary/5
                                    transition
                                    font-medium
                                    text-foreground
                                  "
                        >
                          {type.name}
                        </div>
                      </Link>
                    ))}
                  </nav>
                </div>
              </div>
            </section>

            {/* Mobile: horizontal scrollable list */}
            <div className="md:hidden -mx-4 py-4 px-4">
              <div className="flex gap-4 overflow-x-auto snap-x snap-mandatory pb-4 scrollbar-hide">
                {filteredHotels.map((hotel) => (
                  <div
                    key={hotel.id}
                    className="flex-shrink-0 w-[300px] snap-start"
                  >
                    <div className="bg-card rounded-xl overflow-hidden shadow-card hover-lift">
                      <img
                        src={hotel.image || "/placeholder.svg"}
                        alt={hotel.name}
                        className="w-full h-40 object-cover"
                      />
                      <div className="p-6">
                        <div className="text-sm font-semibold text-primary mb-2">
                          {hotel.type}
                        </div>
                        <h3 className="text-xl font-bold text-foreground mb-2">
                          {hotel.name}
                        </h3>
                        <p className="text-sm text-foreground/70 leading-relaxed">
                          {hotel.description}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Desktop: grid layout */}
            <div className="hidden md:grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {filteredHotels.map((hotel) => (
                <div
                  key={hotel.id}
                  className="bg-card rounded-xl overflow-hidden shadow-card hover-lift"
                >
                  <img
                    src={hotel.image || "/placeholder.svg"}
                    alt={hotel.name}
                    className="w-full h-40 object-cover"
                  />
                  <div className="p-6">
                    <div className="text-sm font-semibold text-primary mb-2">
                      {hotel.type}
                    </div>
                    <h3 className="text-xl font-bold text-foreground mb-2">
                      {hotel.name}
                    </h3>
                    <p className="text-sm text-foreground/70 leading-relaxed">
                      {hotel.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <div className="text-center my-2">
          <Link href="/accommodations" className="btn-cta my-3 inline-block">
            Explore All Accommodations
          </Link>
        </div>

        {/* Featured Attraction */}
        {/* Attractions */}
        <section className="py-5 bg-background">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-10">
              <h2 className="font-display text-3xl font-bold text-foreground mb-2">
                Top Attractions
              </h2>
              <p className="font-body text-foreground/70">
                Explore Bishoftu’s lakes, culture, and natural beauty
              </p>
            </div>

            {/* ✅ Mobile: horizontal scroll */}
            <div className="md:hidden -mx-4 px-4">
              <div className="flex gap-4 overflow-x-auto snap-x snap-mandatory pb-4 scrollbar-hide">
                {filteredAttractions.map((item) => (
                  <div
                    key={item.id}
                    tabIndex={0}
                    className="min-w-[260px] snap-start bg-card rounded-xl overflow-hidden shadow-card hover-lift focus-within:ring-2 focus-within:ring-primary focus-within:ring-offset-2"
                  >
                    <img
                      src={item.image}
                      alt={item.name}
                      className="h-40 w-full object-cover"
                    />
                    <div className="p-4">
                      <div className="flex justify-between text-sm text-muted-foreground mb-1">
                        <span>{item.location}</span>
                        <span className="text-accent">★ {item.rating}</span>
                      </div>
                      <h3 className="font-bold text-lg mb-2">{item.name}</h3>
                      <p className="text-sm text-foreground/70 mb-3">
                        {item.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* ✅ Desktop: grid */}
            <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-3 gap-6">
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
                  <div className="p-6">
                    <div className="flex justify-between text-sm text-muted-foreground mb-2">
                      <span className="flex items-center gap-1">
                        <MapPin className="w-4 h-4" /> {item.location}
                      </span>
                      <span className="text-accent">★ {item.rating}</span>
                    </div>
                    <h3 className="text-xl font-bold mb-3">{item.name}</h3>
                    <p className="text-sm text-foreground/70 mb-4">
                      {item.description}
                    </p>
                    <Link
                      href={item.link}
                      className="inline-flex items-center gap-2 text-primary font-semibold hover:underline"
                    >
                      Explore <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                </div>
              ))}
            </div>

            <div className="text-center mt-10">
              <Link href="/explore" className="btn-cta inline-block">
                View All Attractions
              </Link>
            </div>
          </div>
        </section>

        {/* top tour and travel agencies card */}
        <section className="py-8 md:py-12 bg-secondary/30">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
                Top Tour & Travel Agencies
              </h2>
              <p className="font-body text-lg text-foreground/70">
                Reliable agencies to plan your perfect Bishoftu experience
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {filteredAgencies.map((agency) => (
                <div
                  key={agency.id}
                  className="bg-card rounded-xl overflow-hidden shadow-card hover-lift"
                >
                  <img
                    src={agency.image || "/placeholder.svg"}
                    alt={agency.name}
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-6">
                    <div className="flex justify-between items-start mb-3">
                      <div className="text-sm font-semibold text-accent">
                        {agency.category}
                      </div>
                      <div className="flex items-center gap-1">
                        <span className="text-accent">★</span>
                        <span className="text-sm font-semibold text-foreground">
                          {agency.rating}
                        </span>
                      </div>
                    </div>
                    <h3 className="text-xl font-bold text-foreground mb-4">
                      {agency.name}
                    </h3>
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
          </div>
        </section>

        {/* About Us Section */}
        <section className="py-8 flex items-center justify-center bg-background/">
          <div className="max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
              About Us
            </h2>
            <p className="font-body text-lg text-foreground/70 leading-relaxed">
              Discover the heart of Ethiopia's lake city, where volcanic wonders
              meet rich Oromo heritage and boundless opportunities.
            </p>
            <div className="mt-6">
              <Link
                href="/about"
                className="text-primary font-semibold hover:underline"
              >
                See more →
              </Link>
            </div>
          </div>
        </section>
        {/* </div>
        </section> */}
      </main>
    </>
  );
}
