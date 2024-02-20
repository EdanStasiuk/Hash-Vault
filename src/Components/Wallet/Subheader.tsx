import { IoChevronBack } from "react-icons/io5";

interface Props {
  label: string,
  onBackButtonClick?: () => void;
}

/**
 * Renders a subheader for the wallet dashboard.
 *
 * @prop {string} label - Title of the subheader.
 * @prop {() => void} onBackButtonClick - Function to handle back button click in the case that
 *                                        the user needs to return a previous page.
 * @returns {JSX.Element} - A subheader component.
 */
export default function Subheader({
  label,
  onBackButtonClick
}: React.PropsWithChildren<Props>): JSX.Element {
  return (
    <div className="flex border-b border-primary-500 text-3xl font-roboto text-white mb-3">
      {onBackButtonClick && (
        <button className="mr-2 pb-1" onClick={onBackButtonClick}>
          <IoChevronBack />
        </button>
      )}
      {label}
    </div>
  );
}
