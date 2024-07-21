import { FaLock } from "react-icons/fa";
import { MdLogout } from "react-icons/md";
import { FaKey } from "react-icons/fa";
import { TbPassword } from "react-icons/tb";
import { MdDelete } from "react-icons/md";
import SettingsButton from "./SettingsButton";
import { SetLockedScreenActiveContext } from "../../../../../config/contexts";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";

/**
 * Renders wallet settings options using SettingsButton components.
 *
 * @returns {JSX.Element} Wallet settings component.
 */
export default function WalletSettings(): JSX.Element {
  const setLockedScreenActive = useContext(SetLockedScreenActiveContext);
  const navigate = useNavigate();

  const lockWallet = () => {
    sessionStorage.setItem("walletUnlocked", "false");
    setLockedScreenActive(true);
  };

  const closeWallet = () => {
    sessionStorage.setItem("walletUnlocked", "false");
    setLockedScreenActive(true);
    navigate("/");
  };

  const showSeedAndKeys = () => {
    //TODO: Implement
  };

  const changeWalletPassword = () => {
    //TODO: Implement
  };

  const deleteAllWalletsAndData = () => {
    //TODO: Implement
  };

  return (
    <div>
      <SettingsButton
        mainText="Lock this wallet"
        description="Locks this wallet on demand."
        icon={FaLock}
        borderStyle="border-y"
        onClick={lockWallet}
      />
      <SettingsButton
        mainText="Close this wallet"
        description="Logs out of this wallet."
        icon={MdLogout}
        borderStyle="border-b"
        onClick={closeWallet}
      />
      <SettingsButton
        mainText="Show seed & keys"
        description="Store this information safely to recover your wallet in the future."
        icon={FaKey}
        borderStyle="border-b"
        onClick={showSeedAndKeys}
      />
      <SettingsButton
        mainText="Change wallet password"
        description="Change the password of your wallet."
        icon={TbPassword}
        borderStyle="border-b"
        onClick={changeWalletPassword}
      />
      <SettingsButton
        mainText="Delete all wallets and data"
        description="Delete all wallet information stored within the local browser."
        icon={MdDelete}
        borderStyle="border-b"
        onClick={deleteAllWalletsAndData}
      />
    </div>
  );
}
