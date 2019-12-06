// This is a standard moving ball game where you must avoid obsticals.
// You win if you get past 100 blocks.
// Over time the screen turns blue (same color as the blocks) making it impossible to dodge the blocks.
// This basically means there is a time limit
// By Sam Williams, Finished: 12/02/2017

// This is the object of the ball
var dood = {
  x:150,
  y:350,
  speed:0,

  display: function() { // This function displays the ball
    noStroke();
    fill(255, 200, 0);
    ellipse(this.x,this.y,50,50);
  },

  avoid: function() { // This function accelerates the ball horizontally depending on the relative distance between the mouse and the ball
    this.speed = (mouseX - this.x)/50
    this.x = this.x + this.speed;
    if (this.x > 275) {
      this.x = 275;
    } else if (this.x < 25) {
      this.x = 25;
    }
  }
}

//Outside game control 
let start = false;
let initialFrame = 0;

// Global variables detecting what has happend in the game
var score = 0; // How many blocks have been passed
var end = 0; // Have you failed the game, 0 = no, 1 = yes
var hit = false; // Are you currently intersecting a block
var blocks = []; // Array of the blocks currently on screen
var bckcol = 0; // Color of the background

function setup() {
  createCanvas(300,450);
//  if (frameCount == 60) {
    for (i = 0; i < 1; i++) { // Creates the first block
      blocks[i] = new Block;
    }
//  }
    background(255);
    fill(255,200,0);
    noStroke();
    ellipse(150,350,50,50);
}

function mouseClicked() {
    if (mouseX > 0 && mouseX < width && mouseY > 0 && mouseY < height) {
        if(!start) {
        initialFrame = frameCount;
        }
        start = true;
    } 
}

function draw() {
    
    
if(start) {
    
  col = map(frameCount - initialFrame,0,3000,255,0); // Basically makes the framecount a color
  background(255, col, col + 100); // slowly changes the background to blue


  dood.display(); // Dislplays the ball
  dood.avoid(); // Allows ball to move
  for (i = blocks.length-1;i >= 0; i--) { //For every block on screen do these things
    if (end == 0) { // If you have yet failed
      blocks[i].display();
      blocks[i].move();
      blocks[i].faster();
      if (blocks[i].y > height) { // If the block goes off the bottom of the screen splice it form the array
        blocks.splice(i,1);
        score = score + 1; // Adds to the score
      }
      if (blocks[i].n == 0) { // Go to constructor function for definition of n
        if (blocks[i].y >= 80) { // every time a block gets to 80 genertae a new one
          blocks.push(new Block());
          blocks[i].n = 1; // A block will only ever generate one new block
        }
      }
      hit = collideRectCircle(blocks[i].x,blocks[i].y,60,10,dood.x,dood.y,50,50); // If the ball collides with the block trigger end fail
      if (hit) {
        blocks.splice(0,blocks.length); // Remove all the blocks
        end = 1;
      }
    }
  }
  if (end == 1) { // This code triigers if you fail the game
    fill(0)
    text("Score:" + score,(width/2),(height/2));
    textSize(50);
    textAlign(CENTER);
  }
  if (score >= 100) { // This code triggers if you win and get above 100 score
    text("YOU WIN",(width/2),(height/2));
    textSize(50);
    textAlign(CENTER);
    blocks.splice(0,blocks.length);
  }
  fill(0); // This constantly shows your current score in the top left corner
  text(score,20,20,20,20);
      
  }
}

function Block() { // This is a constructor function for the blocks
  this.x = random(0,width-60);  // Random horizontal position (but fully on screen)
  this.y = 0; // Initial vertical starting position (the top)
  this.speed = 1;
  this.n = 0; // This basically checks whether the block has generated another block yet

  this.display = function() { // Displayes the block on the screen
    noStroke();
    fill(255, 0, 100);
    rect(this.x,this.y,60,10)
  }

  this.move = function() { // The block lowers every time this is run (constantly)
    this.y = this.y + this.speed;
  }

  this.faster = function() { // Changes the speed depending how high up the mouse is on the canvas
    if (mouseY < 300) {
      this.speed = (350 - mouseY)/50;
    } else { // If within 50 pixels of the ball it travels at a base speed 1 (not almost 0)
      this.speed = 1;
    }
  }
}

p5.prototype.collideRectCircle = function(rx, ry, rw, rh, cx, cy, diameter) {
  //2d
  // temporary variables to set edges for testing
  var testX = cx;
  var testY = cy;

  // which edge is closest?
  if (cx < rx) {
    testX = rx // left edge
  } else if (cx > rx + rw) {
    testX = rx + rw
  } // right edge

  if (cy < ry) {
    testY = ry // top edge
  } else if (cy > ry + rh) {
    testY = ry + rh
  } // bottom edge

  // // get distance from closest edges
  var distance = dist(cx, cy, testX, testY)

  // if the distance is less than the radius, collision!
  if (distance <= diameter / 2) {
    return true;
  }
  return false;
};
