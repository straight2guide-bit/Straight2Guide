import Link from "next/link";
import Image from "next/image";

const imageMap = {
  guide: { src: "/btn-become-guide.png", alt: "Become a Guide", width: 480, height: 200 },
  explore: { src: "/btn-start-exploring.png", alt: "Start Exploring", width: 300, height: 280 },
} as const;

interface CTAButtonProps {
  icon: keyof typeof imageMap;
  href?: string;
  className?: string;
}

export function CTAButton({ icon, href, className }: CTAButtonProps) {
  const { src, alt, width, height } = imageMap[icon];

  const inner = (
    <Image
      src={src}
      alt={alt}
      width={width}
      height={height}
      className={className ?? "h-16 w-auto transition-opacity hover:opacity-90"}
    />
  );

  if (href) {
    return <Link href={href}>{inner}</Link>;
  }
  return <button type="button">{inner}</button>;
}
