const mysqlConnection = require('../config/database');
const md5 = require("md5");

const express = require('express');
const app = express();

const Logger = require('../logs/helper-log');
const logger = new Logger('app');

// constructor
const User = function(user) {
    this.id = user.id;
    this.name = user.name;
    this.email = user.email;
    this.password = user.password;
  };

  User.create = (newUser, result) => {
    mysqlConnection.query("INSERT INTO user SET ?", newUser, (err, res) => {
      if (err) {
        console.log("error: ", err);
        logger.error(err.message);
        result(err, null);
        return;
      }
  
      console.log("created User: ", { id: res.insertId, ...newUser });
      logger.info("created User", newUser);
      result(null, { id: res.insertId, ...newUser });
    });
  };

  User.login = (user, result) => {
    //console.log(user);
    mysqlConnection.query("SELECT * FROM user WHERE email = ?",[user.email] ,(err, res) => {
      if (err) {
        console.log("error: ", err);
        logger.error(err.message);
        result(err, null);
        return;
      }

      //console.log("Pass BD: "+res[0].password);
      //console.log("Pass DIG: "+md5(user.password+global.SALT));
  
      if (res.length>0) {
        console.log("found user: ", res);
        if(res[0].password == md5(user.password+global.SALT)){
          result(null, res);
          return;
        }else{
          console.log("error login: ", err);
          logger.error("Error logging in");
          result(err, null);
          return;
        }
      }else{
        console.log("error login: ", err);
        logger.error(err.message);
        result(err, null);
        return;
      }
  
      // not found product with the id
      result({ kind: "not_found" }, null);
    });
    
    
  };

  module.exports = User;