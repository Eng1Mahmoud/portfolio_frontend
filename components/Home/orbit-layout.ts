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
  // Slots fill the ring the screen actually shows, each at its true depth on the sphere.
  const dirs = Array.from({ length: total }, (_, i) => {
    const r = Math.sqrt(
      keepOut * keepOut + (radius * radius - keepOut * keepOut) * ((i + 0.5) / total),
    );
    const angle = i * GOLDEN;
    const depth = Math.sqrt(Math.max(0, radius * radius - r * r));
    return { x: Math.cos(angle) * r, y: Math.sin(angle) * r, z: (i % 2 ? -1 : 1) * depth };
  });
  return { dirs, radius, badgeSize, portraitSize, keepOut };
}

export type FloatingPosition = { x: number; y: number; z: number };

export function createFloatingPositions(count: number): FloatingPosition[] {
  return Array.from({ length: count }, () => ({ x: 0, y: 0, z: 0 }));
}

/** Turn the shell, keep the photo clear, then even the gaps out on screen. */
export function updateFloatingPositions(
  layout: SphereLayout,
  positions: FloatingPosition[],
  time: number,
  yaw = 0,
  pitch = 0,
) {
  const clearance = layout.badgeSize * Math.SQRT2;
  const maxRadius = 0.5 - clearance / 2 - 0.015;
  const separation = clearance + 0.012;
  const cy = Math.cos(yaw);
  const sy = Math.sin(yaw);
  const cp = Math.cos(pitch);
  const sp = Math.sin(pitch);

  layout.dirs.forEach((dir, i) => {
    const p = positions[i];
    if (!p) return;
    // A slow breath keeps the shell alive without changing the spacing.
    const breathe = 1 + Math.sin(time * 0.45 + i * 2.399) * 0.018;
    const x = dir.x * breathe;
    const y = dir.y * breathe;
    const z = dir.z * breathe;
    const x1 = x * cy + z * sy;
    const z1 = -x * sy + z * cy;
    const y1 = y * cp - z1 * sp;
    const z2 = y * sp + z1 * cp;
    const screenRadius = Math.hypot(x1, y1);
    const bounded = Math.min(maxRadius, Math.max(layout.keepOut, screenRadius));
    if (screenRadius > 0.0001) {
      const k = bounded / screenRadius;
      p.x = x1 * k;
      p.y = y1 * k;
    } else {
      p.x = 0;
      p.y = bounded;
    }
    p.z = z2;
  });

  // Tiles stay apart while the shell turns; depth is left alone.
  for (let pass = 0; pass < 12; pass++) {
    for (let i = 0; i < positions.length; i++) {
      const a = positions[i];
      for (let j = i + 1; j < positions.length; j++) {
        const b = positions[j];
        const dx = a.x - b.x;
        const dy = a.y - b.y;
        const distance = Math.hypot(dx, dy);
        const soft = separation * 1.3;
        if (distance >= soft) continue;
        // Full push when touching, a gentle nudge when merely close: keeps gaps even, not just clear.
        const push = ((soft - distance) / 2) * (distance < separation ? 1 : 0.3);
        const nx = distance > 0.00001 ? dx / distance : 1;
        const ny = distance > 0.00001 ? dy / distance : 0;
        a.x += nx * push;
        a.y += ny * push;
        b.x -= nx * push;
        b.y -= ny * push;
      }
    }
    for (const p of positions) {
      const radius = Math.hypot(p.x, p.y);
      const bounded = Math.min(maxRadius, Math.max(layout.keepOut, radius));
      if (radius > 0.00001) {
        p.x *= bounded / radius;
        p.y *= bounded / radius;
      }
    }
  }
}
