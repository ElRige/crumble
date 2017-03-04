//const requestLauncher = require('../daoOld/requestLauncher');
/*
var getAll = function(socket, data) {
	/*requestLauncher.getOperations(data, function(operations) {
		socket.emit('operations', operations);
	});*/
//};
/*
let add = function(socket, operation) { 
	operation.amount = operation.amount * 100;

	/*requestLauncher.insert(operation, function(status) {
		var message = (status === 201 ? 'Opération ajoutée !' : 'Une erreur c\'est produite');
		operation.newItem = 'newItem';
		socket.emit('operations', [ operation ]);
		socket.emit('info', {message: message});
	});*/
//};
/*
exports.getAll = getAll;
exports.add = add;*/

const Operation = require('../models/Operation');
const operationDao = require('../dao/operationDao');

module.exports = {
	add: (userId, params, callback) => {
		let operation = new Operation(userId, params.label, params.category, params.date, params.amount);
		operationDao.insert(operation, (id) => {
			operation.id = id;
			callback(operation);
		});
	},
	getAll: (userId, params, callback) => {
		operationDao.selectByUserId(userId, params.startDate, params.endDate, (err, operations) => {
			callback(err, operations);
		});
	}
}