'use strict';

let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let gameSchema = new Schema({

    numBarrels: Number,

    targetNumber: Number,

    roomId : {
        type: Schema.Types.ObjectId,
        ref: 'rooms'
    },

    playerTurn: {
        type: Schema.Types.ObjectId,
        ref: 'users'
    },
    
    players: [
        {
            type: Schema.Types.ObjectId,
            ref: 'users'
        }
    ]
});

var Games = mongoose.model('games', gameSchema);

module.exports = Games;