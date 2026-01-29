import { Section, SectionHeader } from "@/components/ui/section";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Building2,
  Hotel,
  Home,
  Store,
  TrendingUp,
  Shield,
  Users,
  Briefcase,
  ArrowRight,
  CheckCircle2,
  Phone,
  Mail,
  MapPin,
} from "lucide-react";

const sectors = [
  {
    icon: Hotel,
    title: "Hospitality & Tourism",
    description:
      "Hotels, resorts, tour operations, and adventure tourism ventures.",
    opportunities: [
      "Lakeside resorts",
      "Boutique hotels",
      "Eco-lodges",
      "Tour companies",
    ],
  },
  {
    icon: Building2,
    title: "Real Estate Development",
    description: "Residential and commercial properties in growing areas.",
    opportunities: [
      "Residential complexes",
      "Commercial centers",
      "Mixed-use developments",
    ],
  },
  {
    icon: Store,
    title: "Retail & Services",
    description:
      "Shops, restaurants, and service businesses for tourists and locals.",
    opportunities: [
      "Restaurants & cafes",
      "Craft shops",
      "Wellness centers",
      "Entertainment",
    ],
  },
  {
    icon: Home,
    title: "Agriculture & Agro-tourism",
    description: "Farm stays, organic produce, and agricultural tourism.",
    opportunities: [
      "Farm tourism",
      "Organic farms",
      "Coffee plantations",
      "Dairy farming",
    ],
  },
];

const benefits = [
  {
    icon: TrendingUp,
    title: "Growing Tourism Market",
    description: "100,000+ annual visitors with steady year-over-year growth.",
  },
  {
    icon: MapPin,
    title: "Prime Location",
    description: "Just 47km from Addis Ababa with excellent infrastructure.",
  },
  {
    icon: Shield,
    title: "Investment Security",
    description:
      "Stable environment with government support for tourism development.",
  },
  {
    icon: Users,
    title: "Skilled Workforce",
    description:
      "Access to trained hospitality and service industry professionals.",
  },
];

const stats = [
  { value: "12%", label: "Annual Tourism Growth" },
  { value: "47km", label: "From Addis Ababa" },
  { value: "7", label: "Crater Lakes" },
  { value: "100k+", label: "Annual Visitors" },
];

export default function InvestmentPage() {
  return (
    <main>
      <section className="relative min-h-[60vh] flex items-center justify-center pt-20">
        <div className="absolute inset-0">
          <img
            src="/lakeside-resort-water-view.jpg"
            alt="Investment"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 overlay-hero" />
        </div>
        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
          <span className="inline-block text-gold-light text-sm font-medium tracking-widest uppercase mb-4">
            Invest
          </span>
          <h1 className="font-display text-4xl md:text-6xl font-bold text-primary-foreground mb-6">
            Invest in <span className="text-gold-warm">Bishoftu</span>
          </h1>
          <p className="text-lg text-primary-foreground/90 max-w-2xl mx-auto mb-8">
            Discover lucrative opportunities in Ethiopia's fastest-growing
            tourism destination. Your gateway to East African hospitality
            investment.
          </p>
          <Button
            size="lg"
            className="bg-secondary text-secondary-foreground hover:bg-secondary/90 gap-2"
          >
            <Briefcase className="w-4 h-4" />
            Download Investment Guide
          </Button>
        </div>
      </section>

      {/* Stats Bar */}
      <Section className="bg-primary text-primary-foreground py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="font-display text-4xl md:text-5xl font-bold text-gold-warm mb-2">
                {stat.value}
              </div>
              <p className="text-primary-foreground/80">{stat.label}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* Why Invest */}
      <Section>
        <SectionHeader
          subtitle="Opportunity"
          title="Why Invest in Bishoftu?"
          description="Strategic advantages that make Bishoftu an attractive investment destination."
        />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {benefits.map((benefit) => (
            <div
              key={benefit.title}
              className="bg-card rounded-2xl p-6 shadow-card hover-lift"
            >
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                <benefit.icon className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-display text-lg font-semibold mb-2">
                {benefit.title}
              </h3>
              <p className="text-sm text-muted-foreground">
                {benefit.description}
              </p>
            </div>
          ))}
        </div>
      </Section>

      {/* Investment Sectors */}
      <Section className="bg-muted/50">
        <SectionHeader
          subtitle="Sectors"
          title="Investment Opportunities"
          description="Explore the diverse sectors offering attractive returns in Bishoftu."
        />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {sectors.map((sector) => (
            <div
              key={sector.title}
              className="bg-card rounded-2xl p-8 shadow-card hover-lift"
            >
              <div className="flex items-start gap-4">
                <div className="w-14 h-14 rounded-xl bg-secondary flex items-center justify-center flex-shrink-0">
                  <sector.icon className="w-7 h-7 text-secondary-foreground" />
                </div>
                <div>
                  <h3 className="font-display text-xl font-semibold mb-2">
                    {sector.title}
                  </h3>
                  <p className="text-muted-foreground mb-4">
                    {sector.description}
                  </p>
                  <ul className="space-y-2">
                    {sector.opportunities.map((opportunity) => (
                      <li
                        key={opportunity}
                        className="flex items-center gap-2 text-sm"
                      >
                        <CheckCircle2 className="w-4 h-4 text-primary" />
                        <span>{opportunity}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* Featured Project */}
      <Section>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <span className="text-sm font-medium text-primary tracking-wider uppercase">
              Featured Opportunity
            </span>
            <h2 className="font-display text-3xl md:text-4xl font-bold mt-2 mb-6">
              Lakeside Resort Development
            </h2>
            <p className="text-muted-foreground text-lg leading-relaxed mb-6">
              We are seeking investment partners for a new luxury eco-resort on
              the shores of Lake Babogaya. This flagship project will feature 50
              rooms, a world-class spa, multiple restaurants, and adventure
              tourism facilities.
            </p>
            <ul className="space-y-3 mb-8">
              {[
                "Premium lakefront location",
                "Projected 15% annual ROI",
                "3-year development timeline",
                "Government-backed tourism zone",
              ].map((item) => (
                <li key={item} className="flex items-center gap-3">
                  <CheckCircle2 className="w-5 h-5 text-primary" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            <Button size="lg" className="gap-2">
              Request Project Details
              <ArrowRight className="w-4 h-4" />
            </Button>
          </div>
          <div>
            <img
              src="/luxury-resort-hotel.jpg"
              alt="Lakeside Resort Project"
              className="rounded-3xl shadow-hover"
            />
          </div>
        </div>
      </Section>

      {/* Contact Form */}
      <Section className="bg-primary text-primary-foreground">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div>
            <span className="text-sm font-medium text-gold-light tracking-wider uppercase">
              Get Started
            </span>
            <h2 className="font-display text-3xl md:text-4xl font-bold mt-2 mb-6">
              Connect With Our Investment Team
            </h2>
            <p className="text-primary-foreground/80 text-lg mb-8">
              Ready to explore investment opportunities in Bishoftu? Our
              dedicated investment team is here to guide you through the
              process.
            </p>
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-primary-foreground/10 flex items-center justify-center">
                  <Phone className="w-5 h-5 text-gold-warm" />
                </div>
                <div>
                  <p className="text-sm text-primary-foreground/60">Phone</p>
                  <p className="font-medium">+251 11 433 0000</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-primary-foreground/10 flex items-center justify-center">
                  <Mail className="w-5 h-5 text-gold-warm" />
                </div>
                <div>
                  <p className="text-sm text-primary-foreground/60">Email</p>
                  <p className="font-medium">invest@gobishoftu.com</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-primary-foreground/10 flex items-center justify-center">
                  <MapPin className="w-5 h-5 text-gold-warm" />
                </div>
                <div>
                  <p className="text-sm text-primary-foreground/60">Office</p>
                  <p className="font-medium">Bishoftu Investment Center</p>
                </div>
              </div>
            </div>
          </div>
          <div className="bg-card text-foreground rounded-2xl p-8">
            <h3 className="font-display text-xl font-semibold mb-6">
              Request Information
            </h3>
            <form className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Input placeholder="First Name" />
                <Input placeholder="Last Name" />
              </div>
              <Input placeholder="Email Address" type="email" />
              <Input placeholder="Company Name" />
              <Input placeholder="Investment Interest (e.g., Hospitality, Real Estate)" />
              <Textarea
                placeholder="Tell us about your investment goals..."
                rows={4}
              />
              <Button className="w-full bg-primary text-primary-foreground">
                Submit Inquiry
              </Button>
            </form>
          </div>
        </div>
      </Section>
    </main>
  );
}
