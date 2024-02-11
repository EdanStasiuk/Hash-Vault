import { useState } from "react";
import TalkBox from "./TalkBox";
import { MdContentCopy } from "react-icons/md";
import { copyToClipboard } from "./functions";

interface Props {
  accountNumber?: string;
  accountName?: string;
  accountAddress?: string;
  integerDigits?: string;
  fractionalDigits?: string;
  selected?: boolean;
}

/**
 * Renders the summary of a wallet's information as a bar component.
 * For use under the "Your Accounts" subheader on the Accounts page.
 *
 * @prop {string} accountNumber - Optional account number; defaults to "Account #-1".
 * @prop {string} accountName - Optional account name; defaults to "Account not found".
 * @prop {string} accountAddress - Optional address of wallet/account; defaults to "?".
 * @prop {string} integerDigits - Optional digits in the wallet's balance left of the decimal place; defaults to "?".
 * @prop {string} fractionalDigits - Optional digits in the wallet's balance right of the decimal place; defaults to "??".
 * @prop {string} selected - Optional boolean that determines whether the account represented on the bar is selected. Only one
 *                           account can be selected at a time; defaults to false.
 * @returns {JSX.Element} - An account information bar component.
 */
export default function AccountBar({
  accountNumber = "-1",
  accountName = "Account name not found",
  accountAddress = "?",
  integerDigits = "?",
  fractionalDigits = "??",
  selected = false,
}: React.PropsWithChildren<Props>): JSX.Element {
  const [copySuccessAddress, setCopySuccessAddress] = useState(false);
  const [copySuccessBalance, setCopySuccessBalance] = useState(false);

  return (
    <div className={`flex justify-between border-l-4 border-b ${
        selected ? "border-primaryAlt-500" : "border-ghost-900"
      } py-3 px-2 my-4 text-white text-lg font-roboto font-light`}>
      <div className="flex justify-between w-6/12">
        <div className="flex">
          <div className="text-xl mr-2">#{accountNumber}</div>
          {accountName}
        </div>
        <button
          className="relative flex items-center hover:text-primary-500"
          onClick={() => {
            copyToClipboard(accountAddress, setCopySuccessAddress);
          }}
        >
          <div className="scale-125 text-primary-500 mr-2 ml-4">
            <MdContentCopy />
          </div>
          {accountAddress}
          {copySuccessAddress && (
            <TalkBox
              copySuccess={copySuccessAddress}
              setCopySuccess={setCopySuccessAddress}
            />
          )}
        </button>
      </div>
      <button
        className="relative font-robotoFlex font-light tracking-widest hover:text-primary-500"
        onClick={() => {
          copyToClipboard(
            `${integerDigits}.${fractionalDigits}`,
            setCopySuccessBalance
          );
        }}
      >
        {copySuccessBalance && (
          <TalkBox
            copySuccess={copySuccessBalance}
            setCopySuccess={setCopySuccessBalance}
          />
        )}
        ħ{integerDigits}.{fractionalDigits}
      </button>
    </div>
  );
}
