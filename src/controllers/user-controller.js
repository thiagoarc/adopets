'use strict';
const User = require("../models/user");


exports.post = (req, res, next) => {
	// Validate request
    if (!req.body) {
        res.status(400).send({
          message: "Content can not be empty!"
        });
    }
    // Create a User
    const user = new User({
        name: req.body.name,
        email: req.body.email,
        password: md5(req.body.password+global.SALT)
    });

    // Save Product in the database
    User.create(user, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the User."
      });
    else res.send(data);
  });

};
