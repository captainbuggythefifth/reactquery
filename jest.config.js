module.exports = {
    // The root of your source code, typically /src
    // `<rootDir>` is a token Jest substitutes
    roots: ["<rootDir>/src"],
  
    // Jest transformations -- this adds support for TypeScript
    // using ts-jest
    transform: {
      "^.+\\.tsx?$": "ts-jest"
    },
  
    // Runs special logic, such as cleaning up components
    // when using React Testing Library and adds special
    // extended assertions to Jest
    setupFilesAfterEnv: [
      /* "@testing-library/react/cleanup-after-each", */
      "@testing-library/jest-dom/extend-expect"
    ],
  
    // Test spec file resolution pattern
    // Matches parent folder `__tests__` and filename
    // should contain `test` or `spec`.
    testRegex: "(/__tests__/.*|(\\.|/)(test|spec))\\.tsx?$",
  
    // Module file extensions for importing
    moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"],

    moduleNameMapper: {
      '^screens(.*)': '<rootDir>/src/screens/$1',
      '^assets(.*)': '<rootDir>/src/assets/$1',
      '^components(.*)': '<rootDir>/src/components/$1',
      '^interfaces(.*)': '<rootDir>/src/interfaces/$1',
      '^pages(.*)': '<rootDir>/src/pages/$1',
      '^routes(.*)': '<rootDir>/src/routes/$1',
      '^states(.*)': '<rootDir>/src/states/$1',
      '^services/(.*)': '<rootDir>/src/services/$1',
    },
  };