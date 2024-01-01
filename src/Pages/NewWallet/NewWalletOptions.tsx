import ButtonHero from "../../components/Buttons/ButtonHero";
import Header from "../../components/Header";
import StepInfo from "../../components/StepInfo";
import DirectoryButton from "../../components/Buttons/DirectoryButton";
import { PiWalletThin } from "react-icons/pi";
import { LiaMicrochipSolid } from "react-icons/lia";

function NewWalletOptions() {
  return (
    <>
      <Header />
      <div className="grid justify-center mt-2 mb-5">
        <StepInfo
          title="Create a new wallet"
          description={[
            { text: "New to Hash Vault? Let's set it up! This will create a new wallet\n"},
            { text: "and seed phrase."}
          ]}
        />
      </div>
      <div className="topTwoButtons flex justify-center">
            <ButtonHero intent="outline" routerPath={''} padding="pt-6 p-10">
              <div className="inline-grid justify-center m-8 scale-370">
              <LiaMicrochipSolid />
              </div>
              <h1 className="font-bold text-xl">Create from hardware</h1>
              <p className="text-base max-w-xs">
                Connect your hardware to create a new Hash
                Vault wallet.
              </p>
            </ButtonHero>
          <ButtonHero intent="outline" routerPath={'/NewWallet/Software/StepOne'} padding="pt-6 p-10">
            <div className="inline-grid justify-center m-8 scale-370">
                <PiWalletThin />
            </div>
            <h1 className="font-bold text-xl">Create a new wallet</h1>
            <p className="text-base max-w-xs">
              New to Hash Vault? Let&#39;s set it up! This will create a new
              wallet and seed phrase.
            </p>
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

export default NewWalletOptions;
