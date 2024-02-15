var navbar;
let navTop;
document.addEventListener("DOMContentLoaded", event =>{
    console.log("active");
    window.addEventListener('scroll', stickynavbar);
    navbar = document.getElementById('navbar'); 
    console.log(navbar);
    navTop = navbar.offsetTop;
});









function stickynavbar() {
  if (window.scrollY >= navTop) {   
    navbar.classList.add('sticky');
  } 
  else {
    navbar.classList.remove('sticky');    
  }
}
