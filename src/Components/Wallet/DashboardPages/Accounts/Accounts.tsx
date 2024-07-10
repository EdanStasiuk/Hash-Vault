import Subheader from "../../Subheader";
import Balances from "./Balances";
import EditAccountButton from "./EditAccountButton";
import AccountBar from "./AccountBar";
import {
  getAccountsFromLocalStorage,
  getSettingsFromLocalStorage,
} from "../../../../functions/storageFunctions";
import { getTokenBalance } from "../../../../functions/functions";
import { useEffect, useState } from "react";

/**
 * Renders Accounts page information for dashboard.
 *
 * @returns {JSX.Element} Accounts page component.
 */
export default function Accounts(): JSX.Element {
  const [accountBalances, setAccountBalances] = useState<
    Record<string, number | null>
  >({});
  const [totalBalance, setTotalBalance] = useState<number>(0);

  useEffect(() => {
    const fetchBalances = async () => {
      const accounts = getAccountsFromLocalStorage();
      const balances: Record<string, number | null> = {};
      let aggregateBalance = 0;

      for (const account of accounts) {
        const balance = await getTokenBalance(
          "hedera-hashgraph",
          account.accountId
        );
        balances[account.accountId] = balance;
        if (balance !== null) {
          aggregateBalance += balance;
        }
      }

      setAccountBalances(balances);
      setTotalBalance(aggregateBalance);
    };

    fetchBalances().catch((error) => {
      console.error("Error in fetchBalances:", error);
    });
  }, []);

  return (
    <div>
      <Subheader label="Accounts" />
      <Balances
        total={totalBalance}
        conversionCurrency={
          getSettingsFromLocalStorage()?.conversionCurrency ?? "USD"
        }
      />
      <div className="flex items-center text-black dark:text-white mt-10 justify-between">
        <span className="text-2xl font-robotoFlex font-light">
          Your Accounts
        </span>
        <div className="flex items-center scale-110">
          <EditAccountButton />
        </div>
      </div>
      {getAccountsFromLocalStorage().map((account) => (
        <AccountBar
          key={account.accountNumber}
          accountNumber={account.accountNumber}
          accountName={account.accountName}
          accountId={account.accountId}
          balance={accountBalances[account.accountId]}
          selected={account.selected}
        />
      ))}
    </div>
  );
}
