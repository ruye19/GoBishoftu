"use client";

import { useState, useMemo, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { PhoneCall, MapPin, Star, Heart, CheckCircle } from "lucide-react";
import accommodations from "@/data/accommodations.json";
import { useLanguage } from "@/app/context/LanguageContext";
import { t } from "@/locales";
import { SkeletonCard } from "@/components/SkeletonCard";

export default function AccommodationsClient() {
  const [selectedType, setSelectedType] = useState("All");
  const [priceRange, setPriceRange] = useState([0, 300]);
  const [minRating, setMinRating] = useState(0);
  const [showFilters, setShowFilters] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const { lang } = useLanguage(); // language state

  // Simulate loading completion
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1200); // 1.2 seconds loading simulation

    return () => clearTimeout(timer);
  }, []);

  // Get unique types from data dynamically
  const types = ["All", ...new Set(accommodations.map((acc) => acc.type))];

  const searchParams = useSearchParams();

  useEffect(() => {
    const q = searchParams?.get("type");
    if (!q) return;
    const normalized = q.toLowerCase();
    
    // Direct match with data values
    if (normalized === "hotel") setSelectedType("hotel");
    else if (normalized === "lodge") setSelectedType("lodge");
    else if (normalized === "guest-house" || normalized === "guesthouse") setSelectedType("guest-house");
    else if (normalized === "resort") setSelectedType("resort");
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
        <h4 className="font-semibold mb-3">{t("type", lang) || "Type"}</h4>
        <div className="flex flex-wrap gap-2">
          {types.map((type) => (
            <button
              key={type}
              onClick={() => setSelectedType(type)}
              className={`
                px-4 py-2 rounded-full text-sm font-medium transition-all duration-200
                border cursor-pointer
                ${selectedType === type
                  ? "bg-primary text-primary-foreground border-primary shadow-sm"
                  : "bg-background text-foreground border-border hover:bg-muted/50 hover:border-muted-foreground/30"
                }
              `}
            >
              {type === "All" ? (t("all", lang) || "All") : (t(`accommodationType.${type}`, lang) || type)}
            </button>
          ))}
        </div>
      </div>

      {/* Price Range */}
      <div>
        <h4 className="font-semibold mb-3">{t("priceRange", lang) || "Price Range"}</h4>
        <div className="space-y-2">
          <div className="flex justify-between text-sm text-muted-foreground">
            <span>${priceRange[0]}</span>
            <span>${priceRange[1]}</span>
          </div>
          <input
            type="range"
            min="0"
            max="500"
            value={priceRange[1]}
            onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
            className="w-full"
          />
        </div>
      </div>

      {/* Rating */}
      <div>
        <h4 className="font-semibold mb-3">{t("minRating", lang) || "Minimum Rating"}</h4>
        {[0, 3, 4, 4.5].map((r) => (
          <button
            key={r}
            onClick={() => setMinRating(r)}
            className={`block w-full text-left px-3 py-2 rounded-lg mb-1 ${
              minRating === r
                ? "bg-primary text-primary-foreground font-semibold"
                : "bg-muted hover:bg-muted/70"
            }`}
          >
            {r === 0 ? (t("allRatings", lang) || "All Ratings") : `${r}+ ${t("stars", lang) || "Stars"}`}
          </button>
        ))}
      </div>
    </div>
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
                  {t("accommodationsTitle", lang) || "Accommodations"}
                </h1>
                <p className="text-muted-foreground max-w-2xl">
                  {t("accommodationsSubtitle", lang) || "Find your perfect stay in Bishoftu with our curated selection of premium accommodations."}
                </p>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                <span>{t("available", lang) || "Available"} {filteredAccommodations.length} {t("properties", lang) || "properties"}</span>
              </div>
            </div>
          </div>
        </section>

        {/* Mobile Filter Button */}
        <div className="md:hidden sticky top-0 z-20 bg-background border-b shadow-sm">
          <button
            onClick={() => setShowFilters(true)}
            className="w-full py-3 font-semibold text-primary hover:bg-primary/10 transition"
          >
            {t("filterAccommodations", lang) || "Filter Accommodations"}
          </button>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Desktop Filters Sidebar */}
            <div className="hidden lg:block lg:col-span-1">
              <div className="bg-card rounded-xl p-6 shadow-card hover-lift sticky top-24 animate-fade-up" style={{ animationDelay: '0.3s' }}>
                <h3 className="text-xl font-bold mb-6 text-foreground flex items-center gap-2">
                  <div className="w-5 h-5 bg-gradient-gold rounded-full" />
                  {t("filters", lang) || "Filters"}
                </h3>
                <Filters />
              </div>
            </div>

            {/* Accommodations Grid */}
            <div className="lg:col-span-3">
              {/* Premium Featured Properties - Top 2 from data */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                {filteredAccommodations.filter(acc => acc.isPremium).slice(0, 2).map((acc, index) => {
                  const translation = acc.translations?.[lang] || acc.translations?.en;
                  
                  return (
                    <div key={acc.id} className="bg-card rounded-xl overflow-hidden shadow-card hover-lift border-2 border-gold/20 animate-fade-up" style={{ animationDelay: `${0.5 + index * 0.1}s` }}>
                      <div className="relative">
                        <div className="absolute top-3 left-3 z-10">
                          <div className="bg-gold text-white text-xs px-2 py-1 rounded-full font-semibold">
                            {t("featured", lang) || "FEATURED"}
                          </div>
                        </div>
                        <div className="absolute top-3 right-3 z-10">
                          <div className="bg-green-500 text-white text-xs px-2 py-1 rounded-full font-medium">
                            {t(acc.trustBadge, lang) || acc.trustBadge}
                          </div>
                        </div>
                        <img
                          src={acc.image || "/placeholder.svg"}
                          alt={translation.name}
                          className="w-full h-48 object-cover"
                        />
                      </div>
                      <div className="p-6">
                        <div className="text-sm font-semibold text-primary mb-2 tracking-wide uppercase text-xs">
                          {t(`accommodationType.${acc.type}`, lang)}
                        </div>
                        <h3 className="text-xl font-bold text-foreground mb-2">
                          {translation.name}
                        </h3>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                          <MapPin className="w-3 h-3" />
                          <span>{t("bishoftuEthiopia", lang) || "Bishoftu, Ethiopia"}</span>
                        </div>
                        <p className="text-sm text-muted-foreground mb-4">
                          {translation.description}
                        </p>
                        <div className="flex justify-between items-center">
                          <div>
                            <span className="text-2xl font-bold text-primary">${acc.pricePerNight}</span>
                            <span className="text-sm text-muted-foreground ml-1">/{t("night", lang) || "night"}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Star className="w-4 h-4 text-gold fill-gold" />
                            <span className="font-semibold">{acc.rating}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="mb-6 flex justify-between items-center animate-fade-up" style={{ animationDelay: '0.7s' }}>
                <div>
                  <p className="text-foreground/70 text-sm">
                    {t("showing", lang) || "Showing"} <span className="font-semibold text-foreground">{filteredAccommodations.length}</span> {t("accommodations", lang) || "accommodations"}
                  </p>
                  <p className="text-xs text-foreground/50 mt-1">
                    {selectedType !== "All" && `${t("filteredBy", lang) || "Filtered by"}: ${selectedType}`}
                    {minRating > 0 && ` • ${minRating}+ ${t("stars", lang) || "stars"}`}
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {isLoading ? (
  // Skeleton loaders during loading
  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
    <SkeletonCard />
    <SkeletonCard />
    <SkeletonCard />
    <SkeletonCard />
    <SkeletonCard />
    <SkeletonCard />
  </div>
) : (
  // Actual content
  filteredAccommodations.map((acc, index) => {
    const translation = acc.translations?.[lang] || acc.translations?.en;

    return (
      <div
        key={acc.id}
        className="bg-card rounded-xl overflow-hidden shadow-card hover-lift animate-fade-up"
        style={{ animationDelay: `${index * 0.1}s` }}
      >
        <div className="relative overflow-hidden group">
          <img
            src={acc.image || "/placeholder.svg"}
            alt={translation.name}
            className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          
          {/* Featured Badge */}
          <div className="absolute top-3 right-3">
            <div className="px-2 py-1 bg-gradient-gold text-white text-xs rounded-full font-medium shadow-gold">
              {t("premium", lang) || "Premium"}
            </div>
          </div>
          
          {/* Status Indicator */}
          <div className="absolute top-3 left-3">
            <div className="flex items-center gap-1 px-2 py-1 bg-green-500/90 text-white text-xs rounded-full font-medium">
              <div className="w-1.5 h-1.5 bg-white rounded-full animate-pulse" />
              {t("available", lang) || "Available"}
            </div>
          </div>
        </div>

        <div className="p-6">
          <div className="flex justify-between items-start mb-3">
            <div className="flex-1">
              <div className="text-sm font-semibold text-primary mb-2 tracking-wide uppercase text-xs">
                {acc.type}
              </div>
              <h3 className="text-xl font-bold text-foreground mb-2 leading-tight">
                {translation.name}
              </h3>
              <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                <MapPin className="w-3 h-3" />
                <span>{t("bishoftuEthiopia", lang) || "Bishoftu, Ethiopia"}</span>
              </div>
            </div>

            <div className="flex flex-col items-end gap-2">
              <div className="flex items-center gap-1 bg-accent/15 px-3 py-1.5 rounded-full">
                <Star className="w-4 h-4 text-accent" />
                <span className="text-accent font-semibold">
                  {acc.rating}
                </span>
              </div>
              
              {/* Quick Actions */}
              <div className="flex gap-1">
                <button className="p-2 bg-muted/50 rounded-lg hover:bg-muted transition-colors">
                  <Heart className="w-4 h-4 text-muted-foreground" />
                </button>
              </div>
            </div>
          </div>

          <p className="text-sm text-foreground/60 mb-4 leading-relaxed line-clamp-3">
            {translation.description}
          </p>
          
          <div className="flex flex-wrap gap-2 mb-4">
            {acc.amenities.slice(0, 3).map((a, i) => (
              <span
                key={i}
                className="text-xs bg-muted/50 text-muted-foreground px-2 py-1 rounded-full font-medium"
              >
                {a}
              </span>
            ))}
            {acc.amenities.length > 3 && (
              <span className="text-xs bg-muted/30 text-muted-foreground px-2 py-1 rounded-full">
                +{acc.amenities.length - 3} {t("more", lang) || "more"}
              </span>
            )}
          </div>

          <div className="flex justify-between items-center pt-4 border-t border-border/50">
            <div>
              <span className="text-2xl font-bold text-primary">
                ${acc.pricePerNight}
              </span>
              <span className="text-sm text-foreground/60 ml-1">
                /{t("night", lang) || "night"}
              </span>
            </div>
            <a
              href={acc.bookingUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-cta text-sm py-2.5 px-6 rounded-xl font-medium transition-all hover:shadow-gold hover:-translate-y-0.5"
            >
              {t("bookNow", lang) || "Book Now"}
            </a>
          </div>
        </div>
      </div>
    );
  })
)}
              </div>

              {filteredAccommodations.length === 0 && (
                <div className="text-center py-16 animate-fade-up">
                  <div className="w-20 h-20 bg-muted rounded-full mx-auto mb-6 flex items-center justify-center">
                    <CheckCircle className="w-10 h-10 text-muted-foreground" />
                  </div>
                  <h3 className="text-xl font-semibold text-foreground mb-3">
                    {t("noAccommodationsFound", lang) || "No accommodations found"}
                  </h3>
                  <p className="text-lg text-foreground/70 mb-6 max-w-md mx-auto">
                    {t("noAccommodationsMessage", lang) || "No accommodations match your current filters. Try adjusting your criteria to see more options."}
                  </p>
                  <button
                    onClick={() => {
                      setSelectedType("All");
                      setPriceRange([0, 300]);
                      setMinRating(0);
                    }}
                    className="btn-cta-outline px-6 py-2.5 rounded-xl font-medium"
                  >
                    {t("clearAllFilters", lang) || "Clear All Filters"}
                  </button>
                </div>
              )}

              {/* Booking CTA */}
              <section className="py-16 bg-gradient-to-br from-secondary via-secondary/90 to-primary/20 animate-fade-up" style={{ animationDelay: '0.8s' }}>
                <div className="text-center max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                  <div className="bg-card/50 backdrop-blur-sm rounded-2xl p-8 md:p-12 shadow-card">
                    <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-6">
                      {t("needHelpTitle", lang) || "Need Help Booking?"}
                    </h2>
                    <p className="text-lg text-foreground/70 mb-8 max-w-2xl mx-auto leading-relaxed">
                      {t("needHelpSubtitle", lang) || "Our team can assist you in finding the perfect accommodation for your Bishoftu adventure. Contact us for personalized recommendations."}
                    </p>
                    <Button
                      size="lg"
                      className="
                        bg-gradient-gold
                        text-white
                        shadow-gold
                        transition-all
                        rounded-full
                        px-8
                        font-semibold
                        hover:shadow-lg
                        hover:-translate-y-0.5
                        hover:scale-105
                      "
                    >
                      <PhoneCall className="w-5 h-5 mr-2" />
                      {t("contactUs", lang) || "Contact Us for Assistance"}
                    </Button>
                  </div>
                </div>
              </section>
            </div>
          </div>
        </div>

        {/* Mobile Slide-Up Filters */}
        {showFilters && (
          <div className="fixed inset-0 z-30 bg-black/30 backdrop-blur-sm flex justify-end items-end">
            <div className="w-full sm:max-w-md bg-card rounded-t-2xl p-6 max-h-[85vh] overflow-y-auto animate-slideUp">
              <div className="flex justify-between items-center mb-6 sticky top-0 bg-card pt-4 pb-2 z-10">
                <h3 className="text-xl font-bold">{t("filters", lang) || "Filters"}</h3>
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
                  {t("applyFilters", lang) || "Apply Filters"}
                </button>
              </div>
            </div>
          </div>
        )}
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
