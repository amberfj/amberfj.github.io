// Amber Frid-Jimenez 
// Code adapted from Martin Wattenberg's example for Level Sets
// With advice from my friend Philip DeCamp
// DID CAMP 2005

var s = function( p ) {

	var w = 150;
	var h = 150;
	var pg;

	p.setup = function() {
		p.createCanvas(300,300);
		p.pixelDensity(1);

		pg = p.createGraphics(w, h);
	}

	p.draw = function() {
		pg.loadPixels();
		for(var i = 0; i < (w * h); i++) {
			var index = i * 4;
			var x = i % w;
			var y = p.floor(i / w);

			var z = get_height(x / w - 0.5, y / h - 0.5, 0.001 * p.millis());

			pg.pixels[index+0] = 128 + z * 50;
			pg.pixels[index+1] = 50;
			pg.pixels[index+2] = 50;
			pg.pixels[index+3] = 100;
		}
		pg.updatePixels();

		p.image(pg, 0, 0);

		var x = w - 1;
		
		for(var y = 0; y < h; y++){
			var z = get_height(x / w - .5, y / h - .5, .001 * p.millis()); 
			p.stroke(128 + z * 50, 50, 50, 50);
			p.line(x+150, y, x, y);
			p.stroke(128 + z * 50, 100, 100, 50);
			p.line(x+150, y+150, x, y);
		}

		var y = h - 1;
		
		for(var x = 0; x < w; x++){
			var z = get_height(x / w - .5, y / h - .5, .001 * p.millis()); 
			p.stroke(128 + z * 50, 100, 100, 50);
			p.line(x+150, y+150, x, y);
		}
	}

	function get_height(x, y, time) {
		return p.cos(50 * p.sqrt(x*x+y*y) + time * 5) + 4 * p.cos(time) * p.sin((x + time) * 7) + 4 * p.sin(time) * p.sin((y + time) * 7);
	}
}

new p5(s, 'citation-sketch');
	