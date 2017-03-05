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

const operationModel = require('../models/operation');
const operationDao = require('../dao/operationDao');

module.exports = {
	add: (userId, params, callback) => {
		let operation = new operationModel.Operation(userId, params.label, params.category, params.date, params.amount);
		operationDao.insert(operation, (err) => {
			let operationDto = operationModel.map.toDto(operation);
			callback(err, operation);
		});
	},
	getBetweenDate: (userId, params, callback) => {
		operationDao.selectBetweenDateByUserId(userId, params.startDate, params.endDate, (err, operations) => {
			let operationDtos = operationModel.map.toDtos(operations);
			callback(err, operationDtos);
		});
	},
	get: (userId, params, callback) => {
		isAuthorized(userId, params.uuid, (err, operation) => {
			let operationDto = operation.map.toDto(operation);
			callback(err, operationDto);
		});
	},
	update: (userId, params, query, callback) => {
		isAuthorized(userId, params.uuid, (err, operation) => {
			if (err) {
				callback(err);
				return;
			}
			operation.date = query.date;
			operation.label = query.label;
			operation.amount = query.amount;
			operation.category = query.category;
			operationDao.update(operation, (err) => {
				let operationDto = operation.mapToDto(operation);
				callback(err, operationDto);
			});
		});
	},
	delete: (userId, params, callback) => {
		isAuthorized(userId, params.uuid, (err, operation) => {
			if (err) {
				callback(err);
				return;
			}
			operationDao.delete(operation, (err) => {
				callback(err);
			});
		});
	}
}

let isAuthorized = (userId, uuid, callback) => {

	operationDao.selectByUuid(uuid, (err, operation) => {
		if (err) {
			callback(err);
			return;
		}
		if (userId !== operation.userId) {
			err = { error: 'UNAUTHORIZED' };
		}
		callback(err, operation);
	});
};