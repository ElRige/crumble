const requestLauncher = require('../dao/requestLauncher');

var getAll = function(socket, data) {
	requestLauncher.getOperations(data, function(operations) {
		socket.emit('operations', operations);
	});
};

var add = function(socket, operation) { 
	operation.amount = operation.amount * 100;

	requestLauncher.saveOperation(operation, function(status) {
		var message = (status === 201 ? 'Opération ajoutée !' : 'Une erreur c\'est produite');
		operation.newItem = 'newItem';
		socket.emit('operations', [ operation ]);
		socket.emit('info', {message: message});
	});
};

exports.getAll = getAll;
exports.add = add;