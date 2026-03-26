import HeroSection from "@/components/shipping/HeroSection";
import ProcessSection from "@/components/shipping/ProcessSection";
import AccessSection from "@/components/shipping/AccessSection";
import FAQSections from "@/components/shipping/FAQSections";

export default function Page() {
  return (
    <main className="bg-surface text-white min-h-screen">
      <HeroSection />
      <ProcessSection />
      <AccessSection />
      <FAQSections />
    </main>
  );
}
