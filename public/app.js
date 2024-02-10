console.log("setup");
document.addEventListener("DOMContentLoaded", event =>{
    console.log("before");
    const app = firebase.app();
    console.log("done");
});

function googleLogin(){
    console.log("here");
    const provider = new firebase.auth.GoogleAuthProvider();
    
    firebase.auth().signInWithPopup(provider)
        
            .then(result => {
                const user = result.user;        
                document.write("hello " + user.displayName);
            })  
}