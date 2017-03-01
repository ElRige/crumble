function init() {
    restapi.auth.autologin.login(loginSuccess, defaultError);
}

var loginSuccess = function () {
    window.location = urls.operations;
};

function login() {

    var email = document.getElementById('email').value;
    var password = document.getElementById('password').value;
    var autologin = document.getElementById('autologin').checked;

    var overrideLoginSuccess = function (loginSuccessJson) {
        if (!autologin) {
            loginSuccess(loginSuccessJson);
            return;
        }
        var success = function () {
            loginSuccess(loginSuccessJson);
        }
        restapi.auth.autologin.create(success, defaultError);
    }
    restapi.auth.login(email, password, overrideLoginSuccess, defaultError);
}

function register() {

    var username = document.getElementById('registerUsername').value;
    var email = document.getElementById('registerEmail').value;
    var password = document.getElementById('registerPassword').value;
    var confirmPassword = document.getElementById('registerConfirmPassword').value;

    if (password != confirmPassword) {
        toast('Vos mot de passe ne correspondent pas');
        return;
    }

    function success(json) {
        toast('Compte créé, vous pouvez maintenant vous connecter');
        displayConnect(true);
    }
    restapi.auth.register(username, email, password, success, defaultError);
}

function displayConnect(isConnect) {
    var connect = document.getElementById('connect');
    var register = document.getElementById('register');
    connect.style.display = (isConnect ? 'block' : 'none');
    register.style.display = (isConnect ? 'none' : 'block');
}