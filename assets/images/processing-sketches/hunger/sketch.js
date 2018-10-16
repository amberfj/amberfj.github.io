
var a = 1.0;
var s = 1.0;
function setup() {
	createCanvas(200, 200);
	frameRate(8.0);
}

function draw() {
	a += 0.0;
	s = (s / a + 100);

	background(255);
	translate(100, 100);

	for (var i = 5; i < 30; i += 3) {
		for (var j = 33; j < 58; j += 3) {
			rotate(s);
			strokeWeight(4);
			stroke(0, 20);
			line(5, i, 30, i);
			strokeWeight(6);
			stroke(0, 20);
			line(i, 33, i, 58);
			line(j, 5, j, 30);
			line(33, j, 58, j);
		}
	}
}