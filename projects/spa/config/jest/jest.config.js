module.exports = {
  preset: 'ts-jest',
  rootDir: '../../',
  transform: { '\\.[jt]sx?$': './config/jest/jest.preprocess.js' }
};
