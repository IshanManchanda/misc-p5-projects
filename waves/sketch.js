// TODO: Convert

angleMode = "radians";

const Wave = function (amplitude, period, color) {
	this.startAngle = 0;
	this.amplitude = amplitude;
	this.period = period;
	this.color = color;
	this.angleVel = (TWO_PI / this.period) * 5;
	//println(this.angleVel);
};

Wave.prototype.update = function() {

	//println(this.startAngle);
};

Wave.prototype.draw = function() {
	this.startAngle += TWO_PI / this.period;
	let Ang = this.startAngle;
	//println(sin(Ang));
	fill(this.color);
	for (let x = 0; x <= width; x += 24) {
		const y = this.amplitude * sin(Ang);
		//println(Ang);
		ellipse(x,y + height/2,40,40);
		Ang += this.angleVel;
	}
};

const wave = new Wave(200, 100, color(0, 255, 30, 100));
const wave2 = new Wave(200, 125, color(0, 255, 242, 100));
const wave3 = new Wave(200, 150, color(250, 0, 0, 100));
const wave4 = new Wave(200, 175, color(222, 16, 215, 100));
const wave5 = new Wave(200, 200, color(250, 108, 0, 100));

translate(0,0);

draw = function() {
	//background(255);
	wave.update();
	wave2.update();
	wave3.update();
	wave4.update();
	wave5.update();
	wave.draw();
	wave2.draw();
	wave3.draw();
	wave4.draw();
	wave5.draw();
};
