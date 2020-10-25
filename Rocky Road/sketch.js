// TODO: Convert
{
	var points = [];                            //List of Points
	var engineForce;                            //EngineForce
	var ADrag = new PVector();                  //Air Drag
	var Friction = new PVector();               //Ground Friction
} //General
{
	var CDrag = 0.4257;                         //Coefficient of Drag
	var g = new PVector(0,0.098);                //Gravity
	var Gears = [2.66,1.78,1.30,1,0.74,0.5];    //Gear Ratios
	var Diff = 3.42;                            //Differential Ratio
	var Eff = 0.7;                              //Efficiency
} //Coefficients and Constants
{
	var N = new PVector();                      //Normal Point
	var Na = new PVector();                     //S->P
	var Nb = new PVector();                     //S->E
	var Normal = new PVector();                 //N->P
} //Vectors
angleMode = 'degrees';
for (var i = -10; i < 40; i++) {
	points.push(new PVector(100*i,random(400,500)));
}

var wheel = function(pos) {
	this.pos = pos || new PVector(40,0);
	this.vel = new PVector(0,0);
	this.acc = new PVector(0,0);
	this.mass = 50;
	this.radius = this.mass;
	this.spoke = new PVector(this.radius*1/2,this.radius*1/2);

	this.draw = function() {
		fill(105, 97, 97);
		translate(300,this.pos.y);
		ellipse(0,0,this.radius*2,this.radius*2);
		strokeWeight(1.5);
		line(0,0,this.radius,0);
		translate(-300,-this.pos.y);
	};

	this.applyForce = function(force) {
		var f = new PVector(force.x,force.y);
		f.div(this.mass);
		this.acc.add(f);
	};

	this.update = function() {
		this.vel.add(this.acc);
		this.pos.add(this.vel);
		this.acc.mult(0);
	};

	this.applyNormal = function(p1,p2) {
		Na = PVector.sub(this.pos,p1);
		Nb = PVector.sub(p2,p1);
		Nb.normalize();
		Nb.mult(Na.dot(Nb));
		N = PVector.add(p1,Nb);

		if (N.dist(p1) < p1.dist(p2) && N.dist(p2) < p2.dist(p1) && N.dist(this.pos) < this.radius) {
			Normal = PVector.sub(this.pos,N);
			if (Normal.mag() < this.radius){
				Normal.normalize();
				Normal.y *= -this.acc.mag() * cos(PVector.angleBetween(Normal,this.acc));
				Normal.x *= this.acc.mag() * sin(PVector.angleBetween(Normal,this.acc));
				Normal.mult(800);
				this.applyForce(Normal);
			}
		}
	};

	this.calcDrag = function() {
		ADrag.x = -CDrag * this.vel.x * this.vel.mag();
		ADrag.y = -CDrag * this.vel.y * this.vel.mag();
		Friction = -30 * CDrag * this.vel;
		this.applyForce(ADrag);
		this.applyForce(Friction);
	};

	this.go = function() {
		this.applyForce(new PVector(g.x,g.y*this.mass));
		for (var i = 1; i < points.length; i++) {
			this.applyNormal(points[i-1],points[i]);
		}
		this.update();
		this.draw();
		//this.calcDrag();
	};
};

var W1 = new wheel(new PVector(278,100));

var draw = function() {
	//camera(W1.pos.x, height/2, height/1.154, width/2, height/2, 0, 0, 1, 0);
	//translate(width/2-W1.pos.x+1,0);
	background(255, 255, 255);
	W1.go();
	translate(-(width/2-W1.pos.x+1),0);
	for (var i = 0; i < points.length-1; i++) {
		//points[i].x-=2;
		line(points[i].x,points[i].y,points[i+1].x,points[i+1].y);
	}
};



