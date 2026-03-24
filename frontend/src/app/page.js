import Hero from "@/components/Hero";
import TrendingGenres from "@/components/TrendingGenres";
import NewArrivals from "@/components/NewArrivals";

export default function HomePage() {
  return ( 
      <main className="space-y-8 md:space-y-10 lg:space-y-12">
        <Hero />
        <TrendingGenres />
        <NewArrivals />
      </main>
  );
}
