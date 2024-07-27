import InfoBar from "./InfoBar";
import isElectron from "is-electron";

/**
 * Renders the settings information with various info bars.
 *
 * @returns {JSX.Element} The settings information component with multiple InfoBar components.
 */
export default function InfoSettings(): JSX.Element {
  return (
    <div className="m-12">
      <InfoBar childDescriptor="Version:" childContent="1.0" />
      {isElectron() && (
        <InfoBar
          childDescriptor="Wallet path:"
          childContent="N/A"
          copyable={true}
        />
      )}{" "}
      {/* TODO: Place wallet path here when implementing Electron */}
      {isElectron() && (
        <InfoBar
          childDescriptor="Wallet log path:"
          childContent="N/A"
          copyable={true}
        />
      )}{" "}
      {/* TODO: Place wallet log path here when implementing Electron */}
    </div>
  );
}
