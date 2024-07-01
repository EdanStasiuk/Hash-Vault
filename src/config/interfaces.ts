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

export interface MirrorNodeTokenInfo {
  token_id: string,
  name: string,
  symbol: string,
  balance: number,
  api_id: string,
  type: 'FUNGIBLE_COMMON' | 'NON_FUNGIBLE_UNIQUE',
  decimals: string,
}

export interface Wallet {
  walletId: number; // Add unique identifier for wallet
  balance: string;
}

interface MirrorNodeAccountTokenBalance {
  balance: number,
  token_id: string,
}

// As present in the hedera mirrornode api response
export interface AccountResponse {
  balance: {
    tokens: MirrorNodeAccountTokenBalance[];
  };
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