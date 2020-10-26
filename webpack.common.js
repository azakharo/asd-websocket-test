const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const StyleLintPlugin = require('stylelint-webpack-plugin');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');

const {PATHS} = require('./build-constants.js');

const entries = {
  app: path.resolve(PATHS.src, 'index.js'),
};

const htmlPluginInstances = [];
const entryNames = Object.keys(entries);
entryNames.forEach((entryName, entryInd) => {
  htmlPluginInstances.push(new HtmlWebpackPlugin({
      template: path.join(__dirname, './index.html'),
      filename: entryInd === 0 ? 'index.html' : `${entryName}.html`,
      path: PATHS.dist,
      favicon: path.join(PATHS.images, 'favicon.ico'),
      chunks: [entryName]
    })
  );
});

const webpackConfig = {
  entry: entries,
  output: {
    path: PATHS.dist,
    publicPath: '/'
  },
  module: {
    rules: [
      {
        enforce: 'pre',
        test: /\.js$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'eslint-loader',
            options: {
              failOnWarning: false,
              failOnError: false,
              fix: true
            }
          }
        ]
      },
      {
        test: /\.(js|jsx)$/,
        use: 'babel-loader',
        exclude: /node_modules/
      },
      {
        test: /\.css$/,
        exclude: /node_modules/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              importLoaders: 1,
              modules: true
            }
          },
          'postcss-loader'
        ]
      },
      {
        test: /\.(png|svg|jpg|gif)$/,
        use: [
          'file-loader',
        ]
      }
    ]
  },
  resolve: {
    modules: [
      'node_modules',
      PATHS.src,
      PATHS.images
    ],
    extensions: ['.js', '.jsx', '.json', '.svg', '.png', '.gif', '.jpg'],
    alias: {
      'IMAGES': PATHS.images
    }
  },
  plugins: [
    ...htmlPluginInstances,
    new webpack.ProgressPlugin(),
    new CleanWebpackPlugin(),
    new StyleLintPlugin({
      context: 'src',
      files: '**/*.css',
      failOnError: false,
      quiet: true
    })
  ]
};

module.exports = webpackConfig;
