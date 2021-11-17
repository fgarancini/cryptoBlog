const Category = require("../models/category");
const Post = require("../models/post");

exports.create = async (req, res) => {
  await Category.create({
    Titulo: req.body.Titulo,
  })
    .then((category) =>
      res.status(200).json({
        status: "success",
        data: {
          category,
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
  const Categories = await Category.findAll({
    include: [{ model: Post, as: "Posts", }],
  });
  res.status(200).json({
    success: "success",
    data: {
      Categories,
    },
  });
};
