const spanDetector = document.getElementById("span-detector");
const nav = document.getElementById("nav");
const showCase = document.querySelector(".showcase");
const featureSection = document.querySelector(".features");
// page load
window.addEventListener("load", function() {
  const clients = ["EveryOne", "Fitness Freaks", "Vegans", "Developers"];
  typeWriter(spanDetector, clients);
  window.addEventListener("scroll", myfunction);

});

function typeWriter(spanDetector, clients) {
  let txt = "";
  let wordIndex = 0;
  let isDeleting = false;

  function typer() {
    //
    let wait = 30;

    wordIndex = wordIndex % clients.length;

    const word = clients[wordIndex];

    if (isDeleting == true) {
      txt = word.substring(0, txt.length - 1);
    } else {
      txt = word.substring(0, txt.length + 1);
    }

    spanDetector.textContent = txt;

    const largerPause = 3000;

    if (isDeleting == true && txt == "") {
      wordIndex++;
      isDeleting = false;
    }  else if(isDeleting==false&&txt.length==word.length){
      wait = largerPause;
      isDeleting=true;
    }

    setTimeout(function() {
      typer();
    }, wait);
  }
  typer();
}
function myfunction() {
  if (window.pageYOffset > featureSection.offsetTop) {
    // console.log("Add Sticky");
    nav.classList.add("sticky");
  } else {
    nav.classList.remove("sticky");
  }
}
