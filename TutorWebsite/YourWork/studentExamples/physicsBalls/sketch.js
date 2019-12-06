var balls = [];
let start = false;

function setup() {
  createCanvas(500,400);
  
  for (i = 0; i < 15; i++) {
    balls[i] = {
      x:(i*20) + 70,
      y:(i*20) + 20,
      vertspeed:0,
      rate:0.1,
      move:0,
      col:255,
      display: function() {
        noStroke();
        this.col = map(this.y,0,500,0,255);
        fill(-this.col,-this.col,this.col);
        ellipse(this.x,this.y,25);
      },
      fall: function() {
        this.y = this.y + this.vertspeed;
        if (this.y >= height) {
          this.vertspeed = this.vertspeed * (-1) ;
        }
      },
      sidemove: function() {
        this.x = this.x + this.move;
      },
      accel: function() {
        this.vertspeed = this.vertspeed+this.rate;
      },
    }
  }
    background(0);
    for (i = 0; i < balls.length; i++) {
        balls[i].display();
      }
}

function draw() {
  if(start) {
      background(0)
      for (i = 0; i < balls.length; i++) {
        balls[i].display();
        balls[i].fall();
        balls[i].accel();
        balls[i].sidemove();
      }
  }
}

function mouseClicked() {
    start = true;
}