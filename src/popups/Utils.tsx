import { useEffect } from "react";

interface HandleClickOutsideProps {
	ref: React.RefObject<HTMLElement>;
	setPopupState: (state: boolean) => void;
}

/**
 * Handles clicks outside of a specified element (popup) and sets the popup state to false.
 *
 * @param ref - The reference to the popup element.
 * @param setPopupState - Function to change the state of the popup.
 */
export const useHandleClickOutside = ({ ref, setPopupState }: HandleClickOutsideProps) => {
	useEffect(() => {
		/**
		 * Checks if a click is outside the referenced element and closes the popup.
		 */
		const handleClickOutside = (event: MouseEvent) => {
			if (ref.current && !ref.current.contains(event.target as Node)) {
				setPopupState(false);
			}
		};

		document.addEventListener("mousedown", handleClickOutside);

		return () => {
			document.removeEventListener("mousedown", handleClickOutside);
		};
	}, [ref, setPopupState]);
};
