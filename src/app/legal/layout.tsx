import Link from "next/link";

const legalLinks = [
  { label: "Terms of Service", href: "/legal/terms" },
  { label: "Privacy Policy", href: "/legal/privacy" },
  { label: "Cookie Policy", href: "/legal/cookies" },
  { label: "Cancellation Policy", href: "/legal/cancellation" },
];

export default function LegalLayout({ children }: { children: React.ReactNode }) {
  return (
    <main className="flex flex-1 flex-col">
      <section className="flex-1 px-4 py-16 md:px-8">
        <div className="mx-auto max-w-5xl">
          <div className="grid grid-cols-1 gap-10 md:grid-cols-[200px_1fr]">
            {/* Sidebar nav */}
            <nav className="flex flex-row flex-wrap gap-2 md:flex-col md:gap-1">
              {legalLinks.map((l) => (
                <Link
                  key={l.href}
                  href={l.href}
                  className="rounded-lg px-3 py-2 text-sm text-slate-600 hover:bg-slate-100 hover:text-[#0E7A45]"
                >
                  {l.label}
                </Link>
              ))}
            </nav>
            {/* Content */}
            <div className="prose prose-slate max-w-none">{children}</div>
          </div>
        </div>
      </section>
    </main>
  );
}
