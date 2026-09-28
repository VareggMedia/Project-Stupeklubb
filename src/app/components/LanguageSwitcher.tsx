function NorwegianFlag() {
  return (
    <svg viewBox="0 0 22 16" aria-hidden="true" className="block h-4 w-5.5">
      <rect width="22" height="16" rx="1" fill="#BA0C2F" />
      <path d="M0 6h22v4H0zM6 0h4v16H6z" fill="#fff" />
      <path d="M0 7h22v2H0zM7 0h2v16H7z" fill="#00205B" />
    </svg>
  );
}

function BritishFlag() {
  return (
    <svg viewBox="0 0 22 16" aria-hidden="true" className="block h-4 w-5.5">
      <rect width="22" height="16" rx="1" fill="#012169" />
      <path d="m0 0 22 16m0-16L0 16" stroke="#fff" strokeWidth="4" />
      <path d="m0 0 22 16m0-16L0 16" stroke="#C8102E" strokeWidth="1.5" />
      <path d="M11 0v16M0 8h22" stroke="#fff" strokeWidth="5" />
      <path d="M11 0v16M0 8h22" stroke="#C8102E" strokeWidth="2.5" />
    </svg>
  );
}

function handleLanguageChange() {
  // TODO: Connect the language switcher when locale routing is implemented.
}

const optionStyles =
  "inline-flex cursor-pointer appearance-none items-center justify-center border-0 bg-transparent p-0 transition-opacity duration-150 ease-out";

export default function LanguageSwitcher() {
  return (
    <div
      className="inline-flex min-h-7 items-center gap-2.5"
      role="group"
      aria-label="Språk"
    >
      <button
        type="button"
        className={`${optionStyles} opacity-100`}
        title="Norsk bokmål"
        aria-pressed="true"
        onClick={handleLanguageChange}
      >
        <NorwegianFlag />
      </button>
      <button
        type="button"
        className={`${optionStyles} opacity-20 hover:opacity-60`}
        title="English"
        aria-pressed="false"
        onClick={handleLanguageChange}
      >
        <BritishFlag />
      </button>
    </div>
  );
}
