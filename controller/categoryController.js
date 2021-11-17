const Category = require("../models/category");

exports.create = async (req, res) => {
  const category = await Category.create({
    Titulo: req.body.Titulo,
  }).catch((err) => console.log(err));

  res.status(200).json({
    status: "success",
    data: {
      category,
    },
  });
};

exports.get = async (req, res) => {
  const Categories = Category.findAll();
  res.status(200).json({
    success: "success",
    data: {
      Categories,
    },
  });
};
