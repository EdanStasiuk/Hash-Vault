import { UseFormRegister } from "react-hook-form";
import { SendFormData } from "../../../../config/interfaces";

interface Props {
  label: string;
  register: UseFormRegister<SendFormData>
}

/**
 * @prop {string} label - Label for the memo field.
 * @prop {UseFormRegister<SendFormData>} register - Method used to register or select apply validation 
 *                                              rules to an input with the React Hook Form. 
 * @returns {JSX.Element} A memo input field.
*/
export default function MemoInputField({
  label,
  register,
}: React.PropsWithChildren<Props>): JSX.Element {
  return (
    <div>
      <p className="text-black dark:text-white font-roboto text-xl font-normal dark:font-light">{label}</p>
      <textarea
        //TODO: any need for placeholder? //TODO: The background of the scrollbar doesn't have border radius
        className="resize-none w-[600px] h-28 px-3 py-2 rounded-lg bg-transparent border border-solid border-backgroundLight-600 dark:border-primary-500 outline-none text-black dark:text-white text-lg font-normal dark:font-light font-roboto placeholder-backgroundLight-500 dark:placeholder-ghost-500"
        {...register("memo", { required: false })}
      />
    </div>
  );
}
