import { ArrowUpRight } from "lucide-react";
export default function Stupskolen() {
  return (
    <div className="bsk">
      <section className="body-zone" id="stupskolen">
        <div className="wrap">
          <div className="feature-row">
            <div className="feature-copy">
              <h2>Meld deg på stupskole for høsten 2026</h2>
              <p>
                Med fokus på fysisk og mental læring utfordrer stuping sider ved
                deg selv du ikke visste fantes. Det tester grenser på en trygg
                og artig måte — midt i hjertet av Bergen.
              </p>
              <p>Vi tilbyr stuping for alle aldre og tilpasser ved behov.</p>
              <a href="#" className="btn btn-ghost-light">
                Les mer om stupskolen
                <ArrowUpRight size={16} />
              </a>
            </div>
            <div className="feature-art">
              <svg viewBox="0 0 400 260" preserveAspectRatio="none">
                <defs>
                  <linearGradient id="g1" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0" stopColor="#146b7e" />
                    <stop offset="1" stopColor="#0d3f4d" />
                  </linearGradient>
                </defs>
                <rect width="400" height="260" fill="url(#g1)" />
                {[0, 1, 2, 3, 4].map((i) => (
                  <path
                    key={i}
                    d={`M0,${210 - i * 14} C100,${190 - i * 14} 300,${230 - i * 14} 400,${200 - i * 14}`}
                    stroke="rgba(73,214,198,0.25)"
                    fill="none"
                    strokeWidth="1.5"
                  />
                ))}
              </svg>
            </div>
          </div>

          <div className="feature-row reverse">
            <div className="feature-copy">
              <h2>Aldri prøvd å stupe før?</h2>
              <p>
                Vi tilbyr en rekke kurs for alle aldersgrupper og
                erfaringsnivåer. Har du aldri stått på et stupebrett før? Vi tar
                godt vare på deg, fra første hopp.
              </p>
              <div className="feature-links">
                <a href="#" className="btn btn-ghost-light">
                  Les mer om medlemskap
                </a>
                <a href="#pamelding" className="btn btn-coral">
                  Meld deg på her
                </a>
              </div>
            </div>
            <div className="feature-art alt">
              <svg viewBox="0 0 400 260" preserveAspectRatio="none">
                <circle cx="330" cy="60" r="70" fill="rgba(35,165,150,0.12)" />
                <circle cx="80" cy="210" r="90" fill="rgba(35,165,150,0.08)" />
                <path
                  d="M40,140 Q200,90 380,150"
                  stroke="#23a596"
                  fill="none"
                  strokeWidth="2"
                  strokeDasharray="3 8"
                />
              </svg>
            </div>
          </div>

          <div className="feature-row" id="klubbutstyr">
            <div className="feature-copy">
              <h2>Klubbutstyr</h2>
              <p>
                Vi har klubbtøy fra Craft. I nettbutikken finner du
                treningsjakker og -bukser, hettegensere, t-skjorter og shorts
                fra vår egen kolleksjon.
              </p>
              <a href="#" className="btn btn-ghost-light">
                Gå til nettbutikken
                <ArrowUpRight size={16} />
              </a>
            </div>
            <div className="feature-art">
              <svg viewBox="0 0 400 260" preserveAspectRatio="none">
                <defs>
                  <linearGradient id="g2" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0" stopColor="#0d3f4d" />
                    <stop offset="1" stopColor="#082129" />
                  </linearGradient>
                </defs>
                <rect width="400" height="260" fill="url(#g2)" />
                <rect
                  x="150"
                  y="70"
                  width="100"
                  height="120"
                  rx="6"
                  fill="none"
                  stroke="#49d6c6"
                  strokeWidth="1.5"
                  opacity="0.5"
                />
                <rect
                  x="170"
                  y="90"
                  width="60"
                  height="80"
                  rx="4"
                  fill="none"
                  stroke="#49d6c6"
                  strokeWidth="1.5"
                  opacity="0.3"
                />
              </svg>
            </div>
          </div>

          <div
            className="feature-row reverse"
            id="nyheter"
            style={{ borderBottom: "none" }}
          >
            <div className="feature-copy">
              <h2>Hold deg oppdatert</h2>
              <p>
                På nyhetssiden vår skriver vi om alt fra treningsoppdateringer
                og konkurranseresultater til andre gode nyheter fra klubben.
              </p>
              <a href="#" className="btn btn-ghost-light">
                Les siste nytt
                <ArrowUpRight size={16} />
              </a>
            </div>
            <div className="feature-art alt">
              <svg viewBox="0 0 400 260" preserveAspectRatio="none">
                <line
                  x1="30"
                  y1="60"
                  x2="370"
                  y2="60"
                  stroke="#23a596"
                  strokeWidth="1"
                  opacity="0.4"
                />
                <line
                  x1="30"
                  y1="110"
                  x2="370"
                  y2="110"
                  stroke="#23a596"
                  strokeWidth="1"
                  opacity="0.4"
                />
                <line
                  x1="30"
                  y1="160"
                  x2="370"
                  y2="160"
                  stroke="#23a596"
                  strokeWidth="1"
                  opacity="0.4"
                />
                <line
                  x1="30"
                  y1="210"
                  x2="370"
                  y2="210"
                  stroke="#23a596"
                  strokeWidth="1"
                  opacity="0.4"
                />
                <circle cx="30" cy="60" r="4" fill="#ff6f4d" />
              </svg>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
