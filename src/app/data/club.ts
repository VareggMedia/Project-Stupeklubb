export const TESTIMONIALS = [
  {
    quote:
      "Jeg synes det er kjempekult å drive med stuping, og jeg trives så godt i klubben.",
    name: "Isak",
    detail: "14 år",
  },
  {
    quote:
      "Det er sinnsykt gøy å være en del av dette miljøet. For meg har stuping blitt en mental balsam hver eneste uke.",
    name: "Vårin",
    detail: "32 år",
  },
  {
    quote:
      "Klubben er en familie — jeg har kjent disse menneskene like lenge som min egen familie.",
    name: "Julie",
    detail: "21 år",
  },
  {
    quote:
      "Det er et veldig fint miljø, og det er kjempegøy å stupe. Både trenerne og de andre stuperne er snille.",
    name: "Synne",
    detail: "12 år",
  },
];

export const SPONSORS = [
  { name: "Zur Hår & Rubb", image: "/images/sponsor_img/zurhaar.png" },
  { name: "Beerenberg", image: "/images/sponsor_img/beerenberg.png" },
  { name: "OBOS", image: "/images/sponsor_img/obos.png" },
  { name: "Rehab.shop", image: "/images/sponsor_img/rehab_shop.png" },
];

// The two "doors" on the front page, reused by the navbar and footer.
export const DOORS = {
  new: {
    href: "/bli-med",
    label: "Bli med",
    eyebrow: "Ny i klubben?",
    links: [
      { label: "Kurs etter alder", href: "/bli-med#kurs" },
      { label: "Priser og utstyr", href: "/bli-med#priser" },
      { label: "Første gang?", href: "/bli-med#forste-gang" },
      { label: "Påmelding", href: "/bli-med#pamelding" },
    ],
  },
  members: {
    href: "/for-medlemmer",
    label: "For medlemmer",
    eyebrow: "Allerede medlem?",
    links: [
      { label: "Treningstider", href: "/for-medlemmer#treningstider" },
      { label: "Stevner og kalender", href: "/for-medlemmer#stevner" },
      { label: "Resultater", href: "/for-medlemmer#resultater" },
      { label: "Kontingent og praktisk", href: "/for-medlemmer#praktisk" },
    ],
  },
};

export const NAV_LINKS = [
  { label: DOORS.new.label, href: DOORS.new.href },
  { label: DOORS.members.label, href: DOORS.members.href },
  { label: "Nyheter", href: "/nyheter" },
  { label: "Om klubben", href: "/om-klubben" },
  { label: "Kontakt", href: "/kontakt" },
];
