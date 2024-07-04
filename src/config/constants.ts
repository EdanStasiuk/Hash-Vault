import { Account, Wallet, Settings } from "./interfaces";

export const accounts: Account[] = [
  {
    account_id: 1,
    accountNumber: "0",
    accountName: "Chequing",
    accountAddress: "0.0.000000-aaaaaa",
    integerDigits: "1,000",
    fractionalDigits: "0000000",
    selected: true,
    wallet_id: 1,
    tokens: [
      {
        token_id: "",
        name: "HBAR",
        symbol: "HBAR",
        api_id: "hedera-hashgraph",
        balance: 5000,
        type: "FUNGIBLE_COMMON",
        decimals: "8",
      },
      {
        token_id: "0.0.1079680",
        name: "HSUITE",
        symbol: "HSUITE",
        api_id: "hsuite",
        balance: 5000,
        type: "FUNGIBLE_COMMON",
        decimals: "8",
      },
      {
        token_id: "0.0.98765432",
        name: "WHBAR",
        symbol: "WHBAR",
        api_id: "wrapped-hbar",
        balance: 5000,
        type: "FUNGIBLE_COMMON",
        decimals: "8",
      },
      {
        token_id: "0.0.987654",
        name: "HERA",
        symbol: "HERA",
        api_id: "hera-finance",
        balance: 5000,
        type: "FUNGIBLE_COMMON",
        decimals: "8",
      },
    ],
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
  displayWalletName: false,
};

export const fiatCurrencyOptions: string[] = [
  "USD", 
  "CAD", 
  "EUR", 
  "GBP", 
  "JPY",
];
