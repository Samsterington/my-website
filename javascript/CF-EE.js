let containerCF = document.getElementById("easterEgg");
let exampleCF = document.getElementById("crackFoxEE");

let htmlCodeCF = ` <iframe width="560" height="315" id="crackFox" class="blackBorder" src="https://www.youtube.com/embed/dCuUnTJgD9M?start=16" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

<div id="closeExample" class="blackBorder">Close</div>`;

// Make container a button 
containerCF.addEventListener("click", function () {
  background.classList.remove("noDisplay");
  exampleCF.classList.remove("noDisplay");
  exampleCF.innerHTML = htmlCodeCF;
  document.getElementById("closeExample").addEventListener("click", closeIt);
});