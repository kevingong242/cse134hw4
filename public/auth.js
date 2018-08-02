//FIREBASE AUTH
var logOutBtn = document.getElementById('logOut');
function signUpAppear(){
    document.getElementById('signUpArea').style.visibility = "visible";    
}

function signIn(){
    var user = document.getElementById('signInUser').value;
    var pass = document.getElementById('signInPass').value;
    firebase.auth().signInWithEmailAndPassword(user, pass).catch(function(error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      window.alert("Error: " + errorMessage);
      // ...
    });
    var logOutBtn = document.getElementById('logOut');
    logOutBtn.style.visibility = "visible";
    //window.location = "issueList.html";
}

function signUp(){
    var user = document.getElementById('signUpUser').value;
    var pass = document.getElementById('signUpPass').value;
    firebase.auth().createUserWithEmailAndPassword(user, pass).catch(function(error) {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
  // ...
    document.getElementById('signUpArea').style.visibility = "hidden";
    var logOutBtn = document.getElementById('logOut');
    logOutBtn.style.visibility = "visible";
});
}

function logOut(){
    firebase.auth().signOut().then(function() {
        console.log("Sign out successful");
    }).catch(function(error) {
        alert("Something went wrong with logging out");
    // An error happened.
    });
    var logOutBtn = document.getElementById('logOut');
    logOutBtn.style.visibility = "hidden";
}

firebase.auth().onAuthStateChanged(firebaseUser =>{
    if(firebaseUser){
        console.log("Worked: " + firebaseUser);
        var user = firebase.auth().currentUser;
        
    }else{
        console.log("Not logged in!");
    }
});