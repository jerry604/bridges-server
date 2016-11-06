'use strict';

let Room = require('mongoose').model('rooms');
let User = require('mongoose').model('users');

let util = require('../utilities/utilities');

exports.getAllUsers = function () {
    return new Promise ((resolve, reject) => {
        User.find().exec().then( users => {
            if (!users) {
                return reject();
            } else {
                return resolve(users);
            }
        });
    });
};

exports.createUser = function (name) {
    return new Promise ((resolve, reject) => {
        let user = new User();
        user.name = name;
        user.save().then( u => {
            if (!u) {
                return reject();
            } else {
                return resolve(u);
            }
        });
    });
};

/**
 * stuff
 */

exports.getUser = function (data) {
    User.find({_id: data}, user => {
        return user;
    });
};