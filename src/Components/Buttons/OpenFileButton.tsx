import { cva } from "class-variance-authority";
import { ButtonHeroIntent } from "../../config/types";
import { To, useNavigate } from "react-router-dom";
import { useState } from "react";

interface Props {
  intent?: ButtonHeroIntent;
  routerPath?: To;
}

/**
 * Variant styles.
 */
const openFileButton = cva(
  [
    "flex",
    "place-items-center",
    "justify-center",
    "text-xl",
    "h-18",
    "rounded-3xl",
    "transition-all",
    "transition-all duration-300 ease-in-out",
    "space-x-condense",
    "m-3",
    "px-12",
    "border-2",
  ],
  {
    variants: {
      intent: {
        solid: [
          "text-background-500",
          "bg-secondary-500",
          "border-secondary-500",
        ],
        outline: [
          "text-secondary-500",
          "bg-transparent",
          "border-secondary-500",
        ],
      },
    },
  }
);

/**
 * Renders an open file button with variant styles.
 *
 * Accepts children.
 * @prop {string} intent - Optional style of the button; defaults to "solid".
 * @prop {string} routerPath - Optional path to route to when the button is clicked; defaults to an empty string.
 * @returns {JSX.Element} - A button component with variant styles.
 */
export default function OpenFileButton({
  children,
  intent = "solid",
  routerPath = "",
}: React.PropsWithChildren<Props>): JSX.Element {
  const [hovered, setHovered] = useState(false);
  const navigate = useNavigate();

  const handleHoverIntent = () => {
    setHovered(!hovered);
  };
  const currentIntent = hovered ? "solid" : intent;
  return (
    <button
      onClick={() => {
        navigate(routerPath);
      }}
      className={openFileButton({ intent: currentIntent })}
      onMouseEnter={handleHoverIntent}
      onMouseLeave={handleHoverIntent}
    >
      {children}
    </button>
  );
}
