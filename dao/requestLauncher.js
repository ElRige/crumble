const NodeCouchDb = require('node-couchdb');
const couch = new NodeCouchDb({
	auth: {
		user: 'admin',
		pass: 'passw0rd'
	}
});
const dbName = 'crumble';

var getCategories = function(callback) {
	const viewUrl = '_design/enum/_view/categories';
	couch.get(dbName,viewUrl, {}).then(({data, headers, status}) => {
		if (status !== 200) {
			console.log(status);
			console.log(data);
		}
		callback(data.rows[0].value);
	}, err => {
		console.log('getCategories ERROR');
		console.log(err);
	});
}

var getOperations = function(data, callback) {

	const viewUrl = '_design/operations/_view/date';
	const queryOptions = {
		startkey: data.startDate,
		endkey: data.endDate
	};
	couch.get(dbName,viewUrl, queryOptions).then(({data, headers, status}) => {
		if (status !== 200) {
			console.log(status);
			console.log(data);
		}
		var operations = new Array();
		for (i in data.rows) {
			data.rows[i].value.newItem = '';
			operations.push(data.rows[i].value);
		}
		callback(operations);
	}, err => {
		console.log('getOperation ERROR');
		console.log(err);
	});
}

var saveOperation = function(operation, callback) {

	couch.insert(dbName, {
		_id: function() { return couch.uniqid(); },
		field: operation
	}).then(({data, headers, status}) => {
		if (status !== 201) {
			console.log(status);
			console.log(data);
		}
		callback(status);
	}, err => {
		console.log('saveOperation ERROR');
		console.log(err);
	});
}

exports.getCategories = getCategories;
exports.getOperations = getOperations;
exports.saveOperation = saveOperation;