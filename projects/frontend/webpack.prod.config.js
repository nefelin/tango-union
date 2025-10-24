module.exports = () => ({
    mode: 'production',
    devtool: 'inline-source-map',
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

