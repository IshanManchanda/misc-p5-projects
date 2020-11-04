// TODO: Convert
const height = 600, width = 1200;
let pressure, system, obstacles = [];


class Particle {
	constructor(position) {
		this.acceleration = createVector(0, 0);
		this.velocity = createVector(0, 0);
		this.position = position.copy();
		this.life = 100;
	}

	update() {
		this.velocity.add(this.acceleration);
		this.position.add(this.velocity);

		this.acceleration.mult(0);
		this.life -= 2;
	}

	applyForce(f) {
		this.acceleration.add(f);
	}

	draw() {
		noStroke();
		fill(204, 241, 255, 150);
		ellipse(this.position.x, this.position.y, 24, 24);
	}

	isDead() {
		return this.position.x > width || this.position.y < 0 || this.position.y > height;
	}
}


class Obstacle {
	constructor(x, y) {
		this.power = 10000;
		this.position = createVector(x, y);
	}

	draw() {
		// TODO: Draw rock image
		// image(getImage("cute/Rock"), this.position.x, this.position.y-50, 60, 80);

		fill(255, 0, 0);
		ellipse(this.position.x, this.position.y, 50, 50);
	}

	calculateForce(pos) {
		let dir = p5.Vector.sub(this.position, pos);
		let dist = dir.mag();
		if (dist > 100) {
			return createVector(0, 0);
		}
		// let dist = constrain(dir.mag(), 0.5, width);
		let mag = -this.power / sq(dist);

		dir.normalize();
		dir.mult(mag);
		return dir;
	}
}


class ParticleSystem {
	constructor(origin, height) {
		this.origin = origin.copy();
		this.height = height;
		this.particles = [];
	}

	addParticles() {
		for (let i = 0; i < 10; ++i) {
			this.particles.push(new Particle(createVector(
				this.origin.x,
				this.origin.y + (Math.random() - 0.5) * this.height
			)));
		}
	}

	applyForce(f) {
		for (let i = 0; i < this.particles.length; ++i) {
			this.particles[i].applyForce(f);
		}
	}

	applyRepulsion(r) {
		for (let i = 0; i < this.particles.length; ++i) {
			let p = this.particles[i];
			p.applyForce(r.calculateForce(p.position));
		}
	}

	run() {
		for (let i = this.particles.length - 1; i > -1; --i) {
			this.particles[i].update();

			if (this.particles[i].isDead()) {
				this.particles.splice(i, 1);
			} else {
				this.particles[i].draw();
			}
		}
	}
}


function setup() {
	createCanvas(width, height);
	angleMode(RADIANS);
	frameRate(30);

	pressure = createVector(0.4, 0);
	system = new ParticleSystem(createVector(0, height / 2), height / 1.5);
}

function draw() {
	background(163,230,255);

	// TODO: Draw ground
	// for (let i = 0; i < 10; ++i) {
	// 	image(getImage("cute/DirtBlock"), i*95, -50,96,160);
	// 	image(getImage("cute/DirtBlock"), i*95, 269,96,160);
	// }


	// Draw river
	noStroke();
	fill(163, 230, 255);
	rect(0, 86, width, 233);

	// Particle - Obstacle interaction & draw obstacles
	for (let i = 0; i < obstacles.length; ++i) {
		system.applyRepulsion(obstacles[i]);
		obstacles[i].draw();
	}

	system.addParticles();
	system.applyForce(pressure);
	system.run();
}


function mouseClicked() {
	if(mouseX < width - 50 && mouseX > 50) {
		obstacles.push(new Obstacle(mouseX - 30, mouseY - 5));
	}
}
