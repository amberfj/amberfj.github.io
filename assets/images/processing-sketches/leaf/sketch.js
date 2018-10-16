
var s = function( p ) {
  var FRAMES_PER_SECOND = 30;
  var MILLIS_PER_FRAME = 33.333332;
  var SECONDS_PER_FRAME = 0.033333335;
  var FORCE_SCALE = 300;
  var GRAVITY = 8;
  var NULL_FORCE;
  var MAX_LEAF_MEASURE = 250;
  var LEAF_FAR = -950;

  var LEAF_NEAR = -50;
  var NUM_LEAVES = 8;
  var LEAF_RED = 0;
  var LEAF_GREEN = 0;
  var LEAF_BLUE = 0;
  var BACK_RED = 255;
  var BACK_GREEN = 255;
  var BACK_BLUE = 255;

  var leaf = [];
  var path;
  var tempPath;
  var currentForce;
  var pathForce;
  var entranceRad;
  var exitRad;
  var entranceChord;
  var exitRadRad;
  var fovy;
  var eyeX;
  var eyeY;
  var eyeZ;
  var nearDist;
  var farDist;
  var aspect;
  var fovRatio;
  var frameCount;

  p.setup = function() {
    p.createCanvas(600, 600, p.WEBGL);
    p.background(255);
    
    p.frameRate(30);
    
    NULL_FORCE = new LeafForce(1560, 1200, 0);

    fovy = 45;
    fovRatio = p.tan(p.PI * fovy / 360);
    eyeX = p.width / 2;
    eyeY = p.height / 2;
    eyeZ = eyeY / fovRatio;
    LEAF_NEAR = eyeZ * 3 / 4;
    nearDist = eyeZ - 0.5;
    farDist = eyeZ + 1000.5;
    aspect = p.width / p.height;
    
    entranceRad = p.sqrt(p.width * p.width / 4 + p.height * p.height / 4) + 250;
    exitRad = entranceRad + 250;
    exitRadRad = exitRad * exitRad;
    entranceChord = entranceRad - 250;
    
    tempPath = null;
    path = new Path();
    path.finish();
    
    leaf = [];
    for (var i = 0; i < 8; i++) {
      leaf[i] = new Leaf();
    }
    
    frameCount = 0;
  }

  p.draw = function() {
    p.background(255);
    
    currentForce = path.getNext();
    
    p.perspective(fovy, aspect, nearDist, farDist);
    p.camera(eyeX, eyeY, eyeZ, eyeX, eyeY, 0, 0, 1, 0);
    
    if (tempPath != null) {
      tempPath.drawPath();
    } else {
      path.drawPath();
    }
    
    p.translate(p.width / 2, p.height / 2);
    p.stroke(0, 0, 0);
    p.strokeWeight(1);
    p.noFill();
    p.line(-p.width / 2 - 1000 * fovRatio * aspect, (p.height * 0.5 + 1000 * fovRatio) * 0.7, -1000, p.width / 2 + 1000 * fovRatio * aspect, (p.height * 0.5 + 1000 * fovRatio) * 0.7, -1000);
    
    for (var i = 0; i < leaf.length; i++) {
      leaf[i].updatePosition();
      leaf[i].drawLeaf();
    }
  }

  p.mousePressed = function() {
    tempPath = new Path();
  }

  p.mouseDragged = function() {
    if (tempPath != null) {
      tempPath.addData();
    }
  }

  p.mouseReleased = function() {
    if (tempPath != null) {
      tempPath.addData();
      tempPath.finish();
      path = tempPath;
      tempPath = null;
    }
  }

  class Vertex {
    constructor(x, y, z) {
      this.x = x;
      this.y = y;
      this.z = z;
    }
  }

  class LeafForce {
    constructor(x, y, z) {
      this.forceX = x;
      this.forceY = y;
      this.forceZ = z;
    }
  }

  class MouseData {
    constructor() {
      this.x = p.mouseX;
      this.y = p.mouseY;
      this.time = p.millis();
    }
  }

  class Path {
    constructor() {
      this.v = [];
      this.addData();
      this.force = null;
      this.forceIndex = -1;
      this.netForce = null;
      this.fadeFrame = -1;
      this.entranceAng = 0;
    }
    
    addData() {
      this.v.push(new MouseData());
    }
    
    getNext() {
      this.forceIndex = (this.forceIndex + 1) % this.force.length;
      return this.force[this.forceIndex];
    }
    
    getEntrancePoint() {
      var f1 = p.random(LEAF_NEAR, -950);
      var f2 = entranceChord - f1 * fovRatio;
      var f3 = p.random(-f2, f2);
      f2 = entranceRad - f1 * fovRatio;
      var f4 = p.sqrt(f2 * f2 - f3 * f3);
      f2 = f4 * p.cos(this.entranceAng) + f3 * p.sin(this.entranceAng);
      f3 = f3 * p.cos(this.entranceAng) - f4 * p.sin(this.entranceAng);
      f4 = f2;
      return new Vertex(f4, -f3, f1);
    }
    
    finish() {
      this.fadeFrame = 30;
      
      if (this.v.length < 2) {
        this.force = [];
        this.force.push(NULL_FORCE);
        this.netForce = NULL_FORCE;
        this.entranceAng = p.atan2(this.netForce.forceY, this.netForce.forceX) + p.PI;
        return;
      }
      
      this.scaleTime(3);
      var localMouseData1 = this.v[0];
      var localMouseData2 = this.v[this.v.length - 1];
      this.force = [];
      this.netForce = new LeafForce(localMouseData1.x - localMouseData2.x, localMouseData1.y - localMouseData2.y, 0);
      

      this.entranceAng = p.atan2(this.netForce.forceY, this.netForce.forceX) + p.PI;
      
      var f1 = localMouseData1.x;
      var f2 = localMouseData1.y;
      var f3 = localMouseData1.time;

      for (var i = 1; i < this.v.length; i++) {
        localMouseData2 = localMouseData1;
        localMouseData1 = this.v[i];
        var f7 = localMouseData1.time - localMouseData2.time;
        
        while (localMouseData1.time - f3 >= 33.333332) {
          var f6;
          if (f3 > localMouseData1.time) {
            f6 = 33.333332 / f7;
          } else {
            f6 = (localMouseData1.time - f3) / f7;
          }
          
          var f4 = f6 * localMouseData1.x + (1.0 - f6) * localMouseData2.x;
          var f5 = f6 * localMouseData1.y + (1.0 - f6) * localMouseData2.y;
          this.force.push(new LeafForce(f4 - f1, f5 - f2, 0));
          f1 = f4;
          f2 = f5;
          f3 += 33.333332;
        }
      }
      
      this.force.push(new LeafForce(this.x - f1, this.y - f2, 0));
      
      this.lowPassFilter();
      this.scalePath();
    }
    
    lowPassFilter() {
      var localVector = [];
      for (var i = 0; i < this.force.length; i++) {
        var f1 = 0;
        var f2 = 0;
        var f3 = 0;
        for (var j = max(0, i - 4); j < min(this.force.length, i + 5); j++) {
          var localLeafForce = this.force[j];
          f1 += localLeafForce.forceX;
          f2 += localLeafForce.forceY;
          f3 += localLeafForce.forceZ;
        }
        
        var f4 = min(this.force.length, i + 5) - max(0, i - 4);
        localVector.push(new LeafForce(f1 / f4, f2 / f4, f3 / f4));
      }
      
      this.force = localVector;
    }
    
    scaleTime(paramFloat) {
      if (this.v.length < 1) {
        return;
      }
      var f = this.v[0].time;
      
      for (var i = 1; i < this.v.length; i++) {
        var localMouseData = this.v[i];
        localMouseData.time = (f + (localMouseData.time - f) * paramFloat);
      }
    }
    
    scalePath() {
      for (var i = 0; i < this.force.length; i++) {
        var localLeafForce = this.force[i];
        localLeafForce.forceX *= 300.0;
        localLeafForce.forceY *= 300.0;
        localLeafForce.forceZ *= 300.0;
      }
    }
    
    drawPath() {
      if (this.fadeFrame == 0) {
        return;
      }
      
      this.fadeFrame -= 1;
      try {
        p.push();
        
        p.noFill();
        p.stroke(190, 190, 255);
        p.strokeWeight(1);
        
        switch (this.v.length) {
          case 0: 
            return;
          case 1: 
            var localMouseData = this.v[0];
            p.point(localMouseData.x, localMouseData.y);
            break;
          default: 
            this.drawDashed();
        }
      } finally {
        p.pop();
      }
    }
    
    drawUneven() {
      var localObject = this.v[0];
      
      for (var i = 1; i < v.length; i++) {
        var localMouseData = this.v[i];
        var f = sqrt(pow(localObject.x - localMouseData.x, 2) + pow(localObject.y - localMouseData.y, 2)) * 0.033333335 / 3;
        if (f > 1)
          f = 1;
        if (f < 0.5) {
          stroke(255 - f * 240, 255 - f * 100, 255 - f * 80);
        } else {
          stroke(35 + f * 200, 305 - f * 200, 315 - f * 200);
        }
        
        line(localObject.x, localObject.y, localMouseData.x, localMouseData.y);
        localObject = localMouseData;
      }
    }
    
    drawAlternate() {
      var localObject = this.v[0];
      var i = 1;
      
      for (var j = 1; j < v.length; j++) {
        var localMouseData = this.v[j];
        if (i != 0) {
          line(localObject.x, localObject.y, localMouseData.x, localMouseData.y);
        }
        i ^= 0x1; // flips bit, if odd --, if even ++
        localObject = localMouseData;
      }
    }
    
    drawDashed() {
      var localObject = this.v[0];
      var i = 1;
      var f1 = 20;
      var f3 = f1;

      var f6 = localObject.x;
      var f7 = localObject.y;
      
      var f9;
      
      if (this.fadeFrame < 0) {
        f9 = 255;
      } else {
        f9 = this.fadeFrame / 30 * 255;
      }
      
      for (var j = 1; j < this.v.length; j++){
        var localMouseData = this.v[j];
        var f2 = p.sqrt(p.pow(localObject.x - localMouseData.x, 2) + p.pow(localObject.y - p.localMouseData.y, 2));
        var f8 = 0;
        
        this.setGrayStroke(f2 * 0.033333335 / 5, f9);
        
        while (f2 - f8 > f3) {
          f4 = f6;
          f5 = f7;
          f6 = (localObject.x - localMouseData.x) / f2 * (f3 + f8) + localObject.x;
          f7 = (localObject.y - localMouseData.y) / f2 * (f3 + f8) + localObject.y;
          if (i != 0) {
            p.line(f4, f5, f6, f7);
          }
          
          i ^= 0x1;
          f8 += f3;
          f3 = f1;
        }
        
        var f4 = f6;
        var f5 = f7;
        f6 = localMouseData.x;
        f7 = localMouseData.y;
        
        if (i != 0) {
          p.line(f4, f5, f6, f7);
        }
        
        f3 -= f2 - f8;
        localObject = localMouseData;
      }
    }
    
    setGrayStroke(paramFloat1, paramFloat2) {
      if (paramFloat1 > 1) {
        paramFloat1 = 1;
      }
      paramFloat1 = 1 - paramFloat1;
      
      p.stroke(255 * paramFloat1, 255 * paramFloat1, 255 * paramFloat1, paramFloat2);
    }
    
    setColorStroke(paramFloat1, paramFloat2) {
      if (paramFloat1 > 1)
        paramFloat1 = 1;
      if (paramFloat1 < 0.5) {
        p.stroke(255 - paramFloat1 * 240, 255 - paramFloat1 * 100, 255 - paramFloat1 * 80, paramFloat2);
      } else {
        p.stroke(75 + paramFloat1 * 120, 305 - paramFloat1 * 200, 315 - paramFloat1 * 200, paramFloat2);
      }
    }
  }

  class Leaf {
    /*static var NUM_POINT = 20;
    static var weight = 1.5F;
    static var DRAG_SCALE = 0.5F;
    static var SWAY_FACTOR = 40.0F;
    static var FLUTTER_FACTOR = 0.4F;*/
    
    constructor() {
      this.dragX = p.pow(0.2, 0.033333335);
      this.dragY = p.pow(0.12, 0.033333335);
      this.dragZ = p.pow(0.05, 0.033333335);
      this.x = 0;
      this.y = 0;
      this.z = 0;
      this.speedX = 0;
      this.speedY = 0;
      this.speedZ = 0;
      this.angX = 0;
      this.angY = 0;
      this.angZ = 0;
      this.angSpeedX = 0;
      this.angSpeedY = 0;
      this.angSpeedZ = 0;
      this.forceX = 0;
      this.forceY = 0;
      this.forceZ = 0;
      this.lForceX = 0;
      this.lForceY = 0;
      this.lForceZ = 0;
      this.origX = 0;
      this.origY = 0;
      this.origZ = 0;

      this.axisXX = 0;
      this.axisXY = 0;
      this.axisXZ = 0;

      this.axisYX = 0;
      this.axisYY = 0;

      this.axisYZ = 0;
      this.axisZX = 0;

      this.axisZY = 0;
      this.axisZZ = 0;

      this.areaX = 0;

      this.areaY = 0;
      this.areaZ = 0;
      this.twistX = 0;
      this.twistY = 0;
      this.twistZ = 0;
      this.leftCurve = [];
      this.rightCurve = [];
      this.midCurve = [];
      this.leftNormal = [];
      this.rightNormal = [];
      this.forceNorm = 0;
      this.forceNormSquared = 0;
      this.temp = 0;
      this.temp2 = 0;
      this.leftOutlineIndex = 0;
      this.rightOutlineIndex = 0;
      this.leftMidOutlineIndex = 0;
      this.rightMidOutlineIndex = 0;
      this.frameDelay = 0;
      
      this.reset();
      this.y = p.random(-p.height / 2 + this.z * fovRatio, p.height / 2 - this.z * fovRatio);
      this.frameDelay = 0;
    }
    
    reset() {
      var localVertex = path.getEntrancePoint();
      this.z = localVertex.z;
      this.y = localVertex.y;
      this.x = localVertex.x;
      
      this.frameDelay = p.floor(p.random(0, 30));
      
      this.angX = p.random(p.TAU);
      this.angY = p.random(p.TAU);
      this.angZ = p.random(p.TAU);
      
      var f1 = 0.4;
      if (p.random(1) > 0.35) {
        this.twistX = p.random(-0.15, 0.15) * 0.4;
      } else {
        this.twistX = p.random(-0.15, 0.15) * 0.4 * 0.1;
      }
      
      this.twistY = (p.random(-0.07, 0.07) * 0.4);
      this.twistZ = (p.random(-0.06, 0.06) * 0.4);
      
      this.angSpeedX = 0;
      this.angSpeedY = 0;
      this.angSpeedZ = 0;
      this.speedX = 0;
      this.speedY = 0;
      this.speedZ = 0;
      var f2 = 2;
      this.areaX = f2;
      this.areaY = (10 * f2);
      this.areaZ = (2 * f2);
      
      this.temp = p.random(-20, -60);
      this.temp2 = p.random(40, 75);
      
      var f3 = p.random(-5, 5);
      this.leftCurve = this.getBezierPoints(-this.temp2, 0, 0, -this.temp2 / 2, p.random(-5, 5), this.temp, this.temp2 / 2, p.random(-10, 10), this.temp / 2, this.temp2, 0, 0, 20);
      this.rightCurve = this.getBezierPoints(-this.temp2, 0, 0, -this.temp2 / 2, p.random(-5, 5), -this.temp, this.temp2 / 2, p.random(-10, 10), -this.temp / 2, this.temp2, 0, 0, 20);
      if (p.random(1) > 0.5) {
        this.midCurve = this.getBezierPoints(-this.temp2, 0, 0, -this.temp2 / 2, p.random(10, 20), 0, this.temp2 / 2, p.random(10, 20), 0, this.temp2, 0, 0, 20);
      } else {
        this.midCurve = this.getBezierPoints(-this.temp2, 0, 0, -this.temp2 / 2, p.random(10, 25), 0, this.temp2 * 4 / 5, p.random(-5, -10), 0, this.temp2, 0, 0, 20);
      }
      
      this.leftNormal = this.getNormalPoints(this.leftCurve, this.midCurve);
      this.rightNormal = this.getNormalPoints(this.rightCurve, this.midCurve);
    }
    
    updatePosition() {
      if (this.frameDelay > 0) {
        this.frameDelay -= 1;
        return;
      }
      
      try {
        p.push();
        p.rotateZ(this.angZ);
        p.rotateY(this.angY);
        p.rotateX(this.angX);
        
        /*this.origX  = objectX(0, 0, 0);
        this.origY  = objectY(0, 0, 0);
        this.origZ  = objectZ(0, 0, 0);
        this.axisXX = objectX(1, 0, 0) - this.origX;
        this.axisXY = objectY(1, 0, 0) - this.origY;
        this.axisXZ = objectZ(1, 0, 0) - this.origZ;
        this.axisYX = objectX(0, 1, 0) - this.origX;
        this.axisYY = objectY(0, 1, 0) - this.origY;
        this.axisYZ = objectZ(0, 1, 0) - this.origZ;
        this.axisZX = objectX(0, 0, 1) - this.origX;
        this.axisZY = objectY(0, 0, 1) - this.origY;
        this.axisZZ = objectZ(0, 0, 1) - this.origZ;*/

        this.origX  = 0;
        this.origY  = 0;
        this.origZ  = 0;
        this.axisXX = 1;
        this.axisXY = 1;
        this.axisXZ = 1;
        this.axisYX = 1;
        this.axisYY = 1;
        this.axisYZ = 1;
        this.axisZX = 1;
        this.axisZY = 1;
        this.axisZZ = 1;
        
        this.forceX = (-this.speedX * (p.abs(this.axisXX) * this.areaX + p.abs(this.axisYX) * this.areaY + p.abs(this.axisZX) * this.areaZ) - (this.speedY * this.axisYY + this.speedZ * this.axisYZ) * this.axisYX * 40 + currentForce.forceX);
        this.forceY = (-this.speedY * (p.abs(this.axisXY) * this.areaX + p.abs(this.axisYY) * this.areaY + p.abs(this.axisZY) * this.areaZ) - (this.speedX * this.axisYX + this.speedZ * this.axisYZ) * this.axisYY * 40 + currentForce.forceY);
        this.forceZ = (-this.speedZ * (p.abs(this.axisXZ) * this.areaX + p.abs(this.axisYZ) * this.areaY + p.abs(this.axisZZ) * this.areaZ) - (this.speedX * this.axisYX + this.speedY * this.axisYY) * this.axisYZ * 40 + currentForce.forceZ);
        
        this.speedX += this.forceX / 1.5 * 0.033333335;
        this.speedY += this.forceY / 1.5 * 0.033333335;
        this.speedZ += this.forceZ / 1.5 * 0.033333335;
        
        this.lForceX = this.speedX;
        this.lForceY = this.speedY;
        this.lForceZ = this.speedZ;
        this.forceNormSquared = (this.speedX * this.speedX + this.speedY * this.speedY + this.speedZ * this.speedZ);
        this.forceNorm = p.sqrt(this.forceNormSquared);
        
        this.angSpeedX *= this.dragX;
        this.angSpeedY *= this.dragY;
        this.angSpeedZ *= this.dragZ;
        

        if ((this.forceNormSquared > 0) && (this.forceNorm > 0)) {
          this.temp = (p.abs(this.lForceX) * (2 * p.sqrt(1.0001 - this.lForceX * this.lForceX / this.forceNormSquared) * this.lForceX / this.forceNorm));
          this.angSpeedZ += this.temp / 1.5 * 0.033333335 * 0.035;
          
          this.temp2 = (p.abs(this.lForceZ) * (2 * p.sqrt(1.0001 - this.lForceZ * this.lForceZ / this.forceNormSquared) * this.lForceZ / this.forceNorm));
          this.angSpeedX += this.temp2 / 1.5 * 0.033333335 * 0.035;
          
          this.angSpeedX += this.forceX * this.twistX / 1.5 * 0.033333335;
          this.angSpeedY += this.forceY * this.twistY / 1.5 * 0.033333335;
          this.angSpeedZ += this.forceZ * this.twistZ / 1.5 * 0.033333335;
        }
        

        this.angX += this.angSpeedX * 0.033333335;
        this.angY += this.angSpeedY * 0.033333335;
        this.angZ += this.angSpeedZ * 0.033333335;
        
        this.x += this.speedX * 0.033333335;
        this.y += this.speedY * 0.033333335;
        this.z += this.speedZ * 0.033333335 * 3;
        
        if (this.z > LEAF_NEAR) {
          this.z = LEAF_NEAR;
        } else if (this.z < -950) {
          this.z = -950;
        }
      } finally {
        p.pop();
      }

      this.temp = (exitRad - fovRatio * this.z);
      if (p.pow(this.x, 2) + p.pow(this.y, 2) > p.pow(this.temp, 2)) {
        this.reset();
      }
    }
    
    drawLeaf() {
      try {
        p.push();
        
        p.translate(this.x, this.y, this.z);
        p.rotateZ(this.angZ);
        p.rotateY(this.angY);
        p.rotateX(this.angX);

        p.noFill();
        p.stroke(0, 0, 0);
        
        p.beginShape(33);
        for (var i = 0; i < 60; i += 3) {
          p.vertex(this.leftCurve[i], this.leftCurve[(i + 1)], this.leftCurve[(i + 2)]);
        }
        p.endShape();
        
        p.beginShape(33);
        for (var i = 0; i < 60; i += 3) {
          p.vertex(this.midCurve[i], this.midCurve[(i + 1)], this.midCurve[(i + 2)]);
        }
        p.endShape();
        
        p.beginShape(33);
        for (var i = 3; i < 60; i += 3) {
          p.vertex(this.rightCurve[i], this.rightCurve[(i + 1)], this.rightCurve[(i + 2)]);
        }
        p.endShape();
      } finally {
        p.pop();
      }
    }
    
    getBezierPoints(paramFloat1, paramFloat2, paramFloat3, paramFloat4, paramFloat5, paramFloat6, paramFloat7, paramFloat8, paramFloat9, paramFloat10, paramFloat11, paramFloat12, paramInt) {
      if (paramInt < 2) {
        return null;
      }
      var arrayOfFloat = [];
      var f1 = 3 * (paramFloat4 - paramFloat1);
      var f2 = 3 * (paramFloat7 - paramFloat4) - f1;
      var f3 = paramFloat10 - paramFloat1 - f1 - f2;
      var f4 = 3 * (paramFloat5 - paramFloat2);
      var f5 = 3 * (paramFloat8 - paramFloat5) - f4;
      var f6 = paramFloat11 - paramFloat2 - f4 - f5;
      var f7 = 3 * (paramFloat6 - paramFloat3);
      var f8 = 3 * (paramFloat9 - paramFloat6) - f7;
      var f9 = paramFloat12 - paramFloat3 - f7 - f8;
      
      arrayOfFloat[0] = paramFloat1;
      arrayOfFloat[1] = paramFloat2;
      arrayOfFloat[2] = paramFloat3;
      arrayOfFloat[(paramInt * 3 - 3)] = paramFloat10;
      arrayOfFloat[(paramInt * 3 - 2)] = paramFloat11;
      arrayOfFloat[(paramInt * 3 - 1)] = paramFloat12;
      
      var f10 = 1 / (paramInt - 1);
      

      for (var i = 1; i < paramInt - 1; i++) {
        var f11 = i * f10;
        var f12 = f11 * f11;
        var f13 = f12 * f11;
        arrayOfFloat[(i * 3)] = (f3 * f13 + f2 * f12 + f1 * f11 + paramFloat1);
        arrayOfFloat[(i * 3 + 1)] = (f6 * f13 + f5 * f12 + f4 * f11 + paramFloat2);
        arrayOfFloat[(i * 3 + 2)] = (f9 * f13 + f8 * f12 + f7 * f11 + paramFloat3);
      }
      
      return arrayOfFloat;
    }
    
    drawNormals() {
      if (this.frameDelay > 0) {
        return;
      }
      var i = 0;
      p.push();
      
      p.translate(this.x, p.height * 0.5 - p.height * 0.125 * (this.z - -950.0) / (LEAF_NEAR - -950.0));
      p.scale(p.height / (p.height - fovRatio * this.z));
      p.rotateX(this.angX);
      
      p.stroke(0, 0, 0, 255);
      p.beginShape(33);
      for (var j = 1; j < 19; j++)
      {
        var f1 = (this.midCurve[(j * 3 - 3)] + this.leftCurve[(j * 3)] + this.midCurve[(j * 3)]) / 3;
        var f2 = (this.midCurve[(j * 3 - 2)] + this.leftCurve[(j * 3 + 1)] + this.midCurve[(j * 3 + 1)]) / 3;
        var f3 = (this.midCurve[(j * 3 - 1)] + this.leftCurve[(j * 3 + 2)] + this.midCurve[(j * 3 + 2)]) / 3;
        
        vertex(f1 + this.leftNormal[i] / 5, f2 + this.leftNormal[(i + 1)] / 5, f3 + this.leftNormal[(i + 2)] / 10);
        
        f1 = (this.midCurve[(j * 3 - 3)] + this.rightCurve[(j * 3)] + this.midCurve[(j * 3)]) / 3;
        f2 = (this.midCurve[(j * 3 - 2)] + this.rightCurve[(j * 3 + 1)] + this.midCurve[(j * 3 + 1)]) / 3;
        f3 = (this.midCurve[(j * 3 - 1)] + this.rightCurve[(j * 3 + 2)] + this.midCurve[(j * 3 + 2)]) / 3;
        vertex(f1 + this.rightNormal[i] / 5, f2 + this.rightNormal[(i + 1)] / 5, f3 + this.rightNormal[(i + 2)] / 5);
        
        i += 3;

        i += 3;
      }
      p.endShape();
      p.pop();
    }
    
    getNormalPoints(paramArrayOfFloat1, paramArrayOfFloat2) {
      var i = 0;
      var j = 0;
      var k = 0;
      var arrayOfFloat = []; //(paramArrayOfFloat1.length - 3) * 2
      var m = 0;
      for (var n = 3; n < paramArrayOfFloat1.length - 3; n += 3) {
        arrayOfFloat[m + 0] = ((paramArrayOfFloat1[(n + 1)] - paramArrayOfFloat1[(n - 2)]) * (paramArrayOfFloat2[(n + 2)] - paramArrayOfFloat1[(n - 1)]) - (paramArrayOfFloat2[(n + 1)] - paramArrayOfFloat1[(n - 2)]) * (paramArrayOfFloat1[(n + 2)] - paramArrayOfFloat1[(n - 1)]));
        arrayOfFloat[m + 1] = ((paramArrayOfFloat2[n] - paramArrayOfFloat1[(n - 3)]) * (paramArrayOfFloat1[(n + 2)] - paramArrayOfFloat1[(n - 1)]) - (paramArrayOfFloat1[n] - paramArrayOfFloat1[(n - 3)]) * (paramArrayOfFloat2[(n + 2)] - paramArrayOfFloat1[(n - 1)]));
        arrayOfFloat[m + 2] = ((paramArrayOfFloat1[n] - paramArrayOfFloat1[(n - 3)]) * (paramArrayOfFloat2[(n + 1)] - paramArrayOfFloat1[(n - 2)]) - (paramArrayOfFloat2[n] - paramArrayOfFloat1[(n - 3)]) * (paramArrayOfFloat1[(n + 1)] - paramArrayOfFloat1[(n - 2)]));
        if (arrayOfFloat[(m + 1)] < 0) {
          arrayOfFloat[m + 0] = (-arrayOfFloat[m + 0]);
          arrayOfFloat[m + 1] = (-arrayOfFloat[m + 1]);
          arrayOfFloat[m + 2] = (-arrayOfFloat[m + 2]);
        }
        m += 3;
        
        arrayOfFloat[m] = ((paramArrayOfFloat1[(n + 1)] - paramArrayOfFloat2[(n + 1)]) * (paramArrayOfFloat2[(n + 5)] - paramArrayOfFloat2[(n + 2)]) - (paramArrayOfFloat2[(n + 4)] - paramArrayOfFloat2[(n + 1)]) * (paramArrayOfFloat1[(n + 2)] - paramArrayOfFloat2[(n + 2)]));
        arrayOfFloat[(m + 1)] = ((paramArrayOfFloat2[(n + 3)] - paramArrayOfFloat2[n]) * (paramArrayOfFloat1[(n + 2)] - paramArrayOfFloat2[(n + 2)]) - (paramArrayOfFloat1[n] - paramArrayOfFloat2[n]) * (paramArrayOfFloat2[(n + 5)] - paramArrayOfFloat2[(n + 2)]));
        arrayOfFloat[(m + 2)] = ((paramArrayOfFloat1[n] - paramArrayOfFloat2[n]) * (paramArrayOfFloat2[(n + 4)] - paramArrayOfFloat2[(n + 1)]) - (paramArrayOfFloat2[(n + 3)] - paramArrayOfFloat2[n]) * (paramArrayOfFloat1[(n + 1)] - paramArrayOfFloat2[(n + 1)]));
        
        if (arrayOfFloat[(m + 1)] < 0) {
          arrayOfFloat[m] = (-arrayOfFloat[m]);
          arrayOfFloat[(m + 1)] = (-arrayOfFloat[(m + 1)]);
          arrayOfFloat[(m + 2)] = (-arrayOfFloat[(m + 2)]);
        }
        m += 3;
      }
      
      return arrayOfFloat;
    }
    
    toString() {
      return "(" + this.x + ':' + this.y + ':' + this.z + ") (" + this.speedX + ':' + this.speedY + ':' + this.speedZ + ") (" + this.angSpeedX + ':' + this.angSpeedY + ':' + this.angSpeedZ + ')';
    }
  }
}

new p5(s, 'leaf-sketch');