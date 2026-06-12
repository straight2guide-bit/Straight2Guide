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
    <section className="px-4 py-16 md:px-8">
      <div className="mx-auto max-w-6xl">
        <div className="mb-8">
          <p className="text-brand-green mb-3 text-xs font-semibold tracking-[0.18em] uppercase">
            Loved by travelers
          </p>
          <h2 className="font-heading text-dark text-3xl font-semibold tracking-tight md:text-4xl">
            Reviews
          </h2>
        </div>
        <div className="flex snap-x gap-6 overflow-x-auto pb-4">
          {reviews.map((review) => (
            <article
              key={review.id}
              className="w-[280px] max-w-[340px] flex-shrink-0 snap-start rounded-xl border border-slate-200 bg-white p-6 shadow-sm"
            >
              <p className="mb-5 text-base leading-relaxed text-pretty text-slate-700">
                &ldquo;{review.quote}&rdquo;
              </p>
              <div className="flex items-center gap-3">
                <div className="bg-brand-green/10 text-brand-green flex size-10 flex-shrink-0 items-center justify-center rounded-full text-sm font-semibold">
                  {review.initials}
                </div>
                <div>
                  <p className="text-dark text-sm font-semibold">{review.name}</p>
                  <p className="text-xs text-slate-500">{review.role}</p>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
