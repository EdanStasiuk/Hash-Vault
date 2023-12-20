import Header from "../../components/Header";
import StepInfo from "../../components/StepInfo";
import Button from "../../components/Buttons/DirectoryButton";
import SeedPhraseGrid from "../../components/SeedPhrase/SeedPhraseGrid";
import { useEffect, useState } from "react";

function NewWalletStepThree() {
  const [missingWordsAreFilledIn, setMissingWordsAreFilledIn] = useState(false);
  const [seedPhraseArray, SeedPhraseArray] = useState<string[]>([]);
  
  /**
   * Gets the seed phrase from local storage.
   */
  useEffect(() => {
    const storedWords = localStorage.getItem("seedPhrase");
    if (storedWords) {
      SeedPhraseArray(JSON.parse(storedWords) as string[]);
    } else {
      throw new Error("seedPhrase cannot be found in local storage.");
    }
  }, []);

  /**
   * A callback function passed to SeedPhraseGrid as a prop. Checks that every missing
   * word is filled in and gives the user access to the next page by setting the boolean
   * controlling the Next button's disabled status to the negation of boolean 'areAllFieldsFilled'.
   * @param fieldValues An array of strings containing the values in the seed phrase grid.
   */
  const checkMissingWordsFilled = (fieldValues: string[]) => {
    const areAllFieldsFilled = fieldValues.every(
      (value, index) => value === seedPhraseArray[index]
    );

    setMissingWordsAreFilledIn(areAllFieldsFilled);
  };
  
  return (
    <>
      <Header />
      <div className="grid justify-center">
        <StepInfo
          curStep={3}
          maxStep={4}
          title="Create a new wallet"
          description={[
            { text: "Please fill in the missing words." },
            {
              text: " You can't recover your account if you lose your 24-word\nphrase.",
              bold: true,
              color: "red",
            },
            {
              text: " As long as you keep this phrase safe, your wallet will be secure.",
            },
          ]}
        />
        <form className="my-4">
          <SeedPhraseGrid
            confirmationGrid={true}
            updateFieldValues={(fieldValues) =>
              {checkMissingWordsFilled(fieldValues)}
            }
          />
        </form>
        <div className="flex justify-center mt-8 mb-6">
          <Button
            intent="outline"
            routerPath={"/NewWallet/StepOne"}
            history={true}
          >
            Back
          </Button>
          <Button
            intent={missingWordsAreFilledIn ? "solid" : "dead"}
            routerPath={"/NewWallet/StepThree"}
            disabled={!missingWordsAreFilledIn}
            history={false}
          >
            Next
          </Button>
        </div>
      </div>
    </>
  );
}

export default NewWalletStepThree;
