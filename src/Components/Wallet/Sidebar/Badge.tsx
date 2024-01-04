import HbarLogoInverted from "../../../assets/Badge/HbarLogoInverted.svg";
import HbarLogoCropped from "../../../assets/Badge/HbarLogoCropped.svg";

interface Props {
  accountName?: string;
  accountNumber?: string;
  integerDigits?: string;
  fractionalDigits?: string;
}

/**
 * Renders a badge for the wallet sidebar.
 * 
 * @prop {string} accountName - Optional account name; defaults to "Account not found".
 * @prop {string} accountNumber - Optional account number; defaults to "Account #-1".
 * @prop {string} integerDigits - Optional digits in the wallet's balance left of the decimal place; defaults to "0".
 * @prop {string} fractionalDigits - Optional digits in the wallet's balance right of the decimal place; defaults to "000'000'000".
 * @returns {JSX.Element} - A badge component.
 */
export default function Badge({
  accountName = "Account not found",
  accountNumber = "Account #-1",
  integerDigits = "0",
  fractionalDigits = "000'000'000",
}: React.PropsWithChildren<Props>): JSX.Element {

  return (
    <div className="bg-gradient-to-t from-black from-10% to-[#3F2D83] rounded-2xl">
      <div className="relative font-robotoFlex border border-primary-500 h-40 w-full rounded-2xl mb-8 text-white overflow-hidden">
        <div className="absolute inset-0 h-[170px]">
          <img src={HbarLogoCropped} alt="Hbar Logo" className="w-full h-full object-cover" />
        </div>
        <div className="flex items-center">
          <img src={HbarLogoInverted} alt="Hbar Logo" className="w-20 h-20 scale-90" />
          <div className="font-thin text-lg leading-6 -m-1 z-10">
            <div className="text-sm leading-4">{accountNumber}</div>
            <div>{accountName}</div>
          </div>
        </div>
        <div className="inline-block font-light text-lg absolute bottom-4 left-5 items-center">
          HBAR
          <div className="inline font-extralight text-2xl ml-1">
            {integerDigits}.<span className="text-lg tracking-wide">{fractionalDigits}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
