const express = require('express');
const userService = require('./service/userService');
const operationService = require('./service/operationService');
const recurrenceService = require('./service/recurrenceService');
const settingsRoute = require('./route/settingsRoute');

var http = require('http');
var logger = require('morgan');
var bodyParser = require('body-parser');
var SuperLogin = require('superlogin');

const app = express();

app.set('view engine', 'ejs');
app.use(express.static('views'));
app.use('/static', express.static('public'));


app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

var config = {
	dbServer: {
		protocol: 'http://',
		host: 'localhost:5984',
		user: 'admin',
		password: 'passw0rd',
		userDB: 'sl-users',
		couchAuthDB: '_users'
	},
	local: {
		emailUsername: true
	},
	userDBs: {
		defaultDBs: {
			private: ['crumble']
		}
	}
}
var superlogin = new SuperLogin(config);
// Mount SuperLogin's routes to our app 
app.use('/auth', superlogin.router);



app.get('/', function(req, res) {
	res.redirect(303, '/operations');
});
app.get('/login', function(req, res) {
	res.render('login.ejs');
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

	socket.on('recurrence_add', function(recurrence) {
		recurrenceService.add(socket, recurrence);
	});
});