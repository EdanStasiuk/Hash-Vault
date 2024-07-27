import { AiOutlinePlus } from "react-icons/ai";

/**
 * Renders a button for adding an account to a wallet.
 *
 * @returns {JSX.Element} - Accounts page component.
 */
export default function AddAccountButton(): JSX.Element {
  return (
    <button className="text-black dark:text-primary-500 border border-black dark:border-primary-500 rounded-lg p-2 transform hover:scale-105 transition duration-100">
      <div className="scale-125">
        <AiOutlinePlus />
      </div>
    </button>
  );
}
