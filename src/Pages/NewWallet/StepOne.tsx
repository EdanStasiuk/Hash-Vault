import { useEffect, useState } from "react";

import Header from "../../components/Header";
import InputField from "../../components/InputField";
import StepInfo from "../../components/StepInfo";
import Button from "../../components/Buttons/DirectoryButton";
import CheckBox from "../../components/CheckBox";

function NewWalletStepOne() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isChecked, setIsChecked] = useState(false);

  // Check local storage for seed phrase on initial load or revisit from later stages, delete if found
  useEffect(() => {
    const seedPhrase = localStorage.getItem("seedPhrase");
    if (seedPhrase) {
      localStorage.removeItem("seedPhrase");
    }
  }, [history]);
  
  const isNextButtonDisabled =
    !password ||
    !confirmPassword ||
    !isChecked ||
    password !== confirmPassword ||
    password.length < 12;
  return (
    <>
      <Header />
      <div className="grid justify-center">
        <StepInfo
          curStep={1}
          maxStep={4}
          title="Create a new wallet"
          description={[
            { text: "Your wallet information will be saved to your computer. It will be encrypted with\n"},
            { text: "a password you set."}
          ]}
        />
        <div className="grid justify-start text-white font-thin mt-10 mb-2">
          Must contain a minimum of 12 characters.
        </div>
        <div className="mt-2">
          <InputField
            placeHolder="Create wallet password"
            value={password}
            onChange={(e) => {setPassword(e.target.value)}}
          />
        </div>
        <div className="mt-10 mb-8">
          <InputField
            placeHolder="Confirm wallet password"
            value={confirmPassword}
            onChange={(e) => {setConfirmPassword(e.target.value)}}
          />
        </div>
        <CheckBox checked={isChecked} onChange={() => {setIsChecked(!isChecked)}}>
          I agree to the{" "}
          <strong style={{ fontWeight: "bold" }}>terms and conditions</strong>{" "}
          and the <strong style={{ fontWeight: "bold" }}>privacy policy</strong>
        </CheckBox>
      </div>
      <div className="flex justify-center mt-14">
        <Button intent="outline" routerPath={"/"} history={true}>
          Back
        </Button>
        <Button
          intent={isNextButtonDisabled ? "dead" : "solid"}
          routerPath={"/NewWallet/StepTwo"}
          disabled={isNextButtonDisabled}
          history={false}
        >
          Next
        </Button>
      </div>
    </>
  );
}

export default NewWalletStepOne;
