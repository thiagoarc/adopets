'use strict';
const User = require("../models/user");
require('dotenv').config();
const jwt = require('jsonwebtoken');

const express = require('express');
const app = express();

const Logger = require('../logs/helper-log');
const logger = new Logger('app');


exports.login = (req, res, next) => {
    if (!req.body.email || !req.body.password) {
      res.status(400).send({
        message: "User or Pass not be empty!"
      });
      logger.error("User or Pass not be empty!");
    }
  
    // Create a User
    const user = new User({
      email: req.body.email,
      password: req.body.password
    });
  
    User.login(user, (err, data) => {
      if (err){
        res.status(500).send({
          message:
            err.message || "There was an error while trying to login"
        });
        logger.error(err.message || "There was an error while trying to login");
      }else{
        console.log("User: "+user.email);
        console.log("Pass: "+user.password);
        const userId = user.id;
        jwt.sign({userId}, process.env.SECRET, {expiresIn: 30}, (err, token) => {
          res.send({ message: "Login successfully!", auth: true, token: token});
          logger.info("Login successfully!", user);
        });
      } 
    });
  
  };
  
  exports.check = (req, res, next) => {
  
    const token = req.headers['access-token'];
   
    if (!token){
      res.status(401);
      res.send({
        auth: false,
        message: 'Token is blank! Please login to the system.'
      });
      logger.error('Token is blank! Please login to the system.');
    }
   
    jwt.verify(token, process.env.SECRET, (err, decoded) => {
     
      if (err){
        res.status(500);
        res.send({
          auth: false,
          message: 'Authentication failure'
        });
        logger.error('Authentication failure');
      } else {
        next();
      }
    });
  };
  
  exports.logoff = (req, res) => {
    res.status(200);
    res.send({
      auth: false,
      token: null
    });
    logger.info("Logoff successfully!");
  }