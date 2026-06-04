import { HeroGlobeSearch } from "@/components/home/HeroGlobeSearch";
import { EmpoweringSection } from "@/components/home/EmpoweringSection";
import { OurStorySection } from "@/components/home/OurStorySection";
import { SustainableSection } from "@/components/home/SustainableSection";
import { ReviewsSection } from "@/components/home/ReviewsSection";

export default function Home() {
  return (
    <main className="flex flex-1 flex-col">
      <HeroGlobeSearch />
      <EmpoweringSection />
      <OurStorySection />
      <SustainableSection />
      <ReviewsSection />
    </main>
  );
}
