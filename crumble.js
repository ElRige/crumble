const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');

/**
 * Create database if not exist
 */
require('./dao/create_database')();

/**
 * Get Views route
 */
const settingsRoute = require('./routes/settingsRoute');

/**
 * Get Api route
 */
const authApiRoutes = require('./routes/api/authRoutes');
const usersApiRoutes = require('./routes/api/usersRoutes');
const goalsApiRoutes = require('./routes/api/goalsRoutes');
const operationsApiRoutes = require('./routes/api/operationsRoutes');

const port = 8888;
const app = express();

/**
 * Init view and template
 */
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
//app.use(express.static(path.join(__dirname, 'public')));

app.use(express.static('public'));

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
    saveUninitialized: false,
};
app.use(session(sess));

/** 
 * Views routes
 */
app.get('/', function (req, res) {
    res.redirect(303, '/operations');
});
app.get('/login', function (req, res) {
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
app.get('/mdl', function (req, res) {
    res.render('mdl.ejs');
});

/** 
 * Rest API routes
 * auth : authentification
 * users : Access to users
 * users : Access to goals
 * operations : Access to oprations
 */
let apiSession = (req, res, next) => {
    if (req.session.token == undefined || req.get('token') == undefined
        || req.session.token != req.get('token')) {
        res.status(401).send({ error: 'Unauthorized' });
        return;
    }
    next();
};
app.use('/api/auth', authApiRoutes);
app.use('/api/users', apiSession, usersApiRoutes);
app.use('/api/goals', apiSession, goalsApiRoutes);
app.use('/api/operations', apiSession, operationsApiRoutes);

/**
 * Error Handler
 */
app.use(function (err, req, res, next) {
    console.error(err);

    if (res.headersSent) {
        console.error('res.headersSent already sent to the client => use Express default error handling');
        return next(err);
    }

    res.status(500).send({ error: err });
});

/**
 * 404 Not Found
 */
app.use(function (req, res) {
    res.setHeader('Content-Type', 'text/plain');
    res.status(404).send('404 Not Found, Page introuvable !');
});

app.listen(port, function () {
    console.info('Server Started on Port ' + port);
});