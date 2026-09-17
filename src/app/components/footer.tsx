import { Menu, X, ArrowUpRight, Mail, Phone, MapPin } from "lucide-react";
import Link from "next/link";
function InstagramIcon({ size = 19 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
    >
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}

function FacebookIcon({ size = 19 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
    >
      <path d="M15 8h-2a2 2 0 0 0-2 2v2H9v3h2v7h3v-7h2.2l.8-3H14v-1.6c0-.5.4-.9.9-.9H16V8Z" />
    </svg>
  );
}
const FOOTER_LINKS = [
  { label: "Hjem", href: "#" },
  { label: "Om oss", href: "#om-oss" },
  { label: "Bli medlem", href: "#stupskolen" },
  { label: "Våre trenere", href: "#om-oss" },
  { label: "Sponsing", href: "#sponsorer" },
  { label: "Hva skjer?", href: "/nyheter" },
  { label: "Kontakt oss", href: "/kontakt" },
  { label: "Påmelding", href: "#pamelding" },
];
export default function Footer() {
  return (
    <div className="bsk">
      <section className="contact-zone" id="kontakt">
        <div className="wrap">
          <div className="contact-grid">
            <div>
              <h2>Ta kontakt!</h2>
              <p>
                For oss er det viktig at du føler deg velkommen. Har du spørsmål
                vi ikke har svart på her, vil vi at du skal ta kontakt fort som
                bare rakkeren. Vi digger spørsmål — vi er jo tross alt
                bergensere.
              </p>
              <div className="social-row">
                <a
                  href="https://www.instagram.com/bergendivingclub/"
                  aria-label="Instagram"
                >
                  <InstagramIcon />
                </a>
                <a
                  href="https://www.facebook.com/bergenstupeklubb"
                  aria-label="Facebook"
                >
                  <FacebookIcon />
                </a>
                <a
                  href="mailto:dagligleder@bergen-stupeklubb.no"
                  aria-label="E-post"
                >
                  <Mail size={19} />
                </a>
              </div>
            </div>
            <div className="contact-details">
              <div className="contact-item">
                <Mail className="icon" size={19} />
                <div>
                  <strong>E-post</strong>
                  <a href="mailto:hovedtrener@bergen-stupeklubb.no">
                    hovedtrener@bergen-stupeklubb.no
                  </a>
                </div>
              </div>
              <div className="contact-item">
                <Phone className="icon" size={19} />
                <div>
                  <strong>Telefon</strong>
                  <a href="tel:+4793299995">(+47) 932 99 995</a>
                </div>
              </div>
              <div className="contact-item">
                <MapPin className="icon" size={19} />
                <div>
                  <strong>Adresse</strong>
                  <span>ADO Arena, Lungegårdskaien 40, 5015 Bergen</span>
                </div>
              </div>
            </div>
          </div>

          <div className="footer-bottom">
            <div className="footer-links">
              {FOOTER_LINKS.map((l) => (
                <Link key={l.label} href={l.href}>
                  {l.label}
                </Link>
              ))}
            </div>
            <div className="footer-brand">
              Bergen Stupeklubb — ADO Arena, Lungegårdskaien 40, 5015 Bergen
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
