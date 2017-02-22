var restapi = {

	auth: {
		login: function (email, password, success, error) {
			var data = {
				email: email,
				password: password
			}
			restapi.call('POST', 'auth/login', data, success, error);
		},
		logout: function (success, error) {
			restapi.call('POST', 'auth/logout', null, success, error);
		},
		autologin: function (success, error) {
			restapi.call('POST', 'auth/autologin', null, success, error);
		}
	},
	users: {
		create: function (username, email, password, success, error) {
			var data = {
				username: username,
				email: email,
				password: password
			}
			restapi.call('POST', 'users', data, success, error);
		},
	},
	call: function (method, url, data, successCallback, errorCallback) {

		var req = new XMLHttpRequest();
		req.open("POST", "/api/" + url, true);
		req.setRequestHeader('Accept', 'application/json, text/javascript, */*; q=0.01');
		req.setRequestHeader('Content-Type', 'application/json');
		req.send((data !== null ? JSON.stringify(data) : null));

		req.onreadystatechange = function () {
			if (req.readyState === XMLHttpRequest.DONE) {

				try {
					req.responseJSON = JSON.parse(req.responseText);
				} catch (error) {
					req.responseJSON = { noJSON: req.responseText };
				}
				console.log(req.responseJSON);

				if (req.status >= 200 && req.status < 300) { // OK
					successCallback(req);
				}
				else { // NKO
					errorCallback(req);
				}
			}
		};
	},
}