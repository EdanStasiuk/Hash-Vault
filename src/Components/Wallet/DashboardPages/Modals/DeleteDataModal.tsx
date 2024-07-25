import { Box, Modal, Typography, Button } from "@mui/material";

interface DeleteDataModalProps {
  isOpen: boolean;
  onClose: () => void;
  setShowDeleteDataModal: React.Dispatch<React.SetStateAction<boolean>>;
  setShowSeppukuMessageModal: React.Dispatch<React.SetStateAction<boolean>>;
}

/**
 * DeleteDataModal Component
 *
 * A modal dialog for confirming the deletion of all wallet data. This component prompts the user to confirm their action,
 * deletes the data from localStorage, and triggers the display of a follow-up message modal.
 *
 * @component
 * @prop {boolean} isOpen - Boolean flag indicating whether the modal is currently open.
 * @prop {() => void} onClose - Function to be called when the modal is closed.
 * @prop {React.Dispatch<React.SetStateAction<boolean>>} setShowDeleteDataModal - Function to set the visibility of the DeleteDataModal.
 * @prop {React.Dispatch<React.SetStateAction<boolean>>} setShowSepPukuMessageModal - Function to set the visibility of the SepPukuMessageModal.
 *
 * @returns {JSX.Element} The modal dialog with a confirmation message and action buttons.
 */
export default function DeleteDataModal({
  isOpen,
  onClose,
  setShowDeleteDataModal,
  setShowSeppukuMessageModal,
}: DeleteDataModalProps): JSX.Element {
  const handleConfirmDeleteData = () => {
    localStorage.removeItem("accounts");
    localStorage.removeItem("settings");
    localStorage.removeItem("tokenLogos");
    localStorage.removeItem("addressBook");
    // sessionStorage.removeItem("walletUnlocked")
    // console.log("Data has been deleted.");

    // Close the delete data modal and open the SePpukuMessageModal
    setShowDeleteDataModal(false);
    setShowSeppukuMessageModal(true);
  };

  return (
    <Modal
      open={isOpen}
      onClose={onClose}
      aria-labelledby="delete-data-modal-title"
      aria-describedby="delete-data-modal-description"
      className="flex items-center justify-center text-backgroundLight-300"
    >
      <Box
        sx={{
          width: 400,
        }}
        className="p-6 shadow-md rounded-lg bg-backgroundLight-50 dark:bg-background-500 border-none dark:border dark:border-ghost-900"
      >
        <Typography
          id="delete-data-modal-title"
          variant="h6"
          component="h2"
          className="text-black dark:text-white"
        >
          <div className="text-xl">Confirm Data Deletion</div>
        </Typography>
        <Typography
          id="delete-data-modal-description"
          variant="body1"
          className="mt-4 text-black dark:text-white"
        >
          <p className="mt-4">
            Are you sure you want to delete all wallet data, including Address
            Book contacts, saved settings preferences, and all imported wallets?
            This action cannot be undone.
          </p>
          <p className="mt-4">
            To access your wallet(s) again, you will have to reimport them using
            their respective unique seed phrase.
          </p>
          <p className="mt-4">
            You will be sent back to the landing page once your data is deleted.
          </p>
        </Typography>
        <Box className="flex justify-center mt-6">
          <Button
            onClick={onClose}
            color="secondary"
            variant="contained"
            sx={{ mr: 2 }}
          >
            Cancel
          </Button>
          <Button
            onClick={handleConfirmDeleteData}
            color="error"
            variant="contained"
          >
            Delete Data
          </Button>
        </Box>
      </Box>
    </Modal>
  );
}
