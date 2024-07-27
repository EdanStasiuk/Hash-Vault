import { UseFormGetValues, UseFormRegister, UseFormSetValue } from "react-hook-form";
import { SendFormData } from "../../../../config/interfaces";
import { getTokenBalance } from "../../../../functions/functions";
import { getSelectedAccountFromLocalStorage } from "../../../../functions/storageFunctions";

interface Props {
  label: string;
  placeHolder?: string;
  register: UseFormRegister<SendFormData>;
  setValue: UseFormSetValue<SendFormData>;
  getValues: UseFormGetValues<SendFormData>;
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
 * @prop {UseFormRegister<SendFormData>} register - Method used to register or select element and apply validation 
 *                                              rules to an input with the React Hook Form.
 * @prop {UseFormSetValue<SendFormData>} setValue - Function that dynamically sets the value of a registered field, and
 *                                              has the options to validate and update the form state.
 * @prop {UseFormGetValues<SendFormData>} getValues - Function that dynamically gets the value(s) of a registered field.
 * @returns {JSX.Element} An amount input field.
 */
export default function AmountInputField({
  label,
  placeHolder = "",
  register,
  setValue,
  getValues,
}: React.PropsWithChildren<Props>): JSX.Element {
  
  return (
    <div>
      <p className="text-black dark:text-white font-roboto text-xl font-normal dark:font-light">{label}</p>
      <div className="relative w-80">
        <style>{styles}</style>
        <input
          className="w-80 h-11 p-3 pr-16 rounded-lg bg-transparent border border-solid border-backgroundLight-600 dark:border-primary-500 outline-none text-black dark:text-white text-xl font-roboto placeholder-backgroundLight-500 dark:placeholder-ghost-500"
          placeholder={placeHolder}
          type="number"
          step=".0000001"
          {...register("amount", {
            required: true,
            min: 0,
            max: Number.MAX_SAFE_INTEGER
          })}
        />

        <button
          type="button"
          className="text-black dark:text-white text-xl font-medium dark:font-normal absolute right-3 top-[8px]"
          // eslint-disable-next-line @typescript-eslint/no-misused-promises
          onClick={async () => {
            const accountId = getSelectedAccountFromLocalStorage()?.accountId;

            if (!accountId) {
              console.error("Account ID not found in localStorage");
              // TODO: Handle the error appropriately, maybe prompt the user to select an account or provide a way to input the account ID
            } else {
              const currentChosenAsset = getValues("asset");
              const balance = await getTokenBalance(currentChosenAsset, accountId);
  
              if (balance !== null) {
                setValue("amount", balance, { // TODO: small numbers get displayed using scientific notation, ex. 2e-8, change so all decimals are shown when displayed
                  shouldValidate: true,
                  shouldDirty: true,
                });
              } else {
                // TODO: Handle the case where balance is null
                console.error("Error retrieving account balance");
              }
            }
          }}
        >
          Max.
        </button>
      </div>
    </div>
  );
}
