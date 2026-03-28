import HeroSection from "@/components/journal/HeroSection";
import FeaturedSection from "@/components/journal/FeaturedSection";
import EssaysSection from "@/components/journal/EssaysSection";
import CollectionsSection from "@/components/journal/CollectionsSection";

export default function JournalPage() {
  return (
    <main className="w-full space-y-6 md:space-y-20 mx-auto bg-surface text-on-surface">
      <HeroSection />
      <FeaturedSection />
      <EssaysSection />
      <CollectionsSection />
    </main>
  );
}