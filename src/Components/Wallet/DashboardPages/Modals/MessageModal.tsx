import { Box, Modal, Typography, Button } from "@mui/material";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  message: string;
}

/**
 * MessageModal Component
 *
 * A modal dialog for displaying a message to the user. This component is used to show confirmation, error, or informational messages
 * in a modal format with an "OK" button to close the modal.
 *
 * @component
 * @prop {boolean} isOpen - Boolean flag indicating whether the modal is currently open.
 * @prop {() => void} onClose - Function to be called when the modal is closed.
 * @prop {string} message - The message to be displayed within the modal.
 * 
 * @returns {JSX.Element} The modal dialog displaying the provided message.
 */
export default function MessageModal({ isOpen, onClose, message }: Props): JSX.Element {
  return (
    <Modal
      open={isOpen}
      onClose={onClose}
      aria-labelledby="confirmation-modal-title"
      aria-describedby="confirmation-modal-description"
      className="flex items-center justify-center text-backgroundLight-300"
    >
      <Box
        sx={{
          width: 400,
        }}
        className="p-6 shadow-md rounded-lg bg-backgroundLight-50 dark:bg-background-500 border-none dark:border dark:border-ghost-900"
      >
        <Typography
          id="confirmation-modal-title"
          variant="h6"
          component="h2"
          className="text-black dark:text-white"
        >
          <div className="text-xl text-center">{message}</div>
        </Typography>
        <Box className="flex justify-center mt-4">
          <Button onClick={onClose} color="primary" variant="contained">
            OK
          </Button>
        </Box>
      </Box>
    </Modal>
  );
}
