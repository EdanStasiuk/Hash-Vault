import { IoSearch } from "react-icons/io5";
import { TransactionInformation } from "../../../../config/interfaces";
import { formatTimestamp } from "../../../../functions/transactionFunctions";
import { useEffect, useState } from "react";
import { getSelectedAccountFromLocalStorage } from "../../../../functions/storageFunctions";
import { getTokenInfo, getTokenLogo } from "../../../../functions/functions";

interface Props {
  transactionInfo?: TransactionInformation;
}

/**
 * Component to display detailed information about a specific transaction.
 *
 * @prop {TransactionInformation} transactionInfo - The information of the transaction to display.
 * @returns A React component displaying the transaction details.
 */
export default function TransactionInfoBar({ transactionInfo }: Props) {
  const [mainContent, setMainContent] = useState<string>("");
  const [amount, setAmount] = useState<number | string>("??.?");
  const [tokenId, setTokenId] = useState<string>("N/A");
  const [tokenLogo, setTokenLogo] = useState<string | null>(null);
  const [timeStamp, setTimeStamp] = useState<string | null>(null);

  useEffect(() => {
    switch (transactionInfo?.name) {
      case "CONSENSUSCREATETOPIC":
        setMainContent("Consensus Create Topic");
        break;
      case "CONSENSUSDELETETOPIC":
        setMainContent("Consensus Delete Topic");
        break;
      case "CONSENSUSSUBMITMESSAGE":
        setMainContent("Consensus Submit Message");
        break;
      case "CONSENSUSUPDATETOPIC":
        setMainContent("Consensus Update Topic");
        break;
      case "CONTRACTCALL":
        setMainContent("Contract Call");
        break;
      case "CONTRACTCREATEINSTANCE":
        setMainContent("Contract Create Instance");
        break;
      case "CONTRACTDELETEINSTANCE":
        setMainContent("Contract Delete Instance");
        break;
      case "CONTRACTUPDATEINSTANCE":
        setMainContent("Contract Update Instance");
        break;
      case "CRYPTOADDLIVEHASH":
        setMainContent("Crypto Add Live Hash");
        break;
      case "CRYPTOAPPROVEALLOWANCE":
        setMainContent("Crypto Approve Allowance");
        break;
      case "CRYPTOCREATEACCOUNT":
        setMainContent("Crypto Create Account");
        break;
      case "CRYPTODELETE":
        setMainContent("Crypto Delete");
        break;
      case "CRYPTODELETEALLOWANCE":
        setMainContent("Crypto Delete Allowance");
        break;
      case "CRYPTODELETELIVEHASH":
        setMainContent("Crypto Delete Live Hash");
        break;
      case "CRYPTOTRANSFER":
        setMainContent("Token Transfer");
        break;
      case "CRYPTOUPDATEACCOUNT":
        setMainContent("Crypto Update Account");
        break;
      case "ETHEREUMTRANSACTION":
        setMainContent("Ethereum Transaction");
        break;
      case "FILEAPPEND":
        setMainContent("File Append");
        break;
      case "FILECREATE":
        setMainContent("File Create");
        break;
      case "FILEDELETE":
        setMainContent("File Delete");
        break;
      case "FILEUPDATE":
        setMainContent("File Update");
        break;
      case "FREEZE":
        setMainContent("Freeze");
        break;
      case "NODECREATE":
        setMainContent("Node Create");
        break;
      case "NODEDELETE":
        setMainContent("Node Delete");
        break;
      case "NODESTAKEUPDATE":
        setMainContent("Node Stake Update");
        break;
      case "NODEUPDATE":
        setMainContent("Node Update");
        break;
      case "SCHEDULECREATE":
        setMainContent("Schedule Create");
        break;
      case "SCHEDULEDELETE":
        setMainContent("Schedule Delete");
        break;
      case "SCHEDULESIGN":
        setMainContent("Schedule Sign");
        break;
      case "SYSTEMDELETE":
        setMainContent("System Delete");
        break;
      case "SYSTEMUNDELETE":
        setMainContent("System Undelete");
        break;
      case "TOKENASSOCIATE":
        setMainContent("Token Associate");
        break;
      case "TOKENBURN":
        setMainContent("Token Burn");
        break;
      case "TOKENCREATION":
        setMainContent("Token Creation");
        break;
      case "TOKENDELETION":
        setMainContent("Token Deletion");
        break;
      case "TOKENDISSOCIATE":
        setMainContent("Token Dissociate");
        break;
      case "TOKENFEESCHEDULEUPDATE":
        setMainContent("Token Fee Schedule Update");
        break;
      case "TOKENFREEZE":
        setMainContent("Token Freeze");
        break;
      case "TOKENGRANTKYC":
        setMainContent("Token Grant KYC");
        break;
      case "TOKENMINT":
        setMainContent("Token Mint");
        break;
      case "TOKENPAUSE":
        setMainContent("Token Pause");
        break;
      case "TOKENREJECT":
        setMainContent("Token Reject");
        break;
      case "TOKENREVOKEKYC":
        setMainContent("Token Revoke KYC");
        break;
      case "TOKENUNFREEZE":
        setMainContent("Token Unfreeze");
        break;
      case "TOKENUNPAUSE":
        setMainContent("Token Pause");
        break;
      case "TOKENUPDATE":
        setMainContent("Token Update");
        break;
      case "TOKENUPDATENFTS":
        setMainContent("Token Update NFTs");
        break;
      case "TOKENWIPE":
        setMainContent("Token Wipe");
        break;
      case "UNCHECKEDSUBMIT":
        setMainContent("Unchecked Submit");
        break;
      case "UNKNOWN":
        setMainContent("Unknown");
        break;
      case "UTILPRNG":
        setMainContent("Util Prng");
        break;
      default:
        console.error(
          `Error: No matching switch case was found for ${transactionInfo?.name} in transactionInfo.`
        );
        break;
    }
  }, [transactionInfo]);

  useEffect(() => {
    const fetchAndSetTokenLogo = async (chain: string, tokenId: string) => {
      const fetchedTokenLogo = await getTokenLogo(chain, tokenId);
      setTokenLogo(fetchedTokenLogo);
    };

    const fetchAndSetTokenId = async (tokenId: string) => {
      const fetchedTokenInfo = await getTokenInfo(tokenId);
      if (fetchedTokenInfo) {
        setTokenId(fetchedTokenInfo.name);
      }
    };

    const fetchAndSetAmount = async (
      passedTokenId: string,
      passedAmount: number
    ) => {
      const fetchedTokenInfo = await getTokenInfo(passedTokenId);
      if (fetchedTokenInfo) {
        const normalizedAmount =
          passedAmount / Math.pow(10, Number(fetchedTokenInfo.decimals));
        const formattedAmount = normalizedAmount.toFixed(
          Number(fetchedTokenInfo.decimals)
        ); // Needed, otherwise really small numbers are displayed using normalized scientific notation
        setAmount(formattedAmount);
      }
    };

    const processTransactionInfo = async () => {
      const selectedAccountId = getSelectedAccountFromLocalStorage()?.accountId;
      if (transactionInfo) {
        setTimeStamp(transactionInfo.consensus_timestamp);

        let caseType = "default";

        if (transactionInfo.token_transfers.length > 0) {
          caseType = "tokenTransfers";
        } else if (transactionInfo.nft_transfers.length > 0) {
          caseType = "nftTransfers";
        } else if (transactionInfo.staking_reward_transfers.length > 0) {
          caseType = "stakingRewardTransfers";
        } else if (transactionInfo.transfers.length > 0) {
          // This isn't really needed, mostly here just for reassurance
          caseType = "transfers";
        }

        switch (caseType) {
          case "tokenTransfers":
            await fetchAndSetAmount(
              transactionInfo.token_transfers[0].token_id,
              transactionInfo.token_transfers[0].amount
            );
            await fetchAndSetTokenId(
              transactionInfo?.token_transfers[0].token_id
            );
            await fetchAndSetTokenLogo(
              "hedera",
              transactionInfo.token_transfers[0].token_id
            );
            break;

          case "nftTransfers": {
            setMainContent("NFT Token Transfer");
            const nftTokenInfo = await getTokenInfo(
              transactionInfo.nft_transfers[0].token_id
            );
            if (nftTokenInfo) {
              setTokenId(nftTokenInfo?.name);
            } else {
              setTokenId("N/A");
            }
            setAmount("");
            setTokenLogo(null);
            break;
          }

          case "stakingRewardTransfers":
            setAmount(
              (
                transactionInfo.staking_reward_transfers[0].amount /
                Math.pow(10, 8)
              ).toFixed(8) // Tinybar to Hbar conversion
            );
            setTokenId("HBAR");
            await fetchAndSetTokenLogo("hedera", "HBAR");
            break;

          case "transfers":
            if (selectedAccountId) {
              const matchingTransfer = transactionInfo.transfers.find(
                (transfer) => transfer.account === selectedAccountId
              );
              if (matchingTransfer) {
                setAmount(
                  (matchingTransfer.amount / Math.pow(10, 8)).toFixed(8)
                ); // Tinybar to Hbar conversion
                setTokenId("HBAR");
                await fetchAndSetTokenLogo("hedera", "HBAR");
              }
            }
            break;

          default:
            setAmount("");
            setTokenId("N/A");
            setTokenLogo(null);
        }
      }
    };

    processTransactionInfo().catch((error) => {
      console.error("Error processing transaction info:", error);
    });
  }, [transactionInfo]);

  return (
    <>
      <div className="flex justify-between w-full p-3 font-robotoFlex text-black dark:text-white border-b border-black dark:border-ghost-900">
        <div className="text-left">
          <div className="flex justify-between">
            <div className="text-sm text-black dark:text-ghost-500">
              {timeStamp
                ? formatTimestamp(timeStamp)
                : "Error: Timestamp not found"}
            </div>
          </div>
          <div className="font-medium text-xl my-[1px]">{mainContent}</div>
          <div className="flex justify-between">
            <div className="relative text-sm text-black dark:text-ghost-500">
              {transactionInfo?.memo_base64
                ? atob(transactionInfo.memo_base64)
                : "N/A"}
            </div>
          </div>
        </div>
        <div className="text-right mr-2">
          <div className="flex text-lg items-center">
            <p>{amount}</p>
            <p className="ml-2">{tokenId}</p>
            {tokenLogo && (
              <p className="ml-2">
                <img
                  src={tokenLogo}
                  className="h-6 w-6 ml-2 scale-150 text-[6px] leading-[8px]"
                />
              </p>
            )}
          </div>
          <button className="mt-5 items-center mr-[2px]">
            <IoSearch className="text-black dark:text-primary-500 scale-[175%]" />
          </button>
        </div>
      </div>
    </>
  );
}
