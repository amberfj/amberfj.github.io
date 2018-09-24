var s = function( p ) {
	var gridSize = 2;
	var tree;
	var stomping = false;

	p.setup = function() {
		p.background(255);
		p.createCanvas(300,300);
		p.fill(255);
		p.noStroke();
		tree = new RootTree(0, 0, p.width, p.height, p.random(0,1));
		tree.growChildren();
		p.noLoop();
	}

	p.mouseMoved = function() {
		if(tree != undefined) {
			var t = tree.getTreeAt(p.mouseX, p.mouseY);
			t.growChildren();
			p.redraw(); 
		}
	}

	p.mousePressed = function() {
		stomping = true;
	}

	p.draw = function() {
		tree.drawTree();
	}

	function nextVal(val) {
		var d = p.random(0, 2) - 1;
		d = d * d * d + val;
		if(d > 1){
			return 1;
		}
		else if(d < 0){
			return 0;
		}
		return d;
	}


	class Tree {
		constructor(x, y, w, h, c) {
			this.mChildren = null;

			this.mColor = c;
			this.mX = x;
			this.mY = y;
			this.mW = w;
			this.mH = h;
		}

		drawTree() {
			if(this.mChildren != null) {    
				for(var i = 0; i < this.mChildren.length; i++) {
					this.mChildren[i].drawTree();
				}
			}else{
				p.strokeWeight(.25);
				p.stroke(0);
				//fill(random(100, 255));
				//ellipse(mX + mW / 2, mY + mH / 2, mW * 5 / 4, mH * 5 / 4);
				p.rect(this.mX +2, this.mY+2, this.mW-2, this.mH-2);
			}  
		}

		growChildren() {
			if(this.mChildren == null) {    
				this.mChildren = [];
				var lastx = 0;
				var lasty = 0;
				var thisx, thisy;
				var index = 0;

				for(var row = 0; row < gridSize; row++) {  
					thisy = (row + 1) * this.mH / gridSize;
					lastx = 0;

					for(var col = 0; col < gridSize; col++) {
						thisx = (col + 1) * this.mW / gridSize;
						var tree = new Tree(this.mX + lastx, this.mY + lasty, thisx - lastx, thisy - lasty, nextVal(this.mColor));
						this.mChildren.push(tree);
						lastx = thisx;
					}
					lasty = thisy;
				}
	//      if(stomping == true){
	//         randomizeChildrenStompingGrounds(); 
	//       }
				 
				 /*  
				 int num = mChildren.length;      
				 Tree[] moistenedChildren = new Tree[num];
				 while(num > 0){
				 int r = (int)random(num);
				 moistenedChildren[num - 1] = mChildren[r];
				 mChildren[r] = mChildren[num - 1];
				 num--;
				 }
				 mChildren = moistenedChildren;
				 */  
			}
		}

		randomizeChildrenStompingGrounds(){
			for(var i = 0; i < this.mChildren.length; i++){
				this.mChildren[i].mX = p.floor(p.random(this.mW) * .75) + this.mX;
				this.mChildren[i].mY = p.floor(p.random(this.mH) * .75) + this.mY;
			}
		}


		getTreeAt(x, y){
			if(this.mChildren != null){
				for(var i = this.mChildren.length - 1; i >= 0; i--){  
					var temp = this.mChildren[i].getTreeAt(x, y);
					if(temp != null)
						return temp;
				}
			}else if(x >= this.mX && x < this.mX + this.mW && y >= this.mY && y < this.mY + this.mH){
				return this;
			}
			return null;
		}
	}

	class WhiteTree extends Tree {
		constructor(x, y, w, h, c){
			super(x, y, w, h, c);
		}

		drawTree(){
			if(this.mChildren != null){
				super.drawTree();
			}
		}
	}


	class RootTree extends Tree{
		constructor(x, y, w, h, c){
			super(x, y, w, h, c);
		}

		growChildren(){
			if(this.mChildren == null) {    
				this.mChildren = [];
				var lastx = 0;
				var lasty = 0;
				var thisx, thisy;
				var index = 0;

				for(var row = 0; row < gridSize; row++) {  
					thisy = (row + 1) * this.mH / gridSize;
					lastx = 0;

					for(var col = 0; col < gridSize; col++){
						thisx = (col + 1) * this.mW / gridSize;
						var tree = new WhiteTree(this.mX + lastx, this.mY + lasty, thisx - lastx, thisy - lasty, nextVal(this.mColor));
						this.mChildren.push(tree);
						lastx = thisx;
					}

					lasty = thisy;
				}
			}
		}

		drawTree(){
			p.smooth();
			p.fill(255);
			p.rect(this.mX, this.mY, this.mW, this.mH);
			super.drawTree();
		}

		getTreeAt(x, y){
			var temp = super.getTreeAt(x, y);
			if(temp == null)
				return this;

			return temp;
		}
	}
};

new p5(s, "quadtree-sketch");
