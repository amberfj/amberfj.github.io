var s = function( p ) {

	var w = 200;
	var h = 200;
	var pg;

	p.setup = function() {
		p.createCanvas(300,300);
		p.background(240, 240, 240);
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
			var c = 128 + z * 120;

			pg.pixels[index+0] = c;
			pg.pixels[index+1] = c;
			pg.pixels[index+2] = c;
			pg.pixels[index+3] = 255;
		}
		pg.updatePixels();
		
		p.image(pg, 130, -150);
		p.image(pg, -130, 150);


		for(var y = 0; y < 1; y++) {
			for(var x = 0; x < w; x++){      
				var z = get_height(x / w - 0.5, y / h - 0.5, 0.001 * p.millis()); 
				p.stroke(128 + z * 100);
				p.line(x - 10, y + 150, x + 200, y - 150);
			}
		}

		for(var x = w - 1; x < w; x++){
			for(var y = 0; y < h; y++){
		    	var z = get_height(x / w - 0.5, y / h - 0.5, 0.001 *p. millis()); 
				p.stroke(128 + z * 100);
				p.line(x - 130, y + 150, x + 20, y - 150);
	    	}
		}
	}

	function get_height(x, y, time) {
		return p.cos(p.sqrt(x*x+y*y) * 10 * time);
	}
}

new p5(s, 'fuckers-sketch');
	