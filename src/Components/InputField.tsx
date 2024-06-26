import { useState } from "react";
import { PiEyeLight, PiEyeSlashLight } from "react-icons/pi";

interface Props {
  placeHolder?: string;
  value?: string;
  showInput?: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

/**
 * @prop {string} placeholder - An optional string that makes up the input field's placeholder; default is .
 * @prop {string} value - An optional string for setting a value in the field.
 * @prop {boolean} showInput - An optional boolean prop that sets visibility of input; default is false.
 *                            If false, input type is set to 'password', if true, type is set to 'text'.
 * * @prop {(e: React.ChangeEvent<HTMLInputElement>) => void} onChange - A required function that handles the input field's change event.
 * @returns an input field.
 */
export default function InputField({
  placeHolder = "",
  value,
  showInput = false,
  onChange,
}: React.PropsWithChildren<Props>) {
  const [visible, setVisible] = useState(showInput);

  const toggleVisibility = () => {
    setVisible(!visible);
  };

  return (
    <div className="relative h-12 w-[full] min-w-[200px]">
      <input
        className="peer h-full w-full rounded-[9px] border border-primary-500 border-t-transparent bg-transparent px-3 py-2.5 text-base font-normal text-ghost-500 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-primary-500 placeholder-shown:border-t-primary-500 focus:border-2 focus:border-primary-500 focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-ghost-500"
        placeholder=" "
        type={visible ? 'text' : 'password'}
        value={value}
        onChange={onChange}
        required
      />
      {visible && !showInput ? (
        <PiEyeLight
          className="absolute right-5 top-4 text-ghost-500 scale-x-150 scale-150 cursor-pointer"
          onClick={toggleVisibility}
        />
      ) : (
        !showInput && (
          <PiEyeSlashLight
            className="absolute right-5 top-4 text-ghost-500 scale-x-150 scale-150 cursor-pointer"
            onClick={toggleVisibility}
          />
        )
      )}
      <label className="before:content[' '] after:content[' '] pointer-events-none absolute flex -top-[6.6px] h-full w-full select-none text-[12px] font-sans font-extra-thin leading-tight text-ghost-500 transition-all before:pointer-events-none before:mt-[6.6px] before:mr-1 before:box-border before:block before:w-2.5 before:rounded-tl-[9px] before:rounded-bl-[2px] before:border-t before:border-l before:border-primary-500 before:transition-all after:pointer-events-none after:mt-[6.6px] after:ml-1 after:box-border after:block after:w-2.5 after:flex-grow after:rounded-tr-[9px] after:rounded-br-[2px] after:border-t after:border-r after:border-primary-500 after:transition-all peer-placeholder-shown:text-base peer-placeholder-shown:leading-[3.9] peer-placeholder-shown:text-ghost-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[12px] peer-focus:leading-tight peer-focus:text-primary-500 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:border-primary-500 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:border-primary-500 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-ghost-500">
        {placeHolder}
      </label>
    </div>
  );
}
