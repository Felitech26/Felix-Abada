const pngToIco = require('png-to-ico');
const fs = require('fs');
const path = require('path');

const publicDir = path.join(__dirname, 'public');

// PNG files to convert (in order of size: 16x16, 32x32, 48x48)
const pngFiles = [
  path.join(publicDir, 'favicon-16x16.png'),
  path.join(publicDir, 'favicon-32x32.png'),
  path.join(publicDir, 'favicon-48x48.png')
];

const outputFile = path.join(publicDir, 'favicon.ico');

async function generateIco() {
  console.log('Generating favicon.ico file...\n');

  try {
    // Generate ICO file from PNG files (using default export)
    const icoBuffer = await pngToIco.default(pngFiles);

    // Write the ICO file
    fs.writeFileSync(outputFile, icoBuffer);

    console.log('✓ Generated favicon.ico with sizes: 16x16, 32x32, 48x48\n');
    console.log('✓ ICO file created successfully at:', outputFile);
  } catch (error) {
    console.error('✗ Failed to generate ICO file:', error.message);
    process.exit(1);
  }
}

generateIco().catch(console.error);
