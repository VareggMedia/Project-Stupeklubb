import { ArrowUpRight } from "lucide-react";
import { buttonStyles } from "../components/button";
import FeatureRow from "../components/FeatureRow";
export default function Nyheter() {
  return (
    <section className="bg-foam" id="stupskolen">
      <div className="wrap">
        <FeatureRow
          id="nyheter"
          title="Hold deg oppdatert"
          reverse
          lightArt
          last
          art={<img src="/images/divingboard.avif" alt="Bergen Stupeklubb" />}
        >
          <p>
            På nyhetssiden vår skriver vi om alt fra treningsoppdateringer og
            konkurranseresultater til andre gode nyheter fra klubben.
          </p>
          <a href="#" className={buttonStyles.ghostLight}>
            Les siste nytt
            <ArrowUpRight size={16} />
          </a>
        </FeatureRow>
      </div>
    </section>
  );
}
