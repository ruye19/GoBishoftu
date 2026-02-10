import { Geist, Geist_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";
import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";

const _geist = Geist({ subsets: ["latin"] });
const _geistMono = Geist_Mono({ subsets: ["latin"] });

export const metadata = {
  title: "goBishoftu - Luxury Travel & Exploration",
  description:
    "Discover luxury accommodations and cultural experiences in Bishoftu, Ethiopia. Explore stunning natural sites, hot springs, and authentic travel experiences.",
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

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${_geist.className} font-sans antialiased overflow-x-hidden`}>
        <Navigation />
        <main className="pb-20 lg:pb-0">{children}</main>
        <Footer />
        <Analytics />
      </body>
    </html>
  );
}
