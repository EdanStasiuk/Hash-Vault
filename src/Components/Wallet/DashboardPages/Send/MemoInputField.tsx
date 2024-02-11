interface Props {
  label: string;
  value?: string;
}

export default function MemoInputField({
  label,
  value,
}: React.PropsWithChildren<Props>) {
  return (
    <div>
      <p className="text-white font-roboto text-xl font-light">{label}</p>
      <input
        className="w-[440px] h-11 p-3 rounded-lg bg-transparent border border-solid border-primary-500 outline-none text-white text-lg font-light font-roboto placeholder-ghost-500"
        type="text"
        value={value}
        required
      />
    </div>
  );
}
