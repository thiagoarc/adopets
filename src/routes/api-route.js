'use strict';

const express = require('express');
const router = express.Router();
const apiController = require('../controllers/api-controller');

router.post('/login', apiController.login);
router.get('/logoff', apiController.logoff);

module.exports = router;