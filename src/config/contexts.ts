import { createContext } from "react";
import { BadgeValues } from "./interfaces";

export const LightThemeContext = createContext(false);
export const BadgeValuesContext = createContext<BadgeValues>({
  leftOfDecimal: 0,
  rightOfDecimal: 0,
  accountNumberForDisplay: -1,
  accountNameForDisplay: "Account not found",
});
export const LockedScreenActiveContext = createContext(false);