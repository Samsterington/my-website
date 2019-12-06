var x = 0;
var y = 0;
var mouX ;
var mouY ;

function setup() {
  createCanvas(500,500);
}

function draw() {
  if (mouseX < 500) {
    mouX = mouseX ;     
  } else {
    mouX = 500 ;
  }
  if (mouseY < 500) {
    mouY = mouseY ;
  } else {
    mouY = 500 ;
  }
  xc = map(mouX,0,width,-25,25); //Need to controll this so it never has a mangnitude greater than 25 
  yc = map(mouY,0,width,-25,25);
  backDrop(xc,yc);
}

function backDrop(x,y) {
  for (i = 0; i < 200; i++) {
    var ocol = floor(map(i,0,200,0,255));
    var jx = floor(map(i,0,100,0,(-x)*2));
    var jy = floor(map(i,0,100,0,(-y)*2));
    fill(ocol);
    noStroke();
    rectMode(CENTER)
    rect(width/2+(jx),height/2+(jy),width-(2*i),height-(2*i));
  }
  for (i = 100; i > 0; i--) {
    var icol = floor(map(i,0,100,255,0));
    var jx = floor(map(i,0,100,x,0));
    var jy = floor(map(i,0,100,y,0));
    fill(icol);
    noStroke();
    ellipse(width/2+(jx),height/2+(jy),i,i);
  }
}