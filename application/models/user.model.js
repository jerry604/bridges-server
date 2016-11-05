'use strict';

let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let userSchema = new Schema({
    name: String    
});

var Users = mongoose.model('users', userSchema);

module.exports = Users;