'use strict';

let util = require('../utilities/utilities');

let Game = require('mongoose').model('games');
let Room = require('mongoose').model('rooms');
let User = require('mongoose').model('users');

let NUM_BARRELS = 7; // 0 - 7 INCLUSIVE

exports.startGame = roomId => {
    return new Promise((resolve, reject) => {
        Room.findOne({ _id: roomId }).exec().then( room => {
            let game = new Game();
            game.numBarrels = NUM_BARRELS;
            game.targetNumber = util.generateRandomNumber(NUM_BARRELS);
            game.roomId = roomId;
            game.players = room.players;
            game.playerTurn = game.players[util.generateRandomNumber(room.players.length - 1)];
            game.save().then( g => {
                if (!g) {
                    return reject();
                } else {
                    /// HANDLE START GAME EVENT
                    return resolve(g);
                }
            });
        });
    });
};

function decrementBarrels(numBarrels) {
    return --numBarrels;
};

exports.pullTrigger = gameId => {
    return new Promise((resolve, reject) => {
        Game.findOne({ _id: gameId }).exec().then( game => {
            let numBarrels = game.numBarrels;
            let targetNum = game.targetNumber;
            let isShot = targetNum === util.generateRandomNumber(numBarrels);

            if (isShot) {
                /// HANDLE END OF GAME EVENT
                return resolve({
                    playerId: game.playerTurn,
                    playerShot: true
                });
            } else {
                game.numBarrels = decrementBarrels(numBarrels);
                game.targetNumber = util.generateRandomNumber(game.numBarrels);
                game.save().then( g => {
                    if (!g) {
                        return reject();
                    } else {
                        return resolve({
                            playerShot: false
                        });
                    }
                });
            }
        });
    });
};

exports.passTurn = gameId => {
    return new Promise ((resolve, reject) => {
        Game.findOne({ _id: gameId }).exec().then( game => {
            let playerIndex = game.players.indexOf(game.playerTurn);
            game.playerTurn = playerIndex === 0 ? game.players[1] : game.players[0];
            game.save().then( g => {
                if (!g) {
                    return reject();
                } else {
                    /// HANDLE PASS TURN EVENT
                    return resolve(g);
                }
            });
        });
    });
};