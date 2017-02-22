const cradle = require('cradle');
var db = new(cradle.Connection)( {auth: {username: 'admin', password: 'passw0rd'}} ).database('crumble');
//var db = new(cradle.Connection)( 'http://admin:passw0rd@localhost:5984/crumble' );


/*
db.view('user/byUsername', { key: 'luke' }, function (err, doc) {
      console.dir(doc);
});
*/

var getCategories = function(callback) {

	db.view('enum/categories', function (err, res) {

		if (err != null) {
			console.log('ERROR : cradle getCategories' + err);
			return;
			// TODO throw error
		}
		return callback(res[0].value);
	});

};

exports.getCategories = getCategories;