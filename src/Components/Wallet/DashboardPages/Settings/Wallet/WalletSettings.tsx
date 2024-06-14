import { FaLock } from "react-icons/fa";
import { MdLogout } from "react-icons/md";
import { FaKey } from "react-icons/fa";
import { TbPassword } from "react-icons/tb";
import SettingsButton from "./SettingsButton";

/**
 * Renders wallet settings options using SettingsButton components.
 *
 * @returns {JSX.Element} Wallet settings component.
 */
export default function WalletSettings(): JSX.Element {
  return (
    <div>
      <SettingsButton
        mainText="Lock this wallet"
        description="Locks this wallet on demand."
        icon={FaLock}
        borderStyle="border-y"
      />
      <SettingsButton 
        mainText="Close this wallet"
        description="Logs out of this wallet."
        icon={MdLogout}
        borderStyle="border-b"
      />
      <SettingsButton 
        mainText="Show seed & keys"
        description="Store this information safely to recover your wallet in the future."
        icon={FaKey}
        borderStyle="border-b"
      />
      <SettingsButton 
        mainText="Change wallet password"
        description="Change the password of your wallet."
        icon={TbPassword}
        borderStyle="border-b"
      />
    </div>
  );
}
