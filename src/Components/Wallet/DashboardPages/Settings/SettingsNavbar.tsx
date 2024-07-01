import { LayoutGroup, motion } from "framer-motion";
import { Settings } from "../../../../config/interfaces";
import { useEffect, useState } from "react";

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
export default function SettingsNavbar({
  navItems,
  selectedIndex,
  setSelectedIndex,
}: Props): JSX.Element {
  const [lightTheme, setLightTheme] = useState<boolean>(false);

  const handleButtonClick = (index: number) => {
    setSelectedIndex(index);
  };

  const updateLightTheme = () => {
    const settings = JSON.parse(
      localStorage.getItem("settings") || "{}"
    ) as Settings;
    setLightTheme(
      settings.lightTheme !== undefined ? settings.lightTheme : true
    );
  };

  useEffect(() => {
    updateLightTheme();
  }, []);

  useEffect(() => {
    const handleStorageChange = () => {
      updateLightTheme();
    };

    window.addEventListener("storage", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  /**
   * "#212229" Tailwind backgroundAlt-500
   * "#FFFFFF" Tailwind backgroundLight-50
   * "#A489FA" Tailwind primary-500
   * "#888888" Tailwind backgroundLight-600
   */
  const textColorSelected =
    !lightTheme || document.documentElement.classList.contains("dark")
      ? "#212229"
      : "#FFFFFF";
  const textColorDefault =
    !lightTheme || document.documentElement.classList.contains("dark")
      ? "#A489FA"
      : "#888888";

  return (
    <div className="border rounded-xl border-backgroundLight-500 dark:border-primary-500 w-7/12 mx-auto">
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
                className={`border-backgroundLight-500 dark:border-primary-500 py-2 w-full overflow-visible max-w-xs relative ${
                  index === 0 ? "rounded-l-[10px]" : ""
                } ${index === navItems.length - 1 ? "rounded-r[10px]" : ""} ${
                  index !== 0 ? "border-l" : ""
                }`}
              >
                {index === selectedIndex && (
                  <motion.div
                    layout
                    layoutId="settingsnavitem-activemarker"
                    className={`absolute border-backgroundLight-500 dark:border-primary-500 bg-backgroundLight-500 dark:bg-primary-500 w-full h-full inset-0 pointer-events-none z-0 ${
                      index === 0 ? "rounded-l-[10px]" : ""
                    } ${
                      index === navItems.length - 1 ? "rounded-r-[10px]" : ""
                    } ${index !== 0 ? "border-l" : ""}`}
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
                  className={`relative z-10 ${
                    selectedIndex === index
                      ? "text-backgroundLight-50 dark:text-backgroundAlt-500"
                      : "text-backgroundLight-400 dark:text-primary-500"
                  }`}
                  animate={{
                    color:
                      selectedIndex === index
                        ? textColorSelected
                        : textColorDefault,
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
