import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import { LanguageProvider } from "@/app/context/LanguageContext";

// Structured Data for SEO
const structuredData = {
  "@context": "https://schema.org",
  "@type": "TravelAgency",
  "name": "goBishoftu",
  "description": "Experience the breathtaking beauty of Ethiopia with luxury accommodations, stunning crater lakes, and authentic cultural experiences in Bishoftu.",
  "url": "https://gobishoftu.com",
  "telephone": "+251 (0) 114 300 100",
  "email": "info@gobishoftu.com",
  "address": {
    "@type": "PostalAddress",
    "addressLocality": "Bishoftu",
    "addressCountry": "Ethiopia"
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": "8.7333",
    "longitude": "38.9833"
  },
  "sameAs": [
    "https://facebook.com/gobishoftu",
    "https://instagram.com/gobishoftu", 
    "https://twitter.com/gobishoftu"
  ],
  "offers": {
    "@type": "Offer",
    "itemOffered": {
      "@type": "TouristTrip",
      "name": "Ethiopia Beauty Tour Package",
      "description": "Discover Ethiopia's stunning natural beauty and cultural heritage"
    }
  }
};

export const metadata = {
  title: "goBishoftu - Discover Ethiopia's Beauty | Luxury Travel & Tourism",
  description:
    "Experience the breathtaking beauty of Ethiopia with goBishoftu. Explore luxury accommodations, stunning crater lakes, natural hot springs, and authentic cultural experiences in Bishoftu. Perfect for travelers seeking Ethiopia's hidden gems and world-class hospitality.",
  keywords: [
    "Ethiopia tourism",
    "visit Ethiopia",
    "Ethiopia beauty",
    "Bishoftu travel",
    "Ethiopia hotels",
    "crater lakes Ethiopia",
    "Ethiopia vacation",
    "Addis Ababa tourism",
    "Ethiopia cultural tours",
    "luxury travel Ethiopia",
    "Ethiopia natural beauty",
    "Bishoftu resorts",
    "Ethiopia hot springs",
    "Ethiopia adventure",
    "Ethiopia destinations",
    "travel to Ethiopia",
    "Ethiopia tourism packages",
    "Bishoftu attractions",
    "Ethiopia hospitality"
  ],
  authors: [{ name: "goBishoftu Tourism" }],
  creator: "goBishoftu",
  publisher: "goBishoftu Tourism",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://gobishoftu.com'),
  alternates: {
    canonical: '/',
    languages: {
      'en': '/en',
      'am': '/am', 
      'or': '/or',
    },
  },
  openGraph: {
    title: "goBishoftu - Discover Ethiopia's Beauty",
    description: "Experience Ethiopia's stunning natural beauty, luxury accommodations, and authentic cultural experiences. Your gateway to Bishoftu's crater lakes, hot springs, and world-class hospitality.",
    url: 'https://gobishoftu.com',
    siteName: 'goBishoftu',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Beautiful Bishoftu crater lake in Ethiopia',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: "goBishoftu - Discover Ethiopia's Beauty",
    description: "Experience Ethiopia's stunning natural beauty and luxury travel experiences.",
    images: ['/og-image.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'your-google-verification-code',
  },
  generator: "v0.app",
  icons: {
    icon: [
      {
        url: "/icon-light-32x32.png",
        media: "(prefers-color-scheme: light)",
      },
      {
        url: "/icon-dark-32x32.png",
        media: "(prefers-color-scheme: dark)",
      },
      {
        url: "/icon.svg",
        type: "image/svg+xml",
      },
    ],
    apple: "/apple-icon.png",
  },
};

export default async function LangLayout({ children, params }) {
  const { lang } = await params;
  return (
    <LanguageProvider>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <Navigation />
      <main className="pb-20 lg:pb-0">{children}</main>
      <Footer />
    </LanguageProvider>
  );
}
