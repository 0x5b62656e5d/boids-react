import p5 from "p5";
import { ReactP5Wrapper } from "@p5-wrapper/react";
import Boid, { BoidConfig } from "./Boid";
import { JSX, useCallback, useEffect, useRef, useState } from "react";
import { HamburgerMenu } from "./hamburger-menu/HamburgerMenu";
import { IoIosInformationCircle, IoMdSettings } from "react-icons/io";
import { MenuItem } from "./hamburger-menu/MenuItem";
import { ConfigPopupForm } from "./popups/ConfigForm";
import { InfoPopup } from "./popups/InfoPopup";
import { HiMiniPlay, HiMiniPause } from "react-icons/hi2";
import "./popups/forms.css";

interface SimulationConfigs {
	boidConfig: BoidConfig;
	boidAmount: number;
}

/**
 * Boids simulation component
 *
 * @returns A {@link JSX.Element} representing the boids simulation
 */
export default function SimulateBoids(): JSX.Element {
	const [showInfoPopup, setShowInfoPopup] = useState<boolean>(false);
	const [showConfigPopup, setShowConfigPopup] = useState<boolean>(false);
	const [showHamburgerMenu, setShowHamburgerMenu] = useState<boolean>(false);

	const [simulationConfig, setSimulationConfig] = useState<SimulationConfigs>({
		boidConfig: {
			maxVelocity: 2,
			maxForce: 0.2,
			alignmentMultiplier: 1,
			cohesionMultiplier: 1,
			separationMultiplier: 1.5,
			perceptionRadius: 50,
			perceptionFov: 300,
			drawFovLines: false,
		},
		boidAmount: 100,
	});
	const [simulationConfigInput, setSimulationConfigInput] = useState({
		boidConfig: {
			maxVelocity: simulationConfig.boidConfig.maxVelocity.toString(),
			maxForce: simulationConfig.boidConfig.maxForce.toString(),
			alignmentMultiplier: simulationConfig.boidConfig.alignmentMultiplier.toString(),
			cohesionMultiplier: simulationConfig.boidConfig.cohesionMultiplier.toString(),
			separationMultiplier: simulationConfig.boidConfig.separationMultiplier.toString(),
			perceptionRadius: simulationConfig.boidConfig.perceptionRadius.toString(),
			perceptionFov: simulationConfig.boidConfig.perceptionFov.toString(),
			drawFovLines: simulationConfig.boidConfig.drawFovLines.toString(),
		},
		boidAmount: simulationConfig.boidAmount.toString(),
	});

	const [pause, setPause] = useState<boolean>(false);
	const pauseRef = useRef<boolean>(false);

	useEffect(() => {
		const timeout = setTimeout(() => {
			setShowInfoPopup(true);
		}, 500);

		return () => clearTimeout(timeout);
	}, []);

	useEffect(() => {
		pauseRef.current = pause;
	}, [pause]);

	/**
	 * Main sketch function
	 *
	 * @param p5 p5 instance
	 */
	const sketch = useCallback(
		(p5: p5) => {
			const boids: Boid[] = [];

			/**
			 * Setup function
			 */
			p5.setup = () => {
				p5.createCanvas(p5.windowWidth, p5.windowHeight);
				p5.frameRate(60);

				for (let i = 0; i < simulationConfig.boidAmount; i++) {
					boids.push(
						new Boid(
							p5,
							p5.random(p5.width),
							p5.random(p5.height),
							simulationConfig.boidConfig
						)
					);
				}
			};

			/**
			 * Main draw function
			 */
			p5.draw = () => {
				p5.background("#222436");

				for (const boid of boids) {
					if (!pauseRef.current) {
						boid.wrapEdges();
						boid.flock(boids);
						boid.update();
					}
					boid.show();
				}
			};
		},
		[simulationConfig]
	);

	/**
	 * Handles the submission of the config popup
	 *
	 * @param e {@link React.FormEvent} event
	 */
	const handleConfigSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		const newMaxVelocity = parseFloat(simulationConfigInput.boidConfig.maxVelocity);
		const newMaxForce = parseFloat(simulationConfigInput.boidConfig.maxForce);
		const newAlignment = parseFloat(simulationConfigInput.boidConfig.alignmentMultiplier);
		const newCohesion = parseFloat(simulationConfigInput.boidConfig.cohesionMultiplier);
		const newSeparation = parseFloat(simulationConfigInput.boidConfig.separationMultiplier);
		const newPerceptionRadius = parseFloat(simulationConfigInput.boidConfig.perceptionRadius);
		const newPerceptionFov = parseFloat(simulationConfigInput.boidConfig.perceptionFov);
		const newDrawFovLines = JSON.parse(simulationConfigInput.boidConfig.drawFovLines);
		const newAmount = parseFloat(simulationConfigInput.boidAmount);

		setSimulationConfig({
			boidConfig: {
				maxVelocity: newMaxVelocity,
				maxForce: newMaxForce,
				alignmentMultiplier: newAlignment,
				cohesionMultiplier: newCohesion,
				separationMultiplier: newSeparation,
				perceptionRadius: newPerceptionRadius,
				perceptionFov: newPerceptionFov,
				drawFovLines: newDrawFovLines,
			},
			boidAmount: newAmount,
		});

		setShowConfigPopup(false);
	};

	return (
		<>
			<ReactP5Wrapper sketch={sketch} />

			<HamburgerMenu open={showHamburgerMenu} setOpen={setShowHamburgerMenu}>
				<MenuItem
					onClick={() => {
						if (showHamburgerMenu && !showConfigPopup) {
							setShowInfoPopup(true);
							setShowHamburgerMenu(false);
						}
					}}
					icon={IoIosInformationCircle}
				/>
				<MenuItem
					onClick={() => {
						if (showHamburgerMenu && !showInfoPopup) {
							setShowConfigPopup(true);
							setShowHamburgerMenu(false);
						}
					}}
					icon={IoMdSettings}
				/>
				<MenuItem
					onClick={() => {
						if (showHamburgerMenu) {
							setPause(prev => !prev);
						}
					}}
					icon={pause ? HiMiniPlay : HiMiniPause}
				/>
			</HamburgerMenu>

			<InfoPopup showInfoPopup={showInfoPopup} setShowInfoPopup={setShowInfoPopup} />

			<ConfigPopupForm
				simulationConfigInput={simulationConfigInput}
				setSimulationConfigInput={setSimulationConfigInput}
				onSubmit={handleConfigSubmit}
				showConfigPopup={showConfigPopup}
				setShowConfigPopup={setShowConfigPopup}
			/>
		</>
	);
}
