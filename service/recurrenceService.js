const requestLauncher = require('../dao/requestLauncher');

var getAll = function(socket, data) {
	requestLauncher.getRecurrence(data, function(recurrences) {
		socket.emit('recurrences', recurrences);
	});
};

var add = function(socket, recurrence) { 
	recurrence.amount = recurrence.amount * 100;

	requestLauncher.saveRecurrence(recurrence, function(status) {
		var message = (status === 201 ? 'Récurences ajoutée !' : 'Une erreur c\'est produite');
		recurrence.newItem = 'newItem';
		socket.emit('recurrences', [ recurrence ]);
		socket.emit('info', {message: message});
	});
};

exports.getAll = getAll;
exports.add = add;