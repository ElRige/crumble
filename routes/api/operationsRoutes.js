const express = require('express');
const router = express.Router();

const operationService = require('../../service/operationService');

router.post('/', (req, res, next) => {
    operationService.create(req.body, (operation) => {
        res.send(operation);
    });
});
router.get('/', (req, res, next) => {
    operationService.getAll(req.session.user.id, (err, operations) => {
        if (err) {
            return next(err);
        }
        res.send({ operations: operations });
    });
});
router.get('/:id', (req, res, next) => {
    // TODO getOperation
    console.log('TODO : getOperation');
});
router.put('/:id', (req, res, next) => {
    // TODO updateOperation
    console.log('TODO : updateOperation');
});
router.delete('/:id', (req, res, next) => {
    // TODO deleteOperation
    console.log('TODO : deleteOperation');
});

module.exports = router;