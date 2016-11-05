'use strict';

let express = require('express');
let router = express.Router();

let userHandler = require('../handlers/user.handler');

/* GET users listing. */
router.get('/', userHandler.getAllUsers);

/* POST create user */
router.post('/create', userHandler.createUser);

module.exports = router;
