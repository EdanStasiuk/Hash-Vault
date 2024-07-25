import { useContext, useState } from "react";
import InputField from "../../../InputField";
import {
  decryptSelectedAccountMnemonic,
  getSelectedAccountFromLocalStorage,
} from "../../../../functions/storageFunctions";
import { useNavigate } from "react-router-dom";
import { SetLockedScreenActiveContext } from "../../../../config/contexts/contexts";

/**
 * Locked Component
 *
 * This component represents a lock screen for a crypto wallet dashboard. It prompts the user to
 * enter their wallet password after a period of inactivity. If the correct password is entered,
 * the dashboard unlocks; otherwise, an error message is displayed.
 *
 * @returns {JSX.Element} The rendered component.
 */
export default function Locked(): JSX.Element {
  const [password, setPassword] = useState<string>("");
  const [wrongPassword, setWrongPassword] = useState<boolean>(false);
  const setLockedScreenActive = useContext(SetLockedScreenActiveContext);
  const navigate = useNavigate();

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handleGoHome = () => {
    // sessionStorage.removeItem("walletUnlocked");
    navigate("/");
  };

  const handleUnlock = () => {
    unlockWallet()
      .then(() => {
        setWrongPassword(false);
        // sessionStorage.setItem("walletUnlocked", "true");
      })
      .catch((error) => {
        setWrongPassword(true);
        // sessionStorage.setItem("walletUnlocked", "false");
        console.error("Error unlocking wallet:", error);
      });
  };

  const unlockWallet = async () => {
    const decryptedMnemonic = await decryptSelectedAccountMnemonic(password);
    if (decryptedMnemonic) {
      setLockedScreenActive(false);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-white dark:bg-black dark:bg-opacity-30 backdrop-blur-md z-[1050]">
      <div className="text-center w-4/12">
        <h2 className="mb-4 text-xl text-black dark:text-white font-normal dark:font-semibold">
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
            allowLightMode={true}
            onChange={handlePasswordChange}
          />
        </div>
        <button
          onClick={handleUnlock}
          className="w-full p-2 mb-2 text-black dark:text-white bg-secondary-500 dark:bg-primary-500 rounded hover:bg-secondary-400 dark:hover:bg-primaryAlt-500"
        >
          Unlock
        </button>
        <button
          onClick={handleGoHome}
          className="w-full p-2 dark:text-white text-black bg-backgroundLight-500 dark:bg-backgroundLight-600 rounded hover:bg-backgroundLight-400 dark:hover:bg-ghost-900"
        >
          Go to Homepage
        </button>
      </div>
    </div>
  );
}
