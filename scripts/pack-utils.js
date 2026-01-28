const path = require('path');
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
    execSync(`rimraf ${fileName}`, { stdio: 'inherit' });
  } catch (e) {
    // File might not exist, ignore error
  }
} else if (command === 'uncompress') {
  execSync(`tar xopf ${fileName}`, { stdio: 'inherit' });
} else {
  console.error('Usage: node pack-utils.js [clean|uncompress]');
  process.exit(1);
}
