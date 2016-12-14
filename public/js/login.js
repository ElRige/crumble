function init() {
	displayConnect(true);
}

function setCategories() {

}

function setMonth() {
	
}


var urls = {
	login: '/login',
	operations: '/operations'
}

function defaultError(xhr) {
	console.log(xhr.responseText);
	toast(xhr.responseText);
}

function login() {

	var email = document.getElementById('email').value;
	var password = document.getElementById('password').value;

	function success(xhr) {
		window.location = urls.operations;
	}
	restapi.auth.login(email, password, success, defaultError);
}

function register() {

	var email = document.getElementById('registerEmail').value;
	var confirmEmail = document.getElementById('registerConfirmEmail').value;
	var password = document.getElementById('registerPassword').value;
	var confirmPassword = document.getElementById('registerConfirmPassword').value;

	if (email != confirmEmail) {
		toast('Vos adresse email ne correspondent pas');
		return;
	} 
	else if (password != confirmPassword) {
		toast('Vos mot de passe ne correspondent pas');
		return;
	}

	function success(xhr) {
		toast('Compte créé, vous pouvez maintenant vous connecter');
		displayConnect(true);
	}
	restapi.auth.register(email, password, confirmPassword, success, defaultError);
}

function displayConnect(isConnect) {
	var connect = document.getElementById('connect');
	var register = document.getElementById('register');
	connect.style.display = (isConnect ? 'block' : 'none');
	register.style.display = (isConnect ? 'none' : 'block');
}