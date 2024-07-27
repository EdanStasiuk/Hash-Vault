import { useState } from "react";
import InterfaceSettingsItem from "./InterfaceSettingsItem";
import DropdownMenu from "./DropdownMenu";
import Switch from "./Switch";
import {
  getSettingsFromLocalStorage,
  saveSettingsToLocalStorage,
} from "../../../../../functions/storageFunctions";
import { Settings } from "../../../../../config/interfaces";
import {
  settings as settingsInit,
  fiatCurrencyOptions,
} from "../../../../../config/constants";
import isElectron from "is-electron";

type BooleanSettingsKey =
  | "customDecorations"
  | "checkUpdates"
  | "displayWalletNameInTitleBar"
  | "hideBalance"
  | "lightTheme"
  | "autosavePeriod"
  | "lockOnInactivityPeriod"
  | "askForPasswordBeforeSend";

const settingsConfig: { key: BooleanSettingsKey; label: string }[] = [
  { key: "customDecorations", label: "Custom decorations" },
  { key: "checkUpdates", label: "Check for updates periodically" },
  {
    key: "displayWalletNameInTitleBar",
    label: "Display wallet name in title bar",
  },
  { key: "hideBalance", label: "Hide balance" },
  { key: "lightTheme", label: "Light theme" },
  {
    key: "askForPasswordBeforeSend",
    label: "Ask for password before sending a transaction",
  },
  { key: "autosavePeriod", label: "Autosave every {value} minute(s)" },
  {
    key: "lockOnInactivityPeriod",
    label: "Lock wallet on inactivity every {value} minute(s)",
  },
];

/**
 * Renders interface settings with various configurable options.
 *
 * @returns {JSX.Element} The interface settings component.
 */
export default function InterfaceSettings(): JSX.Element {
  const [settings, setSettings] = useState<Settings>(
    getSettingsFromLocalStorage() || settingsInit
  );

  const handleToggle = (key: BooleanSettingsKey) => {
    setSettings((prevSettings) => {
      let newSettings;

      if (key === "autosavePeriod" || key === "lockOnInactivityPeriod") {
        newSettings = {
          ...prevSettings,
          [key]: {
            ...prevSettings[key],
            activated: !prevSettings[key].activated,
          },
        };
      } else {
        newSettings = {
          ...prevSettings,
          [key]: !prevSettings[key],
        };
      }

      if (key === "lightTheme") {
        if (!newSettings.lightTheme) {
          document.documentElement.classList.add("dark");
        } else {
          document.documentElement.classList.remove("dark");
        }
      }

      saveSettingsToLocalStorage(newSettings);
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

  const handleSliderChange = (key: BooleanSettingsKey, value: number) => {
    setSettings((prevSettings) => {
      if (key === "autosavePeriod" || key === "lockOnInactivityPeriod") {
        const newSettings: Settings = {
          ...prevSettings,
          [key]: {
            ...prevSettings[key],
            period: value,
          },
        };
        saveSettingsToLocalStorage(newSettings);
        return newSettings;
      }
      return prevSettings;
    });
  };

  const filteredSettingsConfig = isElectron()
    ? settingsConfig
    : settingsConfig.filter(
        ({ key }) =>
          !["customDecorations", "checkUpdates", "autosavePeriod"].includes(key)
      );

  return (
    <div className={`flex flex-wrap ${isElectron() ? "mx-[10%]" : "mx-[30%]"}`}>
      <div className={`w-full ${isElectron() ? "md:w-1/2" : ""}`}>
        <div className="py-3">
          <InterfaceSettingsItem itemText="Currency display preference">
            <DropdownMenu
              currencyOptionsList={fiatCurrencyOptions}
              onCurrencyChange={handleCurrencySwitch}
            />
          </InterfaceSettingsItem>
        </div>
        {filteredSettingsConfig.slice(0, 5).map(({ key, label }) => (
          <div key={key} className="py-3">
            <InterfaceSettingsItem
              itemText={label.replace(
                "{value}",
                (key === "lockOnInactivityPeriod" &&
                  settings[key]?.period?.toString()) ||
                  "10"
              )}
              hasSlider={
                key === "lockOnInactivityPeriod" &&
                settings[key].activated &&
                !isElectron()
              }
              sliderValue={
                key === "lockOnInactivityPeriod"
                  ? settings[key]?.period
                  : undefined
              }
              onSliderChange={(value) => {
                handleSliderChange(key, value);
              }}
            >
              <Switch
                isOn={
                  key === "autosavePeriod" || key === "lockOnInactivityPeriod"
                    ? settings[key].activated
                    : settings[key]
                }
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
        {filteredSettingsConfig.slice(5).map(({ key, label }) => (
          <div key={key} className="py-3">
            <InterfaceSettingsItem
              itemText={label.replace(
                "{value}",
                ((key === "autosavePeriod" ||
                  key === "lockOnInactivityPeriod") &&
                  settings[key]?.period?.toString()) ||
                  "10"
              )}
              hasSlider={
                (key === "autosavePeriod" ||
                  key === "lockOnInactivityPeriod") &&
                settings[key].activated &&
                isElectron()
              }
              sliderValue={
                key === "autosavePeriod" || key === "lockOnInactivityPeriod"
                  ? settings[key]?.period
                  : undefined
              }
              onSliderChange={(value) => {
                handleSliderChange(key, value);
              }}
            >
              <Switch
                isOn={
                  key === "autosavePeriod" || key === "lockOnInactivityPeriod"
                    ? settings[key].activated
                    : settings[key]
                }
                handleToggle={() => {
                  handleToggle(key);
                }}
                id={key}
              />
            </InterfaceSettingsItem>
          </div>
        ))}
      </div>
    </div>
  );
}
