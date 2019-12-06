
// The arrow icon
let closer = document.getElementById("closeIcon");
// All logos as one div
let allShakers = document.getElementById("logos");
// Array of individual logos
let shakers = document.querySelectorAll(".shakers");
let closed = false;

// Make the height of the experience bar the window height
document.getElementById("experienceIn").style.height = innerHeight;


// Makes logos shake differently from each other
for (i = 0; i < shakers.length; i++) {
  if (i % 4 === 0) {
    shakers[i].style.animationDirection = "alternate";
  } else if (i % 2 === 0) {
    shakers[i].style.animationDirection = "reverse";
  }
}

// Shakes logos if hovering before ext
closer.addEventListener("mouseenter", function () {
  for (i = 0; i < shakers.length; i++) {
    shakers[i].style.animationPlayState = "running";
  }
});

// Stops logos shaking
closer.addEventListener("mouseleave", function () {
  for (i = 0; i < shakers.length; i++) {
    shakers[i].style.animationPlayState = "paused";
  }
})

// Click on the closer to remove or bring back the logos
closer.addEventListener("click", function () {
  if (closed) { // Opening
    // Restart shaking
    for (i = 0; i < shakers.length; i++) {
      shakers[i].style.animationPlayState = "running";
    }
    allShakers.style.animationName = "return";
    allShakers.style.animationDuration = "1s"
    allShakers.style.animationPlayState = "running";

    // Swap the arrow
    closer.setAttribute("src", "./../images/Experience-in/close-icon.png");
    closed = false;

  } else { // Closing
    // Stop shaking
    for (i = 0; i < shakers.length; i++) {
      shakers[i].style.animationPlayState = "paused";
    }
    allShakers.style.animationName = "leave";
    allShakers.style.animationDuration = "1s";
    allShakers.style.animationPlayState = "running";

    // Swap the arrow
    closer.setAttribute("src", "./../images/Experience-in/open-icon.png");
    closed = true;
  }

});

// Code taken from https://stackoverflow.com/questions/12199363/scrollto-with-animation
// http://www.paulirish.com/2011/requestanimationframe-for-smart-animating/
window.requestAnimFrame = (function () {
  return window.requestAnimationFrame ||
    window.webkitRequestAnimationFrame ||
    window.mozRequestAnimationFrame ||
    function (callback) {
      window.setTimeout(callback, 1000 / 60);
    };
})();

// main function
function scrollToY(scrollTargetY, speed, easing) {
  // scrollTargetY: the target scrollY property of the window
  // speed: time in pixels per second
  // easing: easing equation to use

  var scrollY = window.scrollY,
    scrollTargetY = scrollTargetY || 0,
    speed = speed || 2000,
    easing = easing || 'easeOutSine',
    currentTime = 0;

  // min time .1, max time .8 seconds
  var time = Math.max(.1, Math.min(Math.abs(scrollY - scrollTargetY) / speed, .8));

  // easing equations from https://github.com/danro/easing-js/blob/master/easing.js
  var PI_D2 = Math.PI / 2,
    easingEquations = {
      easeOutSine: function (pos) {
        return Math.sin(pos * (Math.PI / 2));
      },
      easeInOutSine: function (pos) {
        return (-0.5 * (Math.cos(Math.PI * pos) - 1));
      },
      easeInOutQuint: function (pos) {
        if ((pos /= 0.5) < 1) {
          return 0.5 * Math.pow(pos, 5);
        }
        return 0.5 * (Math.pow((pos - 2), 5) + 2);
      }
    };

  // add animation loop
  function tick() {
    currentTime += 1 / 60;

    var p = currentTime / time;
    var t = easingEquations[easing](p);

    if (p < 1) {
      requestAnimFrame(tick);

      window.scrollTo(0, scrollY + ((scrollTargetY - scrollY) * t));
    } else {
      console.log('scroll done');
      window.scrollTo(0, scrollTargetY);
    }
  }

  // call it once to get started
  tick();
}

function scroll(position) {
  scrollToY(position, position, 'easeInOutQuint');
}

let buffer = 10;

let posMatlab = document.getElementById("matlabCont").offsetTop - buffer;
let posJS = document.getElementById("JSCont").offsetTop - 10;
let posTutor = document.getElementById("TutorCont").offsetTop - buffer;
let posWebsite = document.getElementById("WebsiteExtraCont").offsetTop - buffer;
let posAITutor = document.getElementById("AITutorCont").offsetTop - buffer;
let posContact = document.getElementById("contactCont").offsetTop - buffer;


shakers[0].addEventListener("click", function () {
  scroll(posJS);
});
shakers[1].addEventListener("click", function () {
  scroll(posAITutor);
});
shakers[2].addEventListener("click", function () {
  scroll(posAITutor);
});
shakers[3].addEventListener("click", function () {
  scroll(posWebsite);
});
shakers[4].addEventListener("click", function () {
  scroll(posWebsite);
});
shakers[5].addEventListener("click", function () {
  scroll(posAITutor);
});
shakers[6].addEventListener("click", function () {
  scroll(posAITutor);
});
shakers[7].addEventListener("click", function () {
  scroll(posMatlab);
});
shakers[8].addEventListener("click", function () {
  scroll(posJS);
});
shakers[9].addEventListener("click", function () {
  scroll(posJS);
});
shakers[10].addEventListener("click", function () {
  scroll(posWebsite);
});
shakers[11].addEventListener("click", function () {
  scroll(posWebsite);
});
shakers[12].addEventListener("click", function () {
  scroll(posAITutor);
});

// Adding this for contact info button

document.getElementById("contactButton").addEventListener("click", function () {
  scroll(posContact);
});
