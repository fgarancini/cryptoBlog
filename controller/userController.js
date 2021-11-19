const User = require("../Models/user");
const jsonwebtoken = require("jsonwebtoken");
const bcrypt = require("bcrypt");

exports.authAdmin = (req,res,next) => {
  if(req.decoded.typeMod == 1 || req.decoded.typeMod == 2){
    next();
  }else{
    return res.status(401).send({
      mensaje: "Unauthorized.",
    });
  }
}

exports.singToken = async (req, res, next) => {
  const beartoken = req.headers["authorization"];
  const jtw_ = beartoken.split(" ")[1];
  if (jtw_) {
    jsonwebtoken.verify(jtw_, process.env.TOKEN_KEY, (err, decoded) => {
      if (err) {
        return res.status(403).json({ mensaje: "Token inválida" });
      } else {
        req.decoded = decoded;
        next();
      }
    });
  } else {
    res.status(403).send({
      mensaje: "Token no proveída.",
    });
  }
};

exports.userLogin = async (req, res) => {
  if (await authUser(req.body)) {
    const token = jsonwebtoken.sign({ check: true,typeMod:req.body.type }, process.env.TOKEN_KEY, {
      expiresIn: "1d",
      
    });
    res.status(200).json({
      mensaje: "Autenticacion exitosa",
      token: token,
    });
  } else {
    res.status(404).json({
      mensaje: "Contraseña o usuario incorrecto",
    });
  }
};

exports.userRegister = async (req, res) => {
  await User.create({
    mail: req.body.mail,
    username: req.body.username,
    password: req.body.password,
    type: req.body.type,
  })
    .then((user) =>
      res.status(200).json({
        status: "success",
        data: {
          user,
        },
      })
    )
    .catch((err) =>
      res.status(400).json({
        status: "fail",
        err:err.message,
      })
    );
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
