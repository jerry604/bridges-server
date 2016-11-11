'use strict';

let gameController = require('../application/controllers/game.controller');
let roomController = require('../application/controllers/room.controller');
let userController = require('../application/controllers/user.controller');

let io = require('socket.io')();
let listener = io.listen(server);

exports.joinRoom = (req, res) => {
    /// todo: expect roomid or userid
};

///
listener.sockets.on('connection', socket => {
  socket.on('join_message', data => {
    console.log("User has joined room", data);
    roomController.getRoom(data, room => {
      console.log(room);
      io.sockets.emit('join_message', room);
    });
  });

  socket.on('start_game', data => {
    console.log('User has started game', data);
    io.sockets.emit('start_game', data);
  });

  socket.on('pass_gun', data => {
    console.log('The gun has been passed by user', data);
    io.sockets.emit('pass_gun', data);
  });

  socket.on('lose_message', data => {
    console.log("User has lost", data);
    io.sockets.emit('lose_message', data);
  });
});