

if (!/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
  console.log("Background on")

  let numberOfFollowers = 10;

  let names = ["intro", "info", "journeyCode", "matlab", "JS", "Tutor", "Website", "AITutor", "contact"]; // Have to add extra containers here
  let contents = [];
  let followers = [];

  let backgroundOn = true;
  let switcher = document.getElementById("backgroundSwitch");
  switcher.addEventListener("click", function () {
    if (backgroundOn) {
      this.innerHTML = "Turn on background";
    } else if (!backgroundOn) {
      this.innerHTML = "Turn off background";
    }
    backgroundOn = !backgroundOn;
  });

  let contentOn = true;
  let switcher2 = document.getElementById("contentSwitch");
  switcher2.addEventListener("click", function () {
    if (contentOn) {
      this.innerHTML = "Turn on content";
      document.getElementById("content").classList.add("noDisplay");
    } else if (!contentOn) {
      this.innerHTML = "Turn off content";
      document.getElementById("content").classList.remove("noDisplay");
    }
    contentOn = !contentOn;
  });


  function setup() {
    let canvas = createCanvas(document.documentElement.clientWidth, document.documentElement.clientHeight);

    canvas.id("myCanvas");
    canvas.style("z-index", "-1");
    frameRate(25);

    for (i = 0; i < names.length; i++) {
      contents[i] = new Content(names[i]);
    }

    for (i = 0; i < numberOfFollowers; i++) {
      followers[i] = new Follower();
    }
  }

  function draw() {
    if (backgroundOn) {
      for (i = 0; i < followers.length; i++) {
        followers[i].move();
        followers[i].show();
        for (j = 0; j < contents.length; j++) {
          if (followers[i].inside(contents[j])) {
            followers[i].isInside = true;
            break;
          } else {
            followers[i].isInside = false;
          }
        }
      }
    } else {
      noStroke();
      fill(255);
      rect(0, 0, document.documentElement.clientWidth, document.documentElement.clientHeight);
    }
    if (!contentOn) {
      for (i = 0; i < contents.length; i++) {
        contents[i].drawOutline();
      }
    }
  }

  // Takes an id of a content section, allows manipulation in the background
  class Content {
    constructor(name) {
      this.id = document.getElementById(name + "Cont");
      this.x = this.id.offsetLeft;
      this.y = this.id.offsetTop;
      this.width = this.id.offsetWidth;
      this.height = this.id.offsetHeight;
      this.radius = parseInt(window.getComputedStyle(this.id).borderRadius.slice(0, -2));
    }

    drawOutline() {
      noFill();
      stroke(0);
      strokeWeight(2);
      rect(this.x, this.y, this.width, this.height, this.radius);
    }
  }

  class Follower {
    constructor(name) {
      this.startX = [0, windowWidth];
      this.startY = [0, windowHeight];
      this.x = random(this.startX);
      this.y = random(this.startY);
      this.baseSize = random(5, 10);
      this.size = this.baseSize;
      this.bassOpacity = random(50, 150);
      this.opacity = this.bassOpacity;
      this.bassRed = 100
      this.red = this.bassRed;
      this.bassGreen = random(200, 255);
      this.green = this.bassGreen;
      this.bassBlue = random(200, 255);
      this.blue = this.bassBlue;
      this.bassSpeedVariation = random(30, 70);
      this.speedVariation = this.bassSpeedVariation;
      this.isInside = false;
      this.isReset = true;
      this.bassOrbitWeakness = random(80, 120);
      this.orbitWeakness = this.bassOrbitWeakness;
      this.orbitDirection = Math.floor(random(0, 2));

    }

    inside(box) {
      if (this.x > box.x && this.x < box.x + box.width) {
        if (this.y > box.y && this.y < box.y + box.height) {
          return true;
        }
      }
      return false;
    }

    grow() {
      if (this.size < 200) {
        this.size++;
      }
      if (this.orbitWeakness < 500) {
        this.orbitWeakness++;
      }
      if (this.opacity > 10) {
        this.opacity--;
      }
      if (this.speedVariation < 200) {
        this.speedVariation += 10;
      }
      this.shiftColour();
      this.isReset = false;
    }

    shiftColour() {
      let mid = (this.bassBlue + this.bassGreen + this.bassRed / 3)
      let changeSpeed = 0.001;
      if (this.blue > 0 && this.blue < 255) {
        this.blue -= (this.bassBlue - mid) * changeSpeed;
      }
      if (this.green > 0 && this.green < 255) {
        this.green -= (this.bassGreen - mid) * changeSpeed;;
      }
      if (this.red > 0 && this.red < 255) {
        this.red -= (this.bassRed - mid) * changeSpeed;
      }
    }

    reset() {
      this.size = this.baseSize;
      this.opacity = this.bassOpacity;
      this.speedVariation = this.bassSpeedVariation;
      this.blue = this.bassBlue;
      this.green = this.bassGreen;
      this.red = this.bassRed;
      this.orbitWeakness = this.bassOrbitWeakness;
      this.isReset = true;

    }

    show() {
      noStroke();
      fill(this.red, this.green, this.blue, this.opacity);
      if (this.isInside) {
        this.grow();
      } else {
        if (!this.isReset) {
          this.reset();
        }
      }
      ellipse(this.x, this.y, this.size);
    }


    findVector() {
      let hor = Math.abs(mouseX - this.x);
      let vert = Math.abs(mouseY - this.y);
      // Now swap them around 
      return [vert, hor];
    }


    move() {
      let distanceX = Math.abs(this.x - mouseX);
      let distanceY = Math.abs(this.y - mouseY);
      let speedX = distanceX / this.speedVariation;
      let speedY = distanceY / this.speedVariation;

      let orbit = this.findVector()
      if (this.x > mouseX) {
        this.x -= speedX;
      } else if (this.x < mouseX) {
        this.x += speedX;
      }

      if (this.y > mouseY) {
        this.y -= speedY;
      } else if (this.y < mouseY) {
        this.y += speedY;
      }

      if (this.orbitDirection === 1) {
        this.x += orbit[0] / this.orbitWeakness;
        this.y += orbit[1] / this.orbitWeakness;
      } else {
        this.x -= orbit[0] / this.orbitWeakness;
        this.y -= orbit[1] / this.orbitWeakness;
      }

      // CHance to change orbit type 
      if (random(0, 1) < 0.001) {
        this.orbitDirection++;
        if (this.orbitDirection === 2) {
          this.orbitDirection = 0;
        }
      }


    }
  }

}