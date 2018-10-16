var x = 250;
var y = 250;

function setup() {
	createCanvas(300, 300);
	background(255);
}

function draw() {
	y -= 1;
	x -= 200;
	if (y < 60) y = (height - x);
	if (x < 60) x = (y * 3);
	stroke(y*4);
	bezier(x, x - 50, y / 2, x / 2, x / 2, y / 2, y + 100, y);
	bezier(y, x - 100, 2 * x - 100, x / 2, x / 2, y * 2 + 100, y + 100, y);
}