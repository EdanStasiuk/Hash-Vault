import { cva } from "class-variance-authority";
import { InputFieldIntent } from "../../config/types";
import { ChangeEvent, useEffect, useState } from "react";

interface Props {
  word: string;
  wordNumber: string;
  intent?: InputFieldIntent;
  onWordChange: (wordIndex: number, newWord: string) => void;
  wordsArray: string[];
}

/**
 * Variant styles.
 */
const inputField = cva(
  [
    "items-center",
    "flex",
    "h-8",
    "w-40",
    "rounded-[9px]",
    "border",
    "bg-transparent",
    "px-3",
    "text-white",
    "outline",
    "outline-0",
  ],
  {
    variants: {
      intent: {
        normal: ["border-primary-500"],
        error: ["border-error-500"],
        confirmed: ["border-confirmed-500"]
      },
    },
  }
);

/**
 * Renders a field component that displays a word from a seed phrase.
 * 
 * @prop {string} word - A string representing a word of a seed phrase for a wallet.
 * @prop {number} wordNumber - The numeric index associated with each word in the seed phrase.
 * @prop {string} intent - Optional style of the word field; default is "normal".
 * @prop {function} onWordChange - A function that handles a change in the word field, if the field is editable.
 * @prop {string[]} wordsArray - An array of strings that make up the seed phrase.
 * @returns {JSX.Element} - A field component displaying a word from a seed phrase.
 */
export default function SeedPhraseWordField({
  word,
  wordNumber,
  intent = "normal",
  onWordChange,
  wordsArray,
}:  React.PropsWithChildren<Props>): JSX.Element {
  const isEditable = intent === "error";
  const [inputWord, setInputWord] = useState(word);

  useEffect(() => {
    setInputWord(word); // Update the input word when the word prop changes
  }, [word]);
  
  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const newWord = event.target.value;
    setInputWord(newWord);
    const wordIndex = parseInt(wordNumber, 10) - 1;
    if (isEditable) { // && wordsArray[wordIndex] === newWord
      onWordChange(wordIndex, newWord);
    }
  };

  const calculatedIntent =
    isEditable && wordsArray[parseInt(wordNumber, 10) - 1] === inputWord
      ? "confirmed"
      : intent;
  
  return (
    <div className="items-center flex ml-2">
      <div className="w-6 text-white font-ruda text-lg mx-4 text-right">
        {wordNumber}
      </div>
      <input
        className={inputField({ intent: calculatedIntent })}
        value={inputWord}
        readOnly={!isEditable}
        onChange={isEditable ? handleInputChange : undefined}
        {...(isEditable && { readOnly: false })}
      >
      </input>
    </div>
  );
}
