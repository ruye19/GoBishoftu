"use client";
import { Button } from "@/components/ui/button";
import attractions from "@/data/attractions"; // your JSON with travel agents included
import { useLanguage } from "@/app/context/LanguageContext";
import {
  Compass,
  Users,
  Shield,
  Clock,
  MapPin,
  Star,
  Heart,
  CheckCircle,
  ArrowRight,
} from "lucide-react";
import { useState, useEffect } from "react";
import { t } from "@/locales";
import { SkeletonAttraction } from "@/components/SkeletonAttraction";

export default function ExplorePage() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [isLoading, setIsLoading] = useState(true);
  const { lang } = useLanguage();

  // Simulate loading completion
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000); // 1 second loading simulation

    return () => clearTimeout(timer);
  }, []);

  // Benefits data - using translations
  const benefits = [
    {
      icon: Compass,
      title: t("benefits.expertGuidance.title", lang),
      description: t("benefits.expertGuidance.description", lang),
    },
    {
      icon: Users,
      title: t("benefits.localConnections.title", lang),
      description: t("benefits.localConnections.description", lang),
    },
    {
      icon: Shield,
      title: t("benefits.trustedReviews.title", lang),
      description: t("benefits.trustedReviews.description", lang),
    },
    {
      icon: Clock,
      title: t("benefits.saveTime.title", lang),
      description: t("benefits.saveTime.description", lang),
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
        {/* Compact Header */}
        <section className="bg-muted/30 py-8 border-b">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div>
                <h1 className="text-2xl md:text-3xl font-bold text-foreground mb-2">
                  {t("exploreBishoftu", lang)}
                </h1>
                <p className="text-muted-foreground max-w-2xl">
                  {t("exploreBishoftuText", lang)}
                </p>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                <span>
                  {
                    filteredItems.filter(
                      (item) => item.type.translations[lang] !== "Travel Agent",
                    ).length
                  }{" "}
                  {t("attractions", lang) || "attractions"}
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* Category Filter */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div
            className="mb-12 flex flex-wrap gap-3 animate-fade-up"
            style={{ animationDelay: "0.3s" }}
          >
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-6 py-2.5 rounded-xl font-semibold transition-all duration-200 border cursor-pointer ${
                  selectedCategory === category
                    ? "bg-primary text-primary-foreground border-primary shadow-md hover:shadow-lg"
                    : "bg-card text-foreground border-border shadow-sm hover:border-primary hover:bg-muted/50"
                }`}
              >
                {category === "All" ? t("all", lang) || "All" : category}
              </button>
            ))}
          </div>

          {/* Items Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {isLoading ? (
              // Skeleton loaders during loading
              <>
                <SkeletonAttraction />
                <SkeletonAttraction />
                <SkeletonAttraction />
                <SkeletonAttraction />
                <SkeletonAttraction />
                <SkeletonAttraction />
              </>
            ) : (
              // Actual content
              filteredItems
                .filter(
                  (item) => item.type.translations[lang] !== "Travel Agent",
                ) // show only attractions here
                .map((item, index) => (
                  <div
                    key={item.id}
                    className="bg-card rounded-xl overflow-hidden shadow-card hover-lift animate-fade-up"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <div className="relative overflow-hidden group">
                      <img
                        src={encodeURI(item.image || "/placeholder.svg")}
                        alt={item.translations[lang].name}
                        onError={(e) => {
                          e.currentTarget.onerror = null;
                          e.currentTarget.src = "/placeholder.jpg";
                        }}
                        className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                      {/* Featured Badge */}
                      <div className="absolute top-3 right-3">
                        <div className="px-2 py-1 bg-gradient-gold text-white text-xs rounded-full font-medium shadow-gold">
                          {t("featured", lang) || "Featured"}
                        </div>
                      </div>

                      {/* Status Indicator */}
                      <div className="absolute top-3 left-3">
                        <div className="flex items-center gap-1 px-2 py-1 bg-green-500/90 text-white text-xs rounded-full font-medium">
                          <div className="w-1.5 h-1.5 bg-white rounded-full animate-pulse" />
                          {t("open", lang) || "Open"}
                        </div>
                      </div>
                    </div>

                    <div className="p-6">
                      <div className="flex justify-between items-start mb-3">
                        <div className="flex-1">
                          <div
                            className={`text-xs font-bold px-3 py-1 rounded-full mb-2 inline-block ${
                              item.type.translations[lang] === "Cultural Site"
                                ? "bg-accent/20 text-accent"
                                : item.type.translations[lang] ===
                                    "Natural Wonder"
                                  ? "bg-secondary/20 text-secondary"
                                  : "bg-primary/20 text-primary"
                            }`}
                          >
                            {item.type.translations[lang]}
                          </div>
                          <h3 className="text-xl font-bold text-foreground mb-2 leading-tight">
                            {item.translations[lang].name}
                          </h3>
                          {item.location && (
                            <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                              <MapPin className="w-3 h-3" />
                              <span>{item.location}</span>
                            </div>
                          )}
                        </div>

                        <div className="flex flex-col items-end gap-2">
                          {item.rating && (
                            <div className="flex items-center gap-1 bg-accent/15 px-3 py-1.5 rounded-full">
                              <Star className="w-4 h-4 text-accent" />
                              <span className="text-accent font-semibold">
                                {item.rating}
                              </span>
                            </div>
                          )}

                          {/* Quick Actions */}
                          <div className="flex gap-1">
                            <button className="p-2 bg-muted/50 rounded-lg hover:bg-muted transition-colors">
                              <Heart className="w-4 h-4 text-muted-foreground" />
                            </button>
                          </div>
                        </div>
                      </div>

                      <p className="text-sm text-foreground/60 mb-4 leading-relaxed line-clamp-3">
                        {item.translations[lang].description}
                      </p>

                      {item.translations[lang].details && (
                        <p className="text-sm text-foreground/50 mb-4 leading-relaxed line-clamp-2">
                          {item.translations[lang].details}
                        </p>
                      )}

                      {item.contact && (
                        <div className="text-xs text-muted-foreground mb-4">
                          � {item.contact}
                        </div>
                      )}

                      {/* Removed 'Must Visit' label and 'Explore' CTA as requested */}
                    </div>
                  </div>
                ))
            )}
          </div>
        </div>

        {/* Travel Agents CTA Section */}
        {(selectedCategory === "All" ||
          selectedCategory === "Travel Agent") && (
          <section className="bg-primary/10 py-12 md:py-16">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center max-w-3xl mx-auto">
                <h2 className="font-display text-3xl md:text-4xl font-bold mb-4">
                  {t("needHelp", lang)}
                </h2>
                <p className="text-lg text-primary-foreground/80 mb-8">
                  {t("needHelpText", lang)}
                </p>
                <Button
                  size="lg"
                  className="bg-secondary text-secondary-foreground hover:bg-secondary/90"
                >
                  {t("contactGuide", lang)}
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
                        {t("contactAgent", lang)}
                      </a>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Benefits Section */}
        <section
          className="py-16 bg-gradient-to-br from-primary via-primary/90 to-accent/80 animate-fade-up"
          style={{ animationDelay: "1.2s" }}
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="font-display text-3xl md:text-4xl font-bold text-primary-foreground mb-6 leading-tight">
                {t("whyExplore", lang)}
              </h2>
              <p className="font-body text-lg md:text-xl text-primary-foreground/90 max-w-3xl mx-auto leading-relaxed">
                {t("whyExploreText", lang)}
              </p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {benefits.map((benefit, index) => (
                <div
                  key={benefit.title}
                  className="text-center animate-fade-up"
                  style={{ animationDelay: `${1.3 + index * 0.1}s` }}
                >
                  <div className="w-20 h-20 rounded-full bg-primary-foreground/10 flex items-center justify-center mx-auto mb-6 shadow-lg backdrop-blur-sm">
                    <benefit.icon className="w-10 h-10 text-primary-foreground" />
                  </div>
                  <h3 className="font-display text-xl font-semibold mb-3 text-primary-foreground">
                    {benefit.title}
                  </h3>
                  <p className="text-primary-foreground/80 leading-relaxed">
                    {benefit.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
