import { useState } from "react";
import { copyToClipboard } from "../../../../../functions/functions";
import { MdContentCopy } from "react-icons/md";

interface Props {
  childDescriptor: string;
  childContent: string;
  copyable?: boolean;
}

/**
 * Renders an informational bar with an optional copy-to-clipboard feature.
 *
 * @prop {string} childDescriptor - A descriptor text displayed in the info bar.
 * @prop {string} childContent - The content text displayed in the info bar.
 * @prop {boolean} [copyable=false] - An optional flag indicating if the content is copyable.
 * @returns {JSX.Element} The info bar component.
 */
export default function InfoBar({
  childDescriptor,
  childContent,
  copyable = false,
}: Props): JSX.Element {
  const [copySuccess, setCopySuccess] = useState(false);

  const handleCopy = () => {
    copyToClipboard(childContent, setCopySuccess);
  };

  return (
    <div className="flex text-black dark:text-white border-backgroundLight-400 dark:border-ghost-900 border-b w-full p-4 place-items-baseline">
      <div className="w-[30%] flex items-center justify-between">
        <div className="flex text-xl font-semibold">
          {childDescriptor}
          {copySuccess && (
            <div className="ml-2 font-roboto font-normal text-black dark:text-primary-500 text-lg">
              Copied!
            </div>
          )}{" "}
          {/* TODO: Display copied message in a more aesthetic way */}
        </div>
      </div>
      <div className="flex">
        {copyable ? (
          <button
            onClick={handleCopy}
            className="text-lg font-roboto hover:text-background-200 dark:hover:text-primary-500"
          >
            <div className="flex">
              <button
                onClick={handleCopy}
                className="relative right-6 text-background-200 dark:text-primary-500 scale-[135%]"
              >
                <MdContentCopy />
              </button>
              <div className="relative right-4">{childContent}</div>
            </div>
          </button>
        ) : (
          <div className="text-lg font-robot">{childContent}</div>
        )}
      </div>
    </div>
  );
}
