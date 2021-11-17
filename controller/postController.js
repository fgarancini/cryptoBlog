const DateTime = require("tedious/lib/data-types/datetime");
const Post = require("../models/post");

exports.validaImagen = (req, res, next) => {
  const fileName = req.file.originalname;

  if (
    fileName.toLowerCase().endsWith(".jpeg") ||
    fileName.toLowerCase().endsWith(".png")
  ) {
    next();
  } else {
    res.status(500).send("Only format .jpeg or .png");
  }
};

exports.create = async (req, res) => {
  await Post.create({
    Titulo: req.body.Titulo,
    Contenido: req.body.Contenido,
    Imagen: req.file.originalname,
    categoryID: req.body.categoryID,
  })
    .then((post) =>
      res.status(200).json({
        status: "success",
        data: {
          post,
        },
      })
    )
    .catch((err) =>
      res.status(404).json({
        status: "fail",
        err,
      })
    );
};

exports.getAll = async (req, res) => {
  const posts = await Post.findAll()
    .then((posts) =>
      res.status(200).json({
        status: "success",
        data: {
          posts,
        },
      })
    )
    .catch((err) =>
      res.status(404).json({
        status: "fail",
        err,
      })
    );
};

exports.getByID = async (req, res) => {
  await Post.findOne({ where: { id: req.params.id } })
    .then((post) =>
      res.status(200).json({
        status: "success",
        data: {
          post,
        },
      })
    )
    .catch((err) =>
      res.status(404).json({
        status: "fail",
        err,
      })
    );
};

exports.update = async (req, res) => {
  await Post.update(
    { Titulo: req.body.Titulo, Contenido: req.body.Contenido },
    { where: { ID: req.params.id } }
  )
    .then((updated) =>
      res.status(200).json({
        status: "success",
        data: {
          updated,
        },
      })
    )
    .catch((err) =>
      res.status(405).json({
        status: "fail",
        err,
      })
    );
};

exports.delete = async (req, res) => {
  await Post.destroy({ where: { ID: req.params.id } })
    .then((res) =>
      res.status(200).json({
        status: "success",
        data: {
          res,
        },
      })
    )
    .catch((err) =>
      res.status(404).json({
        status: "fail",
        err,
      })
    );
};
