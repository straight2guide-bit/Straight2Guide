import Image from "next/image";
import { CTAButton } from "@/components/ui/CTAButton";

const guideBullets = [
  "Fairer Earnings",
  "Manage Bookings",
  "Build Reputation",
  "Flexible Scheduling",
];
const travelerBullets = [
  "Verified Guides",
  "Transparent Pricing",
  "Authentic Experiences",
  "Direct Contact",
  "Positive Impact",
];

export function EmpoweringSection() {
  return (
    <section className="px-4 py-16 md:px-8">
      <div className="mx-auto max-w-5xl">
        <h2 className="mb-2 text-3xl font-bold text-[#0F172A]">
          Empowering Guides, Enriching Travelers
        </h2>
        <p className="mb-10 text-slate-500">
          Fair, authentic, and sustainable journeys — straight to the guide.
        </p>

        <div className="mb-10 grid grid-cols-2 gap-4">
          <div className="relative aspect-[4/3] overflow-hidden rounded-xl">
            <Image
              src="/guide-andean.jpg"
              alt="A local Andean guide in the Peruvian highlands"
              fill
              sizes="(max-width: 768px) 50vw, 480px"
              className="object-cover"
            />
          </div>
          <div className="relative aspect-[4/3] overflow-hidden rounded-xl">
            <Image
              src="/rainbow-mountain-group.jpg"
              alt="Group of travelers at Rainbow Mountain, Peru"
              fill
              sizes="(max-width: 768px) 50vw, 480px"
              className="object-cover"
            />
          </div>
        </div>

        {/* Two columns */}
        <div className="grid grid-cols-1 gap-10 md:grid-cols-2">
          <div className="flex flex-col items-center">
            <h3 className="mb-4 text-lg font-semibold text-[#0E7A45]">For Guides</h3>
            <ul className="mb-6 flex flex-col gap-2">
              {guideBullets.map((b) => (
                <li key={b} className="flex items-center justify-center gap-2 text-slate-600">
                  <span className="h-1.5 w-1.5 flex-shrink-0 rounded-full bg-[#0E7A45]" />
                  {b}
                </li>
              ))}
            </ul>
            <div className="mt-auto flex h-[200px] items-center justify-center">
              <CTAButton
                icon="guide"
                href="/become-a-guide"
                className="h-auto w-64 transition-opacity hover:opacity-90"
              />
            </div>
          </div>
          <div className="flex flex-col items-center">
            <h3 className="mb-4 text-lg font-semibold text-[#0E7A45]">For Travelers</h3>
            <ul className="mb-6 flex flex-col gap-2">
              {travelerBullets.map((b) => (
                <li key={b} className="flex items-center justify-center gap-2 text-slate-600">
                  <span className="h-1.5 w-1.5 flex-shrink-0 rounded-full bg-[#0E7A45]" />
                  {b}
                </li>
              ))}
            </ul>
            <div className="mt-auto flex h-[200px] items-center justify-center">
              <CTAButton
                icon="explore"
                href="/explore"
                className="h-auto w-52 transition-opacity hover:opacity-90"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
