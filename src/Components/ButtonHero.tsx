import { cva } from 'class-variance-authority';
import { ButtonHeroIntent } from './constants';
import { To, useNavigate } from 'react-router-dom';

interface Props {
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  intent?: ButtonHeroIntent;
  routerPath?: To;
}

const button = cva(
  [
    'border-2',
    'rounded-3xl',
    'text-xl',
    'transition-all',
    'm-3',
    'p-12',
    'hover:scale-103',
  ],
  {
    variants: {
      intent: {
        solid: [
          'text-background-500',
          'bg-primary-500',
          'border-primary-500',
        ],
        outline: [
          'text-primary-500',
          'bg-transparent',
          'border-primary-500',
        ]
      },
    },
  },
);


export default function ButtonHero({
  children,
  intent,
  routerPath = '',
}: React.PropsWithChildren<Props>) {
  const navigate = useNavigate();
  return (
    <button onClick={() => navigate(routerPath)} className={button({ intent })}>
      {children}
    </button>
  );
}