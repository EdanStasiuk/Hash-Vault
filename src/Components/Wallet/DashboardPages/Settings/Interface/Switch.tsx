import "./Switch.css";

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
export default function Switch({ isOn, handleToggle, id }: Props): JSX.Element {
  const textColorOff = "#3E3E45"; // Tailwind backgroundAlt-500
  const textColorOn = "#A489FA"; // Tailwind primary-500

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
