// ConfigPopupForm.tsx
import React, { useRef } from "react";
import { IconContext } from "react-icons";
import { RxCross2 } from "react-icons/rx";
import { useHandleClickOutside } from "./Utils";

interface ConfigPopupFormProps {
	simulationConfigInput: {
		boidConfig: {
			maxVelocity: string;
			maxForce: string;
			alignmentMultiplier: string;
			cohesionMultiplier: string;
			separationMultiplier: string;
			perceptionRadius: string;
		};
		boidAmount: string;
	};
	setSimulationConfigInput: (config: {
		boidConfig: {
			maxVelocity: string;
			maxForce: string;
			alignmentMultiplier: string;
			cohesionMultiplier: string;
			separationMultiplier: string;
			perceptionRadius: string;
		};
		boidAmount: string;
	}) => void;
	onSubmit: (e: React.FormEvent) => void;
	showConfigPopup: boolean;
	setShowConfigPopup: (show: boolean) => void;
}

export const ConfigPopupForm: React.FC<ConfigPopupFormProps> = ({
	simulationConfigInput,
	setSimulationConfigInput,
	onSubmit,
	showConfigPopup,
	setShowConfigPopup,
}) => {
	const popupRef = useRef<HTMLDivElement>(null);

	useHandleClickOutside({ ref: popupRef, setPopupState: setShowConfigPopup });

	return (
		<div className={`popup ${showConfigPopup ? "show" : ""}`}>
			<div className="popup-wrapper" ref={popupRef}>
				<h2>Set simulation properties</h2>
				<form onSubmit={onSubmit}>
					<label>Max velocity</label>
					<input
						type="number"
						step="any"
						value={simulationConfigInput.boidConfig.maxVelocity}
						onChange={e =>
							setSimulationConfigInput({
								...simulationConfigInput,
								boidConfig: {
									...simulationConfigInput.boidConfig,
									maxVelocity: e.target.value,
								},
							})
						}
						min={1}
						max={10}
						placeholder="2"
						className="popup-input"
					/>
					<label>Max force</label>
					<input
						type="number"
						step="any"
						value={simulationConfigInput.boidConfig.maxForce}
						onChange={e =>
							setSimulationConfigInput({
								...simulationConfigInput,
								boidConfig: {
									...simulationConfigInput.boidConfig,
									maxForce: e.target.value,
								},
							})
						}
						min={0.1}
						max={2}
						placeholder="2"
						className="popup-input"
					/>
					<label>Alignment multiplier</label>
					<input
						type="number"
						step="any"
						value={simulationConfigInput.boidConfig.alignmentMultiplier}
						onChange={e =>
							setSimulationConfigInput({
								...simulationConfigInput,
								boidConfig: {
									...simulationConfigInput.boidConfig,
									alignmentMultiplier: e.target.value,
								},
							})
						}
						min={0.2}
						max={10}
						placeholder="1"
						className="popup-input"
					/>
					<label>Cohesion multiplier</label>
					<input
						type="number"
						step="any"
						value={simulationConfigInput.boidConfig.cohesionMultiplier}
						onChange={e =>
							setSimulationConfigInput({
								...simulationConfigInput,
								boidConfig: {
									...simulationConfigInput.boidConfig,
									cohesionMultiplier: e.target.value,
								},
							})
						}
						min={0.2}
						max={10}
						placeholder="1"
						className="popup-input"
					/>
					<label>Separation multiplier</label>
					<input
						type="number"
						step="any"
						value={simulationConfigInput.boidConfig.separationMultiplier}
						onChange={e =>
							setSimulationConfigInput({
								...simulationConfigInput,
								boidConfig: {
									...simulationConfigInput.boidConfig,
									separationMultiplier: e.target.value,
								},
							})
						}
						min={0.2}
						max={10}
						placeholder="1.5"
						className="popup-input"
					/>
					<label>Perception radius</label>
					<input
						type="number"
						step="any"
						value={simulationConfigInput.boidConfig.perceptionRadius}
						onChange={e =>
							setSimulationConfigInput({
								...simulationConfigInput,
								boidConfig: {
									...simulationConfigInput.boidConfig,
									perceptionRadius: e.target.value,
								},
							})
						}
						min={30}
						max={100}
						placeholder="50"
						className="popup-input"
					/>
					<label>Boid amount</label>
					<input
						type="number"
						step="any"
						value={simulationConfigInput.boidAmount}
						onChange={e =>
							setSimulationConfigInput({
								...simulationConfigInput,
								boidAmount: e.target.value,
							})
						}
						min={50}
						max={500}
						placeholder="100"
						className="popup-input"
					/>
					<button type="submit" className="popup-button">
						Apply
					</button>
				</form>
				<div className="exit-form" onClick={() => setShowConfigPopup(false)}>
					<IconContext.Provider value={{ size: "26px" }}>
						<RxCross2 />
					</IconContext.Provider>
				</div>
			</div>
		</div>
	);
};
