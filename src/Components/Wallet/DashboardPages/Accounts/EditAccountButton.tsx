import { HiOutlineDotsHorizontal } from "react-icons/hi"

/**
 * Renders a button for editing accounts of the wallet.
 *
 * @returns {JSX.Element} - Edit account button component.
 */
export default function EditAccountButton(): JSX.Element {
  return (
    <button className="text-primary-500 text-2xl">
      <HiOutlineDotsHorizontal />
    </button>
  );
}
