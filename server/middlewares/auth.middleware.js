const userModel = require("../models/user.models.js");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const blackListTokenModel = require("../models/blackListToken.models.js");

module.exports.authUser = async (req, res, next) => {
  const token = req.cookies.token || req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  const isBlackListed = await blackListTokenModel.findOne({ token: token });

  if (isBlackListed) return res.status(401).json({ message: "Unauthorized" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await userModel.findById(decoded._id);
    req.user = user;
    return next();
  } catch {
    return res.status(401).json({ message: "Unauthorized" });
  }
};
