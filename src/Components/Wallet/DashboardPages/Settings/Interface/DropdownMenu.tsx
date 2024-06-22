interface Props {
  currencyTypes: string[];
}

/**
 * Renders a dropdown menu with a list of currency types.
 *
 * @prop {string[]} currencyTypes - An array of currency types to be displayed in the dropdown.
 * @returns {JSX.Element} The dropdown menu component.
 */
export default function DropdownMenu({ currencyTypes }: Props): JSX.Element {
  return (
    <div className="dropdown">
      <select
        id="currency-select"
        className="border border-primary-500 bg-background-500 rounded-lg w-full h-8 text-white font-robotoFlex font-thin text-xl text-center pl-[6px] ml-[6px]"
      >
        {currencyTypes.map((currency, index) => (
          <option key={index} value={currency} className="text-lg">
            {currency}
          </option>
        ))}
      </select>
    </div>
  );
}
