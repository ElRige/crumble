const express = require('express');
const router = express.Router();
const uuidGenerator = require('node-uuid');

const userService = require('../../service/userService');
const autologinService = require('../../service/autologinService');

router.post('/register', (req, res, next) => {
    userService.create(req.body, (err, user) => {
        if (err) {
            return next(err);
        }
        res.send(user);
    });
});

router.post('/login', (req, res, next) => {
    userService.login(req.body, (err, user) => {
        if (err) {
            return next(err);
        }
        sendLogin(req, res, user);
    });
});

router.post('/autologin', (req, res, next) => {
    autologinService.create(req.session.user.id, (err, token) => {
        if (err) {
            next(err);
        }
        res.send({ token: token });
    });
});
router.put('/autologin', (req, res, next) => {
    autologinService.getUserId(req.body, (err, userId) => {
        if (err) {
            next(err);
        }
        userService.getById(userId, (err, user) => {
            if (err) {
                next(err);
            }
            sendLogin(req, res, user);
        });
    });
});

router.post('/logout', (req, res, next) => {
    req.session.token = null;
    req.session.user = null;
    if (req.body.token === null) {
        res.status(204).send();
        return;
    }
    autologinService.remove(req.body, (err) => {
        if (err) {
            next(err);
        }
        res.status(204).send();
    });
});

let sendLogin = function (req, res, user) {
    req.session.user = user;
    req.session.token = uuidGenerator.v4();
    res.send({
        token: req.session.token
    });
};

module.exports = router;