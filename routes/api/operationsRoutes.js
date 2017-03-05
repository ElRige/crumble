const express = require('express');
const router = express.Router();

const operationService = require('../../service/operationService');

router.post('/', (req, res, next) => {
    operationService.add(req.session.user.id, req.body, (err, operationDto) => {
        if (err) {
            return next(err);
        }
        res.send(operationDto);
    });
});
router.put('/', (req, res, next) => {
    operationService.getBetweenDate(req.session.user.id, req.body, (err, operationDtos) => {
        if (err) {
            return next(err);
        }
        res.send(operationDtos);
    });
});
router.get('/:uuid', (req, res, next) => {
    // TODO getOperation
    console.log('TODO : getOperation');
    operationService.get(req.session.user.id, req.params, (err, operation) => {
        if (err) {
            return next(err);
        }
        isAuthorized(req, operation, next);
        res.send(operation);
    });
});
router.put('/:uuid', (req, res, next) => {
    // TODO updateOperation
    console.log('TODO : updateOperation');
});
router.delete('/:uuid', (req, res, next) => {
    // TODO deleteOperation
    console.log('TODO : deleteOperation');
});

module.exports = router;