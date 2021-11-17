const express = require("express");

const categoryController = require("../controller/categoryController");

const router = express.Router();

router
  .route("/")
  .get(categoryController.get)
  .post(categoryController.create);

module.exports = router;
