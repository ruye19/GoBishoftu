"use client";
import { Button } from "@/components/ui/button";
import {
  MapPin,
  ArrowRight,
  Compass,
  Camera,
  TreePine,
  Mountain,
  UtensilsCrossed,
  Users,
  Shield,
  Clock,
} from "lucide-react";
import { useState } from "react";

const exploreItems = [
  {
    id: 1,
    name: "Lake Hora",
    category: "Natural Wonder",
    description: "Crater lake surrounded by resorts and cultural sites.",
    details:
      "Lake Hora is one of the most famous lakes in Bishoftu. It is a volcanic crater lake located near the town center and is surrounded by resorts and cultural centers. The lake is also known for hosting annual cultural and religious events (Irreecha).",
    image: "lakkk.jpg", // real photo
    location: "Central Bishoftu",
  },
  {
    id: 2,
    name: "Lake Babogaya",
    category: "Natural Wonder",
    description: "Peaceful freshwater lake ideal for relaxation.",
    details:
      "Lake Babogaya is nearly the same size as Lake Hora and is known for its scenic beauty and surrounding vegetation. It’s also a lovely place for birdwatching and sunset views. :contentReference[oaicite:6]{index=6}",
    image: "lake babogaya.jpg", // scenic lake view
    location: "North Bishoftu",
  },
  {
    id: 3,
    name: "Lake Kuriftu",
    category: "Natural Wonder",
    description: "Luxury lakeside destination with resort facilities.",
    details:
      "Kuriftu Lake is home to Kuriftu Resort & Spa, a well-known resort in the region. The area blends natural beauty with leisure activities and is a popular stop for visitors. :contentReference[oaicite:8]{index=8}",
    image: "lake bishe.jpg", // general crater lake view; match similar lakes
    location: "East Bishoftu",
  },
  {
    id: 4,
    name: "Lake Bishoftu (Arsedi)",
    category: "Natural Wonder",
    description: "Historic crater lake with cultural significance.",
    details:
      "Also known as Lake Arsedi, this lake features steep crater surroundings and scenic views from the rim. Spirits like swimming and hiking are popular here. :contentReference[oaicite:10]{index=10}",
    image: "arsedi.jpg", // scenic water view
    location: "South Bishoftu",
  },
  {
    id: 5,
    name: "Lake Chelekleka",
    category: "Natural Wonder",
    description: "Seasonal wetland famous for migratory birds.",
    details:
      "Lake Chelekleka is a shallow seasonal lake west of the town. It’s a good spot for birdwatching — including flamingos, pelicans, and other waterfowl — especially in the wetter months. :contentReference[oaicite:12]{index=12}",
    image: "chelaleka.jpg", // representative lake/wetland view
    location: "West Bishoftu",
  },

  {
    id: 6,
    name: "Local Market Cultural Tour",
    category: "Cultural Site",
    description: "Authentic Ethiopian market experience with local goods.",
    details:
      "Explore traditional crafts, local products, and authentic Ethiopian culture. Interact with local artisans and learn about traditional practices.",
    image: "/local-market-cultural-tour.jpg",
    location: "Bishoftu Town Center",
  },
  {
    id: 7,
    name: "Bishoftu Tour Guides Association",
    category: "Travel Agent",
    description:
      "Professional local guides for authentic Bishoftu experiences.",
    details:
      "Experienced guides offering personalized tours including cultural immersion, adventure hikes, and historical site visits. Available in multiple languages.",
    image: "/bishoftu-adventures.jpg",
    contact: "guides@gobisoftu.local",
    location: "Bishoftu",
  },
  {
    id: 8,
    name: "Ethiopia Adventure Travel Co.",
    category: "Travel Agent",
    description: "Specialized adventure tour operator for Bishoftu region.",
    details:
      "Offering customized tour packages including mountain expeditions, cultural tours, and luxury experiences. Multi-day packages available.",
    image: "/EthiopiaAdventureTravelCo.jpg",
    contact: "info@ethiopiaadventure.com",
    location: "Bishoftu",
  },
  {
    id: 9,
    name: "Heritage Experiences",
    category: "Travel Agent",
    description: "Cultural and historical guided tours throughout Bishoftu.",
    details:
      "Deep dives into Ethiopian heritage, ancient history, and local traditions. Expert historians and cultural consultants lead all tours.",
    image: "/heritage-hotel-traditional.jpg",
    contact: "heritage@gobisoftu.travel",
    location: "Bishoftu",
  },
];
// Benefits data
const benefits = [
  {
    icon: Compass,
    title: "Expert Guidance",
    description:
      "Our curated guides help you discover hidden gems and local favorites.",
  },
  {
    icon: Users,
    title: "Local Connections",
    description:
      "Connect with verified local guides and authentic experiences.",
  },
  {
    icon: Shield,
    title: "Trusted Reviews",
    description:
      "Read genuine reviews from real visitors to make informed decisions.",
  },
  {
    icon: Clock,
    title: "Save Time",
    description:
      "Find exactly what you're looking for with our smart categorization.",
  },
];

export default function ExplorePage() {
  const [selectedCategory, setSelectedCategory] = useState("All");

  const categories = ["All", "Cultural Site", "Natural Wonder", "Travel Agent"];

  const filteredItems =
    selectedCategory === "All"
      ? exploreItems
      : exploreItems.filter((item) => item.category === selectedCategory);

  const travelAgents = exploreItems.filter(
    (item) => item.category === "Travel Agent",
  );

  return (
    <>
      <main>
        {/* Header */}
        <section className="bg-gradient-to-br from-secondary/10 to-accent/5 py-12 md:py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
              Explore Bishoftu
            </h1>
            <p className="text-lg text-foreground/70">
              Discover cultural heritage, natural wonders, and connect with
              experienced travel professionals.
            </p>
          </div>
        </section>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Category Filter */}
          <div className="mb-12 flex flex-wrap gap-3">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-6 py-2 rounded-lg font-semibold transition-all ${
                  selectedCategory === category
                    ? "bg-primary text-primary-foreground shadow-lg"
                    : "bg-card border border-border text-foreground hover:border-primary"
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          {/* Items Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredItems.map((item) => (
              <div
                key={item.id}
                className="bg-card rounded-xl overflow-hidden shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
              >
                <img
                  src={item.image || "/placeholder.svg"}
                  alt={item.name}
                  className="w-full h-48 object-cover"
                />
                <div className="p-6">
                  <div className="flex items-center justify-between mb-3">
                    <div
                      className={`text-xs font-bold px-3 py-1 rounded-full ${
                        item.category === "Cultural Site"
                          ? "bg-accent/20 text-accent"
                          : item.category === "Natural Wonder"
                            ? "bg-secondary/20 text-secondary"
                            : "bg-primary/20 text-primary"
                      }`}
                    >
                      {item.category}
                    </div>
                  </div>
                  <h3 className="text-xl font-bold text-foreground mb-2">
                    {item.name}
                  </h3>
                  <p className="text-sm text-foreground/70 mb-3">
                    {item.description}
                  </p>
                  <p className="text-sm text-foreground/60 mb-4 leading-relaxed">
                    {item.details}
                  </p>
                  {item.location && (
                    <div className="text-xs text-foreground/60 mb-2">
                      📍 {item.location}
                    </div>
                  )}
                  {item.contact && (
                    <div className="text-xs text-foreground/60 mb-2">
                      📧 {item.contact}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Travel Agents CTA Section */}
        {(selectedCategory === "All" ||
          selectedCategory === "Travel Agent") && (
          <section className="bg-primary/10 py-12 md:py-16">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center max-w-3xl mx-auto">
                <h2 className="font-display text-3xl md:text-4xl font-bold mb-4">
                  Need Help Planning Your Visit?
                </h2>
                <p className="text-lg text-primary-foreground/80 mb-8">
                  Our local guides can help you create the perfect itinerary to
                  experience the best of Bishoftu's attractions.
                </p>
                <Button
                  size="lg"
                  className="bg-secondary text-secondary-foreground hover:bg-secondary/90"
                >
                  Contact a Local Guide
                </Button>
              </div>
              <div className="mt-12"></div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {travelAgents.map((agent) => (
                  <div
                    key={agent.id}
                    className="bg-card rounded-xl p-6 shadow-md hover:shadow-xl transition-all"
                  >
                    <img
                      src={agent.image || "/placeholder.svg"}
                      alt={agent.name}
                      className="w-full h-40 object-cover rounded-lg mb-4"
                    />
                    <h3 className="text-lg font-bold text-foreground mb-2">
                      {agent.name}
                    </h3>
                    <p className="text-sm text-foreground/70 mb-4">
                      {agent.details}
                    </p>
                    {agent.contact && (
                      <a
                        href={`mailto:${agent.contact}`}
                        className="inline-block px-4 py-2 bg-primary text-primary-foreground rounded-lg font-semibold hover:opacity-90 transition-all text-sm"
                      >
                        Contact Agent
                      </a>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}
        {/* Benefits Section */}
        <section className="section-padding bg-primary text-primary-foreground">
          <div className="h-16"></div>
          <div className="container-custom px-4">
            <div className="text-center mb-12">
              <h2 className="font-serif text-3xl md:text-4xl font-bold mb-4">
                Why Explore With Us?
              </h2>
              <p className="text-primary-foreground/80 max-w-2xl mx-auto">
                Go Bishoftu is your trusted companion for discovering the best
                of this beautiful region.
              </p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {benefits.map((benefit) => (
                <div key={benefit.title} className="text-center">
                  <div className="w-16 h-16 rounded-full bg-primary-foreground/10 flex items-center justify-center mx-auto mb-4">
                    <benefit.icon className="w-8 h-8" />
                  </div>
                  <h3 className="font-serif text-xl font-semibold mb-2">
                    {benefit.title}
                  </h3>
                  <p className="text-primary-foreground/70">
                    {benefit.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
          <div className="h-16"></div>
        </section>
      </main>
    </>
  );
}
