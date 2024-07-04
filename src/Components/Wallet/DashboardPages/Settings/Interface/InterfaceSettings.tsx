import { useEffect, useState } from "react";
import InterfaceSettingsItem from "./InterfaceSettingsItem";
import DropdownMenu from "./DropdownMenu";
import Switch from "./Switch";
import { Slider } from "@mui/material";
import {
  getSettingsFromLocalStorage,
  saveSettingsToLocalStorage,
} from "../../../../../functions/storageFunctions";
import { Settings } from "../../../../../config/interfaces";
import {
  settings as settingsInit,
  fiatCurrencyOptions,
} from "../../../../../config/constants";

type BooleanSettingsKey =
  | "customDecorations"
  | "checkUpdates"
  | "displayWalletNameInTitlebar"
  | "hideBalance"
  | "lightTheme"
  | "autosavePeriod"
  | "lockOnInactivityPeriod"
  | "askForPasswordBeforeSend"
  | "displayWalletName";

const settingsConfig: { key: BooleanSettingsKey; label: string }[] = [
  { key: "customDecorations", label: "Custom decorations" },
  { key: "checkUpdates", label: "Check for updates periodically" },
  {
    key: "displayWalletNameInTitlebar",
    label: "Display wallet name in titlebar",
  },
  { key: "hideBalance", label: "Hide balance" },
  { key: "lightTheme", label: "Light theme" },
  {
    key: "askForPasswordBeforeSend",
    label: "Ask for password before sending a transaction",
  },
  { key: "autosavePeriod", label: "Autosave every 10 minute(s)" },
  {
    key: "lockOnInactivityPeriod",
    label: "Lock wallet on inactivity every 10 minute(s)",
  },
];

/**
 * Renders interface settings with various configurable options.
 *
 * @returns {JSX.Element} The interface settings component.
 */
export default function InterfaceSettings(): JSX.Element {
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
  const sliderColor =
    !lightTheme || document.documentElement.classList.contains("dark")
      ? "#A489FA"
      : "#B3C1FF";

  // Get settings config from local storage,
  // or initialize it if config is undefined.
  const [settings, setSettings] = useState<Settings>(() => {
    const savedSettings = getSettingsFromLocalStorage();
    return savedSettings || settingsInit;
  });

  const handleToggle = (key: BooleanSettingsKey) => {
    setSettings((prevSettings) => {
      const newSettings = {
        ...prevSettings,
        [key]: !prevSettings[key],
      };
      saveSettingsToLocalStorage(newSettings);
      if (key === "lightTheme") {
        if (!newSettings.lightTheme) {
          document.documentElement.classList.add("dark");
        } else {
          document.documentElement.classList.remove("dark");
        }
      }
      return newSettings;
    });
  };

  const handleCurrencySwitch = (newCurrency: string) => {
    setSettings((prevSettings) => {
      const newSettings: Settings = {
        ...prevSettings,
        conversionCurrency: newCurrency,
      };
      saveSettingsToLocalStorage(newSettings);
      return newSettings;
    });
  };

  return (
    <div className="flex flex-wrap mx-[10%]">
      <div className="w-full md:w-1/2">
        <div className="py-3">
          <InterfaceSettingsItem itemText="Currency display preference">
            <DropdownMenu
              currencyOptionsList={fiatCurrencyOptions}
              onCurrencyChange={handleCurrencySwitch}
            />
          </InterfaceSettingsItem>
        </div>
        {settingsConfig.slice(0, 5).map(({ key, label }) => (
          <div key={key} className="py-3">
            <InterfaceSettingsItem itemText={label}>
              <Switch
                isOn={settings[key]}
                handleToggle={() => {
                  handleToggle(key);
                }}
                id={key}
              />
            </InterfaceSettingsItem>
          </div>
        ))}
      </div>
      <div className="w-full md:w-1/2">
        {settingsConfig.slice(5).map(({ key, label }) => (
          <div key={key} className="py-3">
            <InterfaceSettingsItem itemText={label}>
              <Switch
                isOn={settings[key]}
                handleToggle={() => {
                  handleToggle(key);
                }}
                id={key}
              />
            </InterfaceSettingsItem>
            {(key === "autosavePeriod" || key === "lockOnInactivityPeriod") && (
              <div className="w-full md:w-52 ml-0 md:ml-24 mt-2">
                <Slider
                  defaultValue={10}
                  min={0}
                  max={key === "autosavePeriod" ? 60 : 30}
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
        ))}
      </div>
    </div>
  );
}
