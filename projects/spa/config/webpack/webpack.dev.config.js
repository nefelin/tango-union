const path = require('path');
const webpack = require('webpack');
const { merge } = require('webpack-merge');
const sharedWebpackConfig = require('./webpack.shared.config');

module.exports = merge(sharedWebpackConfig, {
  mode: 'development',
  devtool: 'inline-source-map',
  devServer: {
    historyApiFallback: true,
    contentBase: path.resolve(__dirname, '../../dist'),
    open: false,
    compress: true,
    hot: true,
    port: 8080,
  },
  plugins: [new webpack.HotModuleReplacementPlugin()],
});
