import { useState } from "react";

interface Props {
  label: string;
  placeHolder?: string;
  value?: string;
}

/**
 * Renders an amount input field. For use on the Send page within the wallet dashboard.
 * 
 * @prop {string} label - Label located above the input field.
 * @prop {string} placeHolder - Optional placeholder located within the input field; defaults to an empty string.
 * @prop {string} value - Optional value placed in the input field; defaults to an empty string.
 * @returns {JSX.Element} - An amount input field.
 */
export default function AmountInputField({
  label,
  placeHolder = "",
  value = "",
}: React.PropsWithChildren<Props>): JSX.Element {
  const [inputValue, setInputValue] = useState(value || "");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Regular expression to allow only numerical values or a period
    const regex = /^[0-9.]*$/;
    const newValue = e.target.value;

    // Check if the new value matches the regex
    if (regex.test(newValue)) {
      // Update the input value if it's numerical or a period
      setInputValue(newValue);
    }
  };

  return (
    <div>
      <p className="text-white font-roboto text-xl font-light">{label}</p>
      <div className="relative w-80">
        <input
          className="w-80 h-11 p-3 pr-16 rounded-lg rounded-r-none bg-transparent border border-solid border-primary-500 outline-none text-white text-xl font-roboto placeholder-ghost-500"
          placeholder={placeHolder}
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          required
        />

        <button className="text-white text-xl absolute right-3 top-[8px] cursor-pointer">
          Max.
        </button>
      </div>
    </div>
  );
}
