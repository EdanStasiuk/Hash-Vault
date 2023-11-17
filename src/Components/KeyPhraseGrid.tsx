import KeyPhraseWordField from './KeyPhraseWordField';

function KeyPhraseGrid() {
  const numRows = 6;
  const numCols = 4;

  const generateGrid = () => {
    const grid = [];
    let wordNumber = 1;

    for (let row = 0; row < numRows; row++) {
      const rowItems = [];
      for (let col = 0; col < numCols; col++) {
        rowItems.push(
          <KeyPhraseWordField key={`${row}-${col}`} word="word" wordNumber={wordNumber.toString()} />
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
  };

  return <div>{generateGrid()}</div>;
}

export default KeyPhraseGrid;
