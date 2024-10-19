// Uncomment the code below and write your tests
// import { generateLinkedList } from './index';

import { generateLinkedList } from "./index";

describe('generateLinkedList', () => {
  test('should generate linked list from values 1', () => {
    const values = [1, 2, 3];
    const expected = {
      value: 1,
      next: {
        value: 2,
        next: {
          value: 3,
          next: {
            next: null,
            value: null,
          },
        },
      },
    };

    const result = generateLinkedList(values);
    expect(result).toStrictEqual(expected);
  });

  // Check match by comparison with snapshot
  test('should generate linked list from values 2', () => {
    const values = ['1', '2', '3'];
    const result = generateLinkedList(values);

    expect(result).toMatchSnapshot();
  });
});
