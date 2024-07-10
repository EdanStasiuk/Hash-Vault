import { useState } from "react";

import Header from "../../../components/Header";
import InputField from "../../../components/InputField";
import StepInfo from "../../../components/StepInfo";
import Button from "../../../components/Buttons/DirectoryButton";

function NewWalletStepFour() {
  const [password, setPassword] = useState("");

  const isNextButtonDisabled = !password;
  return (
    <>
      <Header />
      <div className="grid justify-center">
        <div className="mb-6">
          <StepInfo
            curStep={4}
            maxStep={4}
            title="Create a new wallet"
            description={[
              {
                text: "Your wallet information will be saved to your computer under a folder with\n",
              },
              { text: "the following name you enter." },
            ]}
          />
        </div>
        <div className="mt-2">
          <InputField
            placeHolder="Wallet name"
            value={password}
            showInput={true}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
        </div>
      </div>
      <div className="flex justify-center mt-20">
        <Button 
          intent="outline"
          routerPath={"/NewWallet/Software/StepThree"}
          history={true}>
          Back
        </Button>
        <Button
          intent={isNextButtonDisabled ? "dead" : "solid"}
          routerPath={"/Wallet/Dashboard"}
          disabled={isNextButtonDisabled}
          history={false}
        >
          Next
        </Button>
      </div>
    </>
  );
}

export default NewWalletStepFour;
