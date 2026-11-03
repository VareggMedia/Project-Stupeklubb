"use client";

import { useEffect, useRef } from "react";
import type { Crop, Size } from "./renderer";
import styles from "./HeroWater.module.css";

/**
 * Animated pool water behind the hero diver.
 * Layers: WebGL water + caustics -> cut-out diver and board -> the hero's dark tint.
 * The section background is the poster – frame 0 of this animation (DEVFLOW/stupeklubben-hero-water/poster) – and shows
 * through the canvas until its first frame, which is the same image, so the swap is invisible. The layer itself is never
 * hidden: a late opacity flip would make the diver a late LCP candidate. Poster + overlay is also the fallback.
 * Rendering runs in a worker on an OffscreenCanvas where supported, otherwise on the main thread.
 */

// Full-frame silhouette for the cast shadow (worker texture) and the overlay cropped to its bounding box: a full-frame
// overlay would cover the whole viewport and become a slow-decoding LCP element instead of the poster.
const DIVER = "/images/hero-water/diver-wide.avif";
const OVERLAY = "/images/hero-water/diver-crop.avif"; // px 2294,396 – 3458,2151 of the 3840×2151 box

export default function HeroWater() {
  const layerRef = useRef<HTMLDivElement>(null);
  const boxRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const layer = layerRef.current;
    const box = boxRef.current;
    if (!layer || !box) return;
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    // a fresh canvas per mount: transferControlToOffscreen works once per element (React Strict Mode remounts)
    const canvas = document.createElement("canvas");
    canvas.className = "absolute";
    box.prepend(canvas);

    let worker: Worker | null = null;
    let local: { resize(s: Size): void; frame(dt: number): void } | null = null;
    let size: Size = { w: 1, h: 1, dpr: 1, crop: [0, 0, 1, 1] };
    let inView = true;
    let disposed = false;
    let raf = 0;
    const shown = () => inView && !document.hidden;

    if ("transferControlToOffscreen" in canvas && typeof Worker !== "undefined") {
      const off = canvas.transferControlToOffscreen();
      worker = new Worker(new URL("./water.worker.ts", import.meta.url), { type: "module" });
      worker.postMessage({ type: "init", canvas: off, diverUrl: new URL(DIVER, location.href).href }, [off]);
    } else {
      void Promise.all([
        import("./renderer"),
        fetch(DIVER)
          .then((res) => res.blob())
          .then((b) => createImageBitmap(b))
          .catch(() => null),
      ]).then(([{ createRenderer }, diver]) => {
        if (disposed) return;
        const r = createRenderer(canvas, diver);
        if (!r) return;
        local = r;
        r.resize(size);
        let last = 0;
        const tick = (now: number) => {
          raf = requestAnimationFrame(tick);
          if (!shown()) {
            last = 0;
            return;
          }
          const dt = last ? Math.min(0.05, Math.max(0, (now - last) / 1000)) : 0; // first frame = frame 0 = poster
          last = now;
          r.frame(dt);
        };
        raf = requestAnimationFrame(tick);
      });
    }

    // the box is placed by CSS (HeroWater.module.css); the canvas covers only its visible part
    const layout = () => {
      const W = layer.clientWidth;
      const H = layer.clientHeight;
      const lr = layer.getBoundingClientRect();
      const br = box.getBoundingClientRect();
      const [offX, offY, dw, dh] = [br.left - lr.left, br.top - lr.top, br.width, br.height];
      const x0 = Math.max(0, -offX);
      const y0 = Math.max(0, -offY);
      const cw = Math.max(1, Math.min(dw, W - offX) - x0);
      const ch = Math.max(1, Math.min(dh, H - offY) - y0);
      Object.assign(canvas.style, { left: `${x0}px`, top: `${y0}px`, width: `${cw}px`, height: `${ch}px` });
      const crop: Crop = [x0 / dw, 1 - (y0 + ch) / dh, cw / dw, ch / dh];
      size = { w: cw, h: ch, dpr: devicePixelRatio || 1, crop };
      worker?.postMessage({ type: "size", ...size });
      local?.resize(size);
    };
    const ro = new ResizeObserver(layout);
    ro.observe(layer);
    layout();

    const sendShown = () => worker?.postMessage({ type: "visible", v: shown() });
    const io = new IntersectionObserver(([e]) => {
      inView = e.isIntersecting;
      sendShown();
    });
    io.observe(layer);
    document.addEventListener("visibilitychange", sendShown);

    return () => {
      disposed = true;
      cancelAnimationFrame(raf);
      worker?.terminate();
      ro.disconnect();
      io.disconnect();
      document.removeEventListener("visibilitychange", sendShown);
      canvas.remove();
    };
  }, []);

  return (
    <div
      ref={layerRef}
      aria-hidden="true"
      className={`pointer-events-none absolute inset-0 z-[1] overflow-hidden ${styles.layer}`}
    >
      <div ref={boxRef} className={styles.box}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={OVERLAY} alt="" className="absolute top-[18.41%] left-[59.74%] h-[81.59%] w-[30.31%]" />
      </div>
      {/* the hero's tint, over poster and canvas alike (the section background is the bare poster) */}
      <div className="absolute inset-0 bg-[rgba(8,33,41,0.33)]" />
    </div>
  );
}
