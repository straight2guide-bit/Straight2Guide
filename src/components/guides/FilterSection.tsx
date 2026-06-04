"use client";

import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";

interface FilterSectionProps {
  title: string;
  children: React.ReactNode;
}

export function FilterSection({ title, children }: FilterSectionProps) {
  return (
    <AccordionItem value={title}>
      <AccordionTrigger className="text-foreground py-3 text-sm font-semibold hover:no-underline">
        {title}
      </AccordionTrigger>
      <AccordionContent>
        <div className="flex flex-col gap-2 pb-3">{children}</div>
      </AccordionContent>
    </AccordionItem>
  );
}

interface FilterCheckboxProps {
  id: string;
  label: string;
  checked: boolean;
  onCheckedChange: (checked: boolean) => void;
  disabled?: boolean;
}

export function FilterCheckbox({
  id,
  label,
  checked,
  onCheckedChange,
  disabled,
}: FilterCheckboxProps) {
  return (
    <label
      htmlFor={id}
      className="text-foreground flex cursor-pointer items-center gap-2 text-sm select-none"
    >
      <input
        id={id}
        type="checkbox"
        checked={checked}
        onChange={(e) => onCheckedChange(e.target.checked)}
        disabled={disabled}
        className="accent-brand-green size-4 disabled:cursor-not-allowed disabled:opacity-50"
      />
      {label}
    </label>
  );
}
