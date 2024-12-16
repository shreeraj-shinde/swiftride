const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const userSchema = new mongoose.Schema({
  fullName: {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      minlength: [3, "First Name Should be atleast 3 characters long"],
    },
  },
  email: {
    type: String,
    required: true,
    minlength: [5, "Email should contain atleast 5 characters"],
  },
  password: {
    type: String,
    required: true,
    minlength: [8, "Password should contain atleast 8 characters"],
    select: false,
  },
  socketId: {
    type: String,
  },
});

userSchema.methods.generateAuthToken = async function () {
  try {
    const token = jwt.sign({ _id: this._id }, process.env.JWT_SECRET);
    return token;
  } catch (error) {
    throw new Error(error);
  }
};

userSchema.methods.comparePassword = async function (password) {
  try {
    const isMatch = await bcrypt.compare(password, this.password);
    return isMatch;
  } catch (error) {
    throw new Error(error);
  }
};

userSchema.statics.hashPasswords = async function (password) {
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    return hashedPassword;
  } catch (error) {
    throw new Error(error);
  }
};

const UserModel = mongoose.model("User", userSchema);

module.exports = UserModel;
