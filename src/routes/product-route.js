'use strict';

const express = require('express');
const router = express.Router();

const controller = require('../controllers/product-controller');
const apiController = require('../controllers/api-controller');

/*router.get('/', apiController.check, controller.get);
router.get('/name/:name', apiController.check, controller.getByName);
router.get('/description/:description', apiController.check, controller.getByDescription);
router.get('/category/:category', apiController.check, controller.getByCategory);

router.post('/', apiController.check, controller.post); 

router.put('/:id', apiController.check, controller.put); 

router.delete('/:id', apiController.check, controller.delete); */

router.get('/', controller.get);
router.get('/:page', controller.getPagination);
router.get('/name/:name', controller.getByName);
router.get('/name/:name/:page', controller.getByNamePagination);
router.get('/description/:description', controller.getByDescription);
router.get('/category/:category', controller.getByCategory);

router.post('/', controller.post); 

router.put('/:id', controller.put); 

router.delete('/:id', controller.delete); 


module.exports = router;