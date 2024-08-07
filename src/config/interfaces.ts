export interface Account {
  accountId: string;
  accountNumber: number;
  accountName: string;
  selected?: boolean;
  encryptedMnemonic: EncryptedMnemonicSerialized;
}

/* GUI */
export interface BadgeValues {
  leftOfDecimal: number | string;
  rightOfDecimal: number | string;
  accountNumberForDisplay: number | string;
  accountNameForDisplay: string;
}

/* Forms */
export interface SendFormData {
  address: string;
  amount: number;
  asset: string;
  memo?: string;
}

/* functions.ts (non-API) */
export interface splitNumberObject {
  leftOfDecimal: number;
  rightOfDecimal: number;
}

/* storageFunctions.ts */
// EncryptedPrivateKey isnt used, just here for reference
export interface EncryptedPrivateKey {
  iv: Uint8Array;
  salt: Uint8Array;
  authTag: Uint8Array;
  ciphertext: ArrayBuffer;
}

export interface EncryptedMnemonicSerialized {
  ivBase64: string;
  saltBase64: string;
  authTagBase64: string;
  ciphertextBase64: string;
}

export interface keystoreFileInfo {
  encryptedMnemonic: EncryptedMnemonicSerialized;
  mnemonic: string;
}

export interface Settings {
  customDecorations: boolean;
  checkUpdates: boolean;
  hideBalance: boolean;
  lightTheme: boolean;
  autosavePeriod: {
    activated: boolean;
    period: number;
  };
  lockOnInactivityPeriod: {
    activated: boolean;
    period: number;
  };
  askForPasswordBeforeSend: boolean;
  conversionCurrency: string;
  displayWalletNameInTitleBar: boolean;
}

/* API interfaces */
interface MirrorNodeAccountTokenBalance {
  token_id: string;
  balance: number;
}

export interface MirrorNodeAccountInfo {
  account: string;
  balance: {
    balance: number;
    tokens: MirrorNodeAccountTokenBalance[];
  };
}

export interface MirrorNodeTokenInfo {
  token_id: string;
  name: string;
  symbol: string;
  balance: number;
  api_id: string;
  type: "FUNGIBLE_COMMON" | "NON_FUNGIBLE_UNIQUE";
  decimals: string;
}

interface nftsObject {
  account_id: string;
  token_id: string;
}
export interface MirrorNodeNftsInfo {
  nfts: nftsObject[];
}

interface TransfersInformation {
  account: string;
  amount: number;
  is_approval: boolean;
}

interface TokenTransfersInformation {
  account: string;
  amount: number;
  token_id: string;
  is_approval: boolean;
}

interface StakingRewardTransfersInformation {
  account: string;
  amount: number;
}

interface NftTransfersInformation {
  is_approval: true;
  receiver_account_id: string;
  sender_account_id: string;
  serial_number: number;
  token_id: string;
}

export interface TransactionInformation {
  name: string,
  memo_base64: string;
  consensus_timestamp: string;
  transfers: TransfersInformation[];
  staking_reward_transfers: StakingRewardTransfersInformation[];
  token_transfers: TokenTransfersInformation[];
  nft_transfers: NftTransfersInformation[];
}

export interface MirrorNodeTransactionData {
  transactions: TransactionInformation[];
  links: {
    next: string;
  };
}

export interface DavinicigraphPicsAPIv2 {
  pic: string;
}

interface Image {
  small: string;
  medium: string;
  large: string;
}

interface MarketData {
  current_price: Record<string, number>;
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
