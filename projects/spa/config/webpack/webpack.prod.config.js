const path = require('path');
const { merge } = require('webpack-merge');

const sharedWebpackConfig = require('./webpack.shared.config');

module.exports = merge(sharedWebpackConfig, {
  mode: 'production',
  devtool: 'hidden-source-map',
  optimization: {
    splitChunks: {
      cacheGroups: {
        vendor: {
          name: 'node_vendors',
          test: /[\\/]node_modules[\\/]/,
          chunks: 'all',
        },
      },
    },
  },
});
