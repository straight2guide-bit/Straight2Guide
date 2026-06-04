// Removes the cream/off-white background from btn-start-exploring.png
// by making any pixel close to white/cream fully transparent.

import sharp from "sharp";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const filePath = path.join(__dirname, "..", "public", "btn-start-exploring.png");

const image = sharp(filePath);
const meta = await image.metadata();
const { data, info } = await image
  .ensureAlpha()
  .raw()
  .toBuffer({ resolveWithObject: true });

const pixels = new Uint8ClampedArray(data);
const { width, height } = info;

for (let i = 0; i < pixels.length; i += 4) {
  const r = pixels[i];
  const g = pixels[i + 1];
  const b = pixels[i + 2];

  // Light/cream pixels: all channels above threshold → transparent
  // Green button (#0E7A45) has R=14, far below threshold — safe
  const isBackground = r > 200 && g > 195 && b > 180;

  if (isBackground) {
    pixels[i + 3] = 0;
  } else {
    // Smooth edges: partially transparent for near-background pixels
    const lightness = (r + g + b) / 3;
    if (lightness > 160 && r > 160 && g > 155 && b > 145) {
      // Scale alpha down proportionally (softer edge)
      const factor = 1 - (lightness - 160) / 95;
      pixels[i + 3] = Math.round(Math.max(0, factor) * 255);
    }
  }
}

await sharp(Buffer.from(pixels.buffer), {
  raw: { width, height, channels: 4 },
})
  .png()
  .toFile(filePath);

console.log(`Done — transparent background saved to public/btn-start-exploring.png (${width}×${height})`);
