"use client";
import { useEffect, useState } from "react";
import { ArrowUp } from "lucide-react";
import { useTranslations } from "next-intl";
import { scrollToTop } from "@/lib/scroll/scroll";

// Show the button once the visitor has scrolled most of a screen down a page that is clearly
// longer than one screen (same rule as the DUFBH site).
function shouldShow() {
  const threshold = Math.min(560, Math.max(320, window.innerHeight * 0.8));
  const pageIsLong = document.documentElement.scrollHeight > window.innerHeight * 1.5;
  return pageIsLong && window.scrollY > threshold;
}

// Round "back to top" button, fixed in the bottom-right corner on every page (rendered in the layout).
// It fades in while scrolling down and out near the top; hidden it is also removed from the tab order.
export default function BackToTop() {
  const t = useTranslations("Common");
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const update = () => setVisible(shouldShow());
    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  return (
    <button
      type="button"
      onClick={scrollToTop}
      aria-label={t("backToTop")}
      aria-hidden={!visible}
      tabIndex={visible ? 0 : -1}
      className={`fixed right-4 bottom-4 z-40 flex size-12 items-center justify-center rounded-full border border-aqua/40 bg-pool text-foam shadow-[0_10px_24px_rgba(8,33,41,0.28)] transition-[opacity,translate,background-color,border-color] duration-200 ease-out hover:border-aqua hover:bg-pool-light focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-aqua motion-reduce:transition-opacity md:right-7 md:bottom-7 md:size-13 ${
        visible ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-2.5 opacity-0"
      }`}
    >
      <ArrowUp aria-hidden="true" className="size-5.5" strokeWidth={2} />
    </button>
  );
}
