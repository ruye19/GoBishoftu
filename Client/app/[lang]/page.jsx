// Server Component
import HomeClient from "./home/HomeClient";

export default async function Home({ params }) {
  const { lang } = await params;
  return <HomeClient />;
}
