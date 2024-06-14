import { useState } from "react";
import InterfaceSettingsItem from "./InterfaceSettingsItem";
import DropdownMenu from "./DropdownMenu";
import Switch from "./Switch";
import { Slider } from "@mui/material";

/**
 * Renders interface settings with various configurable options.
 *
 * @returns {JSX.Element} The interface settings component.
 */
export default function InterfaceSettings(): JSX.Element {
  const [customDecorations, setCustomDecorations] = useState(false);
  const [checkUpdates, setCheckUpdates] = useState(false);
  const [displayWalletName, setDisplayWalletName] = useState(false);
  const [hideBalance, setHideBalance] = useState(false);
  const [lightTheme, setLightTheme] = useState(false);
  const [askPassword, setAskPassword] = useState(false);
  const [autoSave, setAutoSave] = useState(false);
  const [lockWallet, setLockWallet] = useState(false);

  return (
    <div className="flex mt-4 ml-2 justify-center">
      <div className="pl-2">
        <div className="py-3 pl-2">
          <InterfaceSettingsItem itemText="Currency display preference">
            <DropdownMenu currencyTypes={["CAD", "USD"]}/>
          </InterfaceSettingsItem>
        </div>
        <div className="py-3">
          <InterfaceSettingsItem itemText="Custom decorations">
            <Switch
              isOn={customDecorations}
              handleToggle={() => {
                setCustomDecorations(!customDecorations);
              }}
              id="customDecorations"
            />
          </InterfaceSettingsItem>
        </div>
        <div className="py-3">
          <InterfaceSettingsItem itemText="Check for updates periodically">
            <Switch
              isOn={checkUpdates}
              handleToggle={() => {
                setCheckUpdates(!checkUpdates);
              }}
              id="checkUpdates"
            />
          </InterfaceSettingsItem>
        </div>
        <div className="py-3">
          <InterfaceSettingsItem itemText="Display wallet name in titlebar">
            <Switch
              isOn={displayWalletName}
              handleToggle={() => {
                setDisplayWalletName(!displayWalletName);
              }}
              id="displayWalletName"
            />
          </InterfaceSettingsItem>
        </div>
        <div className="py-3">
          <InterfaceSettingsItem itemText="Hide balance">
            <Switch
              isOn={hideBalance}
              handleToggle={() => {
                setHideBalance(!hideBalance);
              }}
              id="hideBalance"
            />
          </InterfaceSettingsItem>
        </div>
        <div className="py-3">
          <InterfaceSettingsItem itemText="Light theme">
            <Switch
              isOn={lightTheme}
              handleToggle={() => {
                setLightTheme(!lightTheme);
              }}
              id="lightTheme"
            />
          </InterfaceSettingsItem>
        </div>
      </div>
      <div className="pl-6">
        <div className="py-3">
          <InterfaceSettingsItem itemText="Ask for password before sending a transaction">
            <Switch
              isOn={askPassword}
              handleToggle={() => {
                setAskPassword(!askPassword);
              }}
              id="askPassword"
            />
          </InterfaceSettingsItem>
        </div>
        <div className="py-3">
          <InterfaceSettingsItem itemText="Autosave every 10 minute(s)">
            <Switch
              isOn={autoSave}
              handleToggle={() => {
                setAutoSave(!autoSave);
              }}
              id="autoSave"
            />
          </InterfaceSettingsItem>
          <div className="w-52 ml-24 mt-2">
            <Slider
              defaultValue={10}
              min={0}
              max={60}
              step={5}
              sx={{
                color: "#A489FA",
                "& .MuiSlider-thumb:hover": {
                  boxShadow: "0 0 0 8px rgba(164, 137, 250, 0.16)",
                },
                "& .MuiSlider-thumb.Mui-focusVisible, & .MuiSlider-thumb.Mui-active":
                  {
                    boxShadow: "0 0 0 12px rgba(164, 137, 250, 0.16)",
                  },
              }}
              onChange={() => null}
            />
          </div>
        </div>
        <div className="py-3">
          <InterfaceSettingsItem itemText="Lock wallet on inactivity every 10 minute(s)">
            <Switch
              isOn={lockWallet}
              handleToggle={() => {
                setLockWallet(!lockWallet);
              }}
              id="lockWallet"
            />
          </InterfaceSettingsItem>
          <div className="w-52 ml-24 mt-2">
            <Slider
              defaultValue={10}
              min={0}
              max={30}
              step={5}
              sx={{
                color: "#A489FA",
                "& .MuiSlider-thumb:hover": {
                  boxShadow: "0 0 0 8px rgba(164, 137, 250, 0.16)",
                },
                "& .MuiSlider-thumb.Mui-focusVisible, & .MuiSlider-thumb.Mui-active":
                  {
                    boxShadow: "0 0 0 12px rgba(164, 137, 250, 0.16)",
                  },
              }}
              onChange={() => null}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
