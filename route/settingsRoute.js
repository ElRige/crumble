var express = require('express');
var router = express.Router();

router.get('/recurrence', function (req, res) {
	res.render('recurrence.ejs');
});

router.get('/foresight', function (req, res) {
	res.render('foresight.ejs');
});

router.get('/account', function (req, res) {
	res.render('account.ejs');
});

module.exports = router;