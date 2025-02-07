import { IconContext, IconType } from "react-icons";

interface MenuItemProps {
	icon: IconType;
	onClick: () => void;
}

/**
 * Menu item component
 * 
 * @param props {@link MenuItemProps} props
 * @returns A {@link JSX.Element} representing a menu item
 */
export const MenuItem: React.FC<MenuItemProps> = (props: MenuItemProps) => {
	return (
		<div className="menu-item" onClick={props.onClick}>
			{
				<IconContext.Provider value={{ color: "white", size: "26px" }}>
					<props.icon />
				</IconContext.Provider>
			}
		</div>
	);
}
