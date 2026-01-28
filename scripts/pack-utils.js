const path = require('path');
const fs = require('fs');
const { execSync } = require('child_process');
const packageJson = require('../package.json');

// npm pack creates files with / replaced by - and @ removed
const getPackFileName = () => {
  const name = packageJson.name.replace(/^@/, '').replace(/\//g, '-');
  return `${name}-${packageJson.version}.tgz`;
};

const command = process.argv[2];
const fileName = getPackFileName();

if (command === 'clean') {
  try {
    if (fs.existsSync(fileName)) {
      execSync(`rimraf ${fileName}`, { stdio: 'inherit' });
    }
  } catch (e) {
    // File might not exist, ignore error
  }
} else if (command === 'uncompress') {
  if (fs.existsSync(fileName)) {
    execSync(`tar xopf ${fileName}`, { stdio: 'inherit' });
  } else {
    // File doesn't exist (e.g., when using npm publish directly)
    // This is normal, just skip
    console.log(`Package file ${fileName} not found, skipping unpack.`);
  }
} else {
  console.error('Usage: node pack-utils.js [clean|uncompress]');
  process.exit(1);
}
