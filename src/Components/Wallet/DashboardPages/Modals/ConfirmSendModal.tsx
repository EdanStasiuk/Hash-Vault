import { Box, Modal, Typography, Button } from "@mui/material";
import { SendFormData } from "../../../../config/interfaces";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  sendFormData?: SendFormData | null;
}

/**
 * Renders a modal to confirm sending crypto from the user's wallet.
 *
 * @component
 * @prop {boolean} isOpen - Boolean indicating whether the modal is open or closed.
 * @prop {() => void} onClose - Function to handle the closing of the modal.
 * @prop {() => void} onConfirm - Function to handle the confirmation of the send action.
 * @prop {SendFormData | null} [sendFormData=undefined] - The send form data. Manditory for this component. //TOOD: Restructure the modal chaining so that sendFormData has to be defined
 * @returns {JSX.Element} A modal component for confirming sending crypto from the user's wallet.
 */
export default function ConfirmSendModal({
  isOpen,
  onClose,
  onConfirm,
  sendFormData,
}: Props): JSX.Element {
  return (
    <Modal
      open={isOpen}
      onClose={onClose}
      aria-labelledby="confirm-send-title"
      aria-describedby="confirm-send-description"
      className="flex items-center justify-center"
    >
      <Box
        sx={{
          width: 450,
          boxShadow: 24,
        }}
        className="p-6 rounded-lg bg-backgroundLight-50 dark:bg-background-500 border-none dark:border dark:border-ghost-900"
      >
        <Typography
          id="confirm-send-title"
          variant="h6"
          component="h2"
          className="text-black dark:text-white"
        >
          Confirm Send
        </Typography>
        <div className="mt-2">
          <Typography className="text-black dark:text-white p-2 border rounded-t-md border-secondary-500 dark:border-primary-500">
            <strong>Address:</strong> {sendFormData?.address || "N/A"}
          </Typography>
          <Typography className="text-black dark:text-white p-2 border-x border-secondary-500 dark:border-primary-500">
            <strong>Amount:</strong> {sendFormData?.amount || "N/A"}
          </Typography>
          <Typography className="text-black dark:text-white p-2 border-x border-t border-secondary-500 dark:border-primary-500">
            <strong>Asset:</strong> {sendFormData?.asset || "N/A"}
          </Typography>
          <Typography className="text-black dark:text-white p-2 border rounded-b-md border-secondary-500 dark:border-primary-500">
            <strong>Memo:</strong>
            <div className="rounded-md max-h-[150px] overflow-x-auto" > {/* TODO: scrollbar for sufficiently lengthy text doesn't have a border radius */}
            {sendFormData?.memo || "N/A"}
            </div>
          </Typography>
        </div>
        <Box className="flex justify-center mt-4">
          <Button
            onClick={onClose}
            color="secondary"
            variant="outlined"
            sx={{ mr: 3 }}
          >
            Cancel
          </Button>
          <Button
            onClick={onConfirm}
            color="primary"
            variant="contained"
          >
            Confirm
          </Button>
        </Box>
      </Box>
    </Modal>
  );
}
