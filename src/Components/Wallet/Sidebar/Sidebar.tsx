import Badge from "./Badge";
import NavItem from "./NavItem";
import { LayoutGroup } from "framer-motion";

interface Props {
  activeItem: string;
  onItemClick: (label: string) => void;
}

interface SidebarItem {
  label: string;
  onClickLabel: string;
}

/**
 * Sidebar items representing different sections in the wallet dashboard.
 * Each item has a label for display and an onClickLabel to identify the item when clicked.
 * 
 * @property {string} label - The display label for the sidebar item.
 * @property {string} onClickLabel - The identifier used when the sidebar item is clicked.
 */
const sidebarItems: SidebarItem[] = [
  { label: "Accounts", onClickLabel: "Accounts" },
  { label: "Send", onClickLabel: "Send" },
  { label: "Receive", onClickLabel: "Receive" },
  { label: "Transactions", onClickLabel: "Transactions" },
  { label: "Address Book", onClickLabel: "Address Book" },
  { label: "Settings", onClickLabel: "Settings" },
];

/**
 * Renders a sidebar component for the wallet dashboard.
 *
 * @prop {string} activeItem - The label of the currently active item in the sidebar.
 * @prop {Function} onItemClick - Function triggered when a sidebar item is clicked.
 * @returns {JSX.Element} - A sidebar component.
 */
export default function Sidebar({
  activeItem,
  onItemClick,
}: React.PropsWithChildren<Props>): JSX.Element {

  return (
    <div className="flex-grow p-8">
      <Badge />
      <LayoutGroup>
        {sidebarItems.map((item: SidebarItem) => {
          return (
            <NavItem
              key={item.label}
              label={item.label}
              isActive={activeItem === item.label}
              onClick={() => {
                onItemClick(item.onClickLabel);
              }}
            />
          );
        })}
      </LayoutGroup>
    </div>
  );
}
