"use client"

import { useState, useMemo } from "react"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"

const accommodations = [
  {
    id: 1,
    name: "Bishoftu Luxury Resort",
    type: "Resort",
    rating: 4.8,
    pricePerNight: 250,
    image: "/luxury-5-star-resort.jpg",
    description: "Premium resort with world-class amenities and stunning views of the Rift Valley.",
    amenities: ["Pool", "Spa", "WiFi", "Restaurant", "Gym"],
    bookingUrl: "https://www.booking.com",
  },
  {
    id: 2,
    name: "Adventure Lodge",
    type: "Lodge",
    rating: 4.6,
    pricePerNight: 180,
    image: "/adventure-lodge-nature.jpg",
    description: "Eco-friendly lodge perfect for explorers seeking authentic experiences.",
    amenities: ["WiFi", "Restaurant", "Tour Desk", "Garden", "Parking"],
    bookingUrl: "https://www.booking.com",
  },
  {
    id: 3,
    name: "Comfort Guest House",
    type: "Guest House",
    rating: 4.4,
    pricePerNight: 80,
    image: "/guest-house-cozy.jpg",
    description: "Welcoming guest house with local charm and warm hospitality.",
    amenities: ["WiFi", "Breakfast", "Parking", "Garden"],
    bookingUrl: "https://www.booking.com",
  },
  {
    id: 4,
    name: "Bishoftu Heights Hotel",
    type: "Hotel",
    rating: 4.5,
    pricePerNight: 150,
    image: "/hotel-modern-architecture.jpg",
    description: "Modern hotel with convenient location and excellent service.",
    amenities: ["WiFi", "Restaurant", "Bar", "Parking", "Room Service"],
    bookingUrl: "https://www.booking.com",
  },
  {
    id: 5,
    name: "Lakeside Retreat",
    type: "Resort",
    rating: 4.7,
    pricePerNight: 220,
    image: "/lakeside-resort-water-view.jpg",
    description: "Serene resort overlooking the scenic lakes of Bishoftu.",
    amenities: ["Pool", "Lake Access", "Spa", "Restaurant", "WiFi"],
    bookingUrl: "https://www.booking.com",
  },
  {
    id: 6,
    name: "Budget Stay Inn",
    type: "Guest House",
    rating: 4.2,
    pricePerNight: 60,
    image: "/budget-friendly-accommodation.jpg",
    description: "Affordable and clean accommodation for budget travelers.",
    amenities: ["WiFi", "Breakfast", "Parking"],
    bookingUrl: "https://www.booking.com",
  },
  {
    id: 7,
    name: "Heritage Hotel",
    type: "Hotel",
    rating: 4.6,
    pricePerNight: 170,
    image: "/heritage-hotel-traditional.jpg",
    description: "Hotel blending modern comfort with traditional Ethiopian style.",
    amenities: ["Restaurant", "WiFi", "Parking", "Business Center"],
    bookingUrl: "https://www.booking.com",
  },
  {
    id: 8,
    name: "Mountain View Lodge",
    type: "Lodge",
    rating: 4.5,
    pricePerNight: 140,
    image: "/placeholder.svg?height=250&width=350",
    description: "Cozy lodge with breathtaking mountain views and hiking access.",
    amenities: ["Restaurant", "Tour Desk", "Parking", "WiFi"],
    bookingUrl: "https://www.booking.com",
  },
]

export default function AccommodationsPage() {
  const [selectedType, setSelectedType] = useState("All")
  const [priceRange, setPriceRange] = useState([0, 300])
  const [minRating, setMinRating] = useState(0)

  const types = ["All", "Hotel", "Guest House", "Resort", "Lodge"]

  const filteredAccommodations = useMemo(() => {
    return accommodations.filter((acc) => {
      const typeMatch = selectedType === "All" || acc.type === selectedType
      const priceMatch = acc.pricePerNight >= priceRange[0] && acc.pricePerNight <= priceRange[1]
      const ratingMatch = acc.rating >= minRating
      return typeMatch && priceMatch && ratingMatch
    })
  }, [selectedType, priceRange, minRating])

  return (
    <>
      <Navigation />
      <main>
        {/* Header */}
        <section className="bg-gradient-to-br from-primary/10 to-accent/5 py-12 md:py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">Accommodations</h1>
            <p className="text-lg text-foreground/70">
              Find your perfect stay in Bishoftu with our curated selection of luxury and comfort options.
            </p>
          </div>
        </section>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Filters Sidebar */}
            <div className="lg:col-span-1">
              <div className="bg-card rounded-xl p-6 shadow-md sticky top-24">
                <h3 className="text-xl font-bold text-foreground mb-6">Filters</h3>

                {/* Type Filter */}
                <div className="mb-8">
                  <h4 className="font-semibold text-foreground mb-3">Type</h4>
                  <div className="space-y-2">
                    {types.map((type) => (
                      <button
                        key={type}
                        onClick={() => setSelectedType(type)}
                        className={`block w-full text-left px-3 py-2 rounded-lg transition-colors ${
                          selectedType === type
                            ? "bg-primary text-primary-foreground font-semibold"
                            : "bg-background text-foreground hover:bg-muted"
                        }`}
                      >
                        {type}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Price Range Filter */}
                <div className="mb-8">
                  <h4 className="font-semibold text-foreground mb-3">Price per Night</h4>
                  <div className="space-y-3">
                    <div>
                      <label className="text-sm text-foreground/70">Min: ${priceRange[0]}</label>
                      <input
                        type="range"
                        min="0"
                        max="300"
                        value={priceRange[0]}
                        onChange={(e) => setPriceRange([Number.parseInt(e.target.value), priceRange[1]])}
                        className="w-full"
                      />
                    </div>
                    <div>
                      <label className="text-sm text-foreground/70">Max: ${priceRange[1]}</label>
                      <input
                        type="range"
                        min="0"
                        max="300"
                        value={priceRange[1]}
                        onChange={(e) => setPriceRange([priceRange[0], Number.parseInt(e.target.value)])}
                        className="w-full"
                      />
                    </div>
                  </div>
                </div>

                {/* Rating Filter */}
                <div>
                  <h4 className="font-semibold text-foreground mb-3">Minimum Rating</h4>
                  <div className="space-y-2">
                    {[0, 3.5, 4.0, 4.5].map((rating) => (
                      <button
                        key={rating}
                        onClick={() => setMinRating(rating)}
                        className={`block w-full text-left px-3 py-2 rounded-lg transition-colors ${
                          minRating === rating
                            ? "bg-primary text-primary-foreground font-semibold"
                            : "bg-background text-foreground hover:bg-muted"
                        }`}
                      >
                        {rating === 0 ? "All Ratings" : `${rating}+ Stars`}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Accommodations Grid */}
            <div className="lg:col-span-3">
              <div className="mb-6 flex justify-between items-center">
                <p className="text-foreground/70">Showing {filteredAccommodations.length} accommodations</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {filteredAccommodations.map((accommodation) => (
                  <div
                    key={accommodation.id}
                    className="bg-card rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300"
                  >
                    <img
                      src={accommodation.image || "/placeholder.svg"}
                      alt={accommodation.name}
                      className="w-full h-48 object-cover"
                    />
                    <div className="p-6">
                      <div className="flex justify-between items-start mb-3">
                        <div>
                          <div className="text-sm font-semibold text-accent mb-1">{accommodation.type}</div>
                          <h3 className="text-lg font-bold text-foreground">{accommodation.name}</h3>
                        </div>
                        <div className="flex items-center gap-1 bg-yellow-50 px-2 py-1 rounded">
                          <span className="text-yellow-500">★</span>
                          <span className="text-sm font-semibold text-foreground">{accommodation.rating}</span>
                        </div>
                      </div>

                      <p className="text-sm text-foreground/70 mb-4">{accommodation.description}</p>

                      <div className="flex flex-wrap gap-2 mb-4">
                        {accommodation.amenities.map((amenity, idx) => (
                          <span key={idx} className="text-xs bg-accent/15 text-accent px-2 py-1 rounded-full">
                            {amenity}
                          </span>
                        ))}
                      </div>

                      <div className="flex justify-between items-center">
                        <div>
                          <span className="text-2xl font-bold text-primary">${accommodation.pricePerNight}</span>
                          <span className="text-sm text-foreground/70">/night</span>
                        </div>
                        <a
                          href={accommodation.bookingUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="px-4 py-2 bg-[oklch(0.62_0.2_50)] text-white rounded-lg font-semibold hover:opacity-90 transition-all text-sm"
                        >
                          Book Now
                        </a>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {filteredAccommodations.length === 0 && (
                <div className="text-center py-12">
                  <p className="text-lg text-foreground/70">
                    No accommodations match your filters. Try adjusting your criteria.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
