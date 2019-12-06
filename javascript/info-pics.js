let div = document.getElementById("infoExtraCont");
let pics = div.querySelectorAll("img");
let currentPic = 0;
let skip2 = false;
// this is to set max height in phones
let setHeight;
let setWidth;
let heightSet = false;

// Set height of the pics to match the text (not in mobile)
let height = document.getElementById("infoCont").offsetHeight - 60;
// Must minus the border width
for (i = 0; i < pics.length; i++) {
  if (!/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
    pics[i].style.height = height;
  } else {
    if (!heightSet) {
      setWidth = document.getElementById("infoCont").offsetWidth;
      pics[i].style.width = setWidth * 0.5;
      setHeight = pics[i].offsetHeight;
      heightSet = true;
    }
    pics[i].style.height = setHeight;
  }
}





// Function to swap between pictures 
function nextPic() {
  pics[currentPic].classList.add("noDisplay");
  currentPic++;
  if (skip2 && currentPic === 3) {
    currentPic++;
  }
  if (currentPic >= pics.length) {
    currentPic = 0;
  }
  pics[currentPic].classList.remove("noDisplay");
  div.style.justifySelf = "center";
  // Hardcoded gif times 
  if (currentPic === 1) {
    setTimeout(nextPic, 4600);
  } else if (currentPic === 3) {
    setTimeout(nextPic, 5500);
    skip2 = true;
  } else {
    setTimeout(nextPic, 5000);
  }
}

// Start it 

setTimeout(nextPic, 5000);

