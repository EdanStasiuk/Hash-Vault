import { UseFormRegister, UseFormSetValue } from "react-hook-form";
import { FormData } from "./Send";

interface Props {
  label: string;
  placeHolder?: string;
  unstakedTotal: number;
  register: UseFormRegister<FormData>;
  setValue: UseFormSetValue<FormData>;
}

// Hides the toggle arrows on the number input field
const styles = `
  /* Chrome, Safari, Edge, Opera */
  input::-webkit-outer-spin-button,
  input::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

  /* Firefox */
  input[type=number] {
    -moz-appearance: textfield;
  }
`;

/**
 * Renders an amount input field. For use on the Send page within the wallet dashboard.
 *
 * @prop {string} label - Label located above the input field.
 * @prop {string} placeHolder - Optional placeholder located within the input field; defaults to an empty string.
 * @prop {number} unstakedTotal - The total amount of unstaked currency that can be sent.
 * @prop {UseFormRegister<FormData>} register - Method used to register or select element and apply validation 
 *                                              rules to an input with the React Hook Form.
 * @prop {UseFormSetValue<FormData>} setValue - Function that dynamically sets the value of a registered field, and
 *                                              has the options to validate and update the form state.
 * @returns {JSX.Element} - An amount input field.
 */
export default function AmountInputField({
  label,
  placeHolder = "",
  register,
  unstakedTotal = 0,
  setValue,
}: React.PropsWithChildren<Props>): JSX.Element {
  
  return (
    <div>
      <p className="text-white font-roboto text-xl font-light">{label}</p>
      <div className="relative w-80">
        <style>{styles}</style>
        <input
          className="w-80 h-11 p-3 pr-16 rounded-lg rounded-r-none bg-transparent border border-solid border-primary-500 outline-none text-white text-xl font-roboto placeholder-ghost-500"
          placeholder={placeHolder}
          type="number"
          step=".01"
          {...register("amount", {
            required: true,
            min: 0,
            max: Number.MAX_SAFE_INTEGER
          })}
        />

        <button
          type="button"
          className="text-white text-xl absolute right-3 top-[8px]"
          onClick={() => {
            setValue("amount", unstakedTotal, {
              shouldValidate: true,
              shouldDirty: true,
            });
          }}
        >
          Max.
        </button>
      </div>
    </div>
  );
}
