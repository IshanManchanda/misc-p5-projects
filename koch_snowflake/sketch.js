let p1, p2, p3;
let old_lines = [], lines = [];
let iteration = 0;


class Kline {
	constructor(a, b) {
		this.start = a;
		this.end = b;

		this.step = p5.Vector.sub(this.end, this.start);
		this.step.div(3);
	}

	draw()  {
		line(this.start.x, this.start.y, this.end.x, this.end.y);
	};

	point_a() {
		return this.start.copy();
	};

	point_b() {
		return p5.Vector.add(this.start, this.step);
	};

	point_c() {
		let v = this.step.copy();
		v.rotate(-60);
		return p5.Vector.add(this.point_b(), v);
	};

	point_d() {
		return p5.Vector.sub(this.end, this.step);
	};

	point_e() {
		return this.end.copy();
	};

}


function gen(lines) {
	let next = [];

	for (let i = 0; i < lines.length; ++i) {
		const a = lines[i].point_a();
		const b = lines[i].point_b();
		const c = lines[i].point_c();
		const d = lines[i].point_d();
		const e = lines[i].point_e();

		next.push(new Kline(a,b));
		next.push(new Kline(b,c));
		next.push(new Kline(c,d));
		next.push(new Kline(d,e));
	}
	return next;
}


function setup() {
	createCanvas(1200, 600);
	angleMode(DEGREES);
	strokeWeight(2);

	p1 = createVector(400, 200);
	p2 = createVector(800, 200);
	p3 = createVector(600, 480);

	lines = [new Kline(p1, p2), new Kline(p2, p3), new Kline(p3, p1)];
}


function draw() {
	background(255, 255, 255);

	stroke(0, 255, 0);
	for (let i = 0; i < old_lines.length; ++i) {
		old_lines[i].draw();
	}

	stroke(0, 0, 0);
	for (let i = 0; i < lines.length; ++i) {
		lines[i].draw();
	}
}


function mouseClicked() {
	iteration++;
	if (iteration < 7) {
		old_lines = lines;
		lines = gen(lines);
	}
	else {
		old_lines = [];
		lines = [new Kline(p1, p2), new Kline(p2, p3), new Kline(p3, p1)];
		iteration = 0;
	}
}
