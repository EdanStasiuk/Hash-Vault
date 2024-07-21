import { Account, Wallet, Settings } from "./interfaces";

export const accounts: Account[] = [ // TODO: Not needed, make sure they're not used anywhere in the app before deleting though
  {
    accountNumber: 0,
    accountName: "Chequing",
    accountId: "0.0.000000-aaaaaa",
    selected: true,
    encryptedPrivateKey: {
      ivBase64: "",
      saltBase64: "",
      authTagBase64: "",
      ciphertextBase64: "",
    }
  },
];

export const wallets: Wallet[] = [ // TODO: Not needed, make sure they're not used anywhere in the app before deleting though
  {
    walletId: 1,
    balance: "101,000",
  },
];

export const settings: Settings = {
  customDecorations: true,
  checkUpdates: false,
  displayWalletNameInTitleBar: false,
  hideBalance: false,
  lightTheme: false,
  autosavePeriod: {
    activated: true,
    period: 10,
  },
  lockOnInactivityPeriod: {
    activated: true,
    period: 10,
  },
  askForPasswordBeforeSend: true,
  conversionCurrency: "USD",
};

export const fiatCurrencyOptions: string[] = [
  "USD", 
  "CAD", 
  "EUR", 
  "GBP", 
  "JPY",
];
