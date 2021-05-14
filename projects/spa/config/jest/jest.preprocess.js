const babelOptions = require('../webpack/babelrc')();

module.exports = require('babel-jest').createTransformer(babelOptions);