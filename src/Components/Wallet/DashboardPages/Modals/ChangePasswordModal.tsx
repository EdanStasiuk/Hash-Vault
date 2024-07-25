import { useEffect, useState } from "react";
import { Box, Modal, Typography, Button } from "@mui/material";
import InputField from "../../../InputField";
import { changePasswordForSelectedWallet } from "../../../../functions/storageFunctions";
import MessageModal from "./MessageModal";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  oldPassword: string;
}

/**
 * ChangePasswordModal Component
 *
 * A modal dialog for changing the wallet password. This component handles the input of a new password, confirmation of the new password, 
 * and submission of the password change. It also manages the display of success or error messages based on the outcome of the password change.
 *
 * @component
 * @prop {boolean} isOpen - Boolean flag indicating whether the modal is currently open.
 * @prop {() => void} onClose - Function to be called when the modal is closed.
 * @prop {string} oldPassword - The current password of the wallet, used for verification before changing to the new password.
 * 
 * @returns {JSX.Element} The modal dialog with input fields for the new password and its confirmation, along with action buttons.
 */

export default function ChangePasswordModal({ isOpen, onClose, oldPassword }: Props): JSX.Element {
  const [newPassword, setNewPassword] = useState<string>("");
  const [confirmNewPassword, setConfirmNewPassword] = useState<string>("");
  const [confirmationOpen, setConfirmationOpen] = useState<boolean>(false);
  const [errorOpen, setErrorOpen] = useState<boolean>(false);

  useEffect(() => {
    if (!isOpen) {
      // Reset the password field when the modal is closed
      setNewPassword("");
      setConfirmNewPassword("");
    }
  }, [isOpen]);

  const handleNewPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewPassword(e.target.value);
  };

  const handleConfirmNewPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setConfirmNewPassword(e.target.value);
  };

  const handleConfirmPasswordChange = async () => {
    if (newPassword !== confirmNewPassword) {
      setErrorOpen(true);
      return;
    }
    try {
      await changePasswordForSelectedWallet(oldPassword, newPassword);
      setConfirmationOpen(true);
      onClose();
    } catch (error) {
      console.error("Failed to change password", error);
      setErrorOpen(true);
    }
  };

  const handleButtonClick = () => {
    handleConfirmPasswordChange().catch((error) => {
      console.error("Error handling password change:", error);
      setErrorOpen(true);
    });
  };

  return (
    <>
      <Modal
        open={isOpen}
        onClose={onClose}
        aria-labelledby="change-password-modal-title"
        aria-describedby="change-password-modal-description"
        className="flex items-center justify-center text-backgroundLight-300"
      >
        <Box
          sx={{
            width: 600,
          }}
          className="p-6 shadow-md rounded-lg wrap bg-backgroundLight-50 dark:bg-background-500 border-none dark:border dark:border-ghost-900"
        >
          <Typography
            id="change-password-modal-title"
            variant="h6"
            component="h2"
            className="text-black dark:text-white"
          >
            <div className="text-2xl">Change wallet password</div>
          </Typography>
          <div className="mt-4">
            <div className="mb-4">
              <InputField
                placeHolder="New Password"
                value={newPassword}
                allowLightMode={true}
                onChange={handleNewPasswordChange}
              />
            </div>
            <div className="mb-4">
              <InputField
                placeHolder="Confirm New Password"
                value={confirmNewPassword}
                allowLightMode={true}
                onChange={handleConfirmNewPasswordChange}
              />
            </div>
          </div>
          <Box className="flex justify-center mt-4">
            <div className="mr-4">
              <Button onClick={onClose} color="secondary" variant="contained">
                Cancel
              </Button>
            </div>
            <div className="">
              <Button onClick={handleButtonClick} color="primary" variant="contained">
                Confirm Password Change
              </Button>
            </div>
          </Box>
        </Box>
      </Modal>
      <MessageModal 
        isOpen={confirmationOpen} 
        onClose={() => {setConfirmationOpen(false)}} 
        message="Password Changed Successfully!" 
      />
      <MessageModal 
        isOpen={errorOpen} 
        onClose={() => {setErrorOpen(false)}} 
        message="Passwords do not match or an error occurred. Please try again." 
      />
    </>
  );
}
