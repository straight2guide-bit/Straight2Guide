"use client";

import { Slider as SliderPrimitive } from "@base-ui/react/slider";
import { cn } from "@/lib/utils";

interface SliderProps {
  value: number[];
  onValueChange?: (value: number[]) => void;
  onValueCommitted?: (value: number[]) => void;
  min?: number;
  max?: number;
  step?: number;
  className?: string;
}

export function Slider({
  value,
  onValueChange,
  onValueCommitted,
  min = 0,
  max = 100,
  step = 1,
  className,
}: SliderProps) {
  return (
    <SliderPrimitive.Root
      value={value}
      onValueChange={onValueChange}
      onValueCommitted={onValueCommitted}
      min={min}
      max={max}
      step={step}
      className={cn("relative flex w-full touch-none items-center px-2 py-2", className)}
    >
      <SliderPrimitive.Control className="relative flex w-full items-center">
        <SliderPrimitive.Track className="relative h-1.5 w-full grow overflow-hidden rounded-full bg-slate-200">
          <SliderPrimitive.Indicator className="bg-brand-green absolute h-full" />
        </SliderPrimitive.Track>
        {value.map((_, i) => (
          <SliderPrimitive.Thumb
            key={i}
            className="border-brand-green focus-visible:ring-brand-green block size-4 cursor-grab rounded-full border-2 bg-white shadow transition-colors focus-visible:ring-2 focus-visible:outline-none active:cursor-grabbing disabled:pointer-events-none disabled:opacity-50"
          />
        ))}
      </SliderPrimitive.Control>
    </SliderPrimitive.Root>
  );
}
