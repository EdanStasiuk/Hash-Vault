import { useEffect, useState } from "react";
import TalkBox from "./TalkBox";
import { copyToClipboard } from "./functions";
import { convertToFiat } from "./functions";
import { displayCurrencySymbol } from "./functions";

interface Props {
  total?: string;
  unstakedTotal?: string;
  conversionCurrency?: string;
}

/**
 * Renders the balance information for the wallet dashboard.
 *
 * @prop {string} total - Optional string representing the total amount on HBAR in the wallet; defaults to "?".
 * @prop {string} unstakedTotal - Optional string representing the total amount of unstaked HBAR in the wallet; defaults to "?".
 * @prop {string} conversionCurrency - The abreviation of the currency that is to be converted form HBAR; defaults to "usd".
 * @returns {JSX.Element} - A component displaying balance information.
 */
export default function Balances({
  total = "?",
  unstakedTotal = "?",
  conversionCurrency = "usd",
}: React.PropsWithChildren<Props>): JSX.Element {
  const [convertedUnstakedTotal, setConvertedUnstakedTotal] =
    useState<string>("0.00");
  const [convertedTotal, setConvertedTotal] = useState<string>("0.00");
  const [copySuccessTotal, setCopySuccessTotal] = useState(false);
  const [copySuccessUnstakedTotal, setCopySuccessUnstakedTotal] = useState(false);
  const hbarSymbol = "ħ";

  const currencySymbol = displayCurrencySymbol(conversionCurrency);

  // Fetches HBAR conversion rate and sets the total and total unstaked conversions
  useEffect(() => {
    fetch("https://api.coingecko.com/api/v3/coins/hedera-hashgraph", {
      method: "GET",
    })
      .then((response) => response.json())
      .then((data) => {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
        const conversionRate = data?.market_data?.current_price?.[
          conversionCurrency
        ] as number | undefined;
        if (conversionRate !== undefined) {
          // console.log(`Current HBAR Price in ${conversionCurrency}: ${conversionRate}`);
          const convertedTotal = convertToFiat(conversionRate, total);
          const convertedUnstakedTotal = convertToFiat(
            conversionRate,
            unstakedTotal
          );
          setConvertedTotal(convertedTotal);
          setConvertedUnstakedTotal(convertedUnstakedTotal);
          // console.log("Converted:", convertedTotal);
        } else {
          console.error("Unable to fetch HBAR price.");
        }
      })
      .catch((error) => {
        console.error("Error fetching HBAR price:", error);
      });
  }, [conversionCurrency]);

  return (
    <div className="text-xl font-roboto font-light text-white mr-2">
      <div className="flex justify-between">
        <span>Total balance:</span>
        <button
          className="relative text-right text-lg font-robotoFlex font-light tracking-widest hover:text-primary-500"
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
      <div className="conversion text-base text-ghost-500 text-right mb-2">
        <span>≈ </span>
        {currencySymbol}
        {convertedTotal}
      </div>
      <div className="flex justify-between">
        <span>Total unstaked balance:</span>
        <button
          className="relative text-right text-lg font-robotoFlex font-light tracking-widest hover:text-primary-500"
          onClick={() => {
            copyToClipboard(unstakedTotal, setCopySuccessUnstakedTotal);
          }}
        >
          {hbarSymbol}
          {unstakedTotal}
          {copySuccessUnstakedTotal && (
            <TalkBox
              copySuccess={copySuccessUnstakedTotal}
              setCopySuccess={setCopySuccessUnstakedTotal}
            />
          )}
        </button>
      </div>
      <div className="conversion text-base text-ghost-500 text-right">
        <span>≈ </span>
        {currencySymbol}
        {convertedUnstakedTotal}
      </div>
    </div>
  );
}
