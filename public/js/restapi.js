var restapi = {

	auth: {
		register: function(email, password, confirmPassword, success, error) {
			var data = 'email='+email+'&password='+password+'&confirmPassword='+confirmPassword;
			restapi.postForm('/auth/register', data, success, error);
		},
		login: function(username, password, success, error) {
			var data = 'username='+username+'&password='+password;
			restapi.postForm('/auth/login', data, success, error);
		}
	},
	postForm: function(url, data, success, error) {
		
		var xhttp = new XMLHttpRequest();
		xhttp.onreadystatechange = function() {
			if (this.readyState == 4 && (this.status == 200 || this.status == 201)) {
				console.log(this.responseText);
				success(this);
			}
			else if (this.readyState == 4) {
				console.log(this.responseText);
				error(this);
			}
		};
		xhttp.open("POST", url, true);
		xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
		xhttp.send(data);
	}

}