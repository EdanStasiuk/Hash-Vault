/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import Subheader from "../../Subheader";
import Balances from "./Balances";
import EditAccountButton from "./EditAccountButton";
import AccountBar from "./AccountBar";
import { Account, Wallet, Settings } from "../../../../config/interfaces";

interface Props {
  accountsList?: Account[];
  walletInfo?: Wallet[];
  settings?: Settings;
}

/**
 * Renders Accounts page information for dashboard.
 *
 * @prop {Account[]} accountsList - Optional list of accounts to be displayed on the dashboard via the AccountBar component.
 * @prop {Wallet[]} walletInfo - Optional list containing wallet information, namely balance.
 * @prop {Settings} settings - Optional list containg user settings information.
 * @returns {JSX.Element} - Accounts page component.
 */
export default function Accounts({
  accountsList = [],
  walletInfo = [],
  settings,
}: React.PropsWithChildren<Props>): JSX.Element {
  return (
    <div>
      <Subheader label="Accounts" />
      <Balances
        total={walletInfo[0].balance}
        conversionCurrency={settings?.conversionCurrency}
      />
      <div className="flex items-center text-black dark:text-white mt-10 justify-between">
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
