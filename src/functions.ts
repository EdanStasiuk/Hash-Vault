import { Asset } from "./pages/Wallet/Dashboard";

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
  const sanitizedAmount =
    typeof amount === "number" ? amount.toString() : amount;
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
 * Fetches the conversion rate for a given coin ID for the CoinGecko API.
 *
 * @param {string} apiTokenId - The ticker symbol of the coin.
 * @param {string} conversionCurrency - The currency abbreviation for conversion.
 * @returns {Promise<number | undefined>} - The conversion rate or undefined if fetching fails.
 */
export const fetchConversionRate = async (
  // TODO: Look into reducing the number of times this needs to be called, should only be called once on Accounts page
  apiTokenId: string,
  conversionCurrency: string
): Promise<number | undefined> => {
  conversionCurrency = conversionCurrency.toLowerCase();
  try {
    const response = await fetch(
      `https://api.coingecko.com/api/v3/coins/${apiTokenId}`,
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
 * @param {string} currency - A currency ticker symbol.
 * @returns {string} - The corresponding currency symbol for the inputted currency ticker.
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

/**
 * Fetches logos for assets that are not already cached in localStorage.
 * If a logo for an asset is not found in the cache, it fetches the logo from an API endpoint.
 * Once fetched, the logos are stored in localStorage for future use.
 *
 * @param {Asset[]} assetOptions - List of assets for which logos need to be fetched.
 * @returns {Promise<Record<string, string>>} - A promise resolving to an object mapping asset names to logo URLs.
 */
export async function fetchAssetLogos(
  assetOptions: Asset[]
): Promise<Record<string, string>> {
  const cachedLogos = localStorage.getItem("assetLogos");
  const cachedLogosMap = cachedLogos ? (JSON.parse(cachedLogos) as string) : {};
  const missingLogos = assetOptions.filter(
    (asset) => !(asset.name in cachedLogosMap)
  );
  const logoPromises = missingLogos.map((asset) =>
    fetch(`/api/coins/${asset.apiId}`, { method: "GET" })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
        const logoUrl = data.image.large as string;
        return { [asset.name]: logoUrl };
      })
      .catch((error) => {
        console.error("Error fetching logo:", error);
        return {
          [asset.name]: "",
        };
      })
  );
  try {
    const logos = await Promise.all(logoPromises);
    const logoMap = logos.reduce((acc, logo) => {
      const assetName = Object.keys(logo)[0];
      const logoUrl = logo[assetName];
      if (logoUrl !== "") {
        // Exclude null URLs from storage
        acc[assetName] = logoUrl;
      }
      return acc;
    }, {});
    const updatedLogos = { ...cachedLogosMap, ...logoMap };
    localStorage.setItem("assetLogos", JSON.stringify(updatedLogos));
    return updatedLogos;
  } catch (error) {
    console.error("Error fetching logos:", error);
    return {};
  }
}
