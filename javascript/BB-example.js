let containerBB = document.getElementById("TutorExtraCont");
let exampleBB = document.getElementById("BBExample");
// let close = document.getElementById("closeExample");
let exampleBBWidth;
let exampleBBHeight;

if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
  exampleBBWidth = document.getElementById("JSCont").offsetWidth * 0.95 + "";

  exampleBBHeight = "1200";

} else {
  exampleBBWidth = "1000";
  exampleBBHeight = "700";
}

let htmlCodeBB = ` <iframe width="` + exampleBBWidth + `" height="` + exampleBBHeight + `" id="bubbleBudgeting" class="blackBorder" src="./BubbleBudgeting/index.html"></iframe>
<div id="BBexplain" class="blackBorder">This is Bubble Budgeting by the fictitious business PAPA-AJ. You can see your monthly spending in the central bubble and the outer bubbles shows your spending in certain categories: the lighter the colour the less essential it is (the kids seriously underestimated how expensive rent was). Press the plus symbol to add another category. 
<br><br>

You can also add a saving goal by clicking on the S. The app will then calculate where to reduce your spending.</div>
<div id="closeExample" class="blackBorder">Close</div>`;

// Make container a button 
containerBB.addEventListener("click", function () {
  background.classList.remove("noDisplay");
  exampleBB.classList.remove("noDisplay");
  exampleBB.innerHTML = htmlCodeBB;
  document.getElementById("closeExample").addEventListener("click", closeIt);
});