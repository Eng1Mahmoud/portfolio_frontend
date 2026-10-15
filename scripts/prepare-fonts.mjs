// Fontshare permits self-hosting on this site, but not public redistribution
// through a font repository. Fetch official files into an ignored build cache.
import { createHash } from "node:crypto";
import { mkdir, readFile, writeFile } from "node:fs/promises";

const root = new URL("../.font-cache/", import.meta.url);
const manifest = JSON.parse(
  await readFile(new URL("./font-manifest.json", import.meta.url), "utf8"),
);
const digest = (bytes) => createHash("sha256").update(bytes).digest("hex");
await mkdir(root, { recursive: true });
await Promise.all(
  manifest.map(async ({ file, url, sha256 }) => {
    const target = new URL(file, root);
    const cached = await readFile(target).catch(() => null);
    if (cached && digest(cached) === sha256) return;
    let failure;
    for (let attempt = 0; attempt < 3; attempt++) {
      try {
        const response = await fetch(url, {
          signal: AbortSignal.timeout(20000),
        });
        if (!response.ok) throw new Error(`${file}: HTTP ${response.status}`);
        const bytes = Buffer.from(await response.arrayBuffer());
        if (digest(bytes) !== sha256)
          throw new Error(`${file}: font checksum mismatch`);
        await writeFile(target, bytes);
        return;
      } catch (error) {
        failure = error;
      }
    }
    throw failure;
  }),
);
console.log("Fontshare build cache verified (6 WOFF2 files).");
