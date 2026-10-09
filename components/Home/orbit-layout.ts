/** Shared shell layout: every dashboard item gets one slot on a sphere around the portrait. */
export type SphereLayout = {
  /** Unit-scale starting points on the shell, evenly spread across what the screen shows. */
  dirs: { x: number; y: number; z: number }[];
  radius: number;
  badgeSize: number;
  portraitSize: number;
  /** Screen radius kept clear of the photo. */
  keepOut: number;
};

const GOLDEN = Math.PI * (3 - Math.sqrt(5));

export function getSphereLayout(count: number): SphereLayout {
  const total = Math.max(1, count);
  const radius = 0.4;
  const portraitSize = 0.22;
  let badgeSize = 0.08;
  let keepOut = radius * 0.45;
  // Tile size and the photo's clear zone depend on each other: settle both together.
  for (let pass = 0; pass < 2; pass++) {
    const clearance = badgeSize * Math.SQRT2;
    keepOut = Math.min(radius - clearance / 2, portraitSize / 2 + clearance / 2 + 0.02);
    const area = Math.PI * Math.max(0.02, radius * radius - keepOut * keepOut);
    badgeSize = Math.min(0.09, Math.sqrt(area / total) * 0.72);
  }
  // Even Fibonacci sphere: every tile keeps a fixed place, so the globe turns as one rigid body.
  const dirs = Array.from({ length: total }, (_, i) => {
    const y = 1 - (2 * (i + 0.5)) / total;
    const ring = Math.sqrt(1 - y * y);
    const angle = i * GOLDEN;
    return { x: Math.cos(angle) * ring * radius, y: y * radius * 0.92, z: Math.sin(angle) * ring * radius };
  });
  return { dirs, radius, badgeSize, portraitSize, keepOut };
}

export type FloatingPosition = { x: number; y: number; z: number };

export function createFloatingPositions(count: number): FloatingPosition[] {
  return Array.from({ length: count }, () => ({ x: 0, y: 0, z: 0 }));
}

/** Rigid rotation only — no pushing or clamping, so motion stays smooth and orderly. */
export function updateFloatingPositions(
  layout: SphereLayout,
  positions: FloatingPosition[],
  _time: number,
  yaw = 0,
  pitch = 0,
) {
  const cy = Math.cos(yaw), sy = Math.sin(yaw), cp = Math.cos(pitch), sp = Math.sin(pitch);
  layout.dirs.forEach((dir, i) => {
    const p = positions[i];
    if (!p) return;
    const x1 = dir.x * cy + dir.z * sy;
    const z1 = -dir.x * sy + dir.z * cy;
    p.x = x1;
    p.y = dir.y * cp - z1 * sp;
    p.z = dir.y * sp + z1 * cp;
  });
}
