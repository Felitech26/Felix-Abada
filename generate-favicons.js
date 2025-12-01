const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

// Read the SVG logo
const logoPath = path.join(__dirname, 'public', 'assets', 'Images', 'logo2.svg');
const outputDir = path.join(__dirname, 'public');

// Sizes to generate
const sizes = [
  { size: 16, name: 'favicon-16x16.png' },
  { size: 32, name: 'favicon-32x32.png' },
  { size: 96, name: 'favicon-96x96.png' },
  { size: 180, name: 'apple-touch-icon.png' },
  { size: 192, name: 'android-chrome-192x192.png' },
  { size: 512, name: 'android-chrome-512x512.png' },
];

// Generate PNG files from SVG
async function generateFavicons() {
  console.log('Generating favicon files...\n');

  for (const { size, name } of sizes) {
    try {
      const outputPath = path.join(outputDir, name);

      await sharp(logoPath)
        .resize(size, size, {
          fit: 'contain',
          background: { r: 255, g: 255, b: 255, alpha: 0 } // Transparent background
        })
        .png()
        .toFile(outputPath);

      console.log(`✓ Generated ${name} (${size}x${size})`);
    } catch (error) {
      console.error(`✗ Failed to generate ${name}:`, error.message);
    }
  }

  console.log('\n✓ All favicon files generated successfully!');
  console.log('\nGenerated files:');
  sizes.forEach(({ name }) => console.log(`  - ${name}`));
}

generateFavicons().catch(console.error);
