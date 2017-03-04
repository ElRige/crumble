const express = require('express');
const router = express.Router();

const operationService = require('../../service/operationService');

router.post('/', (req, res, next) => {
    operationService.add(req.session.user.id, req.body, (operation) => {
        res.send(operation);
    });
});
router.put('/', (req, res, next) => {
    operationService.getAll(req.session.user.id, req.body, (err, operations) => {
        if (err) {
            return next(err);
        }
        res.send(operations);
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