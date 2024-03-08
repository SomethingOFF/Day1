const mongoose = require("mongoose");
const validator = require("validator");
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "enter the name of user"],
  },
  username: {
    type: String,
    required: [true, "enter the username of user"],
    unique: true,
  },
  email: {
    type: String,
    required: [true, "enter the email of user"],
    unique: true,
    validate: [validator.isEmail, "enter the proper structure of email"],
  },
  password: {
    type: String,
    required: [true, "enter the password of user"],
    select: false,
  },
  avatar: {
    public_id: {
      type: String,
    },
    url: {
      type: String,
    },
  },
  role: {
    type: String,
    default: "user",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  resetPasswordToken: String,
  resetPasswordTokenExpire: Date,
});

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }
  this.password = await bcryptjs.hash(this.password, 12);
});

userSchema.methods.comparePassword = async function (getPassword) {
  return await bcryptjs.compare(getPassword, this.password);
};

userSchema.methods.getJwtToken = function () {
  return jwt.sign({ id: this._id }, process.env.SECRET_KEY, {
    expiresIn: process.env.JWT_EXPIRE,
  });
};

userSchema.methods.getResetPasswordToken = function () {
  const token = crypto.randomBytes(20).toString("hex");
  this.resetPasswordToken = crypto
    .createHash("sha256")
    .update(token)
    .digest("hex");
  this.resetPasswordTokenExpire = new Date(Date.now() + 15 * 60 * 1000);
  return token;
};

module.exports = mongoose.model("User", userSchema);
