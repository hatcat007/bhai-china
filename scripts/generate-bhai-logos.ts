import ZAI from 'z-ai-web-dev-sdk';
import fs from 'fs';
import path from 'path';

const OUTPUT_DIR = '/home/z/my-project/public/logos';

// 10 distinct logo design prompts — each explores a different visual direction
const logoPrompts = [
  {
    file: 'zai-logo-01-minimal-typography.png',
    name: '01 · Minimal Typography',
    prompt: 'Minimalist logo design for "BHAI" brand, pure white sans-serif wordmark "BHAI" centered on pure black background, single orange (#E56910) period dot after the I, Swiss design style, extreme minimalism, lots of negative space, no decorations, no icons, just typography, professional brand identity, vector style, high quality',
  },
  {
    file: 'zai-logo-02-orange-sphere.png',
    name: '02 · Orange Sphere Monogram',
    prompt: 'Modern logo design for BHAI brand, single orange (#E56910) perfect sphere with subtle gradient, centered on pure black background, sphere has small black pupil in center like an abstract eye, minimalist geometric, professional tech brand identity, no text, just the sphere mark, vector style, high quality',
  },
  {
    file: 'zai-logo-03-human-augmented.png',
    name: '03 · Human Augmented',
    prompt: 'Logo concept for BHAI brand, abstract white human silhouette head in profile on pure black background, surrounded by small orange (#E56910) circuit nodes and connecting lines forming a halo around the head, AI augmentation visual metaphor, minimalist line art style, professional brand identity, vector style, high quality',
  },
  {
    file: 'zai-logo-04-steering-wheel.png',
    name: '04 · Steering Wheel',
    prompt: 'Logo design for BHAI brand, minimalist white ship steering wheel icon with 8 spokes, center hub is filled orange (#E56910), pure black background, simple geometric line art, nautical metaphor for "person at the wheel", professional brand identity, vector style, high quality',
  },
  {
    file: 'zai-logo-05-three-layers.png',
    name: '05 · Three Layer Stack',
    prompt: 'Abstract logo for BHAI brand, three horizontal rectangular bars stacked vertically with small gaps between them, top bar white, middle bar orange (#E56910), bottom bar grey (#6B7280), pure black background, minimalist architectural style, representing three layered architecture, professional brand identity, vector style, high quality',
  },
  {
    file: 'zai-logo-06-inverted-hourglass.png',
    name: '06 · Inverted Hourglass',
    prompt: 'Logo design for BHAI brand, abstract inverted hourglass shape outlined in orange (#E56910) on pure black background, hourglass is upside down (wide at top narrow at bottom), small white sand dots falling upward defying gravity, minimalist geometric, subversive visual concept, professional brand identity, vector style, high quality',
  },
  {
    file: 'zai-logo-07-bh-monogram.png',
    name: '07 · BH Monogram',
    prompt: 'Lettermark logo for BHAI brand, stylized monogram combining letter B in white and letter H in orange (#E56910), letters interlocking and overlapping, geometric sans-serif, pure black background, minimalist corporate identity style, like IBM or Adobe logo aesthetic, vector style, high quality',
  },
  {
    file: 'zai-logo-08-terminal-prompt.png',
    name: '08 · Terminal Prompt',
    prompt: 'Logo design for BHAI brand, terminal command prompt aesthetic, large orange (#E56910) dollar sign symbol followed by white text "bhai" in monospace font, blinking cursor block in orange, pure black background, hacker developer aesthetic, code terminal style, professional tech brand identity, vector style, high quality',
  },
  {
    file: 'zai-logo-09-diamond-facet.png',
    name: '09 · Diamond Facet',
    prompt: 'Logo design for BHAI brand, geometric diamond shape outline in white with internal facet lines in orange (#E56910), pure black background, minimalist jewelry industry reference, top-down diamond view with triangular facets, professional luxury brand identity, vector style, high quality',
  },
  {
    file: 'zai-logo-10-danish-cross.png',
    name: '10 · Danish Cross Pulse',
    prompt: 'Logo design for BHAI brand, abstract white scandinavian cross shape (like Danish flag) with orange (#E56910) pulse line overlay running through center horizontally and vertically, pure black background, minimalist fusion of heritage and modernity, professional brand identity, vector style, high quality',
  },
];

async function generateAllLogos() {
  // Ensure output directory exists
  if (!fs.existsSync(OUTPUT_DIR)) {
    fs.mkdirSync(OUTPUT_DIR, { recursive: true });
  }

  console.log(`Generating ${logoPrompts.length} BHAI logo designs to ${OUTPUT_DIR}\n`);

  const zai = await ZAI.create();
  const results = [];

  for (let i = 0; i < logoPrompts.length; i++) {
    const { file, name, prompt } = logoPrompts[i];
    const outputPath = path.join(OUTPUT_DIR, file);

    console.log(`[${i + 1}/${logoPrompts.length}] Generating: ${name}`);

    let attempt = 0;
    const maxAttempts = 3;
    let success = false;

    while (attempt < maxAttempts && !success) {
      attempt++;
      try {
        const response = await zai.images.generations.create({
          prompt: prompt,
          size: '1024x1024',
        });

        if (!response.data || !response.data[0] || !response.data[0].base64) {
          throw new Error('Invalid response from image generation API');
        }

        const imageBase64 = response.data[0].base64;
        const buffer = Buffer.from(imageBase64, 'base64');
        fs.writeFileSync(outputPath, buffer);

        const sizeKB = (buffer.length / 1024).toFixed(1);
        console.log(`  ✓ Saved ${file} (${sizeKB} KB)`);
        results.push({ success: true, file, name, path: outputPath, size: buffer.length });
        success = true;
      } catch (error) {
        console.error(`  ✗ Attempt ${attempt} failed: ${error.message}`);
        if (attempt < maxAttempts) {
          console.log(`  Retrying in ${attempt * 2} seconds...`);
          await new Promise((resolve) => setTimeout(resolve, attempt * 2000));
        } else {
          results.push({ success: false, file, name, error: error.message });
        }
      }
    }

    // Small delay between requests to be polite to the API
    if (i < logoPrompts.length - 1) {
      await new Promise((resolve) => setTimeout(resolve, 1500));
    }
  }

  console.log('\n=== Generation Summary ===');
  const successful = results.filter((r) => r.success);
  const failed = results.filter((r) => !r.success);
  console.log(`✓ Successful: ${successful.length}/${logoPrompts.length}`);
  if (failed.length > 0) {
    console.log(`✗ Failed: ${failed.length}`);
    failed.forEach((f) => console.log(`  - ${f.name}: ${f.error}`));
  }
  console.log('\nFiles saved:');
  successful.forEach((r) => {
    console.log(`  ${r.file} (${(r.size / 1024).toFixed(1)} KB)`);
  });

  return results;
}

generateAllLogos().catch((err) => {
  console.error('Fatal error:', err);
  process.exit(1);
});
