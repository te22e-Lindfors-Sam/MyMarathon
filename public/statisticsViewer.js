let slideIndex = 1;
var user;

document.addEventListener("DOMContentLoaded", event =>{
    const storedValue = localStorage.getItem('user');
    user = JSON.parse(storedValue);
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

// firebase.database().ref('users/' + storedObject.uid).set({
//   username: storedObject.displayName,
//   email: storedObject.email,
// });

function AddRace(){

  var raceName = document.getElementById("RaceName").value;
  var raceDist = document.getElementById("RaceDist").value;
  var raceTime = document.getElementById("RaceTime").value;

  firebase.database().ref('users/' + storedObject.uid + '/' + 'races/' + raceName).set({
    name: raceName,
    distanace: raceDist,
    time: raceTime
  });
}

function AddDistance(){

  var RunDist = document.getElementById("RunDist").value;
  var RunTime = document.getElementById("RunTime").value; 

  firebase.database().ref('users/' + storedObject.uid + '/' + 'RunningsDistances/').set({
    DistanceRunned: RunDist,
    TimeRunned: RunTime,
  });
}


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





