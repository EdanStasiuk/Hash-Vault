import { useEffect, useState } from "react";
import TalkBox from "./TalkBox";
import { MdContentCopy } from "react-icons/md";
import { copyToClipboard } from "../../../../functions/functions";
import { getSettingsFromLocalStorage } from "../../../../functions/storageFunctions";

interface Props {
  accountNumber?: number;
  accountName?: string;
  accountId: string | undefined;
  balance: number | null | undefined;
  selected?: boolean;
}

/**
 * Renders the summary of a wallet's information as a bar component.
 * For use under the "Your Accounts" subheader on the Accounts page.
 *
 * @prop {number} accountNumber - Account number; defaults to -1.
 * @prop {string} accountName - Account name; defaults to "Account name not found".
 * @prop {string | undefined} accountId - Account ID; defaults to undefined.
 * @prop {number | null | undefined} balance - Balance of the account; defaults to undefined.
 * @prop {boolean} selected - Optional boolean that determines whether the account represented on the bar is selected. Only one
 *                           account can be selected at a time; defaults to false.
 * @returns {JSX.Element} An account information bar component.
 */
export default function AccountBar({
  accountNumber = -1,
  accountName = "Account name not found",
  accountId = undefined,
  balance = undefined,
  selected = false,
}: React.PropsWithChildren<Props>): JSX.Element {
  const [copySuccessAddress, setCopySuccessAddress] = useState(false);
  const [copySuccessBalance, setCopySuccessBalance] = useState(false);
  const [balanceForDisplay, setBalanceForDisplay] = useState<string | number>("?.??");
  const [accountIdForDisplay, setAccountIdForDisplay] = useState<string | number>("N/A");

  // Update account ID for display
  useEffect(() => {
    if (accountId === undefined || accountId === "") {
      setAccountIdForDisplay("N/A");
    } else {
      setAccountIdForDisplay(accountId);
    }
  }, [accountId]);

  // Update balance for display when balance changes
  useEffect(() => {
    if (balance === null || balance === undefined) {
      setBalanceForDisplay("?.??");
    } else {
      const hideBalance = getSettingsFromLocalStorage()?.hideBalance;
      if (hideBalance) {
        setBalanceForDisplay("*.**");
      } else {
        setBalanceForDisplay(balance);
      }
    }
  }, [balance]);

  // Handle click event to copy balance to clipboard
  const handleCopyBalance = () => {
    if (balanceForDisplay !== "*.**") {
      copyToClipboard(balanceForDisplay.toString(), setCopySuccessBalance);
    }
  };

  return (
    <div className={`flex justify-between border-l-4 border-b ${
        selected ? "border-ghost-900 dark:border-primaryAlt-500" : "border-backgroundLight-400 dark:border-ghost-900"
      } py-3 px-2 my-4 text-black dark:text-white text-lg font-roboto font-light`}>
      <div className="flex justify-between w-6/12">
        <div className="flex">
          <div className="text-xl mr-2">#{accountNumber}</div>
          {accountName}
        </div>
        <button
          className="relative flex items-center dark:hover:text-primary-500"
          onClick={() => {
            copyToClipboard(accountIdForDisplay.toString(), setCopySuccessAddress);
          }}
        >
          <div className="scale-125 text-black dark:text-primary-500 mr-2 ml-4">
            <MdContentCopy />
          </div>
          {accountIdForDisplay}
          {copySuccessAddress && (
            <TalkBox
              copySuccess={copySuccessAddress}
              setCopySuccess={setCopySuccessAddress}
            />
          )}
        </button>
      </div>
      <button
        className="relative font-robotoFlex font-light tracking-widest dark:hover:text-primary-500"
        onClick={handleCopyBalance}
      >
        {copySuccessBalance && (
          <TalkBox
            copySuccess={copySuccessBalance}
            setCopySuccess={setCopySuccessBalance}
          />
        )}
        ħ{balanceForDisplay}
      </button>
    </div>
  );
}
