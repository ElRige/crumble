const express = require('express');
const userService = require('./service/userService');
const operationService = require('./service/operationService');

const app = express();

app.set('view engine', 'ejs');
app.use(express.static('views'));
app.use(express.static('public'));

app.get('/operations', function(req, res) {
	res.render('operations.ejs');
});
app.get('/test', function(req, res) {
	res.render('test.ejs');
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
		userService.getCategories(socket);
	});

	socket.on('operations_get', function(data) {
		operationService.getAll(socket, data);
	});

	socket.on('operation_add', function(operation) {
		operationService.add(socket, operation);
	});
});