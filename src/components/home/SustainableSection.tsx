import { Leaf } from "lucide-react";

export function SustainableSection() {
  return (
    <section className="px-4 py-16 md:px-8">
      <div className="mx-auto max-w-5xl">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-2 md:items-start">
          {/* Logo mark */}
          <div className="flex flex-col items-center justify-center gap-3 rounded-xl bg-[#0E7A45]/5 py-12">
            <Leaf className="size-16 text-[#0E7A45]" />
            <span className="text-sm font-semibold tracking-widest text-[#0E7A45] uppercase">
              Sustainable Tourism
            </span>
          </div>

          {/* Copy */}
          <div className="flex flex-col gap-4 leading-relaxed text-slate-600">
            <h2 className="text-2xl font-bold text-[#0F172A]">Sustainable by Design</h2>
            <p>
              Straight2Guide was built around a simple principle: when travel is fair, everyone
              benefits. By connecting travelers directly with local guides, we keep income where it
              belongs — in the communities that make each journey possible.
            </p>
            <p>
              Our model helps guides in less developed regions earn fair pay, plan their own work,
              and invest back into their local economies. It also strengthens conservation: when
              guides depend on healthy ecosystems and protected parks, tourism becomes a reason to
              preserve, not exploit.
            </p>
            <p className="font-medium text-[#0E7A45]">
              Every booking supports people, nature, and the future of travel.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
