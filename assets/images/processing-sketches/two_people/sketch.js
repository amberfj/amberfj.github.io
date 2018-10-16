
var s = function( p ) {
	var a;
	p.setup = function() {
		p.createCanvas(300, 300);
		p.noStroke();
		p.colorMode(3);
		p.rectMode(3);
	}

	var s;
	p.draw = function() {
		p.background(255);

		a += 0.001;
		s /= a;

		if (p.mouseIsPressed) {
			s = (s / a + 0.2);
		} else {
			p.rotate(-s * 2);
		  
			p.fill(color(209, 47, 85, 40));
			p.rect(p.mouseX, p.mouseY, 100, 100);
			p.rotate(5);
			p.fill(color(354, 95, 61, 60));
			p.rect(p.pmouseX - 300, p.pmouseY, 100, 100);
		}
	}
}

new p5(s, 'two_people-sketch');