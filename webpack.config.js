const path = require('path')

module.exports = {
  mode: 'production',
  devtool: 'source-map',
  entry: {
    'index': './src/js/index.js'
  },
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'public/js'),
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
          }
        }
      }
    ]
  },
  externals: {
    'pixi.js': 'PIXI'
  }
};
