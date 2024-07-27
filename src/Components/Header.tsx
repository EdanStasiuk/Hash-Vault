interface Props {
  allowLightMode?: boolean;
  headerTitle?: string;
}

/**
 * Renders the main header for the application.
 *
 * @prop {boolean} allowLightMode - A boolean representing whether the header is allowed to go into light mode; defaults to false.
 * @prop {string} headerTitle - A string to be displayed as the title of the header component.
 * @returns {JSX.Element} page header.
 */
export default function Header({
  allowLightMode = false,
  headerTitle = "Hash Vault",
}: Props): JSX.Element {
  return (
    <div
      className={`Header ${
        allowLightMode
          ? "bg-backgroundLight-100 dark:bg-background-500"
          : "bg-background-500"
      }`}
    >
      <h1
        className={`font-roboto ${
          allowLightMode
            ? "text-backgroundLight-500 dark:text-primary-500"
            : "text-primary-500"
        } text-3xl tracking-logo grid justify-center py-6`}
      >
        {headerTitle}
      </h1>
      <hr
        className={`${
          allowLightMode
            ? "border-backgroundLight-300 dark:border-primary-500"
            : "border-primary-500"
        } w-full`}
      />
    </div>
  );
}
