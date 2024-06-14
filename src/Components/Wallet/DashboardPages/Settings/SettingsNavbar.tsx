import { LayoutGroup, motion } from "framer-motion";

interface Props {
  navItems: string[];
  selectedIndex: number;
  setSelectedIndex: (index: number) => void;
}

/**
 * Renders a navigational bar with clickable items.
 *
 * @prop {string[]} navItems - An array of strings representing the names of the navigation items.
 * @prop {number} selectedIndex - A number representing the index of the currently selected item.
 * @prop {function} setSelectedIndex - A function that updates the selected index.
 * @returns {JSX.Element} A navigational bar component with animated transitions.
 */
export default function SettingsNavbar({ navItems, selectedIndex, setSelectedIndex }: Props): JSX.Element {
  const handleButtonClick = (index: number) => {
    setSelectedIndex(index);
  };

  const textColorDefault = "#212229"; // Tailwind backgroundAlt-500
  const textColorSelected = "#A489FA"; // Tailwind primary-500

  return (
    <div className="border rounded-xl border-primary-500 w-7/12 mx-auto">
      <nav className="flex">
        <LayoutGroup>
          {navItems.map((item, index) => (
            <div key={index} className="relative w-full">
              <motion.button
                layout
                key={index}
                onClick={() => {
                  handleButtonClick(index);
                }}
                className={`border-primary-500 py-2 w-full overflow-visible max-w-xs relative ${
                  index === 0 ? "rounded-l-lg" : ""
                } ${index === navItems.length - 1 ? "rounded-r-lg" : ""} ${
                  index !== 0 ? "border-l" : ""
                } ${selectedIndex === index ? "text-backgroundAlt-500" : ""}`}
              >
                {index === selectedIndex && (
                  <motion.div
                    layout
                    layoutId="settingsnavitem-activemarker"
                    className={`absolute border-primary-500 bg-primary-500 w-full h-full inset-0 pointer-events-none z-0 ${
                      index === 0 ? "rounded-l-lg" : ""
                    } ${index === navItems.length - 1 ? "rounded-r-lg" : ""} ${
                      index !== 0 ? "border-l" : ""
                    }`}
                    transition={{
                      borderRadius: {
                        type: "tween",
                        delay: 0.3,
                        duration: 0.4,
                      },
                    }}
                  />
                )}
                <motion.span
                  className="relative z-10"
                  animate={{
                    color:
                      selectedIndex === index
                        ? textColorDefault
                        : textColorSelected,
                  }}
                  transition={{ duration: 0.4 }}
                >
                  {item}
                </motion.span>
              </motion.button>
            </div>
          ))}
        </LayoutGroup>
      </nav>
    </div>
  );
}
