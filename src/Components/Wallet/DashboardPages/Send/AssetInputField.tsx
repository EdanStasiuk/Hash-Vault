/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
import React, { useEffect, useState } from "react";
import {
  getAccountAssets,
  getTokenLogo,
} from "../../../../functions";
import { MirrorNodeTokenInfo } from "../../../../config/interfaces";
import { UseFormSetValue } from "react-hook-form";
import { SendFormData } from "../../../../config/interfaces";
import { MdOutlineArrowDropDown } from "react-icons/md";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import CircularIndeterminate from "../../../Miscelaneous/CircularIndeterminate";

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
 * @returns {JSX.Element} - An asset selection/input field.
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

  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  // Sets asset value in form and sets the chosenAsset state value
  const handleAssetClick = (symbol: string, token_id: string) => {
    console.log("token_id: ", token_id);
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
        const accountId = localStorage.getItem("accountId");
        if (!accountId) {
          throw new Error("Account ID not found in local storage");
        }
        let options = await getAccountAssets(accountId);

        // Separate hbar and other assets
        const hbarOption = options.find((option) => option.symbol === "hbar");
        const otherOptions = options.filter(
          (option) => option.symbol !== "hbar"
        );

        // Sort other assets alphabetically by name
        // eslint-disable-next-line @typescript-eslint/no-unsafe-return, @typescript-eslint/no-unsafe-call
        otherOptions.sort((a, b) => a.name.localeCompare(b.name));

        // Combine hbar at the beginning of the list
        if (hbarOption) {
          options = [hbarOption, ...otherOptions];
        } else {
          options = otherOptions;
        }

        setAssetOptions(options);

        const imageMap: AssetImageMap = {};
        await Promise.all(
          options.map(async (option) => {
            if (option.token_id === "") {
              const imageUrl = await getTokenLogo("hedera", "hbar");
              imageMap[option.token_id] = imageUrl;
            } else {
              try {
                const imageUrl = await getTokenLogo("hedera", option.token_id);
                imageMap[option.token_id] = imageUrl;
              } catch (error) {
                console.error(
                  `Error fetching token photo for ${option.token_id}:`,
                  error
                );
              }
            }
          })
        );
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
      <h2 className="text-white font-roboto text-xl font-light">{label}</h2>
      <button
        type="button"
        aria-label="more"
        aria-controls={open ? "asset-menu" : undefined}
        aria-haspopup="true"
        onClick={handleOpen}
        className="inline-flex items-center min-w-[125px] h-11 pl-1 pr-3 py-3 rounded-lg bg-transparent border border-solid border-primary-500 outline-none text-white text-xl font-roboto"
      >
        <div className="w-4 h-4 flex items-center">
          <MdOutlineArrowDropDown className="text-primary-500" />
        </div>
        <div className="flex items-center justify-between">
          <div className="w-7 h-7 ml-1">{<img src={assetImage} alt="" />}</div>
          <span className="text-white text-xl ml-[6px]">
            {chosenAssetSymbol}
          </span>
        </div>
      </button>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box className="absolute flex flex-col justify-between w-[500px] h-[520px] top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2 bg-background-500 rounded-lg px-6 pt-6 pb-2 border-solid border border-ghost-900">
          <div className="top-components">
            <Typography
              id="modal-modal-title"
              component="h2"
              className="border-b border-ghost-900 pb-2"
            >
              <div className="text-3xl font-medium text-white">
                Select Asset
              </div>
            </Typography>
            <div style={{ maxHeight: 350, overflowY: "auto" }} className="mt-3">
              {/* Scrollable container */}
              {loading ? (
                <div className="flex items-center justify-center h-96 text-white">
                  <CircularIndeterminate />
                </div>
              ) : (
                assetOptions.map((option) => (
                  <Typography
                    key={option.name}
                    id={option.token_id || ""}
                    component="div"
                    onClick={() => {
                      handleAssetClick(option.symbol, option.token_id);
                    }}
                  >
                    <div className="flex items-center text-white cursor-pointer hover:bg-backgroundAlt-500 p-3 rounded-lg">
                      <div
                        className={`mr-4 ${
                          !assetImages[option.token_id] &&
                          option.symbol.length > 5
                            ? "text-sm"
                            : "text-lg"
                        } text-center w-16`}
                      >
                        {
                          <img
                            src={assetImages[option.token_id]}
                            alt={option.symbol}
                          />
                        }
                      </div>
                      <div>
                        <div>Name: {option.name}</div>
                        {option.name !== "HBAR" && (
                          <div>Token ID: {option.token_id}</div>
                        )}
                        <div>Balance: {option.balance}</div>
                      </div>
                    </div>
                    <div className="border-solid border-b border-ghost-900"></div>
                  </Typography>
                ))
              )}
            </div>
          </div>
          <div className="bottom-components mb-4">
            <Typography component="div" className="flex justify-center mt-auto">
              <button
                onClick={() => {
                  handleClose();
                }}
                className="text-white text-lg bg-cancel-500 rounded-md py-[6px] px-9"
              >
                Cancel
              </button>
            </Typography>
          </div>
        </Box>
      </Modal>
    </div>
  );
}
