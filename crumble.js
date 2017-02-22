const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');


// TODO delete services when no more call on io
const userService = require('./service/userService');
const operationService = require('./service/operationService');
const recurrenceService = require('./service/recurrenceService');

const settingsRoute = require('./routes/settingsRoute');

const authApiRoutes = require('./routes/api/authRoutes');
const usersApiRoutes = require('./routes/api/usersRoutes');
const goalsApiRoutes = require('./routes/api/goalsRoutes');
const operationsApiRoutes = require('./routes/api/operationsRoutes');

const knex = require('./dao/create_database')();

const port = 8888;
const app = express();

/**
 * Init view and template
 */
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
//app.use(express.static(path.join(__dirname, 'public')));

app.use(express.static('public'))

/**
 * Init bodyParser for json restapi
 */
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

/**
 * Init CORS
 */
const allowCrossDomain = function (req, res, next) {
	res.header('Access-Control-Allow-Origin', '*');
	res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
	res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
	next();
};
app.use(allowCrossDomain);

/**
 * Init session
 */
const sess = {
	secret: 'crumble is 50 delicious',
	resave: false,
	saveUninitialized: false
};
app.use(session(sess));

/** 
 * Views routes
 */
app.get('/', function (req, res) {
	res.redirect(303, '/operations');
});
app.get('/login', function (req, res) {
	console.log(req.session);
	res.render('login.ejs');
});
app.get('/operations', function (req, res) {
	res.render('operations.ejs');
});
app.get('/goals', function (req, res) {
	res.render('goals.ejs');
});
app.use('/settings', settingsRoute);
app.get('/test', function (req, res) {
	res.render('test.ejs');
});

/** 
 * Rest API routes
 * auth : authentification
 * users : Access to users
 * users : Access to goals
 * operations : Access to oprations
 */
app.use('/api/auth', authApiRoutes);
app.use('/api/users', usersApiRoutes);
app.use('/api/goals', goalsApiRoutes);
app.use('/api/operations', operationsApiRoutes);

/**
 * Error Handler
 */
app.use(function (err, req, res, next) {
	console.dir(err);

	if (res.headersSent) {
		console.error('res.headersSent already sent to the client => use Express default error handling');
		return next(err);
	}

	res.status(500).send({ error: err });
});

/**
 * 404 Not Found
 */
app.use(function (req, res, next) {
	res.setHeader('Content-Type', 'text/plain');
	res.status(404).send('Page introuvable !');
});

app.listen(port, function () {
	console.log('Server Started on Port ' + port);
});

/**
 * web socket with socket io
 */
/*
io.sockets.on('connection', function (socket) {

	socket.on('categories_get', function () {
		userService.getCategories(socket);
	});

	socket.on('operations_get', function (data) {
		operationService.getAll(socket, data);
	});

	socket.on('operation_add', function (operation) {
		operationService.add(socket, operation);
	});

	socket.on('recurrence_add', function (recurrence) {
		recurrenceService.add(socket, recurrence);
	});
});
*/