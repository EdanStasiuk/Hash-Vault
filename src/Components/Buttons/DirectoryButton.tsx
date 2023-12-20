import { cva } from "class-variance-authority";
import { ButtonIntent } from "../constants";
import { To, useNavigate } from "react-router-dom";

interface Props {
  intent?: ButtonIntent;
  routerPath?: To;
  disabled?: boolean;
  history: boolean;
}

/**
 * Variant styles.
 */
const button = cva(
  [
    "flex",
    "border-2",
    "place-items-center",
    "justify-center",
    "text-xl",
    "h-12",
    "w-72",
    "rounded-xl",
    "transition-all",
    "space-x-condense",
    "m-3",
    "px-12",
    "shrink-0",
  ],
  {
    variants: {
      intent: {
        solid: [
          "text-background-500",
          "bg-secondary-500",
          "border-secondary-500",
          "hover:scale-103",
        ],
        outline: [
          "text-secondary-500",
          "bg-transparent",
          "border-secondary-500",
          "hover:scale-103",
        ],
        dead: [
          "text-ghost-500", 
          "bg-transparent", 
          "border-ghost-500"
        ],
      },
    },
  }
);

/**
 * DirectoryButton component for navigating to a different page.
 * 
 * Accepts children.
 * @prop {string} intent - Optional style of the button; defaults to "solid".
 * @prop {string} routerPath - Optional path to route to when the button is clicked; defaults to an empty string.
 * @prop {boolean} disabled - Optional boolean value controlling whether the button is active; defaults to false (inactive).
 * @prop {boolean} history - Boolean value controlling button behavior:
 *                            If true, the button sends the user back 1 page in their browser history.
 *                            If false, the button routes to the value passed in through the 'routerPath' prop.
 * @returns {JSX.Element} - A button that routes the user to a different page.
 */
export default function DirectoryButton({
  children,
  intent = "solid",
  routerPath = "",
  disabled = false,
  history,
}: React.PropsWithChildren<Props & { disabled?: boolean }>) {
  const navigate = useNavigate();

  const decideNavigationType = () => {
    history ? navigate(-1) : navigate(routerPath);
  };

  return (
    <button
      onClick={() => {decideNavigationType()}}
      className={button({ intent })}
      disabled={disabled}
    >
      {children}
    </button>
  );
}
