"use client";

import { useEffect, useRef, type ReactNode } from "react";

// Behaviour follows the DUFBH media carousel: on desktop a slow endless scroll
// (28 px/s) that pauses on hover or focus; on mobile (≤ 800 px) the centred card
// advances every 3.6 s and follows swipes. Arrows move one card either way.
const SPEED = 28; // px per second, desktop
const MOBILE_INTERVAL = 3600; // ms
const SWIPE_THRESHOLD = 28; // px
const MOVE_MS = 450;

type Props = {
  // The cards rendered on the server, and the same cards hidden for the loop's clones
  kort: ReactNode[];
  kloner: ReactNode[];
  labels: { region: string; previous: string; next: string };
};

function Pil({ retning }: { retning: "forrige" | "neste" }) {
  return (
    <svg
      viewBox="0 0 120 72"
      aria-hidden="true"
      className={`h-[46px] w-[60px] scale-x-[0.68] fill-current ${retning === "forrige" ? "rotate-180" : ""}`}
    >
      <path d="M6 6 116 36 6 66 30 38 6 6Z" />
    </svg>
  );
}

export default function NyhetKarusell({ kort, kloner, labels }: Props) {
  const antall = kort.length;
  const viewportRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const moveRef = useRef<(retning: 1 | -1) => void>(() => {});

  useEffect(() => {
    const viewport = viewportRef.current;
    const track = trackRef.current;
    if (!viewport || !track) return;

    const mobile = window.matchMedia("(max-width: 800px)");
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    let offset = 0;
    let paused = false;
    let anim: { from: number; to: number; start: number } | null = null;
    let last = performance.now();
    let frame = 0;
    let timer = 0;

    const measure = () => {
      const first = track.children[antall] as HTMLElement | undefined; // first card of the main group
      const second = track.children[antall + 1] as HTMLElement | undefined;
      const card = first?.offsetWidth ?? 0;
      const step = second && first ? second.offsetLeft - first.offsetLeft : card;
      return { card, step, group: step * antall };
    };

    const apply = () => {
      const { card, group } = measure();
      if (!group) return;
      offset = ((offset % group) + group) % group;
      const centre = mobile.matches ? (viewport.clientWidth - card) / 2 : 0;
      track.style.transform = `translate3d(${-(group + offset) + centre}px, 0, 0)`;
    };

    const tick = (now: number) => {
      const dt = Math.min((now - last) / 1000, 0.1);
      last = now;
      if (anim) {
        const t = Math.min((now - anim.start) / MOVE_MS, 1);
        const ease = 1 - Math.pow(1 - t, 3);
        offset = anim.from + (anim.to - anim.from) * ease;
        if (t === 1) anim = null;
      } else if (!paused && !mobile.matches && !reduced.matches) {
        offset += SPEED * dt;
      }
      apply();
      frame = requestAnimationFrame(tick);
    };

    const move = (retning: 1 | -1) => {
      const { step } = measure();
      if (!step) return;
      // Mobile snaps to whole cards; desktop moves one card from wherever the scroll is
      const from = offset;
      const to = mobile.matches ? (Math.round(offset / step) + retning) * step : offset + retning * step;
      anim = { from, to, start: performance.now() };
    };
    moveRef.current = move;

    const restartTimer = () => {
      window.clearInterval(timer);
      if (mobile.matches && !reduced.matches) {
        timer = window.setInterval(() => {
          if (!paused && !document.hidden) move(1);
        }, MOBILE_INTERVAL);
      }
    };

    // Pause while the pointer or keyboard focus is inside the carousel
    const root = viewport.parentElement!;
    const pause = () => (paused = true);
    const resume = () => (paused = false);
    const onFocusOut = (e: FocusEvent) => {
      if (!root.contains(e.relatedTarget as Node)) resume();
    };
    root.addEventListener("mouseenter", pause);
    root.addEventListener("mouseleave", resume);
    root.addEventListener("focusin", pause);
    root.addEventListener("focusout", onFocusOut);

    // Swipe (touch and pen only; the mouse uses the arrows)
    let startX: number | null = null;
    const onDown = (e: PointerEvent) => {
      if (e.pointerType === "mouse") return;
      startX = e.clientX;
      paused = true;
    };
    const onUp = (e: PointerEvent) => {
      if (startX === null) return;
      const dx = e.clientX - startX;
      startX = null;
      paused = false;
      if (Math.abs(dx) > SWIPE_THRESHOLD) move(dx < 0 ? 1 : -1);
      restartTimer();
    };
    viewport.addEventListener("pointerdown", onDown);
    viewport.addEventListener("pointerup", onUp);
    viewport.addEventListener("pointercancel", onUp);

    const onResize = () => {
      apply();
      restartTimer();
    };
    mobile.addEventListener("change", onResize);
    window.addEventListener("resize", apply);

    restartTimer();
    frame = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(frame);
      window.clearInterval(timer);
      root.removeEventListener("mouseenter", pause);
      root.removeEventListener("mouseleave", resume);
      root.removeEventListener("focusin", pause);
      root.removeEventListener("focusout", onFocusOut);
      viewport.removeEventListener("pointerdown", onDown);
      viewport.removeEventListener("pointerup", onUp);
      viewport.removeEventListener("pointercancel", onUp);
      mobile.removeEventListener("change", onResize);
      window.removeEventListener("resize", apply);
    };
  }, [antall]);

  const pilStyles =
    "flex size-14 cursor-pointer items-center justify-center text-ink opacity-30 transition duration-150 hover:scale-[1.08] hover:opacity-[0.48] focus-visible:opacity-[0.48]";

  return (
    <div
      role="region"
      aria-roledescription="carousel"
      aria-label={labels.region}
      onKeyDown={(e) => {
        if (e.key === "ArrowRight") moveRef.current(1);
        if (e.key === "ArrowLeft") moveRef.current(-1);
      }}
    >
      <div
        ref={viewportRef}
        className="touch-pan-y overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_50px,black_calc(100%-50px),transparent)]"
      >
        <div ref={trackRef} className="flex gap-6 py-4 will-change-transform">
          {/* Clones before and after the main group make the loop seamless */}
          {[kloner, kort, kloner].flatMap((gruppeKort, gruppe) =>
            gruppeKort.map((node, i) => (
              <div
                key={`${gruppe}-${i}`}
                className="w-[clamp(280px,38vw,422px)] shrink-0 max-[800px]:w-[84vw]"
                inert={gruppe !== 1 || undefined}
              >
                {node}
              </div>
            )),
          )}
        </div>
      </div>
      <div className="mt-2 flex justify-center gap-6">
        <button type="button" className={pilStyles} aria-label={labels.previous} onClick={() => moveRef.current(-1)}>
          <Pil retning="forrige" />
        </button>
        <button type="button" className={pilStyles} aria-label={labels.next} onClick={() => moveRef.current(1)}>
          <Pil retning="neste" />
        </button>
      </div>
    </div>
  );
}
