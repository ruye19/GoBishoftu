import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import { LanguageProvider } from "@/app/context/LanguageContext";

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

export default async function LangLayout({ children, params }) {
  const { lang } = await params;
  return (
    <LanguageProvider>
      <Navigation />
      <main className="pb-20 lg:pb-0">{children}</main>
      <Footer />
    </LanguageProvider>
  );
}
