module.exports = {
  setupFiles: ["<rootDir>/test/unit/setup.ts"],
  globals: {
    "vue-jest": {
      babelConfig: true,
    },
  },
  moduleFileExtensions: ["ts", "vue", "js", "json"],
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/src/$1",
  },
  testMatch: ["<rootDir>/**/*.spec.ts"],
  transform: {
    ".*\\.vue$": "vue-jest",
    ".*\\.ts$": "ts-jest",
    ".*\\.(js)$": "babel-jest",
    ".+\\.(css|scss|png|jpg|svg)$": "jest-transform-stub",
  },
  collectCoverage: true,
  snapshotSerializers: ["jest-serializer-vue"],
  collectCoverageFrom: [
    "src/mixins/**/*.ts",
    "src/store/**/*.ts",
    "src/components/**/*.vue",
    "src/views/**/*.vue",
  ],
  coverageDirectory: "coverage",
  coverageReporters: ["text", "lcov", "cobertura"],
  reporters: ["default", "jest-junit"],
  coveragePathIgnorePatterns: ["types"],
  testEnvironment: "jsdom",
};
