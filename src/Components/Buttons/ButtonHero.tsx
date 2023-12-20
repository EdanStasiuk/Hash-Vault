import { cva } from 'class-variance-authority';
import { ButtonHeroIntent } from '../constants';
import { To, useNavigate } from 'react-router-dom';

interface Props {
  intent?: ButtonHeroIntent;
  routerPath?: To;
}

/**
 * Variant styles.
 */
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

/**
 * ButtonHero component for primary display.
 * 
 * Accepts children.
 * @prop {string} intent - Optional style of the button; defaults to "solid".
 * @prop {string} routerPath - Optional path to route to when the button is clicked; defaults to an empty string.
 * @returns {JSX.Element} - A button meant for primary display.
 */
export default function ButtonHero({
  children,
  intent = "solid",
  routerPath = '',
}: React.PropsWithChildren<Props>) {
  const navigate = useNavigate();
  return (
    <button onClick={() => {navigate(routerPath)}} className={button({ intent })}>
      {children}
    </button>
  );
}