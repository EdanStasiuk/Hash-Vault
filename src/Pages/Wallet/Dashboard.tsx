import Header from "../../components/Header";
import Sidebar from "../../components/Wallet/Sidebar/Sidebar";

function Dashboard() {
  return (
    <>
    <div className="flex flex-col h-screen">
      <Header />
      <div className="flex-grow flex">
        <div className="flex border-r border-primary-500 w-1/4 overflow-hidden">
          <Sidebar />
        </div>
        <div className="flex-grow w-3/4 bg-backgroundAlt-500 text-primary-500 p-12">
          
        </div>
      </div>
    </div>
    </>
  );
}

export default Dashboard;
