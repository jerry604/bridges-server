'use strict';

let Room = require('mongoose').model('rooms');
let User = require('mongoose').model('users');

let util = require('../utilities/utilities');

exports.getAllRooms = function () {
    return new Promise ((resolve, reject) => {
        Room.find().exec().then( rooms => {
            if (!rooms) {
                return reject();
            } else {
                return resolve(rooms);
            }
        });
    });
};

exports.createRoom = function (userId) {
    return new Promise ((resolve, reject) => {
        let room = new Room();
        room.name = util.generateRoomName(4, '#A');
        room.players.push(userId);
        room.save().then( r => {
            if (!r) {
                return reject();
            } else {
                return resolve(r);
            }
        });
    });
};

exports.joinRoom = function (userId, roomName) {
    return new Promise ((resolve, reject) => {
        Room.findOne({name: roomName}).exec().then((room) => {
            room.players.push(userId);
            room.save().then( r => {
                if (!r) {
                    return reject();
                } else {
                    return resolve(r);
                }
            })
        });
    });
};

/**
 * stuff
 */

exports.getRoom = function (data, cb) {
    Room.findOne({_id: data}, room => {
        cb(room);
    });
};