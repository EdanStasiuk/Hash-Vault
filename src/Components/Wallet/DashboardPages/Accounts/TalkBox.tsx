import { useEffect } from "react";

interface Props {
  copySuccess: boolean;
  setCopySuccess: React.Dispatch<React.SetStateAction<boolean>>;
}

/**
 * A speech bubble component to indicate a successful copy action.
 * Note: The TalkBox component needs to reside within a tag of relative position.
 * 
 * @prop {boolean} copySuccess - Indicates whether the copy action was successful.
 * @prop {React.Dispatch<React.SetStateAction<boolean>>} setCopySuccess - Function to set the copy success state.
 * @returns {JSX.Element} - The TalkBox component.
 */
export default function TalkBox({
  copySuccess,
  setCopySuccess,
}: React.PropsWithChildren<Props>): JSX.Element {
  useEffect(() => {
    if (copySuccess) {
      const timer = setTimeout(() => {
        setCopySuccess(false);
      }, 2000); // Hide after 2 seconds=

      return () => {
        clearTimeout(timer);
      };
    }
  }, [copySuccess]);

  return (
    <div
      className="talk-box-container left-[50%] translate-x-[-50%] top-[-42px] absolute"
    >
      <div className="talk-box tracking-normal bg-secondary-500 dark:bg-primary-500 text-white text-base font-sans font-normal py-[6px] px-[14px] rounded-lg relative inline-block">
        <span>Copied!</span>
        <div
          className="triangle absolute w-0 h-0 border-solid border-x-8 border-x-transparent border-t-8 border-t-secondary-500 dark:border-t-primary-500 -bottom-[0.4em] left-[50%] translate-x-[-50%]"
        ></div>
      </div>
    </div>
  );
}
