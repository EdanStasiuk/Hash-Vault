import { useState } from "react";
import { motion } from "framer-motion";
import Subheader from "../../Subheader";
import AddressInputField from "./AddressInputField";
import AmountInputField from "./AmountInputField";
import AssetInputField from "./AssetSelectField";
import MemoInputField from "./MemoInputField";
import SendButton from "./SendButton";
import AddressBook from "../AddressBook/AddressBook";

/**
 * Renders Send page information for dashboard.
 *
 * @returns {JSX.Element} - Send page component.
 */
export default function Send(): JSX.Element {
  const [showAddressBook, setShowAddressBook] = useState(false);

  const handleAddressBookClick = () => {
    setShowAddressBook(true);
  };

  const handleBackButtonClick = () => {
    setShowAddressBook(false);
  };

  // Need the padding p-6, otherwise the send button gets cut off when it swells on hover. 
  // This extra padding is compensated for in a reduction of margin in the parent Dashboard component.
  return (
    <div className="relative w-full overflow-x-hidden p-6">
      <motion.div
        initial={{ x: showAddressBook ? 0 : "100%" }}
        animate={{ x: showAddressBook ? 0 : "100%" }}
        transition={{ duration: 0.5 }}
        style={{ position: "absolute", width: "100%", margin: 0}}
      >
        <AddressBook onBackButtonClick={handleBackButtonClick}/>
      </motion.div>
      <motion.div
        initial={{ x: 0 }}
        animate={{ x: showAddressBook ? "-110%" : 0 }}
        transition={{ duration: 0.5 }}
        style={{ position: "relative", width: "100%", margin: 0}}
      >
        <>
          <Subheader label="Send" />
          <div className="addressField mt-5">
            <AddressInputField
              label="Address"
              placeHolder="0.0.000000-xxxxx"
              onAddressBookClick={handleAddressBookClick}
            />
          </div>
          <div className="amountAndAssetFields flex mt-8">
            <AmountInputField label="Amount" placeHolder="0.00" />
            <AssetInputField label="Select Asset" />
          </div>
          <div className="conversionField text-ghost-500 ml-1 text-xl">
            <span>≈ </span>
            {/* {currencySymbol} */}
            {/* {convertedTotal} */}
          </div>
          <div className="memoField mt-6">
            <MemoInputField label="Memo" />
          </div>
          <div className="sendButton mt-12">
            <SendButton disabled={false} />
          </div>
        </>
      </motion.div>
    </div>
  );
}
