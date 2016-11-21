const requestLauncher = require('../dao/requestLauncher');

var getCategories = function(socket) {
	requestLauncher.getCategories(function(categories) {
		socket.emit('categories', categories);
	});
}

exports.getCategories = getCategories;