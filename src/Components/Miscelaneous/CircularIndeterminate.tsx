import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import { useEffect, useState } from "react";
import { Settings } from "../../config/interfaces";

/**
 * This functional component renders a circular progress indicator centered inside a flexbox container.
 *
 * @returns A Box component containing a CircularProgress component.
 */
export default function CircularIndeterminate() {
  const [lightTheme, setLightTheme] = useState<boolean>(false);

  const updateLightTheme = () => {
    const settings = JSON.parse(
      localStorage.getItem("settings") || "{}"
    ) as Settings;
    setLightTheme(
      settings.lightTheme !== undefined ? settings.lightTheme : false
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
   * "#A489FA" Tailwind primary-500
   * "#B3C1FF" Tailwind secondary-400
   */
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
