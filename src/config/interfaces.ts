export interface Account {
  account_id: number; // Primary key
  accountNumber: string;
  accountName: string;
  accountAddress: string;
  integerDigits: string; // TODO: Convert to balance
  fractionalDigits: string; // TODO: Convert to decimals
  selected?: boolean;
  wallet_id: number; // Foreign key
  tokens: MirrorNodeTokenInfo[];
}

export interface Wallet {
  walletId: number; // Add unique identifier for wallet
  balance: string;
}

/* Forms */
export interface SendFormData {
  address: string;
  amount: number;
  asset: string;
  memo?: string;
}

/* storageFunctions.ts */
export interface EncryptedPrivateKey {
  iv: string;
  salt: string;
  authTag: string;
  data: string;
}

export interface keystoreFileInfo {
  encryptedPrivateKey: EncryptedPrivateKey,
  mnemonic: string,
}

export interface Settings {
  customDecorations: boolean;
  checkUpdates: boolean;
  displayWalletName: boolean;
  hideBalance: boolean;
  lightTheme: boolean;
  autosavePeriod: boolean;
  lockOnInactivityPeriod: boolean;
  askForPasswordBeforeSend: boolean;
  conversionCurrency: string;
  displayWalletNameInTitlebar: boolean;
}

/* API interfaces */
interface MirrorNodeAccountTokenBalance {
  token_id: string,
  balance: number,
}
export interface MirrorNodeAccountInfo {
  account: string,
  balance: {
    balance: number,
    tokens: MirrorNodeAccountTokenBalance[];
  };
}

export interface MirrorNodeTokenInfo {
  token_id: string,
  name: string,
  symbol: string,
  balance: number,
  api_id: string,
  type: 'FUNGIBLE_COMMON' | 'NON_FUNGIBLE_UNIQUE',
  decimals: string,
}

interface nftsObject {
  account_id: string,
  token_id: string,
}
export interface MirrorNodeNftsInfo {
  nfts: nftsObject[],
}

export interface DavinicigraphPicsAPIv2 {
  pic: string;
}

interface Image {
  small: string;
  medium: string;
  large: string;
}

type CurrentPrice = Record<string, number>;

interface MarketData {
  current_price: CurrentPrice;
}
export interface CoinGeckoAPI {
  id: string;
  symbol: string;
  name: string;
  image: Image;
  market_data: MarketData;
}
export interface SaucerSwapAPICoinContent {
  id: string;
  name: string;
  decimals: number;
  priceUsd: number;
  symbol: string;
}
export interface ExchangeRateAPI {
  conversion_rates: Record<string, number>;
}
