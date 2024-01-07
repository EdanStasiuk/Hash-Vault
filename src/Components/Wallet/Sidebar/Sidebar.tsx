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

const sidebarItems: SidebarItem[] = [
  { label: "Accounts", onClickLabel: "Accounts" },
  { label: "Send", onClickLabel: "Send" },
  { label: "Receive", onClickLabel: "Receive" },
  { label: "Transactions", onClickLabel: "Transactions" },
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
        {sidebarItems.map((item: SidebarItem) => (
          <NavItem
            key={item.label}
            label={item.label}
            isActive={activeItem === item.label}
            onClick={() => {
              onItemClick(item.onClickLabel);
            }}
          />
        ))}
      </LayoutGroup>
    </div>
  );
}
