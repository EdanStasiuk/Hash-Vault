import { useContext } from "react";
import { Slider } from "@mui/material";
import { LightThemeContext } from "../../../../../config/contexts";

interface Props {
  itemText: string;
  hasSlider?: boolean;
}

/**
 * Renders an interface settings item with a text description and optional children.
 *
 * @prop {string} itemText - The text description for the settings item.
 * @prop {React.ReactNode} children - Optional children elements to be rendered alongside the text.
 * @returns {JSX.Element} The interface settings item component.
 */
export default function InterfaceSettingsItem({
  children,
  itemText,
  hasSlider = false,
}: React.PropsWithChildren<Props>): JSX.Element {
  const lightTheme = useContext(LightThemeContext);

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
          {itemText}
        </div>
      </div>
      <div className="ml-4 w-10/12">
        {hasSlider && (
          <div className="w-full max-w-xs ml-[20%] mt-2">
            <Slider
              defaultValue={10}
              min={0}
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
                      color: sliderColor,
                      "& .MuiSlider-thumb:hover": {
                        //pastel purple for dark mode
                        boxShadow: "0 0 0 8px rgba(164, 137, 250, 0.16)",
                      },
                      "& .MuiSlider-thumb.Mui-focusVisible, & .MuiSlider-thumb.Mui-active":
                        {
                          boxShadow: "0 0 0 12px rgba(164, 137, 250, 0.16)",
                        },
                    }
              }
              onChange={() => null}
            />
          </div>
        )}
      </div>
    </div>
  );
}
