import Subheader from "../../Subheader";
import Balances from "./Balances";
import EditAccountButton from "./EditAccountButton";
import AccountBar from "./AccountBar";

interface Props {
  accountsList?: string[];
}

/**
 * Renders Accounts page information for dashboard.
 *
 * @prop {string[]} accountsList - List of accounts to be displayed on the dashboard via the AccountBar component.
 * @returns {JSX.Element} - Accounts page component.
 */
export default function Accounts({
  accountsList = [],
}: React.PropsWithChildren<Props>): JSX.Element {
  return (
    <div>
      <Subheader label="Accounts" />
      <Balances />
      <div className="flex items-center text-white mt-10 justify-between">
        <span className="text-2xl font-robotoFlex font-light">
          Your Accounts
        </span>
        <div className="flex items-center scale-110">
          <EditAccountButton />
        </div>
      </div>
      {accountsList}
      <AccountBar
        accountNumber = "0"
        accountName = "Chequing"
        selected={true}
      />
    </div>
  );
}
