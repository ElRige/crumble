const express = require('express');
const router = express.Router();

const userService = require('../../service/userService');

router.post('/', (req, res, next) => {
    userService.create(req.body, (err, user) => {
        if (err) {
            return next(err);
        }
        res.send(user);
    });
});
router.get('/', (req, res, next) => {
    // TODO getUsers
    console.log('TODO : getUsers');
});
router.get('/:id', (req, res, next) => {
    // TODO getUser
    console.log('TODO : getUser');
});
router.put('/:id', (req, res, next) => {
    // TODO updateUser
    console.log('TODO : updateUser');
});
router.delete('/:id', (req, res, next) => {
    // TODO deleteUser
    console.log('TODO : deleteUser');
});

module.exports = router;