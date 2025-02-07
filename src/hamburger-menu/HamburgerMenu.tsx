import React from "react";
import "./HamburgerMenu.css";

interface HamburgerMenuProps {
	children: React.ReactNode[];
	open: boolean;
	setOpen: (open: boolean) => void;
}

export function HamburgerMenu(props: HamburgerMenuProps) {
	return (
		<div className="hamburger-menu">
			<div
				className={`hamburger-icon ${props.open ? "open" : ""}`}
				onClick={() => props.setOpen(!props.open)}
			>
				<span></span>
				<span></span>
				<span></span>
			</div>

			<div className={`menu-icons ${props.open ? "open" : ""}`}>{props.children.map(child => child)}</div>
		</div>
	);
}
