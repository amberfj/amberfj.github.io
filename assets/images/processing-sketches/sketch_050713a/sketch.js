var randomLevel = 1;

var pointList = [];
var lineList = [];


function setup() {
  background(255);
  createCanvas(300, 300);
  textFont("Courier New");
}

function draw() {
  background(255);
  strokeWeight(10);
  fill(20,20, 20, 20);
  stroke(30, 30, 30, 30);
  
  for(var i = 0; i < pointList.length; i++){
    var p = pointList[i];
    strokeWeight(p.mSize);  
    ellipse(p.mX - p.mSize / 2, p.mY - p.mSize / 2, p.mSize, p.mSize);
    fill(0);
    text("" + p.mNumber, p.mX - random(0,50), p.mY - random(0,50));
  }
  for(var i = 0; i < lineList.length; i++){   
    fill(0);
    strokeWeight(1);
    var l = lineList[i];
    line(l.m1.mX, l.m1.mY, l.m2.mX, l.m2.mY);
  }
}

function mouseMoved() {
  if(random(0, 5) < 1.0){
    pointList.push(new Point(mouseX, mouseY)); 
    if(randomLevel > 0 && pointList.length > 2 && random(0, 2) < 1.0){
      lineList.push(new Line(pointList[pointList.length - 2], pointList[pointList.length - 1]));
    }
  }
}

class Point {
  constructor(x, y) {
    this.mX = x;
    this.mY = y;
    if(randomLevel > 1) {
      this.mSize = random(2, 20);
      this.mNumber = random(0, 10);
    } else {
      this.mSize = 6;
      this.mNumber = 1;
    }
  }
}

class Line {
  constructor(p1, p2){
    this.m1 = p1;
    this.m2 = p2;
  }
}