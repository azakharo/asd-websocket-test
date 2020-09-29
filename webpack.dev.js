const webpack = require('webpack');
const merge = require('webpack-merge');

const {PATHS} = require('./build-constants.js');
const common = require('./webpack.common.js');

module.exports = merge(common, {
  devtool: 'inline-source-map',
  mode: 'development',
  output: {
    filename: '[name].js'
  },
  resolve: {
    alias: {
      'react-dom': '@hot-loader/react-dom'
    }
  },
  devServer: {
    contentBase: PATHS.dist,
    historyApiFallback: {
      disableDotRule: true
    },
    hot: true
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin()
  ]
});
