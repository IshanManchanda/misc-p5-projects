// TODO: Fix issues
const height = 600, width = 1200;
let systems = [];


class Particle {
	constructor(position) {
		this.acceleration = createVector(0, -0.0);
		this.velocity = createVector(4 * Math.random() - 2, -8 * Math.random());
		this.position = position.copy();
		this.life = 100;
	}

	update() {
		this.velocity.add(this.acceleration);
		// this.velocity.limit(0.3);
		this.position.add(this.velocity);

		--this.life;
		--this.life;
	}

	draw() {
		colorMode(HSB);
		const col = 0.6 * (100 - this.life);
		noStroke();
		fill(col, 255, 255, this.life/100);
		ellipse(this.position.x, this.position.y, 10 + this.life / 10);
	}

	isDead() {
		return this.life <= 0;
	}
}

class ParticleSystem {
	constructor(origin) {
		this.origin = origin;
		this.particles = [];
	}

	addParticle() {
		this.particles.push(new Particle(this.origin));
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
	frameRate(240);

	// TODO: Add leaves
	// We fill up the leaves array with positions
	// var leaves = [];
	// for (let i = 0; i < 100; ++i) {
	// 	leaves.push(new PVector(random(0, width), random(0, height)));
	// }
}

function draw() {
	colorMode(RGB);
	// background(66, 57, 11);
	background(0);

	// for (let i = 0; i < leaves.length; ++i) {
	// 	image(getImage("avatars/leaf-orange"), leaves[i].x, leaves[i].y, 30, 30);
	// }

	// console.log(systems.length);
	for (let i = 0; i < systems.length; ++i){
		systems[i].addParticle();
		systems[i].addParticle();
		systems[i].run();
	}
}

function mouseDragged() {
	systems.push(new ParticleSystem(createVector(mouseX, mouseY)));
}
