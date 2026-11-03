"use client";

import { useEffect, useRef, useState } from "react";
import { WAVES, causFS, causVS, viewFS, viewVS } from "./shaders";

/**
 * Animated pool water behind the hero diver.
 * Layers: WebGL water + caustics -> cut-out diver and board -> the same dark tint as the static photo.
 * The static hero photo stays underneath as the fallback (reduced motion, no WebGL, before the first frame).
 */

// Synced from the prototype's defaults.json (DEVFLOW/stupeklubben-hero-water/caustics-proto).
const P = {
  camHeight: 5, fov: 55, pitch: 38, roll: 9, yaw: 0, depth: 3.5, tile: 2.4, amp: 0.008, speed: 0.3,
  bigMix: 1, midMix: 0.8, smallMix: 0.55, bigGain: 0.5, midGain: 0.45, smallGain: 0.4, bigRate: 0.02,
  midRate: 0.045, smallRate: 0.1, sunElev: 62, sunAz: 135, caustic: 0.83, blur: 1.4, contrast: 0.63,
  sparkle: 0.2, sky: 0.25, mix2: 0.5, variation: 0.65, varScale: 0.45, tileStr: 0.22, tileSize: 0.38,
  grout: 0.015, tileVar: 0.155, tileAngle: -42, tileFog: 0.3, tileBlur: 0.6, breakup: 0.65, breakScale: 2.8,
  absorb: 1.25, floor: 0.93, ambient: 0.35, sunDiffuse: 0.57, scatter: 1.36, green: 0.56, sat: 0.66,
  castOn: 0.45, castX: 0.235, castY: -0.365, castBlur: 6.4, castWobble: 0.06, lightStr: 0.63,
  lightAngle: 200, lightSoft: 0.38, vignette: 0.29, darken: 0.02, resScale: 0.75,
};

// Same geometry as the section's CSS background (hero-diver-wide.avif, cover, position 100% / max(100%, min(0, 100px - 10.42vw))).
const IMG_W = 3840;
const IMG_H = 2151;

// Mobile (≤ 900 px) shows hero-diver.avif (2880×1920), a different shot of the same diver. The wide scene is placed so
// its diver lands on the mobile one: wide px = MOB_K * mobile px + (MOB_TX, MOB_TY), fitted on the upper body.
const MOB_W = 2880;
const MOB_H = 1920;
const MOB_K = 0.89;
const MOB_TX = 640;
const MOB_TY = 112;

const VIEW_UNIFORMS: Record<string, keyof typeof P> = {
  uCausStr: "caustic", uBlur: "blur", uContrast: "contrast", uSparkle: "sparkle", uSky: "sky",
  uAbsorb: "absorb", uFloor: "floor", uAmbient: "ambient",
  uLightStr: "lightStr", uLightAngle: "lightAngle", uLightSoft: "lightSoft",
  uVignette: "vignette", uDarken: "darken",
  uMix2: "mix2", uVariation: "variation", uVarScale: "varScale",
  uTileStr: "tileStr", uTileSize: "tileSize", uGrout: "grout", uTileVar: "tileVar",
  uTileFog: "tileFog", uTileBlur: "tileBlur", uTileAngle: "tileAngle", uBreakup: "breakup", uBreakScale: "breakScale",
  uScatter: "scatter", uGreen: "green", uSat: "sat",
  uSunDiffuse: "sunDiffuse", uCastOn: "castOn", uCastBlur: "castBlur", uCastWobble: "castWobble",
};

// Bounded random walk: 2nd-order Ornstein–Uhlenbeck, unit variance; drives wave-group amplitude only.
function gauss() {
  let u = 0;
  let v = 0;
  while (!u) u = Math.random();
  while (!v) v = Math.random();
  return Math.sqrt(-2 * Math.log(u)) * Math.cos(2 * Math.PI * v);
}
class OU2 {
  x = 0;
  v = 0;
  step(dt: number, rate: number) {
    const w = 2 * Math.PI * rate;
    const z = 0.7;
    const k = Math.sqrt(4 * z * w * w * w);
    this.v += (-w * w * this.x - 2 * z * w * this.v) * dt + k * Math.sqrt(dt) * gauss();
    this.x += this.v * dt;
    if (!Number.isFinite(this.x) || !Number.isFinite(this.v)) {
      this.x = 0;
      this.v = 0;
    }
  }
}
const ampOf = (ou: OU2, gain: number) => Math.max(0.15, 1 + gain * Math.tanh(ou.x * 0.8));

type Mat3 = number[];
function mul(A: Mat3, B: Mat3): Mat3 {
  const C = new Array(9).fill(0);
  for (let c = 0; c < 3; c++) for (let r = 0; r < 3; r++) for (let k = 0; k < 3; k++) C[c * 3 + r] += A[k * 3 + r] * B[c * 3 + k];
  return C;
}
const Rx = (a: number): Mat3 => [1, 0, 0, 0, Math.cos(a), Math.sin(a), 0, -Math.sin(a), Math.cos(a)];
const Ry = (a: number): Mat3 => [Math.cos(a), 0, -Math.sin(a), 0, 1, 0, Math.sin(a), 0, Math.cos(a)];
const Rz = (a: number): Mat3 => [Math.cos(a), Math.sin(a), 0, -Math.sin(a), Math.cos(a), 0, 0, 0, 1];
function camMatrix(): Mat3 {
  const d = Math.PI / 180;
  const base: Mat3 = [1, 0, 0, 0, 0, 1, 0, 1, 0]; // camX=+X, camY=+Z (screen up), camZ=+Y -> view axis looks down
  return mul(Ry(P.yaw * d), mul(base, mul(Rx(P.pitch * d), Rz(P.roll * d))));
}
function sunDir(): [number, number, number] {
  const d = Math.PI / 180;
  const e = P.sunElev * d;
  const a = P.sunAz * d;
  return [Math.cos(e) * Math.cos(a), Math.sin(e), Math.cos(e) * Math.sin(a)];
}

export default function HeroWater() {
  const layerRef = useRef<HTMLDivElement>(null);
  const boxRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const layer = layerRef.current;
    const box = boxRef.current;
    const canvas = canvasRef.current;
    if (!layer || !box || !canvas) return;
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const gl = canvas.getContext("webgl2", { antialias: false, powerPreference: "low-power" });
    if (!gl || gl.isContextLost()) return;
    const floatRT = !!gl.getExtension("EXT_color_buffer_float");

    const compile = (type: number, src: string) => {
      const s = gl.createShader(type)!;
      gl.shaderSource(s, src);
      gl.compileShader(s);
      if (!gl.getShaderParameter(s, gl.COMPILE_STATUS)) throw new Error(gl.getShaderInfoLog(s) ?? "shader");
      return s;
    };
    const program = (vs: string, fs: string) => {
      const p = gl.createProgram()!;
      gl.attachShader(p, compile(gl.VERTEX_SHADER, vs));
      gl.attachShader(p, compile(gl.FRAGMENT_SHADER, fs));
      gl.linkProgram(p);
      if (!gl.getProgramParameter(p, gl.LINK_STATUS)) throw new Error(gl.getProgramInfoLog(p) ?? "link");
      const U: Record<string, WebGLUniformLocation | null> = {};
      const n = gl.getProgramParameter(p, gl.ACTIVE_UNIFORMS) as number;
      for (let i = 0; i < n; i++) {
        const name = gl.getActiveUniform(p, i)!.name.replace(/\[0\]$/, "");
        U[name] = gl.getUniformLocation(p, name);
      }
      return { p, U };
    };
    void WAVES; // shared block, already interpolated into the shader sources
    let causProg: ReturnType<typeof program>;
    let viewProg: ReturnType<typeof program>;
    try {
      causProg = program(causVS, causFS);
      viewProg = program(viewVS, viewFS);
    } catch (e) {
      console.warn("HeroWater: shader failed, keeping the photo", e);
      return;
    }

    // caustic grid (uploaded once)
    const N = 220;
    const M = 0.3;
    const gridV = new Float32Array((N + 1) * (N + 1) * 2);
    for (let j = 0, k = 0; j <= N; j++)
      for (let i = 0; i <= N; i++) {
        gridV[k++] = -M + ((1 + 2 * M) * i) / N;
        gridV[k++] = -M + ((1 + 2 * M) * j) / N;
      }
    const gridI = new Uint32Array(N * N * 6);
    for (let j = 0, k = 0; j < N; j++)
      for (let i = 0; i < N; i++) {
        const a = j * (N + 1) + i;
        const b = a + 1;
        const c = a + N + 1;
        const d = c + 1;
        gridI.set([a, b, c, b, d, c], k);
        k += 6;
      }
    const causVAO = gl.createVertexArray();
    gl.bindVertexArray(causVAO);
    gl.bindBuffer(gl.ARRAY_BUFFER, gl.createBuffer());
    gl.bufferData(gl.ARRAY_BUFFER, gridV, gl.STATIC_DRAW);
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, gl.createBuffer());
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, gridI, gl.STATIC_DRAW);
    let loc = gl.getAttribLocation(causProg.p, "aP");
    gl.enableVertexAttribArray(loc);
    gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0);
    const quadVAO = gl.createVertexArray();
    gl.bindVertexArray(quadVAO);
    gl.bindBuffer(gl.ARRAY_BUFFER, gl.createBuffer());
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);
    loc = gl.getAttribLocation(viewProg.p, "aP");
    gl.enableVertexAttribArray(loc);
    gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0);
    gl.bindVertexArray(null);

    // tiling caustic map, mipmapped for blur
    const CS = 512;
    const causTex = gl.createTexture();
    gl.bindTexture(gl.TEXTURE_2D, causTex);
    gl.texStorage2D(gl.TEXTURE_2D, Math.log2(CS) + 1, floatRT ? gl.RGBA16F : gl.RGBA8, CS, CS);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.REPEAT);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.REPEAT);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR_MIPMAP_LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
    const fbo = gl.createFramebuffer();
    gl.bindFramebuffer(gl.FRAMEBUFFER, fbo);
    gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, causTex, 0);
    gl.bindFramebuffer(gl.FRAMEBUFFER, null);
    const causScaleOut = floatRT ? 1.0 : 0.125;
    const causNorm = floatRT ? 1.0 : 8.0;

    // diver + board silhouette for the cast shadow (same image as the overlay), mipmapped for blur
    const diverTex = gl.createTexture();
    gl.bindTexture(gl.TEXTURE_2D, diverTex);
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, 1, 1, 0, gl.RGBA, gl.UNSIGNED_BYTE, new Uint8Array([0, 0, 0, 0]));
    const dvImg = new Image();
    dvImg.onload = () => {
      gl.bindTexture(gl.TEXTURE_2D, diverTex);
      gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, dvImg);
      gl.generateMipmap(gl.TEXTURE_2D);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR_MIPMAP_LINEAR);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
    };
    dvImg.src = "/images/hero-water/diver-wide.avif";

    // place the box exactly where the CSS background image sits; the canvas covers only its visible part
    const crop = [0, 0, 1, 1];
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
      crop.splice(0, 4, x0 / dw, 1 - (y0 + ch) / dh, cw / dw, ch / dh);
      const scale = Math.min(Math.min(devicePixelRatio || 1, 2) * P.resScale, 2400 / Math.max(cw, ch));
      canvas.width = Math.max(1, Math.round(cw * scale));
      canvas.height = Math.max(1, Math.round(ch * scale));
    };
    const ro = new ResizeObserver(layout);
    ro.observe(layer);
    layout();

    let visible = true;
    const io = new IntersectionObserver(([e]) => (visible = e.isIntersecting));
    io.observe(layer);

    const ouBig = new OU2();
    const ouMid = new OU2();
    const ouSmall = new OU2();
    let T = 0;
    let last = performance.now();
    let raf = 0;
    let first = true;

    const setWave = (U: Record<string, WebGLUniformLocation | null>) => {
      gl.uniform1f(U.uAmp, P.amp);
      gl.uniform1f(U.uSpeed, P.speed);
      gl.uniform1f(U.uTile, P.tile);
      gl.uniform1f(U.uT, T);
      gl.uniform3f(U.uGroup, ampOf(ouBig, P.bigGain) * P.bigMix, ampOf(ouMid, P.midGain) * P.midMix, ampOf(ouSmall, P.smallGain) * P.smallMix);
    };

    const frame = (now: number) => {
      raf = requestAnimationFrame(frame);
      const dt = Math.min(0.05, Math.max(0, (now - last) / 1000)); // first rAF stamp can precede performance.now()
      last = now;
      if (!visible || document.hidden) return;
      T += dt;
      ouBig.step(dt, P.bigRate);
      ouMid.step(dt, P.midRate);
      ouSmall.step(dt, P.smallRate);
      const sun = sunDir();

      gl.bindFramebuffer(gl.FRAMEBUFFER, fbo);
      gl.viewport(0, 0, CS, CS);
      gl.clearColor(0, 0, 0, 1);
      gl.clear(gl.COLOR_BUFFER_BIT);
      gl.enable(gl.BLEND);
      gl.blendFunc(gl.ONE, gl.ONE);
      gl.useProgram(causProg.p);
      setWave(causProg.U);
      gl.uniform3f(causProg.U.uSun, ...sun);
      gl.uniform1f(causProg.U.uDepth, P.depth);
      gl.uniform1f(causProg.U.uScaleOut, causScaleOut);
      gl.bindVertexArray(causVAO);
      gl.drawElements(gl.TRIANGLES, gridI.length, gl.UNSIGNED_INT, 0);
      gl.disable(gl.BLEND);
      gl.bindFramebuffer(gl.FRAMEBUFFER, null);
      gl.bindTexture(gl.TEXTURE_2D, causTex);
      gl.generateMipmap(gl.TEXTURE_2D);

      gl.viewport(0, 0, canvas.width, canvas.height);
      gl.useProgram(viewProg.p);
      const U = viewProg.U;
      setWave(U);
      gl.uniform2f(U.uRes, IMG_W, IMG_H); // aspect of the whole image box, not of the cropped canvas
      gl.uniform4f(U.uCrop, crop[0], crop[1], crop[2], crop[3]);
      gl.uniformMatrix3fv(U.uCam, false, camMatrix());
      gl.uniform1f(U.uCamH, P.camHeight);
      gl.uniform1f(U.uFov, P.fov);
      gl.uniform3f(U.uSun, ...sun);
      gl.uniform1f(U.uDepth, P.depth);
      for (const u in VIEW_UNIFORMS) gl.uniform1f(U[u], P[VIEW_UNIFORMS[u]]);
      gl.uniform1f(U.uCausNorm, causNorm);
      gl.uniform1f(U.uShowMap, 0);
      gl.activeTexture(gl.TEXTURE0);
      gl.bindTexture(gl.TEXTURE_2D, causTex);
      gl.uniform1i(U.uCaus, 0);
      gl.activeTexture(gl.TEXTURE1);
      gl.bindTexture(gl.TEXTURE_2D, diverTex);
      gl.uniform1i(U.uDiver, 1);
      gl.uniform2f(U.uCastOff, P.castX, P.castY);
      gl.bindVertexArray(quadVAO);
      gl.drawArrays(gl.TRIANGLES, 0, 3);
      gl.activeTexture(gl.TEXTURE0);
      if (first) {
        first = false;
        setReady(true);
      }
    };
    raf = requestAnimationFrame(frame);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      io.disconnect();
      // no loseContext(): React Strict Mode remounts on the same canvas and would get a dead context
    };
  }, []);

  return (
    <div
      ref={layerRef}
      aria-hidden="true"
      className={`pointer-events-none absolute inset-0 z-[1] overflow-hidden transition-opacity duration-700 ${ready ? "opacity-100" : "opacity-0"}`}
    >
      <div ref={boxRef} className="absolute">
        <canvas ref={canvasRef} className="absolute" />
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/images/hero-water/diver-wide.avif" alt="" className="absolute inset-0 h-full w-full" />
      </div>
      {/* same tint the static photo has (linear-gradient rgba(8,33,41,0.33)) */}
      <div className="absolute inset-0 bg-[rgba(8,33,41,0.33)]" />
    </div>
  );
}
