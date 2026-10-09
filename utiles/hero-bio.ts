/**
 * The presentation copy shown in the hero and reused for search-engine
 * descriptions. Blank lines are paragraph breaks, matching how HomeIntro
 * splits the biography into staggered paragraphs.
 */
export const HERO_BIO = [
  "Frontend Engineer with 3+ years building scalable, high-performance web apps with React.js, Next.js, TypeScript, and TanStack Query, backed by a proven track record in e-commerce and telecom projects.",
  "I turn complex Figma designs into pixel-perfect, responsive UIs and improve team productivity by integrating AI tools and modern CI/CD into the workflow.",
  "Recently, I expanded into Vue.js, Vue Router, and Pinia, building real projects with them, because I love learning what's new in this field.",
  "Open to new Frontend / Full-stack opportunities, remote or on-site — let's connect.",
].join("\n\n");

/** Search engines trim long descriptions, so they get the first paragraph. */
export const HERO_META_DESCRIPTION = HERO_BIO.split("\n\n")[0];
