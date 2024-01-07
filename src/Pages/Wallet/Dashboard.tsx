import { useState } from "react";
import Header from "../../components/Header";
import Sidebar from "../../components/Wallet/Sidebar/Sidebar";
import Accounts from "../../components/Wallet/Pages/Accounts/Accounts";
import Send from "../../components/Wallet/Pages/Send/Send";
import Receive from "../../components/Wallet/Pages/Receive/Receive";
import Transactions from "../../components/Wallet/Pages/Transactions/Transactions";
import Settings from "../../components/Wallet/Pages/Settings/Settings";

function Dashboard() {
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
          <div className="main flex-grow w-3/4 bg-backgroundAlt-500 text-primary-500 p-12">
            {/* Render content based on activeItem */}
            {activeItem === "Accounts" && <Accounts />}
            {activeItem === "Send" && <Send />}
            {activeItem === "Receive" && <Receive />}
            {activeItem === "Transactions" && <Transactions />}
            {activeItem === "Settings" && <Settings />}
          </div>
        </div>
      </div>
    </>
  );
}

export default Dashboard;
