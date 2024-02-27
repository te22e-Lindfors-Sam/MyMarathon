let colors = ['#e6194b', '#3cb44b', '#ffe119', '#4363d8', '#f58231', '#911eb4', '#46f0f0', '#f032e6', '#bcf60c', '#fabebe', '#008080', '#e6beff', '#9a6324', '#fffac8', '#800000', '#aaffc3', '#808000', '#ffd8b1', '#000075', '#808080', '#ffffff', '#000000'];
let slideIndex = 1;
var user;

document.addEventListener("DOMContentLoaded", event =>{
    const storedValue = localStorage.getItem('user');
    user = JSON.parse(storedValue);
    //sets up the slide an loads the first one
    showSlides(slideIndex);
    UpdateChartRace();
    UpdateChartDist();

    // //Sets up the buttons in the slides
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



function AddRace(){
  var raceName = document.getElementById("RaceName").value;
  var raceDist = document.getElementById("RaceDist").value;
  var raceTime = document.getElementById("RaceTime").value;

  firebase.database().ref('users/' + user.uid + '/' + 'races/' + raceName).update({
    name: raceName,
    distanace: raceDist,
    time: raceTime
  });

  var raceModal = document.getElementById("RaceModal");
  raceModal.style.display = "none";
  UpdateChartRace();
}

function AddDistance(){
  var RunDist = document.getElementById("RunDist").value;
  var RunTime = document.getElementById("RunTime").value; 

  firebase.database().ref('users/' + user.uid + '/' + 'RunningsDistances/' + new Time().toDateString()).update({
    DistanceRunned: RunDist,
    TimeRunned: RunTime,
    Date: new Time().toDateString()
  });

  var distModal = document.getElementById("DistanceModal");
  distModal.style.display = "none";
  UpdateChartDist();
}

function UpdateChartRace(){
  console.clear();
  let valueCounts = {};
  var raceChart = document.getElementById("RacesRan");
  let total = 0;

  var db = firebase.database().ref('users/' + user.uid + '/' + 'races/');
  db.on('value', (snapshot) => {
    const data = snapshot.val(); 
    
    for (const key in data) {
      if (data.hasOwnProperty(key)) {
        const element = data[key];
        if (valueCounts.hasOwnProperty(element.distanace)) {
          valueCounts[element.distanace]++;
          total++;
        } else {
          total++;
          valueCounts[element.distanace] = 1;
        }
      }
    }
    var colorString = '';
    var lastProcentege = 0;
    var colorIndex = 0;
    var valueOffset = 0;

    var raceList = document.getElementById("RaceList");
    while (raceList.firstChild) {
      raceList.removeChild(raceList.firstChild);
  }
    for (let value in valueCounts) {
      let thisColor = colors[colorIndex] + ' ' + lastProcentege + '%, ' + colors[colorIndex] + ' ' + ((valueOffset+valueCounts[value])/total * 100) + '%';
      
      lastProcentege= (valueOffset+valueCounts[value])/total*100;
      
      if (lastProcentege != 100){
        thisColor += ',';
      }


      const li = document.createElement("li");
      // const div = document.createElement("div");
    
      li.textContent = value + "km Ran " + valueCounts[value] + " times";
      li.classList.add('custom-bullet');;
      li.style.color = colors[colorIndex];
      raceList.appendChild(li);

      colorIndex++;
      valueOffset += valueCounts[value];
      colorString += thisColor;
    }
    colorString = 'conic-gradient(' + colorString + ')';
    raceChart.style.backgroundImage = colorString;

  });
}

function UpdateChartDist(){
  console.clear();
  let valueCounts = {};
  var raceChart = document.getElementById("chartDistance");
  let total = 0;

  var db = firebase.database().ref('users/' + user.uid + '/' + 'RunningsDistances/');
  db.on('value', (snapshot) => {
    const data = snapshot.val(); 
    
    for (const key in data) {
      if (data.hasOwnProperty(key)) {
        const element = data[key];
        if (valueCounts.hasOwnProperty(element.distanace)) {
          valueCounts[element.distanace]++;
          total++;
        } else {
          total++;
          valueCounts[element.distanace] = 1;
        }
      }
    }
    var colorString = '';
    var lastProcentege = 0;
    var colorIndex = 0;
    var valueOffset = 0;
    for (let value in valueCounts) {
      let thisColor = colors[colorIndex] + ' ' + lastProcentege + '%, ' + colors[colorIndex] + ' ' + ((valueOffset+valueCounts[value])/total * 100) + '%';
      
      lastProcentege= (valueOffset+valueCounts[value])/total*100;
      
      if (lastProcentege != 100){
        thisColor += ',';
      }
      colorIndex++;
      valueOffset += valueCounts[value];
      colorString += thisColor;
    }
    colorString = 'conic-gradient(' + colorString + ')';
    raceChart.style.backgroundImage = colorString;

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





