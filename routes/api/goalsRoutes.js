const express = require('express');
const router = express.Router();
// const goalService = require('../../service/goalService');

router.post('/', (req, res, next) => {
    // TODO insertGoal
    console.log('TODO : insertGoal');
});
router.get('/', (req, res, next) => {
    // TODO getGoals
    console.log('TODO : getGoals');
});
router.get('/:id', (req, res, next) => {
    // TODO getGoal
    console.log('TODO : getGoal');
});
router.put('/:id', (req, res, next) => {
    // TODO updateGoal
    console.log('TODO : updateGoal');
});
router.delete('/:id', (req, res, next) => {
    // TODO deleteGoal
    console.log('TODO : deleteGoal');
});

module.exports = router;