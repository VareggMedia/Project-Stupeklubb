const base =
  "inline-flex cursor-pointer items-center gap-2 rounded-[3px] border border-transparent px-6 py-3.5 text-[15px] font-semibold transition-[translate,background-color,border-color] duration-150 ease-out hover:-translate-y-px";

export const buttonStyles = {
  base,
  primary: `${base} bg-aqua text-ink hover:bg-aqua-light`,
  ghostDark: `${base} border-foam/35 text-foam hover:border-aqua hover:text-aqua`,
  ghostLight: `${base} border-line-light text-ink hover:border-pool hover:text-pool`,
  coral: `${base} bg-coral text-ink hover:animate-coral-pulse`,
};
