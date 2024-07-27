import { useContext, useEffect, useState } from "react";
import { Slider } from "@mui/material";
import { LightThemeContext } from "../../../../../config/contexts/contexts";
import { AnimatePresence, motion } from "framer-motion";

interface Props {
  itemText: string;
  hasSlider?: boolean;
  sliderValue?: number;
  onSliderChange?: (value: number) => void;
}

/**
 * Renders an interface settings item with a text description and optional children.
 *
 * @prop {React.ReactNode} children - Optional children elements to be rendered alongside the text.
 * @prop {string} itemText - The text description for the settings item.
 * @prop {boolean} [hasSlider=false] - Optional boolean value that determines whether the component has a corresponding slider.
 * @prop {number} [sliderValue=10] - Optional default slider value.
 * @prop {(value: number) => void} onSliderChange - A function that handles the change in slider value.
 * @returns {JSX.Element} The interface settings item component.
 */
export default function InterfaceSettingsItem({
  children,
  itemText,
  hasSlider = false,
  sliderValue = 10,
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  onSliderChange = () => {},
}: React.PropsWithChildren<Props>): JSX.Element {
  const lightTheme = useContext(LightThemeContext);
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(true);
  }, []);

  /**
   * "#A489FA" Tailwind primary-500
   * "#B3C1FF" Tailwind secondary-400
   */
  const sliderColor =
    !lightTheme || document.documentElement.classList.contains("dark")
      ? "#A489FA"
      : "#B3C1FF";

  return (
    <div>
      <div className="flex items-center w-full">
        <div className="flex items-center w-[110px]">{children}</div>
        <div className="text-xl text-black dark:text-white font-robotoFlex font-extralight dark:font-thin w-10/12">
          {itemText.replace("{value}", sliderValue.toString())}
        </div>
      </div>
      <div className="ml-4 w-10/12">
        <AnimatePresence initial={false}>
          {hasSlider && (
            <motion.div
              initial={
                hasMounted ? { opacity: 0, height: 0, marginTop: 0 } : false
              }
              animate={{ opacity: 1, height: "auto", marginTop: "0.5rem" }}
              exit={{ opacity: 0, height: 0, marginTop: 0 }}
              transition={{ duration: 0.4, ease: "easeInOut" }}
              className="w-full max-w-xs ml-[20%] mt-2"
            >
              <Slider
                value={
                  sliderValue === 1 || sliderValue === 30
                    ? sliderValue
                    : sliderValue - 1
                }
                min={1}
                max={30}
                step={5}
                sx={
                  lightTheme
                    ? {
                        color: sliderColor, //pastel blue for light mode
                        "& .MuiSlider-thumb:hover": {
                          boxShadow: "0 0 0 8px rgba(179, 194, 253, 0.16)",
                        },
                        "& .MuiSlider-thumb.Mui-focusVisible, & .MuiSlider-thumb.Mui-active":
                          {
                            boxShadow: "0 0 0 12px rgba(179, 194, 253, 0.16)",
                          },
                      }
                    : {
                        color: sliderColor, //pastel purple for dark mode
                        "& .MuiSlider-thumb:hover": {
                          boxShadow: "0 0 0 8px rgba(164, 137, 250, 0.16)",
                        },
                        "& .MuiSlider-thumb.Mui-focusVisible, & .MuiSlider-thumb.Mui-active":
                          {
                            boxShadow: "0 0 0 12px rgba(164, 137, 250, 0.16)",
                          },
                      }
                }
                onChange={(_e, value) => {
                  onSliderChange(
                    value === 1 || value === 30 ? value : (value as number) - 1
                  );
                }}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
