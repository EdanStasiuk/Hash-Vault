import { useEffect, useState } from "react";
import TalkBox from "./TalkBox";
import {
  fetchConvertedPrice,
  convertToFiat,
  copyToClipboard,
  displayCurrencySymbol,
} from "../../../../functions/functions";

// total can be a string just so "?" can be displayed when there
// is an issue getting that information.
interface Props {
  total?: number | string; // TODO: Go through and convert total to balance
  conversionCurrency?: string;
}

/**
 * Renders the balance information for the wallet dashboard.
 *
 * @prop {number} total - Optional number or string representing the total amount of HBAR in the wallet; defaults to "?".
 * @prop {string} conversionCurrency - The abreviation of the currency that is to be converted from HBAR; defaults to "usd".
 * @returns {JSX.Element} A component displaying balance information.
 */
export default function Balances({
  total = "?",
  conversionCurrency = "usd",
}: React.PropsWithChildren<Props>): JSX.Element {
  const [convertedTotal, setConvertedTotal] = useState<string>("0.00");
  const [copySuccessTotal, setCopySuccessTotal] = useState(false);
  const hbarSymbol = "ħ";

  const currencySymbol = displayCurrencySymbol(conversionCurrency);

  // Fetches HBAR conversion rate and sets the total balance conversion
  useEffect(() => {
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
  }, [conversionCurrency, total]);

  return (
    <div className="text-xl font-roboto font-light text-black dark:text-white mr-2">
      <div className="flex justify-between">
        <span>Total balance:</span>
        <button
          className="relative text-right text-lg font-robotoFlex font-light tracking-widest dark:hover:text-primary-500" //TODO: assign hover colour for light mode
          onClick={() => {
            copyToClipboard(total, setCopySuccessTotal);
          }}
        >
          {hbarSymbol}
          {total}
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
