"use client";
import { Button } from "@/components/ui/button";
import attractions from "@/data/attractions"; // your JSON with travel agents included
import { useLanguage } from "@/app/context/LanguageContext";
import { Compass, Users, Shield, Clock } from "lucide-react";
import { useState } from "react";
import { t } from "@/locales";

export default function ExplorePage() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const { lang } = useLanguage();

  // Benefits data - using translations
  const benefits = [
    {
      icon: Compass,
      title: t('benefits.expertGuidance.title', lang),
      description: t('benefits.expertGuidance.description', lang),
    },
    {
      icon: Users,
      title: t('benefits.localConnections.title', lang),
      description: t('benefits.localConnections.description', lang),
    },
    {
      icon: Shield,
      title: t('benefits.trustedReviews.title', lang),
      description: t('benefits.trustedReviews.description', lang),
    },
    {
      icon: Clock,
      title: t('benefits.saveTime.title', lang),
      description: t('benefits.saveTime.description', lang),
    },
  ];

  // Categories from JSON, including Travel Agents
  const categories = [
    "All",
    ...Array.from(
      new Set(attractions.map((item) => item.type.translations[lang])),
    ),
  ];

  // Filter items by selected category
  const filteredItems =
    selectedCategory === "All"
      ? attractions
      : attractions.filter(
          (item) => item.type.translations[lang] === selectedCategory,
        );

  // Separate Travel Agents for the CTA section
  const travelAgents = attractions.filter(
    (item) => item.type.translations[lang] === "Travel Agent",
  );

  return (
    <>
      <main>
        {/* Header */}
        <section className="bg-gradient-to-br from-secondary/10 to-accent/5 py-12 md:py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h1 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-4">
              {t('exploreBishoftu', lang)}
            </h1>
            <p className="font-body text-lg text-foreground/70">
              {t('exploreBishoftuText', lang)}
            </p>
          </div>
        </section>

        {/* Category Filter */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="mb-12 flex flex-wrap gap-3">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-6 py-2 rounded-lg font-semibold transition-all ${
                  selectedCategory === category
                    ? "bg-primary text-primary-foreground shadow-soft"
                    : "bg-card border border-border text-foreground hover:border-primary"
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          {/* Items Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredItems
              .filter((item) => item.type.translations[lang] !== "Travel Agent") // show only attractions here
              .map((item) => (
                <div
                  key={item.id}
                  className="bg-card rounded-xl overflow-hidden shadow-card hover-lift"
                >
                  <img
                    src={encodeURI(item.image || "/placeholder.svg")}
                    alt={item.translations[lang].name}
                    onError={(e) => {
                      e.currentTarget.onerror = null;
                      e.currentTarget.src = "/placeholder.jpg";
                    }}
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-3">
                      <div
                        className={`text-xs font-bold px-3 py-1 rounded-full ${
                          item.type.translations[lang] === "Cultural Site"
                            ? "bg-accent/20 text-accent"
                            : item.type.translations[lang] === "Natural Wonder"
                              ? "bg-secondary/20 text-secondary"
                              : "bg-primary/20 text-primary"
                        }`}
                      >
                        {item.type.translations[lang]}
                      </div>
                    </div>
                    <h3 className="text-xl font-bold text-foreground mb-2">
                      {item.translations[lang].name}
                    </h3>
                    <p className="text-sm text-foreground/70 mb-3">
                      {item.translations[lang].description}
                    </p>
                    {item.translations[lang].details && (
                      <p className="text-sm text-foreground/60 mb-4 leading-relaxed">
                        {item.translations[lang].details}
                      </p>
                    )}
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
                  {t('needHelp', lang)}
                </h2>
                <p className="text-lg text-primary-foreground/80 mb-8">
                  {t('needHelpText', lang)}
                </p>
                <Button
                  size="lg"
                  className="bg-secondary text-secondary-foreground hover:bg-secondary/90"
                >
                  {t('contactGuide', lang)}
                </Button>
              </div>

              <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
                {travelAgents.map((agent) => (
                  <div
                    key={agent.id}
                    className="bg-card rounded-xl p-6 shadow-card hover-lift"
                  >
                    <img
                      src={encodeURI(agent.image || "/placeholder.svg")}
                      alt={agent.translations[lang].name}
                      onError={(e) => {
                        e.currentTarget.onerror = null;
                        e.currentTarget.src = "/placeholder.jpg";
                      }}
                      className="w-full h-40 object-cover rounded-lg mb-4"
                    />
                    <h3 className="text-lg font-bold text-foreground mb-2">
                      {agent.translations[lang].name}
                    </h3>
                    {agent.translations[lang].details && (
                      <p className="text-sm text-foreground/70 mb-4">
                        {agent.translations[lang].details}
                      </p>
                    )}
                    {agent.contact && (
                      <a
                        href={`mailto:${agent.contact}`}
                        className="btn-cta text-sm py-2 px-4 inline-block"
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
              <h2 className="font-display text-3xl md:text-4xl font-bold mb-4">
                {t('whyExplore', lang)}
              </h2>
              <p className="text-primary-foreground/80 max-w-2xl mx-auto">
                {t('whyExploreText', lang)}
              </p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {benefits.map((benefit) => (
                <div key={benefit.title} className="text-center">
                  <div className="w-16 h-16 rounded-full bg-primary-foreground/10 flex items-center justify-center mx-auto mb-4">
                    <benefit.icon className="w-8 h-8" />
                  </div>
                  <h3 className="font-display text-xl font-semibold mb-2">
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
