let colors = ['#8931EF','#F2CA19','#FF00BD','#0057E9','#87E911','#E11845'];
let slideIndex = 1;
var user;

//wating for everything to load
document.addEventListener("DOMContentLoaded", event =>{
  //get the user
  const storedValue = localStorage.getItem('user');
  user = JSON.parse(storedValue);

  //sets up the slide an loads the first one and charts
  showSlides(slideIndex);
  UpdateChartRace();
  UpdateChartDist();

  //Sets up the buttons in the slides
  var raceBtn = document.getElementById("race-btn");
  var raceModal = document.getElementById("race-modal");

  var distanceBtn = document.getElementById("distance-btn");
  var distanceModal = document.getElementById("distance-model");

  var span = document.getElementsByClassName("close")[0];
  var span2 = document.getElementsByClassName("close")[1];

  raceBtn.onclick = function() {
    raceModal.style.display = "block";
  };

  distanceBtn.onclick = function() {
    distanceModal.style.display = "block";
  };

  span.onclick = function() {
    raceModal.style.display = "none";
  };

  span2.onclick = function() {
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
  var raceName = document.getElementById("race-name").value;
  var raceDist = document.getElementById("race-dist").value;
  var raceTime = document.getElementById("race-time").value;

  firebase.database().ref('users/' + user.uid + '/' + 'races/' + raceName).update({
    name: raceName,
    distanace: raceDist,
    time: raceTime
  });

  var raceModal = document.getElementById("race-modal");
  raceModal.style.display = "none";
  UpdateChartRace();
}

function AddDistance(){
  var RunDist = document.getElementById("distnace-dist").value;
  var RunTime = document.getElementById("distance-time").value; 

  const currentTime = new Date();
  const currentTimeString = currentTime.toLocaleTimeString();
  console.log(currentTimeString);
  firebase.database().ref('users/' + user.uid + '/' + 'RunningsDistances/' + currentTimeString).update({
    DistanceRunned: RunDist,
    TimeRunned: RunTime,
    Date: currentTimeString
  });

  var distModal = document.getElementById("distance-model");
  distModal.style.display = "none";
  UpdateChartDist();
}

function UpdateChartRace(){
  console.clear();
  let valueCounts = {};
  var raceChart = document.getElementById("chart-race");
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

    var raceList = document.getElementById("race-list");
    while (raceList.firstChild) {
      raceList.removeChild(raceList.firstChild);
    }
    for (let value in valueCounts) {
      let thisColor = colors[colorIndex] + ' ' + lastProcentege + '%, ' + colors[colorIndex] + ' ' + ((valueOffset+valueCounts[value])/total * 100) + '%';
      
      lastProcentege = (valueOffset+valueCounts[value])/total*100;
      
      if (lastProcentege != 100){
        thisColor += ',';
      }


      const li = document.createElement("li");
    
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
  //counting all the total times ran a certain distance
  let valueCounts = {};
  var raceChart = document.getElementById("chart-distance");
  let total = 0;

  var db = firebase.database().ref('users/' + user.uid + '/' + 'RunningsDistances/');
  db.on('value', (snapshot) => {
    const data = snapshot.val(); 
    
    for (const key in data) {
      if (data.hasOwnProperty(key)) {
        const element = data[key];
        if (valueCounts.hasOwnProperty(element.DistanceRunned)) {
          valueCounts[element.DistanceRunned]++;
          total++;
        } else {
          total++;
          valueCounts[element.DistanceRunned] = 1;
        }
      }
    }
      //for each distance ran choose a color and change it 
    var colorString = '';
    var lastProcentege = 0;
    var colorIndex = 0;
    var valueOffset = 0;

    var raceList = document.getElementById("distance-list");
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





