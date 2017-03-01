//const requestLauncher = require('../daoOld/requestLauncher');

/*var getCategories = function(socket) {
	requestLauncher.getCategories(function(categories) {
		socket.emit('categories', categories);
	});
}

exports.getCategories = getCategories;
*/

const crypto = require('crypto');
const User = require('../models/User');
const userDao = require('../dao/userDao');

module.exports = {
    login: (params, callback) => {
        let passwordToVerify = hashPassword(params.password);
        userDao.selectByEmail(params.email, (err, user) => {
            if (user == null || user.password != passwordToVerify) {
                return callback('AUTHENTICATION_ERROR');
            }
            callback(err, user);
        });
    },
    create: (params, callback) => {
        let password = hashPassword(params.password);
        let user = new User(params.email, params.username, password);
        userDao.insert(user, (err, id) => {
            user.id = id;
            callback(err, user);
        });
    },
    getById: (userId, callback) => {
        userDao.selectById(userId, (err, user) => {
            callback(err, user);
        });
    }
};

function hashPassword(password) {
    let hash = crypto.createHash('sha256');
    hash.update(password);
    return hash.digest('hex');
}