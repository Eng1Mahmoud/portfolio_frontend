/** Shared normalized layout: every dashboard item gets one evenly spaced slot. */
export function getOrbitLayout(count: number) {
  let capacity = 0;
  let ringCount = 0;
  while (capacity < count) {
    capacity += 12 + ringCount * 8;
    ringCount++;
  }
  ringCount = Math.max(1, ringCount);
  const rings = Array.from({ length: ringCount }, (_, index) => ({
    radius: ringCount === 1 ? 0.36 : 0.25 + (index / (ringCount - 1)) * 0.18,
    count: 0,
    offset: index * 0.23 - Math.PI / 2,
  }));
  // Allocate in proportion to circumference, not round-robin: outer rings fit more icons.
  for (let i = 0; i < count; i++) {
    const target = rings.reduce((best, ring) =>
      (ring.count + 1) / ring.radius < (best.count + 1) / best.radius ? ring : best,
    );
    target.count++;
  }
  const radialGap = ringCount > 1 ? 0.18 / (ringCount - 1) : 0.18;
  const angularGap = Math.min(...rings.filter(r => r.count).map(r => 2 * r.radius * Math.sin(Math.PI / Math.max(2, r.count))));
  const badgeSize = Math.min(0.095, radialGap * 0.65, angularGap * 0.64);
  let start = 0;
  const slots = rings.flatMap((ring, ringIndex) => {
    const items = Array.from({ length: ring.count }, (_, i) => ({
      index: start + i,
      ringIndex,
      radius: ring.radius,
      angle: ring.offset + (i / ring.count) * Math.PI * 2,
    }));
    start += ring.count;
    return items;
  });
  return { rings, slots, badgeSize, portraitSize: ringCount > 2 ? 0.22 : 0.24 };
}

/** Seeded variation keeps the initial client/static layout identical. */
const variation = (index: number, salt: number) => {
  const value = Math.sin((index + 1) * 127.1 + salt * 311.7) * 43758.5453;
  return value - Math.floor(value);
};

export type FloatingPosition = { x: number; y: number; z: number };
export function createFloatingPositions(count: number): FloatingPosition[] {
  return Array.from({ length: count }, () => ({ x: 0, y: 0, z: 0 }));
}

/** Independent wandering, then separation in screen space; no frame allocations. */
export function updateFloatingPositions(
  layout: ReturnType<typeof getOrbitLayout>,
  positions: FloatingPosition[],
  time: number,
  rotation = 0,
) {
  const clearance = layout.badgeSize * Math.SQRT2;
  const minRadius = layout.portraitSize / Math.SQRT2 + clearance / 2 + 0.025;
  const maxRadius = 0.5 - clearance / 2 - 0.015;
  const separation = clearance + 0.012;
  layout.slots.forEach((slot, i) => {
    const p = positions[i];
    if (!p) return;
    const phase = variation(i, 1) * Math.PI * 2;
    const speed = 0.18 + variation(i, 2) * 0.22;
    const angle = slot.angle + rotation + Math.sin(time * speed + phase) * 0.14;
    const radius = slot.radius + Math.sin(time * speed * 0.73 + phase * 2) * 0.035;
    p.x = Math.cos(angle) * radius;
    p.y = Math.sin(angle) * radius;
    p.z = Math.sin(time * speed + phase) * 0.25;
  });
  // Keep icons apart, off the portrait and inside the display, even while drifting.
  for (let pass = 0; pass < 16; pass++) {
    for (let i = 0; i < positions.length; i++) {
      const a = positions[i];
      for (let j = i + 1; j < positions.length; j++) {
        const b = positions[j];
        const dx = a.x - b.x;
        const dy = a.y - b.y;
        const distance = Math.hypot(dx, dy);
        if (distance >= separation) continue;
        const push = (separation - distance) / 2;
        const nx = distance > 0.00001 ? dx / distance : 1;
        const ny = distance > 0.00001 ? dy / distance : 0;
        a.x += nx * push; a.y += ny * push;
        b.x -= nx * push; b.y -= ny * push;
      }
    }
    for (const p of positions) {
      const radius = Math.hypot(p.x, p.y);
      const bounded = Math.max(minRadius, Math.min(maxRadius, radius));
      if (radius > 0) { p.x *= bounded / radius; p.y *= bounded / radius; }
    }
  }
}
