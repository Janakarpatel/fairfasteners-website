'use client';

import { useEffect, useRef } from 'react';
import * as THREE from 'three';

const particleVert = /* glsl */ `
  attribute float aShade;
  attribute vec3 aNormal;

  uniform float uPointScale;
  uniform vec3 uLightDir;

  varying float vAlpha;
  varying float vBright;

  void main() {
    vec3 n = normalize(mat3(modelMatrix) * aNormal);
    float lit = pow(max(dot(n, normalize(uLightDir)), 0.0), 0.85);
    float shade = max(aShade, 0.12);
    vBright = clamp(0.16 + lit * 0.84, 0.12, 1.0) * shade;
    vAlpha = 0.55 + vBright * 0.45;

    vec4 mv = modelViewMatrix * vec4(position, 1.0);
    gl_Position = projectionMatrix * mv;
    gl_PointSize = uPointScale * mix(0.22, 1.15, vBright);
  }
`;

const particleFrag = /* glsl */ `
  varying float vAlpha;
  varying float vBright;
  uniform vec3 uColor;

  float sdRoundedBox(vec2 p, vec2 b, float r) {
    vec2 q = abs(p) - b + r;
    return min(max(q.x, q.y), 0.0) + length(max(q, 0.0)) - r;
  }

  void main() {
    vec2 p = gl_PointCoord - 0.5;
    vec2 x = vec2(p.x + p.y, p.y - p.x) * 0.70710678;
    float d = min(
      sdRoundedBox(x, vec2(0.27, 0.078), 0.068),
      sdRoundedBox(x, vec2(0.078, 0.27), 0.068)
    );
    float mark = 1.0 - smoothstep(-0.004, 0.016, d);
    if (mark < 0.08) discard;
    vec3 col = uColor * (0.82 + vBright * 0.18);
    gl_FragColor = vec4(col, mark * vAlpha);
  }
`;

const envVert = /* glsl */ `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = vec4(position.xy, 0.0, 1.0);
  }
`;

const envFrag = /* glsl */ `
  varying vec2 vUv;
  uniform vec3 uBg;

  void main() {
    vec3 col = uBg;
    vec2 c = vUv - vec2(0.5, 0.46);
    col += vec3(0.035, 0.18, 0.1) * (1.0 - smoothstep(0.08, 0.7, length(c * vec2(1.15, 1.0))));
    col *= 1.0 - 0.12 * length(vUv - vec2(0.5, 0.55));
    gl_FragColor = vec4(col, 1.0);
  }
`;

function sdEllipsoid(x: number, y: number, z: number, rx: number, ry: number, rz: number) {
  const k0 = Math.sqrt((x / rx) ** 2 + (y / ry) ** 2 + (z / rz) ** 2);
  const k1 = Math.sqrt((x / (rx * rx)) ** 2 + (y / (ry * ry)) ** 2 + (z / (rz * rz)) ** 2);
  return k0 * (k0 - 1) / Math.max(k1, 1e-6);
}

function sdCappedCylinderY(x: number, y: number, z: number, r: number, h: number) {
  const d = Math.sqrt(x * x + z * z) - r;
  const dy = Math.abs(y) - h;
  const out = Math.min(Math.max(d, dy), 0) + Math.hypot(Math.max(d, 0), Math.max(dy, 0));
  return out;
}

function smin(a: number, b: number, k: number) {
  const h = Math.max(k - Math.abs(a - b), 0) / k;
  return Math.min(a, b) - h * h * k * 0.25;
}

/** Older solid rivet: pan head + solid shank. */
function sdfSolidRivet(x: number, y: number, z: number) {
  const head = sdEllipsoid(x, y - 0.72, z, 0.7, 0.28, 0.7);
  const collar = sdCappedCylinderY(x, y - 0.52, z, 0.52, 0.07);
  const shank = sdCappedCylinderY(x, y + 0.38, z, 0.26, 0.92);
  const tip = sdEllipsoid(x, y + 1.28, z, 0.26, 0.09, 0.26);
  let d = smin(head, collar, 0.09);
  d = smin(d, shank, 0.07);
  d = smin(d, tip, 0.05);
  return d;
}

function sdfMandrel(x: number, y: number, z: number) {
  const pin = sdCappedCylinderY(x, y - 2.7, z, 0.145, 1.78);
  const pinTip = sdEllipsoid(x, y - 4.52, z, 0.13, 0.14, 0.13);
  return smin(pin, pinTip, 0.05);
}

function sdfNormal(sdf: (x: number, y: number, z: number) => number, x: number, y: number, z: number) {
  const e = 0.018;
  const nx = sdf(x + e, y, z) - sdf(x - e, y, z);
  const ny = sdf(x, y + e, z) - sdf(x, y - e, z);
  const nz = sdf(x, y, z + e) - sdf(x, y, z - e);
  const len = Math.hypot(nx, ny, nz) || 1;
  return [nx / len, ny / len, nz / len] as const;
}

function voxelizeSdf(
  sdf: (x: number, y: number, z: number) => number,
  res: readonly [number, number, number],
  extent: readonly [number, number, number],
  offset: readonly [number, number, number],
  positions: number[],
  shades: number[],
  normals: number[],
  opts?: {
    rotate180?: boolean;
    density?: number;
    center?: readonly [number, number, number];
    fill?: boolean;
  },
) {
  const [resX, resY, resZ] = res;
  const cellX = (extent[0] * 2) / resX;
  const cellY = (extent[1] * 2) / resY;
  const cellZ = (extent[2] * 2) / resZ;
  const cellMin = Math.min(cellX, cellY, cellZ);
  const rotate180 = opts?.rotate180 === true;
  const density = opts?.density ?? 1;
  const keepMod = density >= 0.99 ? 1 : density >= 0.8 ? 5 : 4;
  const keepMax = density >= 0.99 ? 0 : density >= 0.8 ? 1 : 1;
  const cx = opts?.center?.[0] ?? 0;
  const cy = opts?.center?.[1] ?? 0;
  const cz = opts?.center?.[2] ?? 0;
  const fill = opts?.fill === true;

  for (let iz = 0; iz < resZ; iz++) {
    for (let iy = 0; iy < resY; iy++) {
      for (let ix = 0; ix < resX; ix++) {
        if (keepMod > 1 && (ix + iy * 2 + iz * 3) % keepMod < keepMax) continue;
        const x = cx - extent[0] + (ix + 0.5) * cellX;
        const y = cy - extent[1] + (iy + 0.5) * cellY;
        const z = cz - extent[2] + (iz + 0.5) * cellZ;
        const d = sdf(x, y, z);
        if (d >= 0) continue;
        if (!fill && d < -cellMin * 2.2 && (ix + iy + iz) % 2 === 1) continue;
        const n = sdfNormal(sdf, x, y, z);
        const px = x;
        const py = rotate180 ? -y : y;
        const pz = rotate180 ? -z : z;
        positions.push(px + offset[0], py + offset[1], pz + offset[2]);
        normals.push(n[0], rotate180 ? -n[1] : n[1], rotate180 ? -n[2] : n[2]);
        shades.push(THREE.MathUtils.clamp(1 + d * 1.4, 0.25, 1));
      }
    }
  }
}

function voxelizeRivets(resolution: number) {
  const positions: number[] = [];
  const shades: number[] = [];
  const normals: number[] = [];
  const r = resolution;
  voxelizeSdf(
    sdfSolidRivet,
    [r, r, r],
    [1.45, 1.55, 1.45],
    [-1.48, 0.19, 0],
    positions,
    shades,
    normals,
    { density: 0.72 },
  );
  const popOffset = [1.48, 1.65, 0] as const;
  voxelizeSdf(
    sdfSolidRivet,
    [Math.max(24, Math.floor(r * 0.85)), Math.max(28, Math.floor(r * 0.95)), Math.max(24, Math.floor(r * 0.85))],
    [1.35, 1.55, 1.35],
    popOffset,
    positions,
    shades,
    normals,
    { rotate180: true },
  );
  voxelizeSdf(
    sdfMandrel,
    [14, Math.max(48, Math.floor(r * 1.3)), 14],
    [0.28, 2.0, 0.28],
    popOffset,
    positions,
    shades,
    normals,
    { rotate180: true, center: [0, 2.7, 0] },
  );

  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
  geometry.setAttribute('aShade', new THREE.Float32BufferAttribute(shades, 1));
  geometry.setAttribute('aNormal', new THREE.Float32BufferAttribute(normals, 3));
  return geometry;
}

export default function DottedScene({ reduce = false }: { reduce?: boolean | null }) {
  const hostRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const host = hostRef.current;
    if (!host) return;

    const mobile = window.matchMedia('(max-width: 768px)').matches;
    const resolution = mobile ? 30 : 42;

    const renderer = new THREE.WebGLRenderer({
      antialias: false,
      alpha: false,
      powerPreference: 'high-performance',
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, mobile ? 1.5 : 2));
    renderer.setSize(host.clientWidth, host.clientHeight);
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.autoClear = false;
    host.appendChild(renderer.domElement);

    const aspect = host.clientWidth / Math.max(host.clientHeight, 1);
    const frustum = mobile ? 3.85 : 3.2;
    const panX = mobile ? 0.2 : 1.65;
    const camera = new THREE.OrthographicCamera(
      -frustum * aspect - panX,
      frustum * aspect - panX,
      frustum,
      -frustum,
      0.1,
      40,
    );
    camera.position.set(0, 0, 8);
    camera.lookAt(0, 0, 0);

    const envScene = new THREE.Scene();
    const envMat = new THREE.ShaderMaterial({
      vertexShader: envVert,
      fragmentShader: envFrag,
      uniforms: { uBg: { value: new THREE.Color('#0b3d36') } },
      depthWrite: false,
    });
    envScene.add(new THREE.Mesh(new THREE.PlaneGeometry(2, 2), envMat));
    const envCam = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);

    const scene = new THREE.Scene();
    const geometry = voxelizeRivets(resolution);
    const material = new THREE.ShaderMaterial({
      vertexShader: particleVert,
      fragmentShader: particleFrag,
      transparent: true,
      depthWrite: false,
      uniforms: {
        uPointScale: { value: mobile ? 9.5 : 16.5 },
        uLightDir: { value: new THREE.Vector3(0.55, 0.7, 0.55).normalize() },
        uColor: { value: new THREE.Color('#f2f6f5') },
      },
    });
    const points = new THREE.Points(geometry, material);
    scene.add(points);

    const pointer = { x: 0, y: 0, tx: 0, ty: 0 };
    const onPointer = (e: PointerEvent) => {
      pointer.tx = (e.clientX / window.innerWidth) * 2 - 1;
      pointer.ty = (e.clientY / window.innerHeight) * 2 - 1;
    };
    window.addEventListener('pointermove', onPointer, { passive: true });

    const clock = new THREE.Clock();
    let frame = 0;
    const euler = new THREE.Euler();
    const q = new THREE.Quaternion();

    const poseAt = (t: number) => {
      euler.set(
        0.18 + Math.sin(t * 0.14) * 0.04 - pointer.y * 0.1,
        t * 0.12 + pointer.x * 0.18,
        0.06 + Math.sin(t * 0.1) * 0.03,
        'XYZ',
      );
      q.setFromEuler(euler);
      points.quaternion.copy(q);
      points.position.set(
        pointer.x * 0.08,
        Math.sin(t * 0.22) * 0.04 - pointer.y * 0.05,
        0,
      );
    };

    const onResize = () => {
      const nw = Math.max(host.clientWidth, 1);
      const nh = Math.max(host.clientHeight, 1);
      const a = nw / nh;
      const isMobile = nw < 768;
      const f = isMobile ? 3.85 : 3.2;
      const p = isMobile ? 0.2 : 1.65;
      camera.left = -f * a - p;
      camera.right = f * a - p;
      camera.top = f;
      camera.bottom = -f;
      camera.updateProjectionMatrix();
      renderer.setSize(nw, nh);
      material.uniforms.uPointScale.value = isMobile ? 9.5 : 16.5;
    };
    const ro = new ResizeObserver(onResize);
    ro.observe(host);

    const renderFrame = () => {
      const t = clock.getElapsedTime();
      pointer.x += (pointer.tx - pointer.x) * 0.045;
      pointer.y += (pointer.ty - pointer.y) * 0.045;
      poseAt(t);

      material.uniforms.uLightDir.value
        .set(0.45 + Math.sin(t * 0.2) * 0.2, 0.72, 0.5 + Math.cos(t * 0.2) * 0.15)
        .normalize();

      renderer.clear();
      renderer.render(envScene, envCam);
      renderer.render(scene, camera);
    };

    const tick = () => {
      frame = requestAnimationFrame(tick);
      renderFrame();
    };

    if (reduce) {
      poseAt(0.6);
      renderFrame();
    } else {
      tick();
    }

    return () => {
      cancelAnimationFrame(frame);
      ro.disconnect();
      window.removeEventListener('pointermove', onPointer);
      geometry.dispose();
      material.dispose();
      envMat.dispose();
      renderer.dispose();
      renderer.domElement.remove();
    };
  }, [reduce]);

  return <div ref={hostRef} className="pointer-events-none absolute inset-0 z-[1]" aria-hidden />;
}
