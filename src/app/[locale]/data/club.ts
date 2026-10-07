// Texts live in messages/{locale}.json; this file keeps structure only.

// Testimonial quotes: "Testimonials.{key}"
export const TESTIMONIALS = [
  { key: "isak", name: "Isak", age: 14 },
  { key: "varin", name: "Vårin", age: 32 },
  { key: "julie", name: "Julie", age: 21 },
  { key: "synne", name: "Synne", age: 12 },
] as const;

export const SPONSORS = [
  { name: "Zur Hår & Rubb", image: "/images/sponsor_img/zurhaar.png" },
  { name: "Beerenberg", image: "/images/sponsor_img/beerenberg.png" },
  { name: "OBOS", image: "/images/sponsor_img/obos.png" },
  { name: "Rehab.shop", image: "/images/sponsor_img/rehab_shop.png" },
];

// The two "doors" on the front page, reused by the navbar and footer.
// Labels: "Nav.{key}"; eyebrow and links: "Doors.{key}".
export const DOORS = {
  new: {
    key: "join",
    href: "/bli-med",
    links: [
      { key: "courses", href: "/bli-med#kurs" },
      { key: "prices", href: "/bli-med#priser" },
      { key: "firstTime", href: "/bli-med#forste-gang" },
      { key: "registration", href: "/bli-med#pamelding" },
    ],
  },
  members: {
    key: "members",
    href: "/for-medlemmer",
    links: [
      { key: "schedule", href: "/for-medlemmer#treningstider" },
      { key: "events", href: "/for-medlemmer#stevner" },
      { key: "results", href: "/for-medlemmer#resultater" },
      { key: "practical", href: "/for-medlemmer#praktisk" },
    ],
  },
} as const;

// Labels: "Nav.{key}"
export const NAV_LINKS = [
  { key: DOORS.new.key, href: DOORS.new.href },
  { key: DOORS.members.key, href: DOORS.members.href },
  { key: "news", href: "/nyheter" },
  { key: "about", href: "/om-klubben" },
  { key: "contact", href: "/kontakt" },
] as const;
