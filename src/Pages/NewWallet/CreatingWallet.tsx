import { useEffect } from "react";
import CircularIndeterminate from "../../components/Miscelaneous/CircularIndeterminate";
import { useNewWalletFromSoftwareFormContext } from "../../config/contexts/NewWalletFromSoftwareFormContext";
import {
  initAccountInfoInLocalStorage,
} from "../../functions/storageFunctions";
import { Mnemonic } from "@hashgraph/sdk";

export const CreatingWallet: React.FC = () => {
  const { walletPassword, seedPhrase, isSeedPhraseConfirmed, walletName } =
    useNewWalletFromSoftwareFormContext();

  useEffect(() => {
    console.log(`${walletPassword}, ${seedPhrase?.join(' ')}, ${isSeedPhraseConfirmed}, ${walletName}`);
    const createWallet = async () => {
      if (walletPassword && walletName && isSeedPhraseConfirmed && seedPhrase) {
        try {
          // Recover the mnemonic and generate the private key
          const recoveredMnemonic = await Mnemonic.fromString(
            seedPhrase.join(" ")
          );
        
          const privateKey = await recoveredMnemonic.toStandardEd25519PrivateKey();
          const publicKey = privateKey.publicKey;
          const walletAddress = publicKey.toString(); // TODO: This is wrong, doesn't give addresss in 0.0.xxxxxx form

        //   await initAccountInfoInLocalStorage(walletAddress.toString(), walletName, seedPhrase.join(' '), walletPassword);

          console.log("Wallet created and stored successfully.");
        } catch (error) {
          console.error("Error creating wallet:", error);
        }
      }
    };

    createWallet();
  }, [walletPassword, seedPhrase, isSeedPhraseConfirmed, walletName]);

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="flex flex-col items-center pb-20">
        <div className="flex justify-center items-center">
          <CircularIndeterminate />
        </div>
        <p className="text-xl text-white mt-4">
          Creating your wallet... this may take a moment
        </p>
      </div>
    </div>
  );
};
