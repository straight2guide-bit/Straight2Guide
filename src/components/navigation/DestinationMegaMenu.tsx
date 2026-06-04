"use client";

import Link from "next/link";
import { destinationMenu } from "@/config/destinations";

function slugify(name: string) {
  return name.toLowerCase().replace(/\s+/g, "-");
}

interface Props {
  onClose: () => void;
}

export function DestinationMegaMenu({ onClose }: Props) {
  return (
    <div className="p-8 pt-16">
      <div className="grid grid-cols-4 gap-x-6 gap-y-8 lg:grid-cols-7">
        {Object.entries(destinationMenu).map(([continent, destinations]) => (
          <div key={continent}>
            <p className="mb-2 text-xs font-semibold tracking-widest text-white/60 uppercase">
              {continent}
            </p>
            <ul className="flex flex-col gap-1.5">
              {destinations.map((dest) => (
                <li key={dest}>
                  <Link
                    href={`/guides?country=${slugify(dest)}`}
                    className="block text-sm text-white hover:underline"
                    onClick={onClose}
                  >
                    {dest}
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  href={`/explore?continent=${slugify(continent)}`}
                  className="mt-1 block text-xs text-white/50 underline underline-offset-2 hover:text-white/80"
                  onClick={onClose}
                >
                  See all
                </Link>
              </li>
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}
