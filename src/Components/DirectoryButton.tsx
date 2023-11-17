import { cva } from "class-variance-authority";
import { ButtonIntent } from "./constants";
import { To, useNavigate } from "react-router-dom";

interface Props {
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  intent?: ButtonIntent;
  routerPath?: To;
  disabled?: boolean;
  history: boolean;
}

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

export default function DirectoryButton({
  children,
  intent,
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
      onClick={() => decideNavigationType()}
      className={button({ intent })}
      disabled={disabled}
    >
      {children}
    </button>
  );
}
