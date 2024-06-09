/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { MirrorNodeTokenInfo, AccountResponse } from "./config/interfaces.ts";

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
 * Fetches the conversion rate for a given coin ID.
 *
 * @param {string} apiTokenId - The ticker symbol of the coin.
 * @param {string} conversionCurrency - The ticker symbol of the currency rate to be fetched.
 * @returns {Promise<number | undefined>} - The conversion rate or undefined if fetching fails.
 */
export const fetchConversionRate = async (
  apiTokenId: string,
  conversionCurrency: string
): Promise<number | undefined> => {
  conversionCurrency = conversionCurrency.toLowerCase();

  if (apiTokenId === "") {
    return;
  }

  try {
    let url: string;

    if (apiTokenId === "hedera-hashgraph") {
      url = `https://api.coingecko.com/api/v3/coins/${apiTokenId}`;
    } else {
      url = `https://api.saucerswap.finance/tokens/${apiTokenId}`;
    }

    const response = await fetch(url, { method: "GET" });
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const data = await response.json();

    let conversionRate: number | undefined;

    if (apiTokenId === "hedera-hashgraph") {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      conversionRate = data?.market_data?.current_price?.[
        conversionCurrency
      ] as number | undefined;
    } else {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      conversionRate = data?.priceUsd; // TODO: need to convert to the conversionCurrency, will need to update test case when you do this
      // console.log(conversionRate); // TODO: need to show an error message to user if conversion rate was not found
    }

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
 * Retrieves the balance of a specified token for a given account.
 * If the token ID is empty or null, returns the account balance in hbars.
 * @param {string} tokenId The token ID. If empty or null, the function returns the account balance in hbars.
 * @param {string} accountId The account ID for which to retrieve the balance.
 * @returns {number | null} The balance of the specified token or the account balance in hbars, or null if an error occurs.
 */
export async function getTokenBalance(
  tokenId: string,
  accountId: string
): Promise<number | null> {
  try {
    const response = await fetch(
      `https://mainnet.mirrornode.hedera.com/api/v1/accounts/${accountId}`
    );

    if (!response.ok) {
      throw new Error(`Failed to fetch account balance: ${response.status}`);
    }

    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const data = await response.json();

    // If token is "hedera-hashgraph", return the account balance in hbars (hbar does not have a token id via the api)
    if (tokenId === "hedera-hashgraph") {
      const accountBalance = data.balance.balance / Math.pow(10, 8); // Tinybar to Hbar conversion
      // console.log(
      //   "The hbar balance for this account is " + accountBalance
      // );

      return Number(accountBalance.toFixed(8));
    } else {
      // If token is not null, find the balance of the specified token
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      const tokenBalance =
        // eslint-disable-next-line @typescript-eslint/no-unsafe-call
        data.balance.tokens.find(
          (t: { token_id: string }) => t.token_id === tokenId
        )?.balance ?? 0;

      // Fetch token metadata to get the number of decimals
      const tokenResponse = await fetch(
        `https://mainnet.mirrornode.hedera.com/api/v1/tokens/${tokenId}`
      );
      if (!tokenResponse.ok) {
        throw new Error(
          `Failed to fetch token metadata: ${tokenResponse.status}`
        );
      }

      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      const tokenData = await tokenResponse.json();
      const decimals = tokenData.decimals as number;

      // Adjust the token balance by the number of decimals
      const adjustedTokenBalance = tokenBalance / Math.pow(10, decimals);
      // console.log(
      //   `The balance of token ${token} for this account is ${adjustedTokenBalance}`
      // );

      return Number(adjustedTokenBalance.toFixed(decimals));
    }
  } catch (error) {
    console.error("Error retrieving account balance:", error);
    // TODO: Handle the error appropriately, maybe notify the user or retry the operation
    return null;
  }
}

/**
 * Checks if a token is an NFT for a given account.
 * Used locally as a supplementary function to getPositiveBalanceNonNftTokens.
 * @param {string} accountId The account ID for which to check NFTs.
 * @param {string} tokenId The token ID to check if it's an NFT.
 * @returns {Promise<boolean>} A promise resolving to true if the token is an NFT, false otherwise.
 */
export async function isNFT(
  accountId: string,
  tokenId: string
): Promise<boolean> {
  try {
    const response = await fetch(
      `https://mainnet.mirrornode.hedera.com/api/v1/accounts/${accountId}/nfts`
    );
    if (!response.ok) {
      throw new Error("Failed to fetch NFT data");
    }
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const data = await response.json();
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const nfts = data.nfts || [];
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call
    const isNFT = nfts.some(
      (nft: { token_id: string }) => nft.token_id === tokenId
    ) as boolean;
    return isNFT;
  } catch (error) {
    console.error("Error checking NFT:", error);
    return false;
  }
}

/**
 * Retrieves data pairs of token IDs and amounts for all non-NFT assets with a balance > 0.
 * Used locally as a supplementary function to getAccountAssets.
 * @param {string} accountId The account ID for which to retrieve the data pairs.
 * @returns {Array<{id: string, balance: number}>} An array of objects containing token IDs and their balances.
 */
export async function getPositiveBalanceNonNftTokens(
  accountId: string
): Promise<{ id: string; balance: number }[]> {
  try {
    const response = await fetch(
      `https://mainnet.mirrornode.hedera.com/api/v1/accounts/${accountId}`
    );
    if (!response.ok) {
      throw new Error("Failed to fetch account data");
    }
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const data: AccountResponse = await response.json();
    const positiveBalances: { id: string; balance: number }[] = [];

    for (const token of data.balance.tokens) {
      if (token.balance > 0) {
        const isTokenNFT = await isNFT(accountId, token.token_id);
        if (!isTokenNFT) {
          const balance = await getTokenBalance(token.token_id, accountId);
          if (balance !== null && Number.isFinite(balance)) {
            positiveBalances.push({ id: token.token_id, balance: balance });
          }
        }
      }
    }

    return positiveBalances;
  } catch (error) {
    console.error("Error fetching account data:", error);
    return [];
  }
}

/**
 * Retrieves the name and symbol of a specified token.
 * Used locally as a supplementary function to getAccountAssets.
 * @param {string} tokenId The token ID for which to retrieve the name, symbol, and decimals.
 * @returns {Promise<{name: string, symbol: string} | null>} An object containing the name and symbol of the token, or null if an error occurs.
 */
export async function getTokenInfo(
  tokenId: string
): Promise<{ name: string; symbol: string; decimals: string } | null> {
  try {
    const response = await fetch(
      `https://mainnet.mirrornode.hedera.com/api/v1/tokens/${tokenId}`
    );

    if (!response.ok) {
      throw new Error(`Failed to fetch token info: ${response.status}`);
    }

    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const data = await response.json();

    // Extracting name, symbol, and decimals from the response
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const { name, symbol, decimals } = data;

    if (name == undefined || symbol == undefined || decimals == undefined) {
      throw new Error("Invalid token data");
    }

    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    return { name, symbol, decimals };
  } catch (error) {
    console.error("Error retrieving token info:", error);
    return null;
  }
}

/**
 * Retrieves the assets with their id, name, symbol, and balance for a given account.
 * @param {string} accountId The account ID for which to retrieve the assets.
 * @returns {Promise<MirrorNodeTokenInfo[]>} An array of objects containing assetId, name, symbol, and balance.
 */
export async function getAccountAssets(
  accountId: string
): Promise<MirrorNodeTokenInfo[]> {
  try {
    const assets: MirrorNodeTokenInfo[] = [];

    // Retrieve HBAR balance
    const hbarBalance = await getTokenBalance("hedera-hashgraph", accountId);
    if (hbarBalance !== null) {
      assets.push({
        token_id: "",
        name: "HBAR",
        symbol: "HBAR",
        balance: hbarBalance,
        api_id: "hedera-hashgraph",
        type: "FUNGIBLE_COMMON",
        decimals: "8",
      });
    }

    // Retrieve positive token balances
    const positiveBalances = await getPositiveBalanceNonNftTokens(accountId);
    for (const { id, balance } of positiveBalances) {
      const tokenInfo = await getTokenInfo(id);
      if (tokenInfo) {
        assets.push({
          token_id: id,
          name: tokenInfo.name,
          symbol: tokenInfo.symbol,
          balance: balance,
          api_id: "",
          type: "FUNGIBLE_COMMON",
          decimals: tokenInfo.decimals,
        });
      }
    }

    return assets;
  } catch (error) {
    console.error("Error retrieving account assets:", error);
    return [];
  }
}

/**
 * Retrieves the photo of a token from the specified network and address.
 * @param {string} network The network of the token.
 * @param {string} address The address of the token.
 * @returns {Promise<string>} The URL of the token's photo.
 */
export async function getTokenLogo( // TODO: Refactor so that logos are saved in localstorage and retrieved before making any necessary api calls
  network: string,
  address: string
): Promise<string> {
  // Construct the URL with the given network and address using the proxy
  const url = `/api/tokens/${network}/${address}`;

  try {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    // Parse the JSON response
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const data = await response.json();

    return data.pic as string;
  } catch (error) {
    // Handle and log any errors
    console.error(`Fetch error: `, error);
    throw error;
  }
}
