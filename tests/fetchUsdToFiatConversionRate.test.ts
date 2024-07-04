import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { fetchUsdToFiatConversionRate} from '../src/functions/functions';

describe("fetchUsdToFiatConversionRate function", () => {
  let mock: MockAdapter;
  const API_KEY = process.env.VITE_EXCHANGERATE_API_PASSWORD;
  const API_URL = `https://v6.exchangerate-api.com/v6/${API_KEY}/latest/USD`;

  beforeEach(() => {
    mock = new MockAdapter(axios);
    jest.clearAllMocks();
  });

  afterEach(() => {
    mock.restore();
  });

  test("should return conversion rate for USD to CAD", async () => {
    const fiatToBeConvertedTo = "CAD";
    const mockData = {
      conversion_rates: {
        "CAD": 1.33,
      },
    };

    mock.onGet(API_URL).reply(200, mockData);

    const conversionRate = await fetchUsdToFiatConversionRate(fiatToBeConvertedTo);

    expect(conversionRate).toBe(1.33);
  });

  test("should return conversion rate for USD to EUR", async () => {
    const fiatToBeConvertedTo = "EUR";
    const mockData = {
      conversion_rates: {
        "EUR": 0.9,
      },
    };

    mock.onGet(API_URL).reply(200, mockData);

    const conversionRate = await fetchUsdToFiatConversionRate(fiatToBeConvertedTo);

    expect(conversionRate).toBe(0.9);
  });

  test("should return conversion rate for USD to GBP", async () => {
    const fiatToBeConvertedTo = "GBP";
    const mockData = {
      conversion_rates: {
        "GBP": 0.7,
      },
    };

    mock.onGet(API_URL).reply(200, mockData);

    const conversionRate = await fetchUsdToFiatConversionRate(fiatToBeConvertedTo);

    expect(conversionRate).toBe(0.7);
  });

  test("should return conversion rate for USD to JPY", async () => {
    const fiatToBeConvertedTo = "JPY";
    const mockData = {
      conversion_rates: {
        "JPY": 160.9,
      },
    };

    mock.onGet(API_URL).reply(200, mockData);

    const conversionRate = await fetchUsdToFiatConversionRate(fiatToBeConvertedTo);

    expect(conversionRate).toBe(160.9);
  });

  test("should handle non-all-capitalized fiat ticker input", async () => {
    const fiatToBeConvertedTo = "Cad";
    const mockData = {
      conversion_rates: {
        "CAD": 1.33,
      },
    };

    mock.onGet(API_URL).reply(200, mockData);

    const conversionRate = await fetchUsdToFiatConversionRate(fiatToBeConvertedTo);

    expect(conversionRate).toBe(1.33);
  });

  test("should handle partially non-capitalized fiat ticker input", async () => {
    const fiatToBeConvertedTo = "cad";
    const mockData = {
      conversion_rates: {
        "CAD": 1.33,
      },
    };

    mock.onGet(API_URL).reply(200, mockData);

    const conversionRate = await fetchUsdToFiatConversionRate(fiatToBeConvertedTo);

    expect(conversionRate).toBe(1.33);
  });

  test("should log error when conversion rate is not found", async () => {
    const fiatToBeConvertedTo = "xyz";
    const mockData = {
      conversion_rates: {
        "CAD": 1.33,
      },
    };

    mock.onGet(API_URL).reply(200, mockData);

    const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});

    const conversionRate = await fetchUsdToFiatConversionRate(fiatToBeConvertedTo);

    expect(conversionRate).toBe(undefined);
    expect(consoleErrorSpy).toHaveBeenCalledWith(`Conversion rate for ${fiatToBeConvertedTo} not found.`);    
  });

  test("should handle empty string input", async () => {
    const fiatToBeConvertedTo = "";
    const mockData = {
      conversion_rates: {
        "CAD": 1.33,
      },
    };

    mock.onGet(API_URL).reply(200, mockData);

    const conversionRate = await fetchUsdToFiatConversionRate(fiatToBeConvertedTo);

    expect(conversionRate).toBe(undefined);
    expect(mock.history.get.length).toBe(0);
  });

  test("should log error when there is an error fetching conversion rate", async () => {
    const fiatToBeConvertedTo = "CAD";
    mock.onGet(API_URL).networkError();

    const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});

    const conversionRate = await fetchUsdToFiatConversionRate(fiatToBeConvertedTo);

    expect(conversionRate).toBe(undefined);
    expect(mock.history.get.length).toBe(1);
    expect(consoleErrorSpy).toHaveBeenCalled();

    consoleErrorSpy.mockRestore();
  });
});