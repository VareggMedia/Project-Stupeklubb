"use client";

import { useEffect, useRef, useState } from "react";
import type { Crop, Size } from "./renderer";

/**
 * Animated pool water behind the hero diver.
 * Layers: WebGL water + caustics -> cut-out diver and board -> the same dark tint as the section background.
 * The section background is the poster – frame 0 of this animation (DEVFLOW/stupeklubben-hero-water/poster) – so the
 * swap to the live canvas is invisible; it also stays as the fallback (reduced motion, no WebGL).
 * Rendering runs in a worker on an OffscreenCanvas where supported, otherwise on the main thread.
 */

const DIVER = "/images/hero-water/diver-wide.avif";

// Same geometry as the section's desktop background (poster-wide.avif, cover, position 100% / max(100%, min(0, 100px - 10.42vw))).
const IMG_W = 3840;
const IMG_H = 2151;

// Mobile (≤ 900 px) background is poster-mobile.avif (2880×1920), the crop of the wide scene that matches the old
// hero-diver.avif framing: wide px = MOB_K * mobile px + (MOB_TX, MOB_TY), fitted on the diver's upper body.
const MOB_W = 2880;
const MOB_H = 1920;
const MOB_K = 0.89;
const MOB_TX = 640;
const MOB_TY = 112;

export default function HeroWater() {
  const layerRef = useRef<HTMLDivElement>(null);
  const boxRef = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const layer = layerRef.current;
    const box = boxRef.current;
    const img = imgRef.current;
    if (!layer || !box || !img) return;
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
    // show the layer only once the overlay diver is decoded too, or the diver would blink out over the live water
    const imgReady = img.decode().catch(() => undefined);
    const markReady = () => void imgReady.then(() => !disposed && setReady(true));

    if ("transferControlToOffscreen" in canvas && typeof Worker !== "undefined") {
      const off = canvas.transferControlToOffscreen();
      worker = new Worker(new URL("./water.worker.ts", import.meta.url), { type: "module" });
      worker.onmessage = (e) => e.data === "ready" && markReady();
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
        let first = true;
        const tick = (now: number) => {
          raf = requestAnimationFrame(tick);
          if (!shown()) {
            last = 0;
            return;
          }
          const dt = last ? Math.min(0.05, Math.max(0, (now - last) / 1000)) : 0; // first frame = frame 0 = poster
          last = now;
          r.frame(dt);
          if (first) {
            first = false;
            markReady();
          }
        };
        raf = requestAnimationFrame(tick);
      });
    }

    // place the box exactly where the CSS background image sits; the canvas covers only its visible part
    const mobile = matchMedia("(max-width: 900px)");
    const layout = () => {
      const W = layer.clientWidth;
      const H = layer.clientHeight;
      const vw = window.innerWidth;
      let offX, offY, dw, dh;
      if (mobile.matches) {
        // size auto max(110%, clamp(840px, 1300px - 80vw, 960px)), position 72% max(100%, clamp(-85px, 13.36vw - 142px, -65px))
        const mh = Math.max(1.1 * H, Math.min(960, Math.max(840, 1300 - 0.8 * vw)));
        const ms = mh / MOB_H;
        const mx = 0.72 * (W - MOB_W * ms);
        const my = Math.max(H - mh, Math.min(-65, Math.max(-85, 0.1336 * vw - 142)));
        const s = ms / MOB_K;
        [offX, offY, dw, dh] = [mx - MOB_TX * s, my - MOB_TY * s, IMG_W * s, IMG_H * s];
      } else {
        const s = Math.max(W / IMG_W, H / IMG_H);
        [dw, dh] = [IMG_W * s, IMG_H * s];
        offX = W - dw; // position-x 100%
        offY = Math.max(H - dh, Math.min(0, 100 - 0.1042 * vw));
      }
      Object.assign(box.style, { left: `${offX}px`, top: `${offY}px`, width: `${dw}px`, height: `${dh}px` });
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
      className={`pointer-events-none absolute inset-0 z-[1] overflow-hidden ${ready ? "opacity-100" : "opacity-0"}`}
    >
      <div ref={boxRef} className="absolute">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img ref={imgRef} src={DIVER} alt="" className="absolute inset-0 h-full w-full" />
      </div>
      {/* same tint the section background has (linear-gradient rgba(8,33,41,0.33)) */}
      <div className="absolute inset-0 bg-[rgba(8,33,41,0.33)]" />
    </div>
  );
}
