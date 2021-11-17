const express = require("express");

const categoryController = require("../controller/categoryController");

const router = express.Router();

router
  .route("/")
  .get(categoryController.getAll)
  .post(categoryController.create);

module.exports = router;
