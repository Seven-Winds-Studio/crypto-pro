// Mock cadesplugin_api.js to prevent it from executing in test environment
// This prevents the actual plugin initialization code from running during tests
jest.mock('./api/cadesplugin_api.js', () => ({}), { virtual: true });
