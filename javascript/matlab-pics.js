let divML = document.getElementById("matlabExtraCont");
let picsML = divML.querySelectorAll("img");
let currentPicML = 0;

// Only have height of pictures set here if on laptop

console.log(window.innerWidth)

let heightML = document.getElementById("matlabCont").offsetHeight; // Must add container style padding on
for (i = 0; i < picsML.length; i++) {
  if (!/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
    picsML[i].style.height = heightML;
  } else {
    picsML[i].style.height = setHeight * 0.8;
  }
}


// Function to swap between pictures 
function nextPicML() {
  picsML[currentPicML].classList.add("noDisplay");
  currentPicML++;
  if (currentPicML >= picsML.length) {
    currentPicML = 0;
  }
  picsML[currentPicML].classList.remove("noDisplay");
  setTimeout(nextPicML, 5000);
}

// Start it 
setTimeout(nextPicML, 5000);
