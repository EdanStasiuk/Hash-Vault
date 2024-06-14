import { useState } from "react";
import Subheader from "../../Subheader";
import SettingsNavbar from "./SettingsNavbar";
import WalletSettings from "./Wallet/WalletSettings";
import InfoSettings from "./Info/InfoSettings";
import InterfaceSettings from "./Interface/InterfaceSettings";

/**
 * Renders Settings page information for the dashboard.
 *
 * @returns {JSX.Element} Settings page component.
 */
export default function Settings(): JSX.Element {
  const [selectedIndex, setSelectedIndex] = useState<number>(0);

  return (
    <div>
      <Subheader label="Settings" />
      <div className="mt-8">
        <SettingsNavbar 
          navItems={["Wallet", "Interface", "Info"]} 
          selectedIndex={selectedIndex} 
          setSelectedIndex={setSelectedIndex}
        />
      </div>
      <div className="mt-8">
        {selectedIndex === 0 && <WalletSettings />}
        {selectedIndex === 1 && <InterfaceSettings />}
        {selectedIndex === 2 && <InfoSettings />}
      </div>
    </div>
  );
}
