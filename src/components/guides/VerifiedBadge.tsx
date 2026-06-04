import { ShieldCheck } from "lucide-react";

interface VerifiedBadgeProps {
  className?: string;
}

// Small "Verified" pill used on guide cards and guide profile pages.
export function VerifiedBadge({ className = "" }: VerifiedBadgeProps) {
  return (
    <span
      className={`inline-flex items-center gap-1 rounded-full bg-[#0E7A45]/10 px-2.5 py-1 text-xs font-semibold text-[#0E7A45] ${className}`}
    >
      <ShieldCheck className="size-3.5" aria-hidden />
      Verified
    </span>
  );
}
