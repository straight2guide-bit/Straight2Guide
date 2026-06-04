import Image from "next/image";

export function OurStorySection() {
  return (
    <section className="bg-slate-50 px-4 py-16 md:px-8">
      <div className="mx-auto max-w-5xl">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-2 md:items-center">
          <div>
            <h2 className="mb-6 text-2xl font-bold text-[#0F172A]">Our Story &amp; Impact</h2>
            <div className="flex flex-col gap-4 leading-relaxed text-slate-600">
              <p>
                Straight2Guide was born from a simple idea: great travel doesn&apos;t need
                middlemen.
              </p>
              <p>
                We connect travelers directly with trusted, verified local guides — cutting out
                agency fees and uncertainty. This ensures a fair, transparent, and more personal
                travel experience for everyone involved.
              </p>
              <p>
                The result is straightforward: authentic journeys where guides earn more for the
                work they love — and travelers explore with confidence.
              </p>
              <p className="font-medium text-[#0E7A45]">
                We believe fair travel is better travel — for people, communities, and the planet.
              </p>
            </div>
          </div>
          <div className="relative aspect-[4/3] overflow-hidden rounded-xl">
            <Image
              src="/namibia-dunes.jpg"
              alt="Hikers on Namibia sand dunes, Sossusvlei"
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
