const path = require('path');
const packageJson = require('./package.json');
const tsConfig = require(`./${process.env.TS_CONFIG}`);

// Extract package name without scope (e.g., @scope/name -> name)
const packageName = packageJson.name.split('/').pop() || packageJson.name;

module.exports = {
  context: path.resolve(__dirname, 'src'),
  entry: `./${packageName}.ts`,
  module: {
    rules: [{
      test: /\.ts$/,
      use: [{
        loader: 'ts-loader',
        options: {
          configFile: process.env.TS_CONFIG
        },
      }],
      exclude: /node_modules/
    }]
  },
  resolve: {
    extensions: ['.ts', '.js']
  },
  output: {
    path: path.resolve(__dirname, tsConfig.compilerOptions.outDir),
    filename: process.env.NODE_ENV === 'production' ? `${packageName}.min.js` : `${packageName}.js`,
    libraryTarget: 'umd',
    library: 'cryptoPro',
    umdNamedDefine: true
  },
  mode: process.env.NODE_ENV || 'development',
  devtool: 'source-map'
};
