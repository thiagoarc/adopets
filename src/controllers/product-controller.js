'use strict';
const Product = require("../models/product");

exports.get = (req, res, next) => {
  Product.getAll((err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving products."
        });
        else res.send(data);
    });
};

exports.getPagination = (req, res, next) => {
  Product.getPagination(req.params.page, (err, data) => {
    if (err)
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving products."
        });
        else res.send(data);
  });
};

exports.getByName = (req, res, next) => {
    Product.findByName(req.params.name, (err, data) => {
        if (err)
          res.status(500).send({
            message:
              err.message || "Some error occurred while retrieving products."
          });
        else res.send(data);
      });
};

exports.getByNamePagination = (req, res, next) => {
  Product.findByNamePagination(req.params, (err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving products."
        });
      else res.send(data);
    });
};

exports.getByDescription = (req, res, next) => {
    Product.findByDescription(req.params.description, (err, data) => {
        if (err)
          res.status(500).send({
            message:
              err.message || "Some error occurred while retrieving products."
          });
        else res.send(data);
      });
};

exports.getByDescriptionPagination = (req, res, next) => {
  Product.findByDescriptionPagination(req.params, (err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving products."
        });
      else res.send(data);
    });
};

exports.getByCategory = (req, res, next) => {
    Product.findByCategory(req.params.category, (err, data) => {
        if (err)
          res.status(500).send({
            message:
              err.message || "Some error occurred while retrieving products."
          });
        else res.send(data);
      });
};

exports.getByCategoryPagination = (req, res, next) => {
  Product.findByCategoryPagination(req.params, (err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving products."
        });
      else res.send(data);
    });
};

exports.post = (req, res, next) => {
	// Validate request
    if (!req.body) {
        res.status(400).send({
          message: "Content can not be empty!"
        });
    }
    // Create a Product
    const product = new Product({
        name: req.body.name,
        description: req.body.description,
        category: req.body.category,
        price: req.body.price,
        stock: req.body.stock
    });

    // Save Product in the database
    Product.create(product, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Product."
      });
    else res.send(data);
  });

};

exports.put = (req, res, next) => {
	const id = req.params.id;
	// Validate Request
    if (!req.body) {
        res.status(400).send({
          message: "Content can not be empty!"
        });
    }
    Product.updateById(
        req.params.id,
        new Product(req.body),
        (err, data) => {
          if (err) {
            if (err.kind === "not_found") {
              res.status(404).send({
                message: "Not found Product with id ${req.params.id}."
              });
            } else {
              res.status(500).send({
                message: "Error updating Product with id " + req.params.id
              });
            }
          } else res.send(data);
        }
      );
};

exports.delete =  (req, res, next) => {
	Product.remove(req.params.id, (err, data) => {
        if (err) {
          if (err.kind === "not_found") {
            res.status(404).send({
              message: "Not found Product with id " + req.params.id
            });
          } else {
            res.status(500).send({
              message: "Could not delete Product with id " + req.params.id
            });
          }
        } else res.send({ message: "Product was deleted successfully!"});
      });
};
