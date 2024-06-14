import { IconType } from "react-icons";

interface Props {
  mainText: string;
  description: string;
  icon: IconType;
  borderStyle: string;
}

/**
 * Renders a settings button with an icon, main text, and description.
 *
 * @prop {string} mainText - The main text displayed on the button.
 * @prop {string} description - The description text displayed below the main text.
 * @prop {IconType} icon - The icon component to be displayed on the button.
 * @prop {string} borderStyle - The border style for the button; needed because the buttons are stacked.
 * @returns {JSX.Element} The settings button component.
 */
export default function SettingsButton({
  mainText,
  description,
  icon: Icon,
  borderStyle,
}: Props): JSX.Element {
  return (
    <button className={`flex ${borderStyle} border-ghost-900 hover:bg-background-500 w-full p-3 items-center`}>
      <div className="ml-2 mr-6">
        <Icon size={44} />
      </div>
      <div className="text-left">
        <div className="text-2xl text-white">{mainText}</div>
        <div className="text-ghost-500">{description}</div>
      </div>
    </button>
  );
}
