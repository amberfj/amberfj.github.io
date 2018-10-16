
var s = function ( p ) {
  var startx = 15;
  var starty = 15;
  var jumpx = 15;
  var jumpy = 8;

  p.setup = function() {
    p.createCanvas(495, 495);
    p.noStroke();
    p.colorMode(3);
    p.background(30);
    p.frameRate(50);
    blockh = initBlox(xSize, ySize, 100, 100);
    blocks = initBlox(xSize, ySize, 50, 50);
    blockb = initBlox(xSize, ySize, 128, 127);
  }

  var endx = 475;
  var endy = 475;

  p.draw = function() {
    var f1 = 18;
    var f2 = 5;
    var arrayOfFloat1 = [];
    var arrayOfFloat2 = [];
    var arrayOfFloat3 = [];
    for (var i = 0; i < xSize; i++) {
      arrayOfFloat1.push([]);
      arrayOfFloat2.push([]);
      arrayOfFloat3.push([]);
      for (var j = 0; j < ySize; j++) {
        var arrayOfFloat = initAdd(f1);
        arrayOfFloat1[i][j] = updateBlox(i, j, blockh, arrayOfFloat[0]);
        arrayOfFloat2[i][j] = updateBlox(i, j, blocks, arrayOfFloat[1]);
        arrayOfFloat3[i][j] = updateBlox(i, j, blockb, arrayOfFloat[2]);
      }
    }
    blockh = arrayOfFloat1;
    blocks = arrayOfFloat2;
    blockb = arrayOfFloat3;
    var i = p.round(p.min(xSize - 2, p.max(1, (p.mouseX - startx) / jumpx)));
    var j = p.round(p.min(ySize - 2, p.max(1, (p.mouseY - starty) / jumpy)));

    var f3 = 100;
    var f4 = 255;
    var f5 = 255;
    
    blockh[i][j] = f3;
    blocks[i][j] = f4;
    blockb[i][j] = f5;
    
    blockh[(i - 1)][j] = ((blockh[(i - 1)][j] + 5) % 255);
    blocks[(i - 1)][j] = f4;
    blockb[(i - 1)][j] = f5;
    
    blockh[(i + 1)][j] = f3;
    blocks[(i + 1)][j] = f4;
    blockb[(i + 1)][j] = ((blockb[(i + 1)][j] + 5) % 255);
    
    blockh[i][(j - 1)] = f3;
    blocks[i][(j - 1)] = f4;
    blockb[i][(j - 1)] = f5;
    
    blockh[i][(j + 1)] = f3;
    blocks[i][(j + 1)] = f4;
    blockb[i][(j + 1)] = f5;
    
    blockh[(i + 1)][(j - 1)] = f3;
    blocks[(i + 1)][(j - 1)] = f4;
    blockb[(i + 1)][(j - 1)] = f5;

    zoomfactor += 1;
    p.constrain(zoomfactor, 0, 1);
    var k;
    var m;
    if (p.keyIsPressed) {
      p.background(30, 30, 30);
      p.translate(-p.mouseX, -p.mouseY);
      p.scale(zoomfactor);
      for (var k = 0; k < xSize; k++) {
        for (var m = 0; m < ySize; m++) {
          p.rect(startx + jumpx * k, starty + jumpy * m, jumpx - margin, jumpy - margin);
          p.fill(blockh[k][m], blocks[k][m], blockb[k][m]);
        }
      }
    }
    else {
      p.background(30, 30, 30);
      for (var k = 0; k < xSize; k++)
        for (var m = 0; m < ySize; m++) {
          p.rect(startx + jumpx * k, starty + jumpy * m, jumpx - margin, jumpy - margin);
          p.fill(blockh[k][m], blocks[k][m], blockb[k][m]);
        }
    }
  }

  var margin = 1;
  var xSize = ((endx - startx) / jumpx);
  var ySize = ((endy - starty) / jumpy);

  function initAdd(paramFloat) {
    var arrayOfFloat = [
      paramFloat * (p.random(1) - 0.5),
      paramFloat * (p.random(1) - 0.5),
      paramFloat * (p.random(1) - 0.5)
    ];
    return arrayOfFloat;
  }

  var blockh = [];

  function initBlox(paramInt1, paramInt2, paramFloat1, paramFloat2) {
    var arrayOfFloat = [];
    for (var i = 0; i < paramInt1; i++) {
      arrayOfFloat.push([]);
      for (var j = 0; j < paramInt2; j++) {
        arrayOfFloat[i][j] = paramFloat1 + p.random(-paramFloat2, paramFloat2);
      }
    }
    return arrayOfFloat;
  }

  var blocks = [];
  function updateBlox(paramInt1, paramInt2, paramArrayOfFloat, paramFloat) {
    var f1 = 2.0;
    var f2 = 2.0;
    var f3 = 5;
    var f4 = (paramInt2 % 3 - 1) * 0.1;
    var f5 = (paramInt1 % 3 - 1) * 0.1;



    var f7 = f3;
    var f6 = f3 * paramArrayOfFloat[paramInt1][paramInt2];
    if (paramInt1 + 1 < xSize) {
      f7 += f2;
      f6 += f2 * paramArrayOfFloat[(paramInt1 + 1)][paramInt2];
    }
    if (paramInt1 - 1 > 0) {
      f7 += f5;
      f6 += f5 * paramArrayOfFloat[(paramInt1 - 1)][paramInt2];
    }
    if (paramInt2 + 1 < ySize) {
      f7 += f4;
      f6 += f4 * paramArrayOfFloat[paramInt1][(paramInt2 + 1)];
    }
    if (paramInt2 - 1 > 0) {
      f7 += f1;
      f6 += f1 * paramArrayOfFloat[paramInt1][(paramInt2 - 1)];
    }
    f6 /= f7;
    f6 += paramFloat;
    return f6;
  }

  var blockb = [];
  var zoomfactor = 0;
}

new p5(s, 'COLORWAVE-sketch');  
