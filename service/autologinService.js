const uuidGenerator = require('node-uuid');

const autologinDao = require('../dao/autologinDao');

module.exports = {
    create: (userId, callback) => {
        let token = uuidGenerator.v4();
        let autologinToken = {
            userId: userId,
            token: token
        };
        autologinDao.insert(autologinToken, (err) => {
            callback(err, token);
        });
    },
    getUserId: (params, callback) => {
        autologinDao.selectByToken(params.token, (err, autologinToken) => {
            callback(err, autologinToken.userId);
        });
    },
    remove: (params, callback) => {
        autologinDao.delete(params.token, (err) => {
            callback(err);
        });
    },
};