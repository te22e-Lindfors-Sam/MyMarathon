document.addEventListener("DOMContentLoaded", event =>{
    const app = firebase.app();
    const storedValue = localStorage.getItem('user');
    const storedObject = JSON.parse(storedValue);
    console.log(storedObject.UID);
});

