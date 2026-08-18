// Repli IA (Reve v2) — images manquantes des services Cédric VTC.
// Norme 42 : IA = repli scénarisé, jamais présenté comme « réel ».
// Usage : node scripts/gen-images-reve.mjs [--only=soiree,matabiau]
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");

// Clé depuis .env.local (gitignoré)
const envPath = path.join(root, ".env.local");
const key = fs
  .readFileSync(envPath, "utf8")
  .split(/\r?\n/)
  .find((l) => l.startsWith("REVE_API_KEY="))
  ?.split("=")
  .slice(1)
  .join("=")
  .trim();
if (!key) {
  console.error("REVE_API_KEY absente de vtc/.env.local");
  process.exit(1);
}

// Socle DA « La nuit, conduite » : noir profond, lumière rare champagne, une seule berline noire
const STYLE =
  "Cinematic night photograph, photorealistic, deep blacks, rare warm champagne-gold practical lights, moist asphalt with soft reflections, Toulouse (France) at night, ONE sleek black luxury electric sedan (unbranded, no badges, no logos), no text, no watermark, 35mm lens, shallow depth of field";

const JOBS = [
  {
    id: "soiree",
    ar: "4:3",
    prompt: `${STYLE}. A narrow old-town street in Toulouse at night near the Capitole, warm lanterns and softly glowing restaurant windows, the black sedan waiting under a streetlight, elegant and discreet atmosphere.`,
  },
  {
    id: "matabiau",
    ar: "4:3",
    prompt: `${STYLE}. In front of a grand French railway station facade at night (Toulouse-Matabiau style), a lone traveler with a suitcase walking toward the waiting black sedan, headlights on, warm station clock glow.`,
  },
  {
    id: "longue-distance",
    ar: "4:3",
    prompt: `${STYLE}. An empty French highway at night, the black sedan seen from behind driving away, soft red taillight glow, faint city lights on the horizon, starless dark sky, long quiet road.`,
  },
];

const only = process.argv
  .find((a) => a.startsWith("--only="))
  ?.split("=")[1]
  ?.split(",");
const jobs = only ? JOBS.filter((j) => only.includes(j.id)) : JOBS;

const outDir = path.join(root, "public", "media", "vtc");
fs.mkdirSync(outDir, { recursive: true });

for (const job of jobs) {
  const t0 = Date.now();
  process.stdout.write(`[${job.id}] génération ${job.ar}... `);
  const res = await fetch("https://api.reve.com/v2/image/create", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${key}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ prompt: job.prompt, aspect_ratio: job.ar }),
  });
  if (!res.ok) {
    console.error(`HTTP ${res.status} : ${(await res.text()).slice(0, 300)}`);
    continue;
  }
  const json = await res.json();
  if (json.content_violation) {
    console.error("refusée (content violation)");
    continue;
  }
  const png = Buffer.from(json.image, "base64");
  const outWebp = path.join(outDir, `tesla-${job.id}-toulouse-nuit.webp`);
  await sharp(png)
    .resize({ width: 1920, withoutEnlargement: true })
    .webp({ quality: 82 })
    .toFile(outWebp);
  const kb = Math.round(fs.statSync(outWebp).size / 1024);
  console.log(
    `OK en ${((Date.now() - t0) / 1000).toFixed(0)}s → ${path.basename(outWebp)} (${kb} Ko) · crédits restants : ${json.credits_remaining ?? "?"}`
  );
}
console.log("Terminé.");
