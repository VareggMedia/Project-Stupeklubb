"use client";
import { useEffect, useRef, useState, useSyncExternalStore, type ReactNode } from "react";

// Hero heading that lies on moving water: the real <h1> keeps the layout, text, and accessibility; a WebGL
// canvas on top draws the same words bent by travelling waves (sum of directional sines), with a faint light
// on the wave slopes. Reduced motion, no WebGL, or an error keep the plain heading.
// TEMPORARY: with `?tune=1` in the address a tuning panel (bottom left) edits every parameter live.

type Wave = { angle: number; len: number; amp: number; speed: number }; // degrees, px, relative, px/s
type Params = { shift: number; light: number; lightAngle: number; speed: number; waves: Wave[] };

const DEFAULTS: Params = {
  shift: 3, // max text displacement, px
  light: 0.13, // brightness change on the wave slopes
  lightAngle: 110, // direction the light comes from, degrees
  speed: 2.65, // global speed multiplier
  waves: [
    { angle: 14, len: 260, amp: 1.0, speed: 26 },
    { angle: 121, len: 170, amp: 0.7, speed: 19 },
    { angle: -48, len: 120, amp: 0.45, speed: 15 },
    { angle: 199, len: 90, amp: 0.3, speed: 12 },
  ],
};
const N = DEFAULTS.waves.length;
const PAD = 12; // canvas margin around the heading, px (room for the displacement)
const FRAME_MS = 1000 / 30;

const VS = `#version 300 es
in vec2 aP; out vec2 vUv;
void main() { vUv = aP * 0.5 + 0.5; gl_Position = vec4(aP, 0.0, 1.0); }`;

const FS = `#version 300 es
precision highp float;
in vec2 vUv; out vec4 o;
uniform sampler2D uText;
uniform vec2 uSize, uLightDir;
uniform float uT, uGmax, uShift, uLight;
uniform vec4 uW[${N}];      // direction x, direction y, wavelength, amplitude
uniform float uSpeed[${N}]; // px/s
// gradient of the height field at p (CSS px)
vec2 grad(vec2 p) {
  vec2 g = vec2(0.0);
  for (int i = 0; i < ${N}; i++) {
    float k = 6.2831853 / uW[i].z;
    g += uW[i].xy * k * uW[i].w * cos(dot(uW[i].xy, p) * k - uT * uSpeed[i] * k);
  }
  return g;
}
void main() {
  vec2 p = vec2(vUv.x, 1.0 - vUv.y) * uSize;
  vec2 g = grad(p) / uGmax;
  vec4 c = texture(uText, (p + g * uShift) / uSize);
  o = vec4(c.rgb * (1.0 + uLight * dot(g, uLightDir)), c.a);
}`;

export default function RippleHeading({ className, children }: { className: string; children: ReactNode }) {
  const ref = useRef<HTMLHeadingElement>(null);
  const params = useRef<Params>(structuredClone(DEFAULTS));
  // TEMPORARY: the panel opens only with ?tune=1, also on the Vercel test preview (false on the server)
  const tuner = useSyncExternalStore(
    () => () => {},
    () => new URLSearchParams(location.search).has("tune"),
    () => false,
  );

  useEffect(() => {
    const h1 = ref.current;
    if (!h1 || matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const canvas = document.createElement("canvas");
    canvas.setAttribute("aria-hidden", "true");
    canvas.style.cssText = `position:absolute;left:${-PAD}px;top:${-PAD}px;pointer-events:none;`;
    const gl = canvas.getContext("webgl2", { premultipliedAlpha: false, antialias: false });
    if (!gl) return;

    const compile = (type: number, src: string) => {
      const s = gl.createShader(type)!;
      gl.shaderSource(s, src);
      gl.compileShader(s);
      if (!gl.getShaderParameter(s, gl.COMPILE_STATUS)) throw new Error(gl.getShaderInfoLog(s) ?? "shader");
      return s;
    };
    const prog = gl.createProgram()!;
    try {
      gl.attachShader(prog, compile(gl.VERTEX_SHADER, VS));
      gl.attachShader(prog, compile(gl.FRAGMENT_SHADER, FS));
      gl.linkProgram(prog);
      if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) throw new Error(gl.getProgramInfoLog(prog) ?? "link");
    } catch (e) {
      console.warn("RippleHeading: WebGL failed, keeping the plain heading", e);
      return;
    }
    gl.useProgram(prog);
    gl.bindBuffer(gl.ARRAY_BUFFER, gl.createBuffer());
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);
    const aP = gl.getAttribLocation(prog, "aP");
    gl.enableVertexAttribArray(aP);
    gl.vertexAttribPointer(aP, 2, gl.FLOAT, false, 0, 0);
    const U = Object.fromEntries(
      ["uSize", "uLightDir", "uT", "uGmax", "uShift", "uLight", "uW", "uSpeed"].map((n) => [n, gl.getUniformLocation(prog, n)]),
    );
    const tex = gl.createTexture();
    gl.bindTexture(gl.TEXTURE_2D, tex);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
    gl.enable(gl.BLEND);
    gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);

    // Draw each word where the browser laid it out, so wrapping, font, and CSS zoom match the real heading.
    const raster = document.createElement("canvas");
    let color = "#f2f8f7";
    const draw = () => {
      const style = getComputedStyle(h1);
      const box = h1.getBoundingClientRect();
      const zoom = box.width / h1.offsetWidth || 1; // CSS zoom on an ancestor scales client rects
      const w = h1.offsetWidth + PAD * 2;
      const h = h1.offsetHeight + PAD * 2;
      const dpr = Math.min(devicePixelRatio || 1, 2);
      raster.width = canvas.width = Math.round(w * dpr);
      raster.height = canvas.height = Math.round(h * dpr);
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      const ctx = raster.getContext("2d")!;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, w, h);
      ctx.font = `${style.fontWeight} ${style.fontSize} ${style.fontFamily}`;
      ctx.fillStyle = color;
      ctx.textBaseline = "alphabetic";
      const metrics = ctx.measureText("Hg");
      const walker = document.createTreeWalker(h1, NodeFilter.SHOW_TEXT);
      const range = document.createRange();
      for (let node = walker.nextNode(); node; node = walker.nextNode()) {
        const text = node.textContent ?? "";
        const words = /\S+/g;
        for (let m = words.exec(text); m; m = words.exec(text)) {
          range.setStart(node, m.index);
          range.setEnd(node, m.index + m[0].length);
          const r = range.getBoundingClientRect();
          const lineH = r.height / zoom;
          const x = (r.left - box.left) / zoom + PAD;
          const baseline =
            (r.top - box.top) / zoom + PAD + (lineH + metrics.fontBoundingBoxAscent - metrics.fontBoundingBoxDescent) / 2;
          ctx.fillText(m[0], x, baseline);
        }
      }
      gl.viewport(0, 0, canvas.width, canvas.height);
      gl.bindTexture(gl.TEXTURE_2D, tex);
      gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, raster);
      gl.uniform2f(U.uSize, w, h);
    };

    // Push the current parameters into the shader (every frame, so the tuning panel acts live).
    const upload = () => {
      const p = params.current;
      const rad = Math.PI / 180;
      gl.uniform4fv(U.uW, p.waves.flatMap((w) => [Math.cos(w.angle * rad), Math.sin(w.angle * rad), w.len, w.amp]));
      gl.uniform1fv(U.uSpeed, p.waves.map((w) => w.speed));
      gl.uniform1f(U.uGmax, p.waves.reduce((sum, w) => sum + ((2 * Math.PI) / w.len) * w.amp, 0) || 1);
      gl.uniform1f(U.uShift, p.shift);
      gl.uniform1f(U.uLight, p.light);
      gl.uniform2f(U.uLightDir, Math.cos(p.lightAngle * rad), Math.sin(p.lightAngle * rad));
    };

    let raf = 0;
    let last = 0;
    let time = 0;
    let inView = true;
    let stopped = false;
    let ro: ResizeObserver | null = null;
    let io: IntersectionObserver | null = null;
    const tick = (now: number) => {
      raf = requestAnimationFrame(tick);
      if (!inView || document.hidden || now - last < FRAME_MS - 2) return;
      time += last ? ((now - last) / 1000) * params.current.speed : 0;
      last = now;
      upload();
      gl.uniform1f(U.uT, time);
      gl.clear(gl.COLOR_BUFFER_BIT);
      gl.drawArrays(gl.TRIANGLES, 0, 3);
    };

    void document.fonts.ready.then(() => {
      if (stopped) return;
      color = getComputedStyle(h1).color;
      h1.style.position = "relative";
      h1.appendChild(canvas);
      draw();
      h1.style.color = "transparent"; // the canvas shows the words now; the text stays for screen readers
      ro = new ResizeObserver(draw);
      ro.observe(h1);
      io = new IntersectionObserver(([e]) => (inView = e.isIntersecting));
      io.observe(h1);
      raf = requestAnimationFrame(tick);
    });

    return () => {
      stopped = true;
      cancelAnimationFrame(raf);
      ro?.disconnect();
      io?.disconnect();
      canvas.remove();
      h1.style.color = "";
      gl.getExtension("WEBGL_lose_context")?.loseContext();
    };
  }, []);

  return (
    <>
      <h1 ref={ref} className={className}>
        {children}
      </h1>
      {tuner && <Tuner onChange={(next) => (params.current = next)} />}
    </>
  );
}

// Save the current set as ripple-params.json in the visitor's downloads.
function download(p: Params) {
  const url = URL.createObjectURL(new Blob([JSON.stringify(p, null, 1)], { type: "application/json" }));
  const a = Object.assign(document.createElement("a"), { href: url, download: "ripple-params.json" });
  a.click();
  URL.revokeObjectURL(url);
}

// TEMPORARY tuning panel: every value is live; "Kopier" copies the set as JSON, "Lagre JSON" downloads it.
function Tuner({ onChange }: { onChange: (next: Params) => void }) {
  const [p, setP] = useState<Params>(() => structuredClone(DEFAULTS));
  const [open, setOpen] = useState(true);
  const update = (next: Params) => {
    onChange(next);
    setP(next);
  };
  const row = (label: string, value: number, min: number, max: number, step: number, set: (v: number) => void) => (
    <label key={label} className="grid grid-cols-[88px_1fr_44px] items-center gap-2">
      <span>{label}</span>
      <input type="range" min={min} max={max} step={step} value={value} onChange={(e) => set(+e.target.value)} />
      <output className="text-right tabular-nums">{value}</output>
    </label>
  );
  return (
    <div className="fixed bottom-4 left-4 z-[70] max-h-[80vh] w-80 overflow-auto rounded-xl bg-ink/90 p-3 font-sans text-[12px] text-foam shadow-xl">
      <div className="mb-2 flex items-center justify-between gap-2">
        <strong>Ripple (midlertidig)</strong>
        <span className="flex gap-1">
          <button type="button" className="rounded bg-pool px-2 py-0.5" onClick={() => navigator.clipboard?.writeText(JSON.stringify(p, null, 1))}>
            Kopier
          </button>
          <button type="button" className="rounded bg-pool px-2 py-0.5" onClick={() => download(p)}>
            Lagre JSON
          </button>
          <button type="button" className="rounded bg-pool px-2 py-0.5" onClick={() => update(structuredClone(DEFAULTS))}>
            Nullstill
          </button>
          <button type="button" className="rounded bg-pool px-2 py-0.5" onClick={() => setOpen(!open)}>
            {open ? "–" : "+"}
          </button>
        </span>
      </div>
      {open && (
        <div className="grid gap-1.5">
          {row("shift px", p.shift, 0, 20, 0.5, (v) => update({ ...p, shift: v }))}
          {row("light", p.light, 0, 1, 0.01, (v) => update({ ...p, light: v }))}
          {row("light angle", p.lightAngle, 0, 360, 1, (v) => update({ ...p, lightAngle: v }))}
          {row("speed ×", p.speed, 0, 4, 0.05, (v) => update({ ...p, speed: v }))}
          {p.waves.map((w, i) => {
            const setW = (patch: Partial<Wave>) =>
              update({ ...p, waves: p.waves.map((x, j) => (j === i ? { ...x, ...patch } : x)) });
            return (
              <fieldset key={i} className="mt-1 grid gap-1 border-t border-foam/20 pt-1.5">
                <legend className="text-aqua">wave {i + 1}</legend>
                {row("angle °", w.angle, -180, 360, 1, (v) => setW({ angle: v }))}
                {row("length px", w.len, 20, 600, 1, (v) => setW({ len: v }))}
                {row("amplitude", w.amp, 0, 2, 0.01, (v) => setW({ amp: v }))}
                {row("speed px/s", w.speed, 0, 120, 1, (v) => setW({ speed: v }))}
              </fieldset>
            );
          })}
        </div>
      )}
    </div>
  );
}
