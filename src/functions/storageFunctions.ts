import * as fs from "fs";
import { Mnemonic } from "@hashgraph/sdk";
import {
  Account,
  EncryptedMnemonicSerialized,
  keystoreFileInfo,
  Settings,
} from "../config/interfaces";
import { AESGCM } from "../classes/AESGCM";

//TODO: Add tests for these functions

/* Cryptography related */
/**
 * Encrypts a mnemonic seed phrase using the provided password.
 *
 * @async
 * @function encryptMnemonic
 * @param {string} mnemonic - The mnemonic seed phrase to be encrypted.
 * @param {string} password - The password to encrypt the mnemonic.
 * @returns {Promise<EncryptedMnemonicSerialized>} The encrypted mnemonic.
 */
export async function encryptMnemonic(
  mnemonic: string,
  password: string
): Promise<EncryptedMnemonicSerialized> {
  const aesGcm: AESGCM = new AESGCM();
  const encryptedMnemonic = await aesGcm.encrypt(mnemonic, password);

  return encryptedMnemonic;
}

/**
 * Decrypts an encrypted mnemonic seed phrase using a password.
 *
 * @async
 * @function decryptMnemonic
 * @param {EncryptedMnemonicSerialized} encryptedMnemonic - The encrypted mnemonic object.
 * @param {string} password - The password used to decrypt the mnemonic.
 * @returns {Promise<string>} The decrypted mnemonic as a string.
 */
export async function decryptMnemonic(
  encryptedMnemonic: EncryptedMnemonicSerialized,
  password: string
): Promise<string> {
  const aesGcm: AESGCM = new AESGCM();
  const decryptedMnemonic = await aesGcm.decrypt(encryptedMnemonic, password);
  return decryptedMnemonic;
}

/**
 * Decrypts the mnemonic seed phrase of the selected account from local storage using a password.
 *
 * @async
 * @function decryptSelectedAccountMnemonic
 * @param {string} password - The password used to decrypt the selected account's mnemonic.
 * @returns {Promise<Mnemonic>} The decrypted private key as a string.
 * @throws Will throw an error if no selected account or encrypted mnemonic is found in local storage.
 * @throws Will throw an error if the mnemonic decryption or private key derivation fails.
 */
export async function decryptSelectedAccountMnemonic(
  password: string
): Promise<Mnemonic> {
  const selectedAccount = getSelectedAccountFromLocalStorage();
  if (!selectedAccount?.encryptedMnemonic) {
    throw new Error(
      "No selected account or encrypted mnemonic found in local storage"
    );
  }

  try {
    const encryptedMnemonic = selectedAccount.encryptedMnemonic;
    const decryptedMnemonic = await decryptMnemonic(
      encryptedMnemonic,
      password
    );
    const mnemonic = await Mnemonic.fromString(decryptedMnemonic);
    return mnemonic;
  } catch (error) {
    console.error("Error decrypting mnemonic or deriving private key:", error);
    throw new Error("Failed to recover the private key");
  }
}

/**
 * Generates a new mnemonic seed phrase and encrypts it using the provided password.
 *
 * @async
 * @function generateAndEncryptMnemonic
 * @param {string} password - The password to encrypt the mnemonic.
 * @returns {Promise<{encryptedMnemonic: EncryptedMnemonicSerialized, mnemonic: Mnemonic}>} An object containing the encrypted mnemonic and the mnemonic.
 */
export async function generateAndEncryptMnemonic(password: string): Promise<{
  encryptedMnemonic: EncryptedMnemonicSerialized;
  mnemonic: Mnemonic;
}> {
  const mnemonic = await Mnemonic.generate();
  const mnemonicString = mnemonic.toString();

  const encryptedMnemonic = await encryptMnemonic(mnemonicString, password);

  return { encryptedMnemonic, mnemonic };
}

/**
 * Stores an encrypted private key and mnemonic in a keystore file.
 *
 * @function storeMnemonicInKeystoreFile
 * @param {EncryptedMnemonicSerialized} encryptedMnemonic - The encrypted private key to be stored.
 * @param {Mnemonic} mnemonic - The mnemonic associated with the private key.
 * @param {string} filePath - The file path where the keystore file will be saved.
 */
export function storeMnemonicInKeystoreFile( //TODO: Not used currently, revise when developing the feature
  encryptedMnemonic: EncryptedMnemonicSerialized,
  mnemonic: Mnemonic,
  filePath: string
) {
  const dataToStore: keystoreFileInfo = {
    encryptedMnemonic,
    mnemonic: mnemonic.toString(),
  };
  fs.writeFileSync(filePath, JSON.stringify(dataToStore));
  console.log("Private key encrypted and stored in keystore file.");
}

/**
 * Recovers the private key from a keystore file by decrypting it with the provided password.
 *
 * @async
 * @function recoverMnemonicFromKeystoreFile
 * @param {string} password - The password to decrypt the private key.
 * @param {string} filePath - The file path to the keystore file.
 * @returns {Promise<string>} The decrypted private key.
 * @throws Will throw an error if the keystore file is not found or if decryption fails.
 */
export async function recoverMnemonicFromKeystoreFile( //TODO: Not used currently, revise when developing the feature
  password: string,
  filePath: string
): Promise<string> {
  if (!fs.existsSync(filePath)) {
    console.error("Keystore file not found");
  }

  const { encryptedMnemonic } = JSON.parse(
    fs.readFileSync(filePath, "utf8")
  ) as keystoreFileInfo;

  return await decryptMnemonic(encryptedMnemonic, password);
}

/**
 * Changes the user's password for the selected wallet.
 *
 * @async
 * @function changePasswordForSelectedWallet
 * @param {string} oldPassword - The old password for the wallet.
 * @param {string} newPassword - The new password for the wallet.
 * @returns {Promise<void>} Resolves when the password has been successfully changed.
 * @throws Will throw an error if the password change process fails.
 */
export async function changePasswordForSelectedWallet(
  oldPassword: string,
  newPassword: string
): Promise<void> {
  const selectedAccount = getSelectedAccountFromLocalStorage();
  if (!selectedAccount?.encryptedMnemonic) {
    throw new Error(
      "No selected account or encrypted mnemonic found in local storage"
    );
  }

  try {
    // Decrypt the mnemonic with the old password
    const decryptedMnemonic = await decryptMnemonic(
      selectedAccount.encryptedMnemonic,
      oldPassword
    );

    // Encrypt the mnemonic with the new password
    const newEncryptedMnemonic = await encryptMnemonic(
      decryptedMnemonic,
      newPassword
    );

    // Update the selected account's encrypted mnemonic in local storage
    const accounts = getAccountsFromLocalStorage();
    const updatedAccounts = accounts.map((account) =>
      account.accountId === selectedAccount.accountId
        ? { ...account, encryptedMnemonic: newEncryptedMnemonic }
        : account
    );
    localStorage.setItem("accounts", JSON.stringify(updatedAccounts));
  } catch (error) {
    console.error("Error changing password:", error);
    throw new Error("Failed to change the wallet password");
  }
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
    const account = accounts.find((account) => account.accountId === accountId); //TODO: Make sure it handles when there is more than 1 account with the same address
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
 * @param {string} password - The password to encrypt the mnemonic.
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

  const { encryptedMnemonic } = await generateAndEncryptMnemonic(password);

  const newAccount: Account = {
    accountId: accountId,
    accountNumber: accountNumber,
    accountName: accountName,
    selected: accounts.length === 0,
    encryptedMnemonic: encryptedMnemonic,
  };

  // Add new account to accounts array
  accounts.push(newAccount);

  // Save updated accounts array back to local storage
  localStorage.setItem(localStorageKey, JSON.stringify(accounts));

  return newAccount;
}
