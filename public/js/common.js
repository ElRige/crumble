var urls = {
    login: '/login',
    operations: '/operations'
};

document.body.onload = function () {

    $('.button-collapse').sideNav();

    init();
};

var defaultError = function (json) {

    var errors = {
        AUTHENTICATION_ERROR: 'Login ou mot de passe incorrect',
        RECONNECT: 'Une erreur c\'est produite, veuillez réessayer'
    };

    if (json.error === 'SESSION_EXPIRE') {
        alert('Votre sessions à expirer merci de vous reconnecter');
        window.location = urls.login;
    }

    toast(errors[json.error] === undefined ? json.error : errors[json.error]);
};

function logout() {
    var success = function () {
        window.location = urls.login;
    };
    restapi.auth.logout(success, defaultError);
}

function toast(message) {
    Materialize.toast(message, 5000);
}