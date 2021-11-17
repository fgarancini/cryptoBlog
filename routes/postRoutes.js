const express = require("express");

const postController = require("../controller/postController");

const router = express.Router();

const upload = require("../utils/imageHandler");

router
  .route("/")
  .get(postController.getAll)
  .post(upload.single("imagen"), postController.validaImagen,postController.create);

router
  .route("/:id")
  .get(postController.getByID)
  .patch(postController.update)
  .delete(postController.delete);

module.exports = router;
