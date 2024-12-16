const express = require("express");
const dotenv = require("dotenv").config();
const cors = require("cors");
const ConnectDB = require("./db/db");

const app = express();
app.use(express.json());
app.use(cors());

//Connection to Database
ConnectDB();

app.get("/", (req, res) => {
  return res.json({ message: "Hello World!!" }).status(200);
});

module.exports = app;
