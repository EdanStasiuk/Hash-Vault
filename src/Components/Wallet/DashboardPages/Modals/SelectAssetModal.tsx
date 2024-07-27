import { Box, Typography, Modal } from "@mui/material";
import CircularIndeterminate from "../../../Miscelaneous/CircularIndeterminate";
import { MirrorNodeTokenInfo } from "../../../../config/interfaces";

interface Props {
  open: boolean;
  handleClose: () => void;
  loading: boolean;
  assetOptions: MirrorNodeTokenInfo[];
  assetImages: Record<string, string>;
  handleAssetClick: (symbol: string, token_id: string) => void;
}

/**
 * Renders a modal for selecting an asset.
 *
 * @component
 * @prop {boolean} open - Boolean indicating whether the modal is open or closed.
 * @prop {() => void} handleClose - Function to handle the closing of the modal.
 * @prop {boolean} loading - Boolean indicating whether the assets are loading.
 * @prop {MirrorNodeTokenInfo[]} assetOptions - Array of asset options to display.
 * @prop {Record<string, string>} assetImages - Object mapping asset token IDs to image URLs.
 * @prop {(symbol: string, token_id: string) => void} handleAssetClick - Function to handle clicking on an asset.
 * @returns {JSX.Element} A modal component for selecting an asset.
 */
export default function SelectAssetModal({
  open,
  handleClose,
  loading,
  assetOptions,
  assetImages,
  handleAssetClick,
}: Props): JSX.Element {
  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
      style={{ zIndex: 1040 }}
    >
      <Box className="absolute flex flex-col justify-between w-[500px] h-[520px] top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2 bg-backgroundLight-100 dark:bg-background-500 rounded-lg px-6 pt-6 pb-2 border-solid border border-backgroundLight-400 dark:border-ghost-900">
        <div className="top-components">
          <Typography
            id="modal-modal-title"
            component="h2"
            className="border-b border-backgroundLight-400 dark:border-ghost-900 pb-2"
          >
            <div className="text-3xl font-medium text-black dark:text-white">
              Select Asset
            </div>
          </Typography>
          <div style={{ maxHeight: 350, overflowY: "auto" }} className="mt-3">
            {/* Scrollable container */}
            {loading ? (
              <div className="flex items-center justify-center h-96 text-black dark:text-white">
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
                  <div className="flex items-center text-black dark:text-white cursor-pointer hover:bg-backgroundLight-200 dark:hover:bg-backgroundAlt-500 p-3">
                    <div
                      className={`mr-4 ${
                        !assetImages[option.token_id] && option.symbol.length > 5
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
                  <div className="border-solid border-b border-backgroundLight-400 dark:border-ghost-900"></div>
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
  );
}
