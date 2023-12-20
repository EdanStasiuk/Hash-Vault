import ButtonHero from "../components/Buttons/ButtonHero";
import Button from "../components/Buttons/HardwareButton";
import { PiDownloadSimple } from "react-icons/pi";
import { MdOutlineLibraryAdd } from "react-icons/md";
import ledgerIcon from "../assets/ledgerIcon.svg";

function Landing() {
  return (
    <>
      <div className="block justify-center overflow-hidden gap-2">
        <div className="text-center">
          <h2 className="font-robotoFlex text-white text-3xl font-extra-thin grid justify-center mt-12">
            Welcome to
          </h2>
          <h1 className="font-roboto text-primary-500 text-6xl tracking-logo flex justify-center my-8">
            Hash Vault
          </h1>
        </div>
        <div className="bothButtons flex justify-center">
          <ButtonHero intent="outline" routerPath={''}>
            <div className="inline-grid justify-center m-1 scale-300">
              <PiDownloadSimple className="mb-1"></PiDownloadSimple>
            </div>
            <h1 className="font-bold m-3 text-xl">Import an existing wallet</h1>
            <p className="text-base max-w-xs">
              Already have a wallet? Import it using your seed phrase or
              encrypted keystore file.
            </p>
          </ButtonHero>
          <ButtonHero intent="solid" routerPath={'/NewWallet/StepOne'}>
            <div className="inline-grid justify-center m-1 scale-300">
              <MdOutlineLibraryAdd className="mb-1"></MdOutlineLibraryAdd>
            </div>
            <h1 className="font-bold m-3 text-xl">Create a new wallet</h1>
            <p className="text-base max-w-xs">
              New to Hash Vault? Let&#39;s set it up! This will create a new
              wallet and seed phrase.
            </p>
          </ButtonHero>
        </div>
        <div className="flex justify-center place-items-center">
          <hr className="border-primary-500 w-32 m-3" />
          <h2 className="text-primary-500 grid justify-center">or</h2>
          <hr className="border-primary-500 w-32 m-3" />
        </div>
        <div className="flex justify-center">
          <Button>
            <img src={ledgerIcon} alt="Ledger Wallet" className="scale-50" />
            <h1 className="pr-8">Connect hardware wallet</h1>
          </Button>
        </div>
      </div>
    </>
  );
}

export default Landing;
