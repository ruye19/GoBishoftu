"use client";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import landscapeimage from "../../../public/image.png";
import { GlobalSearch } from "@/components/global-search";
import { useLanguage } from "@/app/context/LanguageContext";
import accommodations from "@/data/accommodations.json";
import attractionsData from "@/data/attractions.json";
import { t } from "@/locales";
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
import { SkeletonCard } from "@/components/SkeletonCard";
import { SkeletonAttraction } from "@/components/SkeletonAttraction";
import { SkeletonAgency } from "@/components/SkeletonAgency";

const labelToKey = (s) =>
  (s || "")
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-")
    .replace(/[^a-z0-9-_]/g, "");

// featured agencies are derived from attractions at render time (localized)

export default function HomeClient() {
  const { lang } = useLanguage();
  const [isLoading, setIsLoading] = useState(true);
  const featuredAgencies = (attractionsData || [])
    .filter(
      (item) =>
        (item.type?.key || labelToKey(item.type?.translations?.en)) ===
        "travel-agent",
    )
    .map((item) => ({
      id: item.id,
      name:
        item.translations?.[lang]?.name ||
        item.translations?.en?.name ||
        item.type?.translations?.[lang] ||
        item.type?.translations?.en ||
        item.slug,
      category:
        item.type?.translations?.[lang] ||
        item.type?.translations?.en ||
        "Travel Agent",
      rating: item.rating || null,
      image: item.image || "/placeholder.svg",
    }))
    .slice(0, 6);
  // Show 6 accommodations on home page (first 3 are premium, next 3 are regular)
  const hotels = accommodations.slice(0, 6);
  const attractions = attractionsData.slice(0, 6);

  // Simulate loading completion
  useState(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500); // 1.5 seconds loading simulation

    return () => clearTimeout(timer);
  }, []);

  const accommodationTypes = [
    ...new Set(accommodations.map((acc) => acc.type)),
  ].map((type) => ({
    value: type,
    name:
      t(`accommodationType.${type}`, lang) ||
      type.charAt(0).toUpperCase() + type.slice(1).replace("-", " "),
    // count: accommodations.filter(acc => acc.type === type).length
  }));

  return (
    <>
      <main>
        {/* Hero Section — discovery-focused, like About hero */}
        <section className="relative min-h-[65vh] flex items-center justify-center pt-20">
          <div className="absolute inset-0">
            <Image
              src={landscapeimage}
              alt="Bishoftu landscape"
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 overlay-hero" />
          </div>
          <div className="relative z-10 px-4">
            <div className="mx-auto flex max-w-3xl flex-col items-center text-center gap-6">
              <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-primary-foreground leading-tight">
                {t("heroTitle", lang)}
              </h1>
              {/* <p className="text-base md:text-lg text-primary-foreground/90 max-w-2xl">
                Experience the breathtaking beauty of volcanic crater lakes,
                rich Oromo heritage, and warm Ethiopian hospitality—just 47km
                from Addis Ababa.
              </p> */}

              {/* Global Search – comprehensive search across all content */}
              <GlobalSearch className="mt-2" />
            </div>
          </div>
        </section>

        {/* Featured Places */}
        <section className="py-10 md:py-24 bg-background">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
                {t("hotelsTitle", lang)}
              </h2>
              <p className="font-body text-lg text-foreground/70">
                {t("hotelsSubtitle", lang)}
              </p>
            </div>

            {/* Accommodation Type Nav (Full width buttons) */}
            <section className="py-2 bg-background">
              <div className="w-full px-4">
                <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide md:justify-between md:overflow-visible md:flex-nowrap">
                  {accommodationTypes.map((type) => (
                    <Link
                      key={type.value}
                      href={`/${lang}/accommodations?type=${type.value}`}
                      className="group flex-shrink-0 min-w-[120px] md:flex-1"
                    >
                      <button
                        className={`
                          w-full px-6 py-2.5 rounded-xl text-sm font-medium
                          transition-all duration-200 border cursor-pointer
                          bg-card text-foreground border-border shadow-sm
                          hover:bg-primary hover:text-primary-foreground hover:border-primary hover:shadow-md
                          active:scale-95 whitespace-nowrap
                        `}
                      >
                        <span className="text-sm font-medium">{type.name}</span>
                        {/* <span className="px-3 py-1 bg-muted/70 text-muted-foreground text-xs rounded-full font-medium"> */}
                        {/* {type.count} */}
                        {/* </span> */}
                      </button>
                    </Link>
                  ))}
                </div>
              </div>
            </section>

            {/* Mobile: horizontal scrollable list */}
            <div className="md:hidden -mx-4 py-4 px-4">
              <div className="flex gap-4 overflow-x-auto snap-x snap-mandatory pb-4 scrollbar-hide">
                {isLoading ? (
                  // Skeleton loaders for mobile (6)
                  <>
                    <SkeletonCard />
                    <SkeletonCard />
                    <SkeletonCard />
                    <SkeletonCard />
                    <SkeletonCard />
                    <SkeletonCard />
                  </>
                ) : (
                  // Actual content
                  hotels.map((hotel, index) => (
                    <div
                      key={hotel.id}
                      className="flex-shrink-0 w-[300px] snap-start"
                    >
                      <div
                        className="bg-card rounded-xl overflow-hidden shadow-card hover-lift animate-fade-up"
                        style={{ animationDelay: "0.1s" }}
                      >
                        <div className="relative overflow-hidden group">
                          <Image
                            src={encodeURI(hotel.image || "/placeholder.svg")}
                            alt={hotel.translations[lang]?.name || hotel.name}
                            width={300}
                            height={160}
                            className="w-full h-40 object-cover group-hover:scale-110 transition-transform duration-500"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                          {/* Featured Badge — show for premium accommodations */}
                          {hotel.isPremium && (
                            <div className="absolute top-3 right-3">
                              <div className="px-2 py-1 bg-gradient-gold text-white text-xs rounded-full font-medium shadow-gold">
                                Featured
                              </div>
                            </div>
                          )}
                        </div>
                        <div className="p-6">
                          <div className="flex justify-between items-start mb-2">
                            <div className="text-sm font-semibold text-primary tracking-wide uppercase text-xs">
                              {t(`accommodationType.${hotel.type}`, lang)}{" "}
                            </div>
                            {hotel.rating && (
                              <div className="flex items-center gap-1 bg-accent/15 px-3 py-1.5 rounded-full">
                                <Star className="w-4 h-4 text-accent" />
                                <span className="text-accent font-semibold">
                                  {hotel.rating}
                                </span>
                              </div>
                            )}
                          </div>
                          <h3 className="text-xl font-bold text-foreground mb-2 leading-tight">
                            {hotel.translations[lang]?.name || hotel.name}
                          </h3>
                          <p className="text-sm text-foreground/60 leading-relaxed line-clamp-3">
                            {hotel.translations[lang]?.description ||
                              hotel.description}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>

            {/* Desktop: grid layout (show 6 cards in 3 columns) */}
            <div className="hidden md:grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {hotels.map((hotel, index) => (
                <div key={hotel.id}>
                  <div
                    className="bg-card rounded-xl overflow-hidden shadow-card hover-lift animate-fade-up"
                    style={{ animationDelay: "0.1s" }}
                  >
                    <div className="relative overflow-hidden group">
                      <Image
                        src={encodeURI(hotel.image || "/placeholder.svg")}
                        alt={hotel.translations[lang]?.name || hotel.name}
                        width={300}
                        height={160}
                        className="w-full h-40 object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      {/* Featured Badge — show for premium accommodations */}
                      {hotel.isPremium && (
                        <div className="absolute top-3 right-3">
                          <div className="px-2 py-1 bg-gradient-gold text-white text-xs rounded-full font-medium shadow-gold">
                            Featured
                          </div>
                        </div>
                      )}
                    </div>
                    <div className="p-6">
                      <div className="flex justify-between items-start mb-2">
                        <div className="text-sm font-semibold text-primary tracking-wide uppercase text-xs">
                          {t(`accommodationType.${hotel.type}`, lang)}
                        </div>
                        {hotel.rating && (
                          <div className="flex items-center gap-1 bg-accent/15 px-3 py-1.5 rounded-full">
                            <Star className="w-4 h-4 text-accent" />
                            <span className="text-accent font-semibold">
                              {hotel.rating}
                            </span>
                          </div>
                        )}
                      </div>
                      <h3 className="text-xl font-bold text-foreground mb-2 leading-tight">
                        {hotel.translations[lang]?.name || hotel.name}
                      </h3>
                      <p className="text-sm text-foreground/60 leading-relaxed line-clamp-3">
                        {hotel.translations[lang]?.description ||
                          hotel.description}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Premium section removed — using 4 reserved featured cards from the 6 accommodations shown above */}

        <div className="text-center my-2">
          <Link
            href={`/${lang}/accommodations`}
            className="btn-cta inline-block"
          >
            {t("exploreAll", lang)} Accommodations
          </Link>
        </div>

        {/* Featured Attraction */}
        <section className="py-16 md:py-24 bg-muted/30">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-2">
                {t("attractionsTitle", lang)}
              </h2>
              <p className="font-body text-foreground/70">
                {t("attractionsSubtitle", lang)}
              </p>
            </div>

            {/* Mobile: horizontal scrollable list */}
            <div className="md:hidden overflow-x-auto flex gap-4 snap-x snap-mandatory pb-4 px-2">
              {isLoading ? (
                // Skeleton loaders for mobile attractions
                <>
                  <SkeletonAttraction />
                  <SkeletonAttraction />
                  <SkeletonAttraction />
                </>
              ) : (
                // Actual content
                attractions.map((item) => (
                  <div
                    key={item.id}
                    tabIndex={0}
                    className="min-w-[260px] snap-start bg-card rounded-xl overflow-hidden shadow-card hover-lift focus-within:ring-2 focus-within:ring-primary focus-within:ring-offset-2 animate-fade-up"
                    style={{ animationDelay: "0.2s" }}
                  >
                    <div className="relative overflow-hidden group">
                      <Image
                        src={encodeURI(item.image || "/placeholder.svg")}
                        alt={item.translations?.[lang]?.name || item.name}
                        width={260}
                        height={192}
                        className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    </div>

                    <div className="p-4">
                      <div className="flex justify-between text-sm text-muted-foreground mb-1">
                        <span className="flex items-center gap-1 font-medium">
                          <MapPin className="w-3 h-3" /> {item.location}
                        </span>
                        <div className="flex items-center gap-2">
                          <span className="text-accent font-semibold">
                            ★ {item.rating}
                          </span>
                          {/* Status Indicator */}
                          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                        </div>
                      </div>
                      <h3 className="font-bold text-lg mb-2 leading-tight">
                        {item.translations?.[lang]?.name || item.name}
                      </h3>
                      <p className="text-sm text-foreground/60 mb-3 leading-relaxed line-clamp-2">
                        {item.translations?.[lang]?.description ||
                          item.description}
                      </p>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Desktop: grid */}
            <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {attractions.map((item) => (
                <div
                  key={item.id}
                  className="bg-card rounded-xl overflow-hidden shadow-card hover-lift animate-fade-up"
                  style={{ animationDelay: "0.3s" }}
                >
                  <div className="relative overflow-hidden group">
                    <Image
                      src={encodeURI(item.image || "/placeholder.svg")}
                      alt={item.translations?.[lang]?.name || item.name}
                      width={400}
                      height={192}
                      className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>

                  <div className="p-6">
                    <div className="flex justify-between text-sm text-muted-foreground mb-2">
                      <span className="flex items-center gap-1 font-medium">
                        <MapPin className="w-4 h-4" /> {item.location}
                      </span>
                      <span className="text-accent font-semibold">
                        ★ {item.rating}
                      </span>
                    </div>
                    <h3 className="text-xl font-bold mb-3 leading-tight">
                      {item.translations?.[lang]?.name || item.name}
                    </h3>
                    <p className="text-sm text-foreground/60 mb-4 leading-relaxed line-clamp-2">
                      {item.translations?.[lang]?.description ||
                        item.description}
                    </p>
                    <Link
                      href={item.link || "#"}
                      className="inline-flex items-center gap-2 text-primary font-semibold hover:underline"
                    >
                      Explore <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                </div>
              ))}
            </div>

            <div className="text-center mt-10">
              <Link href={`/${lang}/explore`} className="btn-cta inline-block">
                {t("viewAll", lang)} Attractions
              </Link>
            </div>
          </div>
        </section>

        {/* top tour and travel agencies card */}
        {/* Agencies Section */}
        <section className="py-8 md:py-12 bg-secondary/30">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-2">
                {t("agenciesTitle", lang)}
              </h2>
              <p className="font-body text-foreground/70">
                {t("agenciesSubtitle", lang)}
              </p>
            </div>

            {/* Mobile: horizontal scrollable list */}
            <div className="md:hidden overflow-x-auto flex gap-4 snap-x snap-mandatory pb-4 px-2">
              {featuredAgencies.map((agency) => (
                <div
                  key={agency.id}
                  className="flex-shrink-0 min-w-[260px] snap-start bg-card rounded-xl overflow-hidden shadow-card hover-lift animate-fade-up"
                  style={{ animationDelay: "0.4s" }}
                >
                  <div className="relative overflow-hidden group">
                    <Image
                      src={encodeURI(agency.image || "/placeholder.svg")}
                      alt={agency.name}
                      width={260}
                      height={192}
                      className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-foreground mb-2">
                      {agency.name}
                    </h3>
                    <div className="text-sm text-muted-foreground mb-2">
                      {agency.category}
                    </div>
                    <div className="text-accent font-semibold mb-4">
                      ★ {agency.rating}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="hidden md:grid md:grid-cols-3 gap-8">
              {featuredAgencies.map((agency) => (
                <div
                  key={agency.id}
                  className="bg-card rounded-xl overflow-hidden shadow-card hover-lift animate-fade-up"
                  style={{ animationDelay: "0.5s" }}
                >
                  <div className="relative overflow-hidden group">
                    <Image
                      src={encodeURI(agency.image || "/placeholder.svg")}
                      alt={agency.name}
                      width={260}
                      height={192}
                      className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-foreground mb-2">
                      {agency.name}
                    </h3>
                    <div className="text-sm text-muted-foreground mb-2">
                      {agency.category}
                    </div>
                    <div className="text-accent font-semibold mb-4">
                      ★ {agency.rating}
                    </div>
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
              {t("aboutTitle", lang)}
            </h2>
            <p className="font-body text-lg text-foreground/70 leading-relaxed">
              {t("aboutSubtitle", lang)}
            </p>
            <div className="mt-6">
              <Link
                href={`/${lang}/about`}
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
