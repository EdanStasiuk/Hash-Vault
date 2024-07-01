import { getAccountAssets } from "../src/functions/functions";

describe("getAccountAssets function", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  const mockData = {
    balance: {
      balance: 10000000000, // hbar balance in tinybars (100 HBAR)
      tokens: [
        { token_id: "token1", balance: 1000000000 }, // 10 Token 1
        { token_id: "token2", balance: 2000000000 }, // 20 Token 2
      ],
    },
  };

  const tokenMetadataMock1 = {
    decimals: "8",
    name: "Token 1",
    symbol: "TOK1",
  };

  const tokenMetadataMock2 = {
    decimals: "8",
    name: "Token 2",
    symbol: "TOK2",
  };

  const nftMockData = {
    nfts: [], // No NFTs for this account
  };

  test("should return account assets with HBAR balance and positive token balances", async () => {
    global.fetch = jest.fn().mockImplementation((url) => {
      if (url.includes("accounts/accountId/nfts")) {
        return Promise.resolve({
          ok: true,
          json: () => Promise.resolve(nftMockData),
        });
      } else if (url.includes("accounts/accountId")) {
        return Promise.resolve({
          ok: true,
          json: () => Promise.resolve(mockData),
        });
      } else if (url.includes("tokens/token1")) {
        return Promise.resolve({
          ok: true,
          json: () => Promise.resolve(tokenMetadataMock1),
        });
      } else if (url.includes("tokens/token2")) {
        return Promise.resolve({
          ok: true,
          json: () => Promise.resolve(tokenMetadataMock2),
        });
      }
    });

    const result = await getAccountAssets("accountId");

    expect(result).toEqual([
      {
        token_id: "",
        name: "HBAR",
        symbol: "HBAR",
        balance: 100, // 100 HBAR
        api_id: "hedera-hashgraph",
        type: "FUNGIBLE_COMMON",
        decimals: "8",
      },
      {
        token_id: "token1",
        name: "Token 1",
        symbol: "TOK1",
        balance: 10, // 10 Token 1
        api_id: "",
        type: "FUNGIBLE_COMMON",
        decimals: "8",
      },
      {
        token_id: "token2",
        name: "Token 2",
        symbol: "TOK2",
        balance: 20, // 20 Token 2
        api_id: "",
        type: "FUNGIBLE_COMMON",
        decimals: "8",
      },
    ]);
  });

  test("should return account assets with only HBAR info if positive token balances are empty", async () => {
    const mockData = {
      balance: {
        balance: 10000000000, // hbar balance in tinybars (100 HBAR)
        tokens: [
          { token_id: "token1", balance: 0 }, // 10 Token 1
          { token_id: "token2", balance: 0 }, // 20 Token 2
        ],
      },
    };

    global.fetch = jest.fn().mockImplementation((url) => {
      if (url.includes("accounts/accountId")) {
        return Promise.resolve({
          ok: true,
          json: () => Promise.resolve(mockData),
        });
      }
    });

    const result = await getAccountAssets("accountId");
    expect(result).toEqual([
      {
        token_id: "",
        name: "HBAR",
        symbol: "HBAR",
        balance: 100,
        api_id: "hedera-hashgraph",
        type: "FUNGIBLE_COMMON",
        decimals: "8",
      },
    ]);
  });

  test("should return empty array if HBAR balance retrieval fails", async () => {
    global.fetch = jest.fn().mockImplementation((url) => {
      if (url.includes("accounts/accountId")) {
        return Promise.resolve({
          ok: false,
          json: () => Promise.resolve(mockData),
        });
      }
    });

    const result = await getAccountAssets("accountId");
    expect(result).toEqual([]);
  });

  test("should return account assets with only HBAR info if positive token balance retrieval fails", async () => {
    global.fetch = jest.fn().mockImplementation((url) => {
      if (url.includes("accounts/accountId/nfts")) {
        return Promise.resolve({
          ok: true,
          json: () => Promise.resolve(nftMockData),
        });
      } else if (url.includes("accounts/accountId")) {
        return Promise.resolve({
          ok: true,
          json: () => Promise.resolve(mockData),
        });
      } else if (url.includes("tokens/token1")) {
        return Promise.resolve({
          ok: false,
          json: () => Promise.resolve(tokenMetadataMock1),
        });
      } else if (url.includes("tokens/token2")) {
        return Promise.resolve({
          ok: false,
          json: () => Promise.resolve(tokenMetadataMock2),
        });
      }
    });

    const result = await getAccountAssets("accountId");
    expect(result).toEqual([
      {
        token_id: "",
        name: "HBAR",
        symbol: "HBAR",
        balance: 100, // 100 HBAR
        api_id: "hedera-hashgraph",
        type: "FUNGIBLE_COMMON",
        decimals: "8",
      },
    ]);
  });

  test("should return empty array if an error is thrown during retrieval", async () => {
    global.fetch = jest.fn().mockImplementation((url) => {
      if (url.includes("accounts/accountId")) {
        return Promise.resolve({
          ok: false,
          json: () => Promise.resolve(mockData),
        });
      }
    });

    const result = await getAccountAssets("accountId");
    expect(result).toEqual([]);
  });
});
