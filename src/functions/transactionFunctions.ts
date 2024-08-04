import axios from "axios";
import { MirrorNodeTransactionData } from "../config/interfaces";

/**
 * Formats a consensus timestamp from the Hedera Mirror Node API to a readable date string.
 *
 * @param consensusTimestamp The consensus timestamp in the format "seconds.nanoseconds".
 * @returns A formatted date string in the format "Month Day, Year, Hour:Minute:Second AM/PM".
 */
export function formatTimestamp(consensusTimestamp: string) {
  // Split the timestamp into seconds and nanoseconds, and just take seconds
  const [seconds] = consensusTimestamp.split(".");

  // Convert the seconds to milliseconds to create a Date object
  const date = new Date(Number(seconds) * 1000);

  // Format the date
  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
    hour12: true,
  };
  const formattedDate = date.toLocaleString("en-US", options); //TODO: Should change locale depending on user's choice

  return formattedDate;
}

/**
 * Fetches the transaction history for a specific account from the Hedera Mirror Node API.
 *
 * @param accountId The ID of the account to fetch the transaction history for.
 * @param limit The number of transactions to fetch.
 * @returns The transaction history data or null if the request fails.
 */
export async function getTransactionHistory(
  accountId: string,
  limit: number
): Promise<MirrorNodeTransactionData | null> {
  const url = `https://mainnet-public.mirrornode.hedera.com/api/v1/transactions?account.id=${accountId}&limit=${limit}`;
  const response = await axios.get<MirrorNodeTransactionData>(url);

  if (response.status !== 200) {
    console.error(`Failed to fetch account balance: ${response.status}`);
    return null;
  }

  const data = response.data;
  // console.log(data);
  return data;
}

/**
 * Fetches the next page of transaction history from the Hedera Mirror Node API.
 *
 * @param nextPageLink The link to the next page of transactions.
 * @returns The transaction history data for the next page or null if the request fails.
 */
export async function getNextTransactionHistoryPage(
  nextPageLink: string
): Promise<MirrorNodeTransactionData | null> {
  const url = `https://mainnet-public.mirrornode.hedera.com${nextPageLink}`;
  const response = await axios.get<MirrorNodeTransactionData>(url);

  if (response.status !== 200) {
    console.error(`Failed to fetch account balance: ${response.status}`);
    return null;
  }

  const data = response.data;
  return data;
}

/**
 * Fetches the transaction history for a specific account and a specific page number.
 *
 * @param accountId The ID of the account to fetch the transaction history for.
 * @param limit The number of transactions to fetch per page.
 * @param page The page number to fetch.
 * @returns The transaction history for the specified page or null if the page does not exist.
 */
export async function getTransactionHistoryPage(
  accountId: string,
  limit: number,
  page: number
): Promise<MirrorNodeTransactionData | null> {
  let currentPage = 1;
  let data = await getTransactionHistory(accountId, limit);

  if (!data) {
    return null;
  }

  while (currentPage < page && data.links.next) {
    data = await getNextTransactionHistoryPage(data.links.next);
    if (!data) {
      return null;
    }
    currentPage++;
  }

  return currentPage === page ? data : null;
}

/**
 * Fetches the last set number of transaction history from the first page for a specific account.
 *
 * @param accountId The ID of the account to fetch the transaction history for.
 * @param limit The number of transactions per page.
 * @returns The last set number or -1 if no data is available.
 */
export async function getLastSetNumberFromFirstApiPage(
  accountId: string,
  limit: number
): Promise<number> {
  const data: MirrorNodeTransactionData | null =
    await getTransactionHistoryPage(
      accountId,
      limit,
      1 // Only fetch the first page
    );

  if (!data) {
    return -1;
  }

  const totalTransactions = data.transactions.length;

  // Calculate the number of sets needed for the total number of transactions
  const totalSets = Math.ceil(totalTransactions / 10);

  return totalSets; // Return the last set number
}

/**
 * Fetches the last page set number of transaction history for a specific account.
 *
 * @param accountId The ID of the account to fetch the transaction history for.
 * @param limit The number of transactions per page.
 * @returns The last page set number or -1 if no data is available.
 */
export async function getLastPageSetNumber(
  accountId: string,
  limit: number
): Promise<number> {
  let currentPage = 1;
  let data: MirrorNodeTransactionData | null = await getTransactionHistoryPage(
    accountId,
    limit,
    currentPage
  );

  if (!data) {
    return -1;
  }

  let totalTransactions = 0;

  // Iterate through pages to accumulate the total number of transactions
  while (data) {
    totalTransactions += data.transactions.length;

    if (data.links.next) {
      data = await getNextTransactionHistoryPage(data.links.next);
      currentPage++;
    } else {
      break;
    }
  }

  // Calculate the number of sets needed for the total number of transactions
  const totalSets = Math.ceil(totalTransactions / 10);

  return totalSets; // Return the last set number
}

/**
 * Splits transaction data into sets of a specified size.
 *
 * @param transactions The array of transactions to be split.
 * @param size The size of each set.
 * @returns An array of arrays, where each inner array contains a set of transactions.
 */
export function splitTransactionsIntoSets(
  transactions: MirrorNodeTransactionData["transactions"],
  size: number
): MirrorNodeTransactionData["transactions"][] {
  const result: MirrorNodeTransactionData["transactions"][] = [];

  for (let i = 0; i < transactions.length; i += size) {
    result.push(transactions.slice(i, i + size));
  }

  // console.log(result);
  return result;
}
