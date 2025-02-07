import React from "react";
import { IconContext, IconType } from "react-icons";

interface MenuItemProps {
	icon: IconType;
	onClick: () => void;
}

export function MenuItem(props: MenuItemProps) {
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
