import * as fs from "fs";
import { Mnemonic } from "@hashgraph/sdk";
import {
  Account,
  EncryptedPrivateKeySerialized,
  keystoreFileInfo,
  Settings,
} from "../config/interfaces";
import { AESGCM } from "../classes/AESGCM";

//TODO: Add tests for these functions

/* Cryptography related */
/**
 * Encrypts a private key using the provided password.
 *
 * @async
 * @function encryptedPrivateKey
 * @param {string} privateKey - The private key to be encrypted.
 * @param {string} password - The password to encrypt the private key.
 * @returns {Promise<EncryptedPrivateKeySerialized>} The encrypted private key.
 */
export async function encryptPrivateKey(
  privateKey: string,
  password: string
): Promise<EncryptedPrivateKeySerialized> {
  const aesGcm: AESGCM = new AESGCM();
  const encryptedPrivateKey = await aesGcm.encrypt(privateKey, password);

  return encryptedPrivateKey;
}

/**
 * Decrypts an encrypted private key using a password.
 *
 * @async
 * @function decryptPrivateKey
 * @param {EncryptedPrivateKeySerialized} encryptedPrivateKey - The encrypted private key object.
 * @param {string} password - The password used to decrypt the private key.
 * @returns {Promise<string>} The decrypted private key as a string.
 */
export async function decryptPrivateKey(
  encryptedPrivateKey: EncryptedPrivateKeySerialized,
  password: string
): Promise<string> {
  const aesGcm: AESGCM = new AESGCM();
  const decryptedPrivateKey = await aesGcm.decrypt(
    encryptedPrivateKey,
    password
  );
  return decryptedPrivateKey;
}

/**
 * Decrypts the private key of the selected account from local storage using a password.
 *
 * @async
 * @function decryptSelectedAccountPrivateKey
 * @param {string} password - The password used to decrypt the selected account's private key.
 * @returns {Promise<string>} The decrypted private key as a string.
 * @throws Will throw an error if no selected account or encrypted private key is found in local storage.
 * @throws Will throw an error if the private key decryption fails.
 */
export async function decryptSelectedAccountPrivateKey(
  password: string
): Promise<string> {
  const selectedAccount = getSelectedAccountFromLocalStorage();
  if (!selectedAccount?.encryptedPrivateKey) {
    throw new Error(
      "No selected account or encrypted private key found in local storage"
    );
  }

  try {
    const encryptedPrivateKey = selectedAccount.encryptedPrivateKey;
    const decryptedPrivateKey = await decryptPrivateKey(
      encryptedPrivateKey,
      password
    );
    return decryptedPrivateKey;
  } catch (error) {
    console.error("Error decrypting private key:", error);
    throw new Error("Failed to recover the private key");
  }
}

/**
 * Generates a new private key and encrypts it using the provided password.
 *
 * @async
 * @function generateAndEncryptPrivateKey
 * @param {string} password - The password to encrypt the private key.
 * @returns {Promise<{encryptedPrivateKey: EncryptedPrivateKeySerialized, mnemonic: Mnemonic}>} An object containing the encrypted private key and the mnemonic.
 */
export async function generateAndEncryptPrivateKey(password: string): Promise<{
  encryptedPrivateKey: EncryptedPrivateKeySerialized;
  mnemonic: Mnemonic;
}> {
  const mnemonic = await Mnemonic.generate();
  const privateKey = await mnemonic.toLegacyPrivateKey();
  // eslint-disable-next-line @typescript-eslint/no-base-to-string
  const privateKeyHex = privateKey.toString();

  const encryptedPrivateKey = await encryptPrivateKey(privateKeyHex, password);

  return { encryptedPrivateKey, mnemonic };
}

/**
 * Stores an encrypted private key and mnemonic in a keystore file.
 *
 * @function storePrivateKeyInKeystoreFile
 * @param {EncryptedPrivateKeySerialized} encryptedPrivateKey - The encrypted private key to be stored.
 * @param {Mnemonic} mnemonic - The mnemonic associated with the private key.
 * @param {string} filePath - The file path where the keystore file will be saved.
 */
export function storePrivateKeyInKeystoreFile( //TODO: Not used currently, revise when developing the feature
  encryptedPrivateKey: EncryptedPrivateKeySerialized,
  mnemonic: Mnemonic,
  filePath: string
) {
  const dataToStore: keystoreFileInfo = {
    encryptedPrivateKey,
    mnemonic: mnemonic.toString(),
  };
  fs.writeFileSync(filePath, JSON.stringify(dataToStore));
  console.log("Private key encrypted and stored in keystore file.");
}

/**
 * Recovers the private key from a keystore file by decrypting it with the provided password.
 *
 * @async
 * @function recoverPrivateKeyFromKeystoreFile
 * @param {string} password - The password to decrypt the private key.
 * @param {string} filePath - The file path to the keystore file.
 * @returns {Promise<string>} The decrypted private key.
 * @throws Will throw an error if the keystore file is not found or if decryption fails.
 */
export async function recoverPrivateKeyFromKeystoreFile( //TODO: Not used currently, revise when developing the feature
  password: string,
  filePath: string
): Promise<string> {
  if (!fs.existsSync(filePath)) {
    console.error("Keystore file not found");
  }

  const { encryptedPrivateKey } = JSON.parse(
    fs.readFileSync(filePath, "utf8")
  ) as keystoreFileInfo;

  return await decryptPrivateKey(encryptedPrivateKey, password);
}

/* Settings related */
/**
 * Retrieves the settings from local storage.
 *
 * @function getSettingsFromLocalStorage
 * @returns {Settings | undefined} The settings object if found, otherwise undefined.
 */
export function getSettingsFromLocalStorage(): Settings | undefined {
  const settings = localStorage.getItem("settings");
  return settings ? (JSON.parse(settings) as Settings) : undefined;
}

/**
 * Saves the provided settings object to local storage.
 *
 * @function saveSettingsToLocalStorage
 * @param {Settings} settings - The settings object to be saved.
 */
export function saveSettingsToLocalStorage(settings: Settings) {
  localStorage.setItem("settings", JSON.stringify(settings));
  window.dispatchEvent(new Event("storage")); // Need this so the svg cropped hbar logo in the sidebar badge switches with the selected theme
}

/**
 * Updates the settings configuration within local storage.
 *
 * @function updateSettingsInLocalStorage
 * @param {keyof Settings} key - The key of the setting to update.
 * @param {string | boolean} value - The new value for the specified setting.
 */
export function updateSettingsInLocalStorage(
  key: keyof Settings,
  value: string | boolean
) {
  const settings = getSettingsFromLocalStorage();

  if (settings) {
    if (typeof settings[key] == typeof value) {
      settings[key] = value as never;
      saveSettingsToLocalStorage(settings);
    } else {
      console.log(
        `Type of value does not match the type of settings key "${key}`
      );
    }
  } else {
    console.log("Settings not found in local storage.");
  }
}

/* Accounts related */
/**
 * Returns a list of the Account objects saved in local storage.
 *
 * @function getAccountsFromLocalStorage
 * @returns {Account[]} A list of Account objects.
 */
export function getAccountsFromLocalStorage(): Account[] {
  const localStorageKey = "accounts";

  const accountsData = localStorage.getItem(localStorageKey);

  return accountsData ? (JSON.parse(accountsData) as Account[]) : [];
}

/**
 * Returns the Account object saved in local storage, given its accountId/address.
 *
 * @function getAccountFromLocalStorage
 * @param {string} accountId - The accountId/address of the account object to be returned from local storage.
 * @returns {Account | undefined} An Account object with the given accountId, undefined otherwise.
 */
export function getAccountFromLocalStorage(
  accountId: string
): Account | undefined {
  const localStorageKey = "accounts";

  const accountsData = localStorage.getItem(localStorageKey);

  if (accountsData) {
    const accounts = JSON.parse(accountsData) as Account[];
    const account = accounts.find((account) => account.accountId === accountId); //TODO: Make sure there it handles when there is more than 1 account with the same address
    return account || undefined;
  }

  return undefined;
}

/**
 * Returns the Account object that is currently selected by the user.
 *
 * @function getSelectedAccountFromLocalStorage
 * @returns {Account | undefined} The Account object with the True selected value, undefined otherwise.
 */
export function getSelectedAccountFromLocalStorage(): Account | undefined {
  const localStorageKey = "accounts";

  const accountsData = localStorage.getItem(localStorageKey);

  if (accountsData) {
    const accounts = JSON.parse(accountsData) as Account[];

    return accounts.find((account) => account.selected);
  }

  return undefined;
}

/**
 * Initializes a new wallet's information as an Account object in local storage.
 *
 * @async
 * @function initAccountInfoInLocalStorage
 * @param {string} password - The password to encrypt the private key.
 * @param {string} accountId - The account ID/address of the new account.
 * @param {string} accountName - The name of the new account.
 * @returns {Promise<Account>} The newly initialized Account object.
 */
export async function initAccountInfoInLocalStorage(
  password: string,
  accountId: string,
  accountName: string
): Promise<Account> {
  const localStorageKey = "accounts";

  // Get the current accounts from local storage
  const accounts = getAccountsFromLocalStorage() || [];

  const accountNumber = accounts.length + 1;

  const { encryptedPrivateKey } = await generateAndEncryptPrivateKey(password);

  const newAccount: Account = {
    accountId: accountId,
    accountNumber: accountNumber,
    accountName: accountName,
    selected: accounts.length === 0,
    encryptedPrivateKey: encryptedPrivateKey,
  };

  // Add new account to accounts array
  accounts.push(newAccount);

  // Save updated accounts array back to local storage
  localStorage.setItem(localStorageKey, JSON.stringify(accounts));

  return newAccount;
}
