import { displayCurrencySymbol } from "../src/functions/functions";

describe("displayCurrencySymbol function", () => {
  test("should return $ for USD", () => {
    expect(displayCurrencySymbol("usd")).toBe("$");
  });

  test("should return $ for CAD", () => {
    expect(displayCurrencySymbol("cad")).toBe("$");
  });

  test("should return € for EUR", () => {
    expect(displayCurrencySymbol("eur")).toBe("€");
  });

  test("should return £ for GBP", () => {
    expect(displayCurrencySymbol("gbp")).toBe("£");
  });

  test("should return ¥ for JPY", () => {
    expect(displayCurrencySymbol("jpy")).toBe("¥");
  });

  test("should return the uppercase currency code for unknown currencies", () => {
    expect(displayCurrencySymbol("aud")).toBe("AUD");
    expect(displayCurrencySymbol("inr")).toBe("INR");
    expect(displayCurrencySymbol("cny")).toBe("CNY");
  });

  test("should handle mixed case inputs correctly", () => {
    expect(displayCurrencySymbol("Usd")).toBe("$");
    expect(displayCurrencySymbol("Cad")).toBe("$");
    expect(displayCurrencySymbol("Eur")).toBe("€");
    expect(displayCurrencySymbol("Gbp")).toBe("£");
    expect(displayCurrencySymbol("Jpy")).toBe("¥");
    expect(displayCurrencySymbol("Aud")).toBe("AUD");
  });

  test("should return unchanged for empty string input", () => {
    expect(displayCurrencySymbol("")).toBe("");
  });

  test("should return unchanged for numeric input treated as string", () => {
    expect(displayCurrencySymbol("123")).toBe("123");
  });

  test("should return unchanged for special characters input treated as string", () => {
    expect(displayCurrencySymbol("$$$")).toBe("$$$");
  });
});
