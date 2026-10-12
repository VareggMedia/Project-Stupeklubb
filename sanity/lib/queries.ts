import { defineQuery } from "next-sanity";

const BILDE = `{ alt, hotspot, crop, asset->{ _id, metadata { lqip, dimensions { width, height } } } }`;

// All published articles, newest first; `utdrag` is the plain text for the card excerpt.
export const NYHETER_QUERY = defineQuery(`*[_type == "nyhet" && defined(slug.current)] | order(dato desc, _createdAt desc) {
  _id,
  tittel,
  "slug": slug.current,
  dato,
  ingress,
  "utdrag": pt::text(innhold),
  hovedbilde ${BILDE}
}`);

export const NYHET_QUERY = defineQuery(`*[_type == "nyhet" && slug.current == $slug][0] {
  _id,
  tittel,
  "slug": slug.current,
  dato,
  ingress,
  innhold,
  hovedbilde ${BILDE},
  bilder[] { _key, bildetekst, alt, hotspot, crop, asset->{ _id, metadata { lqip, dimensions { width, height } } } }
}`);

export const NYHET_SLUGS_QUERY = defineQuery(
  `*[_type == "nyhet" && defined(slug.current)] { "slug": slug.current }`,
);
