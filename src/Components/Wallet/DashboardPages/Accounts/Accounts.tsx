import Subheader from "../../Subheader";
import Balances from "./Balances";
import EditAccountButton from "./EditAccountButton";
import AccountBar from "./AccountBar";
import { Account, Wallet, Settings } from "../../../../pages/Wallet/Dashboard";

interface Props {
  accountsList?: Account[];
  walletInfo?: Wallet[];
  settings?: Settings[];
}

/**
 * Renders Accounts page information for dashboard.
 *
 * @prop {Account[]} accountsList - List of accounts to be displayed on the dashboard via the AccountBar component.
 * @prop {Wallet[]} walletInfo - List containing wallet information, namely total balance and total unstaked balance.
 * @returns {JSX.Element} - Accounts page component.
 */
export default function Accounts({
  accountsList = [],
  walletInfo = [],
  settings = [],
}: React.PropsWithChildren<Props>): JSX.Element {
  return (
    <div>
      <Subheader label="Accounts" />
      <Balances
        total={walletInfo[0].total}
        unstakedTotal={walletInfo[0].unstakedTotal}
        conversionCurrency={settings[0].conversionCurrency}
      />
      <div className="flex items-center text-white mt-10 justify-between">
        <span className="text-2xl font-robotoFlex font-light">
          Your Accounts
        </span>
        <div className="flex items-center scale-110">
          <EditAccountButton />
        </div>
      </div>
      {accountsList.map((account) => (
        <AccountBar
          key={account.accountNumber}
          accountNumber={account.accountNumber}
          accountName={account.accountName}
          accountAddress={account.accountAddress}
          integerDigits={account.integerDigits}
          fractionalDigits={account.fractionalDigits}
          selected={account.selected}
        />
      ))}
    </div>
  );
}
