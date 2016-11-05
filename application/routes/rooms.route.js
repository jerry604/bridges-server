'use strict';

let express = require('express');
let router = express.Router();

let roomHandler = require('../handlers/room.handler');

/* GET rooms listing. */
router.get('/', roomHandler.getAllRooms);

/* POST create room */
router.post('/create', roomHandler.createRoom);

/* PUT join room */
router.put('/join', roomHandler.joinRoom);

module.exports = router;
