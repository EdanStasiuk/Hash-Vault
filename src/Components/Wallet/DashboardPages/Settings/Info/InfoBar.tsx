import { useState } from "react";
import { copyToClipboard } from "../../../../../functions";
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
    <div className="flex text-white border-ghost-900 border-b w-full p-4 items-baseline">
      <div className="w-[30%] flex items-center justify-between">
        <div className="flex text-xl font-semibold items-baseline">
          {childDescriptor}
          {copySuccess && (
            <div className="ml-2 font-roboto font-normal text-primary-500 text-lg">Copied!</div>
          )} {/* TODO: Display this in a better way */}
        </div>
        {copyable && (
          <button
            onClick={handleCopy}
            className="mr-2 text-primary-500 scale-150"
          >
            <MdContentCopy />
          </button>
        )}
      </div>
      <div className="flex-1">
        <div className="text-lg font-roboto">{childContent}</div>
      </div>
    </div>
  );
}
