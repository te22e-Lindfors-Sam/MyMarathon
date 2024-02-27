//wait for everything to load
document.addEventListener("DOMContentLoaded", event =>{
    window.addEventListener('resize', HandleResize);
    HandleResize();
});

var foodElementsToShow = 0;

function HandleResize(){
    var cardWidth = 200;
    console.log("here");
    foodElementsToShow = Math.floor(window.innerWidth/cardWidth);
    SelectRecepiesToShow();
}

function SelectRecepiesToShow(){
    //delates all children in the list to make space for new ones
    var foodContainer = document.getElementById("food-container");
    while (foodContainer.firstChild) {
        foodContainer.removeChild(foodContainer.firstChild);
    }

    var db = firebase.database().ref('Food/');
    //gets the data from the db and randomzies the order
    db.on('value', (snapshot) => {
        const data = snapshot.val(); 
        const RandKey = getRandomKeys(data, foodElementsToShow);
        
        //for every key make an element of it
        for (const key of RandKey) {
            var cardContainer = document.createElement("a");
            cardContainer.href = data[key].Recept;
            cardContainer.classList.add("food-card");
    
            var h3 = document.createElement("h3");
            h3.classList.add("dish-title");
            h3.textContent = data[key].namn;
            cardContainer.appendChild(h3);
    
            var divImg = document.createElement("div");
            divImg.classList.add("food-image");
            cardContainer.appendChild(divImg);
    
            var foodImg = document.createElement("img");
            foodImg.src = data[key].imgLoc;
            foodImg.classList.add("img-food");
    
            divImg.appendChild(foodImg);
            foodContainer.appendChild(cardContainer);
        }
    });
}

function getRandomKeys(obj, count) {
    //Get all keys
    const keys = Object.keys(obj);
  
    //shuffel
    for (let i = keys.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [keys[i], keys[j]] = [keys[j], keys[i]];
    }
  
    //returns the x amount of keys from the list
    return keys.slice(0, count);
  }

