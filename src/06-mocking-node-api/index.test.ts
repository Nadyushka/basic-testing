// Uncomment the code below and write your tests
import { readFileAsynchronously, doStuffByTimeout, doStuffByInterval } from '.';
import { existsSync } from 'fs';
import { join } from 'path';
import { readFile } from 'fs/promises';

jest.mock('fs');
jest.mock('fs/promises');
jest.mock('path');

describe('doStuffByTimeout', () => {
  const delay = 1000;

  beforeAll(() => jest.useFakeTimers());
  afterAll(() => jest.useRealTimers());

  test('should set timeout with provided callback and timeout', () => {
    const callback = jest.fn();
    const setTimeout = jest.spyOn(global, 'setTimeout');
    doStuffByTimeout(callback, delay);

    expect(setTimeout).toHaveBeenCalledWith(callback, delay);
  });

  test('should call callback only after timeout', () => {
    const callback = jest.fn();
    doStuffByTimeout(callback, delay);

    expect(callback).not.toHaveBeenCalled();
    jest.advanceTimersByTime(delay);
    expect(callback).toHaveBeenCalled();
  });
});

describe('doStuffByInterval', () => {
  const delay = 1000;

  beforeAll(() => jest.useFakeTimers());
  afterAll(() => jest.useRealTimers());

  test('should set interval with provided callback and timeout', () => {
    const callback = jest.fn();
    const setInterval = jest.spyOn(global, 'setInterval');
    doStuffByInterval(callback, delay);

    expect(setInterval).toHaveBeenCalledWith(callback, delay);
  });

  test('should call callback multiple times after multiple intervals', () => {
    const callback = jest.fn();
    doStuffByInterval(callback, delay);

    expect(callback).not.toHaveBeenCalled();

    jest.advanceTimersByTime(3000);
    expect(callback).toHaveBeenCalledTimes(3);
  });
});

describe('readFileAsynchronously', () => {
  test('should call join with pathToFile', async () => {
    const mockPath = 'file.txt';
    const mockFullPath = '/full-path/file.txt';

    (join as jest.Mock).mockReturnValue(mockFullPath);

    await readFileAsynchronously(mockPath);

    expect(join).toHaveBeenCalledWith(__dirname, mockPath);
  });

  test('should return null if file does not exist', async () => {
    const mockPath = 'nonExistentFile.txt';

    (existsSync as jest.Mock).mockReturnValue(false);

    const result = await readFileAsynchronously(mockPath);

    expect(result).toBeNull();
  });

  test('should return file content if file exists', async () => {
    const mockPath = 'existentFile.txt';
    const mockFullPath = '/full-path/existentFile.txt';
    const mockReadFileContent = Buffer.from('Content from file');

    (join as jest.Mock).mockReturnValue(mockFullPath);
    (existsSync as jest.Mock).mockReturnValue(true);
    (readFile as jest.Mock).mockResolvedValue(mockReadFileContent);

    const result = await readFileAsynchronously(mockPath);

    expect(readFile).toHaveBeenCalledWith(mockFullPath);
    expect(result).toBe('Content from file');
  });
});
