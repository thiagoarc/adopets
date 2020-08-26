const mysqlConnection = require('../config/database');

const express = require('express');
const app = express();

const Logger = require('../logs/helper-log');
const logger = new Logger('app');

// constructor
const Product = function(product) {
    this.id = product.id;
    this.name = product.name;
    this.description = product.description;
    this.category = product.category;
    this.price = product.price;
    this.stock = product.stock;
  };

  Product.getPagination = (page, result) => {
    var recordByPage = 5;
    var offset = 0;
    if(page == 1){
      offset = 0;
    }else{
      offset = (page - 1) * recordByPage;
    }
    mysqlConnection.query("SELECT * FROM product LIMIT ? OFFSET ?", [recordByPage, offset], (err, res) => {
      if (err) {
        console.log("error: ", err);
        logger.error(err.message);
        result(null, err);
        return;
      }
  
      console.log("products: ", res);
      logger.info("List products with pagination", res);
      result(null, res);
    });
  };

  Product.getAll = result => {
    mysqlConnection.query("SELECT * FROM product", (err, res) => {
      if (err) {
        console.log("error: ", err);
        logger.error(err.message);
        result(null, err);
        return;
      }
  
      console.log("products: ", res);
      logger.info("List products", res);
      result(null, res);
    });
  };

  Product.create = (newProduct, result) => {
    mysqlConnection.query("INSERT INTO product SET ?", newProduct, (err, res) => {
      if (err) {
        console.log("error: ", err);
        logger.error(err.message);
        result(err, null);
        return;
      }
  
      console.log("created Product: ", { id: res.insertId, ...newProduct });
      logger.info("created product", newProduct);
      result(null, { id: res.insertId, ...newProduct });
    });
  };

  Product.findByName = (productName, result) => {
    mysqlConnection.query("SELECT * FROM product WHERE name LIKE CONCAT('%',?,'%')",[productName] ,(err, res) => {
      if (err) {
        console.log("error: ", err);
        logger.error(err.message);
        result(err, null);
        return;
      }
  
      if (res.length) {
        console.log("found product: ", res);
        logger.info("List products by name", res);
        result(null, res);
        return;
      }
  
      // not found product with the id
      result({ kind: "not_found" }, null);
    });
  };

  Product.findByNamePagination = (params, result) => {
    var recordByPage = 5;
    var offset = 0;
    if(params.page == 1){
      offset = 0;
    }else{
      offset = (params.page - 1) * recordByPage;
    }
    mysqlConnection.query("SELECT * FROM product WHERE name LIKE CONCAT('%',?,'%') LIMIT ? OFFSET ?",[params.name, recordByPage, offset] ,(err, res) => {
      if (err) {
        console.log("error: ", err);
        logger.error(err.message);
        result(err, null);
        return;
      }
  
      if (res.length) {
        console.log("found product: ", res);
        logger.info("List products by name with pagination", res);
        result(null, res);
        return;
      }
  
      // not found product with the id
      result({ kind: "not_found" }, null);
    });
  };

  Product.findByDescription = (productDescription, result) => {
    mysqlConnection.query("SELECT * FROM product WHERE description LIKE CONCAT('%',?,'%')",[productDescription] ,(err, res) => {
      if (err) {
        console.log("error: ", err);
        logger.error(err.message);
        result(err, null);
        return;
      }
  
      if (res.length) {
        console.log("found product: ", res);
        logger.info("List products by description", res);
        result(null, res);
        return;
      }
  
      // not found product with the id
      result({ kind: "not_found" }, null);
    });
  };

  Product.findByDescriptionPagination = (params, result) => {
    var recordByPage = 5;
    var offset = 0;
    if(params.page == 1){
      offset = 0;
    }else{
      offset = (params.page - 1) * recordByPage;
    }
    mysqlConnection.query("SELECT * FROM product WHERE description LIKE CONCAT('%',?,'%') LIMIT ? OFFSET ?",[params.description, recordByPage, offset] ,(err, res) => {
      if (err) {
        console.log("error: ", err);
        logger.error(err.message);
        result(err, null);
        return;
      }
  
      if (res.length) {
        console.log("found product: ", res);
        logger.info("List products by description with pagination", res);
        result(null, res);
        return;
      }
  
      // not found product with the id
      result({ kind: "not_found" }, null);
    });
  };

  Product.findByCategory = (productCategory, result) => {
    mysqlConnection.query("SELECT * FROM product WHERE category LIKE CONCAT('%',?,'%')",[productCategory] ,(err, res) => {
      if (err) {
        console.log("error: ", err);
        logger.error(err.message);
        result(err, null);
        return;
      }
  
      if (res.length) {
        console.log("found product: ", res);
        logger.info("List products by category", res);
        result(null, res);
        return;
      }
  
      // not found product with the id
      result({ kind: "not_found" }, null);
    });
  };

  Product.findByCategoryPagination = (params, result) => {
    var recordByPage = 5;
    var offset = 0;
    if(params.page == 1){
      offset = 0;
    }else{
      offset = (params.page - 1) * recordByPage;
    }
    mysqlConnection.query("SELECT * FROM product WHERE category LIKE CONCAT('%',?,'%') LIMIT ? OFFSET ?",[params.description, recordByPage, offset] ,(err, res) => {
      if (err) {
        console.log("error: ", err);
        logger.error(err.message);
        result(err, null);
        return;
      }
  
      if (res.length) {
        console.log("found product: ", res);
        logger.info("List products by category with pagination", res);
        result(null, res);
        return;
      }
  
      // not found product with the id
      result({ kind: "not_found" }, null);
    });
  };

  Product.updateById = (id, product, result) => {
    mysqlConnection.query(
      "UPDATE product SET name = ?, description = ?, category = ?, price = ?, stock = ? WHERE id = ?",
      [product.name, product.description, product.category, product.price, product.stock , id],
      (err, res) => {
        if (err) {
          console.log("error: ", err);
          logger.error(err.message);
          result(null, err);
          return;
        }
  
        if (res.affectedRows == 0) {
          // not found Customer with the id
          result({ kind: "not_found" }, null);
          return;
        }
  
        console.log("updated product: ", { id: id, ...product });
        logger.info("updated product", product);
        result(null, { id: id, ...product });
      }
    );
  };

  Product.remove = (id, result) => {
    mysqlConnection.query("DELETE FROM product WHERE id = ?", id, (err, res) => {
      if (err) {
        console.log("error: ", err);
        logger.error(err.message, err);
        result(null, err);
        return;
      }
  
      if (res.affectedRows == 0) {
        // not found product with the id
        result({ kind: "not_found" }, null);
        return;
      }
  
      console.log("deleted product with id: ", id);
      logger.info("deleted product", id);
      result(null, res);
    });
  };

  module.exports = Product;