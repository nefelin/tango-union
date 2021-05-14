const path = require('path');

module.exports = () => ({
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

