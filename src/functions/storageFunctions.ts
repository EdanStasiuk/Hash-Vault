import * as crypto from 'crypto';
import * as fs from 'fs';
import * as bcrypt from 'bcryptjs';
import { Mnemonic } from '@hashgraph/sdk';
import { Account, EncryptedPrivateKey, keystoreFileInfo, Settings } from '../config/interfaces';

/* Cryptography related */
// Function to generate and encrypt a private key
export async function generateAndEncryptPrivateKey(password: string) {
  const saltRounds = 10;
  const hashedPassword = await bcrypt.hash(password, saltRounds);

  const mnemonic = await Mnemonic.generate();
  const privateKey = await mnemonic.toLegacyPrivateKey();
  // eslint-disable-next-line @typescript-eslint/no-base-to-string
  const privateKeyHex = privateKey.toString();

  const aesSalt = crypto.randomBytes(16);

  const key = crypto.scryptSync(hashedPassword, aesSalt, 32);

  const iv = crypto.randomBytes(12);
  const cipher = crypto.createCipheriv('aes-256-gcm', key, iv);
  let encrypted = cipher.update(privateKeyHex, 'utf8', 'hex');
  encrypted += cipher.final('hex');

  const authTag = cipher.getAuthTag().toString('hex');

  const encryptedPrivateKey = {
    iv: iv.toString('hex'),
    salt: aesSalt.toString('hex'),
    authTag: authTag,
    data: encrypted,
  };

  return { encryptedPrivateKey, mnemonic };
}

// Function to store encrypted private key in local storage
export function storePrivateKeyLocally(encryptedPrivateKey: object, mnemonic: Mnemonic) {
  localStorage.setItem('encryptedPrivateKey', JSON.stringify(encryptedPrivateKey));
  localStorage.setItem('mnemonic', mnemonic.toString());
  console.log('Private key encrypted and stored locally.');
}

// Function to store encrypted private key in a keystore file
export function storePrivateKeyInKeystoreFile(encryptedPrivateKey: object, mnemonic: Mnemonic, filePath: string) {
  const dataToStore = {
    encryptedPrivateKey,
    mnemonic: mnemonic.toString(),
  };
  fs.writeFileSync(filePath, JSON.stringify(dataToStore));
  console.log('Private key encrypted and stored in keystore file.');
}

// Function to recover the private key from local storage
export async function recoverPrivateKeyFromLocalStorage(password: string) {
  const encryptedPrivateKey = JSON.parse(localStorage.getItem('encryptedPrivateKey') || '{}') as EncryptedPrivateKey;
  const mnemonicString = localStorage.getItem('mnemonic');

  if (!encryptedPrivateKey || !mnemonicString) {
    throw new Error('No encrypted private key found in local storage');
  }

  return await decryptPrivateKey(password, encryptedPrivateKey, mnemonicString);
}

// Function to recover the private key from a keystore file
export async function recoverPrivateKeyFromKeystoreFile(password: string, filePath: string) {
  if (!fs.existsSync(filePath)) {
    throw new Error('Keystore file not found');
  }

  const data = JSON.parse(fs.readFileSync(filePath, 'utf8')) as keystoreFileInfo;
  const { encryptedPrivateKey, mnemonic } = data;

  return await decryptPrivateKey(password, encryptedPrivateKey, mnemonic);
}

// Function to decrypt the private key
async function decryptPrivateKey(password: string, encryptedPrivateKey: EncryptedPrivateKey, mnemonicString: string) {
  const aesSalt = Buffer.from(encryptedPrivateKey.salt, 'hex');
  const iv = Buffer.from(encryptedPrivateKey.iv, 'hex');
  const authTag = Buffer.from(encryptedPrivateKey.authTag, 'hex');
  const encryptedData = encryptedPrivateKey.data;

  const saltRounds = 10;
  const hashedPassword = await bcrypt.hash(password, saltRounds);

  const key = crypto.scryptSync(hashedPassword, aesSalt, 32);

  const decipher = crypto.createDecipheriv('aes-256-gcm', key, iv);
  decipher.setAuthTag(authTag);
  let decrypted = decipher.update(encryptedData, 'hex', 'utf8');
  decrypted += decipher.final('utf8');

  console.log('Successfully recovered private key:', decrypted);

  return { privateKey: decrypted, mnemonicString };
}

/* Settings related */
/**
 * Retrieves the settings from local storage.
 * 
 * @returns {Settings | undefined} The settings object if found, otherwise undefined.
 */
export const getSettingsFromLocalStorage = (): Settings | undefined => {
  const settings = localStorage.getItem('settings');
  return settings ? JSON.parse(settings) as Settings : undefined;
};

/**
 * Saves the provided settings object to local storage.
 * 
 * @param {Settings} settings - The settings object to be saved.
 */
export const saveSettingsToLocalStorage = (settings: Settings) => {
  localStorage.setItem('settings', JSON.stringify(settings));
  window.dispatchEvent(new Event('storage')) // Need this so the svg cropped hbar logo in the sidebar badge switches with the selected theme
};

/**
 * Updates the settings configuration within local storage.
 * 
 * @param {keyof Settings} key - The key of the setting to update.
 * @param {string | boolean} value - The new value for the specified setting.
 */
export const updateSettingsInLocalStorage = (key: keyof Settings, value: string | boolean) => {
  const settings = getSettingsFromLocalStorage();

  if (settings) {
    if (typeof settings[key] == typeof value) {
      settings[key] = value as never;
      saveSettingsToLocalStorage(settings);
    } else {
      console.log(`Type of value does not match the type of settings key "${key}`);
    }
  } else {
    console.log("Settings not found in local storage.");
  }
};

/* Accounts related */
/**
 * Returns a list of the Account objects saved in local storage.
 * 
 * @returns {Account[]} A list of Account objects.
 */
export const getAccountsFromLocalStorage = (): Account[] => { //TODO: Write test cases
  const localStorageKey = 'accounts';

  const accountsData = localStorage.getItem(localStorageKey);

  return accountsData ? JSON.parse(accountsData) as Account[] : [];
};

/**
 * Returns the Account object saved in local storage, given its accountId/address.
 * 
 * @param {string} accountId - The accountId/address of the account object to be returned from local storage.
 * @returns {Account | undefined} An Account object with the given accountId, undefined otherwise.
 */
export const getAccountFromLocalStorage = (accountId: string): Account | undefined => { //TODO: Write test cases
  const localStorageKey = 'accounts';

  const accountsData = localStorage.getItem(localStorageKey);

  if (accountsData) {
    const accounts = JSON.parse(accountsData) as Account[];
    const account = accounts.find(account => account.accountId === accountId); //TODO: Make sure there it handles when there is more than 1 account with the same address
    return account || undefined;
  }

  return undefined;
};

/**
 * Returns the Account object that is currently selected by the user.
 * 
 * @returns {Account | undefined} The Account object with the True selected value, undefined otherwise.
 */
export const getSelectedAccountFromLocalStorage = (): Account | undefined => { //TODO: Write test cases
  const localStorageKey = 'accounts';

  const accountsData = localStorage.getItem(localStorageKey);

  if (accountsData) {
    const accounts = JSON.parse(accountsData) as Account[];

    return accounts.find(account => account.selected);
  }

  return undefined;
};


/**
 * Initializes a new wallet's information as an Account object in local storage.
 * 
 * @returns {Account} The newly initialize Account object.
 */
export const initAccountInfoInLocalStorage = (): Account => { //TODO: Write test cases
  const localStorageKey = 'accounts';

  // Get the current accounts from local storage
  const accountsData = localStorage.getItem(localStorageKey);
  const accounts = accountsData ? JSON.parse(accountsData) as Account[] : [];

  const accountNumber = accounts.length + 1;

  const newAccount: Account = {
    accountId: '0.0.4800372', //TODO: Get user's wallet address and place it here, this is just a random address I found for now
    accountNumber: accountNumber,
    accountName: 'chequing', //TODO: Get the name of the user's wallet
    selected: accounts.length === 0,
  };

  // Add new account to accounts array
  accounts.push(newAccount);

  // Save updated accounts array back to local storage
  localStorage.setItem(localStorageKey, JSON.stringify(accounts));

  return newAccount;
};
