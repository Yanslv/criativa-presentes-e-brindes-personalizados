// Copia para public/assets somente as mídias com download_status = downloaded
// no manifesto, reduzindo o tamanho para uso web (os originais em assets/ não mudam).
// Gera src/config/asset-dimensions.json com largura/altura finais para o next/image.
import { mkdir, readFile, writeFile, stat } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const root = process.cwd();
const sourceDir = path.join(root, "assets");
const targetDir = path.join(root, "public", "assets");
const dimensionsFile = path.join(root, "src", "config", "asset-dimensions.json");
const MAX_SIDE = 1600;

function parseCsv(text) {
  const rows = [];
  let row = [];
  let field = "";
  let quoted = false;
  for (let i = 0; i < text.length; i++) {
    const c = text[i];
    if (quoted) {
      if (c === '"' && text[i + 1] === '"') {
        field += '"';
        i++;
      } else if (c === '"') quoted = false;
      else field += c;
    } else if (c === '"') quoted = true;
    else if (c === ",") {
      row.push(field);
      field = "";
    } else if (c === "\n" || c === "\r") {
      if (c === "\r" && text[i + 1] === "\n") i++;
      row.push(field);
      if (row.some((v) => v !== "")) rows.push(row);
      row = [];
      field = "";
    } else field += c;
  }
  if (field !== "" || row.length) {
    row.push(field);
    rows.push(row);
  }
  const [header, ...body] = rows;
  return body.map((r) => Object.fromEntries(header.map((h, idx) => [h, r[idx] ?? ""])));
}

const manifest = parseCsv(await readFile(path.join(sourceDir, "manifest.csv"), "utf8"));
await mkdir(targetDir, { recursive: true });

const dimensions = {};
const skipped = [];

for (const entry of manifest) {
  const file = entry.asset_file;
  if (entry.download_status !== "downloaded") {
    skipped.push(`${file} (${entry.download_status})`);
    continue;
  }
  const src = path.join(sourceDir, file);
  const dest = path.join(targetDir, file);
  const image = sharp(src).rotate();
  const meta = await image.metadata();
  const needsResize = Math.max(meta.width ?? 0, meta.height ?? 0) > MAX_SIDE;
  const pipeline = needsResize
    ? image.resize({ width: MAX_SIDE, height: MAX_SIDE, fit: "inside", withoutEnlargement: true })
    : image;
  const info = await pipeline.jpeg({ quality: 80, mozjpeg: true, progressive: true }).toFile(dest);
  dimensions[file] = { width: info.width, height: info.height };
  const { size } = await stat(dest);
  console.log(`  ${file}  ${info.width}x${info.height}  ${Math.round(size / 1024)} KB`);
}

await writeFile(dimensionsFile, JSON.stringify(dimensions, null, 2) + "\n");
console.log(`\n${Object.keys(dimensions).length} mídia(s) copiada(s) para public/assets.`);
if (skipped.length) console.log(`Ignorada(s): ${skipped.join(", ")}`);
