import { readFile, stat } from "node:fs/promises";
import { join } from "node:path";
import { fileURLToPath } from "node:url";
import { dirname } from "node:path";

const root = dirname(dirname(fileURLToPath(import.meta.url)));
const html = await readFile(join(root, "index.html"), "utf8");
const css = await readFile(join(root, "src", "styles.css"), "utf8");
const js = await readFile(join(root, "src", "main.js"), "utf8");

const requiredFiles = [
  "index.html",
  "src/styles.css",
  "src/main.js",
  "scripts/build.mjs",
  "scripts/smoke.mjs"
];

for (const file of requiredFiles) {
  await stat(join(root, file));
}

const anchors = [...html.matchAll(/href="#([^"]+)"/g)].map((match) => match[1]);
for (const id of anchors) {
  if (id === "top") continue;
  if (!html.includes(`id="${id}"`)) {
    throw new Error(`Anchor target #${id} is missing`);
  }
}

if (!html.includes('class="theme-toggle"') || !js.includes("localStorage.setItem")) {
  throw new Error("Theme toggle is missing or does not persist state");
}

if (html.includes("example.com")) {
  throw new Error("Placeholder external contact URL found");
}

if (!html.includes("interface-canvas") || !js.includes("requestAnimationFrame")) {
  throw new Error("Hero visual canvas is missing or not animated");
}

if (!css.includes("@media (max-width: 860px)") || !css.includes("@media (max-width: 560px)")) {
  throw new Error("Responsive breakpoints are missing");
}

console.log("Smoke checks passed");
