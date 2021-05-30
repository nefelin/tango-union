module.exports = {
  preset: 'ts-jest',
  rootDir: './',
  transform: { '\\.[jt]sx?$': './jest.preprocess.js' }
};
