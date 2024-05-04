import React, { useEffect, useState } from "react";
import { fetchAssetLogos } from "../../../../functions";
import { UseFormSetValue } from "react-hook-form";
import { FormData } from "./Send";
import { MdOutlineArrowDropDown } from "react-icons/md";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { Asset } from "../../../../pages/Wallet/Dashboard";

interface Props {
  label: string;
  assetOptions: Asset[];
  setValue: UseFormSetValue<FormData>;
}

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
 * @prop {string} assetOptions - List of strings containing the ticker symbols for the assets in the user's wallet.
 * @prop {UseFormSetValue<FormData>} setValue - Function that dynamically sets the value of a registered field, and
 *                                              has the options to validate and update the form state.
 * @returns {JSX.Element} - An asset selection/input field.
 */
export default function AssetInputField({
  label,
  assetOptions,
  setValue,
}: React.PropsWithChildren<Props>): JSX.Element {
  const [open, setOpen] = useState(false);
  const [chosenAsset, setChosenAsset] = useState("");
  const [chosenAssetLogo, setChosenAssetLogo] = useState<React.ReactNode>();
  const [assetLogos, setAssetLogos] = useState<Record<string, string>>({});

  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const handleAssetClick = (value: string) => {
    setValue("asset", value);
    setChosenAsset(value);
    handleClose();
  };

  // Fetch asset logos
  useEffect(() => {
    fetchAssetLogos(assetOptions)
      .then((updatedLogos) => {
        setAssetLogos(updatedLogos);
      })
      .catch((error) => {
        console.error("Error in fetchAssetLogos:", error); // TODO: Display error message to user
      });
  }, [assetOptions]);

  // Set the chosen logo for placement in the asset input field
  useEffect(() => {
    setChosenAssetLogo(
      <img src={assetLogos[chosenAsset]} alt={""} /> // display nothing when the logo isn't retrieved
    );
  }, [chosenAsset, assetLogos]);

  return (
    <div>
      <style>{styles}</style>
      <h2 className="text-white font-roboto text-xl font-light">{label}</h2>
      <div className="relative w-[120px]">
        <button
          type="button"
          aria-label="more"
          aria-controls={open ? "asset-menu" : undefined}
          aria-haspopup="true"
          onClick={handleOpen}
          className="flex items-center w-[145px] h-11 pl-1 pr-3 py-3 rounded-lg rounded-l-none bg-transparent border border-solid border-primary-500 outline-none text-white text-xl font-roboto"
        >
          <div className="w-4 h-4 flex items-center">
            <MdOutlineArrowDropDown className="text-primary-500" />
          </div>
          <div className="flex items-center justify-between">
            <div className="w-7 h-7 ml-1">{chosenAssetLogo}</div>
            <span className="text-white text-xl ml-[6px]">{chosenAsset}</span>
          </div>
        </button>
        <div>
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
                <div
                  style={{ maxHeight: 350, overflowY: "auto" }}
                  className="mt-3"
                >
                  {/* Scrollable container */}
                  {assetOptions.map((option) => (
                    <Typography
                      key={option.name}
                      id={option.tokenId}
                      component="div"
                      onClick={() => {
                        handleAssetClick(option.name);
                      }}
                    >
                      <div className="flex items-center text-white cursor-pointer hover:bg-backgroundAlt-500 p-3 rounded-lg">
                        <img
                          src={assetLogos[option.name]}
                          alt={`${option.name}`}
                          className="mr-4 max-w-[100px] w-16"
                        />
                        <div>
                          <div>Name: {option.name}</div>
                          <div>Token ID: {option.tokenId}</div>
                          <div>Balance: {option.balance}</div>
                        </div>
                      </div>
                      <div className="border-solid border-b border-ghost-900"></div>
                    </Typography>
                  ))}
                </div>
              </div>
              <div className="bottom-components mb-4">
                <Typography
                  component="div"
                  className="flex justify-center mt-auto"
                >
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
      </div>
    </div>
  );
}
