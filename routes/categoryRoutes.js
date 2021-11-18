const express = require("express");

const categoryController = require("../controller/categoryController");
const userController = require("../controller/userController");
const router = express.Router();

router
  .route("/")
  .get(categoryController.getAll)
  .post(userController.singToken,categoryController.create);

router.route("/:id").get(categoryController.getByID);

module.exports = router;
