import HBARLogo from "../../../../assets/SendPage/AssetLogos/hedera-logo.svg";

interface Props {
  label: string;
  asset_logo?: React.ReactNode;
  asset_ticker?: string;
}

/**
 * Renders an asset selection/input field. For use on the send page within the wallet dashboard.
 * 
 * @prop {string} label - Label located above the input field.
 * @prop {React.ReactNode} asset_logo - Optional asset logo within the selection field; defaults to the HBAR logo.
 * @prop {string} asset_ticker - Optional ticker symbol within the selection field; defaults to "HBAR".
 * @returns {JSX.Element} - An asset selection/input field.
 */
export default function AssetInputField({
  label,
  asset_logo = <img src={HBARLogo} alt="Logo" />,
  asset_ticker = "HBAR"
}: React.PropsWithChildren<Props>): JSX.Element {
  return (
    <div>
      <h2 className="text-white font-roboto text-xl font-light">
        {label}
      </h2>
      <div className="relative w-[120px]">
        <button
          className="w-[120px] h-11 pl-1 pr-3 py-3 rounded-lg rounded-l-none bg-transparent border border-solid border-primary-500 outline-none text-white text-xl font-roboto flex justify-between items-center" // Added justify-between
        >
          <div className="flex scale-95">
            {asset_logo}
          </div>
          <span className="text-white text-xl">
            {asset_ticker}
          </span>
        </button>
      </div>
    </div>
  );
}
