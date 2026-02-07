import Link from "next/link";
import landscapeimage from "../public/image.png";
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

export default function Home() {
  const hotels = [
    {
      id: 1,
      name: "Kuriftu Resort & Spa",
      type: "Resort",
      description:
        "Luxury resort with spa, swimming pools, and lakeside views.",
      image: "/kuriftu-resort.jpg",
      link: "/accommodations",
    },
    {
      id: 2,
      name: "Bishoftu Luxury Hotel",
      type: "Hotel",
      description:
        "Comfortable rooms with modern amenities in central Bishoftu.",
      image: "/luxury-hotel.jpg",
      link: "/accommodations",
    },
    {
      id: 3,
      name: "Lake Resort",
      type: "Resort",
      description: "Relaxing lakeside resort perfect for families and couples.",
      image: "/lake-resort.jpg",
      link: "/accommodations",
    },
    {
      id: 4,
      name: "Comfort Guest House",
      type: "Guest House",
      description: "Affordable and cozy stay with friendly staff and services.",
      image: "/comfort-guest-house.jpg",
      link: "/accommodations",
    },
  ];
  const featuredAgencies = [
    {
      id: 1,
      name: "Bishoftu Adventures",
      category: "Tour Operator",
      rating: 4.9,
      image: "/bishoftu-adventures.jpg",
      link: "/explore",
    },
    {
      id: 2,
      name: "Rift Valley Tours",
      category: "Travel Agency",
      rating: 4.7,
      image: "/rift-valley-tours.jpg",
      link: "/explore",
    },
    {
      id: 3,
      name: "Ethiopia Travel Experts",
      category: "Tour Operator",
      rating: 4.8,
      image: "/ethiopia-travel-experts.jpg",
      link: "/explore",
    },
  ];

  const attractions = [
    {
      id: 1,
      name: "Lake Hora",
      category: "Lake",
      description: "Famous crater lake known for Irreecha and scenic views.",
      image: "lakkk.jpg",
      location: "Bishoftu",
      rating: 4.8,
      link: "/explore",
    },
    {
      id: 2,
      name: "Lake Babogaya",
      category: "Lake",
      description: "Popular for resorts, boating, and relaxation.",
      image: "/lake babogaya.jpg",
      location: "Bishoftu",
      rating: 4.7,
      link: "/explore",
    },
    {
      id: 3,
      name: "Debre Zeit St. Gabriel Church",
      category: "Church",
      description: "Historic church overlooking Bishoftu lakes.",
      image: "adadi-maryam-rock-church-ethiopia.jpg",
      location: "Bishoftu",
      rating: 4.6,
      link: "/explore",
    },
    {
      id: 4,
      name: "Local Market Cultural Tour",
      category: "Cultural Site",
      description: "Authentic Ethiopian market experience with local goods.",
      image: "/local-market-cultural-tour.jpg",
      location: "Bishoftu",
      rating: 4.5,
      link: "/explore",
    },
  ];

  // accommodation type data
  const accommodationTypes = [
    {
      name: "Hotels",
      value: "hotel",
      icon: Hotel,
      description: "Full-service hotels with modern amenities",
      count: 15,
      color: "bg-primary/10 text-primary",
    },
    {
      name: "Lodges",
      value: "lodge",
      icon: Building2,
      description: "Nature lodges with scenic lake views",
      count: 12,
      color: "bg-secondary/10 text-secondary",
    },
    {
      name: "Guest House",
      value: "guest-house",
      icon: HomeIcon,
      description: "Cozy stays with local hospitality",
      count: 28,
      color: "bg-accent/10 text-accent-foreground",
    },
    {
      name: "Resort",
      value: "Resort",
      icon: TentTree,
      description: "Luxury resorts with spa and recreational facilities",
      count: 18,
      color: "bg-terracotta/10 text-terracotta",
    },
  ];

  return (
    <>
      <main>
        {/* Hero Section */}
        <section className="relative py-20 md:py-32 bg-gradient-to-br from-background via-background to-primary/5">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <div>
                <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6 leading-tight">
                  Discover the Soul of Ethiopia/Bishoftu
                </h1>
                <p className="text-lg text-foreground/70 mb-8 leading-relaxed">
                  Experience luxury and adventure in Bishoftu. Explore stunning
                  natural wonders, ancient cultural sites, and authentic
                  Ethiopian hospitality. Your journey to unforgettable memories
                  starts here.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Link
                    href="/accommodations"
                    className="px-8 py-3 bg-[#D4AF37] text-[#123845] rounded-lg font-semibold hover:shadow-lg hover:opacity-90 transition-all text-center"
                  >
                    Browse Accommodations
                  </Link>
                  <Link
                    href="/explore"
                    className="px-8 py-3 border-2 border-[#123845] text-[#123845] rounded-lg font-semibold hover:bg-[#123845]/10 transition-all text-center"
                  >
                    Explore Sites
                  </Link>
                </div>
              </div>
              <div className="relative h-80 md:h-96 rounded-xl overflow-hidden shadow-2xl">
                <img
                  src={landscapeimage.src}
                  alt="Bishoftu landscape"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Featured Places */}
        <section className="py-12 md:py-24 bg-background">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                Hotels & Resorts
              </h2>
              <p className="text-lg text-foreground/70">
                Top places to stay for a comfortable Bishoftu experience
              </p>
            </div>

            {/* Accommodation Type Cards */}
            <section className="section-padding bg-background">
              <div className="container-custom px-4">
                <div className="grid grid-cols-4 md:grid-cols-4 gap-4 md:gap-4">
                  {accommodationTypes.map((type) => (
                    <Link
                      key={type.name}
                      href={`/accommodations?type=${type.value}`}
                    >
                      <div className="card-tourism group cursor-pointer bg-card rounded-lg">
                        <div className="p-6 text-center">
                          <div
                            className={`w-16 h-16 rounded-full ${type.color} flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform`}
                          >
                            <type.icon className="w-8 h-8" />
                          </div>
                          <h3 className="font-serif text-xl font-semibold text-foreground mb-2">
                            {type.name}
                          </h3>
                          {/* <p className="text-muted-foreground text-sm mb-3">
                            {type.description}
                          </p>
                          <span className="text-primary font-medium text-sm">
                            {type.count} listings
                          </span> */}
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            </section>

            {/* Mobile: horizontal scrollable list */}
            <div className="md:hidden -mx-4 px-4">
              <div className="flex gap-4 overflow-x-auto snap-x snap-mandatory pb-4 scrollbar-hide">
                {hotels.map((hotel) => (
                  <div
                    key={hotel.id}
                    className="flex-shrink-0 w-[300px] snap-start"
                  >
                    <div className="bg-card rounded-xl overflow-hidden shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                      <img
                        src={hotel.image || "/placeholder.svg"}
                        alt={hotel.name}
                        className="w-full h-40 object-cover"
                      />
                      <div className="p-6">
                        <div className="text-sm font-semibold text-primary mb-2">
                          {hotel.type}
                        </div>
                        <h3 className="text-xl font-bold text-foreground mb-2">
                          {hotel.name}
                        </h3>
                        <p className="text-sm text-foreground/70 leading-relaxed">
                          {hotel.description}
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
                  className="bg-card rounded-xl overflow-hidden shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
                >
                  <img
                    src={hotel.image || "/placeholder.svg"}
                    alt={hotel.name}
                    className="w-full h-40 object-cover"
                  />
                  <div className="p-6">
                    <div className="text-sm font-semibold text-primary mb-2">
                      {hotel.type}
                    </div>
                    <h3 className="text-xl font-bold text-foreground mb-2">
                      {hotel.name}
                    </h3>
                    <p className="text-sm text-foreground/70 leading-relaxed">
                      {hotel.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <div className="text-center my-2">
          <Link
            href="/accommodations"
            className="px-8 py-3 my-3 bg-[#D4AF37] text-[#123845] rounded-lg font-semibold hover:shadow-lg hover:opacity-90 transition-all inline-block"
          >
            Explore All Accommodations
          </Link>
        </div>

        {/* Featured Attraction */}
        {/* Attractions */}
        <section className="py-5 bg-background">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-10">
              <h2 className="text-3xl font-bold text-foreground mb-2">
                Top Attractions
              </h2>
              <p className="text-foreground/70">
                Explore Bishoftu’s lakes, culture, and natural beauty
              </p>
            </div>

            {/* ✅ Mobile: horizontal scroll */}
            <div className="md:hidden -mx-4 px-4">
              <div className="flex gap-4 overflow-x-auto snap-x snap-mandatory pb-4 scrollbar-hide">
                {attractions.map((item) => (
                  <div
                    key={item.id}
                    tabIndex={0}
                    className="
                      min-w-[260px]
                      snap-start
                      bg-card
                      rounded-xl
                      overflow-hidden
                      shadow-md
                      transition-all
                      duration-300

                      hover:shadow-xl
                      hover:-translate-y-1

                      focus-within:shadow-xl
                      focus-within:-translate-y-1
                      focus-within:ring-2
                      focus-within:ring-primary
                      focus-within:ring-offset-2

                      active:shadow-xl
                    "
                  >
                    <img
                      src={item.image}
                      alt={item.name}
                      className="h-40 w-full object-cover"
                    />
                    <div className="p-4">
                      <div className="flex justify-between text-sm text-muted-foreground mb-1">
                        <span>{item.location}</span>
                        <span className="text-yellow-500">★ {item.rating}</span>
                      </div>
                      <h3 className="font-bold text-lg mb-2">{item.name}</h3>
                      <p className="text-sm text-foreground/70 mb-3">
                        {item.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* ✅ Desktop: grid */}
            <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {attractions.map((item) => (
                <div
                  key={item.id}
                  className="bg-card rounded-xl overflow-hidden shadow-md hover:shadow-xl hover:-translate-y-1 transition-all"
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    className="h-48 w-full object-cover"
                  />
                  <div className="p-6">
                    <div className="flex justify-between text-sm text-muted-foreground mb-2">
                      <span className="flex items-center gap-1">
                        <MapPin className="w-4 h-4" /> {item.location}
                      </span>
                      <span className="text-yellow-500">★ {item.rating}</span>
                    </div>
                    <h3 className="text-xl font-bold mb-3">{item.name}</h3>
                    <p className="text-sm text-foreground/70 mb-4">
                      {item.description}
                    </p>
                    <Link
                      href={item.link}
                      className="inline-flex items-center gap-2 text-primary font-semibold hover:underline"
                    >
                      Explore <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                </div>
              ))}
            </div>

            <div className="text-center mt-10">
              <Link
                href="/explore"
                className="px-8 py-3 bg-[#D4AF37] text-[#123845] rounded-lg font-semibold hover:shadow-lg transition-all inline-block"
              >
                View All Attractions
              </Link>
            </div>
          </div>
        </section>

        {/* About Us Section */}
        <section className="py-8 flex items-center justify-center bg-background/">
          <div className="max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              About Us
            </h2>
            <p className="text-lg text-foreground/70 leading-relaxed">
              Discover the heart of Ethiopia's lake city, where volcanic wonders
              meet rich Oromo heritage and boundless opportunities.
            </p>
            <div className="mt-6">
              <Link
                href="/about"
                className="text-primary font-semibold hover:underline"
              >
                See more →
              </Link>
            </div>
          </div>
        </section>

        <section className="py-8 md:py-12 bg-secondary/30">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                Top Tour & Travel Agencies
              </h2>
              <p className="text-lg text-foreground/70">
                Reliable agencies to plan your perfect Bishoftu experience
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {featuredAgencies.map((agency) => (
                <div
                  key={agency.id}
                  className="bg-card rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300"
                >
                  <img
                    src={agency.image || "/placeholder.svg"}
                    alt={agency.name}
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-6">
                    <div className="flex justify-between items-start mb-3">
                      <div className="text-sm font-semibold text-accent">
                        {agency.category}
                      </div>
                      <div className="flex items-center gap-1">
                        <span className="text-yellow-500">★</span>
                        <span className="text-sm font-semibold text-foreground">
                          {agency.rating}
                        </span>
                      </div>
                    </div>
                    <h3 className="text-xl font-bold text-foreground mb-4">
                      {agency.name}
                    </h3>
                    <Link
                      href={agency.link}
                      className="inline-block px-4 py-2 bg-primary/10 text-primary rounded-lg font-semibold hover:bg-primary hover:text-primary-foreground transition-all"
                    >
                      Visit Agency
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* </div>
        </section> */}
      </main>
    </>
  );
}
