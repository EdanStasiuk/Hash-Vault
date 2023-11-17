import { cva } from 'class-variance-authority';

interface Props {
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
}

const hardwareButton = cva(
  [
    'flex',
    'place-items-center',
    'justify-center',
    'bg-secondary-500',
    'text-background-500',
    'text-xl',
    'h-18',
    'rounded-3xl',
    'transition-all',
    'hover:scale-103',
    'space-x-condense',
    'm-3',
    'px-12',
    'shrink-0',
  ]
);


export default function HardwareButton({
  children,
  onClick,
}: React.PropsWithChildren<Props>) {
  return (
    <button onClick={onClick} className={hardwareButton()}>
      {children}
    </button>
  );
}