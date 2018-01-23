
// START FIREBASE FUNCTIONS
function googleLogIn(){
    var provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithPopup(provider)
    .then(function(result) {
      // This gives you a Google Access Token. You can use it to access the Google API.
      var token = result.credential.accessToken;
      // The signed-in user info.
      var user = result.user;
      successfulLogin();
    }).catch(function(error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      // The email of the user's account used.
      var email = error.email;
      // The firebase.auth.AuthCredential type that was used.
      var credential = error.credential;
      // ...
    });
}

function emailAndPswLogin(){
    let email = $('#emailField').val();
    let password = $('#passwordField').val();
    firebase.auth().signInWithEmailAndPassword(email, password)
    .then(successfulLogin)
    .catch(function(error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      // ...
    });
}
function emailAndPswSignIn(){
    let email = $('#emailField').val();
    let password = $('#passwordField').val();
    firebase.auth().createUserWithEmailAndPassword(email, password)
    .then(successfulLogin)
    .catch(function(error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      // ...
    });
}
function logOut(){
    firebase.auth().signOut()
    .then(successfulLogOut)
    .catch(function(error) {
      // An error happened.
    });
}
// END FIREBASE FUNCTIONS



// START MAIN FUNCTIONS
function unLoggedUserPage(){
    successfulLogOut();

}
function loggedUserPage(){
    successfulLogin();
}
function wantLogin(button){
//    console.log(button);
    button.id === 'wantLogin' ? ($('#signInButton').hide(),$('#loginButton').show()): '';
    button.id === 'wantSignIn' ? ($('#loginButton').hide(),$('#signInButton').show()): '';
    $('#mainPage').hide();
    $('#loginPage').show();
}
function cancelLogin(){
    $('#loginPage').hide();
    $('#mainPage').show();
}
function successfulLogOut(){
        $('#logOut').hide();
        $('#googleLogin, #wantLogin, #wantSignIn').show();
        $('#favoriteSection').html('Login for favorite feature');

}
function successfulLogin(){
        $('#loginPage, #googleLogin, #wantLogin, #wantSignIn').hide();
        $('#mainPage, #logOut').show();
        $('#favoriteSection').html('Carrusel with favorite cities');

}
function getWeather(){
    document.getElementById("infoContainer").classList.add("flip");
}
function newSearch(){
    document.getElementById("infoContainer").classList.remove("flip");
}
// END MAIN FUNTIONS



// START READY DOCUMENT
$(function(){
//    Global variables
    let user = firebase.auth().currentUser;
    if (user != null){
        loggedUserPage();
    }else{
        unLoggedUserPage();
    }
});
// END READY DOCUMENT
