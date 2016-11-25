const express = require('express');
const userService = require('./service/userService');
const operationService = require('./service/operationService');
const settingsRoute = require('./route/settingsRoute');

const app = express();

app.set('view engine', 'ejs');
app.use(express.static('views'));
app.use('/static', express.static('public'));

app.get('/', function(req, res) {
	res.redirect(303, '/operations');
});
app.get('/operations', function(req, res) {
	res.render('operations.ejs');
});
app.get('/goals', function(req, res) {
	res.render('goals.ejs');
});
app.use('/settings', settingsRoute);
app.get('/test', function(req, res) {
	res.render('test.ejs');
});

app.use(function(req, res, next){
	res.setHeader('Content-Type', 'text/plain');
	res.status(404).send('Page introuvable !');
});

const port = 8888;
const io = require('socket.io').listen(app.listen(port, function() {
	console.log('Server Started on Port ' + port);
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