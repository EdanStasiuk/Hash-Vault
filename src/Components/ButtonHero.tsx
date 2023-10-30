import { cva } from 'class-variance-authority';
import { ButtonIntent } from './constants';

interface Props {
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  intent?: ButtonIntent;
}

const button = cva(
  [
    'border-2',
    'rounded-3xl',
    'text-xl',
    'transition-all',
    'm-3',
    'p-12',
  ],
  {
    variants: {
      intent: {
        solid: [
          'text-background-500',
          'bg-primary-500',
          'border-primary-500',
          'hover:scale-103'
        ],
        outline: [
          'text-primary-500',
          'border-primary-500',
          'hover:scale-103'
        ]
      },
    },
  },
);


export default function ButtonHero({
  children,
  intent,
  onClick,
}: React.PropsWithChildren<Props>) {
  return (
    <button onClick={onClick} className={button({ intent })}>
      {children}
    </button>
  );
}