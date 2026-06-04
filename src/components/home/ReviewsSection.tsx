const reviews = [
  {
    id: 1,
    quote:
      "An unforgettable experience. Our guide knew every hidden trail in the Pantanal and made the trip feel completely authentic.",
    name: "Sarah Mitchell",
    role: "Wildlife Photographer, USA",
    initials: "SM",
  },
  {
    id: 2,
    quote:
      "Booking directly with a local guide made all the difference. We saw the Big Five in Tanzania without the big-tour-operator crowds.",
    name: "James & Anke van der Berg",
    role: "Travelers, Netherlands",
    initials: "JA",
  },
  {
    id: 3,
    quote:
      "Straight2Guide changed how I think about travel. Fair prices, real connection, and I know my money goes directly to the guide.",
    name: "Priya Kapoor",
    role: "Solo Traveler, India",
    initials: "PK",
  },
];

export function ReviewsSection() {
  return (
    <section className="bg-slate-50 py-16">
      <h2 className="mb-8 px-4 text-2xl font-bold text-[#0F172A] md:px-8">Reviews</h2>
      <div className="flex snap-x gap-6 overflow-x-auto px-4 pb-4 md:px-8">
        {reviews.map((review) => (
          <article
            key={review.id}
            className="w-[280px] max-w-[340px] flex-shrink-0 snap-start rounded-xl border border-slate-100 bg-white p-6 shadow-sm"
          >
            <p className="mb-4 text-sm leading-relaxed text-slate-600">
              &ldquo;{review.quote}&rdquo;
            </p>
            <div className="flex items-center gap-3">
              <div className="flex size-10 flex-shrink-0 items-center justify-center rounded-full bg-[#0E7A45]/10 text-sm font-semibold text-[#0E7A45]">
                {review.initials}
              </div>
              <div>
                <p className="text-sm font-semibold text-[#0F172A]">{review.name}</p>
                <p className="text-xs text-slate-500">{review.role}</p>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
