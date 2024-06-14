/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { useState } from "react";
import Header from "../../components/Header";
import Sidebar from "../../components/Wallet/Sidebar/Sidebar";
import Accounts from "../../components/Wallet/DashboardPages/Accounts/Accounts";
import Send from "../../components/Wallet/DashboardPages/Send/Send";
import Receive from "../../components/Wallet/DashboardPages/Receive/Receive";
import Transactions from "../../components/Wallet/DashboardPages/Transactions/Transactions";
import AddressBook from "../../components/Wallet/DashboardPages/AddressBook/AddressBook";
import Settings from "../../components/Wallet/DashboardPages/Settings/Settings";
import { accounts, wallets, settings } from "../../config/constants";

/**
 * Renders the wallet dashboard. The dashboard is one page that calls in components that
 * act as subpages.
 *
 * @returns {JSX.Element} A dashboard component.
 */
function Dashboard(): JSX.Element {
  const [activeItem, setActiveItem] = useState<string>("Accounts");

  const handleSidebarItemClick = (label: string) => {
    setActiveItem(label);
  };

  return (
    <>
      <div className="flex flex-col h-screen">
        <Header />
        <div className="flex-grow flex">
          <div className="sidebar flex border-r border-primary-500 w-1/4 overflow-hidden">
            <Sidebar
              activeItem={activeItem}
              onItemClick={handleSidebarItemClick}
            />
          </div>
          <div
            className={`main flex-grow w-3/4 bg-backgroundAlt-500 text-primary-500 ${
              activeItem === "Send" ? "px-6 py-2" : "px-12 py-8"
            }`}
          >
            {/* Render content based on activeItem */}
            {activeItem === "Accounts" && (
              <Accounts
                accountsList={accounts}
                walletInfo={wallets}
                settings={settings}
              />
            )}
            {activeItem === "Send" && (
              <Send settings={settings} />
            )}
            {activeItem === "Receive" && <Receive />}
            {activeItem === "Transactions" && <Transactions />}
            {activeItem === "Address Book" && <AddressBook />}
            {activeItem === "Settings" && <Settings />}
          </div>
        </div>
      </div>
    </>
  );
}

export default Dashboard;
