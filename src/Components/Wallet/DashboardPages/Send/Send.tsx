import Subheader from "../../Subheader";
import AddressInputField from "./AddressInputField";
import AmountInputField from "./AmountInputField";
import AssetInputField from "./AssetSelectField";
import MemoInputField from "./MemoInputField";
import SendButton from "./SendButton";

/**
 * Renders Send page information for dashboard.
 *
 * @returns {JSX.Element} - Send page component.
 */
export default function Send(): JSX.Element {

  return (
    <div>
      <Subheader label="Send" />

      <div className="addressField mt-5">
        <AddressInputField
          label="Address"
          placeHolder="0.0.000000-xxxxx"
        />
      </div>
      <div className="amountAndAssetFields flex mt-8">
        <AmountInputField
          label="Amount"
          placeHolder="0.00"
        />
        <AssetInputField 
          label="Select Asset"
        />
      </div>
      <div className="conversionField text-ghost-500 ml-1 text-xl">
        <span>≈ </span>
        {/* {currencySymbol} */}
        {/* {convertedTotal} */}
      </div>
      <div className="memoField mt-6">
        <MemoInputField label="Memo"/>
      </div>
      <div className="sendButton mt-12">
        <SendButton disabled={false}/>
      </div>
    </div>
  );
}
