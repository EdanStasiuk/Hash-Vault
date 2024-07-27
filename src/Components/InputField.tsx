import { PiEyeLight, PiEyeSlashLight } from "react-icons/pi";
import { usePasswordVisibility } from "../config/contexts/PasswordVisibilityContext";
import { useEffect } from "react";

interface Props {
  placeHolder?: string;
  value?: string;
  showInput?: boolean;
  invalidInput?: boolean;
  invalidInputMessage?: string;
  allowLightMode?: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}
//TODO: Implement react-hook-form, make sure pressing enter on this field in Locked.tsx submits the form.
/**
 * @prop {string} placeholder - An optional string that makes up the input field's placeholder; default is .
 * @prop {string} value - An optional string for setting a value in the field.
 * @prop {boolean} showInput - An optional boolean prop that sets visibility of input; default is false.
 *                            If false, input type is set to 'password', if true, type is set to 'text'.
 * @prop {boolean} [invalidInput=false] - An optional boolean that changes the component if the user enters a wrong input.
 * @prop {string} [invalidInputMessage=undefined] - An optional message to display to the user if they enter invalid input into the field.
 * @prop {boolean} [allowLightMode=false] - An optional boolean representing whether the input field is allowed to go into light mode.
 * @prop {(e: React.ChangeEvent<HTMLInputElement>) => void} onChange - A required function that handles the input field's change event.
 * @returns an input field.
 */
export default function InputField({
  placeHolder = "", //TODO: There is a bug where if the placeholder is an empty string, there is a small gap in the top left border when the user is active in the field. Low priority fix.
  value,
  showInput = false,
  invalidInput = false,
  invalidInputMessage = undefined,
  allowLightMode = false,
  onChange,
}: React.PropsWithChildren<Props>) {
  const { visible, resetVisibility, toggleVisibility } =
    usePasswordVisibility();

  useEffect(() => {
    resetVisibility();
  }, []);

  return (
    <div className="relative h-12 w-[full] min-w-[200px]">
      <input
        className={`peer h-full w-full rounded-[9px] border ${
          invalidInput
            ? `${
                allowLightMode
                  ? "text-black dark:text-ghost-500"
                  : "text-ghost-500"
              } border-error-500 placeholder-shown:border-error-500 placeholder-shown:border-t-error-500 focus:border-error-500 `
            : `${
                allowLightMode
                  ? "text-black dark:text-ghost-500 border-black dark:border-primary-500 placeholder-shown:border-black dark:placeholder-shown:border-primary-500 placeholder-shown:border-t-black dark:placeholder-shown:border-t-primary-500 focus:border-black dark:focus:border-primary-500"
                  : "text-ghost-500 border-primary-500 placeholder-shown:border-primary-500 placeholder-shown:border-t-primary-500 focus:border-primary-500"
              }`
        } ${
          value ? "border-t-transparent dark:border-t-transparent" : ""
        } bg-transparent px-3 py-2.5 text-base font-normal outline outline-0 transition-all placeholder-shown:border focus:border-2 focus:border-t-transparent dark:focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-ghost-500`}
        placeholder=""
        type={visible || showInput ? "text" : "password"}
        value={value}
        onChange={onChange}
        required
      />
      {visible && !showInput ? (
        <PiEyeLight
          className={`${
            allowLightMode ? "text-black dark:text-ghost-500" : "text-ghost-500"
          } absolute right-5 top-4 scale-x-150 scale-150 cursor-pointer`}
          onClick={toggleVisibility}
        />
      ) : (
        !showInput && (
          <PiEyeSlashLight
            className={`${
              allowLightMode
                ? "text-black dark:text-ghost-500"
                : "text-ghost-500"
            } absolute right-5 top-4 scale-x-150 scale-150 cursor-pointer`}
            onClick={toggleVisibility}
          />
        )
      )}
      <label
        className={`before:content[' '] after:content[' '] pointer-events-none absolute flex -top-[6.6px] h-full w-full select-none text-[12px] font-sans font-extra-thin leading-tight transition-all before:pointer-events-none before:mt-[6.6px] before:mr-1 before:box-border before:block before:w-2.5 before:rounded-tl-[9px] before:rounded-bl-[2px] before:border-t before:border-l ${
          invalidInput
            ? "text-black dark:text-ghost-500 before:border-error-500 after:border-error-500 peer-focus:text-error-500 peer-focus:before:border-error-500 peer-focus:after:border-error-500"
            : `${
                allowLightMode
                  ? "text-black dark:text-ghost-500 peer-placeholder-shown:text-black dark:peer-placeholder-shown:text-ghost-500 before:border-black dark:before:border-primary-500 after:border-black dark:after:border-primary-500 peer-focus:text-black dark:peer-focus:text-primary-500 peer-focus:before:border-black dark:peer-focus:before:border-primary-500 peer-focus:after:border-black dark:peer-focus:after:border-primary-500"
                  : "text-ghost-500 peer-placeholder-shown:text-ghost-500 before:border-primary-500 after:border-primary-500 peer-focus:text-primary-500 peer-focus:before:border-primary-500 peer-focus:after:border-primary-500"
              }`
        } before:transition-all after:pointer-events-none after:mt-[6.6px] after:ml-1 after:box-border after:block after:w-2.5 after:flex-grow after:rounded-tr-[9px] after:rounded-br-[2px] after:border-t after:border-r after:transition-all peer-placeholder-shown:text-base peer-placeholder-shown:leading-[3.9] peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[12px] peer-focus:leading-tight peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-ghost-500`}
      >
        {invalidInput ? invalidInputMessage : placeHolder}
      </label>
    </div>
  );
}
