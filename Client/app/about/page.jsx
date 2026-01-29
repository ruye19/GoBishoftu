import Link from "next/link";
import Image from "next/image";
import horaLake from "@/public/arsedi.jpg"; //replace with real pic later
import cultureCoffee from "@/public/culture-coffee.jpg";
import { MapPin, Users, Leaf, History, Target, Heart } from "lucide-react";
import { Section, SectionHeader } from "@/components/ui/section";

const stats = [
  { value: "7", label: "Crater Lakes" },
  { value: "47km", label: "From Addis Ababa" },
  { value: "2,000m", label: "Elevation" },
  { value: "100k+", label: "Annual Visitors" },
];

const values = [
  {
    icon: Leaf,
    title: "Sustainable Tourism",
    description:
      "We are committed to preserving our natural lakes and ecosystems for future generations.",
  },
  {
    icon: Users,
    title: "Community First",
    description:
      "Tourism that benefits local communities, creates jobs, and celebrates our heritage.",
  },
  {
    icon: Heart,
    title: "Authentic Experiences",
    description:
      "We offer genuine connections with Oromo culture, traditions, and warm hospitality.",
  },
];

const timeline = [
  {
    year: "Ancient",
    title: "Volcanic Origins",
    description:
      "The crater lakes were formed by volcanic activity thousands of years ago.",
  },
  {
    year: "1940s",
    title: "Debre Zeit Founded",
    description:
      "The modern city was established, initially as an air force base.",
  },
  {
    year: "2000s",
    title: "Tourism Growth",
    description:
      "The region gained recognition as a prime tourism destination.",
  },
  {
    year: "Today",
    title: "Bishoftu Rising",
    description:
      "Renamed to Bishoftu, the city is now a hub for tourism and investment.",
  },
];

export default function AboutPage() {
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
              About Us
            </span>
            <h1 className="font-display text-4xl md:text-6xl font-bold text-primary-foreground mb-6">
              The Story of <span className="text-gold-warm">Bishoftu</span>
            </h1>
            <p className="text-lg text-primary-foreground/90 max-w-2xl mx-auto">
              Discover the heart of Ethiopia's lake city, where volcanic wonders
              meet rich Oromo heritage and boundless opportunities.
            </p>
          </div>
        </section>

        <section className="bg-primary text-primary-foreground py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
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
          </div>
        </section>

        {/* Main About Content */}
        <Section>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <SectionHeader
                subtitle="Our Story"
                title="Where Nature Meets Culture"
                align="left"
                className="mb-8"
              />
              <div className="space-y-6 text-muted-foreground">
                <p className="text-lg leading-relaxed">
                  Bishoftu, formerly known as Debre Zeit, sits majestically in
                  the East Shewa Zone of Ethiopia's Oromia Region. Located just
                  47 kilometers southeast of Addis Ababa, this highland city
                  rises to an elevation of nearly 1,920 meters above sea level.
                </p>
                <p className="leading-relaxed">
                  The city is renowned for its seven stunning crater lakes, each
                  with its own unique character and beauty. These volcanic
                  lakes—including the famous Hora, Bishoftu, Babogaya, and
                  Kuriftu—were formed by volcanic activity and have become
                  sacred sites for the Oromo people.
                </p>
                <p className="leading-relaxed">
                  Today, Bishoftu stands as a testament to Ethiopia's tourism
                  potential, offering visitors a unique blend of natural beauty,
                  cultural richness, and modern amenities. From luxury lakeside
                  resorts to traditional coffee ceremonies, the city provides an
                  authentic Ethiopian experience just a short drive from the
                  capital.
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
                  Gateway to Oromia
                </h4>
                <p className="text-sm text-muted-foreground">
                  A cultural and economic hub of the Oromo people
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
                subtitle="Culture & Heritage"
                title="Rich Oromo Traditions"
                align="left"
                className="mb-8"
              />
              <div className="space-y-6 text-muted-foreground">
                <p className="text-lg leading-relaxed">
                  The Oromo people have called this region home for centuries,
                  and their traditions remain vibrant and alive. Lake Hora
                  serves as the sacred site for the annual Irreecha festival,
                  where millions gather to give thanks to Waaqa (God) and
                  celebrate the end of the rainy season.
                </p>
                <p className="leading-relaxed">
                  The traditional coffee ceremony, or "Buna," is a cornerstone
                  of Ethiopian hospitality. Visitors to Bishoftu can experience
                  this beautiful ritual, where freshly roasted coffee is
                  prepared and served with popcorn and incense, symbolizing
                  welcome and friendship.
                </p>
                <p className="leading-relaxed">
                  From traditional music and dance to artisanal crafts and
                  cuisine, Bishoftu offers an authentic window into one of
                  Africa's most fascinating cultures.
                </p>
              </div>
            </div>
          </div>
        </Section>

        {/* Timeline */}
        <Section>
          <SectionHeader
            subtitle="History"
            title="Journey Through Time"
            description="From ancient volcanic origins to modern tourism hub"
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

        {/* Vision & Values */}
        <Section className="bg-primary text-primary-foreground">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <Target className="w-8 h-8 text-gold-warm" />
                <span className="text-sm font-medium tracking-wider uppercase text-gold-light">
                  Our Vision
                </span>
              </div>
              <h2 className="font-display text-3xl md:text-4xl font-bold mb-6">
                Building Ethiopia's Premier Tourist Destination
              </h2>
              <p className="text-primary-foreground/80 text-lg leading-relaxed mb-6">
                We envision Bishoftu as a world-class tourism destination that
                showcases the best of Ethiopian natural beauty, culture, and
                hospitality while driving sustainable economic growth for local
                communities.
              </p>
              <p className="text-primary-foreground/80 leading-relaxed">
                Through strategic investment, infrastructure development, and
                community engagement, we are working to unlock the full
                potential of our crater lakes and heritage sites for visitors
                from around the globe.
              </p>
            </div>
            <div>
              <History className="w-8 h-8 text-gold-warm mb-4" />
              <h3 className="font-display text-2xl font-bold mb-6">
                Our Values
              </h3>
              <div className="space-y-6">
                {values.map((value) => (
                  <div key={value.title} className="flex gap-4">
                    <div className="w-12 h-12 rounded-xl bg-primary-foreground/10 flex items-center justify-center flex-shrink-0">
                      <value.icon className="w-6 h-6 text-gold-warm" />
                    </div>
                    <div>
                      <h4 className="font-semibold mb-1">{value.title}</h4>
                      <p className="text-primary-foreground/70 text-sm">
                        {value.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Section>
      </main>
    </>
  );
}
