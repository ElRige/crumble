var restapi = {
    auth: {
        register: function (username, email, password, success, error) {
            var data = {
                username: username,
                email: email,
                password: password
            };
            restapi.send('POST', 'auth/register', data, success, error);
        },
        login: function (email, password, success, error) {
            var data = {
                email: email,
                password: password
            };
            var overrideSuccess = function (json) {
                restapi.setSessionToken(json.token);
                if (success) {
                    success(json);
                }
            };
            restapi.send('POST', 'auth/login', data, overrideSuccess, error);
        },
        logout: function (success, error) {
            var data = {
                token: localStorage.getItem('autologinToken')
            };
            var overrideSuccess = function (json) {
                sessionStorage.removeItem('sessionToken');
                localStorage.removeItem('autologinToken');
                if (success) {
                    success(json);
                }
            };
            restapi.send('POST', 'auth/logout', data, overrideSuccess, error);
        },
        autologin: {
            create: function (success, error) {
                var overrideSuccess = function (json) {
                    restapi.setAutologinToken(json.token);
                    if (success) {
                        success(json);
                    }
                };
                restapi.send('POST', 'auth/autologin', null, overrideSuccess, error);
            },
            login: function (success, error) {
                var autologinToken = localStorage.getItem('autologinToken');
                if (!autologinToken) {
                    return;
                }
                var data = {
                    token: autologinToken
                };
                var overrideSuccess = function (json) {
                    restapi.setSessionToken(json.token);
                    if (success) {
                        success(json);
                    }
                };
                restapi.send('PUT', 'auth/autologin', data, overrideSuccess, error);
            }
        }
    },
    users: {
        self: function (success, error) {
            restapi.send('GET', 'users', null, success, error);
        }
    },
    operations: {
        add: function (operation, success, error) {
            restapi.send('POST', 'operations', operation, success, error);
        },
        list: function (startDate, endDate, success, error) {
            var data = {
                startDate: startDate,
                endDate: endDate
            };
            restapi.send('PUT', 'operations', data, success, error);
        },
    },
    send: function (method, url, data, successCallback, errorCallback) {

        var req = new XMLHttpRequest();
        req.open(method, '/api/' + url, true);

        req.setRequestHeader('Accept', 'application/json, text/javascript, */*; q=0.01');
        req.setRequestHeader('Content-Type', 'application/json');
        req.setRequestHeader('token', restapi.sessionToken);

        req.send((data !== null ? JSON.stringify(data) : null));

        req.onreadystatechange = function () {
            if (req.readyState === XMLHttpRequest.DONE) {

                try {
                    req.responseJSON = JSON.parse(req.responseText);
                } catch (error) {
                    req.responseJSON = { noJSON: req.responseText };
                }

                if (req.status >= 200 && req.status < 300) { // OK
                    successCallback(req.responseJSON);
                }
                else { // NKO
                    if (req.responseJSON.error === 'SESSION_EXPIRE' && localStorage.getItem('autologinToken')) {
                        restapi.auth.autologin.login(function (json) {
                            errorCallback({ error: 'RECONNECT' });
                        }, errorCallback);
                    } else {
                        errorCallback(req.responseJSON);
                    }
                }
            }
        };
    },
    setSessionToken: function (token) {
        restapi.sessionToken = token;
        sessionStorage.setItem('sessionToken', token);
    },
    setAutologinToken: function (token) {
        localStorage.setItem('autologinToken', token);
    },
    init: function () {
        restapi.sessionToken = sessionStorage.getItem('sessionToken');
    }
};

restapi.init();