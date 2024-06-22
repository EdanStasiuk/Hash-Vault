import { fetchConversionRate } from "../src/functions/functions";

describe("fetchConversionRate function", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("should return conversion rate for hedera-hashgraph", async () => {
    const apiTokenId = "hedera-hashgraph";
    const conversionCurrency = "usd";
    const mockData = {
      market_data: {
        current_price: {
          usd: 0.25,
        },
      },
    };

    global.fetch = jest.fn().mockResolvedValue({
      json: jest.fn().mockResolvedValue(mockData),
    });

    const rate = await fetchConversionRate(apiTokenId, conversionCurrency);

    expect(rate).toBe(0.25);
    expect(global.fetch).toHaveBeenCalledWith(
      "https://api.coingecko.com/api/v3/coins/hedera-hashgraph",
      { method: "GET" }
    );
  });

  test("should return conversion rate for other tokens", async () => {
    const apiTokenId = "some-other-token";
    const conversionCurrency = "usd";
    const mockData = {
      priceUsd: 1.5,
    };

    global.fetch = jest.fn().mockResolvedValue({
      json: jest.fn().mockResolvedValue(mockData),
    });

    const rate = await fetchConversionRate(apiTokenId, conversionCurrency);

    expect(rate).toBe(1.5);
    expect(global.fetch).toHaveBeenCalledWith(
      "https://api.saucerswap.finance/tokens/some-other-token",
      { method: "GET" }
    );
  });

  test("should return undefined for empty apiTokenId", async () => {
    const apiTokenId = "";
    const conversionCurrency = "usd";
    const mockData = {
      priceUsd: 1.5,
    };

    global.fetch = jest.fn().mockResolvedValue({
      json: jest.fn().mockResolvedValue(mockData),
    });

    const rate = await fetchConversionRate(apiTokenId, conversionCurrency);

    expect(rate).toBeUndefined();
    expect(global.fetch).toHaveBeenCalled;
  });

  test("should return undefined if fetch fails", async () => {
    const apiTokenId = "hedera-hashgraph";
    const conversionCurrency = "usd";

    global.fetch = jest.fn().mockResolvedValue({
      json: jest.fn().mockRejectedValue(new Error("API error")),
    });

    const rate = await fetchConversionRate(apiTokenId, conversionCurrency);

    expect(rate).toBeUndefined();
    expect(global.fetch).toHaveBeenCalledWith(
      "https://api.coingecko.com/api/v3/coins/hedera-hashgraph",
      { method: "GET" }
    );
  });

  test("should handle non-existing conversion rate", async () => {
    const apiTokenId = "hedera-hashgraph";
    const conversionCurrency = "eur";
    const mockData = {
      market_data: {
        current_price: {
          usd: 0.25,
        },
      },
    };

    global.fetch = jest.fn().mockResolvedValue({
      json: jest.fn().mockRejectedValue(mockData),
    });

    const rate = await fetchConversionRate(apiTokenId, conversionCurrency);

    expect(rate).toBeUndefined();
    expect(global.fetch).toHaveBeenCalledWith(
      "https://api.coingecko.com/api/v3/coins/hedera-hashgraph",
      { method: "GET" }
    );
  });
});
