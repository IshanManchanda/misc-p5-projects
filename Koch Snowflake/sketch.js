let lines = [];
let count = 0;


class Kline {
	constructor(a, b) {
		this.start = a;
		this.end = b;
	}

	draw()  {
		strokeWeight(2);
		line(this.start.x, this.start.y, this.end.x, this.end.y);
	};

	KA() {
		return this.start.copy();
	};

	KB() {
		let v = p5.Vector.sub(this.end, this.start);
		v.div(3);
		v.add(this.start);
		return v;
	};

	KC() {
		let a = this.start.copy();

		let v = p5.Vector.sub(this.end, this.start);
		v.div(3);
		a.add(v);

		v.rotate(-60);
		a.add(v);

		return a;
	};

	KD() {
		let v = p5.Vector.sub(this.end, this.start);
		v.mult(2 / 3);
		v.add(this.start);
		return v;
	};

	KE() {
		return this.end.copy();
	};

}


function gen(lines) {
	let next = [];

	for (let i = 0; i < lines.length; i++) {
		const a = lines[i].KA();
		const b = lines[i].KB();
		const c = lines[i].KC();
		const d = lines[i].KD();
		const e = lines[i].KE();

		next.push(new Kline(a,b));
		next.push(new Kline(b,c));
		next.push(new Kline(c,d));
		next.push(new Kline(d,e));
	}
	return next;
}


// noinspection JSUnusedGlobalSymbols
function setup() {
	createCanvas(1200, 600);
	angleMode(DEGREES);
	let start1 = createVector(400, 200);
	let end1 = createVector(800, 200);
	let s3 = createVector(600, 480);

	lines.push(new Kline(start1, end1));
	lines.push(new Kline(s3, start1));
	lines.push(new Kline(end1, s3));
}


function draw() {
	background(255, 255, 255);
	for (let i = 0; i < lines.length; i++) {
		lines[i].draw();
	}
}


function mouseClicked() {
	count++;
	if (count < 7) {
		lines = gen(lines);
	}
	else {
		let start1 = createVector(400, 200);
		let end1 = createVector(800, 200);
		let s3 = createVector(600, 480);

		lines = [new Kline(start1, end1), new Kline(s3, start1), new Kline(end1, s3)];
		count = 0;
	}
}
