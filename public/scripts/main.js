
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
    var url = "https://api.openweathermap.org/data/2.5/weather?q=" + wantedCityName + "&units=metric" + "&APPID=0dc8a74ac1b4f4c84a7293ecabcd44da";    if (wantedCityName != ''){
        $.getJSON(url, function(data){
            document.getElementById("infoContainer").classList.add("flip");
        }).done(function(data){weatherJsonDone(data);}).fail(function(){weatherJsonFail();});
    }else{
        console.log('empty field');
    }

}

function getCurrentDay(data) {
    var date = Date(Date.now());
    //    console.log(date);
    var b = date.split(" ");
    var time = b[4].split(":");
    time = time[0] + ":" + time[1];
    //    console.log(time);
    //        console.log(b);
    var wantedDate = b[2] + " " + b[1];
    //    console.log(wantedDate);
    data.base = wantedDate;
    data.cod = time;
}
function getWeatherImg(data) {
    var finalImg = "";
    var b = data.cod.split(":");
    var hour = b[0];
//    if (7 < hour && hour < 19) {
//        finalImg += "sun";
//    } else {
//        finalImg += "night";
//    }
    7<hour && hour <19 ? finalImg += "sun": finalImg += "night";
    finalImg += "-" + data.weather[0].main;
    data.clouds = finalImg + ".png";
}
function getAndFillTemplate(data) {
    var template = $('#weatherInfoTemplate').html();
    var displayContent = Mustache.render(template, data)
    $('#weatherContentTarget').html(displayContent);
    console.log('template working');
}
function weatherJsonDone(data){
    $('#myLoader').hide();
    $('#searchInput').val('');
    console.log(data);
    console.log('done');
    getCurrentDay(data);
    getWeatherImg(data);
    getAndFillTemplate(data);

}
function weatherJsonFail(){
        console.log('faild');
}

function newSearch(){
    $('#weatherContentTarget').html('');
    document.getElementById("infoContainer").classList.remove("flip");
    $('#myLoader').show();

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
