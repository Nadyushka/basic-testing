// Uncomment the code below and write your tests
import axios from 'axios';
import { throttledGetDataFromApi } from './index';

jest.mock('axios');

describe('throttledGetDataFromApi', () => {
  const mockAxiosClient = {
    get: jest.fn(),
  };

  beforeEach(() => {
    jest.clearAllMocks();
    (axios.create as jest.Mock).mockReturnValue(mockAxiosClient);
  });

  test('should create instance with provided base url', async () => {
    const baseURL = 'https://jsonplaceholder.typicode.com';

    const mockAxiosClient = {
      defaults: { baseURL },
    };

    (axios.create as jest.Mock).mockReturnValue(mockAxiosClient);
    const axiosClient = axios.create({ baseURL });

    expect(axiosClient.defaults.baseURL).toBe(baseURL);
  });

  test('should perform request to correct provided url', async () => {
    const relativePath = '/posts';
    const mockData = [{ id: 1, title: 'sunt aut facere repellat provident occaecati excepturi optio reprehenderit'}];

    (mockAxiosClient.get as jest.Mock).mockResolvedValue({ data: mockData });

    await throttledGetDataFromApi(relativePath);

    expect(mockAxiosClient.get).toHaveBeenCalledWith(relativePath);
  });

  test('should return response data', async () => {
    const relativePath = '/posts';
    const mockData = [{ id: 1, title: 'sunt aut facere repellat provident occaecati excepturi optio reprehenderit'}];

    (mockAxiosClient.get as jest.Mock).mockResolvedValue({ data: mockData });

    const result = await throttledGetDataFromApi(relativePath);

    expect(result).toEqual(mockData);
  });
});
