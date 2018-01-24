
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
        $('#logOut, #titleLogin').hide();
        $('#googleLogin, #wantLogin, #wantSignIn, #titleLogout').show();
        $('#favoriteSection').html('Login for favorite feature');

}
function successfulLogin(){
        $('#titleLogin').html(loginUserName);
        $('#loginPage, #googleLogin, #wantLogin, #wantSignIn, #titleLogout').hide();
        $('#mainPage, #logOut, #titleLogin').show();
        $('#favoriteSection').html('Carrusel with favorite cities');
}
function loginUserName(){
   var user = firebase.auth().currentUser.email;
   return "Hi! "+user+"<br> how are you today?";
}
function getWeather(){
    var wantedCityName = $('#searchInput').val();
    var url = "https://api.openweathermap.org/data/2.5/weather?q=" + wantedCityName + "&units=metric" + "&APPID=0dc8a74ac1b4f4c84a7293ecabcd44da";
    if (wantedCityName != ''){
        $.getJSON(url, function(data){}).done(function(data){weatherJsonDone(data);}).fail(function(){weatherJsonFail();});
    }else{
        console.log('empty field');
    }

}
function weatherJsonDone(data){
    $('#searchInput').val('');
    console.log(data);
    console.log('done');
    document.getElementById("infoContainer").classList.add("flip");

}
function weatherJsonFail(){
        console.log('faild');
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
