import { useState } from "react";
import { getSettingsFromLocalStorage } from "../../../../../functions/storageFunctions";

interface Props {
  currencyOptionsList: string[];
  onCurrencyChange: (newCurrency: string) => void;
}

/**
 * Renders a dropdown menu with a list of currency types.
 *
 * @prop {string[]} currencyTypes - An array of currency types to be displayed in the dropdown.
 * * @prop {(newCurrency: string) => void} onCurrencyChange - Function to call when the currency changes.
 * @returns {JSX.Element} The dropdown menu component.
 */
export default function DropdownMenu({
  currencyOptionsList,
  onCurrencyChange,
}: Props): JSX.Element {
  const [selectedCurrency, setSelectedCurrency] = useState<string>(() => {
    const settings = getSettingsFromLocalStorage();
    return settings?.conversionCurrency || "USD";
  });

  const handleCurrencyChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const newCurrency = event.target.value;
    setSelectedCurrency(newCurrency);
    onCurrencyChange(newCurrency);
  };

  return (
    <div className="dropdown">
      <select
        id="currency-select"
        value={selectedCurrency}
        onChange={handleCurrencyChange}
        className="border-[3px] border-t-0 border-x-0 dark:border border-secondary-400 dark:border-primary-500 bg-white dark:bg-background-500 rounded-lg w-full h-8 text-black dark:text-white font-robotoFlex font-light dark:font-thin text-xl text-center pl-[6px] ml-[6px]"
      >
        {currencyOptionsList.map((currency, index) => (
          <option key={index} value={currency} className="text-lg">
            {currency}
          </option>
        ))}
      </select>
    </div>
  );
}
