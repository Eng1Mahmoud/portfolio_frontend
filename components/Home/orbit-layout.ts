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
