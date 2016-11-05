'use strict';

let roomController = require('../controllers/room.controller');

exports.getAllRooms = (req, res) => {
    roomController.getAllRooms().then( 
        rooms => {
            res.status(200).json(rooms);
        }, 
        err => {
            res.status(400).json(err);
        }
    );
};

exports.createRoom = (req, res) => {
    if (typeof req.body.userId === 'undefined') {
        res.status(400).json('user id undefined');
    }

    roomController.createRoom(req.body.userId).then(
        room => {
            res.status(200).json(room);
        },
        err => {
            res.status(400).json(err);
        }
    );
};

exports.joinRoom = (req, res) => {
    if (typeof req.body.userId === 'undefined') {
        res.status(400).json('user id undefined');
    }

    if (typeof req.body.roomName === 'undefined') {
        res.status(400).json('room name undefined');
    }

    roomController.joinRoom(req.body.userId, req.body.roomName).then(
        room => {
            res.status(200).json(room);
        },
        err => {
            res.status(400).json(err);
        }
    );
};