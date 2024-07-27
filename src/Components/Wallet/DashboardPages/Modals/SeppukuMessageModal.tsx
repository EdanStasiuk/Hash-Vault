import { Box, Modal, Typography, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

/**
 * SeppukuMessageModal Component
 *
 * A modal dialog that informs the user that all wallet data has been successfully deleted. This component
 * also provides a button that redirects the user to the landing page.
 *
 * @component
 * @prop {boolean} isOpen - Boolean flag indicating whether the modal is currently open.
 * @prop {() => void} onClose - Function to be called when the modal is closed.
 * 
 * @returns {JSX.Element} The modal dialog displaying a data deletion confirmation message and a button to redirect to the landing page.
 */
export default function SeppukuMessageModal({
  isOpen,
  onClose,
}: Props): JSX.Element {
  const navigate = useNavigate();
  const handleRedirect = () => {
    navigate("/");
  };

  return (
    <Modal
      open={isOpen}
      onClose={onClose}
      aria-labelledby="data-deleted-modal-title"
      aria-describedby="data-deleted-modal-description"
      className="flex items-center justify-center text-backgroundLight-300"
    >
      <Box
        sx={{
          width: 400,
          bgcolor: "background.paper",
        }}
        className="p-6 shadow-md rounded-lg bg-backgroundLight-50 dark:bg-background-500 border-none dark:border dark:border-ghost-900"
      >
        <Typography
          id="data-deleted-modal-title"
          variant="h6"
          component="h2"
          className="text-black dark:text-white"
        >
          <div className="text-xl">Data Deleted</div>
        </Typography>
        <Typography
          id="data-deleted-modal-description"
          variant="body1"
          className="mt-4 text-black dark:text-white"
        >
          All your wallet data, including Address Book information, settings information, and all imported wallets, has been successfully deleted.
        </Typography>
        <Box className="flex justify-center mt-4">
          <Button
            onClick={handleRedirect}
            color="primary"
            variant="contained"
          >
            Go to Landing Page
          </Button>
        </Box>
      </Box>
    </Modal>
  );
}
