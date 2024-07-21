import { useState } from "react";
import InputField from "../../../InputField";
import {
  decryptSelectedAccountPrivateKey,
  getSelectedAccountFromLocalStorage,
} from "../../../../functions/storageFunctions";
import { useNavigate } from "react-router-dom";

interface Props {
  setLocked: React.Dispatch<React.SetStateAction<boolean>>;
}

/**
 * Locked Component
 *
 * This component represents a lock screen for a crypto wallet dashboard. It prompts the user to
 * enter their wallet password after a period of inactivity. If the correct password is entered,
 * the dashboard unlocks; otherwise, an error message is displayed.
 *
 * @param {function} setLocked - A state setter function to set the locked status of the wallet.
 * @returns {JSX.Element} The rendered component.
 */
export default function Locked({ setLocked }: Props): JSX.Element {
  const [password, setPassword] = useState<string>("");
  const [wrongPassword, setWrongPassword] = useState<boolean>(false);
  const navigate = useNavigate();

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handleGoHome = () => {
    navigate("/");
  };

  const handleUnlock = () => {
    unlockWallet()
      .then(() => {
        // Optionally handle success if needed
        setWrongPassword(false);
        sessionStorage.setItem("walletUnlocked", "true");
      })
      .catch((error) => {
        setWrongPassword(true);
        console.error("Error unlocking wallet:", error);
      });
  };

  const unlockWallet = async () => {
    const privateKey = await decryptSelectedAccountPrivateKey(password);
    if (privateKey) {
      setLocked(false);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 backdrop-blur-md z-[1050]">
      <div className="text-center w-4/12">
        <h2 className="mb-4 text-xl text-white font-semibold">
          Please enter wallet password for:{" "}
          {getSelectedAccountFromLocalStorage()?.accountName
            ? getSelectedAccountFromLocalStorage()?.accountName
            : "Account Name N/A"}
        </h2>
        <div className="mb-4">
          <InputField
            placeHolder="Password"
            value={password}
            invalidInput={wrongPassword}
            invalidInputMessage={"Wrong password. Try again."}
            onChange={handlePasswordChange}
          />
        </div>
        <button
          onClick={handleUnlock}
          className="w-full p-2 mb-2 text-white bg-secondary-600 dark:bg-primary-500 rounded dark:hover:bg-primaryAlt-500"
        >
          Unlock
        </button>
        <button
          onClick={handleGoHome}
          className="w-full p-2 dark:text-white text-black bg-backgroundLight-600 rounded hover:bg-ghost-900"
        >
          Go to Homepage
        </button>
      </div>
    </div>
  );
}
