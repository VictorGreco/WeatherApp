const firebaseAuth = firebase.auth();

const googleLogIn = () => {
    const provider = new firebase.auth.GoogleAuthProvider();

    firebaseAuth.signInWithPopup(provider)
        .then(result => {
            let token = result.credential.accessToken;
            let user = result.user;
            successfulLogin();
        }).catch(error => {
            let errorCode = error.code;
            let errorMessage = error.message;
            let email = error.email;
            let credential = error.credential;
        });
};

const emailAndPswLogin = () => {
    let email = $('#emailField').val();
    let password = $('#passwordField').val();

    firebaseAuth.signInWithEmailAndPassword(email, password)
        .then(successfulLogin)
        .catch(error => {
            let errorCode = error.code;
            let errorMessage = error.message;
        });
};

const emailAndPswSignIn = () => {
    let email = $('#emailField').val();
    let password = $('#passwordField').val();

    firebaseAuth.createUserWithEmailAndPassword(email, password)
        .then(successfulLogin)
        .catch(error => {
            let errorCode = error.code;
            let errorMessage = error.message;
        });
};

const logOut = () => firebaseAuth.signOut().then(successfulLogOut);

const unLoggedUserPage = () => {
    successfulLogOut();
};

const loggedUserPage = () => {
    successfulLogin();
};

const wantLogin = button =>{
    button.id === 'wantLogin' ? ($('#signInButton').hide(),$('#loginButton').show()): '';
    button.id === 'wantSignIn' ? ($('#loginButton').hide(),$('#signInButton').show()): '';
    $('#mainPage').hide();
    $('#loginPage').show();
};

const cancelLogin = () => {
    $('#loginPage').hide();
    $('#mainPage').show();
};

const successfulLogOut = () => {
        $('#logOut, #titleLogin').hide();
        $('#googleLogin, #wantLogin, #wantSignIn, #titleLogout').show();
        $('#favoriteSection').html('Login for favorite feature');
};

const successfulLogin = () => {
        $('#titleLogin').html(loginUserName);
        $('#loginPage, #googleLogin, #wantLogin, #wantSignIn, #titleLogout').hide();
        $('#mainPage, #logOut, #titleLogin').show();
        $('#favoriteSection').html('Carrusel with favorite cities');
};

const loginUserName = () => {
   let user = firebaseAuth.currentUser.email;

   return "Hi! "+user+"<br> how are you today?";
};

const getWeather = () => {
    let wantedCityName = $('#searchInput').val();
    let url = "https://api.openweathermap.org/data/2.5/weather?q=" + wantedCityName + "&units=metric" + "&APPID=0dc8a74ac1b4f4c84a7293ecabcd44da";
    if (wantedCityName != '' ){
        $.getJSON(url, data => {
            document.getElementById("infoContainer").classList.add("flip");
        })
        .done(data => weatherJsonDone(data))
        .fail(() => console.log('faild'));
    }else{
        console.log('empty field');
    }

};

const getCurrentDay = data => {
    const date = Date(Date.now());
    let b = date.split(" ");
    let time = b[4].split(":");
    let wantedDate = b[2] + " " + b[1];

    time = time[0] + ":" + time[1];
    data.base = wantedDate;
    data.cod = time;
};

const getWeatherImg = data => {
    let finalImg = "";
    let b = data.cod.split(":");
    let hour = b[0];

    7 < hour && hour < 19 ? finalImg += "sun": finalImg += "night";
    finalImg += "-" + data.weather[0].main;
    data.clouds = finalImg + ".png";
};

const getAndFillTemplate = data => {
    const template = $('#weatherInfoTemplate').html();
    const displayContent = Mustache.render(template, data);

    $('#weatherContentTarget').html(displayContent);
};

const weatherJsonDone = data => {
    $('#myLoader').hide();
    $('#searchInput').val('');
    getCurrentDay(data);
    getWeatherImg(data);
    getAndFillTemplate(data);
};

const newSearch = () => {
    $('#weatherContentTarget').html('');
    document.getElementById("infoContainer").classList.remove("flip");
    $('#myLoader').show();
};

$(() => {
    let user = firebaseAuth.currentUser;

    !!user ? loggedUserPage() : unLoggedUserPage();
});
