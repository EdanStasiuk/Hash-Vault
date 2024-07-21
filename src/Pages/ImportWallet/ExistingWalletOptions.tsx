import ButtonHero from "../../components/Buttons/ButtonHero";
import Header from "../../components/Header";
import StepInfo from "../../components/StepInfo";
import DirectoryButton from "../../components/Buttons/DirectoryButton";
import { CiViewTimeline } from "react-icons/ci";
import { LuFileKey2 } from "react-icons/lu";

/**
 * ExistingWalletOptions Component
 * 
 * This component provides options for importing an existing wallet. Users can choose to import
 * their wallet using a seed phrase or a keystore file. The wallet information will be saved to
 * the user's computer and encrypted with a password set by the user.
 * 
 * @returns {JSX.Element} The rendered component.
 */
export default function ExistingWalletOptions(): JSX.Element {
  return (
    <>
      <Header />
      <div className="grid justify-center mt-2 mb-5">
        <StepInfo
          title="Import an existing wallet"
          description={[
            {
              text: "Your wallet information will be saved to your computer. It will be encrypted with\n",
            },
            { text: "a password you set." },
          ]}
        />
      </div>
      <div className="topTwoButtons flex justify-center">
        <ButtonHero
          intent="outline"
          routerPath={"/OpenWallet/ExistingWalletOptions"}
          padding="pt-6 p-10"
        >
          <div className="inline-grid justify-center m-10 scale-370">
            <CiViewTimeline />
          </div>
          <h1 className="font-bold text-xl">Import from seed phrase</h1>
        </ButtonHero>
        <ButtonHero
          intent="outline"
          routerPath={"/NewWallet/StepOne"}
          padding="pt-6 p-10"
        >
          <div className="inline-grid justify-center m-10 scale-370">
            <LuFileKey2 />
          </div>
          <h1 className="font-bold text-xl">Import from keystore file</h1>
        </ButtonHero>
      </div>
      <div className="flex justify-center mt-14">
        <DirectoryButton intent="outline" routerPath={"/"} history={true}>
          Back
        </DirectoryButton>
      </div>
    </>
  );
}
