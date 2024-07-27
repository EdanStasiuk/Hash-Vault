import { Settings } from "./interfaces";

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
