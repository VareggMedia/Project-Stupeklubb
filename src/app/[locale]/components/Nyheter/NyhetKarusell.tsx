"use client";

import { useEffect, useRef, type ReactNode } from "react";

// Behaviour follows the DUFBH media carousel: on desktop a slow endless scroll
// (28 px/s) that pauses on hover or focus, with arrows over the faded edges;
// on mobile (≤ 800 px) one full-width card advances every 3.6 s and follows
// swipes only, without the edge fade or arrows (Alex, #42).
const SPEED = 28; // px per second, desktop
const MOBILE_INTERVAL = 3600; // ms
const SWIPE_THRESHOLD = 28; // px
const MOVE_MS = 450;
const RESUME_AFTER_TOUCH = 2400; // ms

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
    let resumeTimer = 0;

    const measure = () => {
      const first = track.children[antall] as HTMLElement | undefined; // first card of the main group
      const second = track.children[antall + 1] as HTMLElement | undefined;
      // Sub-pixel rects, so percentage card widths do not drift off centre
      const card = first?.getBoundingClientRect().width ?? 0;
      const step = second && first ? second.getBoundingClientRect().left - first.getBoundingClientRect().left : card;
      return { card, step, group: step * antall };
    };

    const apply = () => {
      const { card, group } = measure();
      if (!group) return;
      offset = ((offset % group) + group) % group;
      const centre = mobile.matches ? (track.clientWidth - card) / 2 : 0;
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

    // Swipe (touch and pen only; the mouse uses the arrows). A touch pauses the
    // carousel; it resumes 2.4 s after the finger lifts, as in DUFBH.
    let start: { x: number; y: number } | null = null;
    const onDown = (e: PointerEvent) => {
      if (e.pointerType === "mouse") return;
      start = { x: e.clientX, y: e.clientY };
      paused = true;
      window.clearTimeout(resumeTimer);
      window.clearInterval(timer);
    };
    const onUp = (e: PointerEvent) => {
      if (!start) return;
      const dx = e.clientX - start.x;
      const dy = e.clientY - start.y;
      start = null;
      if (Math.abs(dx) >= SWIPE_THRESHOLD && Math.abs(dx) > Math.abs(dy)) move(dx < 0 ? 1 : -1);
      resumeTimer = window.setTimeout(() => {
        paused = false;
        restartTimer();
      }, RESUME_AFTER_TOUCH);
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
      window.clearTimeout(resumeTimer);
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
    "pointer-events-auto flex size-[72px] cursor-pointer items-center justify-center text-ink opacity-30 transition duration-150 hover:scale-[1.08] hover:opacity-[0.48] focus-visible:opacity-[0.48]";

  return (
    <div
      role="region"
      aria-roledescription="carousel"
      aria-label={labels.region}
      className="relative"
      onKeyDown={(e) => {
        if (e.key === "ArrowRight") moveRef.current(1);
        if (e.key === "ArrowLeft") moveRef.current(-1);
      }}
    >
      <div
        ref={viewportRef}
        // Mobile bleeds into the 28 px .wrap gutters so the card shadow is not clipped
        className="touch-pan-y overflow-hidden max-[800px]:-mx-7 max-[800px]:px-7 min-[801px]:[mask-image:linear-gradient(to_right,transparent,black_50px,black_calc(100%-50px),transparent)]"
      >
        <div
          ref={trackRef}
          // Vertical padding leaves room for the shadow and the hover lift; on mobile the
          // 72 px gap keeps the neighbours and their 30 px shadows outside the viewport
          className="flex gap-[clamp(16px,1.8vw,24px)] pt-6 pb-12 will-change-transform max-[800px]:gap-18"
        >
          {/* Clones before and after the main group make the loop seamless */}
          {[kloner, kort, kloner].flatMap((gruppeKort, gruppe) =>
            gruppeKort.map((node, i) => (
              <div
                key={`${gruppe}-${i}`}
                className="w-[clamp(374px,38vw,422px)] shrink-0 transition-transform duration-200 max-[1080px]:w-[clamp(365px,54vw,413px)] max-[800px]:w-[calc(100%-18px)] min-[801px]:hover:-translate-y-[7px] min-[801px]:hover:scale-[1.01]"
                inert={gruppe !== 1 || undefined}
              >
                {node}
              </div>
            )),
          )}
        </div>
      </div>
      {/* Arrows over the faded edges – desktop only; mobile uses swipe */}
      <div
        className="pointer-events-none absolute top-[calc(50%+10px)] right-[-1px] left-[-1px] z-20 flex -translate-y-1/2 justify-between select-none max-[800px]:hidden"
      >
        <button
          type="button"
          className={pilStyles}
          aria-label={labels.previous}
          onClick={() => moveRef.current(-1)}
        >
          <Pil retning="forrige" />
        </button>
        <button
          type="button"
          className={pilStyles}
          aria-label={labels.next}
          onClick={() => moveRef.current(1)}
        >
          <Pil retning="neste" />
        </button>
      </div>
    </div>
  );
}
