'use strict';

const express = require('express');
const router = express.Router();

const controller = require('../controllers/user-controller');
const apiController = require('../controllers/api-controller');

router.post('/', apiController.check, controller.post); 

module.exports = router;