document.addEventListener("DOMContentLoaded", event =>{
    const app = firebase.app();
    const storedValue = localStorage.getItem('user');
    const storedObject = JSON.parse(storedValue);
    console.log(storedObject.displayName);
});

function isElementInViewport(el) {
    const rect = el.getBoundingClientRect();
  const windowHeight = window.innerHeight || document.documentElement.clientHeight;
  const windowWidth = window.innerWidth || document.documentElement.clientWidth;

  // Adjust for margins
  const elementTop = rect.top + window.scrollY - parseInt(window.getComputedStyle(el).marginTop);
  const elementBottom = rect.bottom + window.scrollY + parseInt(window.getComputedStyle(el).marginBottom);
  const elementLeft = rect.left + window.scrollX - parseInt(window.getComputedStyle(el).marginLeft);
  const elementRight = rect.right + window.scrollX + parseInt(window.getComputedStyle(el).marginRight);

  return (
    elementTop < windowHeight &&
    elementBottom > 0 &&
    elementLeft < windowWidth &&
    elementRight > 0
  );
  }

  // Function to handle visibility status
  function handleVisibility() {
    const targetElement = document.querySelector('.test');
    
    if (isElementInViewport(targetElement)) {
      console.log('Element is in the viewport!');
    } else {
      console.log('Element is out of the viewport!');
    }
  }

  // Attach the handleVisibility function to scroll and resize events
  window.addEventListener('scroll', handleVisibility);
  window.addEventListener('resize', handleVisibility);

  // Initial check when the page loads
  handleVisibility();