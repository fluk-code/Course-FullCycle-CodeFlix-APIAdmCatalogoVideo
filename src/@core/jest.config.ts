/*
 * For a detailed explanation regarding each configuration property and type check, visit:
 * https://jestjs.io/docs/configuration
 */

export default {
  clearMocks: true,
  coverageDirectory: "../__coverage",
  // covarageReporters: [
  //   "json",
  //   "html",
  // ],
  coverageThreshold: {
    global: {
      statements: 80,
      branches: 80,
      functions: 80,
      lines: 80
    },
    // "./src/category/domain": {
    //   statements: 10,
    //   branches: 10,
    //   functions: 10,
    //   lines: 10
    // }
  },
  coverageProvider: "v8",
  rootDir: "src",
  testRegex: ".*\\..*spec\\.ts$",
  transform: {
    "^.+\\.ts?$": ["@swc/jest"]
  },
};
