'use strict';

let express = require('express');
let router = express.Router();

let gameHandler = require('../handlers/game.handler');

/** POST start game */
router.post('/start', gameHandler.startGame);

/** POST pull trigger */
router.post('/pull', gameHandler.pullTrigger);

/** POST pass gun */
router.post('/pass', gameHandler.passTurn);

module.exports = router;