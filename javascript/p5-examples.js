let container = document.getElementById("JSExtraCont");
let background = document.getElementById("exampleBackground");
let example = document.getElementById("santExample");
let exampleWidth;

let htmlCode;

// if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
//   exampleWidth = document.getElementById("JSCont").offsetWidth * 0.95 + "";
// } else {
//   exampleWidth = "675";
// }

exampleWidth = "675";

htmlCode = `<iframe width="` + exampleWidth + `" height="585" id="santorini" class="blackBorder" src="Santorini/index.html"></iframe>
  <div id="SantRules" class="blackBorder"> Each turn of play involves moving one of your two pieces around a 5-by-5 grid and then placing a tile adjacent to the moved piece (including diagonals), building up that spot of the board. On subsequent turns, pieces may be moved onto one of these built-up tiles, but only one level up at a time. Pieces may also be moved down any number of levels. Players may also place a special black tile on top of a three level building, which prevents a player from moving onto that spot for the remainder of the game.<br /><br />

  The primary winning condition is to get one of your pieces onto the third level of any tower, though players may also win if their opponent is unable to make a move.<br /><br />
  
  Note: The first two turns for each player are simply placing each of their pieces onto the board. They can start anywhere on the board.
  </div>
  <div id="closeExample" class="blackBorder">Close</div>`;


// Make container a button 
container.addEventListener("click", function () {
  background.classList.remove("noDisplay");
  example.classList.remove("noDisplay");
  example.innerHTML = htmlCode;
  document.getElementById("closeExample").addEventListener("click", closeIt);
});

function closeIt() {
  example.innerHTML = "";
  exampleBB.innerHTML = "";
  exampleCF.innerHTML = "";


  background.classList.add("noDisplay");
  example.classList.add("noDisplay");
  exampleBB.classList.add("noDisplay");
  exampleCF.classList.add("noDisplay");
}

background.addEventListener("click", closeIt);
// close.addEventListener("click", closeIt);
