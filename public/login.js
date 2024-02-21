document.addEventListener("DOMContentLoaded", event =>{
    const app = firebase.app();
});

function googleLogin(){
    const provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithPopup(provider)
        .then(result => {
            const user = result.user;        
            const serializedObject = JSON.stringify(user);
            localStorage.setItem('user', serializedObject);
            window.location.assign("home.html");
        });
}