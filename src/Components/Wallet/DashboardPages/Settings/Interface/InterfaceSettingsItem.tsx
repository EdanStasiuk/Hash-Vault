interface Props {
  itemText: string;
}

/**
 * Renders an interface settings item with a text description and optional children.
 *
 * @prop {string} itemText - The text description for the settings item.
 * @prop {React.ReactNode} children - Optional children elements to be rendered alongside the text.
 * @returns {JSX.Element} The interface settings item component.
 */
export default function InterfaceSettingsItem({
  children,
  itemText,
}: React.PropsWithChildren<Props>): JSX.Element {
  return (
    <div className="flex items-center w-full">
      <div className="flex items-center w-[110px]">
        {children}
      </div>
      <div className="text-xl text-white font-robotoFlex font-thin w-10/12">
        {itemText}
      </div>
    </div>
  );
}
