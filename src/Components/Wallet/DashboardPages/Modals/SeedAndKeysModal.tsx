import { Box, Modal, Typography, Button } from "@mui/material";
import { Mnemonic, PrivateKey, PublicKey } from "@hashgraph/sdk";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  publicKey: PublicKey | null;
  privateKey: PrivateKey | null;
  mnemonic: Mnemonic | null;
}

/**
 * KeyModal Component
 *
 * A modal dialog for displaying the public key, private key, and mnemonic seed phrase of a wallet. This component is used
 * to provide the user with their cryptographic keys and seed phrase in a secure and readable format.
 *
 * @component
 * @prop {boolean} isOpen - Boolean flag indicating whether the modal is currently open.
 * @prop {() => void} onClose - Function to be called when the modal is closed.
 * @prop {PublicKey | null} publicKey - The public key of the wallet, displayed in the modal.
 * @prop {PrivateKey | null} privateKey - The private key of the wallet, displayed in the modal.
 * @prop {Mnemonic | null} mnemonic - The mnemonic seed phrase of the wallet, displayed in the modal.
 *
 * @returns {JSX.Element} The modal dialog with the public key, private key, and mnemonic seed phrase.
 */
export default function SeedAndKeysModal({
  isOpen,
  onClose,
  publicKey,
  privateKey,
  mnemonic,
}: Props): JSX.Element {
  return (
    <Modal
      open={isOpen}
      onClose={onClose}
      aria-labelledby="key-modal-title"
      aria-describedby="key-modal-description"
      className="flex items-center justify-center text-backgroundLight-300"
    >
      <Box
        sx={{
          width: 600,
          bgcolor: "background.paper",
        }}
        className="p-6 shadow-md rounded-lg wrap bg-backgroundLight-500 dark:bg-background-500 border-none dark:border dark:border-ghost-900"
      >
        <Typography
          id="key-modal-title"
          variant="h6"
          component="h2"
          className="text-black dark:text-white"
        >
          <div className="text-2xl">Keys and Seed Phrase</div>
        </Typography>
        <div className="mt-4 text-black dark:text-white">
          <div className="mb-2">
            <Typography
              variant="body1"
              component="p"
              sx={{ wordWrap: "break-word", overflowWrap: "anywhere" }}
            >
              <div className="p-2 border border-secondary-400 dark:border-ghost-900 rounded-md">
                <strong className="text-black dark:text-white">
                  Public Key:
                </strong>{" "}
                {publicKey?.toStringDer()}
              </div>
            </Typography>
          </div>
          <div className="mb-2">
            <Typography
              variant="body1"
              component="p"
              sx={{ wordWrap: "break-word", overflowWrap: "anywhere" }}
            >
              <div className="p-2 border border-secondary-400 dark:border-ghost-900 rounded-md">
                <strong className="text-black dark:text-white">
                  Private Key:
                </strong>
                <p>{privateKey?.toStringDer()}</p>
              </div>
            </Typography>
          </div>
          <div className="mb-2">
            <Typography
              variant="body1"
              component="p"
              sx={{ wordWrap: "break-word", overflowWrap: "anywhere" }}
            >
              <div className="p-2 border border-secondary-400 dark:border-ghost-900 rounded-md">
                <strong className="text-black dark:text-white">
                  Seed Phrase:
                </strong>{" "}
                <p>{mnemonic?.toString()}</p>
              </div>
            </Typography>
          </div>
        </div>
        <Box className="flex justify-center mt-4">
          <Button onClick={onClose} color="primary" variant="contained">
            Close
          </Button>
        </Box>
      </Box>
    </Modal>
  );
}
