module.exports = (mode) => ({
  presets: [
    [
      '@babel/preset-env',
      { useBuiltIns: 'usage', corejs: 3, targets: '> 0.25%'},
    ],
    '@babel/preset-react',
  ],
  plugins: [
    [
      'formatjs',
      {
        idInterpolationPattern: '[sha512:contenthash:base64:6]',
        ast: true,
      },
    ],
    [
      'babel-plugin-styled-components',
      {
        namespace: 'irx',
        ssr: false,
        minify: mode === 'production',
        transpileTemplateLiterals: mode === 'production',
      },
    ],
  ],
});

