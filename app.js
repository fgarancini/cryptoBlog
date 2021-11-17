const express = require("express");
const morgan = require("morgan");

const app = express();

const categoryRoutes = require('./routes/categoryRoutes');
const postRoutes = require('./routes/postRoutes');

app.use(express.json());
app.use(morgan("dev"));

app.use("/api/v1/posts",postRoutes);
app.use("/api/v1/category",categoryRoutes);

module.exports = app;


