var express = require('express'),
    router = express.Router(),
    logger = require('../../config/logger');

module.exports = function (app, config) {
    app.use('/api', router);

    router.route('/users').get(function(req, res, next){
        logger.log('Get all users', 'verbose');
        res.status(200).json({'message': 'Got all users'});
    });

    router.get('/users/:id', function(req, res, next){
        logger.log('info','Get user %s', req.params.id);
    
        res.status(200).json({id: req.params.id});
    });
    router.route('/login').post(function (req, res, next) {
        console.log(req.body);
        var email = req.body.email
        var password = req.body.password;
        var obj = { 'email': email, 'password': password };
        res.status(201).json(obj);
    });
};