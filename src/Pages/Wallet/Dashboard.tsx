import { useEffect, useState } from "react";
import Header from "../../components/Header";
import Sidebar from "../../components/Wallet/Sidebar/Sidebar";
import Accounts from "../../components/Wallet/DashboardPages/Accounts/Accounts";
import Send from "../../components/Wallet/DashboardPages/Send/Send";
import Receive from "../../components/Wallet/DashboardPages/Receive/Receive";
import Transactions from "../../components/Wallet/DashboardPages/Transactions/Transactions";
import AddressBook from "../../components/Wallet/DashboardPages/AddressBook/AddressBook";
import Settings from "../../components/Wallet/DashboardPages/Settings/Settings";
import Locked from "../../components/Wallet/DashboardPages/Locked/Locked";
import { settings as defaultSettings } from "../../config/constants";
import {
  getSelectedAccountFromLocalStorage,
  getSettingsFromLocalStorage,
} from "../../functions/storageFunctions";
import { getTokenBalance, splitNumber } from "../../functions/functions";
import {
  LightThemeContext,
  BadgeValuesContext,
  LockedScreenActiveContext,
  SetLockedScreenActiveContext,
} from "../../config/contexts";
import {
  Settings as SettingsInterface,
  BadgeValues,
} from "../../config/interfaces";

/**
 * Renders the wallet dashboard. The dashboard is one page that calls in components that
 * act as subpages.
 *
 * @returns {JSX.Element} A dashboard component.
 */
export default function Dashboard(): JSX.Element {
  const [activeItem, setActiveItem] = useState<string>("Accounts");
  const [headerTitle, setHeaderTitle] = useState<string>("Hash Vault");
  const [lockedScreenActive, setLockedScreenActive] = useState<boolean>(true); //Lock wallet on Dashboard mount
  const [lightTheme, setLightTheme] = useState<boolean>(false);
  const [leftOfDecimal, setLeftOfDecimal] = useState<string | number>("?");
  const [rightOfDecimal, setRightOfDecimal] = useState<string | number>("??");
  const [accountNumberForDisplay, setAccountNumberForDisplay] = useState<
    string | number
  >("-1");
  const [accountNameForDisplay, setAccountNameForDisplay] =
    useState<string>("N/A");
  const [settings, setSettings] = useState<SettingsInterface>(
    () => getSettingsFromLocalStorage() || defaultSettings
  );
  const BadgeValues = {
    leftOfDecimal,
    rightOfDecimal,
    accountNumberForDisplay,
    accountNameForDisplay,
  } as BadgeValues;

  const handleSidebarItemClick = (label: string) => {
    setActiveItem(label);
  };

  // Initialize accounts and settings in local storage if it doesn't exist.
  useEffect(() => {
    if (!getSettingsFromLocalStorage()) {
      const settingsInit = JSON.stringify(defaultSettings);
      localStorage.setItem("settings", settingsInit);
    }
  }, []);

  const updateLightTheme = () => {
    const settings = getSettingsFromLocalStorage();
    if (settings !== undefined) {
      setLightTheme(
        settings.lightTheme !== undefined ? settings.lightTheme : false
      );
    } else {
      console.error("Error: settings not found in local storage.");
    }
  };

  const updateHeaderTitle = () => {
    const settings = getSettingsFromLocalStorage();
    const account = getSelectedAccountFromLocalStorage();

    if (account && settings) {
      setHeaderTitle(
        settings.displayWalletNameInTitleBar !== undefined &&
          account.accountName !== undefined &&
          settings.displayWalletNameInTitleBar
          ? account.accountName
          : "Hash Vault"
      );
    } else {
      console.error("Error: there is no selected account in local storage.");
    }
  };

  const updateBadgeValues = async () => {
    try {
      const settings = getSettingsFromLocalStorage();
      const account = getSelectedAccountFromLocalStorage();
      if (account !== undefined) {
        const balance = await getTokenBalance(
          "hedera-hashgraph",
          account.accountId
        );
        if (balance === null || balance === undefined) {
          setLeftOfDecimal("?");
          setRightOfDecimal("??");
        } else if (settings?.hideBalance) {
          setLeftOfDecimal("*");
          setRightOfDecimal("**");
        } else {
          const { leftOfDecimal, rightOfDecimal } = splitNumber(balance);
          setLeftOfDecimal(leftOfDecimal);
          setRightOfDecimal(rightOfDecimal);
        }
        setAccountNumberForDisplay(
          account.accountNumber !== undefined ? account.accountNumber : "-1"
        );
        setAccountNameForDisplay(
          account.accountName !== undefined
            ? account.accountName
            : "Account not found"
        );
      } else {
        console.error("Failed to get selected account from local storage.");
      }
    } catch (error) {
      console.error("Error updating badge values:", error);
    }
  };

  const updateLockWalletOnInactivity = () => {
    const settings = getSettingsFromLocalStorage();
    if (settings?.lockOnInactivityPeriod.activated) {
      const inactivityPeriod =
        settings.lockOnInactivityPeriod.period * 60 * 1000; // Converted to milliseconds

      let inactivityTimeout: NodeJS.Timeout;

      const resetInactivityTimeout = () => {
        clearTimeout(inactivityTimeout);
        inactivityTimeout = setTimeout(() => {
          setLockedScreenActive(true);
          sessionStorage.setItem("walletUnlocked", "false");
        }, inactivityPeriod);
      };

      window.addEventListener("mousemove", resetInactivityTimeout);
      window.addEventListener("keydown", resetInactivityTimeout);

      // Initialize the inacitivty timeout
      resetInactivityTimeout();

      // Clean up on component unmount
      return () => {
        clearTimeout(inactivityTimeout);
        window.removeEventListener("mousemove", resetInactivityTimeout);
        window.removeEventListener("keydown", resetInactivityTimeout);
      };
    }
  };

  useEffect(() => {
    updateLightTheme();
    updateHeaderTitle();
    (async () => {
      await updateBadgeValues();
    })().catch((error) => {
      console.error("Error in useEffect updateBadgeValues:", error);
    });
  }, [settings]);

  useEffect(() => {
    const cleanup = updateLockWalletOnInactivity();
    return () => {
      if (cleanup) cleanup();
    };
  }, [settings]);

  useEffect(() => {
    const handleStorageChange = () => {
      const newSettings = getSettingsFromLocalStorage();
      if (newSettings) {
        setSettings(newSettings);
      }
    };

    window.addEventListener("storage", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  return (
    <>
      <LockedScreenActiveContext.Provider value={lockedScreenActive}>
        <SetLockedScreenActiveContext.Provider value={setLockedScreenActive}>
          <LightThemeContext.Provider value={lightTheme}>
            <div className="relative bg-white">
              {lockedScreenActive && <Locked />}{" "}
              {/* TODO: Set up backend validation */}
            </div>
            {!lockedScreenActive && (
              <div className="flex flex-col h-screen">
                <Header allowLightMode={true} headerTitle={headerTitle} />
                <div className="flex-grow flex">
                  <div className="sidebar flex border-r border-backgroundLight-300 dark:border-primary-500 w-1/4 overflow-hidden ">
                    <BadgeValuesContext.Provider value={BadgeValues}>
                      <Sidebar
                        activeItem={activeItem}
                        onItemClick={handleSidebarItemClick}
                      />
                    </BadgeValuesContext.Provider>
                  </div>
                  <div
                    className={`main flex-grow w-3/4 bg-backgroundLight-100 dark:bg-backgroundAlt-500 text-backgroundLight-500 dark:text-primary-500 ${
                      activeItem === "Send" ? "px-6 py-2" : "px-12 py-8"
                    }`}
                  >
                    {/* Render content based on activeItem */}
                    {activeItem === "Accounts" && <Accounts />}
                    {activeItem === "Send" && <Send />}
                    {activeItem === "Receive" && <Receive />}
                    {activeItem === "Transactions" && <Transactions />}
                    {activeItem === "Address Book" && <AddressBook />}
                    {activeItem === "Settings" && <Settings />}
                  </div>
                </div>
              </div>
            )}
          </LightThemeContext.Provider>
        </SetLockedScreenActiveContext.Provider>
      </LockedScreenActiveContext.Provider>
    </>
  );
}
