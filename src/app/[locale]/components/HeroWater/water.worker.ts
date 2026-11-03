// Runs the hero water off the main thread on an OffscreenCanvas, so shader compiles and frames never block the page.
import { createRenderer, type Renderer, type Size } from "./renderer";

type Msg =
  | { type: "init"; canvas: OffscreenCanvas; diverUrl: string }
  | ({ type: "size" } & Size)
  | { type: "visible"; v: boolean };

const ctx = globalThis as unknown as {
  onmessage: ((e: MessageEvent<Msg>) => void) | null;
  postMessage(m: unknown): void;
  requestAnimationFrame?: (cb: (now: number) => void) => number;
};
const raf = (cb: (now: number) => void) =>
  ctx.requestAnimationFrame ? ctx.requestAnimationFrame(cb) : setTimeout(() => cb(performance.now()), 16);

let r: Renderer | null = null;
let size: Size | null = null;
let visible = true;
let last = 0;
let readySent = false;

const tick = (now: number) => {
  raf(tick);
  if (!r || !size || !visible) {
    last = 0;
    return;
  }
  const dt = last ? Math.min(0.05, Math.max(0, (now - last) / 1000)) : 0; // the first frame is frame 0, as the poster
  last = now;
  r.frame(dt);
  if (!readySent) {
    readySent = true;
    ctx.postMessage("ready");
  }
};

ctx.onmessage = async ({ data: m }) => {
  if (m.type === "size") {
    size = m;
    r?.resize(m);
  } else if (m.type === "visible") {
    visible = m.v;
  } else if (m.type === "init") {
    // the silhouette must be in place before frame 0, or the cast shadow would pop in after the poster swap
    const diver = await fetch(m.diverUrl)
      .then((res) => res.blob())
      .then((b) => createImageBitmap(b))
      .catch(() => null);
    r = createRenderer(m.canvas, diver);
    if (!r) return;
    if (size) r.resize(size);
    raf(tick);
  }
};
