"use client";

import { useState } from "react";
import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";

const exploreItems = [
  {
    id: 1,
    name: "Adadi Maryam Church",
    category: "Cultural Site",
    description: "Ancient rock-hewn church carved from volcanic stone.",
    details:
      "One of Ethiopia's most sacred pilgrimage sites, dating back centuries. The intricate carvings and historical significance make this a must-visit for cultural enthusiasts.",
    image: "/adadi-maryam-rock-church-ethiopia.jpg",
    location: "South Bishoftu",
  },
  {
    id: 2,
    name: "Blue Nile Falls",
    category: "Natural Wonder",
    description: "Spectacular 45-meter waterfall with misty surroundings.",
    details:
      'Also known as "Tis Issat" or "Smoking Water" by locals, this majestic waterfall is a natural marvel. The best viewing is during the rainy season from July to September.',
    image: "/blue-nile-falls-waterfall-ethiopia.jpg",
    location: "East of Bishoftu",
  },
  {
    id: 3,
    name: "Debre Zeleke Falls",
    category: "Natural Wonder",
    description: "Serene waterfall surrounded by lush vegetation.",
    details:
      "A hidden gem perfect for adventurers seeking off-the-beaten-path experiences. Great for photography and swimming in the natural pools.",
    image: "/DebreZelekeFalls.jpg",
    location: "North Bishoftu",
  },
  {
    id: 4,
    name: "Bishoftu Hot Springs Spa",
    category: "Natural Wonder",
    description: "Natural geothermal springs for relaxation and wellness.",
    details:
      "Immerse yourself in the therapeutic hot springs rich in minerals. Perfect for wellness retreats and spa treatments in a natural setting.",
    image: "/BishoftuHotSpringsSpa.jpg",
    location: "Central Bishoftu",
  },
  {
    id: 5,
    name: "Mount Ziquala Hike",
    category: "Natural Wonder",
    description: "Challenging mountain trek with panoramic Rift Valley views.",
    details:
      "A rewarding hike for adventure seekers with breathtaking views at the summit. Guides are recommended for safety and cultural insights.",
    image: "/MountZiqualaHike.jpg",
    location: "West of Bishoftu",
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

export default function ExplorePage() {
  const [selectedCategory, setSelectedCategory] = useState("All");

  const categories = ["All", "Cultural Site", "Natural Wonder", "Travel Agent"];

  const filteredItems =
    selectedCategory === "All"
      ? exploreItems
      : exploreItems.filter((item) => item.category === selectedCategory);

  const travelAgents = exploreItems.filter(
    (item) => item.category === "Travel Agent"
  );

  return (
    <>
      <Navigation />
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
              <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                  Connect with Local Experts
                </h2>
                <p className="text-lg text-foreground/70 max-w-2xl mx-auto">
                  Our featured travel agents offer personalized experiences
                  tailored to your interests. From cultural immersion to
                  adventure expeditions, they'll make your Bishoftu journey
                  unforgettable.
                </p>
              </div>

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
      </main>
      <Footer />
    </>
  );
}
