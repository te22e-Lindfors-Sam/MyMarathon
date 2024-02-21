document.addEventListener("DOMContentLoaded", event =>{
    const app = firebase.app(); //only checks if the server is live
    window.addEventListener('scroll', stickynavbar);
    navbar = document.getElementById('navbar'); 
    navTop = navbar.offsetTop;

    //this part will throw an error if no user exists and with that it wont be able to add a new user
    const storedValue = localStorage.getItem('user');
    const storedObject = JSON.parse(storedValue);
    var name = document.getElementById("userName");
    name.textContent = storedObject.displayName; 

    firebase.database().ref('users/' + storedObject.uid).set({
      username: storedObject.displayName,
      email: storedObject.email,
  });

});


var navbar;
let navTop;






function stickynavbar() {
  console.log("acitve");
  if (window.scrollY >= navTop) {   
    navbar.classList.add('sticky');
  } 
  else {
    navbar.classList.remove('sticky');    
  }
}
