import type p5 from "p5";

export interface BoidConfig {
	maxVelocity: number;
	maxForce: number;
	alignmentMultiplier: number;
	cohesionMultiplier: number;
	separationMultiplier: number;
	perceptionRadius: number;
}

export default class Boid {
	p5: p5;

	maxVelocity: number = 2;
	maxForce: number = 0.2;

	alignmentMultiplier: number = 1;
	cohesionMultiplier: number = 1;
	separationMultiplier: number = 1.5;

	perceptionRadius: number = 50;

	position: p5.Vector;
	velocity: p5.Vector;
	acceleration: p5.Vector;

	/**
	 * Creates a new {@link Boid} with a random velocity within the maxVelocity
	 *
	 * @param p5 p5 instance
	 * @param x x position
	 * @param y y position
	 * @param config Boid configuration
	 */
	constructor(p5: p5, x: number, y: number, config: BoidConfig) {
		this.p5 = p5;
		this.position = p5.createVector(x, y);
		this.velocity = p5.createVector(
			p5.random(-this.maxVelocity, this.maxVelocity),
			p5.random(-this.maxVelocity, this.maxVelocity)
		);
		this.acceleration = p5.createVector(0, 0);

		this.maxVelocity = config.maxVelocity;
		this.maxForce = config.maxForce;
		this.alignmentMultiplier = config.alignmentMultiplier;
		this.cohesionMultiplier = config.cohesionMultiplier;
		this.separationMultiplier = config.separationMultiplier;
		this.perceptionRadius = config.perceptionRadius;
	}

	/**
	 * Wraps the boid around the edges of the canvas
	 */
	wrapEdges(): void {
		if (this.position.x > this.p5.width) {
			this.position.x = 0;
		}

		if (this.position.x < 0) {
			this.position.x = this.p5.width;
		}

		if (this.position.y > this.p5.height) {
			this.position.y = 0;
		}

		if (this.position.y < 0) {
			this.position.y = this.p5.height;
		}
	}

	/**
	 * Steers the boid towards the average velocity of local flockmates
	 *
	 * @param boids Array of {@link Boid} representing all boids in the simulation
	 * @returns A {@link p5.Vector} to align the boid with its local flockmates
	 */
	align(boids: Boid[]): p5.Vector {
		const steerVector = this.p5.createVector(0, 0);
		let total = 0;

		for (const other of boids) {
			const dist = this.p5.dist(
				this.position.x,
				this.position.y,
				other.position.x,
				other.position.y
			);

			if (other !== this && dist < this.perceptionRadius) {
				steerVector.add(other.velocity);
				total++;
			}
		}

		if (total > 0) {
			steerVector.div(total);
			steerVector.setMag(this.maxVelocity);
			steerVector.sub(this.velocity);
			steerVector.limit(this.maxForce);
		}
		return steerVector;
	}

	/**
	 * Steers the boid towards the average position of local flockmates
	 *
	 * @param boids Array of {@link Boid} representing all boids in the simulation
	 * @returns A {@link p5.Vector} to move the boid towards its local flockmates
	 */
	cohesion(boids: Boid[]): p5.Vector {
		const steerVector = this.p5.createVector(0, 0);
		let total = 0;

		for (const other of boids) {
			const d = this.p5.dist(
				this.position.x,
				this.position.y,
				other.position.x,
				other.position.y
			);

			if (other !== this && d < this.perceptionRadius) {
				steerVector.add(other.position);
				total++;
			}
		}

		if (total > 0) {
			steerVector.div(total);
			steerVector.sub(this.position);
			steerVector.setMag(this.maxVelocity);
			steerVector.sub(this.velocity);
			steerVector.limit(this.maxForce);
		}

		return steerVector;
	}

	/**
	 * Steers the boid to avoid crowding local flockmates
	 *
	 * @param boids Array of {@link Boid} representing all boids in the simulation
	 * @returns A {@link p5.Vector} to avoid crowding local flockmates
	 */
	separation(boids: Boid[]): p5.Vector {
		const steerVector = this.p5.createVector(0, 0);
		let total = 0;

		for (const other of boids) {
			const d = this.p5.dist(
				this.position.x,
				this.position.y,
				other.position.x,
				other.position.y
			);

			if (other !== this && d < this.perceptionRadius / 2) {
				const diff = this.p5.createVector(
					this.position.x - other.position.x,
					this.position.y - other.position.y
				);

				diff.div(d * d);
				steerVector.add(diff);
				total++;
			}
		}

		if (total > 0) {
			steerVector.div(total);
			steerVector.setMag(this.maxVelocity);
			steerVector.sub(this.velocity);
			steerVector.limit(this.maxForce);
		}

		return steerVector;
	}

	/**
	 * Adjusts acceleration based on alignment, cohesion, and separation
	 *
	 * @param boids Array of {@link Boid} representing all boids in the simulation
	 */
	flock(boids: Boid[]): void {
		const alignment = this.align(boids);
		const cohesion = this.cohesion(boids);
		const separation = this.separation(boids);

		alignment.mult(this.alignmentMultiplier);
		cohesion.mult(this.cohesionMultiplier);
		separation.mult(this.separationMultiplier);

		this.acceleration.add(alignment);
		this.acceleration.add(cohesion);
		this.acceleration.add(separation);
	}

	/**
	 * Updates the boid's velocity, position, and acceleration
	 */
	update(): void {
		this.position.add(this.velocity);
		this.velocity.add(this.acceleration);
		this.velocity.limit(this.maxVelocity);
		this.acceleration.mult(0);
	}

	/**
	 * Draws the boid as a triangle pointing in the direction of its velocity vector
	 */
	show(): void {
		const theta = this.velocity.heading() + this.p5.radians(90);
		this.p5.push();
		this.p5.translate(this.position.x, this.position.y);
		this.p5.rotate(theta);
		this.p5.fill(200, 100);
		this.p5.stroke(255);
		this.p5.beginShape();
		this.p5.vertex(0, -6);
		this.p5.vertex(-4, 6);
		this.p5.vertex(4, 6);
		this.p5.endShape(this.p5.CLOSE);
		this.p5.pop();
	}
}
