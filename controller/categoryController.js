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
  await Category.findAll({
    include: [{ model: Post, as: "Posts" }],
  })
    .then((Categories) =>
      res.status(200).json({
        success: "success",
        data: {
          Categories,
        },
      })
    )
    .catch((err) =>
      res.status(404).json({
        success: "fail",
        err,
      })
    );
};

exports.getByID = async (req,res) => {
  await Category.findAll({where: {id:req.params.id},
    include: [{ model: Post, as: "Posts" }],
  })
    .then((Categories) =>
      res.status(200).json({
        success: "success",
        data: {
          Categories,
        },
      })
    )
    .catch((err) =>
      res.status(404).json({
        success: "fail",
        err,
      })
    );
}
