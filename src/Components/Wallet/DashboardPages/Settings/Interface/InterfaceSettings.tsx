import { useState } from "react";
import InterfaceSettingsItem from "./InterfaceSettingsItem";
import DropdownMenu from "./DropdownMenu";
import Switch from "./Switch";
import { Slider } from "@mui/material";

type SettingsKey = 
  | "customDecorations"
  | "checkUpdates"
  | "displayWalletName"
  | "hideBalance"
  | "lightTheme"
  | "askPassword"
  | "autoSave"
  | "lockWallet";

const settingsConfig: { key: SettingsKey; label: string}[] = [
  { key: "customDecorations", label: "Custom decorations" },
  { key: "checkUpdates", label: "Check for updates periodically" },
  { key: "displayWalletName", label: "Display wallet name in titlebar" },
  { key: "hideBalance", label: "Hide balance" },
  { key: "lightTheme", label: "Light theme" },
  { key: "askPassword", label: "Ask for password before sending a transaction" },
  { key: "autoSave", label: "Autosave every 10 minute(s)" },
  { key: "lockWallet", label: "Lock wallet on inactivity every 10 minute(s)" },
];

/**
 * Renders interface settings with various configurable options.
 *
 * @returns {JSX.Element} The interface settings component.
 */
export default function InterfaceSettings(): JSX.Element {
  const [settings, setSettings] = useState<Record<SettingsKey, boolean>>({
    customDecorations: false,
    checkUpdates: false,
    displayWalletName: false,
    hideBalance: false,
    lightTheme: false,
    askPassword: false,
    autoSave: false,
    lockWallet: false,
  });

  const handleToggle = (key: SettingsKey) => {
    setSettings((prevSettings) => ({
      ...prevSettings,
      [key]: !prevSettings[key],
    }));
  };

  return (
    <div className="flex flex-wrap mx-[10%]">
      <div className="w-full md:w-1/2">
        <div className="py-3">
          <InterfaceSettingsItem itemText="Currency display preference">
            <DropdownMenu currencyTypes={['CAD', 'USD']} />
          </InterfaceSettingsItem>
        </div>
        {settingsConfig.slice(0, 5).map(({ key, label }) => (
          <div key={key} className="py-3">
            <InterfaceSettingsItem itemText={label}>
              <Switch
                isOn={settings[key]}
                handleToggle={() => {handleToggle(key)}}
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
                handleToggle={() => {handleToggle(key)}}
                id={key}
              />
            </InterfaceSettingsItem>
            {(key === 'autoSave' || key === 'lockWallet') && (
              <div className="w-full md:w-52 ml-0 md:ml-24 mt-2">
                <Slider
                  defaultValue={10}
                  min={0}
                  max={key === 'autoSave' ? 60 : 30}
                  step={5}
                  sx={{
                    color: '#A489FA',
                    '& .MuiSlider-thumb:hover': {
                      boxShadow: '0 0 0 8px rgba(164, 137, 250, 0.16)',
                    },
                    '& .MuiSlider-thumb.Mui-focusVisible, & .MuiSlider-thumb.Mui-active': {
                      boxShadow: '0 0 0 12px rgba(164, 137, 250, 0.16)',
                    },
                  }}
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
