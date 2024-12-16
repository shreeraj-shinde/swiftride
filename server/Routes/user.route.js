const express = require("express");

const router = express.Router();

const registerUser = userController.registerUser

const { body } = require("express-validator");

const userController = require("../controllers/user.controller.js");

router.post("/register",[ body("email").isEmail().withMessage("Invalid Email").normalizeEmail()
  body("fullName.firstName")
    .isLength({ min: 3 })
    .withMessage("First Name Should be atleast 3 characters long");
  body("password")
    .isLength({ min: 8 })
    .withMessage("Password should contain atleast 8 characters")], registerUser);
  
module.exports = router;
