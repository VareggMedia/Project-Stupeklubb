import { ArrowUpRight } from "lucide-react";
import { useTranslations } from "next-intl";
import { buttonStyles } from "../components/button";
import FeatureRow from "../components/FeatureRow";
export default function Stupskolen() {
  const t = useTranslations("DivingSchoolPage");
  const tNews = useTranslations("NewsPage");
  const tGear = useTranslations("GearPage");
  return (
    <section className="bg-foam" id="stupskolen">
      <div className="wrap">
        <FeatureRow
          title={t("signup.title")}
          art={
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
          }
        >
          <p>{t("signup.text1")}</p>
          <p>{t("signup.text2")}</p>
          <a href="#" className={buttonStyles.ghostLight}>
            {t("signup.cta")}
            <ArrowUpRight size={16} />
          </a>
        </FeatureRow>

        <FeatureRow
          title={t("beginners.title")}
          reverse
          lightArt
          art={
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
          }
        >
          <p>{t("beginners.text")}</p>
          <div className="mt-6.5 flex flex-wrap gap-3.5">
            <a href="#" className={buttonStyles.ghostLight}>
              {t("beginners.membershipCta")}
            </a>
            <a href="#pamelding" className={buttonStyles.coral}>
              {t("beginners.signupCta")}
            </a>
          </div>
        </FeatureRow>

        <FeatureRow
          id="klubbutstyr"
          title={tGear("title")}
          art={<KlubbutstyrArt />}
        >
          <p>{t("gear.text")}</p>
          <a href="#" className={buttonStyles.ghostLight}>
            {t("gear.cta")}
            <ArrowUpRight size={16} />
          </a>
        </FeatureRow>

        <FeatureRow
          id="nyheter"
          title={tNews("title")}
          reverse
          lightArt
          last
          art={<NyheterArt />}
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

function KlubbutstyrArt() {
  return (
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
  );
}

function NyheterArt() {
  return (
    <svg viewBox="0 0 400 260" preserveAspectRatio="none">
      {[60, 110, 160, 210].map((y) => (
        <line
          key={y}
          x1="30"
          y1={y}
          x2="370"
          y2={y}
          stroke="#23a596"
          strokeWidth="1"
          opacity="0.4"
        />
      ))}
      <circle cx="30" cy="60" r="4" fill="#ff6f4d" />
    </svg>
  );
}
