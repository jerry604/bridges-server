'use strict';

let userController = require('../controllers/user.controller');

exports.getAllUsers = (req, res) => {
    userController.getAllUsers().then( 
        users => {
            res.io.emit('HELLO', 'users');
            res.status(200).json(users);
        }, 
        err => {
            res.status(400).json(err);
        }
    );
};

exports.createUser = (req, res) => {
    if (typeof req.body.name === 'undefined') {
        res.status(400).json('name undefined');
    }

    userController.createUser(req.body.name).then(
        user => {
            res.status(200).json(user);
        },
        err => {
            res.status(400).json(err);
        }
    );
};