import { cva } from "class-variance-authority";
import { ButtonHeroIntent } from "../../config/types";
import { To, useNavigate } from "react-router-dom";
import { useState } from "react";

interface Props {
  intent?: ButtonHeroIntent;
  routerPath?: To;
  padding?: string;
}

/**
 * Variant styles.
 */
const button = cva(
  [
    "border-2",
    "rounded-3xl",
    "text-xl",
    "transition-all",
    "m-3",
    "transition-all duration-300 ease-in-out",
  ],
  {
    variants: {
      intent: {
        solid: ["text-background-500", "bg-primary-500", "border-primary-500"],
        outline: ["text-primary-500", "bg-transparent", "border-primary-500"],
      },
    },
  }
);

/**
 * ButtonHero component for primary display.
 *
 * Accepts children.
 * @prop {string} intent - Optional style of the button; defaults to "solid".
 * @prop {string} routerPath - Optional path to route to when the button is clicked; defaults to an empty string.
 * @prop {string} padding - Optional padding for the button; defaults to "p-12".
 * @returns {JSX.Element} - A button meant for primary display.
 */
export default function ButtonHero({
  children,
  intent = "solid",
  routerPath = "",
  padding = "p-12",
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
      className={button({ intent: currentIntent })}
      onMouseEnter={handleHoverIntent}
      onMouseLeave={handleHoverIntent}
    >
      <div className={padding}>
        {children}
      </div>
    </button>
  );
}
