const { merge } = require('webpack-merge');

const sharedConfig = require('./webpack.shared.config');
const devConfig = require('./webpack.dev.config');
const prodConfig = require('./webpack.prod.config');

module.exports = (_, options) => {
  const { mode, env } = options;

  const shared = sharedConfig(mode, env);
  const prod = prodConfig(mode);
  const dev = devConfig(mode);

  switch (mode) {
    case 'production':
      return merge(shared, prod);
    case 'develop':
    default:
      return merge(shared, dev);
  }
};
