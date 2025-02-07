import React, { useRef } from "react";
import "./HamburgerMenu.css";
import { useHandleClickOutside } from "../utils/useHandleClickOutside";

interface HamburgerMenuProps {
	children: React.ReactNode[];
	open: boolean;
	setOpen: (open: boolean) => void;
}

export function HamburgerMenu(props: HamburgerMenuProps) {
	const hamburgerRef = useRef<HTMLDivElement>(null);

	useHandleClickOutside({ ref: hamburgerRef, setPopupState: props.setOpen });

	return (
		<div className="hamburger-menu" ref={hamburgerRef}>
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
