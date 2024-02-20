import { useState } from "react";
import { FaRegAddressBook } from "react-icons/fa";

interface Props {
  label: string;
  placeHolder?: string;
  value?: string;
  onAddressBookClick: () => void;
}

/**
 * Renders an address input field. For use on the send page within the wallet dashboard.
 *
 * @prop {string} label - Label located above the input field.
 * @prop {string} placeHolder - Optional placeholder located within the input field; defaults to an empty string.
 * @prop {string} value - Optional value placed in the input field; defaults to an empty string.
 * @prop {() => void} onAddressBookClick - Function that causes the Address Book page component to show on click.
 * @returns {JSX.Element}
 */
export default function AddressInputField({
  label,
  placeHolder = "",
  value: propValue = "",
  onAddressBookClick,
}: React.PropsWithChildren<
  Props & { onAddressBookClick: () => void }
>): JSX.Element {
  const [value, setValue] = useState(propValue);
  const [showAddressBook, setShowAddressBook] = useState(false);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
  };

  const toggleAddressBook = () => {
    setShowAddressBook(!showAddressBook);
    onAddressBookClick();
  };

  return (
    <div>
      <p className="text-white font-roboto text-xl font-light">{label}</p>
      <div className="relative w-60">
        <input
          className="w-60 h-11 p-3 pr-12 rounded-lg bg-transparent border border-solid border-primary-500 outline-none text-white text-xl font-roboto placeholder-ghost-500"
          placeholder={placeHolder}
          type="text"
          value={value}
          onChange={handleChange}
          required
        />
        <button onClick={toggleAddressBook}>
          <FaRegAddressBook className="text-white scale-175 absolute right-4 top-[14px]" />
        </button>
      </div>
    </div>
  );
}
