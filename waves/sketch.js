const height = 600, width = 900;
let waves = [];


class Wave {
	constructor(amplitude, period, color) {
		this.startAngle = 0;
		this.amplitude = amplitude;
		this.period = period;
		this.color = color;
		this.angleVel = (Math.PI / this.period) * 10;
	}

	draw() {
		this.startAngle += 2 * Math.PI / this.period;
		let angle = this.startAngle;

		fill(this.color);
		for (let x = 0; x <= width; x += 24) {
			const y = this.amplitude * sin(angle);

			ellipse(x,y + height / 2,40,40);
			angle += this.angleVel;
		}
	}
}


function setup() {
	createCanvas(width, height);
	angleMode(RADIANS);
	frameRate(240);

	translate(0,0);

	waves.push(new Wave(50, 50, color(0, 255, 30, 100)))
	waves.push(new Wave(100, 125, color(0, 255, 242, 100)));
	waves.push(new Wave(150, 150, color(250, 0, 0, 100)));
	waves.push(new Wave(250, 200, color(222, 16, 215, 100)));
	waves.push(new Wave(300, 250, color(250, 108, 0, 100)));

}


draw = function() {
	background(0);

	for (let i = 0; i < waves.length; ++i) {
		waves[i].draw();
	}
};
