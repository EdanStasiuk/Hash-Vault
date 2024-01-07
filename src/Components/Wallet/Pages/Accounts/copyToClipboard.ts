export const copyToClipboard = (
  content: string,
  setCopySuccess: React.Dispatch<React.SetStateAction<boolean>>
) => {
  navigator.clipboard
    .writeText(content)
    .then(() => {
      setCopySuccess(true);
      setTimeout(() => {
        setCopySuccess(false);
      }, 1500); // Reset copy success message after 1.5 seconds
    })
    .catch((err) => {
      console.error("Failed to copy:", err);
    });
};
