interface Props {
  lightMode?: boolean;
}

/**
 * Renders the main header for the application.
 *
 * @prop {boolean} string - A boolean representing whether the header is allowed to go into light mode; defaults to false.
 * @returns {JSX.Element} page header.
 */
export default function Header({ lightMode = false }: Props): JSX.Element {
  return (
    <div
      className={`Header ${
        lightMode
          ? "bg-backgroundLight-100 dark:bg-background-500"
          : "bg-background-500"
      }`}
    >
      <h1
        className={`font-roboto ${
          lightMode
            ? "text-backgroundLight-500 dark:text-primary-500"
            : "text-primary-500"
        } text-3xl tracking-logo grid justify-center py-6`}
      >
        Hash Vault
      </h1>
      <hr
        className={`${
          lightMode
            ? "border-backgroundLight-300 dark:border-primary-500"
            : "border-primary-500"
        } w-full`}
      />
    </div>
  );
}
