import { convertToFiat } from "../src/components/Wallet/Pages/Accounts/Balances";

describe("convertToFiat function", () => {
  it("converts HBAR amount to fiat correctly", () => {
    const conversionRate = 0.25;
    const amount = "100.00";

    const result = convertToFiat(conversionRate, amount);
    const expected = (
      parseFloat(amount.replace(/[',\s]/g, "")) * conversionRate
    ).toFixed(2);

    expect(result).toBe(expected);
  });

  it("returns '?' for invalid amount", () => {
    const conversionRate = 0.25;
    const invalidAmount = "invalidAmount";

    const result = convertToFiat(conversionRate, invalidAmount);

    expect(result).toBe("?");
  });

  it("properly rounds result to two decimal places", () => {
    const conversionRate = 0.25;
    const amount = "100.001"

    const result = convertToFiat(conversionRate, amount);
    const expected = "25.00";

    expect(result).toBe(expected);
  })

  it("properly sanitizes amount input of commas.", () => {
    const conversionRate = 0.25;
    const amount = "1,000.0"

    const result = convertToFiat(conversionRate, amount);
    const expected = "250.00";

    expect(result).toBe(expected);
  })

  it("properly sanitizes amount input of apostrophes.", () => {
    const conversionRate = 0.25;
    const amount = "1.000'000'0"

    const result = convertToFiat(conversionRate, amount);
    const expected = "0.25";

    expect(result).toBe(expected);
  })

  it("properly sanitizes amount input of commas and apostrophes.", () => {
    const conversionRate = 0.25;
    const amount = "1,000.000'000'0"

    const result = convertToFiat(conversionRate, amount);
    const expected = "250.00"

    expect(result).toBe(expected);
  })

  it("properly sanitizes amount input of a leading space.", () => {
    const conversionRate = 0.25;
    const amount = " 1.00"

    const result = convertToFiat(conversionRate, amount);
    const expected = "0.25"

    expect(result).toBe(expected);
  })

  it("properly sanitizes amount input of leading spaces.", () => {
    const conversionRate = 0.25;
    const amount = "  1.00"

    const result = convertToFiat(conversionRate, amount);
    const expected = "0.25"

    expect(result).toBe(expected);
  })

  it("properly sanitizes amount input of a tailing space.", () => {
    const conversionRate = 0.25;
    const amount = "1.00 "

    const result = convertToFiat(conversionRate, amount);
    const expected = "0.25"

    expect(result).toBe(expected);
  })

  it("properly sanitizes amount input of tailing spaces.", () => {
    const conversionRate = 0.25;
    const amount = "1.00  "

    const result = convertToFiat(conversionRate, amount);
    const expected = "0.25"

    expect(result).toBe(expected);
  })

  it("properly sanitizes amount input of leading and tailing spaces.", () => {
    const conversionRate = 0.25;
    const amount = "  1.00  "

    const result = convertToFiat(conversionRate, amount);
    const expected = "0.25"

    expect(result).toBe(expected);
  })
});