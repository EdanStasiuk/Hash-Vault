import React, { createContext, useContext, useState, ReactNode } from "react";

interface NewWalletFromSoftwareFormContextType {
  walletPassword: string | null;
  setWalletPassword: (walletPassword: string) => void;
  seedPhrase: string[] | null;
  setSeedPhrase: (seedPhrase: string[]) => void;
  isSeedPhraseConfirmed: boolean;
  setSeedPhraseConfirmed: (status: boolean) => void;
  walletName?: string;
  setWalletName: (walletName: string) => void;
}

const NewWalletFromSoftwareFormContext = createContext<NewWalletFromSoftwareFormContextType | undefined>(
  undefined
);

export const NewWalletFromSoftwareFormProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [walletPassword, setWalletPassword] = useState<string | null>(null)
  const [seedPhrase, setSeedPhrase] = useState<string[] | null>(null);
  const [isSeedPhraseConfirmed, setSeedPhraseConfirmed] =
    useState<boolean>(false);
  const [walletName, setWalletName] = useState<string | undefined>(undefined)

  return (
    <NewWalletFromSoftwareFormContext.Provider
      value={{
        walletPassword,
        setWalletPassword,
        seedPhrase,
        setSeedPhrase,
        isSeedPhraseConfirmed,
        setSeedPhraseConfirmed,
        walletName,
        setWalletName,
      }}
    >
      {children}
    </NewWalletFromSoftwareFormContext.Provider>
  );
};

export const useNewWalletFromSoftwareFormContext = (): NewWalletFromSoftwareFormContextType => {
  const context = useContext(NewWalletFromSoftwareFormContext);
  if (!context) {
    throw new Error("useSeedPhrase must be used within a SeedPhraseProvider");
  }
  return context;
};
