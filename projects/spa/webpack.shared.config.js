const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const babelOptions = require('./babelrc');
const postcssOptions = require('./postcss.config');
const ESLintWebpackPlugin = require('eslint-webpack-plugin');
const colors = require('colors/safe');

module.exports = (mode, env) => {
  const isProduction = mode === 'production';
  const cacheEslint = !!env['ESLINT_CACHE'];

  if (cacheEslint)
    console.info(
      'Caching eslint results -- linting only changed files and ' + colors.bold.red('SKIPPING LINT ON START'),
    );
  return {
    entry: {
      main: path.resolve(__dirname, './src/index.tsx'),
    },
    module: {
      rules: [
        {
          test: /\.tsx?$/,
          use: [
            { loader: 'babel-loader', options: babelOptions(mode) },
            {
              loader: 'ts-loader',
              options: {
                configFile: path.resolve(
                  __dirname,
                  `./tsconfig${isProduction ? '.build' : ''}.json`,
                ),
              },
            },
          ],
          exclude: /node_modules/,
        },
        {
          test: /\.(png|jpe?g|gif|jp2|webp)$/,
          type: 'asset/resource',
        },
        {
          test: /\.(woff(2)?|eot|ttf|otf)$/,
          type: 'asset/inline',
        },
        {
          test: /\.(scss|css)$/,
          use: [
            'style-loader',
            'css-loader',
            { loader: 'postcss-loader', options: { postcssOptions } },
            'sass-loader',
          ],
        },
        {
          test: /\.svg$/,
          use: ['@svgr/webpack'],
        },
      ],
    },
    resolve: {
      extensions: ['.wasm', '.ts', '.tsx', '.mjs', '.cjs', '.js', '.json'],
    },
    output: {
      path: path.resolve(__dirname, './dist'),
      filename: '[name].bundle.js',
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: path.resolve(__dirname, './src/template.html'),
      }),
      new CleanWebpackPlugin(),
      new ESLintWebpackPlugin({
        files: path.resolve(__dirname, './src'),
        fix: false,
        threads: true,
        extensions: ['ts', 'tsx'],
        lintDirtyModulesOnly: cacheEslint,
        failOnError: isProduction,
      }),
    ],
  };
};
