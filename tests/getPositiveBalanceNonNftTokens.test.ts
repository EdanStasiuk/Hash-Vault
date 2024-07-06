import axios from 'axios';
import { getPositiveBalanceNonNftTokens } from '../src/functions/functions';

jest.mock('axios');

describe('getPositiveBalanceNonNftTokens', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('should return an array of token IDs and balances for non-NFT assets with a balance > 0', async () => {
    const mockData = {
      balance: {
        tokens: [
          { token_id: 'token1', balance: 1000 },
          { token_id: 'token2', balance: 2000 },
        ],
      },
    };

    const tokenMetadataMock = {
      decimals: 0,
    };

    (axios.get as jest.Mock).mockImplementation((url) => {
      if (url.includes('accounts')) {
        return Promise.resolve({ status: 200, data: mockData });
      } else if (url.includes('tokens')) {
        return Promise.resolve({ status: 200, data: tokenMetadataMock });
      }
    });

    jest.fn().mockResolvedValueOnce(false).mockResolvedValueOnce(false);
    jest.fn().mockResolvedValueOnce(1000).mockResolvedValueOnce(2000);

    const result = await getPositiveBalanceNonNftTokens('accountId');

    const expected = [
      { id: 'token1', balance: 1000 },
      { id: 'token2', balance: 2000 },
    ];

    expect(result).toEqual(expected);
  });

  test('should exclude NFTs from the result', async () => {
    const mockData = {
      balance: {
        tokens: [
          { token_id: 'token1', balance: 1000 },
          { token_id: 'token2', balance: 2000 },
        ],
      },
    };

    const tokenMetadataMock = {
      decimals: 0,
    };

    const nftMockData = {
      nfts: [{ token_id: 'token1' }],
    };

    (axios.get as jest.Mock).mockImplementation((url) => {
      if (url.includes('accounts/accountId/nfts')) {
        return Promise.resolve({ status: 200, data: nftMockData });
      } else if (url.includes('accounts')) {
        return Promise.resolve({ status: 200, data: mockData });
      } else if (url.includes('tokens')) {
        return Promise.resolve({ status: 200, data: tokenMetadataMock });
      }
    });

    jest.fn().mockResolvedValueOnce(true).mockResolvedValueOnce(false);
    jest.fn().mockResolvedValueOnce(2000);

    const result = await getPositiveBalanceNonNftTokens('accountId');
    expect(result).toEqual([{ id: 'token2', balance: 2000 }]);
  });

  test('should return an empty array if no tokens have a balance > 0', async () => {
    const mockData = {
      balance: {
        tokens: [
          { token_id: 'token1', balance: 0 },
          { token_id: 'token2', balance: 0 },
        ],
      },
    };

    (axios.get as jest.Mock).mockResolvedValue({ status: 200, data: mockData });

    const result = await getPositiveBalanceNonNftTokens('accountId');
    expect(result).toEqual([]);
  });

  test('should return an empty array if fetch request fails', async () => {
    (axios.get as jest.Mock).mockResolvedValue({ status: 500 });

    const result = await getPositiveBalanceNonNftTokens('accountId');
    expect(result).toEqual([]);
  });

  test('should return an empty array if an error is thrown during fetch', async () => {
    (axios.get as jest.Mock).mockRejectedValue(new Error('Network error'));

    const result = await getPositiveBalanceNonNftTokens('accountId');
    expect(result).toEqual([]);
  });

  test('should return an empty array if getTokenBalance returns null', async () => {
    const mockData = {
      balance: {
        tokens: [{ token_id: 'token1', balance: 1000 }],
      },
    };

    (axios.get as jest.Mock).mockResolvedValue({ status: 200, data: mockData });

    jest.fn().mockResolvedValue(true);
    jest.fn().mockResolvedValueOnce(null);

    const result = await getPositiveBalanceNonNftTokens('accountId');
    expect(result).toEqual([]);
  });
});
