import { getTokenInfo } from "../src/functions";

describe("getTokenInfo function", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("should return token information if fetch is successful", async () => {
    const mockData = {
      name: "Token Name",
      symbol: "TOK",
      decimals: "18",
    };

    global.fetch = jest.fn().mockResolvedValue({
      ok: true,
      json: jest.fn().mockResolvedValue(mockData),
    });

    const result = await getTokenInfo("tokenId");
    expect(result).toEqual({
      name: "Token Name",
      symbol: "TOK",
      decimals: "18",
    });
  });

  test("should return null if token data is invalid", async () => {
    const mockData = {
      name: null,
      symbol: "TOK",
      decimals: "18",
    };

    global.fetch = jest.fn().mockResolvedValue({
      ok: true,
      json: jest.fn().mockResolvedValue(mockData),
    });

    const result = await getTokenInfo("tokenId");
    expect(result).toBeNull();
  });

  test("should return null if fetch request fails", async () => {
    global.fetch = jest.fn().mockResolvedValue({
      ok: false,
      status: 500,
    });

    const result = await getTokenInfo("tokenId");
    expect(result).toBeNull();
  });

  test("should return null if an error is thrown during fetch", async () => {
    global.fetch = jest.fn().mockRejectedValue(new Error("Network error"));

    const result = await getTokenInfo("tokenId");
    expect(result).toBeNull();
  });
});
