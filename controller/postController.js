const DateTime = require("tedious/lib/data-types/datetime");
const Post = require("../models/post");

exports.create = async (req, res) => {
  const post = await Post.create({
    Titulo: req.body.Titulo,
    Contenido: req.body.Contenido,
    Imagen: req.file.originalname,
    categoryID: req.body.categoryID,
  }).catch((err) => console.log(err));
  res.status(200).json({
    status: "success",
    data: {
      post,
    },
  });
};

exports.getAll = async (req, res) => {
  const posts = await Post.findAll().catch((err) => console.log(err));

  res.status(200).json({
    status: "success",
    data: {
      posts,
    },
  });
};

exports.get = async (req, res) => {
  const _id =  req.params.id;
  const post = await Post.findOne({ where: { id: _id } });
  res.status(200).json({
    status: "success",
    data: {
      post,
    },
  });
};
