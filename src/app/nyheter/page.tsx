import { ArrowUpRight } from "lucide-react";
export default function Nyheter() {
  return (
    <div className="bsk">
      <section className="body-zone" id="stupskolen">
        <div className="wrap">
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
              <img src="/images/divingboard.avif" alt="Bergen Stupeklubb" />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
