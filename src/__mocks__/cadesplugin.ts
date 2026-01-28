let executionFlow = null;

const cadespluginMock = {
  set_log_level: jest.fn(),
  getLastError: jest.fn(),
  CreateObjectAsync: jest.fn(),
  LOG_LEVEL_ERROR: 1,
  __defineExecutionFlow: (newExecutionFlow): void => {
    executionFlow = newExecutionFlow;
  },
  async_spawn: jest.fn((generatorFn) => {
    const generatorIterable = generatorFn();
    let iterable = generatorIterable.next();

    while (!iterable.done) {
      iterable = generatorIterable.next(executionFlow[iterable.value]);
    }

    return iterable.value;
  }),
};

// Make cadesplugin a Promise that resolves to the mock object
// This is required because _afterPluginsLoaded does: await cadesplugin
// Also attach properties directly so tests can access them synchronously
const cadespluginPromise = Promise.resolve(cadespluginMock);
Object.assign(cadespluginPromise, cadespluginMock);

Object.defineProperty(window, 'cadesplugin', {
  writable: true,
  value: cadespluginPromise,
});
