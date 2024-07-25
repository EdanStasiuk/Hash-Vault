import { useContext, useEffect, useState } from "react";
import { Box, Modal, Typography, Button } from "@mui/material";
import {
  decryptSelectedAccountMnemonic,
  getSelectedAccountFromLocalStorage,
} from "../../../../functions/storageFunctions";
import InputField from "../../../InputField";
import { SetLockedScreenActiveContext } from "../../../../config/contexts/contexts";
import { Mnemonic, PrivateKey, PublicKey } from "@hashgraph/sdk";
import KeyModal from "./KeyModal";
import ChangePasswordModal from "./ChangePasswordModal";
import DeleteDataModal from "./DeleteDataModal";
import SeppukuMessageModal from "./SeppukuMessageModal";
import { useNavigate } from "react-router-dom";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (password: string) => void;
  onSubmitAction: string;
}

/**
 * Renders a modal prompting the user for their wallet password. 
 * This modal is used for various actions such as showing keys, changing password, 
 * or deleting all data within the wallet dashboard.
 *
 * @component
 * @prop {boolean} isOpen - Boolean indicating whether the modal is open or closed.
 * @prop {() => void} onClose - Function to handle the closing of the modal.
 * @prop {(password: string) => void} onSubmit - Function to handle the submission of the password.
 * @prop {string} onSubmitAction - Action to perform upon successful password submission. 
 *                                 Accepted values are "showKeys", "changePassword", and "deleteAllData".
 * @returns {JSX.Element} A modal component for password input.
 */
export default function PasswordPromptModal({
  isOpen,
  onClose,
  onSubmit,
  onSubmitAction,
}: Props): JSX.Element {
  const [password, setPassword] = useState<string>("");
  const [wrongPassword, setWrongPassword] = useState<boolean>(false);
  const [publicKey, setPublicKey] = useState<PublicKey | null>(null);
  const [privateKey, setPrivateKey] = useState<PrivateKey | null>(null);
  const [mnemonic, setMnemonic] = useState<Mnemonic | null>(null);
  const [showKeyModal, setShowKeyModal] = useState<boolean>(false);
  const [showChangePasswordModal, setShowChangePasswordModal] =
    useState<boolean>(false);
  const [showDeleteDataModal, setShowDeleteDataModal] =
    useState<boolean>(false);
  const [showSeppukuMessageModal, setShowSeppukuMessageModal] =
    useState<boolean>(false);
  const [retainPassword, setRetainPassword] = useState<boolean>(false);
  const setLockedScreenActive = useContext(SetLockedScreenActiveContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!isOpen) {
      // Clear password only if it's not retained for the ChangePasswordModal
      if (!retainPassword) {
        setPassword("");
        setWrongPassword(false);
      }
    }
  }, [isOpen, retainPassword]);

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handleSubmit = () => {
    unlockWallet()
      .then(() => {
        setWrongPassword(false);
        onSubmit(password);
      })
      .catch((error) => {
        setWrongPassword(true);
        console.error("Error unlocking wallet:", error);
      });
  };

  const unlockWallet = async () => {
    const decryptedMnemonic = await decryptSelectedAccountMnemonic(password);
    if (decryptedMnemonic) {
      if (onSubmitAction === "showKeys") {
        const privateKey =
          await decryptedMnemonic.toStandardECDSAsecp256k1PrivateKey();
        const publicKey = privateKey.publicKey;
        setLockedScreenActive(false);
        setPrivateKey(privateKey);
        setPublicKey(publicKey);
        setMnemonic(decryptedMnemonic);
        setShowKeyModal(true);
      } else if (onSubmitAction === "changePassword") {
        // Retain the password for ChangePasswordModal
        setRetainPassword(true);
        setShowChangePasswordModal(true);
      } else if (onSubmitAction === "deleteAllData") {
        setShowDeleteDataModal(true);
      } else {
        console.error("Error: No action specified for on password submit.");
      }
    }
  };

  return (
    <>
      <Modal
        open={isOpen}
        onClose={() => {
          onClose();
          setRetainPassword(false);
        }}
        aria-labelledby="password-prompt-title"
        aria-describedby="password-prompt-description"
        className="flex items-center justify-center"
      >
        <Box
          sx={{
            width: 400,
            boxShadow: 24,
          }}
          className="p-6 rounded-lg bg-backgroundLight-50 dark:bg-background-500 border-none dark:border dark:border-ghost-900"
        >
          <Typography
            id="password-prompt-title"
            variant="h6"
            component="h2"
            className="text-black dark:text-white"
          >
            Enter Wallet Password for{" "}
            {getSelectedAccountFromLocalStorage()?.accountName ||
              "Account Name N/A"}
          </Typography>
          <div className="mt-2">
            <InputField
              placeHolder="Password"
              value={password}
              invalidInput={wrongPassword}
              invalidInputMessage={"Wrong password. Try again."}
              allowLightMode={true}
              onChange={handlePasswordChange}
            />
          </div>
          <Box className="flex justify-center mt-4">
            <Button
              onClick={() => {
                onClose();
                setRetainPassword(false); // Ensure retainPassword is reset
              }}
              color="secondary"
              variant="outlined"
              sx={{ mr: 3 }}
            >
              Cancel
            </Button>
            <Button onClick={handleSubmit} color="primary" variant="contained">
              Submit
            </Button>
          </Box>
        </Box>
      </Modal>

      <KeyModal
        isOpen={showKeyModal}
        onClose={() => {
          setShowKeyModal(false);
        }}
        publicKey={publicKey}
        privateKey={privateKey}
        mnemonic={mnemonic}
      />

      <ChangePasswordModal
        isOpen={showChangePasswordModal}
        onClose={() => {
          setShowChangePasswordModal(false);
          setRetainPassword(false);
        }}
        oldPassword={password}
      />

      <DeleteDataModal
        isOpen={showDeleteDataModal}
        onClose={() => {
          setShowDeleteDataModal(false);
        }}
        setShowDeleteDataModal={setShowDeleteDataModal}
        setShowSeppukuMessageModal={setShowSeppukuMessageModal}
      />

      <SeppukuMessageModal
        isOpen={showSeppukuMessageModal}
        onClose={() => {
          setShowSeppukuMessageModal(false);
          navigate("/");
        }}
      />
    </>
  );
}
