import { useContext } from "react";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import { LightThemeContext } from "../../config/contexts";

/**
 * This functional component renders a circular progress indicator centered inside a flexbox container.
 *
 * @returns A Box component containing a CircularProgress component.
 */
export default function CircularIndeterminate() {
  /**
   * "#A489FA" Tailwind primary-500
   * "#B3C1FF" Tailwind secondary-400
   */
  const lightTheme = useContext(LightThemeContext);
  const itemColor =
    !lightTheme || document.documentElement.classList.contains("dark")
      ? "#A489FA"
      : "#B3C1FF";
  return (
    <Box sx={{ display: "flex" }}>
      <CircularProgress size={70} sx={{ color: itemColor }} />
    </Box>
  );
}
