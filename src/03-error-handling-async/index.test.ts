// Uncomment the code below and write your tests
// import { throwError, throwCustomError, resolveValue, MyAwesomeError, rejectCustomError } from './index';

import { rejectCustomError, resolveValue, throwCustomError, throwError } from "./index";

describe('resolveValue', () => {
  test('should resolve provided value', async () => {
    const result = await resolveValue('resolved value');
    expect(result).toBe('resolved value');
  });
});

describe('throwError', () => {
  test('should throw error with provided message', () => {
    const errorMessage = 'There is an error occurred';
    expect(() => throwError(errorMessage)).toThrow(errorMessage);
  });

  test('should throw error with default message if message is not provided', () => {
    const defaultMessage = 'Oops!';
    expect(() => throwError()).toThrow(defaultMessage);
  });
});

describe('throwCustomError', () => {
  test('should throw custom error', () => {
    const customError = 'This is my awesome custom error!';
    expect(() => throwCustomError()).toThrow(customError);
  });
});

describe('rejectCustomError', () => {
  test('should reject custom error', async () => {
    const customError = 'This is my awesome custom error!';
    await expect(async () => await rejectCustomError()).rejects.toThrow(
      customError,
    );
  });
});
