import ButtonHero from "../components/Buttons/ButtonHero";
import Button from "../components/Buttons/OpenFileButton";
import { PiDownloadSimple } from "react-icons/pi";
import { MdOutlineLibraryAdd } from "react-icons/md";
import { CiFolderOn } from "react-icons/ci"

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
        <div className="topTwoButtons flex justify-center">
          <ButtonHero
            intent={"outline"}
            routerPath={"/ImportWallet/ExistingWalletOptions"}
          >
            <div className="inline-grid justify-center m-1 scale-300">
              <PiDownloadSimple className="mb-1"></PiDownloadSimple>
            </div>
            <h1 className="font-bold m-3 text-xl">Import an existing wallet</h1>
            <p className="text-base max-w-xs">
              Already have a wallet? Import it using your seed phrase or
              encrypted keystore file.
            </p>
          </ButtonHero>
          <ButtonHero 
            intent={"outline"}
            routerPath={"/NewWallet/NewWalletOptions"}
          >
            <div className="inline-grid justify-center m-1 scale-300">
              <MdOutlineLibraryAdd className="mb-1"></MdOutlineLibraryAdd>
            </div>
            <h1 className="font-bold m-3 text-xl">Create a new wallet</h1>
            <p className="text-base max-w-xs">
              Get started with Hash Vault! Create a new wallet from scratch or hardware.
            </p>
          </ButtonHero>
        </div>
        <div className="divider flex justify-center place-items-center">
          <hr className="border-secondary-500 w-32 m-3" />
          <h2 className="text-secondary-500 grid justify-center">or</h2>
          <hr className="border-secondary-500 w-32 m-3" />
        </div>
        <div className="bottomButton flex justify-center">
          <Button
            intent="outline"
            routerPath={"/temp"}
          >
            <CiFolderOn className="scale-250 mx-12"/>
            <h1 className="pr-8">Open wallet from file</h1>
          </Button>
        </div>
      </div>
    </>
  );
}

export default Landing;
