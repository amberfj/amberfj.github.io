var a = 1;
function setup() {
	createCanvas(200, 200);
	frameRate(15.0);
}

var s = 1;
function draw() {
	background(255);
	rotate(45.0);
	for (var f1 = -95; f1 < 350; f1 += 1.75) {
		var f2 = random(40, 45) + 20;
		
		line(0, f1, f2, f1);
	}
}