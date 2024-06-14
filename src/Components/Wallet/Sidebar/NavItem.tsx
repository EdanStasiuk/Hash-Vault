import { motion } from "framer-motion";
import React from "react";

interface Props {
  label: string;
  isActive?: boolean;
  onClick: () => void;
}

/**
 * Renders a navigation item button.
 *
 * Accepts children.
 * @prop {string} label - Button label.
 * @prop {boolean} isActive – Optional boolean stating whether the user has clicked on the NavItem;
 *                            defaults to false, and changes to false when the user clicks on a different NavItem.
 * @returns {JSX.Element} A navigation item button component.
 */
export default function NavItem({
  label,
  isActive = false,
  onClick,
}: React.PropsWithChildren<Props>): JSX.Element {
  return (
    <motion.button
      layout
      onClick={onClick}
      className={`relative flex text-primary-500 text-base rounded-2xl px-4 py-3 w-full
        ${isActive ? "border-primary-500" : ""}`}
      style={{ overflow: "visible" }}
    >
      {label}
      {isActive && (
        <motion.div
          layout
          layoutId="navitem-activemarker"
          className="absolute border border-primary-500 rounded-2xl inset-0 pointer-events-none"
        />
      )}
    </motion.button>
  );
}
