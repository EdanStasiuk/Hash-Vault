import { getPositiveBalanceNonNftTokens } from "../src/functions";

describe("getPositiveBalanceNonNftTokens", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("should return an array of token IDs and balances for non-NFT assets with a balance > 0", async () => {
    const mockData = {
      balance: {
        tokens: [
          { token_id: "token1", balance: 1000 },
          { token_id: "token2", balance: 2000 },
        ],
      },
    };

    const tokenMetadataMock = {
      decimals: 0,
    };

    global.fetch = jest.fn().mockImplementation((url) => {
      if (url.includes("accounts")) {
        return Promise.resolve({
          ok: true,
          json: () => Promise.resolve(mockData),
        });
      } else if (url.includes("tokens")) {
        return Promise.resolve({
          ok: true,
          json: () => Promise.resolve(tokenMetadataMock),
        });
      }
    });

    // Assuming isNFT and getTokenBalance functions are also real implementations
    jest.fn().mockResolvedValueOnce(false).mockResolvedValueOnce(false);
    jest.fn().mockResolvedValueOnce(1000).mockResolvedValueOnce(2000);

    // Call the function being tested
    const result = await getPositiveBalanceNonNftTokens("accountId");

    // Expected result based on the mock data
    const expected = [
      { id: "token1", balance: 1000 },
      { id: "token2", balance: 2000 },
    ];

    // Assert that the result matches the expected output
    expect(result).toEqual(expected);
  });

  test("should exclude NFTs from the result", async () => {
    const mockData = {
      balance: {
        tokens: [
          { token_id: "token1", balance: 1000 },
          { token_id: "token2", balance: 2000 },
        ],
      },
    };

    const tokenMetadataMock = {
      decimals: 0,
    };

    const nftMockData = {
      nfts: [{ token_id: "token1" }],
    };

    global.fetch = jest.fn().mockImplementation((url) => {
      if (url.includes("accounts/accountId/nfts")) {
        return Promise.resolve({
          ok: true,
          json: () => Promise.resolve(nftMockData),
        });
      } else if (url.includes("accounts")) {
        return Promise.resolve({
          ok: true,
          json: () => Promise.resolve(mockData),
        });
      } else if (url.includes("tokens")) {
        return Promise.resolve({
          ok: true,
          json: () => Promise.resolve(tokenMetadataMock),
        });
      }
    });

    jest.fn().mockResolvedValueOnce(true).mockResolvedValueOnce(false);
    jest.fn().mockResolvedValueOnce(2000);

    const result = await getPositiveBalanceNonNftTokens("accountId");
    expect(result).toEqual([{ id: "token2", balance: 2000 }]);
  });

  test("should return an empty array if no tokens have a balance > 0", async () => {
    const mockData = {
      balance: {
        tokens: [
          { token_id: "token1", balance: 0 },
          { token_id: "token2", balance: 0 },
        ],
      },
    };

    global.fetch = jest.fn().mockResolvedValue({
      ok: true,
      json: jest.fn().mockResolvedValue(mockData),
    });

    const result = await getPositiveBalanceNonNftTokens("accountId");
    expect(result).toEqual([]);
  });

  test("should return an empty array if fetch request fails", async () => {
    global.fetch = jest.fn().mockResolvedValue({
      ok: false,
    });

    const result = await getPositiveBalanceNonNftTokens("accountId");
    expect(result).toEqual([]);
  });

  test("should return an empty array if an error is thrown during fetch", async () => {
    global.fetch = jest.fn().mockRejectedValue(new Error("Network error"));

    const result = await getPositiveBalanceNonNftTokens("accountId");
    expect(result).toEqual([]);
  });

  test("should return an empty array if getTokenBalance returns null", async () => {
    const mockData = {
      balance: {
        tokens: [{ token_id: "token1", balance: 1000 }],
      },
    };

    global.fetch = jest.fn().mockResolvedValue({
      ok: true,
      json: jest.fn().mockResolvedValue(mockData),
    });

    jest.fn().mockResolvedValue(true);
    jest.fn().mockResolvedValueOnce(null);

    const result = await getPositiveBalanceNonNftTokens("accountId");
    expect(result).toEqual([]);
  });
});
