import { useContext } from "react";
import "./Switch.css";
import { LightThemeContext } from "../../../../../config/contexts/contexts";

interface Props {
  isOn: boolean;
  handleToggle: () => void;
  id: string;
}

/**
 * Renders a toggle switch component.
 *
 * @prop {boolean} isOn - A boolean indicating if the switch is on.
 * @prop {function} handleToggle - A function to handle the toggle action.
 * @prop {string} id - The id for the switch input element.
 * @returns {JSX.Element} The toggle switch component.
 */
export default function Switch({
  isOn,
  handleToggle,
  id,
}: Props): JSX.Element {
  const lightTheme = useContext(LightThemeContext);
  
  /**
   * "#3E3E45" Tailwind backgroundAlt-900
   * "#B9B9B9" Tailwind backgroundLight-500
   * "#A489FA" Tailwind primary-500
   * "#B3C1FF" Tailwind secondary-400
   */
  const textColorOff =
    !lightTheme || document.documentElement.classList.contains("dark")
      ? "#3E3E45"
      : "#B9B9B9";
  const textColorOn =
    !lightTheme || document.documentElement.classList.contains("dark")
      ? "#A489FA"
      : "#B3C1FF";

  return (
    <>
      <input
        checked={isOn}
        onChange={handleToggle}
        className="react-switch-checkbox"
        id={id}
        type="checkbox"
      />
      <label
        style={{ background: isOn ? textColorOn : textColorOff }}
        className="react-switch-label"
        htmlFor={id}
      >
        <span className="react-switch-button" />
      </label>
    </>
  );
}
