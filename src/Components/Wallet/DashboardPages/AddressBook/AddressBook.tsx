import Subheader from "../../Subheader";

interface Props {
  onBackButtonClick?: () => void;
}

/**
 * Renders Address Book page information for dashboard.
 *
 * @prop {() => void} onBackButtonClick – Function to handle back button click in the case that
 *                                        the user needs to return a previous page.
 * @returns {JSX.Element} - Address Book page component.
 */
export default function AddressBook({
  onBackButtonClick,
}: React.PropsWithChildren<Props>): JSX.Element {
  return (
    <div>
      <Subheader label="Address Book" onBackButtonClick={onBackButtonClick}/>
    </div>
  );
}
