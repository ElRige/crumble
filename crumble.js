const express = require('express');
const app = express();
const requestLauncher = require('./requestLauncher');

app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(express.static('views'));


app.get('/operations', function(req, res) {
	res.render('operations.ejs', {test: 'test'});
});

app.use(function(req, res, next){
	res.setHeader('Content-Type', 'text/plain');
	res.status(404).send('Page introuvable !');
});

const io = require('socket.io').listen(app.listen(8888, function() {
	console.log('Server Started on Port 8888');
}));

io.sockets.on('connection', function(socket) {

	socket.on('categories_get', function() {
		var operations = requestLauncher.getCategories(function(categories) {
			socket.emit('categories', categories);
		});
	});

	socket.on('operations_get', function(data) {
		var operations = requestLauncher.getOperations(data, function(operations) {
			socket.emit('operations', operations);
		});
	});

	socket.on('operation_add', function(operation) {
		operation.amount = operation.amount * 100;
		requestLauncher.saveOperation(operation, function(status) {
			var message = (status === 201 ? 'Opération ajoutée !' : 'Une erreur c\'est produite');
			operation.newItem = 'newItem';
			socket.emit('operations', [ operation ]);
			socket.emit('info', {message: message});
		});
	});

});