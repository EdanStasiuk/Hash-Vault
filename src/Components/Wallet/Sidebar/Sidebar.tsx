import Badge from './Badge';
import NavItem from './NavItem';
import { LayoutGroup } from 'framer-motion';
import { useState } from 'react';

/**
 * Renders a sidebar component for the wallet dashboard.
 * 
 * @returns {JSX.Element} - A sidebar component.
 */
export default function Sidebar(): JSX.Element {
  const [activeItem, setActiveItem] = useState<string>('Accounts');

  const handleItemClick = (label: string) => {
    setActiveItem(label);
  };
  return (
    <div className='flex-grow p-8'>
      <Badge />
      <LayoutGroup>
        <NavItem
          label='Accounts'
          isActive={activeItem === 'Accounts'}
          onClick={() => { handleItemClick('Accounts') }}
        />
        <NavItem
          label='Send'
          isActive={activeItem === 'Send'}
          onClick={() => { handleItemClick('Send') }}
        />
        <NavItem
          label='Receive'
          isActive={activeItem === 'Receive'}
          onClick={() => { handleItemClick('Receive') }}
        />
        <NavItem
          label='Transactions'
          isActive={activeItem === 'Transactions'}
          onClick={() => { handleItemClick('Transactions') }}
        />
        <NavItem
          label='Settings'
          isActive={activeItem === 'Settings'}
          onClick={() => { handleItemClick('Settings') }}
        />
      </LayoutGroup>
    </div>
  );
}
