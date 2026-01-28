module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['<rootDir>/src/setupTests.ts'],
  coveragePathIgnorePatterns: [
    '<rootDir>/src/vendor/',
  ],
  testPathIgnorePatterns: [
    '<rootDir>/examples/',
  ],
};
