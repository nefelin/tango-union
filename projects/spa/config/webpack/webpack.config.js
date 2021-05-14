const { merge } = require('webpack-merge');

const sharedConfig = require('./webpack.shared.config');
const devConfig = require('./webpack.dev.config');
const prodConfig = require('./webpack.prod.config');

module.exports = (_, options) => {
const {mode} = options;
  switch(mode) {
    case "production":
      return merge(sharedConfig(mode), prodConfig(mode));
    case 'develop':
    default:
      return merge(sharedConfig(mode), devConfig(mode));
  }
}