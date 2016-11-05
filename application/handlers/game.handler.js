'use strict';

let gameController = require('../controllers/game.controller');

exports.startGame = (req, res) => {
    if (typeof req.body.roomId === 'undefined') {
        res.status(400).json('room id undefined');
    }

    gameController.startGame(req.body.roomId).then( 
        game => {
            res.status(200).json(game);
        },
        err => {
            res.status(400).json(err);
        }
    );
};

exports.pullTrigger = (req, res) => {
    if (typeof req.body.gameId === 'undefined') {
        res.status(400).json('game id undefined');
    }

    gameController.pullTrigger(req.body.gameId).then(
        result => {
            res.status(200).json(result);
        },
        err => {
            res.status(400).json(err);
        }
    );
};

exports.passTurn = (req, res) => {
    if (typeof req.body.gameId === 'undefined') {
        res.status(400).json('game id undefined');
    }

    gameController.passTurn(req.body.gameId).then(
        result => {
            res.status(200).json(result);
        },
        err => {
            res.status(400).json(err);
        }
    );
};