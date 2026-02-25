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

// Translation data for static content - REMOVED - now using centralized locales
const featuredAgencies = [
  {
    id: 1,
    name: "Bishoftu Travel",
    category: "Tour Operator",
    rating: 4.8,
    image: "/placeholder.svg",
  },
  {
    id: 2,
    name: "Lakeview Tours",
    category: "Travel Agency",
    rating: 4.6,
    image: "/placeholder.svg",
  },
  {
    id: 3,
    name: "Ethiopia Explorer",
    category: "Tour Operator",
    rating: 4.7,
    image: "/placeholder.svg",
  },
];

export default function HomeClient() {
  const { lang } = useLanguage();
  const hotels = accommodations.slice(0, 4);
  const attractions = attractionsData.slice(0, 6);

  const accommodationTypes = [
    ...new Set(accommodations.map((acc) => acc.type)),
  ].map((type) => ({
    value: type,
    name: t(`accommodationType.${type}`, lang) || type.charAt(0).toUpperCase() + type.slice(1).replace('-', ' '),
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
        <section className="py-12 md:py-24 bg-background">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
                {t("hotelsTitle", lang)}
              </h2>
              <p className="font-body text-lg text-foreground/70">
                {t("hotelsSubtitle", lang)}
              </p>
            </div>

            {/* Accommodation Type Nav (Telegram-style compact buttons) */}
            <section className="py-3 bg-background">
              <div className="container-custom px-4">
                <div className="flex justify-center gap-2 flex-wrap">
                  {accommodationTypes.map((type) => (
                    <Link
                      key={type.value}
                      href={`/${lang}/accommodations?type=${type.value}`}
                      className="group"
                    >
                      <button
                        className={`
                          px-4 py-2 rounded-lg text-sm font-medium
                          transition-all duration-200 border cursor-pointer
                          bg-card text-foreground border-border
                          hover:bg-primary hover:text-primary-foreground hover:border-primary
                          active:scale-95
                        `}
                      >
                        <span className="text-sm font-medium">
                          {type.name}
                        </span>
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
                {hotels.map((hotel) => (
                  <div
                    key={hotel.id}
                    className="flex-shrink-0 w-[300px] snap-start"
                  >
                    <div className="bg-card rounded-xl overflow-hidden shadow-card hover-lift">
                      <Image
                        src={hotel.image || "/placeholder.svg"}
                        alt={hotel.translations[lang]?.name || hotel.name}
                        width={300}
                        height={160}
                        className="w-full h-40 object-cover"
                      />
                      <div className="p-6">
                        <div className="text-sm font-semibold text-primary mb-2">
                          {t(`accommodationType.${hotel.type}`, lang)}{" "}
                        </div>
                        <h3 className="text-xl font-bold text-foreground mb-2">
                          {hotel.translations[lang]?.name || hotel.name}
                        </h3>
                        <p className="text-sm text-foreground/70 leading-relaxed">
                          {hotel.translations[lang]?.description ||
                            hotel.description}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Desktop: grid layout */}
            <div className="hidden md:grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {hotels.map((hotel) => (
                <div
                  key={hotel.id}
                  className="bg-card rounded-xl overflow-hidden shadow-card hover-lift"
                >
                  <Image
                    src={hotel.image || "/placeholder.svg"}
                    alt={hotel.translations[lang]?.name || hotel.name}
                    width={300}
                    height={160}
                    className="w-full h-40 object-cover"
                  />
                  <div className="p-6">
                    <div className="text-sm font-semibold text-primary mb-2">
                      {t(`accommodationType.${hotel.type}`, lang)}
                    </div>
                    <h3 className="text-xl font-bold text-foreground mb-2">
                      {hotel.translations[lang]?.name || hotel.name}
                    </h3>
                    <p className="text-sm text-foreground/70 leading-relaxed">
                      {hotel.translations[lang]?.description ||
                        hotel.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <div className="text-center my-2">
          <Link
            href={`/${lang}/accommodations`}
            className="btn-cta my-3 inline-block"
          >
            {t("exploreAll", lang)} Accommodations
          </Link>
        </div>

        {/* Featured Attraction */}
        <section className="py-12 md:py-24 bg-background">
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
              {attractions.map((item) => (
                <div
                  key={item.id}
                  tabIndex={0}
                  className="min-w-[260px] snap-start bg-card rounded-xl overflow-hidden shadow-card hover-lift focus-within:ring-2 focus-within:ring-primary focus-within:ring-offset-2"
                >
                  <Image
                    src={item.image || "/placeholder.svg"}
                    alt={item.translations?.[lang]?.name || item.name}
                    width={260}
                    height={192}
                    className="w-full h-48 object-cover"
                  />

                  <div className="p-4">
                    <div className="flex justify-between text-sm text-muted-foreground mb-1">
                      <span>{item.location}</span>
                      <span className="text-accent">★ {item.rating}</span>
                    </div>
                    <h3 className="font-bold text-lg mb-2">
                      {item.translations?.[lang]?.name || item.name}
                    </h3>
                    <p className="text-sm text-foreground/70 mb-3">
                      {item.translations?.[lang]?.description ||
                        item.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Desktop: grid */}
            <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {attractions.map((item) => (
                <div
                  key={item.id}
                  className="bg-card rounded-xl overflow-hidden shadow-card hover-lift"
                >
                  <Image
                    src={item.image || "/placeholder.svg"}
                    alt={item.translations?.[lang]?.name || item.name}
                    width={400}
                    height={192}
                    className="w-full h-48 object-cover"
                  />

                  <div className="p-6">
                    <div className="flex justify-between text-sm text-muted-foreground mb-2">
                      <span className="flex items-center gap-1">
                        <MapPin className="w-4 h-4" /> {item.location}
                      </span>
                      <span className="text-accent">★ {item.rating}</span>
                    </div>
                    <h3 className="text-xl font-bold mb-3">
                      {item.translations?.[lang]?.name || item.name}
                    </h3>
                    <p className="text-sm text-foreground/70 mb-4">
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
                  className="flex-shrink-0 min-w-[260px] snap-start bg-card rounded-xl overflow-hidden shadow-card hover-lift"
                >
                  <Image
                    src={agency.image || "/placeholder.svg"}
                    alt={agency.name}
                    width={260}
                    height={192}
                    className="w-full h-48 object-cover"
                  />
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
                  className="bg-card rounded-xl overflow-hidden shadow-card hover-lift"
                >
                  <Image
                    src={agency.image || "/placeholder.svg"}
                    alt={agency.name}
                    width={260}
                    height={192}
                    className="w-full h-48 object-cover"
                  />
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
