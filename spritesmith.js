'use strict';

module.exports = [
  {
    src: './src/images/*.{png,gif,jpg}',
    destImage: './public/images/sprite.png',
    destCSS: './public/images/sprite.json',
    cssTemplate: require('spritesmith-texturepacker'),
    padding: 2,
    algorithmOpts: { sort: false },
  },
];
