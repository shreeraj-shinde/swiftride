const express = require("express");
const dotenv = require("dotenv").config();
const cors = require("cors");
const ConnectDB = require("./db/db");
const userRoutes = require("./Routes/user.route.js");

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

//Connection to Database
ConnectDB();
app.use("/users", userRoutes);

app.get("/", (req, res) => {
  return res.json({ message: "Hello World!!" }).status(200);
});

module.exports = app;
