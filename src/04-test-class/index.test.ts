// Uncomment the code below and write your tests
// import { getBankAccount } from '.';

import { BankAccount, getBankAccount, InsufficientFundsError, SynchronizationFailedError } from "./index";

describe('BankAccount', () => {
  const startBalance = 50;
  const newBalance = 75;

  let account: BankAccount;
  let anotherAccount: BankAccount;

  beforeEach(() => {
    account = getBankAccount(startBalance);
    anotherAccount = getBankAccount(100);
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  test('should create account with initial balance', () => {
    expect(account.getBalance()).toEqual(50);
  });

  test('should throw InsufficientFundsError error when withdrawing more than balance', () => {
    expect(() => account.withdraw(100)).toThrow(InsufficientFundsError);
  });

  test('should throw error when transferring more than balance', () => {
    expect(() => account.transfer(100, anotherAccount)).toThrow();
  });

  test('should throw error when transferring to the same account', () => {
    expect(() => account.transfer(100, account)).toThrow();
  });

  test('should deposit money', () => {
    account.deposit(100);
    account.deposit(50);
    expect(account.getBalance()).toBe(200);
  });

  test('should withdraw money', () => {
    account.withdraw(20);
    expect(account.getBalance()).toBe(30);
  });

  test('should transfer money', () => {
    account.transfer(20, anotherAccount);

    expect(account.getBalance()).toBe(30);
    expect(anotherAccount.getBalance()).toBe(120);
  });

  test('fetchBalance should return number in case if request did not failed', async () => {
    jest.spyOn(account, 'fetchBalance').mockResolvedValue(newBalance);
    const result = await account.fetchBalance();

    expect(typeof result).toBe('number');
    expect(result).not.toBeNull();
  });

  test('should set new balance if fetchBalance returned number', async () => {
    jest.spyOn(account, 'fetchBalance').mockResolvedValue(newBalance);
    await account.synchronizeBalance();

    expect(account.getBalance()).not.toBe(startBalance);
  });

  test('should throw SynchronizationFailedError if fetchBalance returned null', async () => {
    const newBalance = null;

    jest.spyOn(account, 'fetchBalance').mockResolvedValue(newBalance);
    await expect(
      async () => await account.synchronizeBalance(),
    ).rejects.toThrow(SynchronizationFailedError);
  });
});
