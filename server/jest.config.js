module.exports = {
    testEnvironment: 'node',
    roots: ['<rootDir>/tests'],
    setupFiles: ["<rootDir>/tests/setup.js"],
    testMatch: [
      '**/*.test.[tj]s?(x)',
      '**/*.spec.[tj]s?(x)',
    ],
    testPathIgnorePatterns: ['\\\\node_modules\\\\'],
  };
  
  