var express = require('express');
var mongoose = require('mongoose');
var bluebird = require('bluebird');
var bodyParser = require('body-parser');
var morgan = require('morgan');
var glob = require('glob');
var logger = require('./logger');

module.exports = function (app, config) {

    logger.log('info', "Loading Mongoose functionality");
    mongoose.Promise = bluebird;
    mongoose.connect(config.db);
    var db = mongoose.connection;
    db.on('error', function () {
        throw new Error('unable to connect to database at ' + config.db);
    });

    if (process.env.NODE_ENV !== 'test') {
        app.use(morgan('dev'));

        mongoose.set('debug', true);
        mongoose.connection.once('open', function callback() {
            logger.log('info', 'Mongoose connected to the database');
        });

        app.use(function (req, res, next) {
            logger.log('Request from ' + req.connection.remoteAddress, 'info');
            next();
        });
    }

    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({
        extended: true
    }));
    app.use(express.static(config.root + '/public'));
    
    var models = glob.sync(config.root + '/app/models/*.js');
    models.forEach(function (model) {
        require(model);
    });

    var controllers = glob.sync(config.root + '/app/controllers/*.js');
    controllers.forEach(function (controller) {
        require(controller)(app, config);
    });



    var users = [{ name: 'John', email: 'woo@hoo.com' },
    { name: 'Betty', email: 'loo@woo.com' },
    { name: 'Hal', email: 'boo@woo.com' }
    ];
    app.get('/api/users', function (req, res) {
        res.status(200).json(users);
    });

    require('../app/controllers/users.js')(app, config);
    app.use(function (req, res) {
        logger.log('error', 'File not Found');
        res.type('text/plan');
        res.status(404);
        res.send('404 Not Found');
    });

    app.use(function (err, req, res, next) {
        console.error(err.stack);
        res.type('text/plan');
        res.status(500);
        res.send('500 Sever Error');
    });

    logger.log('info', 'Starting application');
};