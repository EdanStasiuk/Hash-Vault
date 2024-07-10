import { Account, Wallet, Settings } from "./interfaces";

export const accounts: Account[] = [
  {
    accountNumber: 0,
    accountName: "Chequing",
    accountId: "0.0.000000-aaaaaa",
    selected: true,
  },
];

export const wallets: Wallet[] = [
  {
    walletId: 1,
    balance: "101,000",
  },
];

export const settings: Settings = {
  customDecorations: true,
  checkUpdates: false,
  displayWalletNameInTitlebar: false,
  hideBalance: false,
  lightTheme: false,
  autosavePeriod: true,
  lockOnInactivityPeriod: true,
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
