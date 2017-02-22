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

	var username = document.getElementById('username').value;
	var password = document.getElementById('password').value;

	function success(xhr) {
		window.location = urls.operations;
	}
	restapi.auth.login(username, password, success, defaultError);
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

	function success(xhr) {
		toast('Compte créé, vous pouvez maintenant vous connecter');
		displayConnect(true);
	}
	restapi.users.create(username, email, password, success, defaultError);
}

function displayConnect(isConnect) {
	var connect = document.getElementById('connect');
	var register = document.getElementById('register');
	connect.style.display = (isConnect ? 'block' : 'none');
	register.style.display = (isConnect ? 'none' : 'block');
}