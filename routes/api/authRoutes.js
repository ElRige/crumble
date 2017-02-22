const express = require('express');
const router = express.Router();
const userService = require('../../service/userService');

router.post('/login', (req, res, next) => {
    // TODO login
    console.log('TODO : login');

    userService.login(req.body, (err, user) => {
        if (err) {
            return next(err);
        }
        console.log(req.sessionID);
        res.send(user);
    });

});
router.post('/logout', (req, res, next) => {
    // TODO logout
    console.log('TODO : logout');
});
router.post('/autologin', (req, res, next) => {
    // TODO autologin
    console.log('TODO : autologin');
});

module.exports = router;