import { useEffect, useState } from "react";
import Subheader from "../../Subheader";
import TransactionInfoBar from "./TransactionInfoBar";
import {
  getLastPageSetNumber,
  getLastSetNumberFromFirstApiPage,
  // getNextTransactionHistoryPage,
  getTransactionHistoryPage,
  splitTransactionsIntoSets,
} from "../../../../functions/transactionFunctions";
import { MirrorNodeTransactionData } from "../../../../config/interfaces";
import { getSelectedAccountFromLocalStorage } from "../../../../functions/storageFunctions";
import CircularIndeterminate from "../../../Miscelaneous/CircularIndeterminate";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";

/**
 * Renders Transactions page information for dashboard.
 *
 * @returns {React.JSX.Element} - Transactions page component.
 */
export default function Transactions(): React.JSX.Element {
  const [transactionsAreLoading, setTransactionsAreLoading] =
    useState<boolean>(true);
  const [pageSetsAreLoading, setPageSetsAreLoading] = useState<boolean>(true);
  const [transactionHistorySets, setTransactionHistorySets] = useState<
    MirrorNodeTransactionData["transactions"][]
  >([]);
  const [currentApiPageNumber, setCurrentApiPageNumber] = useState<number>(1);
  const [currentSetNumber, setCurrentSetNumber] = useState<number>(1);
  const [nextPageLink, setNextPageLink] = useState<string | null>(null);
  const [totalNumberOfSets, setTotalNumberOfSets] = useState<number>(1); // The last set on the last page

  const limitNumberOfShownTransactions = 10;
  const limitNumberOfRequestedTransactions = 100; // API's request limit
  const setsPerPage = Math.ceil(
    limitNumberOfRequestedTransactions / limitNumberOfShownTransactions
  );

  const getButtonClassNames = (isActive: boolean) => {
    return `flex items-center justify-center mx-1 min-w-[3rem] px-2 h-12 border rounded-md ${
      isActive
        ? "border-none bg-primary-500 text-background-500"
        : "border-black dark:border-primary-500 text-black dark:text-primary-500"
    }`;
  };

  const fetchTransactionHistory = async (pageNumber: number) => {
    setTransactionsAreLoading(true);
    const accountId = getSelectedAccountFromLocalStorage()?.accountId;
    if (accountId) {
      const transactionHistoryList = await getTransactionHistoryPage(
        accountId,
        limitNumberOfRequestedTransactions,
        pageNumber
      );

      if (transactionHistoryList) {
        // Split transactions into sets of 10
        const sets = splitTransactionsIntoSets(
          transactionHistoryList.transactions,
          10
        );
        setTransactionHistorySets(sets);
        setNextPageLink(transactionHistoryList.links.next);
      }
    }
    setTransactionsAreLoading(false);
  };

  useEffect(() => {
    fetchTransactionHistory(currentApiPageNumber).catch((error) => {
      console.error("Error in fetchTransactionHistory:", error);
      setTransactionsAreLoading(false);
    });
  }, [currentApiPageNumber]);

  //TODO: Can reduce overhead by implementing this into the next button
  // const fetchNextPage = async () => {
  //   setTransactionsAreLoading(true);
  //   if (nextPageLink) {
  //     const transactionHistoryList = await getNextTransactionHistoryPage(nextPageLink);

  //     if (transactionHistoryList) {
  //       // Split transactions into sets of 10
  //       const sets = splitTransactionsIntoSets(
  //         transactionHistoryList.transactions,
  //         10
  //       );
  //       setTransactionHistorySets(sets);
  //       setNextPageLink(transactionHistoryList.links.next);
  //     }
  //   }
  //   setTransactionsAreLoading(false);
  // }

  const determineLastPageSet = async () => {
    const accountId = getSelectedAccountFromLocalStorage()?.accountId;
    if (accountId) {
      // Get the set that is shown to the user on mount so the page nav numbers
      // don't get stuck loading once the first set of transactions have already loaded in
      const lastSetNumberOfFirstPage = await getLastSetNumberFromFirstApiPage(
        accountId,
        limitNumberOfRequestedTransactions
      );
      setTotalNumberOfSets(lastSetNumberOfFirstPage);
      setPageSetsAreLoading(false);
      // Get the actual last set number in the background
      const lastSetNumberOfLastPage = await getLastPageSetNumber(
        accountId,
        limitNumberOfRequestedTransactions
      );
      setTotalNumberOfSets(lastSetNumberOfLastPage);
    }
  };

  useEffect(() => {
    determineLastPageSet().catch((error) => {
      console.error("Error in determineLastSubPage:", error);
    });
  }, []);

  // Function to get the current set based on the page
  const getCurrentTransactionSet = () => {
    const setIndex = (currentSetNumber - 1) % setsPerPage;
    // console.log("currentSetNumber:", currentSetNumber, "lastSet", totalNumberOfSets, "currentApiPageNumber:", currentApiPageNumber, "shownTrans:", limitNumberOfShownTransactions);
    return transactionHistorySets[setIndex] || [];
  };

  const handleNextSet = () => {
    if (currentSetNumber < totalNumberOfSets) {
      if (
        currentSetNumber + 1 <=
        currentApiPageNumber * limitNumberOfShownTransactions
      ) {
        setCurrentSetNumber((prevSet) => prevSet + 1);
      } else if (nextPageLink) {
        setCurrentApiPageNumber((prevPage) => prevPage + 1);
        setCurrentSetNumber((prevSet) => prevSet + 1);
      }
    }
  };

  const handlePrevPage = () => {
    if (currentSetNumber > 1) {
      if ((currentSetNumber - 1) % limitNumberOfShownTransactions === 0) {
        setCurrentApiPageNumber((prevPage) => prevPage - 1);
      }
      setCurrentSetNumber((prevSet) => prevSet - 1);
    }
  };

  const handlePageClick = (setNumber: number) => {
    const setsPerPage = Math.ceil(
      limitNumberOfRequestedTransactions / limitNumberOfShownTransactions
    );
    const pageNumber = Math.ceil(setNumber / setsPerPage);

    setCurrentApiPageNumber(pageNumber);
    setCurrentSetNumber(setNumber);
  };

  const renderPageNumbers = () => {
    if (pageSetsAreLoading) {
      return (
        <button
          key={1}
          onClick={() => {
            handlePageClick(1);
          }}
          className={getButtonClassNames(currentSetNumber === 1)}
        >
          1
        </button>
      );
    }

    const outerEndPage =
      Math.ceil((currentSetNumber + 1) / limitNumberOfShownTransactions) *
        limitNumberOfShownTransactions <
      totalNumberOfSets
        ? Math.ceil((currentSetNumber + 1) / limitNumberOfShownTransactions) *
          limitNumberOfShownTransactions
        : totalNumberOfSets; // Last page or nearest multiple of 10
    const pageNumbers = [];

    pageNumbers.push(
      <button
        key={1}
        onClick={() => {
          handlePageClick(1);
        }}
        className={getButtonClassNames(currentSetNumber === 1)}
      >
        1
      </button>
    );

    if (currentSetNumber > 3) {
      pageNumbers.push(
        <span
          key="start-ellipsis"
          className="relative w-5 top-5 mx-1 text-base"
        >
          . . .
        </span>
      );
    }

    let startPage = Math.max(2, currentSetNumber - 1);
    let innerEndPage = Math.min(outerEndPage - 1, currentSetNumber + 1);

    if (currentSetNumber <= 3) {
      startPage = 2;
      innerEndPage = 4;
    }

    if (currentSetNumber >= outerEndPage - 2) {
      startPage = outerEndPage - 3;
      innerEndPage = outerEndPage - 1;
    }

    for (let i = startPage; i <= innerEndPage; i++) {
      pageNumbers.push(
        <button
          key={i}
          onClick={() => {
            handlePageClick(i);
          }}
          className={getButtonClassNames(i === currentSetNumber)}
        >
          {i}
        </button>
      );
    }

    if (currentSetNumber < outerEndPage - 2) {
      pageNumbers.push(
        <span key="end-ellipsis" className="relative w-5 top-5 mx-1 text-base">
          . . .
        </span>
      );
    }

    pageNumbers.push(
      <button
        key={outerEndPage}
        onClick={() => {
          handlePageClick(outerEndPage);
        }}
        className={getButtonClassNames(currentSetNumber === outerEndPage)}
      >
        {outerEndPage}
      </button>
    );

    return pageNumbers;
  };

  return (
    <div className="flex flex-col h-full">
      <Subheader label="Transactions" />
      <div className="flex-grow relative">
        {transactionsAreLoading && (
          <div className="absolute inset-0 flex items-center justify-center">
            <CircularIndeterminate />
          </div>
        )}
        {!transactionsAreLoading && (
          <div className="absolute inset-0 mt-6 border-y border-black dark:border-ghost-900 max-h-full overflow-y-auto">
            <div className="h-full">
              {getCurrentTransactionSet().map((transaction, index) => (
                <TransactionInfoBar key={index} transactionInfo={transaction} />
              ))}
            </div>
          </div>
        )}
      </div>
      <div className="flex justify-center mt-7 text-black dark:text-white text-lg">
        <button
          className="px-8 flex-shrink-0"
          onClick={handlePrevPage}
          disabled={currentSetNumber === 1}
        >
          <IoIosArrowBack className="scale-150 text-secondary-500 dark:text-primary-500" />
        </button>
        <div className="flex flex-grow justify-center">
          {renderPageNumbers()}
        </div>
        <button
          className="px-8 flex-shrink-0"
          onClick={handleNextSet}
          disabled={currentSetNumber === totalNumberOfSets}
        >
          <IoIosArrowForward className="scale-150 text-secondary-500 dark:text-primary-500" />
        </button>
      </div>
    </div>
  );
}
