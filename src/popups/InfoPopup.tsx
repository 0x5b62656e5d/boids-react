import { useRef } from "react";
import { IconContext } from "react-icons";
import { RxCross2 } from "react-icons/rx";
import { useHandleClickOutside } from "../utils/useHandleClickOutside";

interface InfoPopupProps {
	showInfoPopup: boolean;
	setShowInfoPopup: (show: boolean) => void;
}

export const InfoPopup: React.FC<InfoPopupProps> = ({ showInfoPopup, setShowInfoPopup }) => {
	const popupRef = useRef<HTMLDivElement>(null);

	useHandleClickOutside({ ref: popupRef, setPopupState: setShowInfoPopup });

	return (
		<div className={`popup ${showInfoPopup ? "show" : ""}`}>
			<div className="popup-wrapper" ref={popupRef}>
				<h2>What's this?</h2>
				<p>
					This is a simulation of the boids algorithm, developed by Craig Reynolds in
					1986. This artificial life program simulates the flocking behavior of birds. For
					more information, check out the{" "}
					<a href="https://en.wikipedia.org/wiki/Boids" target="_blank">Wikipedia page</a>.
				</p>
				<div className="exit-form" onClick={() => setShowInfoPopup(false)}>
					<IconContext.Provider value={{ size: "26px" }}>
						<RxCross2 />
					</IconContext.Provider>
				</div>
			</div>
		</div>
	);
};
