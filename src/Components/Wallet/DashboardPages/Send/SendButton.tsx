import { cva } from "class-variance-authority";
import { SendButtonIntent } from "../../../constants";
import { LiaChevronCircleRightSolid } from "react-icons/lia";

interface Props {
  disabled?: boolean;
}

/**
 * Variant styles.
 */
const button = cva(
  [
    "flex",
    "items-center",
    "justify-between",
    "w-[104px]",
    "h-11",
    "px-[14px]",
    "rounded-lg",
    "bg-background-500",
    "border",
    "border-solid",
    "text-xl",
    "font-light",
    "font-robotoFlex",
    "transition-all duration-[0.4s]"
  ],
  {
    variants: {
      intent: {
        active: [
          "text-primary-500",
          "bg-background-500",
          "border-primary-500",
          "hover:scale-103",
        ],
        dead: ["text-ghost-500", "bg-transparent", "border-ghost-500"],
      },
    },
  }
);

/**
 * @prop {boolean} disabled - Optional boolean value that controls the functionality and style intent
 *                            of the SendButton component; defaults to false. 
 * @returns {JSX.Element} - A send button component.
 */
export default function SendButton({
  disabled = false,
}: React.PropsWithChildren<Props>): JSX.Element {
  const intent: SendButtonIntent = disabled ? "dead" : "active";
  return (
    <div className="flex items-center">
      <button 
        className={button({ intent })}
        disabled={disabled}
        type="submit"
      >
        <span>Send</span>
        <LiaChevronCircleRightSolid className="scale-125" />
      </button>
    </div>
  );
}
