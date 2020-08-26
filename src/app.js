 'use strict';

const express = require('express');
const bodyParser = require('body-parser');




const app = express();
const router = express.Router();




const indexRoute = require('./routes/index-route');
const productRoute = require('./routes/product-route');
const userRoute = require('./routes/user-route');
const apiRoute = require('./routes/api-route');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));





app.use('/', indexRoute);
app.use('/products', productRoute);
app.use('/user', userRoute);
app.use('/user', apiRoute);

module.exports = app;