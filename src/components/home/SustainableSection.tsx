import { Leaf } from "lucide-react";

export function SustainableSection() {
  return (
    <section className="px-4 py-16 md:px-8">
      <div className="mx-auto max-w-5xl">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-2 md:items-stretch">
          {/* Logo mark */}
          <div className="bg-brand-green/5 flex flex-col items-center justify-center gap-3 rounded-xl py-12">
            <Leaf className="text-brand-green size-16" />
            <span className="text-brand-green text-sm font-semibold tracking-widest uppercase">
              Sustainable Tourism
            </span>
          </div>

          {/* Copy */}
          <div className="flex flex-col gap-4 text-base leading-relaxed text-pretty text-slate-600">
            <h2 className="font-heading text-dark text-3xl font-semibold tracking-tight text-balance md:text-4xl">
              Sustainable by Design
            </h2>
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
            <p className="text-brand-green font-medium">
              Every booking supports people, nature, and the future of travel.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
