// A subtle animated dot-screen / halftone background, ported to a standalone
// full-screen shader. Mirrors the grainy WebGL backdrop of the original site.
export const dotScreenShader = {
  vertex: /* glsl */ `
    varying vec2 vUv;
    void main() {
      vUv = uv;
      gl_Position = vec4(position, 1.0);
    }
  `,
  fragment: /* glsl */ `
    precision highp float;
    varying vec2 vUv;
    uniform vec2  uResolution;
    uniform float uTime;
    uniform vec2  uMouse;

    float pattern(vec2 uv, float s) {
      float sx = sin(uv.x * s);
      float sy = sin(uv.y * s);
      return sx * sy;
    }

    void main() {
      vec2 uv = vUv;
      vec2 p = (uv - 0.5) * vec2(uResolution.x / uResolution.y, 1.0);

      // soft moving field influenced by the cursor
      float d = distance(p, (uMouse - 0.5) * vec2(uResolution.x / uResolution.y, 1.0));
      float wave = sin(d * 14.0 - uTime * 1.2) * 0.5 + 0.5;

      // halftone dots
      float scale = 220.0;
      float dots = pattern(uv + uTime * 0.002, scale);
      dots = smoothstep(0.0, 0.25, dots);

      float base = 0.04;                  // near-black backdrop
      float ink = mix(base, base + 0.06, dots * (0.4 + wave * 0.25));

      // subtle grain
      float g = fract(sin(dot(uv * uTime, vec2(12.9898, 78.233))) * 43758.5453);
      ink += (g - 0.5) * 0.02;

      gl_FragColor = vec4(vec3(ink), 1.0);
    }
  `,
}
