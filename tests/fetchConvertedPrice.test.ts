import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { fetchConvertedPrice } from "../src/functions/functions";

describe("fetchConvertedPrice function", () => {
  let mock: MockAdapter;

  beforeEach(() => {
    mock = new MockAdapter(axios);
    jest.clearAllMocks();
  });

  afterEach(() => {
    mock.restore();
  });

  test("should return converted price for hedera-hashgraph", async () => {
    const apiTokenId = "hedera-hashgraph";
    const conversionCurrency = "usd";
    const mockData = {
      market_data: {
        current_price: {
          usd: 0.25,
        },
      },
    };

    mock.onGet(`https://api.coingecko.com/api/v3/coins/${apiTokenId}`).reply(200, mockData);

    const convertedPrice = await fetchConvertedPrice(apiTokenId, conversionCurrency);

    expect(convertedPrice).toBe(0.25);
    expect(mock.history.get[0].url).toBe(
      "https://api.coingecko.com/api/v3/coins/hedera-hashgraph"
    );
  });

  test("should return converted price for other tokens", async () => {
    const apiTokenId = "some-other-token";
    const conversionCurrency = "usd";
    const mockData = {
      priceUsd: 1.5,
    };

    mock.onGet(`https://api.saucerswap.finance/tokens/${apiTokenId}`).reply(200, mockData);

    const convertedPrice = await fetchConvertedPrice(apiTokenId, conversionCurrency);

    expect(convertedPrice).toBe(1.5);
    expect(mock.history.get[0].url).toBe(
      "https://api.saucerswap.finance/tokens/some-other-token"
    );
  });

  test("should return undefined for empty apiTokenId", async () => {
    const apiTokenId = "";
    const conversionCurrency = "usd";

    const convertedPrice = await fetchConvertedPrice(apiTokenId, conversionCurrency);

    expect(convertedPrice).toBeUndefined();
  });

  test("should return undefined if fetch fails", async () => {
    const apiTokenId = "hedera-hashgraph";
    const conversionCurrency = "usd";

    mock.onGet(`https://api.coingecko.com/api/v3/coins/${apiTokenId}`).networkError();

    const convertedPrice = await fetchConvertedPrice(apiTokenId, conversionCurrency);

    expect(convertedPrice).toBeUndefined();
    expect(mock.history.get[0].url).toBe(
      "https://api.coingecko.com/api/v3/coins/hedera-hashgraph"
    );
  });

  test("should handle attempt to convert to non-existing currency", async () => {
    const apiTokenId = "hedera-hashgraph";
    const conversionCurrency = "xyz";
    const mockData = {
      market_data: {
        current_price: {
          usd: 0.25,
        },
      },
    };

    mock.onGet(`https://api.coingecko.com/api/v3/coins/${apiTokenId}`).reply(200, mockData);

    const convertedPrice = await fetchConvertedPrice(apiTokenId, conversionCurrency);

    expect(convertedPrice).toBeUndefined();
    expect(mock.history.get[0].url).toBe(
      "https://api.coingecko.com/api/v3/coins/hedera-hashgraph"
    );
  });
});
