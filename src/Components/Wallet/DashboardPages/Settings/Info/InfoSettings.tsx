import InfoBar from "./InfoBar";

/**
 * Renders the settings information with various info bars.
 *
 * @returns {JSX.Element} The settings information component with multiple InfoBar components.
 */
export default function InfoSettings(): JSX.Element {
  return (
    <div className="m-12">
      <InfoBar childDescriptor="Version:" childContent="1.0" />
      <InfoBar childDescriptor="Wallet path:" childContent="N/A" copyable={true}/> {/* TODO: Place wallet path here */}
      <InfoBar childDescriptor="Wallet log path:" childContent="N/A" copyable={true} /> {/* TODO: Place  wallet log path here */}
    </div>
  );
}
