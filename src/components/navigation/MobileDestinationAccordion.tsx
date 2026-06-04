"use client";

import Link from "next/link";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { destinationMenu } from "@/config/destinations";

function slugify(name: string) {
  return name.toLowerCase().replace(/\s+/g, "-");
}

export function MobileDestinationAccordion() {
  return (
    <Accordion className="w-full">
      {Object.entries(destinationMenu).map(([continent, destinations]) => (
        <AccordionItem key={continent} value={continent} className="border-white/20">
          <AccordionTrigger className="px-4 text-sm font-medium tracking-wide text-white uppercase">
            {continent}
          </AccordionTrigger>
          <AccordionContent>
            <ul className="flex flex-col gap-1 px-4 pb-2">
              {destinations.map((dest) => (
                <li key={dest}>
                  <Link
                    href={`/guides?country=${slugify(dest)}`}
                    className="block py-0.5 text-sm text-white/80 hover:text-white"
                  >
                    {dest}
                  </Link>
                </li>
              ))}
            </ul>
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
}
