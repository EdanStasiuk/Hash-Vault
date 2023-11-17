interface Props {
  word: string;
  wordNumber: string;
}

export default function KeyPhraseWordField({
  word,
  wordNumber,
}: React.PropsWithChildren<Props>) {
  return (
    <div className="items-center flex ml-2">
      <div className="w-6 text-white font-ruda text-lg mx-4 text-right">
        {wordNumber}
      </div>
      <div className="items-center flex h-8 w-44 rounded-[9px] border border-primary-500 bg-transparent px-3 text-white outline outline-0">
        {word}
      </div>
    </div>
  );
}
