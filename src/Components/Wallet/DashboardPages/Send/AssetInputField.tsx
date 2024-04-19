import React, { useState } from "react";
import { UseFormSetValue } from "react-hook-form";
import { FormData } from "./Send";
import HBARLogo from "../../../../assets/SendPage/AssetLogos/hedera-logo.svg";
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import { MdOutlineArrowDropDown } from "react-icons/md";

interface Props {
  label: string;
  asset_logo?: React.ReactNode;
  asset_ticker?: string;
  setValue: UseFormSetValue<FormData>;
  assetOptions: string[];
}

const ITEM_HEIGHT = 48;

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
 * @prop {React.ReactNode} asset_logo - Optional asset logo within the selection field; defaults to the HBAR logo.
 * @prop {string} asset_ticker - Optional ticker symbol within the selection field; defaults to "HBAR".
 * @prop {string} assetOptions - List of strings containing the ticker symbols for the assets in the user's wallet.
 * @returns {JSX.Element} - An asset selection/input field.
 */
export default function AssetInputField({
  label,
  asset_logo = <img src={HBARLogo} alt="Logo" />,
  asset_ticker = "HBAR",
  setValue,
  assetOptions,
}: React.PropsWithChildren<Props>): JSX.Element {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleMenuItemClick = (value: string) => {
    setValue("asset", value);
    handleClose();
  };
  //TODO: Convert the drop down to a bigger pop up modal
  return (
    <div>
      <style>{styles}</style>
      <h2 className="text-white font-roboto text-xl font-light">{label}</h2>
      <div className="relative w-[120px]">
        <button
          type="button"
          aria-label="more"
          aria-controls={open ? 'asset-menu' : undefined}
          aria-haspopup="true"
          onClick={handleClick}
          className="w-[135px] h-11 pl-1 pr-3 py-3 rounded-lg rounded-l-none bg-transparent border border-solid border-primary-500 outline-none text-white text-xl font-roboto flex justify-between items-center"
        >
          <MdOutlineArrowDropDown className="flex text-primary-500 scale-90"/>
          <div className="flex scale-75">{asset_logo}</div>
          <span className="text-white text-xl">{asset_ticker}</span>
        </button>
        <Menu
          id="asset-menu"
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          PaperProps={{
            style: {
              maxHeight: ITEM_HEIGHT * 4.5,
              marginTop: "-1px",
              width: "14.1ch",
              backgroundColor: "#212229",
              color: "white",
              border: "1px solid #A489FA",
              borderRadius: "0px 10px 10px 10px",
            }
          }}
        >
          {assetOptions.map((option) => (
            <MenuItem
            sx={{
              paddingLeft: "69px",
              fontSize: "20px",
              backgroundColor: "#212229",
            }}
              key={option}
              selected={option === asset_ticker}
              onClick={() => {handleMenuItemClick(option)}}
            >
              {option}
            </MenuItem>
          ))}
        </Menu>
      </div>
    </div>
  );
}
