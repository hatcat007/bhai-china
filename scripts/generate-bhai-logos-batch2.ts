import ZAI from 'z-ai-web-dev-sdk';
import fs from 'fs';
import path from 'path';

const OUTPUT_DIR = '/home/z/my-project/public/logos';

// Only the remaining 6 logos (01-04 already generated)
const logoPrompts = [
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

async function generateRemainingLogos() {
  if (!fs.existsSync(OUTPUT_DIR)) {
    fs.mkdirSync(OUTPUT_DIR, { recursive: true });
  }

  console.log(`Generating ${logoPrompts.length} remaining BHAI logo designs\n`);

  const zai = await ZAI.create();

  for (let i = 0; i < logoPrompts.length; i++) {
    const { file, name, prompt } = logoPrompts[i];
    const outputPath = path.join(OUTPUT_DIR, file);

    // Skip if already exists
    if (fs.existsSync(outputPath)) {
      console.log(`[${i + 1}/${logoPrompts.length}] ${name} — already exists, skipping`);
      continue;
    }

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
        success = true;
      } catch (error) {
        console.error(`  ✗ Attempt ${attempt} failed: ${error.message}`);
        if (attempt < maxAttempts) {
          await new Promise((resolve) => setTimeout(resolve, attempt * 2000));
        }
      }
    }

    // Delay between requests
    if (i < logoPrompts.length - 1) {
      await new Promise((resolve) => setTimeout(resolve, 2000));
    }
  }

  console.log('\n=== Done ===');
  console.log('All zai-logo files:');
  const files = fs.readdirSync(OUTPUT_DIR).filter((f) => f.startsWith('zai-logo-'));
  files.forEach((f) => {
    const stat = fs.statSync(path.join(OUTPUT_DIR, f));
    console.log(`  ${f} (${(stat.size / 1024).toFixed(1)} KB)`);
  });
}

generateRemainingLogos().catch((err) => {
  console.error('Fatal error:', err);
  process.exit(1);
});
