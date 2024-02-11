/**
 * Copies a string to the clipboard.
 *
 * @param content
 * @param setCopySuccess
 */
export const copyToClipboard = (
  content: string,
  setCopySuccess: React.Dispatch<React.SetStateAction<boolean>>
) => {
  navigator.clipboard
    .writeText(content)
    .then(() => {
      setCopySuccess(true);
      setTimeout(() => {
        setCopySuccess(false);
      }, 1500); // Reset copy success message after 1.5 seconds
    })
    .catch((err) => {
      console.error("Failed to copy:", err);
    });
};

/**
 * Converts an amount of HBAR to a fiat currency given a conversion rate.
 *
 * @param conversionRate - The conversion rate of hbar to the fiat passed as the conversionCurrency prop.
 * @param amount - The amount of hbar to be converted.
 * @returns
 */
export const convertToFiat = (
  conversionRate: number,
  amount: string
): string => {
  const sanitizedAmount = amount.replace(/[',\s]/g, "");
  const amountInHbar = parseFloat(sanitizedAmount);

  if (isNaN(amountInHbar)) {
    return "?";
  }

  const convertedTotal = amountInHbar * conversionRate;
  return convertedTotal.toFixed(2);
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
