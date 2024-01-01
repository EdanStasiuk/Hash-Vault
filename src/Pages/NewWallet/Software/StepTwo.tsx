import Header from "../../../components/Header";
import StepInfo from "../../../components/StepInfo";
import Button from "../../../components/Buttons/DirectoryButton";
import SeedPhraseGrid from "../../../components/SeedPhrase/SeedPhraseGrid";

function NewWalletStepTwo() {
  return (
    <>
      <Header />
      <div className="grid justify-center">
        <StepInfo
          curStep={2}
          maxStep={4}
          title="Create a new wallet"
          description={[
            { text: "Write this phrase on a piece of paper and " },
            { text: "store in a secure location", bold: true, color: "red" },
            { text: ". Or you can memorize it.\n" },
            { text: "DO NOT", bold: true, color: "red" },
            { text: " share this phrase with anyone! It can be used to steal all your accounts."},
          ]}
        />
        <div className="my-4">
          <SeedPhraseGrid confirmationGrid={false}/>
        </div>
        <div className="grid justify-center text-white text-lg mt-6">
          If you ever switch between browsers or devices, you will need this
          seed phrase to access your accounts.
        </div>
        <div className="flex justify-center mt-8 mb-6">
          <Button
            intent="outline"
            routerPath={"/NewWallet/Software/StepOne"}
            history={true}
          >
            Back
          </Button>
          <Button
            intent="solid"
            routerPath={"/NewWallet/Software/StepThree"}
            history={false}
          >
            Next
          </Button>
        </div>
      </div>
    </>
  );
}

export default NewWalletStepTwo;
