/**
 * Copies a string to the clipboard. Copied content is converted to a string.
 *
 * @param {string | number} content - The content to be copied to the clipboard.
 * @param setCopySuccess
 */
export const copyToClipboard = (
  content: string | number,
  setCopySuccess: React.Dispatch<React.SetStateAction<boolean>>
) => {
  const contentToCopy = String(content);
  navigator.clipboard
    .writeText(contentToCopy)
    .then(() => {
      setCopySuccess(true);
      setTimeout(() => {
        setCopySuccess(false);
      }, 1500);
    })
    .catch((err) => {
      console.error("Failed to copy:", err);
    });
};

/**
 * Converts an amount of HBAR to a fiat currency given a conversion rate.
 *
 * @param {number} conversionRate - The conversion rate of HBAR to the fiat passed as the conversionCurrency prop.
 * @param {string | number} amount - The amount of hbar to be converted.
 * @returns the resultant amount of fiat converted from HBAR, rounded to 2 decimal places.
 */
export const convertToFiat = (
  conversionRate: number,
  amount: string | number
): string => {
  const sanitizedAmount = typeof amount === "number" ? amount.toString() : amount;
  const amountInHbar = parseFloat(sanitizedAmount.replace(/[',\s]/g, ""));

  if (isNaN(amountInHbar)) {
    return "?";
  }

  const convertedTotal = amountInHbar * conversionRate;

  // Converted total always has 2 digits after the decimal point, and
  // comma separators every 3 digits in the integer part
  return convertedTotal.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

/**
 * Fetches the conversion rate for a given coin ticker symbol.
 *
 * @param {string} coinTicker - The ticker symbol of the coin.
 * @param {string} conversionCurrency - The currency abbreviation for conversion.
 * @returns {Promise<number | undefined>} - The conversion rate or undefined if fetching fails.
 */
export const fetchConversionRate = async (
  coinTicker: string,
  conversionCurrency: string
): Promise<number | undefined> => {
  conversionCurrency = conversionCurrency.toLowerCase();
  try {
    const response = await fetch(
      `https://api.coingecko.com/api/v3/coins/${coinTicker}`,
      { method: "GET" }
    );
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const data = await response.json();
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    const conversionRate = data?.market_data?.current_price?.[
      conversionCurrency
    ] as number | undefined;
    return conversionRate;
  } catch (error) {
    console.error("Error fetching conversion rate:", error);
    return undefined;
  }
};

/**
 * @param currency - A currency ticker symbol.
 * @returns the corresponding currency symbol for the inputted currency ticker.
 */
export const displayCurrencySymbol = (currency: string): string => {
  currency = currency.toLowerCase();
  switch (currency) {
    case "usd":
    case "cad":
      return "$";
    case "eur":
      return "€";
    case "gbp":
      return "£";
    case "jpy":
      return "¥";
    default:
      return currency.toUpperCase(); // Return the currency code suited for display if no match found
  }
};
