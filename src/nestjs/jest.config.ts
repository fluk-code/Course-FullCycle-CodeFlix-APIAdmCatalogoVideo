export default {
  displayName: {
    name: "nestjs",
    color:"magentaBright"
  },
  moduleFileExtensions: ["js", "json", "ts"],
  rootDir: "src",
  testRegex: ".*\\.spec\\.ts$",
  transform: {
    "^.+\\.(t|j)s$": "@swc/jest"
  },
  collectCoverageFrom: ["**/*.(t|j)s", "@swc/jest"],
  coverageDirectory: "../coverage",
  testEnvironment: "node",
  moduleNameMapper: {
    '@fc/Core\\_AdmCatalogoVideo/(.*)$': '<rootDir>/../../../node_modules/@fc/Core_AdmCatalogoVideo/dist/$1',
    '#seedwork/(.*)$': '<rootDir>/../../../node_modules/@fc/Core_AdmCatalogoVideo/dist/@seedwork/$1',
    '#category/(.*)$': '<rootDir>/../../../node_modules/@fc/Core_AdmCatalogoVideo/dist/category/$1',
  }
}