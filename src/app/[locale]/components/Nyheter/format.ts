// Article dates are plain YYYY-MM-DD; parse as UTC so the day never shifts.
export function formatDato(dato: string | null | undefined, locale: string) {
  if (!dato) return "";
  return new Intl.DateTimeFormat(locale === "en" ? "en-GB" : "nb-NO", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  }).format(new Date(`${dato}T00:00:00Z`));
}

// Card text: the ingress if the editor wrote one, otherwise the start of the article.
export function utdrag(ingress: string | null | undefined, tekst: string | null | undefined, max = 160) {
  if (ingress) return ingress;
  if (!tekst) return "";
  const flat = tekst.replace(/\s+/g, " ").trim();
  if (flat.length <= max) return flat;
  return `${flat.slice(0, flat.lastIndexOf(" ", max)).replace(/[,.;:!?]$/, "")} …`;
}
