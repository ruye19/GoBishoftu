import Link from "next/link"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import landscapeimage from "../public/image.png"

export default function Home() {
  // const hotels = [
  //   {
  //     id: 1,
  //     name: "Blue Nile Falls",
  //     type: "Natural Wonder",
  //     description: 'Majestic waterfall cascading 45 meters, known as the "Smoking Water" by locals.',
  //     image: "/blue-nile-falls-waterfall-ethiopia.jpg",
  //     link: "#",
  //   },
  //   {
  //     id: 2,
  //     name: "Adadi Maryam",
  //     type: "Historical Site",
  //     description: "Ancient rock-hewn church carved from volcanic stone, a sacred pilgrimage site.",
  //     image: "/adadi-maryam-rock-church-ethiopia.jpg",
  //     link: "#",
  //   },
  //   {
  //     id: 3,
  //     name: "Bishoftu Hot Springs",
  //     type: "Spa & Wellness",
  //     description: "Natural geothermal springs perfect for relaxation and wellness retreats.",
  //     image: "/hot-springs-geothermal-bath.jpg",
  //     link: "#",
  //   },
  //   {
  //     id: 4,
  //     name: "Mount Ziquala",
  //     type: "Adventure",
  //     description: "Challenging trek with stunning panoramic views of the Rift Valley.",
  //     image: "/mountain-rift-valley-landscape.jpg",
  //     link: "#",
  //   },
  // ]
const hotels = [
  {
    id: 1,
    name: "Kuriftu Resort & Spa",
    type: "Resort",
    description: "Luxury resort with spa, swimming pools, and lakeside views.",
    image: "/kuriftu-resort.jpg",
    link: "/accommodations/kuriftu",
  },
  {
    id: 2,
    name: "Bishoftu Luxury Hotel",
    type: "Hotel",
    description: "Comfortable rooms with modern amenities in central Bishoftu.",
    image: "/luxury-hotel.jpg",
    link: "/accommodations/bishoftu-luxury",
  },
  {
    id: 3,
    name: "Lake Resort",
    type: "Resort",
    description: "Relaxing lakeside resort perfect for families and couples.",
    image: "/lake-resort.jpg",
    link: "/accommodations/lake-resort",
  },
  {
    id: 4,
    name: "Comfort Guest House",
    type: "Guest House",
    description: "Affordable and cozy stay with friendly staff and services.",
    image: "/comfort-guest-house.jpg",
    link: "/accommodations/comfort-guest-house",
  },
];
const featuredAgencies = [
  {
    id: 1,
    name: "Bishoftu Adventures",
    category: "Tour Operator",
    rating: 4.9,
    image: "/bishoftu-adventures.jpg",
    link: "/agencies/bishoftu-adventures"
  },
  {
    id: 2,
    name: "Rift Valley Tours",
    category: "Travel Agency",
    rating: 4.7,
    image: "/rift-valley-tours.jpg",
    link: "/agencies/rift-valley-tours"
  },
  {
    id: 3,
    name: "Ethiopia Travel Experts",
    category: "Tour Operator",
    rating: 4.8,
    image: "/ethiopia-travel-experts.jpg",
    link: "/agencies/ethiopia-travel-experts"
  }
];

  // const featuredCompanies = [
  //   {
  //     id: 1,
  //     name: "Bishoftu Luxury Resort",
  //     category: "Resort",
  //     rating: 4.8,
  //     image: "/luxury-resort-hotel.jpg",
  //   },
  //   {
  //     id: 2,
  //     name: "Adventure Lodge",
  //     category: "Lodge",
  //     rating: 4.6,
  //     image: "/adventure-lodge-accommodation.jpg",
  //   },
  //   {
  //     id: 3,
  //     name: "Comfort Guest House",
  //     category: "Guest House",
  //     rating: 4.4,
  //     image: "/guest-house-traditional.jpg",
  //   },
  // ]

  return (
    <>
      <Navigation />
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
                  Experience luxury and adventure in Bishoftu. Explore stunning natural wonders, ancient cultural sites,
                  and authentic Ethiopian hospitality. Your journey to unforgettable memories starts here.
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
        
        {/* About Us Section */}
<section className="min-h-screen flex items-center justify-center bg-background/50">
  <div className="max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
    <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">About Us</h2>
    <p className="text-lg text-foreground/70 leading-relaxed">
      At Bishoftu Explorer, we connect travelers with the best hotels, resorts, and travel agencies in Bishoftu.
      Our mission is to make planning your trip easy, reliable, and unforgettable. Discover comfort, adventure, and
      authentic Ethiopian hospitality all in one platform.
    </p>
    <h4 className="text-center my-4">
      "WE CAN PUT OUR MAJOR PARTNERS HERE"
    </h4>
  </div>
  
    

</section>


        {/* Featured Places */}
        <section className="py-16 md:py-24 bg-background">
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div className="text-center mb-16">
      <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Hotels & Resorts</h2>
      <p className="text-lg text-foreground/70">Top places to stay for a comfortable Bishoftu experience</p>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {hotels.map((hotel) => (
        <div
          key={hotel.id}
          className="bg-card rounded-xl overflow-hidden shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
        >
          <img src={hotel.image || "/placeholder.svg"} alt={hotel.name} className="w-full h-40 object-cover" />
          <div className="p-6">
            <div className="text-sm font-semibold text-primary mb-2">{hotel.type}</div>
            <h3 className="text-xl font-bold text-foreground mb-2">{hotel.name}</h3>
            <p className="text-sm text-foreground/70 leading-relaxed">{hotel.description}</p>
          </div>
        </div>
      ))}
    </div>
  </div>
</section>

  <div className="text-center my-12">
              <Link
                href="/accommodations"
                className="px-8 py-3 my-3 bg-[#D4AF37] text-[#123845] rounded-lg font-semibold hover:shadow-lg hover:opacity-90 transition-all inline-block"
              >
                Explore All Accommodations
              </Link>
            </div>

        {/* <section className="py-16 md:py-24 bg-background">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Iconic Destinations</h2>
              <p className="text-lg text-foreground/70">Must-visit attractions that define the Bishoftu experience</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {featuredPlaces.map((place) => (
                <div
                  key={place.id}
                  className="bg-card rounded-xl overflow-hidden shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
                >
                  <img src={place.image || "/placeholder.svg"} alt={place.name} className="w-full h-40 object-cover" />
                  <div className="p-6">
                    <div className="text-sm font-semibold text-primary mb-2">{place.type}</div>
                    <h3 className="text-xl font-bold text-foreground mb-2">{place.name}</h3>
                    <p className="text-sm text-foreground/70 leading-relaxed">{place.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section> */}

        {/* Featured Companies */}


        {/* <section className="py-16 md:py-24 bg-secondary/30">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Featured Accommodations</h2>
              <p className="text-lg text-foreground/70">Handpicked luxury stays for your Bishoftu adventure</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {featuredCompanies.map((company) => (
                <div
                  key={company.id}
                  className="bg-card rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300"
                >
                  <img
                    src={company.image || "/placeholder.svg"}
                    alt={company.name}
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-6">
                    <div className="flex justify-between items-start mb-3">
                      <div className="text-sm font-semibold text-accent">{company.category}</div>
                      <div className="flex items-center gap-1">
                        <span className="text-yellow-500">★</span>
                        <span className="text-sm font-semibold text-foreground">{company.rating}</span>
                      </div>
                    </div>
                    <h3 className="text-xl font-bold text-foreground mb-4">{company.name}</h3>
                    <Link
                      href="/accommodations"
                      className="inline-block px-4 py-2 bg-primary/10 text-primary rounded-lg font-semibold hover:bg-primary hover:text-primary-foreground transition-all"
                    >
                      Learn More
                    </Link>
                  </div>
                </div>
              ))}
            </div> */}
<section className="py-16 md:py-24 bg-secondary/30">
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div className="text-center mb-16">
      <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Top Tour & Travel Agencies</h2>
      <p className="text-lg text-foreground/70">Reliable agencies to plan your perfect Bishoftu experience</p>
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
              <div className="text-sm font-semibold text-accent">{agency.category}</div>
              <div className="flex items-center gap-1">
                <span className="text-yellow-500">★</span>
                <span className="text-sm font-semibold text-foreground">{agency.rating}</span>
              </div>
            </div>
            <h3 className="text-xl font-bold text-foreground mb-4">{agency.name}</h3>
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
      <Footer />
    </>
  )
}
