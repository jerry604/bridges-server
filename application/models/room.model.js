'use strict';

let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let roomSchema = new Schema({
    name: String,
    players: [
        {
            type: Schema.Types.ObjectId,
            ref: 'users'
        }
    ] 
});

var Rooms = mongoose.model('rooms', roomSchema);

module.exports = Rooms;