const express = require("express");

const postController = require("../controller/postController");
const userController = require("../controller/userController");

const router = express.Router();

const upload = require("../utils/imageHandler");

router
  .route("/")
  .get(postController.getAll)
  .post(
    userController.singToken,
    upload.single("imagen"),
    postController.validaImagen,
    postController.create
  );

router
  .route("/:id")
  .get(postController.getByID)
  .patch(userController.singToken,postController.update)
  .delete(userController.singToken,userController.authAdmin, postController.delete);

module.exports = router;
