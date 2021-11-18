const User = require("../Models/user");
const jsonwebtoken = require('jsonwebtoken');
const bcrypt = require("bcrypt");


exports.singToken = async (req, res, next) => {
  const beartoken = req.headers["authorization"];
  const jtw_ = beartoken.split(" ")[1];
  if (jtw_) {
    jsonwebtoken.verify(jtw_, process.env.TOKEN_KEY, (err, decoded) => {
      if (err) {
        return res.json({ mensaje: "Token inválida" });
      } else {
        req.decoded = decoded;
        next();
      }
    });
  } else {
    res.send({
      mensaje: "Token no proveída.",
    });
  }
};

exports.userLogin = async (req, res) => {
  if (await authUser(req.body)) {
    const token = jsonwebtoken.sign({ check: true }, process.env.TOKEN_KEY, {
      expiresIn: 1440,
    });
    res.json({
      mensaje: "Autenticacion exitosa",
      token: token,
    });
  } else {
    res.json({
      mensaje: "Contraseña o usuario incorrecto",
    });
  }
};

exports.userRegister = async (req, res) => {
  const newUser = await User.create({
    username: req.body.username,
    password: req.body.password,
  }).catch(err => newUser = err);
  res.status(200).json({
    status: "success",
    data: {
      user: newUser,
    },
  });
};

const authUser = async (user) => {
  const userFound = await User.findOne({
    where: {
      username: user.username,
    },
  })
    .then((response) => {
      if (validPassword(user.password, response.dataValues.password)) {
        return response.dataValues;
      } else {
        return false;
      }
    })
    .catch((err) => console.log(err));
  return userFound;
};

const validPassword = async (password, hash) => {
  return await bcrypt.compareSync(password, hash);
};
