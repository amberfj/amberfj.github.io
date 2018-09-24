
// Amber Frid-Jimenez 
// Code adapted from Martin Wattenberg's example for Level Sets
// With advice from my friend Philip DeCamp
// DID CAMP 2005

var s = function( p ) {
	var w = 150; 
	var h = 150;
	var x = w - 1;

	p.setup = function() {
		p.createCanvas(300,300);
		p.background(255);
	}

	p.draw = function() {
		for(var y = 0; y < h; y++){
			
			var z = get_height(x / w - .5, y / h - .5, .001 * p.millis()); 
			
			p.fill(100, 0, 0, z * 50);
			p.stroke(0);
			p.rect(x-150, y + 100, 50, 50);
			
			z = get_height(x / w - .5, y / h - .5, .005 * p.millis()); 
			p.noStroke();
			p.fill(128 + z * 50, 100, 100, 50);
			p.rect(x-100, y+50, 50, 50);
			
			z = get_height(x / w - .9, y / h - .5, .001 * p.millis()); 
			p.fill(z*50, 0,0,50);
			p.rect(x-50, y+30, 50, 50);
			
			z = get_height(x / w - .9, y / h - .5, .1 * p.millis()); 
			p.stroke(z+128, z+129, z+128,50);
			p.fill(y, 0,z,50);
			p.rect(x, y+100, 50, 50);
			
			z = get_height(x / w - .9, y / h - .5, .07 * p.millis()); 
			p.stroke(z*50, 0,0,50);
			p.fill(z, 0,z,50);
			p.rect(x+50, y+90, 50, 50);
			
			z = get_height(x / w - .9, y / h - .5, .0001 * p.millis()); 
			p.stroke(0);
			p.fill(128 + z * 50, 100, 100, 50);
			p.rect(x+100, y+120, 50, 50);

		}

	}

	function get_height(x, y, time) {
		return p.cos(50 * p.sqrt(x*x+y*y) + time * 5) + 4 * p.cos(time) * p.sin((x + time) * 7) + 4 * p.sin(time) * p.sin((y + time) * 7);
	}
}

new p5(s, 'revolvers-sketch')
