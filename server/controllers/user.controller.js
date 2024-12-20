const blackListTokenModel = require("../models/blackListToken.models.js");
const UserModel = require("../models/user.models.js");

const userService = require("../services/user.service.js");
const { validationResult } = require("express-validator");
module.exports.registerUser = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { email, fullName, password } = req.body;

  const hashedPassword = await UserModel.hashPasswords(password);

  const user = await userService.createUser({
    firstName: fullName.firstName,
    lastName: fullName.lastName,
    email,
    password: hashedPassword,
  });

  const token = await user.generateAuthToken();

  return res.status(201).json({ user, token });
};

module.exports.loginUser = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { email, password } = req.body;

  const user = await UserModel.findOne({ email }).select("+password");

  if (!user) {
    return res.status(401).json({ message: "Invalid Credentials" });
  }

  const isMatch = await user.comparePassword(password);

  if (!isMatch) {
    return res.status(401).json({ message: "Invalid Credentials" });
  }

  const token = await user.generateAuthToken();

  res.cookie("token", token);

  return res.status(200).json({ user, token });
};

module.exports.getUserProfile = async (req, res, next) => {
  return res.status(200).json(req.user);
};

module.exports.logoutUser = async (req, res, next) => {
  res.clearCookie("token");

  const token = req.cookies.token || req.headers.authorization.split(" ")[1];
  await blackListTokenModel.create({ token });
  return res.status(200).json({ message: "Logged out successfully" });
};
