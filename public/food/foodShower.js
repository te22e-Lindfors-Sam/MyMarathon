document.addEventListener("DOMContentLoaded", event =>{
    selectWhatFoodToshow();
});

function selectWhatFoodToshow(){

    var foodContainer = document.getElementById("foodContainer");
    var db = firebase.database().ref('Food/');
    db.on('value', (snapshot) => {
        const data = snapshot.val(); 
        const RandKey = getRandomKeys(data, 5);
        for (const key of RandKey) {
            var cardContainer = document.createElement("a");
            cardContainer.href = data[key].Recept;
            cardContainer.classList.add("card");
    
            var h3 = document.createElement("h3");
            h3.classList.add("title");
            h3.textContent = data[key].namn;
            cardContainer.appendChild(h3);
    
            var divImg = document.createElement("div");
            divImg.classList.add("foodImage");
            cardContainer.appendChild(divImg);
    
            var foodImg = document.createElement("img");
            foodImg.src = data[key].imgLoc;
            foodImg.classList.add("imgOfFood");
    
            divImg.appendChild(foodImg);
            foodContainer.appendChild(cardContainer);
        }



    
    // <div class="card">
    //       <h3 class="title">Card 1</h3>
    //       <div class="foodImage">
    //         <img src="" alt="food">
    //       </div>
    //     </div>
    

    //   for (const key in data) {
    //     if (data.hasOwnProperty(key)) {
    //       const element = data[key];
    //       if (valueCounts.hasOwnProperty(element.distanace)) {
    //         valueCounts[element.distanace]++;
    //         total++;
    //       } else {
    //         total++;
    //         valueCounts[element.distanace] = 1;
    //       }
    //     }
    //   }
    //   var colorString = '';
    //   var lastProcentege = 0;
    //   var colorIndex = 0;
    //   var valueOffset = 0;
  
    //   var raceList = document.getElementById("RaceList");
    //   while (raceList.firstChild) {
    //     raceList.removeChild(raceList.firstChild);
    // }
    //   for (let value in valueCounts) {
    //     console.log(total + " " + valueCounts[value] + " " + valueOffset);
    //     let thisColor = colors[colorIndex] + ' ' + lastProcentege + '%, ' + colors[colorIndex] + ' ' + ((valueOffset+valueCounts[value])/total * 100) + '%';
        
    //     lastProcentege= (valueOffset+valueCounts[value])/total*100;
        
    //     if (lastProcentege != 100){
    //       thisColor += ',';
    //     }
  
  
    //     const li = document.createElement("li");
    //     // const div = document.createElement("div");
      
    //     li.textContent = value + "km Ran " + valueCounts[value] + " times";
    //     li.classList.add('custom-bullet');;
    //     li.style.color = colors[colorIndex];
    //     raceList.appendChild(li);
  
    //     colorIndex++;
    //     valueOffset += valueCounts[value];
    //     colorString += thisColor;
    //   }
    //   colorString = 'conic-gradient(' + colorString + ')';
    //   raceChart.style.backgroundImage = colorString;
  
    });
}

function getRandomKeys(obj, count) {
    //Get all keys
    const keys = Object.keys(obj);
  
    //shuffels
    for (let i = keys.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [keys[i], keys[j]] = [keys[j], keys[i]];
    }
  
    //returns the x amount of keys from the list
    return keys.slice(0, count);
  }

