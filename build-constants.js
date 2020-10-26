const path = require('path');

const dist = path.resolve(__dirname, 'dist');
const src = path.resolve(__dirname, 'src');
const assets = path.resolve(__dirname, 'assets');
const images = path.resolve(assets, 'images');

module.exports = {
  PATHS: {
    dist,
    src,
    assets,
    images,
  }
};
