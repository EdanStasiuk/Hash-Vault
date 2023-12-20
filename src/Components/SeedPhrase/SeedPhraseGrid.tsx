import { Mnemonic } from "@hashgraph/sdk";

import SeedPhraseWordField from "./SeedPhraseWordField";
import { useEffect, useState } from "react";

interface Props {
  confirmationGrid?: boolean;
  updateFieldValues?: ((fieldValues: string[]) => void) | undefined;
}

/**
 * Placeholder function for updating field values.
 * This function does not perform any action and remains empty by design.
 */
const defaultUpdateFieldValues = () => {
  // Leave empty
};

/**
 * Asynchronously retrieves a previously generated seed phrase from the browser's local storage, if available.
 * @returns {Promise<string[] | null>} A Promise that resolves with the stored seed phrase in JSON format if found.
 *                                     Resolves with null if no seed phrase is found in local storage or if an error occurs.
 */
async function getWordsArrayFromStorage(): Promise<string[] | null> {
  try {
    return new Promise((resolve) => {
      const storedWords = localStorage.getItem("seedPhrase");
      if (storedWords) {
        resolve(JSON.parse(storedWords) as string[]);
      } else {
        resolve(null);
      }
    });
  } catch (error) {
    console.error("Error retrieving words from local storage:", error);
    return null;
  }
}

/**
 * Generates a seed phrase using the Mnemonic class from Hedera Hashgraph's SDK.
 * Stores the generated seed phrase in the browser's local storage.
 * @returns {string[]} The seed phrase as an array of strings.
 * @returns {[]} An empty array in case of an error during generation.
 */
async function generateAndGetWordsArray(): Promise<string[]> {
  try {
    const mnemonic = await Mnemonic.generate();
    const mnemonicString = mnemonic.toString();
    const wordsArray = mnemonicString.split(" ");

    localStorage.setItem("seedPhrase", JSON.stringify(wordsArray));

    return wordsArray;
  } catch (error) {
    console.error("Error generating mnemonic:", error);
    return [];
  }
}

/**
 * Generates a random integer between the specified minimum and maximum values (inclusive).
 * @param {number} min - The minimum value of the range.
 * @param {number} max - The maximum value of the range.
 * @returns {number} A random integer within the specified range (inclusive).
 */
function getRandomInteger(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

/**
 * @Prop confirmationGrid: an optional boolean with a default value of false. If set to true
 *     then the a field in each row of the grid is randomly chosen to be filled out by the user.
 * @Prop updateFieldValues: an optional function that updates the field values in the grid.
 *     Has a default value of a null function. NOTE: If 'confirmationGrid' is set to true,
 *     ensure to provide a non-null function using this prop to update field values accordingly.
 * @returns a grid display of a seed phrase.
 */
export default function SeedPhraseGrid({
  confirmationGrid = false,
  updateFieldValues = defaultUpdateFieldValues,
}: React.PropsWithChildren<Props>) {

  // Throw an error if props aren't being passed properly.
  useEffect(() => {
    if (confirmationGrid && updateFieldValues === null) {
      throw new Error(
        "If 'confirmationGrid' is true, 'updateFieldValues' must be a non-null function."
      );
    }
  }, [confirmationGrid, updateFieldValues]);

  const numRows = 6;
  const numCols = 4;

  const [wordsArray, setWordsArray] = useState<string[]>([]);
  const [fieldValues, setFieldValues] = useState<string[]>([]);
  const [randomIntegers, setRandomIntegers] = useState<number[]>([]);

  /**
  * Handles the change of a word at a specified index in the fieldValues array.
  * @param {number} index The index of the word to be updated in the fieldValues array.
  * @param {string} value The new value to be assigned to the word.
  */
  const handleWordChange = (index: number, value: string) => {
    const updatedFieldValues = [...fieldValues];
    updatedFieldValues[index] = value;
    setFieldValues(updatedFieldValues);
    updateFieldValues(updatedFieldValues);
  };
  
  /**
   * Takes each index value stored in the 'randomInts' array and assigns an empty string to
   * the corresponding indices in a 'wordArray' copy.
   * @param wordArray Array of strings containing a seed phrase.
   * @param randomInts Array of ints containing indices to be set to "" in the wordArray.
   * @returns a modified copy of 'wordArray' with nullified strings throughout according to
   * the indices stored in 'randomInts'.
   */
  function nullifyRandomIndices(wordArray: string[], randomInts: number[]): string[] {
    const indices = [];
    for (let i = 0; i < randomInts.length; i++) {
      indices.push(randomInts[i] + i * numCols);
    }

    const ret: string[] = [...wordArray]; // Copy the wordArray to the ret array

    for (const index of indices) {
      if (index < ret.length) {
        ret[index] = ""; // Nullify the element at the given index
      }
    }

    return ret;
  }

  /**
   * Gets and sets words array from local storage. Generates new words array if not found in local storage.
   */
  useEffect(() => {
    // Generate and set random integers to be nullifed.
    const randomsArray = Array.from({ length: numRows }, () =>
      getRandomInteger(0, numCols - 1)
    );
    setRandomIntegers(randomsArray);
    
    getWordsArrayFromStorage()
      .then((storedWords) => {
        if (storedWords) {
          setWordsArray(storedWords);
          setFieldValues(nullifyRandomIndices(storedWords, randomsArray));
        } else {
          return generateAndGetWordsArray();
        }
      })
      .then((generatedWords) => {
        if (generatedWords) {
          setWordsArray(generatedWords);
          setFieldValues(nullifyRandomIndices(generatedWords, randomsArray));
        }
      })
      .catch((error) => {
        console.error("Error", error);
      });

  }, []);

  /**
   * Generates a grid of SeedPhraseWordField components based on specified parameters.
   * @returns {JSX.Element[]} An array of React components representing the grid.
   */
  function generateGrid() {
    const grid = [];
    let wordNumber = 1;

    for (let row = 0; row < numRows; row++) {
      const randomInteger = randomIntegers[row] || 0; // Gets the stored random integer for each row.
      const rowItems = [];
      
      for (let col = 0; col < numCols; col++) {
        let currentWord = wordsArray[wordNumber - 1] || "";
        if (confirmationGrid && randomInteger == col) {
          currentWord = "";
        }

        rowItems.push(
          <SeedPhraseWordField
            key={`${row}-${col}`}
            word={currentWord}
            wordNumber={wordNumber.toString()}
            intent={
              randomInteger == col && confirmationGrid ? "error" : "normal"
            }
            onWordChange={(index: number, value: string) =>
              {handleWordChange(index, value)}
            }
            wordsArray={wordsArray}
          />
        );

        wordNumber++;
      }
      
      grid.push(
        <div key={row} className="flex justify-between mt-4">
          {rowItems}
        </div>
      );
    }

    return grid;
  }

  return <div>{generateGrid()}</div>;
}
