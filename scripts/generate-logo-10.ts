import ZAI from 'z-ai-web-dev-sdk';
import fs from 'fs';

const outputPath = '/home/z/my-project/public/logos/zai-logo-10-danish-cross.png';

async function main() {
  if (fs.existsSync(outputPath)) {
    console.log('Already exists, skipping');
    return;
  }
  console.log('Generating logo 10: Danish Cross Pulse...');
  const zai = await ZAI.create();
  const response = await zai.images.generations.create({
    prompt: 'Logo design for BHAI brand, abstract white scandinavian cross shape (like Danish flag) with orange (#E56910) pulse line overlay running through center horizontally and vertically, pure black background, minimalist fusion of heritage and modernity, professional brand identity, vector style, high quality',
    size: '1024x1024',
  });
  const buffer = Buffer.from(response.data[0].base64, 'base64');
  fs.writeFileSync(outputPath, buffer);
  console.log(`✓ Saved (${(buffer.length / 1024).toFixed(1)} KB)`);
}

main().catch((err) => { console.error('Fatal:', err); process.exit(1); });
