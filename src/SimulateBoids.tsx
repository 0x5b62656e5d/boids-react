import { ReactP5Wrapper } from "@p5-wrapper/react";
import p5 from "p5";
import Boid from "./Boid";
import { JSX } from "react";

/**
 * Boids simulation component
 *
 * @returns A {@link JSX.Element} representing the boids simulation
 */
export default function SimulateBoids(): JSX.Element {
	/**
	 * Main sketch function
	 *
	 * @param p5 p5 instance
	 */
	const sketch = (p5: p5) => {
		const boids: Boid[] = [];

		p5.setup = () => {
			p5.createCanvas(p5.windowWidth, p5.windowHeight);

			for (let i = 0; i < 300; i++) {
				boids.push(new Boid(p5, p5.random(p5.width), p5.random(p5.height)));
			}
		};

		p5.draw = () => {
			p5.background("#222436");

			for (const boid of boids) {
				boid.wrapEdges();
				boid.flock(boids);
				boid.update();
				boid.show();
			}
		};
	};

	return (
		<>
			<ReactP5Wrapper sketch={sketch} />
		</>
	);
}
