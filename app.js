const express = require("express");
const app = express();
const port = 3000;

app.use(express.json());

app.use(morgan("dev"));

app.get("/", (req, res) => res.send("Hello World!"));


module.exports = app;


