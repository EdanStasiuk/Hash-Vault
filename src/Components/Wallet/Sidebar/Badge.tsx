
import { useContext } from "react";
import HbarLogoInverted from "../../../assets/Badge/HbarLogoInverted.svg";
import HbarLogoCropped from "../../../assets/Badge/HbarLogoCropped.svg";
import HbarLogoCroppedLight from "../../../assets/Badge/HbarLogoCroppedLight.svg";
import { BadgeValuesContext, LightThemeContext } from "../../../config/contexts";

/**
 * Renders a badge for the wallet sidebar.
 *
 * @returns {JSX.Element} A badge component.
 */
export default function Badge(): JSX.Element {
  const lightTheme = useContext(LightThemeContext);
  const BadgeValues = useContext(BadgeValuesContext); // The selected wallet's information
  
  // Choose logo based on lightTheme setting
  const logoSrc =
    !lightTheme || document.documentElement.classList.contains("dark")
      ? HbarLogoCropped
      : HbarLogoCroppedLight;

  return (
    <div className="bg-backgroundLight-200 dark:bg-gradient-to-t dark:from-black dark:from-10% dark:to-[#3F2D83] rounded-2xl shadow-lg shadow-background-200/80 dark:shadow-none">
      <div className="relative font-robotoFlex dark:border dark:border-primary-500 h-40 w-full rounded-2xl mb-8 text-black dark:text-white overflow-hidden">
        <div className="absolute inset-0 h-[170px]">
          <img
            src={logoSrc}
            alt="Hbar Logo"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="flex items-center">
          <img
            src={HbarLogoInverted}
            alt="Hbar Logo"
            className="w-20 h-20 scale-90 invert dark:invert-0"
          />
          <div className="font-thin text-lg leading-6 -m-1 z-10">
            <div className="text-sm leading-4">
              Account #{BadgeValues.accountNumberForDisplay}
            </div>
            <div>{BadgeValues.accountNameForDisplay}</div>
          </div>
        </div>
        <div className="inline-block font-light text-lg absolute bottom-4 left-5 items-center">
          HBAR
          <div className="inline font-extralight text-2xl ml-1">
            {BadgeValues.leftOfDecimal}.
            <span className="text-lg tracking-wide">
              {BadgeValues.rightOfDecimal}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
