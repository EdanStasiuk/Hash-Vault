interface Props {
  label: string,
}

/**
 * Renders a subheader for the wallet dashboard.
 *
 * @prop {string} label - Title of the subheader.
 * @returns {JSX.Element} - A subheader component.
 */
export default function Subheader({
  label,
}: React.PropsWithChildren<Props>): JSX.Element {
  return (
    <div className="border-b border-primary-500 text-3xl font-roboto text-white mb-3">
        {label}
    </div>
  );
}
