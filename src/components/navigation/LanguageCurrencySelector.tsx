export function LanguageCurrencySelector() {
  return (
    <div className="flex items-center gap-2 px-4 py-3 text-sm text-white">
      <svg
        width="20"
        height="14"
        viewBox="0 0 20 14"
        aria-label="UK flag"
        role="img"
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect width="20" height="14" fill="#012169" />
        {/* White diagonals */}
        <path d="M0 0L20 14M20 0L0 14" stroke="white" strokeWidth="3" />
        {/* Red diagonals */}
        <path d="M0 0L20 14M20 0L0 14" stroke="#C8102E" strokeWidth="1.5" />
        {/* White cross */}
        <path d="M10 0V14M0 7H20" stroke="white" strokeWidth="4" />
        {/* Red cross */}
        <path d="M10 0V14M0 7H20" stroke="#C8102E" strokeWidth="2.4" />
      </svg>
      <span>ENG</span>
      <span className="mx-1 text-white/30">|</span>
      <span>EUR</span>
    </div>
  );
}
