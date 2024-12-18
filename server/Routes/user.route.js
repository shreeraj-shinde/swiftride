const express = require("express");

const router = express.Router();

const { body } = require("express-validator");

const userController = require("../controllers/user.controller.js");

router.post(
  "/register",
  [
    body("email").isEmail().withMessage("Invalid Email"),
    body("fullName.firstName")
      .isLength({ min: 3 })
      .withMessage("First Name Should be atleast 3 characters long"),
    body("password")
      .isLength({ min: 8 })
      .withMessage("Password should contain atleast 8 characters"),
  ],
  userController.registerUser
);

router.post(
  "/login",
  [
    body("email").isEmail().withMessage("Invalid Email"),
    body("password")
      .isLength({ min: 8 })
      .withMessage("Password should contain atleast 8 characters"),
  ],
  userController.loginUser
);

module.exports = router;
