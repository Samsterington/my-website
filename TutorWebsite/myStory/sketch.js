let dotcol = {
  r:255,
  b:255,
  g:50
};
let dottran = 0;
let dotsize = 0;
let mousesize = 500;
let hasMoved = false;
let lastPosX;
let lastPosY;
let countDown = 20;

let dotpos = {
  x:0,
  y:0
}


function setup() {
  let canvas = createCanvas(windowWidth,windowHeight*2);
//  canvas.position(0,0);
  canvas.id('mycanvas');
  canvas.style("z-index","-1");
  background(0);
  frameRate(25)
  mousesize = floor(windowWidth/4);
}

function draw() {
  dottran = random(100,200);
  dotsize = random (25,50);
  dotpos.x = random(0,width);
  dotpos.y = random(0,height);
  dotcol.r = 0;
  dotcol.b = random(100,255);
  dotcol.g = random(100,255);
  noStroke();
  fill(dotcol.r,dotcol.g,dotcol.b,dottran);
  ellipse(dotpos.x,dotpos.y,dotsize);
  if(mouseX != lastPosX && mouseY != lastPosY) {
    // Generating the faded errasor 
      let brushing = mousesize;
      for(i = 0; i < 20; i++) {
        fill(0,0,0,(i)); // Each ellipse is more opaque in the middle 
        brushing -= 5;
        ellipse(mouseX,mouseY,brushing); // Every 5 pixels in a new ellipse is drawn over the top 
      }
  }
  lastPosX = mouseX;
  lastPosY = mouseY;
}