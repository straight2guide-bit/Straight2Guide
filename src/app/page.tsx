import { HeroGlobeSearch } from "@/components/home/HeroGlobeSearch";
import { EmpoweringSection } from "@/components/home/EmpoweringSection";
import { OurStorySection } from "@/components/home/OurStorySection";
import { SustainableSection } from "@/components/home/SustainableSection";
import { FeaturedSection } from "@/components/home/FeaturedSection";
import { ReviewsSection } from "@/components/home/ReviewsSection";

// Featured content changes rarely, so pre-render the homepage and refresh it
// at most once an hour (ISR) instead of re-querying Supabase on every visit.
export const revalidate = 3600;

export default function Home() {
  return (
    <main className="flex flex-1 flex-col">
      <HeroGlobeSearch />
      <EmpoweringSection />
      <OurStorySection />
      <SustainableSection />
      <FeaturedSection />
      <ReviewsSection />
    </main>
  );
}
