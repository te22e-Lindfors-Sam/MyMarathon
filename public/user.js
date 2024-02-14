document.addEventListener("DOMContentLoaded", event =>{
    const app = firebase.app();
    const storedValue = localStorage.getItem('user');
    const storedObject = JSON.parse(storedValue);
    console.log(storedObject.displayName);
});

window.onscroll = function() {myFunction()};

// Get the navbar
var navbar = document.getElementsByClassName('nav');

// Get the offset position of the navbar
var sticky = navbar.offsetTop;

// Add the sticky class to the navbar when you reach its scroll position. Remove "sticky" when you leave the scroll position
function myFunction() {
  navbar.classList.add("sticky")
  if (window.pageYOffset >= sticky) {
    navbar.classList.add("sticky")
  } else {
    navbar.classList.remove("sticky");
  }
}