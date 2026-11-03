// GLSL ported verbatim from the caustics prototype (DEVFLOW/stupeklubben-hero-water/caustics-proto).
// Wave model, area-ratio caustic map, and perspective view through the water.

export const WAVES = `
const int NW = 12;
const vec2 WN[NW] = vec2[NW](vec2(1,1), vec2(-1,2), vec2(2,-1), vec2(-2,-1),
                             vec2(3,1), vec2(-2,3), vec2(1,-4), vec2(4,-3),
                             vec2(6,2), vec2(-4,5), vec2(3,7), vec2(-7,-2));
const float WPH[NW] = float[NW](0.3, 2.1, 4.0, 5.1, 1.2, 5.3, 2.9, 0.4, 0.7, 3.8, 5.9, 2.2);
uniform float uAmp, uSpeed, uTile, uT;
uniform vec3 uGroup;
// (height m, dh/dx, dh/dz) in world metres
vec3 wave(vec2 p) {
  vec3 r = vec3(0.0);
  for (int i = 0; i < NW; i++) {
    vec2 n = WN[i];
    float kp = 6.2831853 * length(n) / uTile;
    float w = sqrt(9.81 * kp) * uSpeed;
    float g = i < 4 ? uGroup.x : (i < 8 ? uGroup.y : uGroup.z);
    float a = uAmp * g * pow(length(WN[0]) / length(n), 0.9);
    float ph = 6.2831853 * dot(n, p) - w * uT + WPH[i];
    r.x += a * sin(ph);
    r.yz += a * cos(ph) * 6.2831853 * n / uTile;
  }
  return r;
}
vec3 waveNormal(vec2 p) { vec3 w = wave(p); return normalize(vec3(-w.y, 1.0, -w.z)); }
`;

export const causVS = `#version 300 es
in vec2 aP;
uniform vec3 uSun; uniform float uDepth;
out vec2 vOld; out vec2 vNew;
${WAVES}
void main() {
  vec3 Lin = -uSun;
  vec3 n = waveNormal(aP);
  vec3 r = refract(Lin, n, 1.0 / 1.333);
  vec3 r0 = refract(Lin, vec3(0.0, 1.0, 0.0), 1.0 / 1.333);
  float d = uDepth / uTile;
  vec2 off0 = r0.xz * (d / -r0.y);
  vNew = aP + r.xz * (d / -r.y) - off0;      // shifted so a flat surface maps aP -> aP
  vOld = aP;
  gl_Position = vec4(vNew * 2.0 - 1.0, 0.0, 1.0);
}`;

export const causFS = `#version 300 es
precision highp float;
in vec2 vOld; in vec2 vNew; out vec4 o;
uniform float uScaleOut;
void main() {
  float aOld = abs(dFdx(vOld).x * dFdy(vOld).y - dFdx(vOld).y * dFdy(vOld).x);
  float aNew = abs(dFdx(vNew).x * dFdy(vNew).y - dFdx(vNew).y * dFdy(vNew).x);
  float I = clamp(aOld / max(aNew, 1e-10), 0.0, 40.0);
  o = vec4(vec3(I * uScaleOut), 1.0);
}`;

export const viewVS = `#version 300 es
uniform vec4 uCrop; // visible part of the image box: x, y (from the bottom), width, height in uv
in vec2 aP; out vec2 uv; void main(){ uv = uCrop.xy + (aP * 0.5 + 0.5) * uCrop.zw; gl_Position = vec4(aP, 0.0, 1.0); }`;

export const viewFS = `#version 300 es
precision highp float;
in vec2 uv; out vec4 o;
uniform vec2 uRes; uniform mat3 uCam; uniform float uCamH, uFov;
uniform vec3 uSun; uniform float uDepth;
uniform sampler2D uCaus, uShadow, uDiver;
uniform vec2 uCastOff; uniform float uCastOn, uCastBlur, uCastWobble, uSunDiffuse;
uniform float uCausStr, uBlur, uContrast, uSparkle, uSky, uAbsorb, uFloor, uAmbient, uCausNorm, uShowMap;
uniform float uShadowStr, uLightStr, uLightAngle, uLightSoft, uVignette, uDarken;
uniform float uMix2, uVariation, uVarScale, uTileStr, uTileSize, uGrout, uTileVar, uTileFog, uTileBlur, uTileAngle, uBreakup, uBreakScale, uScatter, uGreen, uSat;
${WAVES}
float h21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
float vnoise(vec2 p){ vec2 i = floor(p), f = fract(p); vec2 u = f*f*(3.0-2.0*f);
  return mix(mix(h21(i), h21(i+vec2(1,0)), u.x), mix(h21(i+vec2(0,1)), h21(i+vec2(1,1)), u.x), u.y); }
float fbm(vec2 p){ float a = 0.5, r = 0.0; for (int i = 0; i < 4; i++){ r += a * vnoise(p); p = mat2(1.6,1.2,-1.2,1.6) * p; a *= 0.5; } return r; }
void main() {
  float aspect = uRes.x / uRes.y;
  if (uShowMap > 0.5 && uv.x < 0.24 && uv.y < 0.24 * aspect) {
    float c = texture(uCaus, uv / 0.24 * vec2(1.0, 1.0 / aspect) * 2.0).r * uCausNorm;
    o = vec4(vec3(c * 0.35), 1.0); return;
  }
  vec2 s = (uv * 2.0 - 1.0) * vec2(aspect, 1.0) * tan(radians(uFov) * 0.5);
  vec3 dir = normalize(uCam * vec3(s.x, s.y, -1.0));
  if (dir.y > -0.02) { o = vec4(0.02, 0.16, 0.2, 1.0); return; }
  float t = uCamH / -dir.y;
  vec2 surf = dir.xz * t;                         // metres on the water surface (camera above origin)
  vec3 n = waveNormal(surf / uTile);

  vec3 rv = refract(dir, n, 1.0 / 1.333);
  float lw = uDepth / -rv.y;                      // path length in water (m)
  vec2 fl = surf + rv.xz * lw;                    // floor point (m)
  // two samples of the tiling map with incommensurate scale and rotation, mixed by world-space noise
  vec2 fa = fl / uTile;
  mat2 R = mat2(0.7986, 0.6018, -0.6018, 0.7986);           // ~37 degrees
  vec2 fb = R * fl / (uTile * 1.618) + vec2(0.37, 0.71);
  float ca = textureLod(uCaus, fa, uBlur).r, cb = textureLod(uCaus, fb, uBlur + 0.3).r;
  float m = smoothstep(0.3, 0.7, fbm(fl * uVarScale * 0.6 + 4.1));
  float caus = mix(ca, mix(ca, cb, m), uMix2) * uCausNorm;
  // each region of threads gets its own chance to show (slow, non-repeating)
  float vis = smoothstep(0.25, 0.75, fbm(fl * uVarScale + vec2(uT * 0.015, -uT * 0.01)));
  caus *= mix(1.0, 0.25 + 1.2 * vis, uVariation);
  // break threads into segments at their own scale, so they never form clean closed loops
  float brk = smoothstep(0.38, 0.62, fbm(fl * uBreakScale + vec2(-uT * 0.02, uT * 0.013)))
            * smoothstep(0.30, 0.55, fbm(fl * uBreakScale * 2.3 + 17.0));
  caus *= mix(1.0, brk * 1.8, uBreakup);
  caus = pow(max(caus, 0.0), uContrast);

  vec3 sigma = vec3(0.42, 0.075, 0.055) * uAbsorb;   // per metre – red goes first
  float lsun = uDepth / max(uSun.y, 0.2);
  vec3 Tsun = exp(-sigma * lsun), Tview = exp(-sigma * lw);
  // cast shadow: the diver + board silhouette shifted away from the sun, blurred, wobbling with the waves
  vec2 cuv = uv - uCastOff + n.xz * uCastWobble;
  float ca0 = (cuv.x < 0.0 || cuv.x > 1.0 || cuv.y < 0.0 || cuv.y > 1.0) ? 0.0
            : textureLod(uDiver, vec2(cuv.x, 1.0 - cuv.y), uCastBlur).a;
  float sh = 1.0 - ca0 * uCastOn;

  float ang = radians(uLightAngle); vec2 ld = vec2(cos(ang), sin(ang));
  float grad = clamp(0.5 + dot(uv - 0.5, -ld) / uLightSoft, 0.0, 1.0);
  float lightMod = mix(1.0 - uLightStr, 1.0, grad);

  // pool floor: square tiles with grout, small per-tile tone variation, anti-aliased by screen footprint
  // tile grid aligned with the pool axis (parallel to the springboard)
  float ta = radians(uTileAngle); vec2 td = vec2(cos(ta), sin(ta));
  vec2 tq = vec2(dot(fl, td), dot(fl, vec2(-td.y, td.x))) / uTileSize; vec2 ti = floor(tq), tf = fract(tq);
  float edge = min(min(tf.x, 1.0 - tf.x), min(tf.y, 1.0 - tf.y));
  float far = max(lw - uDepth, 0.0);
  float aa = max(fwidth(tq.x), fwidth(tq.y)) + uTileBlur * far * 0.04 / uTileSize;
  float tileVis = exp(-uTileFog * far);
  float groutLine = 1.0 - smoothstep(uGrout * 0.5, uGrout * 0.5 + aa * 1.5, edge);
  groutLine *= 1.0 - smoothstep(0.15, 0.5, aa);              // fade where tiles get too small to resolve
  float tone = 1.0 + (h21(ti) - 0.5) * 2.0 * uTileVar;
  vec3 tileC = vec3(0.80, 0.95, 0.97) * tone;
  vec3 groutC = vec3(0.45, 0.62, 0.66);
  tone = mix(1.0, tone, tileVis * (1.0 - smoothstep(0.2, 0.8, aa)));
  tileC = vec3(0.80, 0.95, 0.97) * tone;
  vec3 floorC = mix(vec3(0.80, 0.95, 0.97), mix(tileC, groutC, groutLine * tileVis), uTileStr * tileVis) * uFloor;
  // sky light reaches the shadow, direct sun (diffuse + caustics) does not
  vec3 floorLit = floorC * (uAmbient + uSunDiffuse * sh + uCausStr * caus * lightMod * sh) * Tsun;
  vec3 scatter = mix(vec3(0.010, 0.17, 0.27), vec3(0.035, 0.26, 0.22), 0.5 + 0.5 * uGreen) * uScatter;
  vec3 col = floorLit * Tview + scatter * (1.0 - Tview);

  float cosi = clamp(dot(-dir, n), 0.0, 1.0);
  float F = 0.02 + 0.98 * pow(1.0 - cosi, 5.0);
  col = mix(col, vec3(0.55, 0.78, 0.9), clamp(F * uSky * 3.0, 0.0, 1.0));
  vec3 rr = reflect(dir, n);
  col += vec3(1.0, 0.98, 0.92) * pow(max(dot(rr, uSun), 0.0), 900.0) * uSparkle * 6.0 * sh;

  float lum = dot(col, vec3(0.2126, 0.7152, 0.0722));
  col = max(mix(vec3(lum), col, uSat), 0.0);
  vec2 v = uv - 0.5; v.x *= aspect;
  col *= (1.0 - uDarken) * (1.0 - uVignette * smoothstep(0.35, 1.05, length(v)));
  o = vec4(pow(col, vec3(0.9)), 1.0);
}`;
