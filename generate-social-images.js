const sharp = require('sharp');
const path = require('path');

const outputDir = path.join(__dirname, 'public');

// Create Open Graph image (1200x630)
async function generateSocialImages() {
  console.log('Generating social media preview images...\n');

  try {
    // Create a simple black background with the logo
    const ogImage = await sharp({
      create: {
        width: 1200,
        height: 630,
        channels: 4,
        background: { r: 0, g: 0, b: 0, alpha: 1 }
      }
    })
    .png()
    .toFile(path.join(outputDir, 'og-image.png'));

    console.log('✓ Generated og-image.png (1200x630)');

    // Create Twitter Card image (1200x675 for large card)
    const twitterImage = await sharp({
      create: {
        width: 1200,
        height: 675,
        channels: 4,
        background: { r: 0, g: 0, b: 0, alpha: 1 }
      }
    })
    .png()
    .toFile(path.join(outputDir, 'twitter-image.png'));

    console.log('✓ Generated twitter-image.png (1200x675)');

    console.log('\n✓ All social media images generated successfully!');
    console.log('\nNote: These are placeholder images with a black background.');
    console.log('Consider customizing them with your logo and text using a design tool.');

  } catch (error) {
    console.error('Error generating social images:', error.message);
  }
}

generateSocialImages().catch(console.error);
