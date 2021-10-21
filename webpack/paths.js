const path = require('path');

module.exports = {
  root: path.resolve(__dirname, '../'),
  outputPath: path.resolve(__dirname, '../', 'build'),
  entryPath: path.resolve(__dirname, '../', 'src/web/index.js'),
  templatePath: path.resolve(__dirname, '../', 'public/index.html'),
  publicPath: path.resolve(__dirname, '../', 'public/'),
  appSrc: path.resolve(__dirname, '../', 'src/'),
  imagesFolder: 'assets',
  fontsFolder: 'fonts',
  cssFolder: 'css',
  jsFolder: 'js',
}
