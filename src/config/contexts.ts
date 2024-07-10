import { createContext } from "react";
import { badgeValues } from "./interfaces";

export const LightThemeContext = createContext(false);
export const BadgeValuesContext = createContext<badgeValues>({
  leftOfDecimal: 0,
  rightOfDecimal: 0,
  accountNumberForDisplay: -1,
  accountNameForDisplay: "Account not found",
});
