import React, { useContext, useEffect, useState } from "react";
import {
  getAccountAssets,
  getTokenLogo,
} from "../../../../functions/functions";
import { MirrorNodeTokenInfo } from "../../../../config/interfaces";
import { UseFormSetValue } from "react-hook-form";
import { SendFormData } from "../../../../config/interfaces";
import { MdOutlineArrowDropDown } from "react-icons/md";
import { getSelectedAccountFromLocalStorage } from "../../../../functions/storageFunctions";
import { LockedScreenActiveContext } from "../../../../config/contexts/contexts";
import SelectAssetModal from "../Modals/SelectAssetModal";

interface Props {
  label: string;
  setValue: UseFormSetValue<SendFormData>;
}

type AssetImageMap = Record<string, string>;

// Override Mui-selected class
const styles = `
  .Mui-selected {
    background-color: transparent !important;
  }
`;

/**
 * Renders an asset selection/input field. For use on the send page within the wallet dashboard.
 *
 * @prop {string} label - Label located above the input field.
 * @prop {UseFormSetValue<SendFormData>} setValue - Function that dynamically sets the value of a registered field, and
 *                                              has the options to validate and update the form state.
 * @returns {JSX.Element} An asset selection/input field.
 */
export default function AssetInputField({
  label,
  setValue,
}: React.PropsWithChildren<Props>): JSX.Element {
  const [open, setOpen] = useState(false);
  const [chosenAsset, setChosenAsset] = useState("");
  const [chosenAssetSymbol, setChosenAssetSymbol] = useState("");
  const [assetOptions, setAssetOptions] = useState<MirrorNodeTokenInfo[]>([]);
  const [assetImage, setAssetImage] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);
  const [assetImages, setAssetImages] = useState<AssetImageMap>({});
  const lockedScreenActive = useContext(LockedScreenActiveContext);

  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  // Closes the model if the locked screen appears.
  // Locked screen input field doesn't recognize the user otherwise.
  useEffect(() => {
    if (lockedScreenActive) {
      setOpen(false);
    }
  }, [lockedScreenActive]);

  // Sets asset value in form and sets the chosenAsset state value
  const handleAssetClick = (symbol: string, token_id: string) => {
    // console.log("token_id: ", token_id);
    if (token_id === "") {
      setValue("asset", "hedera-hashgraph");
      setChosenAsset("hbar");
    } else {
      setValue("asset", token_id);
      setChosenAsset(token_id);
    }

    setChosenAssetSymbol(symbol);
    handleClose();
  };

  // Fetch the chosenAsset logo
  useEffect(() => {
    const fetchImage = async () => {
      if (chosenAsset) {
        try {
          const imageUrl = await getTokenLogo("hedera", chosenAsset);
          setAssetImage(imageUrl);
        } catch (error) {
          console.error("Error fetching token photo:", error);
        }
      }
    };

    fetchImage().catch((error) => {
      console.error("Error in fetchImage:", error);
    });
  }, [chosenAsset]);

  // Fetch asset options and their logos
  // To be displayed in alphabetical order with hbar first
  useEffect(() => {
    const fetchAssets = async () => {
      try {
        const accountId = getSelectedAccountFromLocalStorage()?.accountId;
        if (!accountId) {
          throw new Error("Account ID not found in local storage");
        }
        let options = await getAccountAssets(accountId);

        // Separate hbar and other assets
        const hbarOption = options.find(
          (option) => option.symbol.toLowerCase() === "hbar"
        );
        const otherOptions = options.filter(
          (option) => option.symbol.toLowerCase() !== "hbar"
        );

        // Sort other assets alphabetically by name
        otherOptions.sort((a, b) => a.name.localeCompare(b.name));

        // Combine hbar at the beginning of the list
        if (hbarOption) {
          options = [hbarOption, ...otherOptions];
        } else {
          options = otherOptions;
        }

        setAssetOptions(options);

        const imageMap: AssetImageMap = {};
        const promises = options.map(async (option) => {
          let logoUrl = "";

          // Check if the logo exists in local storage
          const localStorageKey = "tokenLogos";
          const tokenLogos = JSON.parse(
            localStorage.getItem(localStorageKey) || "[]"
          ) as { address: string; url: string }[];
          const existingLogo = tokenLogos.find(
            (logo) => logo.address === option.token_id
          );

          if (existingLogo?.url) {
            logoUrl = existingLogo.url;
          } else {
            // Logo doesn't exist in local storage, fetch it from API
            try {
              if (option.token_id === "") {
                logoUrl = await getTokenLogo("hedera", "hbar");
              } else {
                logoUrl = await getTokenLogo("hedera", option.token_id);
              }
            } catch (error) {
              console.error(
                `Error fetching token photo for ${option.token_id}:`,
                error
              );
            }
          }

          // If logoUrl is available, update the imageMap
          if (logoUrl) {
            imageMap[option.token_id] = logoUrl;
          }

          return { address: option.token_id, url: logoUrl };
        });

        const logoUpdates = await Promise.all(promises);

        // Update local storage with all fetched logos
        const localStorageKey = "tokenLogos";
        const tokenLogos = JSON.parse(
          localStorage.getItem(localStorageKey) || "[]"
        ) as { address: string; url: string }[];
        logoUpdates.forEach((logo) => {
          if (logo.url) {
            const existingIndex = tokenLogos.findIndex(
              (l) => l.address === logo.address
            );
            if (existingIndex !== -1) {
              tokenLogos[existingIndex] = logo;
            } else {
              tokenLogos.push(logo);
            }
          }
        });
        localStorage.setItem(localStorageKey, JSON.stringify(tokenLogos));

        setAssetImages(imageMap);

        setLoading(false);
      } catch (error) {
        console.error("Error fetching asset options:", error);
        setLoading(false);
      }
    };

    fetchAssets().catch((error) => {
      console.error("Error in fetchAssets:", error);
    });
  }, []);

  return (
    <div>
      <style>{styles}</style>
      <h2 className="text-black dark:text-white font-roboto text-xl font-normal dark:font-light">
        {label}
      </h2>
      <button
        type="button"
        aria-label="more"
        aria-controls={open ? "asset-menu" : undefined}
        aria-haspopup="true"
        onClick={handleOpen}
        className="inline-flex items-center min-w-[125px] h-11 pl-1 pr-3 py-3 rounded-lg bg-transparent border border-solid border-backgroundLight-600 dark:border-primary-500 outline-none text-black dark:text-white text-xl font-roboto"
      >
        <div className="w-4 h-4 flex items-center">
          <MdOutlineArrowDropDown className="text-black dark:text-primary-500" />
        </div>
        <div className="flex items-center justify-between">
          <div className="w-7 h-7 ml-1">{<img src={assetImage} alt="" />}</div>{" "}
          {/* // TODO: the chosenLogo image isn't being pulled from local storage when offline, even though they're being pulled for the scrollable list */}
          <span className="text-black dark:text-white text-xl ml-[6px]">
            {chosenAssetSymbol}
          </span>
        </div>
      </button>

      <SelectAssetModal
        open={open}
        handleClose={handleClose}
        loading={loading}
        assetOptions={assetOptions}
        assetImages={assetImages}
        handleAssetClick={handleAssetClick}
      />
    </div>
  );
}
