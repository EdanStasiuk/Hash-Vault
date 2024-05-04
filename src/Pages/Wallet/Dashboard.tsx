import { useState } from "react";
import Header from "../../components/Header";
import Sidebar from "../../components/Wallet/Sidebar/Sidebar";
import Accounts from "../../components/Wallet/DashboardPages/Accounts/Accounts";
import Send from "../../components/Wallet/DashboardPages/Send/Send";
import Receive from "../../components/Wallet/DashboardPages/Receive/Receive";
import Transactions from "../../components/Wallet/DashboardPages/Transactions/Transactions";
import AddressBook from "../../components/Wallet/DashboardPages/AddressBook/AddressBook";
import Settings from "../../components/Wallet/DashboardPages/Settings/Settings";

// TODO: Create database to store the following data, need to refactor the schema
// This is here to mimic the database for now
export interface Account {
  accountNumber: string;
  accountName: string;
  accountAddress: string;
  integerDigits: string;
  fractionalDigits: string;
  selected?: boolean;
}

export interface Wallet {
  total: string;
  unstakedTotal: number;
  assets: Asset[];
}

export interface Settings {
  conversionCurrency: string;
}

export interface Asset {
  name: string;
  tokenId: string; // in the format 0.0.00000000
  apiId: string;
  balance: number;
}

const accounts: Account[] = [
  {
    accountNumber: "0",
    accountName: "Chequing",
    accountAddress: "0.0.000000-aaaaaa",
    integerDigits: "1,000",
    fractionalDigits: "0000000",
    selected: true,
  },
  {
    accountNumber: "1",
    accountName: "Savings",
    accountAddress: "0.0.000000-aaaaab",
    integerDigits: "100,000",
    fractionalDigits: "0000000",
    selected: false,
  },
];

// TODO: Test case: tokenIds should be unique
const wallet: Wallet[] = [
  {
    total: "101,000",
    unstakedTotal: 50000,
    assets: [
      {
        name: "HBAR",
        tokenId: "0.0.12345678",
        apiId: "hedera-hashgraph",
        balance: 10000,
      },
      {
        name: "HSUITE",
        tokenId: "0.0.87654321",
        apiId: "hsuite",
        balance: 20000,
      },
      {
        name: "WHBAR",
        tokenId: "0.0.98765432",
        apiId: "wrapped-hbar",
        balance: 30000,
      },
      {
        name: "HERA",
        tokenId: "0.0.987654",
        apiId: "hera-finance",
        balance: 30000,
      },
    ],
  },
];

const settings: Settings[] = [
  {
    conversionCurrency: "CAD",
  },
];

/**
 * Renders the wallet dashboard. The dashboard is one page that calls in components that
 * act as subpages.
 *
 * @returns {JSX.Element}
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
              activeItem === "Send" ? "p-6" : "p-12"
            }`}
          >
            {/* Render content based on activeItem */}
            {activeItem === "Accounts" && (
              <Accounts
                accountsList={accounts}
                walletInfo={wallet}
                settings={settings}
              />
            )}
            {activeItem === "Send" && (
              <Send walletInfo={wallet} settings={settings} />
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
