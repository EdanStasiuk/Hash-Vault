import { UseFormRegister } from "react-hook-form";
import { FormData } from "./Send";

interface Props {
  label: string;
  register: UseFormRegister<FormData>
}

/**
 * @prop {string} label - Label for the memo field.
 * @prop {UseFormRegister<FormData>} register - Method used to register or select apply validation 
 *                                              rules to an input with the React Hook Form. 
 * @returns {JSX.Element} - A memo input field.
*/
export default function MemoInputField({
  label,
  register,
}: React.PropsWithChildren<Props>): JSX.Element {
  return (
    <div>
      <p className="text-white font-roboto text-xl font-light">{label}</p>
      <textarea
        className="resize-none w-[600px] h-28 px-3 py-2 rounded-lg bg-transparent border border-solid border-primary-500 outline-none text-white text-lg font-light font-roboto placeholder-ghost-500"
        {...register("memo", { required: false })}
      />
    </div>
  );
}
