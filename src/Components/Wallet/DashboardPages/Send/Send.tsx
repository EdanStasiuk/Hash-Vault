/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Subheader from "../../Subheader";
import AddressInputField from "./AddressInputField";
import AmountInputField from "./AmountInputField";
import AssetInputField from "./AssetInputField";
import MemoInputField from "./MemoInputField";
import SendButton from "./SendButton";
import AddressBook from "../AddressBook/AddressBook";
import { useForm } from "react-hook-form";
import { Settings } from "../../../../config/interfaces";
import { SendFormData } from "../../../../config/interfaces";
import {
  fetchConversionRate,
  convertToFiat,
  displayCurrencySymbol,
} from "../../../../functions";

interface Props {
  settings?: Settings[];
}

/**
 * Renders Send page information for dashboard.
 *
 * @prop {Settings[]} settings - Optional list containg user settings information.
 * @returns {JSX.Element} - Send page component.
 */
export default function Send({
  settings = [],
}: React.PropsWithChildren<Props>): JSX.Element {
  const {
    register,
    handleSubmit,
    formState: { isValid },
    watch,
    setValue,
    getValues,
  } = useForm<SendFormData>({ mode: "onChange" });

  const [showAddressBook, setShowAddressBook] = useState(false);
  const [conversionRate, setConversionRate] = useState<number | undefined>();
  const [convertedAmount, setConvertedAmount] = useState<string>("");

  const watchFields = watch(["address", "amount", "asset"]);
  const watchAmount = watch("amount");
  const watchAsset = watch("asset");
  
  // Slides in the Address Book component
  const handleAddressBookClick = () => {
    setShowAddressBook(true);
  };

  // Slides out the Address Book component
  const handleBackButtonClick = () => {
    setShowAddressBook(false);
  };

  // Function to be executed upon send button submission
  const onSubmit = (data: SendFormData) => {
    // Need to check for this because manually inputted amount values are taken as strings
    data.amount =
      typeof data.amount === "string" ? parseFloat(data.amount) : data.amount;

    // console.log(data);
    // console.log(errors.address?.message);
  };

  // Fetch conversion rate upon asset select
  useEffect(() => {
    const fetchConversion = async () => {
      if (getValues("asset")) {
        try {
          const rate = await fetchConversionRate(getValues("asset"), "CAD"); //TODO: conversion rate needs to depend on the asset selected
          setConversionRate(rate);
        } catch (error) {
          console.error("Error fetching conversion rate:", error);
        }
      }
    };

    fetchConversion().catch((error) => {
      console.error("Error in fetchConversion:", error);
    });

    // Need to set converted amount to 0.00 when the component mounts
    setConvertedAmount("0.00");
  }, [watchAsset]);

  // Handles fiat conversion on amount change using watchAmount
  useEffect(() => {
    const handleConversionToFiat = () => {
      if (!watchAmount || !conversionRate) {
        setConvertedAmount("0.00");
        return;
      }

      const converted = convertToFiat(conversionRate, watchAmount);
      setConvertedAmount(converted);
    };

    handleConversionToFiat();
  }, [watchAmount, conversionRate]);

  // Need the padding p-6, otherwise the send button gets cut off when it swells on hover.
  // This extra padding is compensated for in a reduction of margin in the parent Dashboard component.
  return (
    <div className="relative w-full overflow-x-hidden p-6">
      <motion.div
        initial={{ x: showAddressBook ? 0 : "100%" }}
        animate={{ x: showAddressBook ? 0 : "100%" }}
        transition={{ duration: 0.5, ease: "easeInOut", delay: 0.05 }}
        style={{ position: "absolute", width: "100%" }}
      >
        <AddressBook onBackButtonClick={handleBackButtonClick} />
      </motion.div>
      <motion.div
        initial={{ x: 0 }}
        animate={{ x: showAddressBook ? "-110%" : 0 }}
        transition={{ duration: 0.5, ease: "easeInOut", delay: 0.05 }}
        style={{ position: "relative", width: "100%" }}
      >
        <form onSubmit={(event) => void handleSubmit(onSubmit)(event)}>
          <Subheader label="Send" />
          <div className="addressField mt-5">
            <AddressInputField
              label="Address"
              placeHolder="0.0.****"
              onAddressBookClick={handleAddressBookClick}
              register={register}
            />
          </div>
          <div className="amountAndAssetFields flex mt-8">
            <div className="mr-4">
              <AmountInputField
                label="Amount"
                placeHolder="0.00"
                register={register}
                setValue={setValue}
                getValues={getValues}
              />
            </div>
            <AssetInputField
              label="Select Asset"
              setValue={setValue}
            />
          </div>
          <div className="conversionField text-ghost-500 ml-1 mt-1 text-xl font-roboto">
            <span>≈ </span>
            {displayCurrencySymbol("CAD") /* TODO: dynamically change the currency via settings */}
            {convertedAmount}
            {" " + settings[0].conversionCurrency}
          </div>
          <div className="memoField mt-6">
            <MemoInputField label="Memo" register={register} />
          </div>
          <div className="sendButton mt-12">
            <SendButton
              disabled={!isValid || watchFields.some((field) => !field)}
            />
          </div>
        </form>
      </motion.div>
    </div>
  );
}
