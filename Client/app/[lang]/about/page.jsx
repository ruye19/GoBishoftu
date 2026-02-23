"use client";

import Link from "next/link";
import Image from "next/image";
import horaLake from "@/public/arsedi.jpg";
import cultureCoffee from "@/public/culture-coffee.jpg";
import { MapPin, Users, Leaf, History, Target, Heart } from "lucide-react";
import { Section, SectionHeader } from "@/components/ui/section";
import { useLanguage } from "@/app/context/LanguageContext";
import { t } from "@/locales";

export default function AboutPage() {
  const { lang } = useLanguage();
  
  const timeline = [
    {
      year: t('ancient', lang),
      title: t('volcanicOrigins', lang),
      description: t('volcanicOriginsDesc', lang),
    },
    {
      year: t('debreZeit', lang),
      title: t('debreZeitFounded', lang),
      description: t('debreZeitFoundedDesc', lang),
    },
    {
      year: "2000s",
      title: t('tourismGrowth', lang),
      description: t('tourismGrowthDesc', lang),
    },
    {
      year: t('today', lang),
      title: t('bishoftuRising', lang),
      description: t('bishoftuRisingDesc', lang),
    },
  ];
  
  const aboutStats = [
    { value: "7", label: t('aboutStats.lakes', lang) },
    { value: "47km", label: "From Addis Ababa" },
    { value: "2,000m", label: "Elevation" },
    { value: "100k+", label: t('aboutStats.visitors', lang) },
  ];

  const aboutValues = [
    {
      icon: Leaf,
      title: t('aboutBenefits.sustainable.title', lang),
      description: t('aboutBenefits.sustainable.description', lang),
    },
    {
      icon: Users,
      title: t('aboutBenefits.local.title', lang),
      description: t('aboutBenefits.local.description', lang),
    },
    {
      icon: Heart,
      title: t('aboutBenefits.authentic.title', lang),
      description: t('aboutBenefits.authentic.description', lang),
    },
  ];
  return (
    <>
      <main>
        <section className="relative min-h-[60vh] flex items-center justify-center pt-20">
          <div className="absolute inset-0">
            <img
              src="/image.png"
              alt="Bishoftu Landscape"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 overlay-hero" />
          </div>
          <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
            <span className="inline-block text-gold-light text-sm font-medium tracking-widest uppercase mb-4">
              {t('aboutTitle', lang)}
            </span>
            <h1 className="font-display text-4xl md:text-6xl font-bold text-primary-foreground mb-6">
              {t('aboutHeroTitle', lang)} <span className="text-gold-warm">Bishoftu</span>
            </h1>
            <p className="text-lg text-primary-foreground/90 max-w-2xl mx-auto">
              {t('aboutHeroSubtitle', lang)}
            </p>
          </div>
        </section>

        <section className="bg-primary text-primary-foreground py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {aboutStats.map((stat) => (
                <div key={stat.label} className="text-center">
                  <div className="font-display text-4xl md:text-5xl font-bold text-gold-warm mb-2">
                    {stat.value}
                  </div>
                  <p className="text-primary-foreground/80">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Main About Content */}
        <Section>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <SectionHeader
                subtitle={t('ourStory', lang)}
                title={t('whereNatureMeetsCulture', lang)}
                align="left"
                className="mb-8"
              />
              <div className="space-y-6 text-muted-foreground">
                <p className="text-lg leading-relaxed">
                  {t('bishoftuDescription1', lang)}
                </p>
                <p className="leading-relaxed">
                  {t('bishoftuDescription2', lang)}
                </p>
                <p className="leading-relaxed">
                  {t('bishoftuDescription3', lang)}
                </p>
              </div>
            </div>
            <div className="relative">
              <Image
                src={horaLake}
                alt="Lake Hora"
                className="rounded-3xl shadow-hover"
                placeholder="blur"
              />

              <div className="absolute -bottom-6 -left-6 bg-card rounded-2xl p-6 shadow-card max-w-[280px]">
                <MapPin className="w-8 h-8 text-primary mb-2" />
                <h4 className="font-display text-lg font-semibold mb-1">
                  {t('gatewayToOromia', lang)}
                </h4>
                <p className="text-sm text-muted-foreground">
                  {t('culturalHub', lang)}
                </p>
              </div>
            </div>
          </div>
        </Section>

        {/* Cultural Significance */}
        <Section className="bg-muted/50">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="order-2 lg:order-1">
              <Image
                src={cultureCoffee}
                alt="Ethiopian Coffee Ceremony"
                className="rounded-3xl shadow-hover"
                placeholder="blur"
              />
            </div>
            <div className="order-1 lg:order-2">
              <SectionHeader
                subtitle={t('cultureHeritage', lang)}
                title={t('richOromoTraditions', lang)}
                align="left"
                className="mb-8"
              />
              <div className="space-y-6 text-muted-foreground">
                <p className="text-lg leading-relaxed">
                  {t('oromoDescription1', lang)}
                </p>
                <p className="leading-relaxed">
                  {t('oromoDescription2', lang)}
                </p>
                <p className="leading-relaxed">
                  {t('oromoDescription3', lang)}
                </p>
              </div>
            </div>
          </div>
        </Section>

        {/* Timeline */}
        <Section>
          <SectionHeader
            subtitle={t('history', lang)}
            title={t('journeyThroughTime', lang)}
            description={t('historyDescription', lang)}
          />
          <div className="relative">
            <div className="absolute left-1/2 -translate-x-1/2 h-full w-0.5 bg-border hidden md:block" />
            <div className="space-y-12">
              {timeline.map((item, index) => (
                <div
                  key={item.year}
                  className={`relative flex flex-col md:flex-row items-center gap-8 ${
                    index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                  }`}
                >
                  <div
                    className={`md:w-1/2 ${index % 2 === 0 ? "md:text-right" : "md:text-left"}`}
                  >
                    <span className="text-4xl font-display font-bold text-primary">
                      {item.year}
                    </span>
                    <h3 className="font-display text-xl font-semibold mt-2 mb-2">
                      {item.title}
                    </h3>
                    <p className="text-muted-foreground">{item.description}</p>
                  </div>
                  <div className="hidden md:flex w-4 h-4 rounded-full bg-primary border-4 border-background shadow-lg z-10" />
                  <div className="md:w-1/2" />
                </div>
              ))}
            </div>
          </div>
        </Section>
        {/* About Go Bishoftu */}
        <Section className="bg-muted/40">
          <div className="max-w-5xl mx-auto">
            <SectionHeader
              subtitle={t('aboutGoBishoftu', lang)}
              title={t('digitalGateway', lang)}
              description={t('digitalGatewayDesc', lang)}
            />

            <div className="space-y-8 text-muted-foreground">
              <p className="text-lg leading-relaxed">
                {t('goBishoftuDesc1', lang)}
              </p>

              <p className="leading-relaxed">
                {t('goBishoftuDesc2', lang)}
              </p>
            </div>
          </div>
        </Section>

        {/* Mission & Vision */}
        <Section className="bg-primary text-primary-foreground">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Vision */}
            <div>
              <div className="flex items-center gap-3 mb-4">
                <Target className="w-8 h-8 text-gold-warm" />
                <span className="text-sm font-medium tracking-wider uppercase text-gold-light">
                  {t('ourVision', lang)}
                </span>
              </div>

              <h2 className="font-display text-3xl md:text-4xl font-bold mb-6">
                {t('ourVision', lang)}
              </h2>

              <p className="text-primary-foreground/80 text-lg leading-relaxed">
                {t('ourVisionText', lang)}
              </p>

              <p className="text-primary-foreground/80 leading-relaxed mt-4">
                {t('visionExtended', lang)}
              </p>
            </div>

            {/* Mission */}
            <div>
              <div className="flex items-center gap-3 mb-4">
                <History className="w-8 h-8 text-gold-warm" />
                <span className="text-sm font-medium tracking-wider uppercase text-gold-light">
                  {t('ourMission', lang)}
                </span>
              </div>

              <h3 className="font-display text-2xl font-bold mb-6">
                {t('ourMission', lang)}
              </h3>

              <p className="text-primary-foreground/80 leading-relaxed mb-4">
                {t('ourMissionText', lang)}
              </p>

              <p className="text-primary-foreground/80 leading-relaxed">
                {t('missionExtended', lang)}
              </p>
            </div>
          </div>
        </Section>
      </main>
    </>
  );
}
