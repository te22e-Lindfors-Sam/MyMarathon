let slideIndex = 1;

document.addEventListener("DOMContentLoaded", event =>{
    //sets up the slide an loads the first one
    showSlides(slideIndex);

    //Sets up the buttons in the slides
    var raceBtn = document.getElementById("RaceBtn");
    var raceModal = document.getElementById("RaceModal");
    var distanceBtn = document.getElementById("DistanceBtn");
    var distanceModal = document.getElementById("DistanceModal");

    var span = document.getElementsByClassName("close")[0];

    raceBtn.onclick = function() {
        raceModal.style.display = "block";
    };
    distanceBtn.onclick = function() {
        distanceModal.style.display = "block";
    };

    span.onclick = function() {
        raceModal.style.display = "none";
        distanceModal.style.display = "none";
    };

    window.onclick = function(event) {
        if (event.target == raceModal) {
          raceModal.style.display = "none";
        }
        if (event.target == distanceModal) {
          distanceModal.style.display = "none";
        }

    };
});

//changes slide
function PlusSlides(n) {
  showSlides(slideIndex += n);
}

//for the round rings to change the slide you are looking at
function CurrentSlide(n) {
  showSlides(slideIndex = n);
}

//Shows a slide
function showSlides(n) {
  let i;
  let slides = document.getElementsByClassName("statistics");
  let dots = document.getElementsByClassName("dot");

  //Making sure it is not to big or to small
  if (n > slides.length) {slideIndex = 1}
  if (n < 1) {slideIndex = slides.length}

  //Reste every slide to show none
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }

  //Changes the buttons- to display right
  for (i = 0; i < dots.length; i++) {
    dots[i].className = dots[i].className.replace(" active", "");
  }

  //Displays right
  slides[slideIndex-1].style.display = "flex";
  dots[slideIndex-1].className += " active";
}





