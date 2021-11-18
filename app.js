const express = require("express");
const morgan = require("morgan");
const jwt = require("jsonwebtoken");
const app = express();

const categoryRoutes = require("./routes/categoryRoutes");
const postRoutes = require("./routes/postRoutes");
const authRoutes = require("./routes/authRoutes");

const Usuario = require("./models/user");

app.use(express.json());
app.use(morgan("dev"));

// app.post("/api/v1/login", async (req, res) => {
//   await Usuario.create({
//     mail: req.body.mail,
//     username: req.body.username,
//     password: req.body.password,
//   }).then((user) => {
//     jwt.sign(
//       { user },
//       process.env.TOKEN_KEY,
//       { expiresIn: "32s" },
//       (err, token) => {
//         res.status(200).json({
//           status: "success",
//           data: {
//             token,
//           },
//         });
//       }
//     );
//   });
// });

// //Authorization: Bearer <token>
// const singToken = (req, res, next) => {
//   const beartoken = req.headers["authorization"];
//   if (typeof beartoken !== "undefined") {
//     const jtw = beartoken.split(" ")[1];
//     req.token = jwt;
//     next();
//   } else {
//     res.status(403);
//   }
// };
app.use("/api/v1/auth",authRoutes);
app.use("/api/v1/posts", postRoutes);
app.use("/api/v1/category", categoryRoutes);

module.exports = app;
