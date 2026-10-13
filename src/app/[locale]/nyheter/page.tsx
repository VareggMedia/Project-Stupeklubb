import { ArrowUpRight } from "lucide-react";
import { useTranslations } from "next-intl";
import { buttonStyles } from "../components/button";
import FeatureRow from "../components/FeatureRow";
export default function Nyheter() {
  const tNews = useTranslations("NewsPage");
  return (
    <section className="bg-foam" id="stupskolen">
      <div className="wrap">
        <FeatureRow
          id="nyheter"
          title={tNews("title")}
          reverse
          lightArt
          last
          art={<img src="/images/divingboard.avif" alt="Bergen Stupeklubb" />}
        >
          <p>{tNews("text")}</p>
          <a href="#" className={buttonStyles.ghostLight}>
            {tNews("cta")}
            <ArrowUpRight size={16} />
          </a>
        </FeatureRow>
      </div>
    </section>
  );
}
