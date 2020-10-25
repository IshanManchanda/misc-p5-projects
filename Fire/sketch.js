// TODO: Convert
/*
Drag Mouse At A Speed Slower Than 30 Pixels Per Second To Burn Leaves.
P.s. Don't Burn Too Much Or Too Fast Or Else System Will Lag And Global Warming Will Speed Up.
*/

angleMode = "radians";

var Particle = function(position) {
	this.acceleration = new PVector(0, -0.05);
	this.velocity = new PVector(random(-1, 1), random(-1, 0));
	this.position = position.get();
	this.timeToLive = 100;
};

Particle.prototype.run = function() {
	this.update();
	this.display();
};

Particle.prototype.update = function(){
	this.velocity.add(this.acceleration);
	this.position.add(this.velocity);
	this.timeToLive -= 2;
};

Particle.prototype.display = function() {
	colorMode(HSB);
	var col = map(this.timeToLive,100,0,0,40);
	noStroke();
	fill(col, 255, 255, this.timeToLive);
	ellipse(this.position.x, this.position.y, 12, 12);
};

Particle.prototype.isDead = function() {
	if (this.timeToLive < 0) {
		return true;
	} else {
		return false;
	}
};

var ParticleSystem = function(position) {
	this.origin = position.get();
	this.particles = [];
};

ParticleSystem.prototype.addParticle = function() {
	this.particles.push(new Particle(this.origin));
};

ParticleSystem.prototype.run = function() {
	for (var i = this.particles.length-1; i >= 0; i--) {
		var p = this.particles[i];

		var p = this.particles[i];

		try {   // Let's try, but don't freak out if it fails
			p.run();    // Trying to run particle
		} catch (e) {   // Dammit! Something went wrong
			throw ({    // Hack Oh Noes and tell the user
				message: "Make sure the values you pass to the fill() function are always positive. " + e
			});
		}

		if (p.isDead()) {
			this.particles.splice(i, 1);
		}
	}
};

// We start off with an empty systems array
//var a = new PVector (20,20);
var systems = [];
//systems.push(new ParticleSystem(new PVector(40,40)));

// We fill up the leaves array with positions
var leaves = [];
for (var i = 0; i < 100; i++) {
	leaves.push(new PVector(random(0, width), random(0, height)));
}

mouseDragged = function() {
	systems.push(new ParticleSystem(new PVector(mouseX, mouseY)));
};

draw = function() {
	colorMode(RGB);
	background(66, 57, 11);

	for (var i = 0; i < leaves.length; i++) {
		image(getImage("avatars/leaf-orange"), leaves[i].x, leaves[i].y, 30, 30);
	}
	for (var i = 0; i < systems.length; i++){
		systems[i].addParticle();
		systems[i].run();
	}
};

