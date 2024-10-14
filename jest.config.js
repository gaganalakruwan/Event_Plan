module.exports = {
  preset: 'react-native',
  // transform: {
  //   '^.+\\.tsx?$': 'ts-jest', // Transform TypeScript and JSX
  //   '^.+\\.jsx?$': 'babel-jest', // Transform JavaScript and JSX
  // },
  // testEnvironment: 'jest-environment-jsdom', // Use JSDOM for testing
  // setupFilesAfterEnv: ['<rootDir>/jest.setup.js'], // Optional setup file for additional matchers
  // moduleNameMapper: {
  //   '\\.(css|less|scss|sass)$': 'identity-obj-proxy', // Mock CSS modules
  //   'utils/(.*)$': '<rootDir>/src/utils/$1', // Mock paths if necessary
  // },
  // transformIgnorePatterns: [
  //   'node_modules/(?!(react-native|my-project|@react-native|@react-native-firebase))', // Include necessary modules
  // ],
  transformIgnorePatterns: [
    'node_modules/(?!(react-native|react-native-vector-icons|@react-native|@react-native-firebase)/)',
  ],
  moduleNameMapper: {
    '\\.(css|less|scss|sass)$': 'identity-obj-proxy', // To mock style imports if needed
  },
   testEnvironment: 'jsdom'
};
