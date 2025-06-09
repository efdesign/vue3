const fs = require('fs');
const path = require('path');

const componentsDir = './src/plugins/components';
const deprecationComment = `// This file has been deprecated. 
// All components are now registered via the main ComponentsPlugin in index.ts
// Individual component plugins have been removed to simplify the plugin system.`;

const filesToCleanup = [
  'Badge.ts',
  'CustomDirective.ts', 
  'Error.ts',
  'Flex.ts',
  'Grid.ts',
  'Icon.ts',
  'Layout.ts',
  'Loading.ts',
  'Panel.ts'
];

filesToCleanup.forEach(file => {
  const filePath = path.join(componentsDir, file);
  if (fs.existsSync(filePath)) {
    fs.writeFileSync(filePath, deprecationComment);
    console.log(`Cleaned up: ${file}`);
  }
});

console.log('Cleanup completed!');
