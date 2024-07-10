import { useEffect, useState } from "react";
import TalkBox from "./TalkBox";
import {
  fetchConvertedPrice,
  convertToFiat,
  copyToClipboard,
  displayCurrencySymbol,
} from "../../../../functions/functions";
import { getSettingsFromLocalStorage } from "../../../../functions/storageFunctions";

// total can be a string just so "?" can be displayed when there
// is an issue getting that information.
interface Props {
  total?: number | string; // TODO: Go through and convert total to balance
  conversionCurrency?: string;
}

/**
 * Renders the balance information for the wallet dashboard.
 *
 * @prop {number | string} total - Optional number or string representing the total amount of HBAR in the wallet; defaults to "?".
 * @prop {string} conversionCurrency - The ticker symbol of the currency that is to be converted to from HBAR; defaults to "usd".
 * @returns {JSX.Element} A component displaying balance information.
 */
export default function Balances({
  total = "?",
  conversionCurrency = "usd",
}: React.PropsWithChildren<Props>): JSX.Element {
  const [convertedTotal, setConvertedTotal] = useState<string>("0.00");
  const [copySuccessTotal, setCopySuccessTotal] = useState(false);
  const [totalForDisplay, setTotalForDisplay] = useState<string | number>(
    total
  );
  const hbarSymbol = "ħ";

  const currencySymbol = displayCurrencySymbol(conversionCurrency);

  // Fetches HBAR conversion rate and sets the total balance conversion
  useEffect(() => {
    const settings = getSettingsFromLocalStorage();
    if (settings?.hideBalance) {
      setTotalForDisplay("*.**");
      setConvertedTotal("*.**");
    } else {
      fetchConvertedPrice("hedera-hashgraph", conversionCurrency)
        .then((conversionRate) => {
          if (conversionRate !== undefined) {
            const convertedTotal = convertToFiat(conversionRate, total);
            setConvertedTotal(convertedTotal);
          } else {
            console.error("Unable to fetch HBAR price.");
          }
        })
        .catch((error) => {
          console.error("Error fetching HBAR price:", error);
        });
      setTotalForDisplay(total);
    }
  }, [conversionCurrency, total]);

  // Handle click event to copy total balance to clipboard
  const handleCopyTotal = () => {
    if (totalForDisplay !== "*.**") {
      copyToClipboard(totalForDisplay.toString(), setCopySuccessTotal);
      //TODO: Indicate to the user that they can't copy?
    }
  };

  return (
    <div className="text-xl font-roboto font-light text-black dark:text-white mr-2">
      <div className="flex justify-between">
        <span>Total balance:</span>
        <button
          className="relative text-right text-lg font-robotoFlex font-light tracking-widest dark:hover:text-primary-500"
          onClick={handleCopyTotal}
        >
          {hbarSymbol}
          {totalForDisplay}
          {copySuccessTotal && (
            <TalkBox
              copySuccess={copySuccessTotal}
              setCopySuccess={setCopySuccessTotal}
            />
          )}
        </button>
      </div>
      <div className="conversion text-base text-ghost-900 dark:text-ghost-500 text-right mb-2">
        <span>≈ </span>
        {currencySymbol}
        {convertedTotal}
      </div>
    </div>
  );
}
